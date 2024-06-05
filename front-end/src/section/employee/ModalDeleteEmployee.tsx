import React from "react";
import { Button, Modal } from "rsuite";
import { useAppDispatch } from "../../store/store";
import { setLoading } from "../../store/reducer/reducer";
import { deleteEmployee } from "../../services/employeeService";

interface IModalDeleteEmployeeProps {
  idDelete: string | null;
  setIdDelete: (value: React.SetStateAction<string | null>) => void;
  getEmployee: () => Promise<void>;
}

const ModalDeleteEmployee = ({
  idDelete,
  setIdDelete,
  getEmployee,
}: IModalDeleteEmployeeProps) => {
  const dispatch = useAppDispatch();

  const onDelete = async () => {
    if (idDelete) {
      setIdDelete(null);
      dispatch(setLoading(true));

      const data = await deleteEmployee(idDelete);

      dispatch(setLoading(false));

      if (data) {
        await getEmployee();
      }
    }
  };

  return (
    <Modal size="xs" open={idDelete !== null} onClose={() => setIdDelete(null)}>
      <Modal.Header>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to delete this employee?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onDelete} appearance="primary">
          Ok
        </Button>
        <Button onClick={() => setIdDelete(null)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteEmployee;
