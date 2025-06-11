import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchProductsAPI, addProductAPI, updateProductAPI, deleteProductAPI } from '../api/productosAPI';
