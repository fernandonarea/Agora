import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Register = () => {
  const { loginUser, loading, error, user } = useAuth();
  const [user_email, setUser_email] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(user_email, password);
  };

  return (
    <Card className="w-full max-w-sm h-fit">
      <CardHeader>
        <CardTitle>Register an user</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="user_email">Email</Label>
            <Input
              id="user_email"
              type="email"
              placeholder="k@example.com"
              value={user_email}
              onChange={(e) => setUser_email(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          {error && <p className="text-sm text-destructive">{error}</p>}
          {user && <p  className="text-sm text-destructive"> Bienvenido {user.id_user}</p>}
          </div>
          <Button type="submit" className="w-full">
            {loading ? "Loading..." : "Log in"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-1">
        <Button variant="outline" className="w-full">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Register;