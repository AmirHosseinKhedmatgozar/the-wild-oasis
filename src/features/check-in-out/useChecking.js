import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useChecking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, getLoading } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => {
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked-in",
        ...breakfast,
      });
    },

    onSuccess: () => {
      toast.success(`Booking  successfully checked in `);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => {
      toast.error(`There was an error while checking in `);
    },
  });
  return { checkin, getLoading };
}
