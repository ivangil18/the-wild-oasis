import { createContext, useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export const CabinContext = createContext();

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div>
      <CabinContext.Provider value={{ closeModal }}>
        <Button onClick={() => setIsOpenModal((showForm) => !showForm)}>
          Add new cabin
        </Button>
        {isOpenModal && (
          <Modal>
            <CreateCabinForm />
          </Modal>
        )}
      </CabinContext.Provider>
    </div>
  );
}

export default AddCabin;
