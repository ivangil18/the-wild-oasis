import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="add-cabin">
        <Button>Add Cabin</Button>
      </Modal.Open>
      <Modal.Window name="add-cabin">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens="cabin-table">
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name="cabin-table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
