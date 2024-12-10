import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creatEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: creatLoading, mutate: creatMutate } = useMutation({
    mutationFn: creatEditCabin,

    onSuccess: () => {
      toast.success("new cabin seccessfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { creatLoading, creatMutate };
}
