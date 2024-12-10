import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: updateUserLoading, mutate: updateUser } = useMutation({
    mutationFn: updateUserApi,

    onSuccess: (data) => {
      toast.success("information seccessfully edited");
      queryClient.setQueryData(["user"], data.user);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUserLoading, updateUser };
}
