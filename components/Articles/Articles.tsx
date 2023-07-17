import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './Articles.module.css';
import { Article } from '@/pages/articles';
import { routes } from '@/routes';

function Articles() {
  const router = useRouter();

  const articles = [
    {
      id: 1,
      title: 'Article 1',
      description: 'This is the description for article 1.',
      imageUrl: 'https://picsum.photos/id/237/400/300',
    },
    {
      id: 2,
      title: 'Article 2',
      description: 'This is the description for article 2.',
      imageUrl: 'https://picsum.photos/id/238/400/300',
    },
    {
      id: 3,
      title: 'Article 3',
      description: 'This is the description for article 3.',
      imageUrl: 'https://picsum.photos/id/239/400/300',
    },
    {
      id: 4,
      title: 'Article 4',
      description: 'This is the description for article 4.',
      imageUrl: 'https://picsum.photos/id/240/400/300',
    },
  ];

  const handleWatchMoreClick = () => {
    router.push(routes.ARTICLES);
  };

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