import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function FileCard({ title, author, path, description }) {
  return (
    <Card className="fileCard rounded-3xl border-4">
      <CardHeader className="text-center">
        <CardTitle>
          <a
            href={path}
            download
            className="aHref rounded-full hover:rounded-xl transition-all duration-150 ease-linear cursor-pointer"
          >
            {title}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center font-bold">{description}</CardContent>
      <CardFooter className="text-center text-sm">{author}</CardFooter>
    </Card>
  );
}

export { FileCard };
