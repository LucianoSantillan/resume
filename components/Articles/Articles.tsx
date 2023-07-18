import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './Articles.module.css';
import { Article } from '@/pages/articles';
import { routes } from '@/routes';

function Articles() {
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);

  const handleWatchMoreClick = () => {
    router.push(routes.ARTICLES);
  };

  useEffect(() => {
    async function fetchArticles() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/articles?page=1&pageSize=6`);
        const articles = await response.json() as [];
        if (articles.length > 0) setArticles(articles);
      }
      catch {
        // setOpen(true);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div className={styles.root}>
      <div data-aos="fade-left" className={styles.title}>SELECTED ARTICLES</div>
      <div className={styles.grid}>
        {articles.map((article) => (
          <div className={styles.article} key={article.id}>
            <Article article={article} />
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" color="primary" onClick={handleWatchMoreClick}>
          Watch more articles
        </Button>
      </div>
    </div>
  );
}

export default Articles;