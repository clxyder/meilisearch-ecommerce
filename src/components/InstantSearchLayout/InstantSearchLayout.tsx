"use client";

import React from 'react';
import { InstantSearch } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

import NavBar from "../NavBar/NavBar";

const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILI_HOST_NAME || 'http://localhost:7700',
  process.env.NEXT_PUBLIC_MEILI_API_KEY
);

export default function InstantSearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InstantSearch indexName="products" searchClient={searchClient}>
      <NavBar />
      {children}
    </InstantSearch>
  );
}
