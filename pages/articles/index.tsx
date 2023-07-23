import React, { useEffect, useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import styles from './ArticlesPage.module.css';
import Navbar from '@/components/Navbar/Navbar';
import { useRouter } from 'next/router';
import { Article as ArticleDomain } from '@/domain/models';
import { Article } from '../../components/Article/Article';
import { getArticles } from '@/services/articles.service';
import { useToast } from '@/contexts/toastProvider';

const NONE_ARTICLE_HAS_BEEN_CREATED_YET = "NONE_ARTICLE_HAS_BEEN_CREATED_YET"

function Articles() {

  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { openUnexpectedErrorToast } = useToast();
  const [articles, setArticles] = useState<ArticleDomain[] | typeof NONE_ARTICLE_HAS_BEEN_CREATED_YET>([]);

  const goToArticle = (articleId: number) => {
    router.push(`/articles/${articleId}`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {

  async function fetchArticles() {
      try {
        const { articles, totalPages } = await getArticles(page, 6);
        if (articles.length > 0) setArticles(articles);
        else if (articles.length === 0) setArticles(NONE_ARTICLE_HAS_BEEN_CREATED_YET)
        setTotalPages(totalPages);
      }
      catch (error) {
        console.error(error)
        openUnexpectedErrorToast()
      }
    }

    fetchArticles();
  }, [page]);

  if (articles === NONE_ARTICLE_HAS_BEEN_CREATED_YET) {
    return (
      "NONE ARTICLE HAS BEEN CREATED YET!"
    )
  }

  return (
    <div className={styles.root}>
      <Navbar />
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


