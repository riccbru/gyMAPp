import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      login:    false,
      username: false,
      password: false,
      show:     false,
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
          className: "bg-red text-white rounded-xl"
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
        <Card className={`bg-primary rounded-xl ${!errors.login ? '' : 'border-red border-2'}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <img alt="Icon" src="/gamma-96.png" className="ml-3 w-12 h-12" />
              <h1 className="mx-auto">Login gyMAPp</h1>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col w-80" onSubmit={handleSubmit}>
              <Label className="mb-1.5" htmlFor="username">
                Username
              </Label>
              <Input
                className={`rounded-3xl authnInput ${!errors.username ? '' : 'border-red border-2'}`}
                type="text"
                name="username"
                value={loginData.username}
                placeholder="Enter username"
                onChange={(e) => handleChange(e)}
              />


              <Label className="mt-2 mb-1.5" htmlFor="password">
                Password
              </Label>
              <div className="flex justify-between items-center w-full text-background">
                <Input
                  className={`rounded-3xl text-white authnInput ${!errors.password ? '' : 'border-red border-2'}`}
                  type={errors.show ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  placeholder="Enter password"
                  onChange={(e) => handleChange(e)}
                />
                {errors.show ? <Eye className='showButton' onClick={flipShow} /> : <EyeOff className='showButton' onClick={flipShow} />}
              </div>

              <Button
                type="submit"
                className="bg-white hover:bg-white text-background rounded-3xl hover:rounded-xl mt-5"
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