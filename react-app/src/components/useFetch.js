import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { getDocs, collection } from "firebase/firestore";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const dataCollectionRef = collection(firestore, url);


  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(dataCollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData().then( setIsPending(false) );

  }, [url])


  return { data, isPending };
}

export default useFetch;