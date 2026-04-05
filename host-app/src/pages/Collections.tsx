import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import type { RootState } from "../store/store";
import styles from "./Collections.module.css";
import { removeItem } from "../store/slices/collectionsSlice";

const Collections = ()=>{

    const items = useSelector((state:RootState)=>state.collections.items);
    const dispatch = useDispatch();
    const { mode } = useTheme();

    console.log("mode",mode);

    return(<div className={mode}>
       <div className={styles.grid}>
  {items.map((item: any, index: number) => (
    <div key={index} className={styles.card}>
      <img src={item.image} alt={item.id} />
      <p>{item.id}</p>
      <button className={styles.removeButton} onClick={()=>dispatch(removeItem(item.id))}>
        Remove
      </button>
    </div>
   
  ))}
</div>
    </div>)
}

export default Collections;