"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { BiShoppingBag } from 'react-icons/bi';
import styles from '@/styles/product.module.css';
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST_NAME || "http://localhost:7700",
  apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY,
})

const index = client.index('products')

export default function Product() {
  const router = useRouter();

  const [product, setProduct] = useState<globalThis.Record<string, any>>();
  const [quantity, setQuantity] = useState(1);

  const pathname = usePathname();

  useEffect(() => {
    const fetch = async () => {
      const id = pathname.split("/").pop();
      console.log("id: ", id)
      if (id) {
        const doc = await index.getDocument(id);
        setProduct(doc);
      }
    }
    fetch()
  }, [pathname]);

  const handleQtyChange = (action: string) => {
    if (action === 'inc') {
      setQuantity(prev => prev + 1)
    }
    if (action === 'dec') {
      setQuantity(prev => (prev === 1 ? 1 : prev - 1))
    }
  }

  if (!product) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>
  }

  return (
    <div className={styles.container}>
      <figure className={styles.image}>
        <div className={styles.placeholder}>
          <Image
            height={400}
            width={400}
            priority
            loader={() => product.images[0]}
            loading="eager"
            src={product.images[0]}
            alt={`${product.title}`}
          />
        </div>
      </figure>
      <div className={styles.info}>
        <span />
        <div className={styles.details}>
          <div className="title">
            <h1>{product.title}</h1>
          </div>
          <p className="price">${product.price}</p>
          <div className={styles.selection}>
            <p>Select Size</p>
            <div className="selectors">
              {product.variants
                .slice(0)
                .reverse()
                .map(v => {
                  return (
                    <button
                      key={v.id}
                      className={`${styles.sizebtn} ${styles.selected}`}
                    >
                      {v.title}
                    </button>
                  )
                })}
            </div>
          </div>
          <div className={styles.selection}>
            <p>Select Quantity</p>
            <div className={styles.qty}>
              <button
                className={styles.qtybtn}
                onClick={() => handleQtyChange('dec')}
              >
                -
              </button>
              <span className={styles.ticker}>{quantity}</span>
              <button
                className={styles.qtybtn}
                onClick={() => handleQtyChange('inc')}
              >
                +
              </button>
            </div>
          </div>
          <button className={styles.addbtn}>
            <span>Add to bag</span>
            <BiShoppingBag />
          </button>
          <div className={styles.tabs}>
            <div className="tab-titles">
              <button className={styles.tabtitle}>Product Description</button>
            </div>
            <div className="tab-content">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
