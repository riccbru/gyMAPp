import { Development } from "../Development";
import { WorkoutsPanel } from "@/components/app/Workouts";

function Workouts() {
    return (
        <>
            <WorkoutsPanel />
            <Development />
        </>
    );
}

export { Workouts };