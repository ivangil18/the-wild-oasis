import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

import CabinRow from "./CabinRow";

import { useReadCabins } from "./useReadCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useReadCabins();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("discount") || "all";

  if (isLoading) return <Spinner />;

  let filteredCabins;
  if (filter === "all") filteredCabins = cabins;
  if (filter === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filter === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  return (
    <Menus>
      <Table $columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
