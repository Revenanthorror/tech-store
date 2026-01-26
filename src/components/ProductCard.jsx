export default function ProductCard({ image, name, price, description }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <span className="product-price">${price.toFixed(2)}</span>
    </div>
  );
}