import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

function LoginForm() {

    const { login } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [userError, setUserError] = useState(false);
    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const credentials = { username, password };
        setUserError(false);
        setPassError(false);
        setLoginError(false);
        if (!username) {
            setUserError(true);
            toast({
                duration: 2000,
                title: "MISSING CREDENTIALS",
                description: "Username is required",
                className: "bg-red text-white rounded-xl"
            });
            return;
        } else if (!password) {
            setPassError(true);
            toast({
                duration: 2000,
                title: "MISSING CREDENTIALS",
                description: "Password required",
                className: "bg-red text-white rounded-xl"
            });
            return;

        }
        try {
            await login(credentials);
            navigate("/");
        } catch (err) {
            setLoginError(true);
            toast({
                duration: 2000,
                title: "LOGIN FAILED",
                description: "Incorrect username and/or password",
                className: "bg-red text-white rounded-xl"
            });
        }
    }

    return (
      <div className="authnForm">
        <Card className={`bg-primary rounded-xl ${!loginError ? '' : 'border-red border-2'}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <img alt="Icon" src="/gamma-96.png" className="ml-3 w-12 h-12" />
              <h1 className="mx-auto">Login gyMAPp</h1>
            </CardTitle>
            {/* <CardDescription>description</CardDescription> */}
          </CardHeader>

          <CardContent>
            <form className="flex flex-col w-80" onSubmit={handleSubmit}>
              <Label className="mb-1.5" htmlFor="username">
                Username
              </Label>
              <Input
                className={`rounded-3xl authnInput ${!userError ? '' : 'border-red border-2'}`}
                name="username"
                type="text"
                value={username}
                placeholder="Enter username"
                onChange={(e) => {
                  setUserError(false);
                  setUsername(e.target.value);
                }}
              />

              <Label className="mt-2 mb-1.5" htmlFor="password">
                Password
              </Label>
              <Input
                className={`rounded-3xl authnInput ${!passError ? '' : 'border-red border-2'}`}
                name="password"
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => {
                  setPassError(false);
                  setPassword(e.target.value);
                }}
              />

              <Button
                type="submit"
                className="mt-5 bg-white hover:bg-white text-background rounded-3xl hover:rounded-xl"
              >
                LOGIN
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center text-sm">
            Don't have an account? <a href="/signup" className="ml-1 text-gray underline">Sign Up</a>
          </CardFooter>

        </Card>
      </div>
    );
}

export { LoginForm };