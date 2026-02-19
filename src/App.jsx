import Layout from './components/Layout';
import Shop from './containers/Shop';
import PostList from './components/PostList';
import MovieSearch from './components/MovieSearch';
import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('shop');
  
  return (
    <Layout>
      <div className="tabs">
        <button onClick={() => setActiveTab('shop')} className={activeTab === 'shop' ? 'active' : ''}>
          Магазин
        </button>
        <button onClick={() => setActiveTab('posts')} className={activeTab === 'posts' ? 'active' : ''}>
          JSON Placeholder
        </button>
        <button onClick={() => setActiveTab('movies')} className={activeTab === 'movies' ? 'active' : ''}>
          Кинопоиск
        </button>
      </div>
      
      <div className="content">
        {activeTab === 'shop' && <Shop />}
        {activeTab === 'posts' && <PostList />}
        {activeTab === 'movies' && <MovieSearch />}
      </div>
    </Layout>
  );
}