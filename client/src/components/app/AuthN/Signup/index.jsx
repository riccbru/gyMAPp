import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { InputField } from "../InputField";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
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
import { SignupCalendar } from "./SignupCalendar";

function SignupForm() {

    const { signup } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const defaultData = {
        name:       "",
        email:      "",
        username:   "",
        password:   "",
        birthdate:  ""
    }

    const defaultErrors = {
        show:       false,
        name:       false,
        email:      false,
        signup:     false,
        username:   false,
        password:   false,
        birthdate:  false
    }

    const [errors, setErrors] = useState(defaultErrors);
    const [signupData, setSignupData] = useState(defaultData);

    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors((prev) => ({ ...prev, [name]: false }));
        setSignupData((prevData) => ({ ...prevData, [name]: value }));
    }

    const selectDate = (newDate) => {
        const date = new Date(newDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const yyyy = date.getFullYear();

        const mm = month < 10 ? `0${month}` : month;
        const dd = day < 10 ? `0${day}` : day;

        const birthdate = `${mm}-${dd}-${yyyy}`;

        return birthdate;
    }

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(defaultErrors);
        if (!signupData.name) { 
            showErrorToast("name", "MISSING CREDENTIALS", "Name is required");
            return;
        }
        else if (!signupData.email) { 
            showErrorToast("email", "MISSING CREDENTIALS", "Email is required");
            return;
        }
        else if (!signupData.birthdate) { 
            showErrorToast("birthdate", "MISSING CREDENTIALS", "Birthdate is required");
            return;
        }
        else if (!signupData.username) { 
            showErrorToast("username", "MISSING CREDENTIALS", "Username is required");
            return;
        }
        else if (!signupData.password) { 
            showErrorToast("password", "MISSING CREDENTIALS", "Password is required");
            return;
        }
        try {
            await signup({...signupData, birthdate: selectDate(signupData.birthdate)});
            setErrors((prevData) => ({ ...prevData, signup: false }));
            navigate("/login");
          } catch (err) {
          setErrors((prevData) => ({ ...prevData, signup: true }));
            showErrorToast("signup", "SIGNUP FAILED", err.error || "Please, try again");
        } 
    }
    
    return (
      <div className="authnForm">
        <Card
          className={`authnCard ${
            !errors?.signup ? "!border-green" : "!border-red"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <img alt="Icon" src="/gamma-96.png" className="ml-3 w-12 h-12" />
              <h1 className="mx-auto">Signup gyMAPp</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col w-80" onSubmit={handleSubmit}>
              <InputField
                name="name"
                label="Name"
                error={errors.name}
                submit={errors.signup.toString()}
                onChange={handleChange}
                value={signupData.name}
                placeholder="Enter your name"
              />

              <InputField
                name="email"
                label="Email"
                error={errors.email}
                submit={errors.signup.toString()}
                onChange={handleChange}
                value={signupData.email}
                placeholder="Enter your email"
              />

              <SignupCalendar
                error={errors.birthdate}
                handleChange={handleChange}
                birthdate={signupData.birthdate}
              />

              <InputField
                name="username"
                label="Username"
                onChange={handleChange}
                error={errors.username}
                submit={errors.signup.toString()}
                value={signupData.username}
                placeholder="Enter a username"
              />

              <PasswordField
                name="password"
                label="Password"
                submit={errors.signup.toString()}
                onChange={handleChange}
                error={errors.password}
                onToggleShow={flipShow}
                showPassword={errors.show}
                value={signupData.password}
              />

              <Button
                type="submit"
                className="mt-5 hover:bg-panna
                  !bg-white text-background
                    rounded-3xl hover:rounded-xl
                    transition-all duration-200
                    ease-linear cursor-pointer"
              >
                SIGNUP
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm">
            Already signed up?{" "}
            <a href="/login" className="footerLink">
              Log in
            </a>
          </CardFooter>
        </Card>
      </div>
    );
}

export { SignupForm };