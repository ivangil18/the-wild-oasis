import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ ...credentials }) => signupApi({ ...credentials }),
    onSuccess: () => {
      toast.success("New account successfully created");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading };
}
