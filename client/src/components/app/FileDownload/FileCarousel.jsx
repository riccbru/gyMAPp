import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FileCard } from "./FileCard";

function FileCarousel({ title, files }) {
    return(
        <>
            <h2 className="text-center font-extrabold">{title}</h2>
            <Carousel>
                <CarouselContent>
                    {files.map((file, index) => (
                        <CarouselItem key={index}>
                            <FileCard {...file} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    );
}

export { FileCarousel };