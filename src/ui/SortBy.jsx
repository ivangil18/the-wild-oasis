import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";

function SortBy({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentSortOption = searchParam.get("sortBy") || "";

  function handleChange(e) {
    searchParam.set("sortBy", e.target.value);
    setSearchParam(searchParam);
  }

  return (
    <Select
      options={options}
      $type="white"
      onChange={handleChange}
      value={currentSortOption}
    ></Select>
  );
}

export default SortBy;
