import { lazy } from "react";
import { LazyLoader } from "@/components/LazyLoader";

const FileDownloadPanel = lazy(() => 
    import("@/components/app/FileDownload").then(module => ({ default: module.FileDownloadPanel }))
);

function FileDownload() {
    return (
        <LazyLoader message="Loading...">
            <FileDownloadPanel />
        </LazyLoader>
    );
}

export { FileDownload };