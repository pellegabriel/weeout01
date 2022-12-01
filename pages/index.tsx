import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from "react";

export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>Weeout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Weeout</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Caja1 &rarr;</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repellat esse sed consequuntur eum ducimus debitis officia ex? Sunt eos ab dignissimos expedita rerum unde assumenda voluptatum provident aut minus.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Caja2 &rarr;</h2>
            <p>editar este texto o algo asi</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Caja3 &rarr;</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor adipisci voluptatum, voluptates facere sint consectetur, vero aspernatur saepe, nostrum velit asperiores odit numquam maiores? Minima, explicabo aperiam. Asperiores, id officiis?</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Caja 4 &rarr;</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi nam eaque illum fugit veritatis, exercitationem at provident sit reprehenderit delectus, sapiente, sunt inventore porro placeat non quam accusantium! Sapiente.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <h4>Footer</h4>
      </footer>
    </div>
  )
}
