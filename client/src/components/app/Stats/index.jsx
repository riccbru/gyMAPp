import API from '@/lib/API';
import { Bia } from './BIA/Bia';
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { PushWeight } from './Weight/PushWeight';
import { WeightChart } from './Weight/WeightChart';

function StatsPanel() {

    const defaultWeights = {
        tot: [],
        fat: [],
        muscle: []
    }

    const { isLogged } = useAuth()
    const [BIAs, setBIAs] = useState([]);
    const [weight, setWeight] = useState("");
    const [totWeights, setTotWeights] = useState([]);
    const [weights, setWeights] = useState(defaultWeights);
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
            API.fetchWeights()
                .then((res) => {
                    setWeights(res.weights);
                })
                .catch((err) => {
                    console.log(`app/Stats.index.useEffect(fetchWeights):\n${err}`);
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
                {!totWeights?.length ? (
                  "No weight tracked yet, cannot display Total Mass chart"
                ) : (
                  <WeightChart title="Total Mass" yLabel="Total Mass" weights={weights.tot} />
                )}
              </div>
            </div>
          </div>

          <div className="itemDivided">
            <div className="itemTitle">Body Composition</div>
            <div className="">
              {!weights.fat?.length ? (
                "No weight tracked yet, cannot display Fat Mass chart"
              ) : (
                <WeightChart title="Fat Mass" yLabel="Fat Mass" weights={weights.fat} />
              )}
            </div>
            <div className="">
              {!weights.muscle?.length ? (
                "No weight tracked yet, cannot display Muscle Mass chart"
              ) : (
                <WeightChart title="Muscle Mass" yLabel="Muscle Mass" weights={weights.muscle} />
              )}
            </div>
          </div>

        </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='itemTitle'>BIAs</div>
            {!BIAs?.length ? null :
                BIAs.map((BIA, index) => (
                    <Bia key={index} index={BIAs.length - index - 1} bia={BIA} />
            ))}
          </div>
      </div>
    );
}

export { StatsPanel };