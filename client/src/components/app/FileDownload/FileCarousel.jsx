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
            <div className="mt-5 mb-3 text-2xl text-center font-extrabold">{title}</div>
            <Carousel className='mb-10'>
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