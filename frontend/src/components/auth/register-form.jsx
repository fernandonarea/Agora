import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

import { Link } from "react-router-dom";
import { Textarea } from "../ui/textarea";

const RegisterForm = () => {
  const { registerUser, loading, error } = useAuth();

  const [user_email, setUser_email] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUserName] = useState("");
  const [user_lastname, setUserLastName] = useState("");
  const [role] = useState("user");
  
  const [store_name, setStoreName] = useState("");
  const [store_description, setStoreDescription] = useState("");
  const [store_address, setStoreAddress] = useState("");
  const [store_phone, setStorePhone] = useState("");

  const [step, setStep] = useState(1);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(user_name, user_lastname, role, user_email, password, 
      store_name, store_description, store_address, store_phone);
    
      if (result) {
      setAlert(true);

      setUser_email("");
      setPassword("");
      setUserName("");
      setUserLastName("");

      setStoreName("");
      setStoreDescription("");
      setStoreAddress("");
      setStorePhone("");

      setTimeout(() => setAlert(false), 3000);
      navigate("/home");
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    if (user_email && password && user_name && user_lastname) {
      setStep(2);
    }
  }
  
  const handlePrevStep = () => {
    setStep(1);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {step === 1 ? "Complete your Personal Information" : "Complete Store Information"}
          </CardTitle>
          <CardDescription>
            {step === 1 ? "Your first step to Success" : "You are almost there!"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
            <div className="grid gap-6">
              
              {step === 1 && (
                <div className="grid gap-5">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user_email}
                      onChange={(e) => setUser_email(e.target.value)}
                      placeholder="m@example.com"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="user_name">Name</Label>
                    <Input
                      id="user_name"
                      type="text"
                      value={user_name}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Anthony Fernando"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="user_lastname">Last Name</Label>
                    <Input
                      id="user_lastname"
                      type="text"
                      value={user_lastname}
                      onChange={(e) => setUserLastName(e.target.value)}
                      placeholder="Narea Franco"
                      required
                    />
                  </div>
                    <Button type="submit" className="w-full bg-violet-700 hover:bg-violet-900 mt-2">
                      Next Step
                    </Button>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-5">
                  <div className="grid gap-3">
                    <Label htmlFor="store_name">Store Name</Label>
                    <Input
                      id="store_name"
                      type="text"
                      value={store_name}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="My Store"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="store_description">Store Description</Label>
                    <Textarea
                      id="store_description"
                      type="text"
                      value={store_description}
                      onChange={(e) => setStoreDescription(e.target.value)}
                      placeholder="Describe your store"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="store_address">Store Address</Label>
                    <Input
                      id="store_address"
                      type="text"
                      value={store_address}
                      onChange={(e) => setStoreAddress(e.target.value)}
                      placeholder="123 Main Street, City, Country"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="store_phone">Store Phone</Label>
                    <Input
                      id="store_phone"
                      type="tel"
                      value={store_phone}
                      onChange={(e) => setStorePhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                  
                  {error && (
                    <p className="text-red-500 text-sm font-medium text-center">{error}</p>
                  )}

                  <div className="w-full flex flex-row gap-2 items-center justify-center">
                    <Button onClick={handlePrevStep} className="w-auto bg-gray-500 hover:bg-gray-700">
                      Previous Step
                    </Button>

                    <Button type="submit" className="w-auto bg-violet-700 hover:bg-violet-900 ">
                      {loading ? "Registering..." : "Register"}
                    </Button>
                  </div>
                </div>
              )}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={"/login"} className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {alert && (
        <Alert className="bg-green-50 border-green-600 text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Successful Registration</AlertTitle>
          <AlertDescription>
            Your account has been created successfully. You can now log in.
          </AlertDescription>
        </Alert>
      )}

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default RegisterForm;
