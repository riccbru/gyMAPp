import { useEffect } from "react";
import { useData } from "@/hooks/useData";

function TestHome() {
    const { bia, fetchData } = useData();

    useEffect(() => {
        fetchData('bia');
    }, [fetchData]);

    return(
        <div>
            
        </div>
    );
}

export { TestHome };