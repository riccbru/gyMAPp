import { Toaster } from "@/components/ui/toaster";
import { LoginForm } from "@/components/app/AuthN/Login";

function Login() {
    return(
        <div>
            <LoginForm />
            <Toaster />
        </div>
    );
}

export { Login };