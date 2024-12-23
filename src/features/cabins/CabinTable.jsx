import { useGetCabins } from "./useGetCabins";
import { useSearchParams } from "react-router-dom";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, getLoading } = useGetCabins();
  const [searchParams] = useSearchParams();

  if (!cabins?.length) return <Empty resourceName="cabins" />;

  //1.filter
  const filterValue = searchParams.get("discount") || "all";
  let filterCabins;

  if (filterValue === "all") filterCabins = cabins;
  if (filterValue === "no-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  //2.sortBy
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [feild, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins?.sort(
    (a, b) => (a[feild] - b[feild]) * modifier
  );

  if (getLoading) return <Spinner />;
  if (!cabins) return;

  return (
    <Menus>
      <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={cabins}
          // data={filterCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
