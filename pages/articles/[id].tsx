import React, { useEffect, useState } from 'react';
import { Article } from '../../components/Article/Article';
import { useRouter } from 'next/router';
import styles from './Article.module.css'
import Navbar from '@/components/Navbar/Navbar';

const Page: React.FC = () => {
    const [article, setArticle] = useState<Article | null>(null);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchArticle = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/articles/${id}`);
            const data = await response.json();
            setArticle(data);
        };

        if (id) {
            fetchArticle();
        }
    }, [id]);

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.content}>
                <h1 className={styles.title}>{article.title}</h1>
                <p className={styles.description}>{article.description}</p>
            </div>
        </div>
    );
};

export default Page;