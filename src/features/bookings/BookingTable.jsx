import BookingRow from "./BookingRow";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";

import { useReadBookings } from "./useReadBookings";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const { bookings, isLoading } = useReadBookings();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterOption = searchParams.get("status") || "all";

  // 1) Fillter
  let filteredBookings = [];

  if (filterOption === "all") filteredBookings = bookings;

  if (filterOption === "unconfirmed")
    filteredBookings = bookings.filter(
      (booking) => booking.status === filterOption
    );
  if (filterOption === "checked-in")
    filteredBookings = bookings.filter(
      (booking) => booking.status === filterOption
    );
  if (filterOption === "checkd-out")
    filteredBookings = bookings.filter(
      (booking) => booking.status === filterOption
    );

  if (isLoading) return <Spinner />;

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
          // data={bookings}
          data={filteredBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
