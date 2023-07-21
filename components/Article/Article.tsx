import React, { FC } from 'react';
import { Typography, Paper, Button } from '@mui/material';
import styles from './Article.module.css';
import { Article as ArticleDomain } from '@/domain/models';

export const Article: FC<{ article: ArticleDomain; handleGoToArticle?: () => void; }> = ({ article, handleGoToArticle }) => {
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
  );
};
