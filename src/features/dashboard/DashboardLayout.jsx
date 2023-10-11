import styled from "styled-components";

import { useCurrentStays } from "./useCurrentStays";
import { useCurrentBookings } from "./useCurrentBookins";
import { useReadCabins } from "../cabins/useReadCabins";

import Spinner from "../../ui/Spinner";

import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const {
    isLoading: isLoading1,
    stays,
    confirmedStays,
    numDays,
  } = useCurrentStays();
  const { isLoading: isLoading2, bookings } = useCurrentBookings();
  const { isLoading: isLoading3, cabins } = useReadCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
        numDays={numDays}
      />
      <div>Today</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
