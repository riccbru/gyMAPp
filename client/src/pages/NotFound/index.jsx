import { Button } from "@/components/ui/button";

function NotFound() {
    return (
      <div className="flex flex-col">
        <div className="pageTitle">404 NOT FOUND</div>
        <div className="text-center mt-10">
            The page you are looking for doesn't exist...
        </div>
      </div>
    );
}

export { NotFound };