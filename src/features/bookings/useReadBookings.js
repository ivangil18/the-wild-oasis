import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useReadBookings() {
  const [searchParams] = useSearchParams();

  const filterBy = searchParams.get("status");

  console.log(filterBy);

  const filter =
    !filterBy || filterBy === "all"
      ? null
      : { field: "status", value: filterBy };
  // : { field: "status", value: filterBy, method: "eq" };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, bookings, error };
}
