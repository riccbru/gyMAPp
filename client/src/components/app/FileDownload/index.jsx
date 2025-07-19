import { FileCard } from "./FileCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { files } from "@/data/pdfFiles";
import { FileCarousel } from "./FileCarousel";

function FileDownloadPanel() {
  const global = "/pdf";
  return (
    <div className="flex flex-col gap-y-3">
      <div className="pageTitle">FILE DOWNLOAD</div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-3">
          <FileCarousel title="BIAs" files={files.bias} />
          <FileCarousel title="MEALs" files={files.meals} />
          <FileCarousel title="WORKOUTs" files={files.workouts} />
        </div>
      </div>
    </div>
  );
}

export { FileDownloadPanel };