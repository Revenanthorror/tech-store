import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <div className="container">
        {children}
      </div>
    </div>
  );
}