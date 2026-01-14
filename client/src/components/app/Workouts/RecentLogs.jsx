import { useState } from "react";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RecentLogs({ logs, deleteLog }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedLogs = [...logs].sort((a, b) => b.lid - a.lid);

  const totalPages = Math.ceil(sortedLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = sortedLogs.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <div className="mt-8 px-4">
      <Card className="logCard !w-full border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-slate-400 text-sm font-medium">Recent Activity</CardTitle>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={18} className="text-white" />
                </button>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={18} className="text-white" />
                </button>
              </div>
            )}
        </CardHeader>

        <CardContent className="space-y-3">
          {currentLogs.map((log) => (
            <div
              key={log.lid}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-slate-600 transition-all duration-200"
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

              <button
                onClick={() => deleteLog(log.lid)}
                className="absolute top-4 right-4 sm:static p-2 rounded-full bg-slate-800/50 text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
                title="Delete Log"
              >
                <Trash2 size={16} strokeWidth={2.5} />
              </button>
            </div>
          ))}

          {logs.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">
              No logs found. Time to hit the gym!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export { RecentLogs };