import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

function LazyLoader({ children, message }) {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-[80vh] w-full space-y-4">
                <Spinner size="lg" className="text-green" />
                {message && (
                    <p className="text-slate-400 font-black tracking-[0.3em] text-[10px] animate-pulse uppercase">
                        {message}
                    </p>
                )}
            </div>
        }>
            {children}
        </Suspense>
    );
}

export { LazyLoader };