import React from 'react';
import { Typography, Paper, Button } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './Articles.module.css';

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
    router.push('/ArticlesPage');
  };

  return (
    <div className={styles.root}>
      <div data-aos="fade-left" className={styles.title}>SELECTED ARTICLES</div>
      <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: '1fr 1fr 1fr' }}>
        {articles.map((article) => (
          <div style={{ display: 'flex' }} key={article.id}>
            <Paper className={styles.paper}>
              <img src={article.imageUrl} alt={article.title} className={styles.image} />
              <div style={{padding: '18px'}}>
                <Typography variant="h5" component="h2" style={{ marginBottom: '8px' }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {article.description}
                </Typography>
              </div>
            </Paper>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button variant="contained" color="primary" onClick={handleWatchMoreClick}>
          Watch more articles
        </Button>
      </div>
    </div>
  );
}

export default Articles;