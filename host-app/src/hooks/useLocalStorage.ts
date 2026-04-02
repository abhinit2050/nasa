import { useEffect, useState } from "react";


export default function useLocalStorage(key:string, initialValue:any) {

    const [storedValue, setStoredValue] = useState<any | null>
                            (localStorage.getItem(key)? JSON.parse(localStorage.getItem(key) as string): initialValue);

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(storedValue))
    },[storedValue])


    return [storedValue, setStoredValue];


}