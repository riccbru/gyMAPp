import { useEffect } from "react";
import { useData } from "@/hooks/useData";

function TestHome() {
    const { bia, meal, workout, fetchData } = useData();

    useEffect(() => {
        fetchData('bia');
    }, [fetchData]);

    return(
        <>
            <h1>BIA</h1>
            <pre>{JSON.stringify(bia, null, 2)}</pre>
        </>
    );
}

export { TestHome };