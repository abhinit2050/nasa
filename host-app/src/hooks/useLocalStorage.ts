import { useEffect, useState } from "react";


export default function useLocalStorage(key:string, initialValue:any) {

    
    const [storedValue, setStoredValue] = useState<any | null>(()=>{
        try{
            return   localStorage.getItem(key)? JSON.parse(localStorage.getItem(key) as string)
                            : initialValue;
        }catch(e){
            return localStorage.getItem(key) || initialValue;
        }
    })
                          

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(storedValue))
    },[storedValue])


    return [storedValue, setStoredValue];


}