const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="footer-icon">🛡️</span>
              Voz Segura
            </h3>
            <p className="footer-description">
              Plataforma dedicada a la prevención y concienciación sobre la violencia verbal.
              Juntos construimos un entorno más seguro y respetuoso.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li><a href="/">Educación</a></li>
              <li><a href="/denuncias">Denuncias</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Ayuda</h4>
            <ul className="footer-links">
              <li><a href="/denuncias">Reportar Situación</a></li>
              <li><a href="/blog">Blog y Noticias</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Contacto</h4>
            <p className="footer-contact">
              📧 info@vozsegura.org<br />
              📞 800-123-4567<br />
              🌐 www.vozsegura.org
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Voz Segura. Todos los derechos reservados.</p>
          <p>Plataforma educativa sin fines de lucro</p>
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background-color: #1f2937;
          color: white;
          padding: 3rem 0 1rem;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .footer-section h3.footer-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: white;
        }
        
        .footer-icon {
          font-size: 1.5rem;
        }
        
        .footer-description {
          color: #9ca3af;
          line-height: 1.6;
        }
        
        .footer-subtitle {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: #f9fafb;
        }
        
        .footer-links {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 0.5rem;
        }
        
        .footer-links a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: #60a5fa;
        }
        
        .footer-contact {
          color: #9ca3af;
          line-height: 1.8;
        }
        
        .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 2rem;
          text-align: center;
          color: #9ca3af;
        }
        
        .footer-bottom p {
          margin: 0.25rem 0;
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .footer {
            padding: 2rem 0 1rem;
          }
          
          .footer-content {
            gap: 1.5rem;
          }
          
          .footer-section {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;