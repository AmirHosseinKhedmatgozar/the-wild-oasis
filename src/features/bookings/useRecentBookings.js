import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  //number of days
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  //start DATE
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading: isLoading1, data: recentBookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),

    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading1, recentBookings };
}
