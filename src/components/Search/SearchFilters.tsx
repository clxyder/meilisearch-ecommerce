"use client";

import React from 'react';
import {
  ClearRefinements,
  RefinementList,
} from 'react-instantsearch'
// import CustomRangeSlider from '../slider/Slider'
import { RatingMenu } from '../RatingMenu/RatingMenu';
import styles from '@/styles/search-filters.module.css';

const SearchFilters = () => (
  <div className={styles.products}>
    <h2 className={styles.resultPara}>
      <span>Filters</span>
      <ClearRefinements />
    </h2>
    <h4 style={{ marginTop: 0 }}>Categories</h4>
    <RefinementList attribute="category" />
    <h4>Tags</h4>
    <RefinementList attribute="tag" />
    <h4>Brands</h4>
    <RefinementList attribute="brand" showMore />
    {/* <h4>Price</h4>
    <CustomRangeSlider attribute="price" /> */}
    <h4 style={{ marginTop: '5rem' }}>Rating</h4>
    <RatingMenu attribute="rating" max={5} />
  </div>
)

export default SearchFilters;
