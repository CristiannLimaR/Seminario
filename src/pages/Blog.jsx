import { useState } from 'react';
import './Blog.css';
import ReactMarkdown from 'react-markdown';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: 'Cómo Reconocer los Signos de Violencia Verbal en el Aula',
      excerpt: 'La violencia verbal en el entorno educativo puede ser sutil pero devastadora. Aprende a identificar las señales tempranas.',
      author: 'Dr. María González',
      date: '15 de Marzo, 2024',
      category: 'Educación',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: `
## ¿Qué es la violencia verbal?

La violencia verbal incluye insultos, humillaciones, amenazas y comentarios despectivos que afectan la autoestima y el bienestar emocional de los estudiantes.

### Señales de alerta:

- Cambios repentinos en el comportamiento.
- Aislamiento social.
- Bajo rendimiento académico.

Es fundamental que docentes y padres estén atentos a estos signos para intervenir a tiempo.
      `
    },
    {
      id: 3,
      title: 'Estrategias Efectivas para Padres: Abordando la Violencia Verbal en Casa',
      excerpt: 'Guía práctica para padres sobre cómo crear un ambiente familiar libre de violencia verbal y promover la comunicación respetuosa.',
      author: 'Lic. Ana Rodríguez',
      date: '2 de Marzo, 2024',
      category: 'Familia',
      image: 'https://images.pexels.com/photos/4545958/pexels-photo-4545958.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: `
## Ambiente familiar saludable

La comunicación respetuosa es clave para prevenir la violencia verbal en casa. Los padres deben ser ejemplo de autocontrol y empatía.

### Consejos prácticos:

- Escucha activa y sin juicios.
- Establece límites claros y positivos.
- Fomenta la expresión emocional saludable.
      `
    },
    {
      id: 4,
      title: 'Tecnología y Violencia Verbal: Navegando el Mundo Digital Seguro',
      excerpt: 'Cómo las redes sociales y plataformas digitales han cambiado la cara de la violencia verbal y qué podemos hacer al respecto.',
      author: 'Dr. Roberto Silva',
      date: '25 de Febrero, 2024',
      category: 'Tecnología',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: `
## Redes sociales y ciberacoso

La violencia verbal en línea puede ser tan dañina como la presencial. Es importante educar sobre el uso responsable de la tecnología.

### ¿Qué hacer?

- Habla abiertamente sobre los riesgos digitales.
- Supervisa el uso de dispositivos.
- Promueve el respeto y la empatía en línea.
      `
    }
  ];

  const categories = ['Todos', 'Educación', 'Investigación', 'Familia', 'Tecnología'];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPosts = selectedCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  if (selectedPost) {
    return (
      <div className="blog-page">
        <div className="container">
          <button 
            className="back-button"
            onClick={() => setSelectedPost(null)}
          >
            ← Volver al Blog
          </button>
          
          <article className="blog-post">
            <header className="post-header">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="post-image"
              />
              <div className="post-meta">
                <span className="post-category">{selectedPost.category}</span>
                <span className="post-date">{selectedPost.date}</span>
              </div>
              <h1 className="post-title">{selectedPost.title}</h1>
              <p className="post-author">Por {selectedPost.author}</p>
            </header>
            
            <div className="post-content">
             {selectedPost.content && (
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
              )}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* Elimino el div className="container" y muevo su contenido directamente aquí */}
        <div className="page-header">
          <h1 className="page-title">Blog y Novedades</h1>
          <p className="page-subtitle">
            Mantente informado con las últimas investigaciones, consejos y recursos 
            sobre la prevención de la violencia verbal
          </p>
        </div>

        <div className="blog-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="card-image">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="post-thumbnail"
                />
                <span className="card-category">{post.category}</span>
              </div>
              
              <div className="card-content">
                <h2 className="card-title">{post.title}</h2>
                <p className="card-excerpt">{post.excerpt}</p>
                
                <div className="card-meta">
                  <span className="card-author">{post.author}</span>
                  <span className="card-date">{post.date}</span>
                </div>
                
                <button 
                  className="read-more-btn"
                  onClick={() => setSelectedPost(post)}
                >
                  Leer más →
                </button>
              </div>
            </article>
          ))}
        </div>
    </div>
  );
};

export default Blog;