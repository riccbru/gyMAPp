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
            description={"19/12/2024"}
          />
          <FileCard
            title={"BIA #1"}
            author={"Mattia Cecchetti"}
            path={`${global}/bia_1.pdf`}
            description={"31/08/2024"}
          />
        </div>
        <div className="itemDivided">
          <FileCard
            title={"MEAL #2"}
            author={"Mattia Cecchetti"}
            path={`${global}/meal_2.pdf`}
            description={"02/01/2025"}
          />
          <FileCard
            title={"MEAL #1"}
            author={"Mattia Cecchetti"}
            path={`${global}/meal_1.pdf`}
            description={"09/05/2024"}
          />
        </div>
        <div className="itemDivided">
          <FileCard
            title={"WORKOUT #1"}
            author={"Emanuele Moretti"}
            path={`${global}/workout_1.pdf`}
            description={"10/23/2024"}
          />
        </div>
      </div>
    </div>
  );
}

export { FileDownloadPanel };