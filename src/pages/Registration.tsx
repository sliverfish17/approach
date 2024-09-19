import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { registrationSchema } from "@/helpers/validations/yupRegistrationSchema";
import { registerUser } from "@/services/auth";
import { PAGES } from "@/types/Pages";
import { FirebaseAuthError } from "@/types/Firebase";
import toast from "react-hot-toast";
import { RegistrationFormEntries } from "@/types/Forms";
import { Button } from "@/components/UI/Button";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormEntries>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormEntries) => {
    try {
      await registerUser(data.email, data.password);
      toast.success("Your account was successfully created");
      navigate(PAGES.SIGN_IN);
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
        <h2 className="text-2xl mb-4">Register</h2>
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
          className="border p-2 mb-2 w-full"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className="border p-2 mb-4 w-full"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
