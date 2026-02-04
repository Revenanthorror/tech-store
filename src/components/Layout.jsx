import '../styles/global.css'; 

export default function Layout({ children }) {
  const bgStyle = {
    backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2zDJSV9H4K-CmuUQ-PWatBY6DBPyRicfqw&s")', // Пример фона
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '20px'
  };

  return (
    <div style={bgStyle}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </div>
    </div>
  );
}