import { useState } from 'react';
import { createReport } from '../services/reportService';
import './Reports.css';

const Reports = () => {
  const [formData, setFormData] = useState({
    reportType: '',
    description: '',
    location: '',
    frequency: '',
    impact: '',
    support: '',
    anonymous: true,
    studentId: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validar carné si no es anónimo
    if (!formData.anonymous && !formData.studentId.trim()) {
      setError('El carné del estudiante es obligatorio si no es anónimo.');
      setLoading(false);
      return;
    }
    if (!formData.anonymous && !/^\d{7}$/.test(formData.studentId)) {
      setError('El carné debe tener exactamente 7 números.');
      setLoading(false);
      return;
    }
    // Validar longitud mínima de la descripción
    if (!formData.description || formData.description.trim().length < 10) {
      setError('La descripción debe tener al menos 10 caracteres.');
      setLoading(false);
      return;
    }

    try {
      // Preparar datos para enviar al backend
      const reportData = {
        reportType: formData.reportType,
        description: formData.description,
        location: formData.location || undefined,
        frequency: formData.frequency || undefined,
        impact: formData.impact || undefined,
        support: formData.support || undefined,
        anonymous: formData.anonymous,
        studentId: formData.anonymous ? undefined : formData.studentId
      };

      // Enviar al backend
      await createReport(reportData);
      
      setSubmitted(true);
      
      // Resetear después de 3 segundos
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          reportType: '',
          description: '',
          location: '',
          frequency: '',
          impact: '',
          support: '',
          anonymous: true,
          studentId: ''
        });
      }, 3000);
    } catch (err) {
      setError(err.message || 'Error al enviar el reporte. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const supportOptions = [
    { value: 'counseling', label: 'Orientación psicológica' },
    { value: 'mediation', label: 'Mediación' },
    { value: 'legal', label: 'Asesoría legal' },
    { value: 'resources', label: 'Recursos educativos' },
    { value: 'none', label: 'No necesito apoyo adicional' }
  ];

  if (submitted) {
    return (
      <div className="reports-page">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Reporte Enviado Exitosamente</h2>
            <p>
              Gracias por confiar en nosotros. Tu reporte ha sido recibido y será 
              tratado con la máxima confidencialidad. Nuestro equipo revisará la 
              información y tomará las acciones apropiadas.
            </p>
            <div className="next-steps">
              <h3>Próximos pasos:</h3>
              <ul>
                <li>Revisión del reporte por nuestro equipo especializado</li>
                <li>Contacto contigo si es necesario (si no es anónimo)</li>
                <li>Implementación de medidas de apoyo apropiadas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Canal de Denuncias</h1>
          <p className="page-subtitle">
            Tu voz importa. Reporta situaciones de violencia verbal de manera segura y confidencial.
          </p>
        </div>

        <div className="reports-content">
          <div className="info-section">
            <h2>Información Importante</h2>
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">🔒</div>
                <h3>Confidencialidad</h3>
                <p>Todos los reportes son tratados con absoluta confidencialidad</p>
              </div>
              <div className="info-card">
                <div className="info-icon">👤</div>
                <h3>Anonimato</h3>
                <p>Puedes reportar de forma anónima si lo prefieres</p>
              </div>
              <div className="info-card">
                <div className="info-icon">🤝</div>
                <h3>Apoyo</h3>
                <p>Ofrecemos recursos y apoyo para todas las situaciones</p>
              </div>
            </div>
          </div>

          <div className="form-section">
            <form onSubmit={handleSubmit} className="report-form">
              <h2>Formulario de Reporte</h2>
              
              <div className="form-group">
                <label htmlFor="reportType" className="form-label">
                  Tipo de Situación*
                </label>
                <select
                  id="reportType"
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="verbal-abuse">Abuso verbal directo</option>
                  <option value="threats">Amenazas o intimidación</option>
                  <option value="discrimination">Discriminación verbal</option>
                  <option value="social-exclusion">Exclusión social</option>
                  <option value="cyberbullying">Acoso cibernético</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Descripción de la Situación*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Describe lo que ocurrió de manera detallada. Incluye fechas, lugares y personas involucradas si es posible."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location" className="form-label">
                  Lugar donde ocurrió
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Ej: Aula, patio, redes sociales, etc."
                />
              </div>

              <div className="form-group">
                <label htmlFor="frequency" className="form-label">
                  Frecuencia de la situación
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="one-time">Una sola vez</option>
                  <option value="occasional">Ocasionalmente</option>
                  <option value="frequent">Frecuentemente</option>
                  <option value="daily">Diariamente</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="impact" className="form-label">
                  Impacto en tu bienestar
                </label>
                <select
                  id="impact"
                  name="impact"
                  value={formData.impact}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="minimal">Mínimo</option>
                  <option value="moderate">Moderado</option>
                  <option value="significant">Significativo</option>
                  <option value="severe">Severo</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="support" className="form-label">
                  Tipo de apoyo que necesitas
                </label>
                <select
                  id="support"
                  name="support"
                  value={formData.support}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Selecciona una opción</option>
                  {supportOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  Enviar este reporte de forma anónima
                </label>
                <p className="checkbox-note">
                  Si no marcas esta opción, podremos contactarte para brindar seguimiento personalizado.
                </p>
              </div>

              {!formData.anonymous && (
                <div className="form-group">
                  <label htmlFor="studentId" className="form-label">
                    Carné del estudiante*
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Ej: 2023123"
                    required={!formData.anonymous}
                    maxLength={7}
                    pattern="\d{7}"
                    inputMode="numeric"
                  />
                </div>
              )}
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}
              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Reporte'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;