import axios from 'axios';

// Configuración de la API
const apiClient = axios.create({
    baseURL: "https://seminariobackend-production.up.railway.app/vozsegura",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error en la API:', error);
        return Promise.reject(error);
    }
);

export { apiClient };


