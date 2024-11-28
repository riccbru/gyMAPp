import { Bia } from './BIA/Bia';
import API from '@/lib/API';
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { WeightChart } from './Weight/WeightChart';
import { PushWeight } from './Weight/PushWeight';

function StatsPanel() {

    const { isLogged } = useAuth()
    const [BIAs, setBIAs] = useState([]);
    const [weight, setWeight] = useState("");
    const [weights, setWeights] = useState([]);
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
                    console.log(`STATS.index.useEffect(fetchBIAs):\n${err}`);
                });
            API.fetchWeights()
                .then((res) => {
                    setWeights(res.weights);
                })
                .catch((err) => {
                    console.log(`STATS.index.useEffect(fetchWeights):\n${err}`);
                });
        } else {
            setBIAs([]);
            setWeight("");
            setWeights([]);
            setError(false);
        }
    }, [refresh]);

    return(
        <div className='flex flex-col'>
            <div className='pageTitle'>STATISTICS</div>

            <div className='pageDivider'>
                <div className='itemDivided'>
                <div className='itemTitle'>Weight Tracker</div>

                    <div className='flex flex-col'>
                        <PushWeight
                            error={error}
                            setError={setError}
                            setWeight={setWeight}
                            handleClick={handleClick}
                            />

                        <div className='mt-10'>
                            {!weights?.length ? "No weight tracked yet, cannot display WeightChart"
                            : <WeightChart weights={weights} />
                            }
                        </div>
                    </div>

                </div>
                
                <div className='itemDivided'>
                    <div className='itemTitle'>BIAs</div>
                    {!BIAs?.length ? null :
                    BIAs.map((BIA, index) => (
                        <Bia key={index} index={index} bia={BIA} />
                    ))}
                </div>
            </div>
                        
        </div>
    );
}

export { StatsPanel };