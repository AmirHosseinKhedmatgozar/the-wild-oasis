import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  //number of days
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  //start DATE
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading: isLoading2, data: recentStays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = recentStays?.filter(
    (val) => val.status === "checked-out" || val.status === "checked-in"
  );

  return { isLoading2, recentStays, confirmedStays, numDays };
}
