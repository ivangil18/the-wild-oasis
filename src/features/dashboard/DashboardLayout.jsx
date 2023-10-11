import styled from "styled-components";

import { useCurrentStays } from "./useCurrentStays";
import { useCurrentBookings } from "./useCurrentBookins";
import { useReadCabins } from "../cabins/useReadCabins";

import Spinner from "../../ui/Spinner";

import Stats from "./Stats";

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
      <div>Todays activity</div>
      <div>Chart stay duration</div>
      <div>chart of sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
