import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  useEffect(() => {
    console.log('Компонент Shop смонтирован (Mounting)');

    return () => {
      console.log('Компонент Shop размонтирован (Unmounting)');
    };
  }, []);

  const products = [
    {
      id: 1,
      name: 'Беспроводные наушники',
      price: 12000,
      description: 'Шумоподавляющие уши',
    },
    {
      id: 2,
      name: 'Умные часы',
      price: 8000,
      description: 'Фитнес трекер',
    },
    {
      id: 3,
      name: 'Механическая клава',
      price: 10000,
      description: 'Ваще бомба',
    }
  ];

  return (
    <>
      <Header 
        title="Техно магазин" 
        subtitle="Лучшие гаджеты по лучшим ценам" 
      />
      
      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))
        ) : (
          <p>Товаров нет в наличии</p>
        )}
      </div>
    </>
  );
}