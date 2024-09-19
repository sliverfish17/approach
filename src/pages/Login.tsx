import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/auth";
import { loginSchema } from "@/helpers/validations/yupLoginSchema";
import { PAGES } from "@/types/Pages";
import { FirebaseAuthError } from "@/types/Firebase";
import toast from "react-hot-toast";
import { LoginFormEntries } from "@/types/Forms";
import { Button } from "@/components/UI/Button";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormEntries>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormEntries) => {
    try {
      await loginUser(data.email, data.password);
      toast.success(`You logged in as ${data.email}`);
      navigate(PAGES.HOME);
    } catch (err: unknown) {
      const error = err as FirebaseAuthError;
      if (error && error.message) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100dvh-128px)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white shadow-md rounded max-w-lg"
      >
        <h2 className="text-2xl mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border p-2 mb-2 w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border p-2 mb-4 w-full"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
