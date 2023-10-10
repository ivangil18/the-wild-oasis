import { useQuery } from "@tanstack/react-query";
import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useCurrentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });
  if (error) throw new Error(error.message);

  return { isLoading, bookings };
}
