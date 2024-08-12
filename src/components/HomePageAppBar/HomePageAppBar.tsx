'use client';
import Link from "next/link";
import styles from './home-page-app-bar.module.css'

const HomePageAppBar = () => {
    return (
        <header className={styles.header}>
            <Link className={styles.button__homepage} href={"/"}>
                Home Page
            </Link>
            <Link className={styles.button__signin} href={"/loginpage"}>
                Sign In
            </Link>
        </header>
    );
};

export default HomePageAppBar;