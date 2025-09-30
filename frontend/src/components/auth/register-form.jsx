import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

import { Link } from "react-router-dom";

const RegisterForm = () => {
  const { registerUser, loading, error } = useAuth();

  const [user_email, setUser_email] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUserName] = useState("");
  const [user_lastname, setUserLastName] = useState("");
  const [role] = useState("user");
  const [alert, setAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(
      user_name,
      user_lastname,
      role,
      user_email,
      password
    );

    if (result) {
      setAlert(true);

      setUser_email("");
      setPassword("");
      setUserName("");
      setUserLastName("");

      setTimeout(() => setAlert(false), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your Account</CardTitle>
          <CardDescription>Your first step to Success</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
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
                  <Label htmlFor="user_name">Nombre</Label>
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
                  <Label htmlFor="user_lastname">Apellido</Label>
                  <Input
                    id="user_lastname"
                    type="text"
                    value={user_lastname}
                    onChange={(e) => setUserLastName(e.target.value)}
                    placeholder="Narea Franco"
                    // required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-medium text-center">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-violet-700 hover:bg-violet-900"
                >
                  {loading ? "Loading..." : "Register"}
                </Button>
              </div>
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
          <AlertTitle>Registro exitoso</AlertTitle>
          <AlertDescription>
            Tu cuenta ha sido creada correctamente 🎉
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
