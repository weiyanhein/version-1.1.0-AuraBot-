import React, { useEffect, useState } from 'react';
import './ProductsPage.css';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const categoryList = [
  'SERUM', 'MIST', 'CLEANSER', 'TONER',
  'SUNSCREEN', 'MOISTURISER', 'BODY WASH',
  'FACE WASH', 'BODY LOTION', 'LIP'
];

const ITEMS_PER_PAGE = 5;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [modalProduct, setModalProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/products`)
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    let result = products;

    if (searchTerm) {
      result = products.filter(p =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.concerns?.some(c => c.toLowerCase().includes(lower))
      );
    } else if (activeCategory) {
      result = products.filter(p =>
        p.product_type.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [searchTerm, activeCategory, products]);

  useEffect(() => {
    if (modalProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalProduct]);

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="products-page">
      <h1 className="page-title">Explore Skincare Products</h1>

      <div className="search-filter-container">
        <div className="search-bar-wrapper">
          <input
            className="search-bar"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <div className="filter-buttons-scroll-container">
          <div className="filter-buttons">
            {categoryList.map(type => (
              <button
                key={type}
                className={`filter-btn ${activeCategory === type ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(type);
                  setSearchTerm('');
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="product-grid">
        {currentProducts.map((product, index) => (
          <div className="product-card" key={index} onClick={() => setModalProduct(product)}>
            <div className="product-image-container">
              <img
                src={`${BASE_URL}${product.imageUrl}?v=${Date.now()}`}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-text-container">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-brand">{product.brand}</p>
              </div>
              <span className="product-type-badge">{product.product_type}</span>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹ Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ›
          </button>
        </div>
      )}

      {modalProduct && (
        <div className="modal-overlay" onClick={() => setModalProduct(null)}>
          <div className="modern-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setModalProduct(null)}>×</button>
            <div className="modal-content-wrapper">
              <div className="modal-left-section">
                <div className="modal-image-container">
                  <img
                    src={`${BASE_URL}/api/product-images/${modalProduct.image_filename}?v=${Date.now()}`}
                    alt={modalProduct.name}
                    className="modal-image-large"
                  />
                </div>
                <div className="modal-product-details">
                  <h2 className="modal-product-name">{modalProduct.name}</h2>
                  <p className="modal-brand-name">{modalProduct.brand}</p>
                  <span className="modern-badge">{modalProduct.product_type}</span>
                </div>
              </div>
              <div className="modal-right-section">
                <div className="modal-info-blocks">
                  {modalProduct.benefits?.length > 0 && (
                    <div className="info-block">
                      <h4>✨ Benefits</h4>
                      <p>{Array.isArray(modalProduct.benefits) ? modalProduct.benefits.join(', ') : modalProduct.benefits}</p>
                    </div>
                  )}
                  {modalProduct.concerns?.length > 0 && (
                    <div className="info-block">
                      <h4>💧 Concerns</h4>
                      <p>{Array.isArray(modalProduct.concerns) ? modalProduct.concerns.join(', ') : modalProduct.concerns}</p>
                    </div>
                  )}
                  {modalProduct.ingredients && (
                    <div className="info-block">
                      <h4>🌿 Ingredients</h4>
                      <p>{modalProduct.ingredients}</p>
                    </div>
                  )}
                  {modalProduct.usage && (
                    <div className="info-block">
                      <h4>🧴 Usage</h4>
                      <p>{modalProduct.usage}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;