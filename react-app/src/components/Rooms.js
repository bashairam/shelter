import { firestore } from '../firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Link } from 'react-router-dom';

const Rooms = () => {
    const [inHmlsLists, setInHmlsList] = useState([]);
    const [hmlsLists, setHmlsList] = useState([]);

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

    let rooms = {};
    inHmlsLists.forEach(hlm => {
        {
            if (rooms[hlm.room]) {
                console.log(rooms[hlm.room])
                rooms[hlm.room].push(hlm);}
            else rooms[hlm.room] = [hlm];
        }
    })

    return (
        <div >
            <center className="my-5">
            </center>

            {
                Object.keys(rooms).map((room) => (
                    <Frame key={room} i={room}
                        names = {rooms[room].map(hmls=>{{return hmls.id}})}
                        bed = {rooms[room].map(hmls=>{{return hmls.bed}})}
                        hmlsLists={hmlsLists}
                        />
                ))

            }
        </div>

    );
}

// Define how each display entry will be structured
const Frame = ({i,bed, names,hmlsLists}) => {
    return (
        <center>
            <div style={{ backgroundColor:'#dddddd' ,float: 'right', margin: '10px', width: '30%',textAlign: "center", border: '1px #dddddd solid'}}>
                <table style={{ width: '100%'}}>
                    <thead style={{backgroundColor:'#343741', color : '#dddddd'}}><h3>חדר {i}</h3></thead>
                    <tbody >
                    {names.map(id=>{return <tr style={{fontSize:'large',height : '50px'}}><Link to = "/profile" key={id}> מיטה {bed} : {hmlsLists.find( (homls ) => homls.id === id ).name}</Link></tr>})}
                    </tbody>
                </table>
            </div>
        </center>
    );
}

export default Rooms;


