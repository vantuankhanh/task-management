import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../store/store";
import {
  Button,
  Input,
  InputGroup,
  Modal,
  SelectPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import { IEmployeeModel } from "../../models/EmployeeModel";
import { toast } from "react-toastify";
import { setLoading } from "../../store/reducer/reducer";
import { createEmployee, updateEmployee } from "../../services/employeeService";

interface IModalCreateUpdateEmployeeProps {
  visible: boolean;
  setVisible: (value: React.SetStateAction<boolean>) => void;
  item: IEmployeeModel | null;
  getEmployee: () => Promise<void>;
}

const ModalCreateUpdateEmployee = ({
  visible,
  setVisible,
  item,
  getEmployee,
}: IModalCreateUpdateEmployeeProps) => {
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const [role, setRole] = useState<number>(0);

  const loadInfo = () => {
    if (
      nameRef.current &&
      emailRef.current &&
      phoneRef.current &&
      addressRef.current
    ) {
      if (item) {
        nameRef.current.value = item.name;
        emailRef.current.value = item.email;
        phoneRef.current.value = item.phoneNumber.replace("+", "");
        addressRef.current.value = item.address ?? "";
        setRole(item.role ?? 0);
      }
    }
  };

  const handleUpdate = async () => {
    if (nameRef.current && nameRef.current.value === "") {
      toast.error("Required name of employee");
      return;
    }
    if (emailRef.current && emailRef.current.value === "") {
      toast.error("Required email of employee");
      return;
    }
    if (
      emailRef.current &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        emailRef.current.value
      )
    ) {
      toast.error("Please input a valid email address");
      return;
    }
    if (phoneRef.current && phoneRef.current.value === "") {
      toast.error("Required phone of employee");
      return;
    }
    if (phoneRef.current && !/^\d+$/.test(phoneRef.current.value)) {
      toast.error("Phone number has to be number");
      return;
    }
    if (role !== 0 && role !== 1) {
      toast.error("Select a role");
      return;
    }

    dispatch(setLoading(true));
    let data;
    if (item) {
      data = await updateEmployee({
        id: item.id,
        name: nameRef.current!.value,
        email: emailRef.current!.value,
        phoneNumber: "+" + phoneRef.current!.value,
        address: addressRef.current!.value,
        role,
      });
    } else {
      data = await createEmployee({
        name: nameRef.current!.value,
        email: emailRef.current!.value,
        phoneNumber: "+" + phoneRef.current!.value,
        address: addressRef.current!.value,
        role,
      });
    }
    dispatch(setLoading(false));

    if (data) {
      setVisible(false);
      await getEmployee();
    }
  };

  return (
    <Modal
      size="md"
      open={visible}
      onClose={() => setVisible(false)}
      onEntering={loadInfo}
    >
      <Modal.Header>
        <Modal.Title>
          {item !== null ? "Update" : "Create"} Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 w-full flex-col lg:flex-row">
            <div className="w-full lg:w-6/12 flex flex-col gap-4">
              <div>
                <p className="font-bold mb-2 pl-2">Name</p>
                <Input
                  ref={nameRef}
                  placeholder="Name"
                  className="w-full"
                  autoComplete="name"
                />
              </div>

              <div>
                <p className="font-bold mb-2 pl-2">Email Address</p>
                <Input
                  ref={emailRef}
                  placeholder="Email Address"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div>
                <p className="font-bold mb-2 pl-2">Phone Number</p>
                <Whisper
                  placement="bottom"
                  speaker={
                    <Tooltip>Please input your phone with country code</Tooltip>
                  }
                >
                  <InputGroup inside>
                    <InputGroup.Addon>+</InputGroup.Addon>
                    <Input
                      ref={phoneRef}
                      placeholder="Phone Number"
                      className="w-full"
                      autoComplete="off"
                    />
                  </InputGroup>
                </Whisper>
              </div>

              <div>
                <p className="font-bold mb-2 pl-2">Role</p>
                <SelectPicker
                  className="w-full"
                  data={[
                    { label: "Employee", value: 0 },
                    { label: "Owner", value: 1 },
                  ]}
                  searchable={false}
                  placeholder="Select role"
                  cleanable={false}
                  value={role}
                  onChange={(e) => setRole(e!)}
                  disabled={(item && (item.role ?? 0) > 0) ?? undefined}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold mb-2 pl-2">Address</p>
            <Input
              ref={addressRef}
              as="textarea"
              rows={2}
              placeholder="Address"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdate} appearance="primary">
          {item ? "Update" : "Create"}
        </Button>
        <Button onClick={() => setVisible(false)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateUpdateEmployee;
