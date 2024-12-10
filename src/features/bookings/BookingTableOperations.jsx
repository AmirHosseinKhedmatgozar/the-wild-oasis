import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterFeild="status"
        options={[
          { value: "all", lable: "All" },
          { value: "checked-out", lable: "Checked out" },
          { value: "checked-in", lable: "Checked in" },
          { value: "unconfirmed", lable: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", lable: "Sort by date (recent first)" },
          { value: "startDate-asc", lable: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            lable: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", lable: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
