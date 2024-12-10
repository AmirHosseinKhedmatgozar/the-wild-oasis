import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useChecking";
import { useGetSettings } from "../settings/useGetSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirm, setConfirm] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const moveBack = useMoveBack();

  const { checkin, getLoading: checkinLoading } = useChecking();
  const { booking = {}, getLoading } = useGetBooking();
  const { settings = {}, settingsLoading } = useGetSettings();
  const {
    id: bookingId,
    guest,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNight,
  } = booking;
  const optionalBreackfastPrice =
    settings.breackfastPrice * numNight * numGuests;

  useEffect(() => {
    setConfirm(booking.isPaid);
  }, [booking.isPaid]);

  function handleCheckin() {
    if (!confirm) return;
    if (!breakfast) {
      checkin({ bookingId, breakfast: {} });
    } else {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreackfastPrice,
          totalPrice: totalPrice + optionalBreackfastPrice,
        },
      });
    }
  }

  if ((getLoading, settingsLoading)) return <Spinner />;

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
            checked={breakfast}
            onChange={() => {
              setBreakfast((add) => !add);
              setConfirm(false);
            }}
            id="breakfast"
          >
            want to add breakfast for {formatCurrency(optionalBreackfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirm}
          onChange={() => setConfirm((c) => !c)}
          disabled={confirm || checkinLoading}
          id="confirm"
        >
          I Confirm that {guest?.fullName} has paid the total amount of{" "}
          {!breakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreackfastPrice)} (${
                formatCurrency(totalPrice) +
                formatCurrency(optionalBreackfastPrice)
              })`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirm || checkinLoading} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
