import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Paper } from '@mui/material';
import Navbar from '@/components/Navbar/Navbar';
import styles from './Article.module.css';

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
}

function Article() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch(`http://localhost:3001/articles/${id}`);
        if (response.ok) {
          setArticle(await response.json());
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.paper}>
          <div className={styles.header}>
            <Typography variant="h4" component="h1" className={styles.title}>
              {article.title}
            </Typography>
            <Typography variant="subtitle1" component="p" className={styles.description}>
              {article.description}
            </Typography>
          </div>
          <div className={styles.content}>
            <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;