import React from 'react';
import { Grid, Typography, Paper, Button } from '@mui/material';
import styles from './Articles.module.css';
import Navbar from '@/components/Navbar/Navbar';

function Articles() {
  
  const articles = [
    {
      id: 1,
      title: 'Article 1',
      description: 'This is the description for article 1.',
      imageUrl: 'https://picsum.photos/id/237/400/300',
      date: '2021-10-01',
      link: '/article1',
    },
    {
      id: 2,
      title: 'Article 2',
      description: 'This is the description for article 2.',
      imageUrl: 'https://picsum.photos/id/238/400/300',
      date: '2021-10-02',
      link: '/article2',
    },
    {
      id: 3,
      title: 'Article 3',
      description: 'This is the description for article 3.',
      imageUrl: 'https://picsum.photos/id/239/400/300',
      date: '2021-10-03',
      link: '/article3',
    },
    {
      id: 4,
      title: 'Article 4',
      description: 'This is the description for article 4.',
      imageUrl: 'https://picsum.photos/id/240/400/300',
      date: '2021-10-04',
      link: '/article4',
    },
  ];

  return (
    <div className={styles.root}>
      <Navbar />
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Paper className={styles.paper}>
              <img src={article.imageUrl} alt={article.title} className={styles.image} />
              <div style={{padding: '18px'}}>
                <Typography variant="h5" component="h2" style={{ marginBottom: '8px' }}>
                  {article.title}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Typography variant="body2" component="p" style={{ marginRight: '8px' }}>
                    {article.date}
                  </Typography>
                  <Typography variant="body2" component="p">
                    by Luciano Santillan
                  </Typography>
                </div>
                <Typography variant="body2" component="p">
                  {article.description}
                </Typography>
                <Button variant="contained" color="primary" href={article.link} style={{ marginTop: '16px' }}>
                  Read More
                </Button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Articles;