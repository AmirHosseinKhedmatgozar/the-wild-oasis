/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, getLoading } = useCheckout();

  return (
    <Button
      variation="primary"
      size="little"
      onClick={() => checkout(bookingId)}
      disabled={getLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
