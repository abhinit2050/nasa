import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import type { RootState } from "../store/store";
import styles from "./Collections.module.css";
import { removeItem, updateNote } from "../store/slices/collectionsSlice";
import { useState } from "react";

const Collections = ()=>{

    const [editingId, setEditingId] = useState<string|null>(null)
    const items = useSelector((state:RootState)=>state.collections.items);
    const dispatch = useDispatch();
    const { mode } = useTheme();

    return(<div className={mode}>
       <div className={styles.grid}>
  {items.map((item: any, index: number) => (
    <div key={index} className={styles.card}>
      <img src={item.image} alt={item.id} />
      <p>{item.id}</p>
      <div className={styles.noteSection}>
        {item.note && editingId !== item.id && <p>Note: {item.note}</p>}
        {editingId === item.id ? (
          <div>
            <input
              type="text"
              placeholder="Add or edit note - max 100 chars"
              maxLength={100}
              value={item.note || ""}
              onChange={(e) => {
                dispatch(updateNote({id:item.id, note:e.target.value}))
              }}
            />
            <button 
              className={styles.saveButton} 
              onClick={(e) => { e.stopPropagation(); setEditingId(null); }}
            >
              Done
            </button>
          </div>
        ) : (
          <button 
            className={item.note ? styles.editButton : styles.addButton} 
            onClick={(e) => { e.stopPropagation(); setEditingId(item.id); }}
          >
            {item.note ? 'Edit Note' : 'Add Note'}
          </button>
        )}
      </div>
      <button 
        className={styles.removeButton} 
        onClick={(e) => { e.stopPropagation(); dispatch(removeItem(item.id)); }}
      >
        Remove
      </button>
    </div>
   
  ))}
</div>
    </div>)
}

export default Collections;