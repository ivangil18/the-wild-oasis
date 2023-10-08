import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userUpdate as userUpdateApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: userUpdate } = useMutation({
    mutationFn: ({ fullName, avatar }) => userUpdateApi(fullName, avatar),
    onSuccess: () => {
      toast.success("User account updated successfully");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) =>
      toast.error(" There was a problem updating the user account"),
  });
  return { isLoading, userUpdate };
}
