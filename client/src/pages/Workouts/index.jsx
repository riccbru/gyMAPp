import { lazy } from "react";
import { LazyLoader } from "../LazyLoader";

const WorkoutsPanel = lazy(() => 
    import("@/components/app/Workouts").then(module => ({ default: module.WorkoutsPanel }))
);

function Workouts() {
    return (
        <LazyLoader message="Loading Workouts...">
            <WorkoutsPanel />
        </LazyLoader>
    );
}

export { Workouts };