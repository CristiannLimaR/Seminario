# Servicios de API con Axios

Este directorio contiene los servicios para comunicarse con la API del backend usando Axios.

## 📁 Estructura

```
services/
├── reportService.js    # Servicios para reportes
├── blogService.js      # Servicios para el blog
└── README.md          # Esta documentación
```

## 🔧 Configuración

### Instalación de Axios
```bash
npm install axios
```

### Configuración Base
La configuración de Axios se encuentra en `../config/api.js` e incluye:

- **URL Base**: Configurada automáticamente
- **Timeout**: 10 segundos
- **Headers**: Content-Type: application/json
- **Interceptores**: Para manejo de errores y autenticación

## 📡 Servicios Disponibles

### ReportService

#### `createReport(reportData)`
Crea un nuevo reporte.

```javascript
import { createReport } from '../services/reportService';

const reportData = {
  reportType: 'verbal-abuse',
  description: 'Descripción del incidente...',
  anonymous: true
};

try {
  const result = await createReport(reportData);
  console.log('Reporte creado:', result);
} catch (error) {
  console.error('Error:', error.message);
}
```

#### `getReports(filters)`
Obtiene reportes con filtros opcionales.

```javascript
import { getReports } from '../services/reportService';

// Sin filtros
const allReports = await getReports();

// Con filtros
const pendingReports = await getReports({ 
  status: 'pending',
  page: 1,
  limit: 10
});
```

#### `getReportById(id)`
Obtiene un reporte específico.

```javascript
import { getReportById } from '../services/reportService';

const report = await getReportById('64f8a1b2c3d4e5f6a7b8c9d0');
```

#### `updateReportStatus(id, status)`
Actualiza el estado de un reporte.

```javascript
import { updateReportStatus } from '../services/reportService';

await updateReportStatus('64f8a1b2c3d4e5f6a7b8c9d0', 'in-progress');
```

#### `getReportStats()`
Obtiene estadísticas de reportes.

```javascript
import { getReportStats } from '../services/reportService';

const stats = await getReportStats();
console.log('Total reportes:', stats.overview.total);
```

#### `deleteReport(id)`
Elimina un reporte.

```javascript
import { deleteReport } from '../services/reportService';

await deleteReport('64f8a1b2c3d4e5f6a7b8c9d0');
```

#### `updateReport(id, updateData)`
Actualiza un reporte completo.

```javascript
import { updateReport } from '../services/reportService';

const updateData = {
  location: 'Nueva ubicación',
  status: 'resolved'
};

await updateReport('64f8a1b2c3d4e5f6a7b8c9d0', updateData);
```

### BlogService

#### `getBlogPosts(filters)`
Obtiene posts del blog.

```javascript
import { getBlogPosts } from '../services/blogService';

const posts = await getBlogPosts({ 
  status: 'published',
  category: 'violence-prevention'
});
```

#### `getBlogPostById(id)`
Obtiene un post específico.

```javascript
import { getBlogPostById } from '../services/blogService';

const post = await getBlogPostById('64f8a1b2c3d4e5f6a7b8c9d0');
```

#### `createBlogPost(postData)`
Crea un nuevo post.

```javascript
import { createBlogPost } from '../services/blogService';

const postData = {
  title: 'Título del post',
  content: 'Contenido del post...',
  author: 'Autor',
  category: 'violence-prevention'
};

const newPost = await createBlogPost(postData);
```

#### `updateBlogPost(id, updateData)`
Actualiza un post.

```javascript
import { updateBlogPost } from '../services/blogService';

const updateData = {
  title: 'Nuevo título',
  content: 'Nuevo contenido...'
};

await updateBlogPost('64f8a1b2c3d4e5f6a7b8c9d0', updateData);
```

#### `deleteBlogPost(id)`
Elimina un post.

```javascript
import { deleteBlogPost } from '../services/blogService';

await deleteBlogPost('64f8a1b2c3d4e5f6a7b8c9d0');
```

## 🛡️ Manejo de Errores

Todos los servicios incluyen manejo de errores automático:

```javascript
try {
  const result = await createReport(reportData);
  // Éxito
} catch (error) {
  // Error manejado automáticamente
  console.error('Error:', error.message);
  
  // Tipos de errores:
  // - Error de validación (400)
  // - Recurso no encontrado (404)
  // - Error interno del servidor (500)
  // - Error de conexión
  // - Timeout
}
```

## 🔐 Autenticación

Los servicios automáticamente incluyen el token de autenticación si está disponible:

```javascript
// El token se obtiene automáticamente de localStorage
localStorage.setItem('authToken', 'tu-token-jwt');

// Los servicios lo incluirán automáticamente en los headers
const response = await createReport(reportData);
```

## 📊 Filtros Disponibles

### Para Reportes
- `status`: pending, reviewed, in-progress, resolved, closed
- `reportType`: verbal-abuse, threats, discrimination, social-exclusion, cyberbullying, other
- `anonymous`: true/false
- `page`: número de página
- `limit`: elementos por página

### Para Blog
- `status`: draft, published
- `category`: categoría del post
- `page`: número de página
- `limit`: elementos por página

## 🚀 Ventajas de Axios

1. **Sintaxis más limpia**: No necesitas manejar JSON.stringify/parse
2. **Interceptores**: Manejo centralizado de errores y headers
3. **Timeout automático**: Configuración global de timeouts
4. **Cancelación de peticiones**: Posibilidad de cancelar peticiones
5. **Mejor manejo de errores**: Errores más descriptivos
6. **Transformación automática**: Headers y datos se manejan automáticamente

## 🔧 Configuración Avanzada

### Personalizar Timeout
```javascript
import { apiClient } from '../config/api.js';

// Timeout específico para una petición
const response = await apiClient.get('/reports', {
  timeout: 5000
});
```

### Cancelar Petición
```javascript
import { apiClient } from '../config/api.js';

const controller = new AbortController();

apiClient.get('/reports', {
  signal: controller.signal
});

// Cancelar la petición
controller.abort();
```

### Headers Personalizados
```javascript
import { apiClient } from '../config/api.js';

const response = await apiClient.get('/reports', {
  headers: {
    'Custom-Header': 'valor'
  }
});
``` 