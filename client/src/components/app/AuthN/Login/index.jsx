import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { InputField } from "../InputField";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PasswordField } from "../PasswordField";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

function LoginForm() {

    const { login } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
      username: "",
      password: "",
    });
    
    const [errors, setErrors] = useState({
      show:     false,
      login:    false,
      username: false,
      password: false,
    });

    const flipShow = () => {
      setErrors((prevData) => ({ ...prevData, show: !prevData.show }));
    }

    const showErrorToast = (field, title, message) => {
      setErrors((prev) => ({ ...prev, [field]: true }));
      toast({
          duration: 3000,
          title: title,
          description: message,
          className: "toast"
      });
    };

    const handleChange = (e) => {
      setErrors((prev) => ({ ...prev, [e.target.name]: false }));
      setLoginData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({ username: false, password: false, login: false });
        if (!loginData.username) {
          showErrorToast("username", "MISSING CREDENTIALS", "Username is required");
          return;
        } else if (!loginData.password) {
          showErrorToast("password", "MISSING CREDENTIALS", "Password is required");
          return;
        }
        try {
          const credentials = { username: loginData.username, password: loginData.password };
          await login(credentials);
          navigate("/");
        } catch (err) {
          showErrorToast("login", "LOGIN FAILED", err.message || "Incorrect username and/or password");
        }
    }

    return (
      <div className="authnForm">
        <Card className={`authnCard ${!errors.login ? '!border-green' : '!border-red'}`}>

          <CardHeader>
            <CardTitle className="flex items-center">
              <img alt="Icon" src="/gamma-96.png" className="ml-3 w-12 h-12" />
              <h1 className="mx-auto">Login gyMAPp</h1>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col w-80" onSubmit={handleSubmit}>
              <InputField 
                name="username"
                label="Username"
                submit={errors.login}
                onChange={handleChange}
                error={errors.username}
                value={loginData.username}
                placeholder="Enter username"
                />
              <PasswordField 
                name="password"
                label="Password"
                submit={errors.login}
                onChange={handleChange}
                error={errors.password}
                onToggleShow={flipShow}
                value={loginData.password}
                showPassword={errors.show}
                />
              <Button
                type="submit"
                className="mt-5 
                !bg-white text-background
                  rounded-3xl hover:rounded-xl
                  transition-all duration-200
                  ease-linear cursor-pointer"
              >
                LOGIN
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center text-sm">
            Don't have an account?{" "} <a href="/signup" className="footerLink">Sign Up</a>
          </CardFooter>

        </Card>
      </div>
    );
}

export { LoginForm };