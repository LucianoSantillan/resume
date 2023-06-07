import React, { FC } from 'react';
import { Grid, Typography, Paper, Button } from '@mui/material';
import styles from './ArticlesPage.module.css';
import Navbar from '@/components/Navbar/Navbar';

interface Article {
  id: number;
  title: string;
  description: string;
}

function Articles() {

  const articles: Article[] = [
    {
      id: 1,
      title: 'Article 1',
      description: 'This is the description for article 1.',
    },
    {
      id: 2,
      title: 'Article 2',
      description: 'This is the description for article 2.'
    },
    {
      id: 3,
      title: 'Article 3',
      description: 'This is the description for article 3.'
    },
    {
      id: 4,
      title: 'Article 4',
      description: 'This is the description for article 4.'
    },
  ];

  return (
    <div className={styles.root}>
      <Navbar />
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Article article={article} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Articles;

export const Article: FC<{ article: Article }> = ({ article }) => {
  return (
    <Paper className={styles.paper}>
      <div style={{ padding: '18px' }}>
        <Typography variant="h5" component="h2" style={{ marginBottom: '8px' }}>
          {article.title}
        </Typography>
        <Typography variant="body2" component="p">
          {article.description}
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Read More
        </Button>
      </div>
    </Paper>
  )
}
