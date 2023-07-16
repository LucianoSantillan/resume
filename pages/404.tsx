import styles from './404.module.css';
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.subtitle}>Page Not Found</p>
            <p className={styles.description}>
                Oops! The page you are looking for does not exist.
                It might have been moved or deleted.
            </p>
            <Link className={styles.link} href="/">
                Go Back Home
            </Link>
        </div>
    )
}
