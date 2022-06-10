import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { getDocs, collection } from "firebase/firestore";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const dataCollectionRef = collection(firestore, url);


  useEffect(() => {
    const getData = async () => {
      const rdata = await getDocs(dataCollectionRef);
      return rdata;
    };
    getData().then((rdata) => {
      setData(rdata.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsPending(false)
    });

  }, [url])

  return { data, isPending };
}

export default useFetch;