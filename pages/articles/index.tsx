import React, { useEffect, useState } from 'react';
import { Grid, Snackbar, Pagination } from '@mui/material';
import styles from './ArticlesPage.module.css';
import Navbar from '@/components/Navbar/Navbar';
import { useRouter } from 'next/router';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Article as ArticleDomain } from '@/domain/models';
import { Article } from '../../components/Article/Article';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NONE_ARTICLE_HAS_BEEN_CREATED_YET = "NONE_ARTICLE_HAS_BEEN_CREATED_YET"

function Articles() {

  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [articles, setArticles] = useState<ArticleDomain[] | typeof NONE_ARTICLE_HAS_BEEN_CREATED_YET>([]);
  const [open, setOpen] = React.useState(false);

  const goToArticle = (articleId: number) => {
    router.push(`/articles/${articleId}`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    async function fetchArticles() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/articles?page=${page}&pageSize=6`);
        const data = await response.json();
        if (data.articles.length === 0) setArticles(NONE_ARTICLE_HAS_BEEN_CREATED_YET)
        else if (data.articles.length > 0) setArticles(data.articles);
        setTotalPages(data.totalPages);
      }
      catch(error) {
        console.error(error)
        setOpen(true);
      }
    }

    fetchArticles();
  }, [page]);

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
        {articles.map((article: ArticleDomain) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Article handleGoToArticle={() => goToArticle(article.id)} article={article} />
          </Grid>
        ))}
      </Grid>
      <Pagination className={styles.pagination} count={totalPages} page={page} onChange={handlePageChange} />
    </div>
  );
}

export default Articles;


