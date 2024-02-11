import styles from '@/styles/home.module.css';
import { SearchResults } from '@/components/Search/SearchResults';

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.mainContent}>
            <SearchResults />
          </div>
        </main>
      </div>
    </main>
  );
}
