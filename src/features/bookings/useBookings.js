import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export function useReadBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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
  const page = searchParams.get("page") || 1;

  // QUERY
  const {
    isLoading,
    // INITIALLY THE DATA OBJECT DOES NOT EXIST THERE FOR IT NEEDS TO BE INITIALIEZED AS AN EMPTY {}
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // this check is to prevent loading pages with no data
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  // prefetching is performed in both directions
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, count, error };
}
