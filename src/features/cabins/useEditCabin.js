import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creatEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: editLoading, mutate: editMutate } = useMutation({
    mutationFn: ({ newCabin, id }) => {
      creatEditCabin(newCabin, id);
    },

    onSuccess: () => {
      toast.success("cabin seccessfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editLoading, editMutate };
}
