# COLLABORATION.md

Este documento recoge las reflexiones y aprendizajes del equipo durante el trabajo colaborativo en el desarrollo del proyecto.

---

## 1. ¿Cómo se resolvieron los conflictos de timezone? (ej: horarios de merge)

*Esto se soluciona mediante la creación de distintas ramas, una para cada equipo. Las ramas de alemania, japon, suiza y españa realizaron los cambios en distintos módulos y en diferentes zonas horarias, modificando su propia rama sin alterar la rama principal. Para incluir los cambios en la rama principal, el líder del equipo revisa los pull request y github actions comprueba si ese cambio no rompe la funcionalidad de la aplicación. En este caso práctico los pull request fueron implementados en la rama principal sin romper las funcionalidades*  
...

---

## 2. ¿Qué pasaría si el equipo en India no tiene acceso a Docker Hub?

*Desde la visión DevOps, no tener acceso a Docker Hub no debe detener el desarrollo ni el despliegue. El equipo debe ser capaz de adaptarse rápidamente, aprovechar la automatización, fomentar la comunicación fluida y construir soluciones resilientes que no dependan exclusivamente de terceros.*  
...

---

## 3. Reflexión general basada en nuestro trabajo como desarrolladores

*El trabajo colaborativo aplciando la filosofía DevOps es interesante ya que permite automatizar las distintas fases del ciclo de vida del desarrollo, tanto como la fase de integración, la fase de pruebas, y la fase de despliegue. Para este caso en concreto se permitió utilizar herramientas que pueden ayudar a automatizar la fase de despliegue continuo (CD) y retroalimentación continua (CF) ya que se utilizó kubernetes para el CD y grafana para el CF, ambos brindadonos información sobre el estado de los contenedores y el rendimiento de manera automatizada, con intervención manual mínima, cumpliendo con la filosofía DevOps. Sin duda es una manera interesante de trabajar en equipo. :*  
...

---

*Este archivo es parte de la documentación colaborativa del equipo. Puede actualizarse con nuevas reflexiones y aprendizajes a lo largo del proyecto.*
