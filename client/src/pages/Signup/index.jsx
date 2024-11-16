import { Toaster } from '@/components/ui/toaster';
import { SignupForm } from '@/components/app/AuthN/Signup';

function Signup() {
    return(
        <div>
            <SignupForm />
            <Toaster />
        </div>
    );
}

export { Signup };