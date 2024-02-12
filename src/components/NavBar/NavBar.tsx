"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiShoppingBag } from 'react-icons/bi';
import { SearchBox } from 'react-instantsearch';
import MeilisearchLogo from '@/public/meilisearch-logo.svg'
import styles from '@/styles/nav-bar.module.css';

export default function NavBar() {
  return (
    <div className={styles.container}>
      <Link href="/" style={{ width: '125px' }}>
        <Image src={MeilisearchLogo} width={75} alt="logo" />
      </Link>
      <SearchBox />
      <button className={styles.btn}>
        <BiShoppingBag /> <span>0</span>
      </button>
    </div>
  );
};
