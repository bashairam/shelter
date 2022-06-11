
import { Link } from 'react-router-dom';
import './Tabs.css'
import useFetch from './useFetch';
import LoadingScreen from 'react-loading-screen';



const Rooms = () => {
    const { isPending, data: hmlsLists } = useFetch('homelesses');
    const { isPendingg, data: inHmlsLists } = useFetch('inHomelesses');

    let rooms = {};
    inHmlsLists.forEach(hlm => {

        if (rooms[hlm.room]) {
            rooms[hlm.room].push(hlm);
        }
        else rooms[hlm.room] = [hlm];

    })


    return (

        <div> 

            {
                isPending || isPendingg && <LoadingScreen loading={true}
                bgColor='#f1f1f1'
                spinnerColor='rgb(247, 116, 9)'
                textColor='#rgba(0, 0, 0, 0.877)'
                text='...טוען'> </LoadingScreen>
                
            }   

            {inHmlsLists &&
                <div className='my-5'>
                    {Object.keys(rooms).map((room) => (
                        <Frame key={room} i={room}
                            names={rooms[room].map(hmls => { return hmls.id })}
                            hmlsLists={hmlsLists}
                            inHmlsLists={inHmlsLists}
                        />
                    ))
                    }
                </div>}
        </div>

    );
}

// Define how each display entry will be structured
const Frame = ({ i, names, hmlsLists }) => {
    return (
        <div className="board" >
            <div className='room'>
                <div className='cardHead'><h4 >חדר {i} </h4></div>
                <div>{names.map(id => {
                    return (
                        <h5 key={id} className='homeles'>
                            <Link to={`/search/${id}`} className='homelesLink' >
                                {hmlsLists.find((homls) => homls.id === id).name}</Link>
                        </h5>)
                })}</div>
            </div>
        </div>
    );
}//                    <Link to={`/search/${item.id}`}> 


export default Rooms;


