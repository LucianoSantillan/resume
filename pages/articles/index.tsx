import React, { FC, useEffect, useState } from 'react';
import { Grid, Typography, Paper, Button } from '@mui/material';
import styles from './ArticlesPage.module.css';
import Navbar from '@/components/Navbar/Navbar';
import { useRouter } from 'next/router';

interface Article {
  id: number;
  title: string;
  description: string;
}

function Articles() {

  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);

  const goToArticle = (articleId: number) => {
    router.push(`/articles/${articleId}`);
  };

  useEffect(() => {
    async function fetchArticles() {
      const response = await fetch('http://localhost:3001/articles');
      const articles = await response.json();
      setArticles(articles);
    }

    fetchArticles();
  }, []);

  return (
    <div className={styles.root}>
      <Navbar />
      <Grid container spacing={3}>
        {articles.map((article: Article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Article handleGoToArticle={() => goToArticle(article.id)} article={article} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Articles;

export const Article: FC<{ article: Article, handleGoToArticle?: () => void }> = ({ article, handleGoToArticle }) => {
  return (
    <Paper className={styles.paper}>
      <div style={{ padding: '18px' }}>
        <Typography variant="h5" component="h2" style={{ marginBottom: '8px' }}>
          {article.title}
        </Typography>
        <Typography variant="body2" component="p">
          {article.description}
        </Typography>
        <Button onClick={handleGoToArticle} variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Read More
        </Button>
      </div>
    </Paper>
  )
}
