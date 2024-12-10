import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, getLoading } = useMutation({
    mutationFn: (bookingId) => {
      updateBooking(bookingId, {
        status: "checked-out",
      });
    },

    onSuccess: () => {
      toast.success(`Booking  successfully checked out `);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error(`There was an error while checking oyt `);
    },
  });
  return { checkout, getLoading };
}
