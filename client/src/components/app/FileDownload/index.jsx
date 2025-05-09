import { FileCard } from "./FileCard";

function FileDownloadPanel() {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="pageTitle">FILE DOWNLOAD</div>
      <div className="pageDivider">
        <div className="itemDivided">
          <FileCard
            title={"BIA #2"}
            path={"/PDF/bia_2.pdf"}
            description={"December 19, 2024"}
          />
          <FileCard
            title={"BIA #1"}
            path={"/PDF/bia_1.pdf"}
            description={"August 31, 2024"}
          />
        </div>
        <div className="itemDivided">
          <FileCard
            title={"Meal #2"}
            path={"/PDF/meal_2.pdf"}
            description={"January 2, 2025"}
          />
          <FileCard
            title={"Meal #1"}
            path={"/PDF/meal_1.pdf"}
            description={"September 5, 2024"}
          />
        </div>
        <div className="itemDivided">
          <FileCard
            title={"Workout"}
            path={"/PDF/workout_1.pdf"}
            description={"October 23, 2024"}
          />
        </div>
      </div>
    </div>
  );
}

export { FileDownloadPanel };