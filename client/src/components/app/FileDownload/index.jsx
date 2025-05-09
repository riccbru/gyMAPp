import { FileCard } from "./FileCard";

function FileDownloadPanel() {
    const global = "/pdf";
  return (
    <div className="flex flex-col gap-y-3">
      <div className="pageTitle">FILE DOWNLOAD</div>
      <div className="pageDivider">
        <div className="itemDivided">
          <FileCard
            title={"BIA #2"}
            author={"Mattia Cecchetti"}
            path={`${global}/bia_2.pdf`}
            description={"December 19, 2024"}
          />
          <FileCard
            title={"BIA #1"}
            author={"Mattia Cecchetti"}
            path={`${global}/bia_1.pdf`}
            description={"August 31, 2024"}
          />
        </div>
        <div className="itemDivided">
          <FileCard
            title={"MEAL #2"}
            author={"Mattia Cecchetti"}
            path={`${global}/meal_2.pdf`}
            description={"January 2, 2025"}
          />
          <FileCard
            title={"MEAL #1"}
            author={"Mattia Cecchetti"}
            path={`${global}/meal_1.pdf`}
            description={"September 5, 2024"}
          />
        </div>
        <div className="itemDivided">
          <FileCard
            title={"WORKOUT #1"}
            author={"Emanuele Moretti"}
            path={`${global}/workout_1.pdf`}
            description={"October 23, 2024"}
          />
        </div>
      </div>
    </div>
  );
}

export { FileDownloadPanel };