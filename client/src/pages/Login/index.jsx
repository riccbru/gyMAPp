import { LoginForm } from "@/components/app/Login";
import { Toaster } from "@/components/ui/toaster";

function Login() {
    return(
        <div>
            <LoginForm />
            <Toaster />
        </div>
    );
}

export { Login };