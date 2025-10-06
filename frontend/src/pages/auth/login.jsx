import { Codesandbox } from "lucide-react";
import LoginForm  from '@/components/auth/login-form';
import  loginImage  from '@/assets/images/loginImage.png'

const Login = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      
      <div className="flex flex-col gap-4 p-6 md:p-10 drop-shadow-2xl">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-bold">
            <div className="bg-violet-800 text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <Codesandbox className="size-5" />
            </div>
            Inventory.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      
      <div className="bg-muted relative hidden lg:block">
        <img
          src={loginImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-80"
        />
      </div>
    
    </div>
  )
};

export default Login;