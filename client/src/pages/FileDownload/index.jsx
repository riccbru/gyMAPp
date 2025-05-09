import { Development } from "../Development";
import { FileDownloadPanel } from "@/components/app/FileDownload";

function FileDownload() {
    return (
        <>  
            <FileDownloadPanel />
            <Development />
        </>
    );
}

export { FileDownload };