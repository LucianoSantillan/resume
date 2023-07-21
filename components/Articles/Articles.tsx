import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './Articles.module.css';
import { routes } from '@/routes';
import { Article as ArticleDomain } from '@/domain/models';
import { Article } from '../Article/Article';
import { getArticles } from '@/services/articles.service';

function Articles() {
  const router = useRouter();

  const [articles, setArticles] = useState<ArticleDomain[]>([]);

  const handleWatchMoreClick = () => {
    router.push(routes.ARTICLES);
  };

  useEffect(() => {
    async function fetchArticles() {
      try {
        const {articles} = await getArticles(1, 6);
        if (articles.length > 0) setArticles(articles);
      }
      catch(e) {
        console.error()
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