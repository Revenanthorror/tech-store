import Layout from './components/Layout';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import './App.css';

export default function App() {
  const products = [
    {
      id: 1,
      name: 'Беспроводные наушники',
      price: 129.99,
      description: 'Шумоподавляющие уши'
    },
    {
      id: 2,
      name: 'Умные часы',
      price: 249.99,
      description: 'Фитнес трекер'
    },
    {
      id: 3,
      name: 'Механическая клава',
      price: 89.99,
      description: 'Ваще бомба'
    }
  ];

  return (
    <Layout>
      <Header 
        title="Техно магазин" 
        subtitle="Не знаю че тут написать" 
      />
      
      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </Layout>
  );
}