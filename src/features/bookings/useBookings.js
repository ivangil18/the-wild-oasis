import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useReadBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterBy = searchParams.get("status");
  const filter =
    !filterBy || filterBy === "all"
      ? null
      : { field: "status", value: filterBy };
  // : { field: "status", value: filterBy, method: "eq" };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  // PAGINATION

  const page = searchParams.get("page");

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, bookings, error };
}
