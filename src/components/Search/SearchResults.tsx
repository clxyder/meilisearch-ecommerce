"use client";

import React from 'react';
import Link from 'next/link';
import {
  Pagination,
  SortBy,
  useInstantSearch,
} from 'react-instantsearch';
import SearchFilters from './SearchFilters';
import { Product } from '@/types';
import styles from '@/styles/search-result.module.css';

const getString = (str: string, length = 40, desc: string) => {
  const strng = str.replace(/[^\w\s]/gi, '')
  if (!strng) {
    const description = desc.replace(/[^\w\s]/gi, '')
    return `${description.substring(0, length)}${
      description.length > length ? '...' : ''
    }`
  }
  return `${strng?.substring(0, length)}${strng.length > length ? '...' : ''}`
}

const Hit = ({ product }: {product: Product}) => {
  const reviewCount = product?.reviews_count || 1;
  const { rating, images, title, description, brand, price } = product;

  return (
    <div className={styles.card}>
      <Link
        href={{
          pathname: `/product/${product.id}`,
        }}
        passHref
      >
        <div
          className={styles.productResImg}
          style={{ backgroundImage: `url(${images[0]})` }}
        />
        <div className={styles.productResCntnt}>
          <h6 className={styles.productResBrand}>{brand}</h6>
          <div className={styles.productResTitl}>{title}</div>
          <div className={styles.productResDesc}>
            {getString(description, 40, title)}
          </div>
          <div className={styles.productResPrice}>${price}</div>
          <div className={styles.productResReview}>
            {reviewCount ? (
              <div className={styles.productRateWrap}>
                <span className={styles.productRate}>
                  {reviewCount} review
                  {reviewCount === 1 ? '' : 's'}
                </span>{' '}
                <span>⭐ {rating}</span>
              </div>
            ) : (
              'No Review'
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export function SearchResults() {
  const { results, status } = useInstantSearch();
  const hits = results?.hits;

  if (!results) {
    return 'Loading'
  }

  return (
    <>
      <SearchFilters />
      <div className={styles.products}>
        {results.nbHits !== 0 ? (
          <>
            <div className={styles.resultPara}>
              <span>
                Showing {results?.hits.length || 0} of{' '}
                {results?.nbHits || 0}{' '}
                {results.query &&
                  status === "idle" &&
                  `for "${results.query}"`}
              </span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <SortBy
                  items={[
                    {
                      value: 'products',
                      label: 'Default Sort'
                    },
                    {
                      value: 'products:price:desc',
                      label: 'Price: High to Low',
                    },
                    {
                      value: 'products:price:asc',
                      label: 'Price: Low to High',
                    },
                    {
                      value: 'products:reviews_count:desc',
                      label: 'Most Reviews',
                    },
                  ]}
                />
              </div>
            </div>
            <div className={styles.grid}>
              {hits?.length > 0 &&
                hits.map(product => (
                  <Hit key={product.id} product={product} />
                ))}
            </div>
          </>
        ) : (
          <p className={styles.paragraph}>
            No results have been found for {results.query}.
          </p>
        )}
        <Pagination showLast />
      </div>
    </>
  )
}

export default SearchResults;
