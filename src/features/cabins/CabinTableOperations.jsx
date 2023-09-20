import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CabinTableOperations() {
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "No discount", value: "no-discount" },
    { label: "With discount", value: "with-discount" },
  ];
  return (
    <TableOperations>
      <Filter param="discount" options={filterOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;
