import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CabinTableOprations() {
  return (
    <TableOperations>
      <Filter
        options={[
          { value: "all", lable: "All" },
          { value: "no-discount", lable: "No discount" },
          { value: "with-discount", lable: "with discount" },
        ]}
        filterFeild="discount"
      />
      <SortBy
        options={[
          { value: "name-asc", lable: "sort by NAME (A-Z)" },
          { value: "name-desc", lable: "sort by NAME (Z-A)" },
          { value: "regularPrice-asc", lable: "sort by PRICE (high first)" },
          { value: "regularPrice-desc", lable: "sort by PRICE (low first)" },
          { value: "maxCapacity-asc", lable: "sort by CAPACITY (high first)" },
          { value: "maxCapacity-desc", lable: "sort by CAPACITY (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOprations;
