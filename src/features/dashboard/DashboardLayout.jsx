import styled from "styled-components";
import { useCurrentStays } from "./useCurrentStays";
import { useCurrentBookings } from "./useCurrentBookins";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { isLoading: isLoading1, stays, confirmedStays } = useCurrentStays();
  const { isLoading: isLoading2, bookings } = useCurrentBookings();

  if (isLoading1 || isLoading2) return <Spinner />;

  console.log(confirmedStays);

  return (
    <StyledDashboardLayout>
      <div>Stadistics</div>
      <div>Todays activity</div>
      <div>Chart stay duration</div>
      <div>chart of sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
