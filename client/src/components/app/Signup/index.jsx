import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CalendarIcon } from 'lucide-react';
import { DayPicker } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";


function SignupForm() {

    const { signup } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        name:       "",
        email:      "",
        username:   "",
        password:   "",
        birthdate:  ""
    });
    
    const [errors, setErrors] = useState({
        name:       false,
        email:      false,
        signup:     false,
        username:   false,
        password:   false,
        birthdate:  false
    });

    const handleChange = (e) => {
        setErrors((prev) => ({ ...prev, [e.target.name]: false }));
        setSignupData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }

    const selectDate = (date) => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const yyyy = date.getFullYear();

        const mm = month < 10 ? `0${month}` : month;
        const dd = day < 10 ? `0${day}` : day;

        const birthdate = `${mm}-${dd}-${yyyy}`;

        setSignupData((prevData) => ({ ...prevData, birthdate: birthdate }));
    }

    const showErrorToast = (field, title, message) => {
        setErrors((prev) => ({ ...prev, [field]: true }));
        toast({
            duration: 2500,
            title: title,
            description: message,
            className: "bg-red text-white rounded-xl"
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({ name: false, email: false, birthdate: false, username: false, password: false});
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
            console.log("index.Signup: TRY (before)");
            const userData = {
                name: signupData.name,
                email: signupData.email,
                birthdate: signupData.birthdate,
                username: signupData.username,
                password: signupData.password
            }
            await signup(userData);
            console.log("index.Signup: TRY (after)");
            navigate("/login");
        } catch (err) {
            console.log("index.Signup: CATCH");
            console.log(err.error);
            showErrorToast("signup", "SIGNUP FAILED", err.error || "Please, try again");
        }
    }
    
    return(
        <div className="authnForm">
            <Card className={`bg-primary rounded-xl ${!errors.signup ? '' : 'border-red border-2'}`}>

                <CardHeader>
                    <CardTitle className="flex items-center">
                        <img alt="Icon" src="/gamma-96.png" className="ml-3 w-12 h-12" />
                        <h1 className="mx-auto">Signup gyMAPp</h1>
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="flex flex-col w-80" onSubmit={handleSubmit}>

                        <Label htmlFor="name" className="mb-1.5">Name & Surname</Label>
                        <Input 
                            className={`rounded-3xl authnInput ${!errors.name ? '' : 'border-red border-2'}`}
                            type="text"
                            name="name"
                            value={signupData.name}
                            placeholder="Enter full name"
                            onChange={(e) => handleChange(e)}
                        />

                        <Label htmlFor="email" className="mt-2 mb-1.5">Email</Label>
                        <Input
                            className={`rounded-3xl authnInput ${!errors.email ? '' : 'border-red border-2'}`}
                            type="text"
                            name="email"
                            value={signupData.email}
                            placeholder="Enter email"
                            onChange={(e) => handleChange(e)}
                        />

                        <Label className="mt-2 mb-2">Birthdate</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className={`bg-white hover:bg-panna text-background rounded-xl ${!errors.birthdate ? '' : 'border-red border-2'}`}>
                                    <div className="flex justify-between items-center w-full text-background">
                                    {signupData.birthdate ? signupData.birthdate : "Pick birthdate"}
                                    <CalendarIcon />
                                    </div>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar // or DayPicker
                                mode="single"
                                captionLayout="dropdown"
                                className="bg-background text-white"
                                selected={signupData.birthdate}
                                onSelect={(date) => selectDate(date)}
                                // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              />
                            </PopoverContent>
                        </Popover>

                        <Label className="mt-2 mb-1.5" htmlFor="username">Username</Label>
                        <Input
                            className={`rounded-3xl authnInput ${!errors.username ? '' : 'border-red border-2'}`}
                            type="text"
                            name="username"
                            value={signupData.username}
                            placeholder="Enter username"
                            onChange={(e) => handleChange(e)}
                        />

                        <Label className="mt-2 mb-1.5" htmlFor="password">Password</Label>
                        <Input
                          className={`rounded-3xl authnInput ${!errors.password ? '' : 'border-red border-2'}`}
                          type="password"
                          name="password"
                          value={signupData.password}
                          placeholder="Enter a password"
                          onChange={(e) => handleChange(e)}
                        />

                        <Button
                            type="submit"
                            className="bg-white hover:bg-gray text-background rounded-3xl hover:rounded-xl mt-5"
                        >
                            SIGNUP
                        </Button>

                    </form>
                </CardContent>

                <CardFooter className="flex justify-center text-sm">
                    Already signed up? <a href="/login" className="ml-1 text-gray underline">Log in</a>
                </CardFooter>

            </Card>
        </div>
    );
}

export { SignupForm };