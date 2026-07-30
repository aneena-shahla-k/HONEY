import React, { useState } from 'react';
import './FeaturedProduct.css';

import chair1 from '../../images/products/BF140.jpg';
import chair2 from '../../images/products/BF1KG.jpg';
import chair3 from '../../images/products/BF500.jpg';
import chair4 from '../../images/products/BF140.jpg';
import chair5 from '../../images/products/pure1kg.jpg';
import chair6 from '../../images/products/pure140.jpg';
import chair7 from '../../images/products/pure240.jpg';
import chair8 from '../../images/products/pure500.jpg';
import chair9 from '../../images/products/dryfr.jpg';
import chair10 from '../../images/products/sting140.jpg';
import chair11 from '../../images/products/sting500.jpg';
import chair12 from '../../images/products/Sd500.jpg';
import chair13 from '../../images/products/SH140.jpg';
import chair14 from '../../images/products/SD1kg.jpg';

// 1. പ്രോപ്പായി onAddToCart സ്വീകരിക്കുന്നു
const FeaturedProducts = ({ onAddToCart }) => {
  // State for active filter tab
  const [activeFilter, setActiveFilter] = useState('All');

  // 5 Filter Tabs Categories
  const categories = ['All', 'Black Forest', 'Pure Natural', 'Sidr Honey', 'Stingless & Specialty'];

  // Sample products data array with categories assigned
  const products = [
    { id: 1, name: 'Black Forest Honey 240g', price: 399, category: 'Black Forest', img: chair1 },
    { id: 2, name: 'Black Forest Honey 1kg', price: 1499, category: 'Black Forest', img: chair2 },
    { id: 3, name: 'Black Forest Honey 500g', price: 799, category: 'Black Forest', img: chair3 },
    { id: 4, name: 'Black Forest Honey 140g', price: 229, category: 'Black Forest', img: chair4 },
    { id: 5, name: 'Pure Natural Honey 1kg', price: 950, category: 'Pure Natural', img: chair5 },
    { id: 6, name: 'Pure Natural Honey 140g', price: 160, category: 'Pure Natural', img: chair6 },
    { id: 7, name: 'Pure Natural Honey 240g', price: 260, category: 'Pure Natural', img: chair7 },
    { id: 8, name: 'Pure Natural Honey 500g', price: 510, category: 'Pure Natural', img: chair8 },
    { id: 9, name: 'Dry fruits with Honey 300g', price: 650, category: 'Stingless & Specialty', img: chair9 },
    { id: 10, name: 'Stingless Honey 140g', price: 229, category: 'Stingless & Specialty', img: chair10 },
    { id: 11, name: 'Stingless Honey 500g', price: 2350, category: 'Stingless & Specialty', img: chair11 },
    { id: 12, name: 'Sidr Honey 500g', price: 799, category: 'Sidr Honey', img: chair12 },
    { id: 13, name: 'Sidr Honey 140g', price: 229, category: 'Sidr Honey', img: chair13 },
    { id: 14, name: 'Sidr Honey 1kg', price: 1499, category: 'Sidr Honey', img: chair14 },
  ];

  // Filter products according to selected tab
  const filteredProducts = activeFilter === 'All'
    ? products
    : products.filter((product) => product.category === activeFilter);

  const handleAddToCartClick = (e, product) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.img,
      });
    }
  };

  return (
    <section className="featured-section">
      
      {/* FILTER TABS */}
      <div className="filter-tabs-container" > 
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FEATURED PRODUCTS GRID */}
      <div className="row featured g-2 g-md-4 justify-content-center my-4 px-2 px-md-5">
        {filteredProducts.map((product) => (
          <div className="col-6 col-md-4 col-lg-3" key={product.id}>
            <div className="product-card" data-aos="fade-up"
     data-aos-duration="3000">
              <img
                src={product.img}
                alt={product.name}
                className="img-fluid"
              />
              <h6>{product.name}</h6>
              <p className="price">₹{product.price}</p>
              <button
                type="button"
                className="add-cart-btn"
                onClick={(e) => handleAddToCartClick(e, product)}
                aria-label={`Add ${product.name} to cart`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default FeaturedProducts;
