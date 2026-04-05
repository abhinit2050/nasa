import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import styles from "./Mars.module.css";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/slices/collectionsSlice";

const Mars = () => {
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const collectedItems = useSelector((state:RootState) => state.collections.items);

  const MARS_URL = `https://images-api.nasa.gov/search?q=mars&media_type=image&page=${page}`;

  const { data, loading, error } = useFetch(MARS_URL);
  const items = data?.collection?.items || [];

  useEffect(() => {
    if (items.length === 0) {
      setHasMore(false);
    }

    if (items.length > 0) {
      setHasMore(true);
      setAllItems((prev) => {
        const newItems = items.filter(
          (item: any) =>
            !prev.some((p: any) => p.data[0].nasa_id === item.data[0].nasa_id),
        );

        return [...prev, ...newItems];
      });
    }
  }, [items]);

  useEffect(() => {
    if (loadMoreRef.current && page > 1) {
      loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allItems]);

  useEffect(() => {
    if (!snackbar) return;

    const timeout = window.setTimeout(() => {
      setSnackbar(null);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [snackbar]);

  if (loading && allItems.length === 0) {
    return <div className={styles.loadingState}>Fetching Mars photos...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>Error Fetching Mars photos!</div>;
  }

  console.log("saved items", collectedItems);

  const handleSave = (item: any) => {
    const title = item.data?.[0]?.title;
    const image = item.links?.[0]?.href;

    if (!title || !image) {
      setSnackbar({ message: "Unable to save this item.", type: "error" });
      return;
    }

    const alreadySaved = collectedItems.some((saved: any) => saved.id === title);

    if (alreadySaved) {
      setSnackbar({ message: "This item is already in your collection.", type: "error" });
      return;
    }

    dispatch(addItem({ id: title, image }));
    setSnackbar({ message: "Saved to your collection!", type: "success" });
  };

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
        {allItems?.slice(50).map((item: any, index: number) => {
          const image = item.links?.[0]?.href;
          const title = item.data?.[0]?.title;
          const date = item.data?.[0]?.date_created?.split("T")[0];
          const description = item.data?.[0]?.description;

          return (
            <div key={index} className={styles.photoCard}>
              <img
                src={image}
                alt={title}
                className={styles.photoImage}
                loading="lazy"
              />
              <div className={styles.photoInfo}>
                <div className={styles.photoDate}>📅 {date}</div>
                <p className={styles.photoCamera}>{title}</p>
              </div>
              <button className={styles.saveButton} onClick={() => handleSave(item)}>
                Save
              </button>
            </div>
          );
        })}
      </div>
      {loading && allItems.length > 0 && (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.shimmerCard}></div>
          ))}
        </div>
      )}
      <div className={styles.loadMore} ref={loadMoreRef}>
        {hasMore && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            style={{ cursor: "pointer" }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>

      {snackbar && (
        <div className={`${styles.snackbar} ${
          snackbar.type === "success" ? styles.snackbarSuccess : styles.snackbarError
        }`}>
          {snackbar.message}
        </div>
      )}
    </section>
  );
};

export default Mars;
