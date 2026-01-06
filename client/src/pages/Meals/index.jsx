import { lazy } from "react";
import { LazyLoader } from "@/components/LazyLoader";

const MealsPanel = lazy(() => 
    import("@/components/app/Meals").then(module => ({ default: module.MealsPanel }))
);

function Meals() {
    return (
        <LazyLoader message="Loading Meals...">
            <MealsPanel />
        </LazyLoader>
    );
}

export { Meals };