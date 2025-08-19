import React, { useState } from 'react';
import styles from '../App.module.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic would go here
    console.log('Searching for:', searchTerm, 'in category:', category);
  };

  return (
    <section className={styles.searchSection}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for cosmetics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="skincare">Skincare</option>
          <option value="makeup">Makeup</option>
          <option value="haircare">Haircare</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </section>
  );
};

export default Search;