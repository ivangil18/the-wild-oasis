import BookingRow from "./BookingRow";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

import { useReadBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isLoading, count } = useReadBookings();

  if (isLoading) return <Spinner />;

  if (!bookings) return <Empty resourceName="bookings" />;

  /*
  //THIS BLOCK OF CODE IS FOR CLIENT SIDE FILTERING AND SORTING
  // 1) Fillter
  const filterOption = searchParams.get("status") || "all";

  console.log(filterOption);
  let filteredBookings = [];

  if (filterOption === "all") filteredBookings = bookings;
  console.log(filteredBookings);
  if (filterOption === "unconfirmed")
    filteredBookings = bookings.filter(
      (booking) => booking.status === filterOption
    );
  if (filterOption === "checked-in")
    filteredBookings = bookings.filter(
      (booking) => booking.status === filterOption
    );
  if (filterOption === "checked-out")
    filteredBookings = bookings.filter(
      (booking) => booking.status === filterOption
    );

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  console.log(sortBy);
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedBookings = filteredBookings.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
*/
  return (
    <Menus>
      <Table $columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          // data={filteredBookings}
          // data={sortedBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
