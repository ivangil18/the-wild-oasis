import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useCheckin } from "../check-in-out/useCheckin";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const { isCheckingIn, checkin } = useCheckin();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  // ME QUEDE POR AQUI, FIGURING OUT WHEN TO INCLUDE BREAKFAST AND HOW TO CALCULATE IT!!!

  const breakfastCost = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (addBreakfast) {
      console.log("entraqui");
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastCost,
          totalPrice: totalPrice + breakfastCost,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  function handleBreakfast() {
    console.log(breakfastCost);
    setAddBreakfast(!addBreakfast);
    setConfirmPaid(false);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => handleBreakfast()}
          >
            {guests.fullName} wants to buy breakfast for{" "}
            {formatCurrency(breakfastCost)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          disabled={confirmPaid}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {addBreakfast
            ? `${formatCurrency(totalPrice + breakfastCost)} (${formatCurrency(
                totalPrice
              )} + ${formatCurrency(breakfastCost)})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
