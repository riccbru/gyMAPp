import { useState } from "react";
import { Trash2, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function RecentLogs({ logs, deleteLog }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [logToDelete, setLogToDelete] = useState(null);
  const itemsPerPage = 5;

  const sortedLogs = [...logs].sort((a, b) => b.lid - a.lid);
  const totalPages = Math.ceil(sortedLogs.length / itemsPerPage);
  const currentLogs = sortedLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const confirmDeletion = () => {
    if (logToDelete) {
      deleteLog(logToDelete);
      setLogToDelete(null);
      if (currentLogs.length === 1 && currentPage > 1)
        setCurrentPage(currentPage - 1);
    }
  };

  const selectedLog = logs.find((log) => log.lid === logToDelete);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="mt-3 px-4">
      <Card className="logCard !w-full border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            {/* The Badge */}
            <span className="text-[13px] font-black bg-white text-background px-2 py-0.5 rounded uppercase">
              {logs.length}
            </span>

            <CardTitle className="text-[13px] text-slate-400 font-medium uppercase tracking-tighter">
              Recent Activity
            </CardTitle>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-lg hover:bg-slate-800 disabled:opacity-20 transition-colors"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="p-1 rounded-lg hover:bg-slate-800 disabled:opacity-20 transition-colors"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-3">
          {currentLogs.map((log) => (
            <div
              key={log.lid}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-slate-600 transition-all duration-300"
            >
              <div className="flex items-center text-[11px] font-bold text-slate-500 uppercase tracking-widest space-x-2">
                <span className="text-[10px] font-black bg-white text-background px-2 py-0.5 rounded uppercase">
                  {log.date}
                </span>
                <span className="text-sm font-black text-white uppercase tracking-tight">
                  {log.exercise_name}
                </span>
                <span className="mx-2 opacity-90">•</span>
                <span className="text-slate-300">
                  {Array.isArray(log.reps) ? log.reps.join(" - ") : log.reps}
                </span>
                <span className="mx-2 opacity-90">•</span>
                <span>{log.weight} KG</span>
                <span className="mx-2 opacity-90">•</span>
                <span>{log.rest}&quot;</span>
              </div>

              <Trash2
                size={24}
                strokeWidth={3}
                onClick={() => setLogToDelete(log.lid)}
                className="cursor-pointer text-white hover:text-red hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <AlertDialog
        open={!!logToDelete}
        onOpenChange={() => setLogToDelete(null)}
      >
        <AlertDialogContent className="deleteLogCard">
          <AlertDialogHeader className="items-center text-center">
            <div className="mb-4 p-4 bg-slate-900/50 rounded-full border border-2 border-red">
              <AlertTriangle size={32} color="red" strokeWidth={2.5} />
            </div>
            <AlertDialogTitle className="text-white text-xl font-black uppercase tracking-tight text-center">
              Delete log?
            </AlertDialogTitle>
            <div className="h-3"></div>
            <AlertDialogDescription className="font-semibold">
              Are you sure you want to delete the{" "}
              {selectedLog?.exercise_name.toUpperCase()} log entry from{" "}
              {formatDate(selectedLog?.date)}?<br></br>
              This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="h-3"></div>
          <AlertDialogFooter className="flex flex-col gap-4 items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-center">
            <AlertDialogCancel className="py-6 text-white font-bold bg-slate-900/50 border-2 rounded-2xl hover:bg-slate-700 transition-all duration-200">
              CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeletion}
              className="py-6 bg-red/90 text-white font-bold border border-red border-2 rounded-2xl hover:bg-red/60 transition-all duration-200"
            >
              DELETE
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { RecentLogs };
