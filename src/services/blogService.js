import { apiClient } from '../config/api.js';

// Obtener todos los posts del blog
export const getBlogPosts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.status) {
      params.append('status', filters.status);
    }
    if (filters.category) {
      params.append('category', filters.category);
    }
    if (filters.page) {
      params.append('page', filters.page);
    }
    if (filters.limit) {
      params.append('limit', filters.limit);
    }
    
    const response = await apiClient.get(`/blog?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los posts del blog:', error);
    throw new Error('Error al obtener los posts del blog');
  }
};

// Obtener un post específico por ID
export const getBlogPostById = async (id) => {
  try {
    const response = await apiClient.get(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el post:', error);
    if (error.response?.status === 404) {
      throw new Error('Post no encontrado');
    }
    throw new Error('Error al obtener el post');
  }
};

// Crear un nuevo post
export const createBlogPost = async (postData) => {
  try {
    const response = await apiClient.post('/blog', postData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el post:', error);
    throw new Error('Error al crear el post');
  }
};

// Actualizar un post
export const updateBlogPost = async (id, updateData) => {
  try {
    const response = await apiClient.put(`/blog/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    if (error.response?.status === 404) {
      throw new Error('Post no encontrado');
    }
    throw new Error('Error al actualizar el post');
  }
};

// Eliminar un post
export const deleteBlogPost = async (id) => {
  try {
    const response = await apiClient.delete(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    if (error.response?.status === 404) {
      throw new Error('Post no encontrado');
    }
    throw new Error('Error al eliminar el post');
  }
};

// Obtener categorías disponibles
export const getBlogCategories = async () => {
  try {
    const response = await apiClient.get('/blog/categories');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    // Si no existe el endpoint de categorías, devolver categorías por defecto
    return [
      { id: 'violence-prevention', name: 'Prevención de Violencia', count: 0 },
      { id: 'cyberbullying', name: 'Ciberbullying', count: 0 },
      { id: 'mediation', name: 'Mediación', count: 0 },
      { id: 'psychological-support', name: 'Apoyo Psicológico', count: 0 },
      { id: 'legal-support', name: 'Apoyo Legal', count: 0 }
    ];
  }
};

// Función auxiliar para obtener nombres de categorías
const getCategoryName = (category) => {
  const categoryNames = {
    'violence-prevention': 'Prevención de Violencia',
    'cyberbullying': 'Ciberbullying',
    'mediation': 'Mediación',
    'psychological-support': 'Apoyo Psicológico',
    'legal-support': 'Apoyo Legal'
  };
  return categoryNames[category] || category;
}; 