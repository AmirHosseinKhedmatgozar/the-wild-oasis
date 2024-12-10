import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleting, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => {
      deleteBooking(id);
    },
    onSuccess: () => {
      toast.success(`Booking successfully deleted `);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: () => {
      toast.error(`booking Failed deleted`);
    },
  });
  return { deleting, deleteLoading };
}
