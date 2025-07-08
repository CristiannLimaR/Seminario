import { useState } from 'react';

const Reports = () => {
  const [formData, setFormData] = useState({
    reportType: '',
    description: '',
    location: '',
    frequency: '',
    impact: '',
    support: '',
    anonymous: true
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí normalmente enviarías los datos a un servidor
    console.log('Reporte enviado:', formData);
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
        anonymous: true
      });
    }, 3000);
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
            
            <div className="emergency-contact">
              <h3>¿Necesitas ayuda inmediata?</h3>
              <p>
                Si estás en una situación de emergencia, contacta inmediatamente:
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Línea de Crisis:</strong> 800-123-4567
                </div>
                <div className="contact-item">
                  <strong>Email de Emergencia:</strong> emergencia@vozsegura.org
                </div>
                <div className="contact-item">
                  <strong>Chat en Vivo:</strong> Disponible 24/7
                </div>
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

              <button type="submit" className="btn btn-primary submit-btn">
                Enviar Reporte
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .reports-page {
          padding: 2rem 0;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        
        .page-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .reports-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        
        .info-section {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .info-section h2 {
          color: #1f2937;
          margin-bottom: 1.5rem;
        }
        
        .info-cards {
          display: grid;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .info-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 12px;
        }
        
        .info-icon {
          font-size: 1.5rem;
          background: #dbeafe;
          padding: 0.5rem;
          border-radius: 8px;
        }
        
        .info-card h3 {
          margin: 0;
          color: #1f2937;
          font-size: 1rem;
        }
        
        .info-card p {
          margin: 0;
          color: #6b7280;
          font-size: 0.9rem;
        }
        
        .emergency-contact {
          background: #fef2f2;
          padding: 1.5rem;
          border-radius: 12px;
          border-left: 4px solid #dc2626;
        }
        
        .emergency-contact h3 {
          color: #dc2626;
          margin-bottom: 0.5rem;
        }
        
        .contact-info {
          margin-top: 1rem;
        }
        
        .contact-item {
          padding: 0.5rem 0;
          color: #374151;
        }
        
        .form-section {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .report-form h2 {
          color: #1f2937;
          margin-bottom: 1.5rem;
        }
        
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          color: #1f2937;
        }
        
        .form-checkbox {
          width: 1rem;
          height: 1rem;
        }
        
        .checkbox-note {
          color: #6b7280;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
        
        .submit-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.125rem;
          margin-top: 1rem;
        }
        
        .success-message {
          text-align: center;
          background: white;
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
        }
        
        .success-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        
        .success-message h2 {
          color: #059669;
          margin-bottom: 1rem;
        }
        
        .success-message p {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        
        .next-steps {
          text-align: left;
          background: #f0f9ff;
          padding: 1.5rem;
          border-radius: 12px;
        }
        
        .next-steps h3 {
          color: #1f2937;
          margin-bottom: 1rem;
        }
        
        .next-steps ul {
          list-style: none;
          padding: 0;
        }
        
        .next-steps li {
          padding: 0.5rem 0;
          color: #6b7280;
          position: relative;
          padding-left: 1.5rem;
        }
        
        .next-steps li::before {
          content: '✓';
          color: #059669;
          position: absolute;
          left: 0;
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .reports-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .info-section,
          .form-section {
            padding: 1.5rem;
          }
          
          .page-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Reports;