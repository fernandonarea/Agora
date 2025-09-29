import RegisterForm from "../../components/auth/register-form"
import { Codesandbox } from "lucide-react"

const Register = () => {
   return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-violet-800 text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Codesandbox className="size-4" />
          </div>
          Inventory.
        </a>
        <RegisterForm />
      </div>
    </div>
  )
}
export default Register