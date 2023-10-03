import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      // remove queries eliminates any data stored in the react-query cache
      queryClient.removeQueries();
      // replace true eliminates the posibility of back navigating in the browser by eliminating the previous url
      navigate("/login", { replace: true });
    },
    onError: () => toast.error("There was an error loging out the user"),
  });

  return { logout, isLoading };
}
