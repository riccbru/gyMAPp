import { lazy } from "react";
import { LazyLoader } from "../LazyLoader";

const StatsPanel = lazy(() => 
    import("@/components/app/Stats").then(module => ({ default: module.StatsPanel }))
);

function Stats() {
    return (
        <LazyLoader message="Loading Stats...">
            <StatsPanel />
        </LazyLoader>
    );
}

export { Stats };