import React, { FC, useEffect, useState } from 'react';
import { Grid, Typography, Paper, Button, Snackbar } from '@mui/material';
import styles from './ArticlesPage.module.css';
import Navbar from '@/components/Navbar/Navbar';
import { useRouter } from 'next/router';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface Article {
  id: number;
  title: string;
  description: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NONE_ARTICLE_HAS_BEEN_CREATED_YET = "NONE_ARTICLE_HAS_BEEN_CREATED_YET"

function Articles() {

  const router = useRouter();

  const [articles, setArticles] = useState<Article[] | typeof NONE_ARTICLE_HAS_BEEN_CREATED_YET>([]);
  const [open, setOpen] = React.useState(false);

  const goToArticle = (articleId: number) => {
    router.push(`/articles/${articleId}`);
  };

  useEffect(() => {
    async function fetchArticles() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/articles`);
        const articles = await response.json() as [];
        if (articles.length === 0) setArticles(NONE_ARTICLE_HAS_BEEN_CREATED_YET)
        else if (articles.length > 0) setArticles(articles);
      }
      catch {
        setOpen(true);
      }
    }

    fetchArticles();
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (articles === NONE_ARTICLE_HAS_BEEN_CREATED_YET) {
    return (
      "NONE ARTICLE HAS BEEN CREATED YET!"
    )
  }

  return (
    <div className={styles.root}>
      <Navbar />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          An unexpected error has ocurred
        </Alert>
      </Snackbar>
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
