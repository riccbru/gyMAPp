import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function FileCard({ title, path, description }) {
    return(
        <Card className="fileCard rounded-3xl">
            <CardHeader className="text-center">
                <CardTitle>
                    <a href={path} download
                    className="aHref">
                    {title}
                    </a>
                </CardTitle>
            </CardHeader>
            <CardContent className="text-left">
                {description}
            </CardContent>
        </Card>
    );
}

export { FileCard };