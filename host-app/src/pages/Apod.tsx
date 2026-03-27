import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import styles from "./Apod.module.css";

const Apod = () => {
  const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

  const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

  const { data, loading, error } = useFetch(APOD_URL);

  useEffect(() => {
    console.log("APOD Data:", data);
  }, [data]);

  if (loading) {
    return <div className={styles.loadingState}>🌌 Loading today's cosmic wonder...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>❌ Error: {error}</div>;
  }

  return (
    <section className={styles.apodPage}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>NASA Explorer</p>
        <h1 className={styles.apodTitle}>Astronomy Picture of the Day</h1>
        <h3 className={styles.apodSubtitle}>{data.title}</h3>
      </div>

      <div className={styles.imageContainer}>
        {data.media_type==="image" &&   <img
          src={data.url}
          alt={data.title}
          className={styles.apodImage}
        />}

        {data.media_type==="video" && <iframe
          src={data.url}
          title={data.title}
          className={styles.apodImage}
          allowFullScreen
        ></iframe>}
      
        <div className={styles.dateInfo}>📅 {data.date}</div>
      </div>

      <p className={styles.explanation}>{data.explanation}</p>
    </section>
  );
};

export default Apod;