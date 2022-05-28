import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import './Tabs.css'



const Stages = () => {

    const {isPending, data: hmlsLists } = useFetch('homelesses');
    const {isPendingg, data: inHmlsLists } = useFetch('inHomelesses');
  
    let stages = {};
    inHmlsLists.forEach(hlm => {
            if (stages[hlm.stage]) {
                stages[hlm.stage].push(hlm);}
            else stages[hlm.stage] = [hlm];
    })

    let strStages =['שלב קליטה','שלב א׳','שלב ב׳','מסלול חיפוש עבודה','מסלול לילות'];

    return (

        <div> { (isPending ) && <div>Loading...</div> }
            { inHmlsLists && 
            <div className='my-5'>
               {Object.keys(stages).map((stage) => (
                    <Frame key={stage} 
                        i={strStages[stage]}
                        names = {stages[stage].map(hmls=>{return hmls.id})}
                        hmlsLists={hmlsLists}
                        />
                ))


            }
        </div>}
</div>
    );
}

// Define how each display entry will be structured
const Frame = ({i,names,hmlsLists}) => {
    return (
        <div className='board'>
            <div className='room' >
                <div className='cardHead'><h3> {i}</h3></div>
                <div >
                    {names.map(id=>{return <h5 className='homeles'>
                    <Link className='homelesLink roww' to={`/search/${id}`}  key={id} >
                        {hmlsLists.find( (homls ) => homls.id === id ).name}</Link></h5> })}
                </div>
            </div>
        </div>
    );
    
}

export default Stages;

