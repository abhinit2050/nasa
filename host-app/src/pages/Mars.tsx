import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import styles from "./Mars.module.css";

const Mars = () => {
  const [page, setPage] = useState(1);

  const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

  const MARS_URL = `https://images-api.nasa.gov/search?q=mars&media_type=image&page=${page}`;

  const { data, loading, error } = useFetch(MARS_URL);
  const items = data?.collection?.items || [];

  useEffect(() => {
    console.log("Mars Rover Data:", items);
  }, [data]);

  if (loading) {
    return <div className={styles.loadingState}>🚀 Fetching Mars photos...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>🚀 Error Fetching Mars photos!</div>;
  }

  return (
    <section className={styles.marsPage}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>NASA Explorer</p>
        <h1 className={styles.marsTitle}>Mars Rover Photos</h1>
        <p className={styles.marsSubtitle}>
          Explore the Red Planet through the eyes of NASA's rovers
        </p>

        <div className={styles.controls}>
          <select className={styles.selectInput}>
            <option value="curiosity">Curiosity Rover</option>
            <option value="perseverance">Perseverance Rover</option>
            <option value="spirit">Spirit Rover</option>
            <option value="opportunity">Opportunity Rover</option>
          </select>
          <button className={styles.todayButton}>Latest Photos</button>
        </div>
      </div>

      <div className={styles.grid}>
        {items.map((item:any, index:number) => {
          const image = item.links?.[0]?.href;
          const title = item.data?.[0]?.title;
          const date = item.data?.[0]?.date_created?.split("T")[0];
          const description = item.data?.[0]?.description;

          return (
            <div key={index} className={styles.photoCard}>
              <img src={image} alt={title} className={styles.photoImage} />
              <div className={styles.photoInfo}>
                <div className={styles.photoDate}>📅 {date}</div>
                <p className={styles.photoCamera}>{title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Mars;