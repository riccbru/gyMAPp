import { FileCard } from "./FileCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function FileDownloadPanel() {
  const global = "/pdf";
  return (
    <div className="flex flex-col gap-y-3">
      <div className="pageTitle">FILE DOWNLOAD</div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-3">

          <h2 className="text-center font-extrabold">BIAs</h2>
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <FileCard
                  title={"BIA #2"}
                  author={"Mattia Cecchetti"}
                  path={`${global}/bia_2.pdf`}
                  description={"December 19, 2024"}
                />
              </CarouselItem>

              <CarouselItem>
                <FileCard
                  title={"BIA #1"}
                  author={"Mattia Cecchetti"}
                  path={`${global}/bia_1.pdf`}
                  description={"August 31, 2024"}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <h2 className="text-center font-extrabold">MEALs</h2>
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <FileCard
                  title={"MEAL #2"}
                  author={"Mattia Cecchetti"}
                  path={`${global}/meal_2.pdf`}
                  description={"January 2, 2025"}
                />
              </CarouselItem>

              <CarouselItem>
                <FileCard
                  title={"MEAL #1"}
                  author={"Mattia Cecchetti"}
                  path={`${global}/meal_1.pdf`}
                  description={"September 5, 2024"}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <h2 className="text-center font-extrabold">WORKOUTs</h2>
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <FileCard
                  title={"WORKOUT #1"}
                  author={"Emanuele Moretti"}
                  path={`${global}/workout_1.pdf`}
                  description={"October 23, 2024"}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export { FileDownloadPanel };