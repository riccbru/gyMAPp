import API from "@/lib/API";
import { LogForm } from "./LogForm";
import params from "@/lib/parameters";
import { useAuth } from "@/hooks/useAuth";
import { RecentLogs } from "./RecentLogs";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Exercises } from "../Home/Exercises";
import { ExerciseChart } from "./ExerciseChart";
import { WorkoutSelection } from "./WorkoutSelection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function WorkoutsPanel() {
  const { toast } = useToast();
  const { isLogged } = useAuth();
  const [logs, setLogs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [weekday, setWeekday] = useState(params.getWeekdayNum());

  const deleteLog = async (lid) => {
    try {
      await API.deleteLog(lid);
      setLogs((prev) => prev.filter((log) => log.lid !== lid));
      setRefresh(true);
    } catch (err) {
      toast({ title: "Failed to delete log", description: err, variant: "destructive" });
    }
  };

  const groupedLogs = logs.reduce((acc, log) => {
    if (!acc[log.exercise_name]) {
      acc[log.exercise_name] = [];
    }
    acc[log.exercise_name].push(log);
    return acc;
  }, {});

  Object.keys(groupedLogs).forEach((exerciseName) => {
    groupedLogs[exerciseName].sort((a, b) => b.lid - a.lid);
  });

  useEffect(() => {
    if (isLogged) {
      API.fetchWorkout(weekday).then((res) => setExercises(res.exercises || []));
      API.fetchLogs().then((res) => setLogs(res.logs || []));
      setRefresh(false);
    }
  }, [isLogged, weekday, refresh]);

  return (
    <div className="flex flex-col space-y-6">

      {/* HEADER SECTION */}
      <div className="text-center">
        <div className="pageTitle">WORKOUTS</div>
      </div>

      <Tabs defaultValue="home" className="w-full">
        
        {/* CENTERED SEGMENTED CONTROL */}
        <div className="flex justify-center mb-10 px-4">
          <TabsList className="grid w-full max-w-[320px] grid-cols-2 bg-slate-950/50 border border-slate-800 p-1.5 rounded-2xl backdrop-blur-sm shadow-xl">
            <TabsTrigger 
              value="home" 
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-background data-[state=active]:shadow-lg font-black text-[10px] tracking-[0.25em] py-2.5 transition-all uppercase"
            >
              HOME
            </TabsTrigger>
            <TabsTrigger 
              value="gym" 
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-background data-[state=active]:shadow-lg font-black text-[10px] tracking-[0.25em] py-2.5 transition-all uppercase"
            >
              GYM
            </TabsTrigger>
          </TabsList>
        </div>

        {/* HOME TAB */}
        <TabsContent value="home" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-300">
          <div className="mt-10 mb-10 flex flex-col items-center">
            <LogForm setRefresh={setRefresh} />
          </div>
          <div className="flex flex-col space-y-8 pb-20 px-4">
            
            {logs.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">No progress data yet</p>
              </div>
            ) : (
              [...new Set(logs.map((l) => l.exercise_name))].sort().map((name, index) => (
                <div key={name} className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800/50 backdrop-blur-sm">

                  {/* Exercise Name Header */}
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">
                    {name}
                  </h3>
                  
                  {/* Grid with Chart and Logs */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

                    {/* Chart */}
                    <div className="h-full flex items-center">
                      <ExerciseChart
                        logs={logs}
                        exerciseName={name}
                        color={index % 2 === 0 ? "rgba(34, 197, 94, 1)" : "rgba(168, 85, 247, 1)"}
                      />
                    </div>
                    
                    {/* Logs */}
                    <div>
                      <RecentLogs logs={groupedLogs[name]} deleteLog={deleteLog} />
                    </div>

                  </div>
                </div>
              ))
            )}

          </div>
        </TabsContent>
        
        {/* GYM TAB */}
        <TabsContent value="gym" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-300">
          <Card className="logCard !bg-transparent !border-none shadow-none">
            <div className="pageDivider">
              <div className="itemDivided">
                <div className="itemTitle !text-[10px] tracking-[0.3em] mb-6">SELECT ROUTINE</div>
                <div className="flex flex-col items-center mx-auto w-full">
                  <WorkoutSelection setWeekday={setWeekday} />
                </div>
              </div>
              <div className="itemDivided">
                <div className="itemTitle !text-[10px] tracking-[0.3em] mb-6">EXERCISES</div>
                <Exercises workoutExercises={exercises} />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { WorkoutsPanel };