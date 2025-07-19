import API from '@/lib/API';
import { Bia } from './BIA/Bia';
import { useAuth } from "@/hooks/useAuth";
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { PushWeight } from './Weight/PushWeight';
import { WeightChart } from './Weight/WeightChart';

function StatsPanel() {

    const defaultWeights = {
        tot: [],
        fat: [],
        muscle: []
    }

    const { isLogged } = useAuth();
    const navigate = useNavigate();
    const [BIAs, setBIAs] = useState([]);
    const [weight, setWeight] = useState("");
    const [error, setError] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [weights, setWeights] = useState(defaultWeights);

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
            API.fetchWeights()
                .then((res) => {
                    setWeights(res.weights);
                })
                .catch((err) => {
                    console.log(`app/Stats.index.useEffect(fetchWeights):\n${err}`);
                });
            API.fetchBIAs()
                .then((res) => {
                    setBIAs(res.BIAs);
                })
                .catch((err) => {
                    console.log(`app/Stats.index.useEffect(fetchBIAs):\n${err}`);
                });
        } else {
            setBIAs([]);
            setWeight("");
            setError(false);
            setWeights(defaultWeights);
        }
    }, [refresh]);

    return (
      <div className="flex flex-col">
        <div className="pageTitle">STATS</div>

        <div className="pageDivider">
          <div className="itemDivided">
            <div className="itemTitle">Total Weight</div>

            <div className="flex flex-col">
              <PushWeight
                error={error}
                setError={setError}
                setWeight={setWeight}
                handleClick={handleClick}
              />

              <div className="mt-10">
                <WeightChart title="Total Weight" weights={weights.tot ?? []} />
              </div>
            </div>
          </div>

          <div className="itemDivided">
            <div className="itemTitle">Body Composition</div>
              <WeightChart title="Fat Mass" weights={weights.fat} />
              <WeightChart title="Muscle Mass" weights={weights.muscle} />
          </div>

        </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center gap-2'>
              <CirclePlus className="w-7 h-7 cursor-pointer hover:text-green" onClick={() => navigate("/bia/new")}/>
              <div className='itemTitle'>BIAs</div>
            </div>
            {!BIAs?.length ? null :
                BIAs.map((BIA, index) => (
                    <Bia key={index} index={BIAs.length - index - 1} bia={BIA} setRefresh={setRefresh} />
            ))}
          </div>
      </div>
    );
}

export { StatsPanel };