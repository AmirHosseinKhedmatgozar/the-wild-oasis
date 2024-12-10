/* eslint-disable react/prop-types */
import { HiOutlineBriefcase } from "react-icons/hi";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //1.number of all booking
  const numBookings = bookings.length;
  //2.sum all sales
  const salse = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  //3.checkin
  const checkin = confirmedStays.length;
  //4.occupation
  const occupation = confirmedStays.reduce((acc, cur) => {
    return acc + cur.numNight;
  }, 0);
  const occ = occupation / (numDays * cabinCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={salse}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="check in"
        value={checkin}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="occupancy"
        value={Math.round(occ * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
