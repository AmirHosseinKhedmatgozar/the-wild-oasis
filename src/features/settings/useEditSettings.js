import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSettings() {
  const queryClient = useQueryClient();

  const { isLoading: settingsEditLoading, mutate: settingsMutate } =
    useMutation({
      mutationFn: updateSetting,

      onSuccess: () => {
        toast.success("settings seccessfully edited");
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        });
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { settingsEditLoading, settingsMutate };
}
