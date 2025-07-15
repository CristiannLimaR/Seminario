import { useState, useEffect } from 'react';
import { getReports, getReportStats, updateReportStatus, deleteReport } from '../services/reportService';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    overview: { total: 0, anonymous: 0, nonAnonymous: 0 },
    byStatus: []
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Cargar reportes y estadísticas
  const loadReports = async () => {
    try {
      setLoading(true);
      const filters = filterStatus !== 'all' ? { status: filterStatus } : {};
      const reportsData = await getReports(filters);
      setReports(reportsData.reports || []);
      
      // Cargar estadísticas
      const statsData = await getReportStats();
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Error al cargar los reportes');
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente y cuando cambie el filtro
  useEffect(() => {
    loadReports();
  }, [filterStatus]);

  // Actualizar estado de un reporte
  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      setUpdatingStatus(true);
      await updateReportStatus(reportId, newStatus);
      
      // Recargar reportes
      await loadReports();
      
      // Si hay un reporte seleccionado, actualizarlo
      if (selectedReport && selectedReport._id === reportId) {
        const updatedReport = reports.find(r => r._id === reportId);
        if (updatedReport) {
          setSelectedReport(updatedReport);
        }
      }
    } catch (err) {
      setError(err.message || 'Error al actualizar el estado');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Eliminar un reporte
  const handleDeleteReport = async (reportId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este reporte?')) {
      return;
    }

    try {
      await deleteReport(reportId);
      await loadReports();
      
      // Si el reporte eliminado estaba seleccionado, limpiar selección
      if (selectedReport && selectedReport._id === reportId) {
        setSelectedReport(null);
      }
    } catch (err) {
      setError(err.message || 'Error al eliminar el reporte');
    }
  };

  const getTypeLabel = (type) => {
    const types = {
      'verbal-abuse': 'Abuso verbal',
      'threats': 'Amenazas',
      'discrimination': 'Discriminación',
      'cyberbullying': 'Ciberbullying',
      'social-exclusion': 'Exclusión social',
      'other': 'Otro'
    };
    return types[type] || type;
  };

  const getFrequencyLabel = (frequency) => {
    const frequencies = {
      'one-time': 'Una vez',
      'occasional': 'Ocasional',
      'frequent': 'Frecuente',
      'daily': 'Diario'
    };
    return frequencies[frequency] || frequency;
  };

  const getImpactLabel = (impact) => {
    const impacts = {
      'minimal': 'Mínimo',
      'moderate': 'Moderado',
      'significant': 'Significativo',
      'severe': 'Severo'
    };
    return impacts[impact] || impact;
  };

  const getSupportLabel = (support) => {
    const supports = {
      'counseling': 'Orientación psicológica',
      'mediation': 'Mediación',
      'legal': 'Asesoría legal',
      'resources': 'Recursos educativos',
      'none': 'No necesita apoyo'
    };
    return supports[support] || support;
  };

  const getStatusLabel = (status) => {
    const statuses = {
      'pending': 'Pendiente',
      'reviewed': 'Revisado',
      'in-progress': 'En proceso',
      'resolved': 'Resuelto',
      'closed': 'Cerrado'
    };
    return statuses[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#f59e0b',
      'reviewed': '#8b5cf6',
      'in-progress': '#3b82f6',
      'resolved': '#10b981',
      'closed': '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  // Calcular prioridad basada en impacto y frecuencia
  const getPriority = (report) => {
    if (report.impact === 'severe' || report.frequency === 'daily') return 'high';
    if (report.impact === 'significant' || report.frequency === 'frequent') return 'medium';
    return 'low';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': '#dc2626',
      'medium': '#f59e0b',
      'low': '#10b981'
    };
    return colors[priority] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="admin-reports">
        <div className="loading-message">
          <div className="loading-spinner"></div>
          <p>Cargando reportes...</p>
        </div>
        <style>{`
          .loading-message {
            text-align: center;
            padding: 2rem;
          }
          .loading-spinner {
            border: 4px solid #f3f4f6;
            border-top: 4px solid #2563eb;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-reports">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <h3>Error al cargar los reportes</h3>
          <p>{error}</p>
          <button onClick={loadReports} className="retry-btn">
            Intentar de nuevo
          </button>
        </div>
        <style>{`
          .error-message {
            text-align: center;
            padding: 2rem;
            background: #fef2f2;
            border-radius: 12px;
            margin: 2rem;
          }
          .error-icon {
            font-size: 2rem;
            display: block;
            margin-bottom: 1rem;
          }
          .retry-btn {
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 1rem;
          }
        `}</style>
      </div>
    );
  }

  if (selectedReport) {
    return (
      <div className="report-detail">
        <button 
          className="back-button"
          onClick={() => setSelectedReport(null)}
        >
          ← Volver a la lista
        </button>

        <div className="report-header">
          <div className="report-meta">
            <span 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(selectedReport.status) }}
            >
              {getStatusLabel(selectedReport.status)}
            </span>
            <span 
              className="priority-badge"
              style={{ backgroundColor: getPriorityColor(getPriority(selectedReport)) }}
            >
              Prioridad {getPriority(selectedReport)}
            </span>
          </div>
          <h2>Denuncia #{selectedReport._id?.slice(-6) || selectedReport.id}</h2>
          <p className="report-date">
            Recibida el {new Date(selectedReport.createdAt).toLocaleDateString('es-ES')}
          </p>
        </div>

        <div className="report-content">
          <div className="report-section">
            <h3>Información General</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Tipo:</strong> {getTypeLabel(selectedReport.reportType)}
              </div>
              <div className="info-item">
                <strong>Ubicación:</strong> {selectedReport.location || 'No especificada'}
              </div>
              <div className="info-item">
                <strong>Frecuencia:</strong> {getFrequencyLabel(selectedReport.frequency)}
              </div>
              <div className="info-item">
                <strong>Impacto:</strong> {getImpactLabel(selectedReport.impact)}
              </div>
              <div className="info-item">
                <strong>Apoyo solicitado:</strong> {getSupportLabel(selectedReport.support)}
              </div>
              <div className="info-item">
                <strong>Anónimo:</strong> {selectedReport.anonymous ? 'Sí' : 'No'}
              </div>
              {!selectedReport.anonymous && selectedReport.studentId && (
                <div className="info-item">
                  <strong>Carné del estudiante:</strong> {selectedReport.studentId}
                </div>
              )}
            </div>
          </div>

          <div className="report-section">
            <h3>Descripción del Incidente</h3>
            <div className="description-box">
              {selectedReport.description}
            </div>
          </div>

          <div className="report-actions">
            <button 
              className="action-btn primary"
              onClick={() => handleStatusUpdate(selectedReport._id, 'in-progress')}
              disabled={updatingStatus || selectedReport.status === 'in-progress'}
            >
              {updatingStatus ? 'Actualizando...' : 'Marcar como En Proceso'}
            </button>
            <button 
              className="action-btn success"
              onClick={() => handleStatusUpdate(selectedReport._id, 'resolved')}
              disabled={updatingStatus || selectedReport.status === 'resolved'}
            >
              {updatingStatus ? 'Actualizando...' : 'Resolver Caso'}
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => handleStatusUpdate(selectedReport._id, 'reviewed')}
              disabled={updatingStatus || selectedReport.status === 'reviewed'}
            >
              {updatingStatus ? 'Actualizando...' : 'Marcar como Revisado'}
            </button>
            <button 
              className="action-btn danger"
              onClick={() => handleDeleteReport(selectedReport._id)}
              disabled={updatingStatus}
            >
              {updatingStatus ? 'Eliminando...' : 'Eliminar Reporte'}
            </button>
          </div>
        </div>

        <style>{`
          .report-detail {
            max-width: 800px;
          }

          .back-button {
            background: #f3f4f6;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            color: #374151;
            margin-bottom: 2rem;
            transition: all 0.3s ease;
          }

          .back-button:hover {
            background: #e5e7eb;
          }

          .report-header {
            margin-bottom: 2rem;
          }

          .report-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .status-badge,
          .priority-badge {
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.875rem;
            font-weight: 500;
          }

          .report-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }

          .report-date {
            color: #6b7280;
            font-size: 0.875rem;
          }

          .report-section {
            background: #f8fafc;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
          }

          .report-section h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 1rem;
          }

          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }

          .info-item {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
          }

          .description-box {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            line-height: 1.6;
            color: #374151;
            border-left: 4px solid #10b981;
          }

          .report-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .action-btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .action-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .action-btn.primary {
            background: #2563eb;
            color: white;
          }

          .action-btn.secondary {
            background: #6b7280;
            color: white;
          }

          .action-btn.success {
            background: #10b981;
            color: white;
          }

          .action-btn.danger {
            background: #dc2626;
            color: white;
          }

          .action-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-reports">
      <div className="reports-header">
        <h2>Gestión de Denuncias</h2>
        <p>Administra y da seguimiento a las denuncias recibidas</p>
      </div>

      <div className="reports-filters">
        <div className="filter-group">
          <label>Filtrar por estado:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="reviewed">Revisados</option>
            <option value="in-progress">En proceso</option>
            <option value="resolved">Resueltos</option>
            <option value="closed">Cerrados</option>
          </select>
        </div>
      </div>

      <div className="reports-stats">
        <div className="stat-item">
          <span className="stat-number">{stats.overview.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.overview.anonymous}</span>
          <span className="stat-label">Anónimos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.overview.nonAnonymous}</span>
          <span className="stat-label">Identificados</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {stats.byStatus.find(s => s._id === 'pending')?.count || 0}
          </span>
          <span className="stat-label">Pendientes</span>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="no-reports">
          <div className="no-reports-icon">📋</div>
          <h3>No hay reportes</h3>
          <p>No se encontraron reportes con los filtros seleccionados.</p>
        </div>
      ) : (
      <div className="reports-list">
          {reports.map((report) => (
          <div 
              key={report._id} 
            className="report-card"
            onClick={() => setSelectedReport(report)}
          >
            <div className="report-card-header">
                <div className="report-id">#{report._id?.slice(-6) || report.id}</div>
              <div className="report-badges">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(report.status) }}
                >
                  {getStatusLabel(report.status)}
                </span>
                <span 
                  className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(getPriority(report)) }}
                >
                    {getPriority(report)}
                </span>
              </div>
            </div>
            
            <div className="report-card-content">
                <h3>{getTypeLabel(report.reportType)}</h3>
              <p className="report-preview">
                {report.description.substring(0, 150)}...
              </p>
              {!report.anonymous && report.studentId && (
                <div className="report-studentid">
                  <strong>Carné:</strong> {report.studentId}
                </div>
              )}
              <div className="report-meta">
                <span>📍 {report.location || 'No especificada'}</span>
                  <span>📅 {new Date(report.createdAt).toLocaleDateString('es-ES')}</span>
                <span>{report.anonymous ? '👤 Anónimo' : '👤 Identificado'}</span>
                </div>
            </div>
          </div>
        ))}
      </div>
      )}

      <style>{`
        .admin-reports {
          max-width: none;
        }

        .reports-header {
          margin-bottom: 2rem;
        }

        .reports-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .reports-header p {
          color: #6b7280;
          font-size: 1.125rem;
        }

        .reports-filters {
          background: #e0e7ef;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px 0 rgba(37,99,235,0.06);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .filter-group label {
          font-weight: 700;
          color: #1f2937;
          margin-right: 0.5rem;
        }

        .filter-select {
          padding: 0.5rem 1.2rem;
          border: 2px solid #2563eb;
          border-radius: 8px;
          background: #fff;
          color: #1f2937;
          font-weight: 600;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        .filter-select:focus {
          outline: none;
          border-color: #1d4ed8;
          box-shadow: 0 0 0 2px #2563eb33;
        }

        .reports-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #f8fafc;
          padding: 1rem;
          border-radius: 12px;
          min-width: 100px;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #2563eb;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .no-reports {
          text-align: center;
          padding: 3rem;
          background: #f8fafc;
          border-radius: 12px;
        }

        .no-reports-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .no-reports h3 {
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .no-reports p {
          color: #6b7280;
        }

        .reports-list {
          display: grid;
          gap: 1rem;
        }

        .report-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .report-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .report-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .report-id {
          font-weight: 700;
          color: #1f2937;
          font-size: 1.125rem;
        }

        .report-badges {
          display: flex;
          gap: 0.5rem;
        }

        .status-badge,
        .priority-badge {
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .report-card-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.75rem;
        }

        .report-preview {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .report-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
          color: #9ca3af;
          flex-wrap: wrap;
        }

        .report-studentid {
          color: #2563eb;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .reports-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .report-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminReports;