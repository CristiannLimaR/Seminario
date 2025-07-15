import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminBlog = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Cómo Reconocer los Signos de Violencia Verbal en el Aula',
      excerpt: 'La violencia verbal en el entorno educativo puede ser sutil pero devastadora.',
      author: 'Dr. María González',
      category: 'Educación',
      status: 'published',
      date: '2024-03-15',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: 'El Impacto Psicológico de la Violencia Verbal',
      excerpt: 'Investigación reciente revela cómo las palabras pueden tener efectos duraderos.',
      author: 'Dr. Carlos Mendoza',
      category: 'Investigación',
      status: 'draft',
      date: '2024-03-14',
      image: 'https://images.pexels.com/photos/3825880/pexels-photo-3825880.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ]);

  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: '',
    status: 'draft'
  });

  const categories = ['Educación', 'Investigación', 'Familia', 'Tecnología', 'Recursos'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content: content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      author: formData.author,
      category: formData.category,
      image: formData.image,
      status: formData.status
      // Puedes agregar date si lo necesitas, pero normalmente el backend lo pone
    };

    try {
      const response = await fetch('http://localhost:5000/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      });

      if (response.ok) {
        // Si el backend devuelve el post guardado, puedes usarlo para actualizar el estado
        const savedPost = await response.json();
        setPosts(prev => [savedPost, ...prev]);
        alert('Artículo guardado correctamente');
      } else {
        alert('Error al guardar el artículo');
      }
    } catch {
      alert('Error de red o del servidor');
    }

    // Reset form
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      image: '',
      status: 'draft'
    });
    setShowEditor(false);
    setEditingPost(null);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || '',
      author: post.author,
      category: post.category,
      image: post.image,
      status: post.status
    });
    setShowEditor(true);
  };

  const handleDelete = (postId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const toggleStatus = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, status: post.status === 'published' ? 'draft' : 'published' }
        : post
    ));
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  if (showEditor) {
    return (
      <div className="blog-editor">
        <div className="editor-header">
          <button 
            className="back-button"
            onClick={() => {
              setShowEditor(false);
              setEditingPost(null);
              setFormData({
                title: '',
                excerpt: '',
                content: '',
                author: '',
                category: '',
                image: '',
                status: 'draft'
              });
            }}
          >
            ← Volver a la lista
          </button>
          <h2>{editingPost ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="editor-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Título*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category" className="form-label">Categoría*</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="author" className="form-label">Autor*</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status" className="form-label">Estado</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">URL de la imagen</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="form-input"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt" className="form-label">Extracto*</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              className="form-textarea"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contenido*</label>
            <div className="editor-container">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={quillModules}
                placeholder="Escribe el contenido del artículo aquí..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingPost ? 'Actualizar Artículo' : 'Crear Artículo'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => {
                setShowEditor(false);
                setEditingPost(null);
              }}
            >
              Cancelar
            </button>
          </div>
        </form>

        <style>{`
          .blog-editor {
            max-width: none;
          }

          .editor-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .back-button {
            background: #f3f4f6;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            color: #374151;
            transition: all 0.3s ease;
          }

          .back-button:hover {
            background: #e5e7eb;
          }

          .editor-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #1f2937;
            margin: 0;
          }

          .editor-form {
            background: #f8fafc;
            padding: 2rem;
            border-radius: 12px;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #1f2937;
          }

          .form-input,
          .form-textarea,
          .form-select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
          }

          .form-input:focus,
          .form-textarea:focus,
          .form-select:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }

          .form-textarea {
            resize: vertical;
            min-height: 80px;
          }

          .editor-container {
            background: white;
            border-radius: 8px;
            overflow: hidden;
          }

          .editor-container :global(.ql-editor) {
            min-height: 300px;
            font-size: 1rem;
            line-height: 1.6;
          }

          .form-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
          }

          .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
          }

          .btn-primary {
            background: #2563eb;
            color: white;
          }

          .btn-primary:hover {
            background: #1d4ed8;
          }

          .btn-secondary {
            background: #6b7280;
            color: white;
          }

          .btn-secondary:hover {
            background: #4b5563;
          }

          @media (max-width: 768px) {
            .form-row {
              grid-template-columns: 1fr;
            }

            .form-actions {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-blog">
      <div className="blog-header">
        <div className="header-content">
          <h2>Gestión del Blog</h2>
          <p>Administra las publicaciones y contenido del blog</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowEditor(true)}
        >
          + Nuevo Artículo
        </button>
      </div>

      <div className="blog-stats">
        <div className="stat-item">
          <span className="stat-number">{posts.filter(p => p.status === 'published').length}</span>
          <span className="stat-label">Publicados</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{posts.filter(p => p.status === 'draft').length}</span>
          <span className="stat-label">Borradores</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{posts.length}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-image">
              <img src={post.image} alt={post.title} />
              <span 
                className={`status-badge ${post.status}`}
              >
                {post.status === 'published' ? 'Publicado' : 'Borrador'}
              </span>
            </div>
            
            <div className="post-content">
              <div className="post-meta">
                <span className="post-category">{post.category}</span>
                <span className="post-date">{new Date(post.date).toLocaleDateString('es-ES')}</span>
              </div>
              
              <h3 className="post-title">{post.title}</h3>
              <p className="post-excerpt">{post.excerpt}</p>
              <p className="post-author">Por {post.author}</p>
            </div>
            
            <div className="post-actions">
              <button 
                className="action-btn edit"
                onClick={() => handleEdit(post)}
              >
                ✏️ Editar
              </button>
              <button 
                className="action-btn toggle"
                onClick={() => toggleStatus(post.id)}
              >
                {post.status === 'published' ? '📝 Borrador' : '🚀 Publicar'}
              </button>
              <button 
                className="action-btn delete"
                onClick={() => handleDelete(post.id)}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .admin-blog {
          max-width: none;
        }

        .blog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .header-content p {
          color: #6b7280;
          font-size: 1.125rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: #2563eb;
          color: white;
        }

        .btn-primary:hover {
          background: #1d4ed8;
        }

        .blog-stats {
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

        .posts-list {
          display: grid;
          gap: 1.5rem;
        }

        .post-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 200px 1fr auto;
          gap: 1.5rem;
          transition: all 0.3s ease;
        }

        .post-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .post-image {
          position: relative;
          height: 150px;
          overflow: hidden;
        }

        .post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .status-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          color: white;
        }

        .status-badge.published {
          background: #10b981;
        }

        .status-badge.draft {
          background: #f59e0b;
        }

        .post-content {
          padding: 1.5rem 0;
        }

        .post-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }

        .post-category {
          background: #dbeafe;
          color: #2563eb;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-weight: 500;
        }

        .post-date {
          color: #6b7280;
        }

        .post-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .post-excerpt {
          color: #6b7280;
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        .post-author {
          color: #9ca3af;
          font-size: 0.875rem;
          font-style: italic;
        }

        .post-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.5rem;
          justify-content: center;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .action-btn.edit {
          background: #f3f4f6;
          color: #374151;
        }

        .action-btn.edit:hover {
          background: #e5e7eb;
        }

        .action-btn.toggle {
          background: #dbeafe;
          color: #2563eb;
        }

        .action-btn.toggle:hover {
          background: #bfdbfe;
        }

        .action-btn.delete {
          background: #fef2f2;
          color: #dc2626;
        }

        .action-btn.delete:hover {
          background: #fecaca;
        }

        @media (max-width: 768px) {
          .blog-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .blog-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .post-card {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .post-image {
            height: 200px;
          }

          .post-actions {
            flex-direction: row;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminBlog;