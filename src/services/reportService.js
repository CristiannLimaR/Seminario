import { apiClient } from '../config/api.js';

// Crear un nuevo reporte
export const createReport = async (reportData) => {
  try {
    const response = await apiClient.post('/reports', reportData);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Error al crear el reporte');
  }
};

// Obtener todos los reportes con filtros opcionales
export const getReports = async (filters = {}) => {
  try {
    const params = {};
    
    if (filters.status && filters.status !== 'all') {
      params.status = filters.status;
    }
    if (filters.reportType) {
      params.reportType = filters.reportType;
    }
    if (filters.anonymous !== undefined) {
      params.anonymous = filters.anonymous;
    }
    if (filters.page) {
      params.page = filters.page;
    }
    if (filters.limit) {
      params.limit = filters.limit;
    }

    const response = await apiClient.get('/reports', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Error al obtener los reportes');
  }
};

// Obtener un reporte específico por ID
export const getReportById = async (id) => {
  try {
    const response = await apiClient.get(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Error al obtener el reporte');
  }
};

// Actualizar el estado de un reporte
export const updateReportStatus = async (id, status) => {
  try {
    const response = await apiClient.patch(`/reports/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Error al actualizar el estado');
  }
};

// Obtener estadísticas de reportes
export const getReportStats = async () => {
  try {
    const response = await apiClient.get('/reports/stats');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Error al obtener estadísticas');
  }
};

// Eliminar un reporte
export const deleteReport = async (id) => {
  try {
    const response = await apiClient.delete(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Error al eliminar el reporte');
  }
};

// Actualizar un reporte completo
export const updateReport = async (id, updateData) => {
  try {
    const response = await apiClient.put(`/reports/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Error al actualizar el reporte');
  }
}; 