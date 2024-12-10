/* eslint-disable react/prop-types */
import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

// const Guest = styled.div`
//   font-weight: 500;
// `;

function TodayItem({ activity }) {
  const { status, id, numNight, guest } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">deporting</Tag>}
      <Flag src={guest.coutryFlag} alt={`flag of ${guest.fullName}`} />
      <div>{numNight} nights</div>
      {status === "unconfirmed" && (
        <Button size="little" as={Link} to={`/checkin/${id}`}>
          check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;