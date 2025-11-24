import { files } from "@/data/pdfFiles";
import { useAuth } from "@/hooks/useAuth";
import { FileCarousel } from "./FileCarousel";

function FileDownloadPanel() {
  const global = "/pdf";
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      <div className="pageTitle">FILE DOWNLOAD</div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-1">
          {user.uid !== 1 ? <div className="text-2xl">No files found</div> : (
            <>
              <FileCarousel title="BIAs" files={files.bias} />
              <FileCarousel title="MEALs" files={files.meals} />
              <FileCarousel title="WORKOUTs" files={files.workouts} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { FileDownloadPanel };