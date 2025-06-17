#!/bin/bash

# Script para desplegar la aplicación de inventario en Kubernetes
# Ejecutar desde el directorio raíz del proyecto

set -e  # Salir si cualquier comando falla

echo "🚀 Desplegando aplicación de inventario en Kubernetes..."

# ============================================
# 1. CONSTRUIR IMÁGENES DOCKER
# ============================================
echo "📦 Construyendo imágenes Docker..."

# Construir imagen del servicio de autenticación
echo "  - Construyendo auth-service..."
docker build -t auth-service:latest ./auth-service

# Construir imagen del servicio de inventario
echo "  - Construyendo inventory-service..."
docker build -t inventory-service:latest ./inventory-service

# Construir imagen del cliente
echo "  - Construyendo client-app..."
docker build -t client-app:latest ./client

echo "✅ Imágenes construidas exitosamente"

# ============================================
# 2. CREAR DIRECTORIOS PARA PERSISTENT VOLUMES
# ============================================
echo "📁 Creando directorios para volúmenes persistentes..."
sudo mkdir -p /mnt/data/mongo-auth
sudo mkdir -p /mnt/data/mongo-inventory
sudo chmod 777 /mnt/data/mongo-auth
sudo chmod 777 /mnt/data/mongo-inventory
echo "✅ Directorios creados"

# ============================================
# 3. APLICAR MANIFIESTOS DE KUBERNETES
# ============================================
echo "☸️  Aplicando manifiestos de Kubernetes..."

# Aplicar todos los manifiestos
kubectl apply -f ./k8s-manifests.yaml

echo "✅ Manifiestos aplicados"

# ============================================
# 4. ESPERAR A QUE LOS PODS ESTÉN LISTOS
# ============================================
echo "⏳ Esperando a que los pods estén listos..."

# Esperar a que MongoDB esté listo
echo "  - Esperando MongoDB Auth..."
kubectl wait --for=condition=ready pod -l app=mongodb-auth -n inventory-app --timeout=300s

echo "  - Esperando MongoDB Inventory..."
kubectl wait --for=condition=ready pod -l app=mongodb-inventory -n inventory-app --timeout=300s

# Esperar a que los servicios estén listos
echo "  - Esperando Auth Service..."
kubectl wait --for=condition=ready pod -l app=auth-service -n inventory-app --timeout=300s

echo "  - Esperando Inventory Service..."
kubectl wait --for=condition=ready pod -l app=inventory-service -n inventory-app --timeout=300s

echo "  - Esperando Client App..."
kubectl wait --for=condition=ready pod -l app=client-app -n inventory-app --timeout=300s

echo "✅ Todos los pods están listos"

# ============================================
# 5. MOSTRAR INFORMACIÓN DEL DESPLIEGUE
# ============================================
echo "📊 Información del despliegue:"
echo ""
echo "Namespace: inventory-app"
echo ""
echo "Pods:"
kubectl get pods -n inventory-app
echo ""
echo "Servicios:"
kubectl get services -n inventory-app
echo ""
echo "Ingress:"
kubectl get ingress -n inventory-app
echo ""

# ============================================
# 6. OBTENER URLs DE ACCESO
# ============================================
echo "🌐 URLs de acceso:"

# Obtener IP del LoadBalancer o NodePort
CLIENT_SERVICE_TYPE=$(kubectl get service client-app-service -n inventory-app -o jsonpath='{.spec.type}')

if [ "$CLIENT_SERVICE_TYPE" = "LoadBalancer" ]; then
    echo "  - Esperando IP externa del LoadBalancer..."
    kubectl wait --for=jsonpath='{.status.loadBalancer.ingress}' service/client-app-service -n inventory-app --timeout=300s || true
    EXTERNAL_IP=$(kubectl get service client-app-service -n inventory-app -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
    if [ -n "$EXTERNAL_IP" ]; then
        echo "  - Aplicación web: http://$EXTERNAL_IP"
    else
        echo "  - LoadBalancer IP aún no asignada. Usar port-forward temporalmente."
    fi
elif [ "$CLIENT_SERVICE_TYPE" = "NodePort" ]; then
    NODE_PORT=$(kubectl get service client-app-service -n inventory-app -o jsonpath='{.spec.ports[0].nodePort}')
    NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="ExternalIP")].address}')
    if [ -z "$NODE_IP" ]; then
        NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')
    fi
    echo "  - Aplicación web: http://$NODE_IP:$NODE_PORT"
fi

echo ""
echo "Port-forward para desarrollo local:"
echo "  kubectl port-forward service/client-app-service 8080:80 -n inventory-app"
echo "  Luego acceder a: http://localhost:8080"
echo ""

# ============================================
# 7. COMANDOS ÚTILES
# ============================================
echo "🛠️  Comandos útiles:"
echo ""
echo "Ver logs:"
echo "  kubectl logs -f deployment/auth-service -n inventory-app"
echo "  kubectl logs -f deployment/inventory-service -n inventory-app"
echo "  kubectl logs -f deployment/client-app -n inventory-app"
echo ""
echo "Escalar servicios:"
echo "  kubectl scale deployment auth-service --replicas=3 -n inventory-app"
echo "  kubectl scale deployment inventory-service --replicas=3 -n inventory-app"
echo ""
echo "Reiniciar deployments:"
echo "  kubectl rollout restart deployment/auth-service -n inventory-app"
echo "  kubectl rollout restart deployment/inventory-service -n inventory-app"
echo ""
echo "Eliminar todo:"
echo "  kubectl delete namespace inventory-app"
echo ""

echo "🎉 ¡Despliegue completado exitosamente!"
echo ""
echo "Para monitorear la aplicación:"
echo "  watch kubectl get pods -n inventory-app"