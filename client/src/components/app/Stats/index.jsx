import API from '@/lib/API';
import { Bia } from './BIA/Bia';
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { PushWeight } from './Weight/PushWeight';
import { WeightChart } from './Weight/WeightChart';

function StatsPanel() {

    const { isLogged } = useAuth()
    const [BIAs, setBIAs] = useState([]);
    const [weight, setWeight] = useState("");
    const [totWeights, setTotWeights] = useState([]);
    const [muscleWeights, setMuscleWeights] = useState([]);
    const [fatWeights, setFatWeights] = useState([]);
    const [error, setError] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        if (!weight || isNaN(parseFloat(weight))) {
            setError(true); 
        } else {
            API.pushWeight(weight)
                .then(() => {
                    setWeight("");
                    setRefresh((prev) => !prev); 
                })
                .catch((err) => {
                    console.log(`STATS.index.useEffect(pushWeight):\n${err}`);
                });
        }
    }
    
    useEffect(() => {
        if (isLogged) {
            API.fetchBIAs()
                .then((res) => {
                    setBIAs(res.BIAs);
                })
                .catch((err) => {
                    console.log(`app/Stats.index.useEffect(fetchBIAs):\n${err}`);
                });
            API.fetchTotWeights()
                .then((res) => {
                    setTotWeights(res.weights);
                })
                .catch((err) => {
                    console.log(`app/Stats.index.useEffect(fetchTotWeights):\n${err}`);
                });
        } else {
            setBIAs([]);
            setWeight("");
            setTotWeights([]);
            setError(false);
        }
    }, [refresh]);

    return(
        <div className='flex flex-col'>
            <div className='pageTitle'>STATS</div>

            <div className='pageDivider'>
                <div className='itemDivided'>
                <div className='itemTitle'>Total Weight</div>

                    <div className='flex flex-col'>
                        <PushWeight
                            error={error}
                            setError={setError}
                            setWeight={setWeight}
                            handleClick={handleClick}
                            />

                        <div className='mt-10'>
                            {!totWeights?.length ? "No weight tracked yet, cannot display TotWeightChart"
                            : <WeightChart weights={totWeights} />
                            }
                        </div>
                    </div>

                </div>
                
                <div className='itemDivided'>
                    <div className='itemTitle'>BIAs</div>
                    {!BIAs?.length ? null :
                    BIAs.map((BIA, index) => (
                        <Bia key={index} index={BIAs.length - index - 1} bia={BIA} />
                    ))}
                </div>
            </div>
                        
        </div>
    );
}

export { StatsPanel };