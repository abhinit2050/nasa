import { useEffect, useState } from "react";


export default function useFetch(url:string){

    const [data, setData] = useState<any|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(()=>{
        
        setLoading(true);
        setError(null);

        fetch(url).then((response)=>response.json())
        .then((data)=>{
             setLoading(false);
            setData(data);
            if(data.code=400){
                setError(data.msg);
            }
           })
        .catch((error)=>{
            setLoading(false);  
            setError(error.message);
        })
    },[url])

     return {data, loading, error};
}