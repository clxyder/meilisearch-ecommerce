import React from 'react';
import { SearchBox } from 'react-instantsearch';
import styles from '@/styles/nav-bar.module.css';

export default function NavBar() {
  return (
    <div className={styles.container}>
      <SearchBox />
    </div>
  );
};
