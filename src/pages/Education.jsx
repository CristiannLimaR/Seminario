import { useState } from 'react';

const Education = () => {
  const [activeTab, setActiveTab] = useState('tipos');

  const tabs = [
    { id: 'tipos', label: 'Tipos de Violencia' },
    { id: 'consecuencias', label: 'Consecuencias' },
    { id: 'prevencion', label: 'Prevención' },
    { id: 'senales', label: 'Señales de Alerta' }
  ];

  const violenceTypes = [
    {
      title: 'Insultos y Humillaciones',
      description: 'Uso de palabras ofensivas, apodos hirientes o comentarios que buscan humillar.',
      examples: ['Insultos directos', 'Apodos despectivos', 'Comentarios sobre apariencia física'],
      icon: '🗣️'
    },
    {
      title: 'Amenazas Verbales',
      description: 'Expresiones que buscan intimidar o generar temor en la víctima.',
      examples: ['Amenazas de daño físico', 'Chantaje emocional', 'Intimidación psicológica'],
      icon: '⚠️'
    },
    {
      title: 'Discriminación Verbal',
      description: 'Comentarios basados en características personales como raza, género, religión.',
      examples: ['Comentarios racistas', 'Discriminación por género', 'Burlas por creencias'],
      icon: '🚫'
    },
    {
      title: 'Exclusión Social',
      description: 'Uso de palabras para aislar o excluir a alguien del grupo.',
      examples: ['Rumores maliciosos', 'Exclusión intencional', 'Aislamiento verbal'],
      icon: '👥'
    }
  ];

  const consequences = [
    {
      category: 'Emocionales',
      effects: ['Baja autoestima', 'Ansiedad', 'Depresión', 'Estrés crónico'],
      icon: '💔',
      color: 'bg-red-100'
    },
    {
      category: 'Sociales',
      effects: ['Aislamiento', 'Dificultad para relacionarse', 'Pérdida de confianza', 'Problemas familiares'],
      icon: '👫',
      color: 'bg-blue-100'
    },
    {
      category: 'Académicas/Laborales',
      effects: ['Bajo rendimiento', 'Ausentismo', 'Dificultad de concentración', 'Pérdida de oportunidades'],
      icon: '📚',
      color: 'bg-green-100'
    },
    {
      category: 'Físicas',
      effects: ['Dolores de cabeza', 'Problemas del sueño', 'Trastornos alimentarios', 'Fatiga'],
      icon: '🏥',
      color: 'bg-yellow-100'
    }
  ];

  const preventionStrategies = [
    {
      title: 'Educación y Conciencia',
      description: 'Promover la comprensión sobre el impacto de las palabras',
      actions: ['Talleres educativos', 'Campañas de concienciación', 'Recursos informativos'],
      icon: '🎓'
    },
    {
      title: 'Comunicación Asertiva',
      description: 'Aprender a expresarse de manera respetuosa y clara',
      actions: ['Técnicas de comunicación', 'Manejo de emociones', 'Resolución de conflictos'],
      icon: '💬'
    },
    {
      title: 'Apoyo Comunitario',
      description: 'Crear redes de apoyo y espacios seguros',
      actions: ['Grupos de apoyo', 'Programas de mentorías', 'Espacios de diálogo'],
      icon: '🤝'
    },
    {
      title: 'Políticas y Protocolos',
      description: 'Establecer normas claras y consecuencias',
      actions: ['Códigos de conducta', 'Protocolos de denuncia', 'Medidas disciplinarias'],
      icon: '📋'
    }
  ];

  const warningSignals = [
    {
      category: 'En la Víctima',
      signals: [
        'Cambios en el comportamiento',
        'Aislamiento social',
        'Bajada del rendimiento',
        'Síntomas de ansiedad o depresión',
        'Evitación de ciertos lugares o personas'
      ],
      icon: '🚨'
    },
    {
      category: 'En el Agresor',
      signals: [
        'Patrones de comportamiento agresivo',
        'Dificultad para controlar la ira',
        'Falta de empatía',
        'Tendencia a culpar a otros',
        'Historial de conflictos'
      ],
      icon: '⚡'
    },
    {
      category: 'En el Entorno',
      signals: [
        'Ambiente tenso o hostil',
        'Normalización de comportamientos agresivos',
        'Falta de intervención por parte de testigos',
        'Ausencia de políticas claras',
        'Cultura de silencio'
      ],
      icon: '🌍'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'tipos':
        return (
          <div className="content-section">
            <h3 className="content-title">Tipos de Violencia Verbal</h3>
            <p className="content-description">
              La violencia verbal puede manifestarse de diferentes formas. Es importante reconocer 
              estos patrones para poder identificarlos y prevenirlos.
            </p>
            <div className="grid grid-2">
              {violenceTypes.map((type, index) => (
                <div key={index} className="card fade-in">
                  <div className="card-icon bg-primary-light">
                    {type.icon}
                  </div>
                  <h4 className="card-title">{type.title}</h4>
                  <p className="card-description">{type.description}</p>
                  <div className="examples">
                    <h5>Ejemplos:</h5>
                    <ul>
                      {type.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'consecuencias':
        return (
          <div className="content-section">
            <h3 className="content-title">Consecuencias de la Violencia Verbal</h3>
            <p className="content-description">
              La violencia verbal tiene efectos profundos y duraderos que afectan múltiples aspectos 
              de la vida de una persona.
            </p>
            <div className="grid grid-2">
              {consequences.map((consequence, index) => (
                <div key={index} className="card fade-in">
                  <div className={`card-icon ${consequence.color}`}>
                    {consequence.icon}
                  </div>
                  <h4 className="card-title">{consequence.category}</h4>
                  <ul className="effects-list">
                    {consequence.effects.map((effect, idx) => (
                      <li key={idx}>{effect}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'prevencion':
        return (
          <div className="content-section">
            <h3 className="content-title">Estrategias de Prevención</h3>
            <p className="content-description">
              La prevención es clave para crear entornos libres de violencia verbal. 
              Aquí te presentamos estrategias efectivas.
            </p>
            <div className="grid grid-2">
              {preventionStrategies.map((strategy, index) => (
                <div key={index} className="card fade-in">
                  <div className="card-icon bg-secondary-light">
                    {strategy.icon}
                  </div>
                  <h4 className="card-title">{strategy.title}</h4>
                  <p className="card-description">{strategy.description}</p>
                  <div className="actions">
                    <h5>Acciones:</h5>
                    <ul>
                      {strategy.actions.map((action, idx) => (
                        <li key={idx}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'senales':
        return (
          <div className="content-section">
            <h3 className="content-title">Señales de Alerta</h3>
            <p className="content-description">
              Reconocer las señales de alerta es fundamental para intervenir a tiempo 
              y prevenir la escalada de la violencia verbal.
            </p>
            <div className="grid grid-3">
              {warningSignals.map((signal, index) => (
                <div key={index} className="card fade-in">
                  <div className="card-icon bg-accent-light">
                    {signal.icon}
                  </div>
                  <h4 className="card-title">{signal.category}</h4>
                  <ul className="signals-list">
                    {signal.signals.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="education-page">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="text-primary"> Violencia Verbal</span>
            </h1>
            <p className="hero-subtitle">
              Bienvenido a Voz Segura, tu plataforma educativa para aprender, prevenir y 
              crear conciencia sobre la violencia verbal. Juntos construimos entornos más seguros y respetuosos.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">85%</div>
                <div className="stat-label">De los casos no se reportan</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1 de 4</div>
                <div className="stat-label">Personas han experimentado violencia verbal</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Confidencialidad garantizada</div>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Grupo de personas conversando de manera respetuosa"
              className="hero-img"
            />
          </div>
        </div>
        
        <div className="tabs-container">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="tab-content">
            {renderContent()}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .education-page {
          padding: 2rem 0;
        }
        
        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 4rem;
          padding: 2rem 0;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border-radius: 20px;
          padding: 3rem;
        }
        
        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }
        
        .hero-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          margin-bottom: 2rem;
          line-height: 1.7;
        }
        
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .stat-item {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        
        .stat-number {
          font-size: 1.75rem;
          font-weight: 700;
          color: #2563eb;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: #6b7280;
          line-height: 1.3;
        }
        
        .hero-image {
          display: flex;
          justify-content: center;
        }
        
        .hero-img {
          width: 100%;
          max-width: 500px;
          border-radius: 20px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .tabs-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .tabs {
          display: flex;
          border-bottom: 1px solid #e5e7eb;
          background: #f8fafc;
        }
        
        .tab {
          flex: 1;
          padding: 1rem 2rem;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 500;
          color: #6b7280;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .tab:hover {
          background: #f1f5f9;
          color: #2563eb;
        }
        
        .tab-active {
          color: #2563eb;
          background: white;
        }
        
        .tab-active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 3px;
          background: #2563eb;
        }
        
        .tab-content {
          padding: 3rem;
        }
        
        .content-section {
          animation: fadeIn 0.5s ease-in;
        }
        
        .content-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        
        .content-description {
          font-size: 1.125rem;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        
        .examples h5,
        .actions h5 {
          font-weight: 600;
          color: #1f2937;
          margin: 1rem 0 0.5rem 0;
        }
        
        .examples ul,
        .actions ul,
        .effects-list,
        .signals-list {
          list-style: none;
          padding: 0;
        }
        
        .examples li,
        .actions li,
        .effects-list li,
        .signals-list li {
          padding: 0.25rem 0;
          color: #6b7280;
          position: relative;
          padding-left: 1.5rem;
        }
        
        .examples li::before,
        .actions li::before,
        .effects-list li::before,
        .signals-list li::before {
          content: '•';
          color: #2563eb;
          position: absolute;
          left: 0;
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
            padding: 2rem;
          }
          
          .hero-stats {
            grid-template-columns: 1fr;
          }
          
          .tabs {
            flex-direction: column;
          }
          
          .tab-content {
            padding: 2rem 1rem;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .content-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Education;