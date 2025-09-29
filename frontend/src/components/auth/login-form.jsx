import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { loginUser, loading, error } = useAuth();
  const [user_email, setUser_email] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(user_email, password);
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="user_email"
            type="email"
            onChange={(e) => setUser_email(e.target.value)}
            value={user_email}
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
            placeholder="******"
            required
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm font-medium text-center">
            {error}
          </p>
        )}
        <Button
          type="submit"
          className="w-full bg-violet-700 hover:bg-violet-800"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to={"/register"} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
