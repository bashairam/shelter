import { firestore } from '../firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Link } from 'react-router-dom';

const Stages = () => {
    const [hmlsLists, setHmlsList] = useState([]);
    const [inHmlsLists, setInHmlsList] = useState([]);

    const hmlssCollectionRef = collection(firestore, "homelesses");
    const inHmlssCollectionRef = collection(firestore, "inHomelesses");


    useEffect(() => {
        const getHmlsss = async () => {
            const data = await getDocs(hmlssCollectionRef);
            setHmlsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getHmlsss();

        const getInHmlsss = async () => {
            const data = await getDocs(inHmlssCollectionRef);
            setInHmlsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getInHmlsss();

        


    }, []);

    let stages = {};
    inHmlsLists.forEach(hlm => {
        {
            if (stages[hlm.stage]) {
                stages[hlm.stage].push(hlm);}
            else stages[hlm.stage] = [hlm];
        }
    })


    return (
        <div >
            <center className="my-5">
            </center>

            {
                Object.keys(stages).map((stage) => (
                    <Frame i={stage}
                        names = {stages[stage].map(hmls=>{{return hmls.id}})}
                        hmlsLists={hmlsLists}
                        />
                ))
//return [(hmlsLists.find( ({ hmls }) => id === {hmls.id} ))].name;

            }
        </div>

    );
}

// Define how each display entry will be structured
const Frame = ({ i,names,hmlsLists}) => {
    return (
        <center>
            <div style={{ backgroundColor:'#dddddd',float: 'right', margin: '10px', width: '30%',minHeight:'150px', border: '1px #dddddd solid'}}>
                <h3 style={{ backgroundColor:'#343741', color : '#dddddd'}}>שלב {i}</h3>
                {names.map(id=>{return <Link to = "/profile" >{hmlsLists.find( (homls ) => homls.id === id ).name}</Link>})}


            </div>
        </center>
    );
}

export default Stages;



// Object.keys(rooms).map(room => {rooms[room].map(hmls=>{{<p>{hmls.name}</p>
//         console.log(hmls.name);}})})