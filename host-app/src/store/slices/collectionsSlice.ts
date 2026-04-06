import { createSlice } from "@reduxjs/toolkit"

type CollectionItem = {
    id:string,
    image:string,
    note?:string
}

const saved = localStorage.getItem("collections");

const initialState:{items: CollectionItem[]} = {
    items:saved?JSON.parse(saved):[]
}

 const collectionsSlice = createSlice({
    name:'collections',
    initialState,
    reducers:{
        addItem:(state, action)=>{
            state.items.push(action.payload);
            localStorage.setItem("collections",JSON.stringify(state.items))
        },
        removeItem:(state, action)=>{
            state.items = state.items.filter((item:CollectionItem) => item.id !== action.payload)
            localStorage.setItem("collections",JSON.stringify(state.items))
        },
        updateNote:(state,action)=>{
            const{id, note} = action.payload;

            const item = state.items.find(item => item.id === id);
            if(item){
                item.note = note;
                localStorage.setItem("collections", JSON.stringify(state.items));
            }
        }
    }

})

console.log("aisa dikhta hai slice",collectionsSlice);

export default collectionsSlice.reducer;

export const {addItem, removeItem, updateNote} = collectionsSlice.actions;