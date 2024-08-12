'use client'
import styles from "./page.module.css";
import HomePageAppBar from "@/components/HomePageAppBar/HomePageAppBar";
import {useEffect, useState} from "react";

export default function Home() {
    useEffect(() => {
        localStorage.clear();
    }, []);
  return (
      <>
          <header>
              <HomePageAppBar/>
          </header>
          <div className={styles.text + " " + styles.main}>
              Welcome to the Dashboard App
          </div>
      </>
  )
      ;
}
