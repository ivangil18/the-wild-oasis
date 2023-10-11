import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "../dashboard/Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales =
    numBookings === 0
      ? 0
      : bookings.reduce(
          (totalSales, currStay) =>
            totalSales + (currStay.totalPrice + currStay.extrasPrice),
          0
        );

  // 3.
  const numCheckins = confirmedStays.length;

  // 4.
  // This one needs more atention, math can be improved here to determine ocupancy rate
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numCheckins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
