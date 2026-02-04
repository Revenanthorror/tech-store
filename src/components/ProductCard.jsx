import { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ image, name, price, description }) {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      
      <div className="card-content">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        
      
        {price > 10000 && <span className="sale-badge">Хит продаж!</span>}
        
        <div className="price-row">
          <span className="product-price">{price.toFixed(2)} ₽</span>
          
          <button onClick={handleLike} className="like-btn">
             ❤️ {likes}
          </button>
        </div>
      </div>
    </div>
  );
}