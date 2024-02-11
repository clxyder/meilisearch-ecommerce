import Image from "next/image";
import styles from '@/styles/home.module.css';
// import { SearchResult} from '@/components/Search/SearchResult';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.mainContent}>
            {/* <Results /> */}
          </div>
        </main>
      </div>
    </main>
  );
}
