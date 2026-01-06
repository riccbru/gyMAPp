import { BiaAddForm } from "@/components/app/Stats/BIA/BiaAddForm";

function NewBia() {

    return(
        <div className="flex flex-col">
            <div className="pageTitle">
                New BIA
            </div>
            <div className="flex items-center justify-center">
                <BiaAddForm />
            </div>
        </div>
    );
}

export { NewBia };