import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminReports from './AdminReports';
import AdminBlog from './AdminBlog';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'reports', label: 'Denuncias', icon: '📋' },
    { id: 'blog', label: 'Blog', icon: '📝' }
  ];

  const handleLogout = () => {
    logout();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'reports':
        return <AdminReports />;
      case 'blog':
        return <AdminBlog />;
      case 'dashboard':
      default:
        return (
          <div className="dashboard-overview">
            <div className="welcome-section">
              <h2>Bienvenido al Panel de Administración</h2>
              <p>Desde aquí puedes gestionar denuncias, publicaciones del blog y ver estadísticas de la plataforma.</p>
            </div>
            {/* Aquí puedes agregar más widgets o estadísticas */}
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <div className="admin-logo">
              <span className="logo-icon">🛡️</span>
              <span className="logo-text">Voz Segura - Admin</span>
            </div>
            <div className="admin-user">
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="container">
          <div className="admin-layout">
            <nav className="admin-sidebar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="sidebar-icon">{tab.icon}</span>
                  <span className="sidebar-label">{tab.label}</span>
                </button>
              ))}
            </nav>

            <main className="admin-main">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>

      <style>{`
        .admin-dashboard {
          min-height: 100vh;
          background: #f4f6fb;
        }

        .admin-header {
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          padding: 1rem 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .admin-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
        }

        .logo-icon {
          font-size: 1.5rem;
          color: #2563eb;
        }

        .admin-user {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-name {
          color: #1f2937;
          font-weight: 500;
        }

        .logout-btn {
          background: #dc2626;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.3s ease;
          font-weight: 600;
          box-shadow: 0 2px 8px 0 rgba(220,38,38,0.08);
        }

        .logout-btn:hover {
          background: #991b1b;
        }

        .admin-content {
          padding: 2rem 0;
        }

        .admin-layout {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 2rem;
        }

        .admin-sidebar {
          background: #f1f5f9;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.07);
          height: fit-content;
        }

        .sidebar-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: none;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 0.5rem;
          text-align: left;
          color: #1e293b;
          font-weight: 500;
        }

        .sidebar-item:hover {
          background: #e0e7ef;
        }

        .sidebar-item.active {
          background: #2563eb;
          color: #fff;
        }

        .sidebar-icon {
          font-size: 1.25rem;
          color: #2563eb;
        }

        .sidebar-label {
          font-weight: 600;
        }

        .admin-main {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.07);
        }

        .dashboard-overview {
          max-width: none;
        }

        .welcome-section {
          margin-bottom: 2rem;
        }

        .welcome-section h2 {
          font-size: 2rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .welcome-section p {
          color: #374151;
          font-size: 1.125rem;
          font-weight: 500;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          font-size: 2rem;
          background: #dbeafe;
          padding: 0.75rem;
          border-radius: 12px;
        }

        .stat-info h3 {
          font-size: 0.875rem;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .recent-activity h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 8px;
        }

        .activity-icon {
          font-size: 1.25rem;
          background: #e0f2fe;
          padding: 0.5rem;
          border-radius: 8px;
        }

        .activity-content p {
          margin: 0;
        }

        .activity-time {
          font-size: 0.875rem;
          color: #6b7280;
        }

        @media (max-width: 768px) {
          .admin-layout {
            grid-template-columns: 1fr;
          }

          .admin-sidebar {
            display: flex;
            overflow-x: auto;
            padding: 1rem;
          }

          .sidebar-item {
            flex-shrink: 0;
            margin-right: 0.5rem;
            margin-bottom: 0;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;