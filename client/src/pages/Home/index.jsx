import { lazy } from "react";
import { LazyLoader } from "../LazyLoader";

const HomePanel = lazy(() => 
    import("@/components/app/Home").then(module => ({ default: module.HomePanel }))
);

function Home() {
    return (
        <LazyLoader message="Loading...">
            <HomePanel />
        </LazyLoader>
    );
}

export { Home };