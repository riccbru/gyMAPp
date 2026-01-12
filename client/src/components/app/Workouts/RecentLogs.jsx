import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function RecentLogs({ logs, deleteLog }) {
  return (
    <div className="mt-8 px-4">
      <Card className="logCard !w-full border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <CardHeader className="pb-2" />

        <CardContent className="space-y-3">
          {logs
            .sort((a, b) => b.lid - a.lid)
            .map((log) => (
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
                  <span>
                    {Array.isArray(log.reps) ? log.reps.join(" - ") : log.reps}{" "}
                  </span>
                  {log.weight > 0 && (
                    <>
                      <span className="mx-2 opacity-30">•</span>
                      <span className="text-slate-300">{log.weight} KG</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => deleteLog(log.lid)}
                  className="absolute top-4 right-4 sm:static p-2 rounded-full bg-slate-800/50 text-slate-500 hover:bg-red/10 hover:text-red transition-all duration-200"
                  title="Delete Log"
                >
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}

export { RecentLogs };
