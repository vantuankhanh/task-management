import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button, DatePicker, Input, Modal, SelectPicker } from "rsuite";
import { useRole, useUser } from "../../hooks/use-user";
import { IEmployeeModel } from "../../models/EmployeeModel";
import { ITaskModel } from "../../models/TaskModel";
import { createTask, updateTask } from "../../services/taskService";
import { setLoading } from "../../store/reducer/reducer";
import { useAppDispatch } from "../../store/store";

interface IModalCreateUpdateTaskProps {
  empList: IEmployeeModel[];
  visible: boolean;
  setVisible: (value: React.SetStateAction<boolean>) => void;
  item: ITaskModel | null;
  getTask: () => Promise<void>;
}

const ModalCreateUpdateTask = ({
  empList,
  visible,
  setVisible,
  item,
  getTask,
}: IModalCreateUpdateTaskProps) => {
  const user = useUser();
  const role = useRole();
  const dispatch = useAppDispatch();

  const [empId, setEmpId] = useState<string | null>(null);
  const [status, setStatus] = useState(0);
  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const loadInfo = () => {
    if (contentRef.current) {
      if (item) {
        setEmpId(item.employeeId);
        setStatus(item.status);
        setDateStart(new Date(item.dateStart));
        setDateEnd(new Date(item.dateEnd));
        contentRef.current.value = item.content;
      }
    }
  };

  const handleUpdate = async () => {
    if (!empId) {
      toast.error("Required employee for the task");
      return;
    }
    if (contentRef.current && !contentRef.current.value) {
      toast.error("Required content for the task");
      return;
    }

    setVisible(false);
    dispatch(setLoading(true));
    let data;
    if (item) {
      data = await updateTask({
        id: item.id,
        employeeId: empId,
        content: contentRef.current!.value,
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.toISOString(),
        status,
        lastUpdatedBy: user!.id,
      });
    } else {
      data = await createTask({
        employeeId: empId,
        content: contentRef.current!.value,
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.toISOString(),
        status,
        lastUpdatedBy: user!.id,
      });
    }
    dispatch(setLoading(false));

    if (data) {
      await getTask();
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
        <Modal.Title>{item !== null ? "Update" : "Create"} Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 w-full flex-col lg:flex-row">
            <div className="w-full lg:w-6/12 flex flex-col gap-4">
              <div>
                <p className="font-bold mb-2 pl-2">Employee</p>
                <SelectPicker
                  className="w-full"
                  data={empList.map((emp) => ({
                    label: emp.email,
                    value: emp.id,
                  }))}
                  value={empId}
                  onChange={(e) => setEmpId(e!)}
                  cleanable={false}
                  placeholder="Employee Email"
                />
              </div>

              <div>
                <p className="font-bold mb-2 pl-2">Status</p>
                <SelectPicker
                  className="w-full"
                  data={[
                    {
                      label: "Not done",
                      value: 0,
                    },
                    {
                      label: "Done",
                      value: 1,
                    },
                  ]}
                  value={status}
                  onChange={(e) => setStatus(e!)}
                  cleanable={false}
                  searchable={false}
                  disabled={
                    (item && role !== 0 && user?.id !== item.employeeId) ?? true
                  }
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div>
                <p className="font-bold mb-2 pl-2">Date Start</p>
                <DatePicker
                  className="w-full"
                  format="MM/dd/yyyy"
                  cleanable={false}
                  value={dateStart}
                  onChange={(value) => {
                    setDateStart(value!);
                    if (value! > dateEnd) setDateEnd(value!);
                  }}
                />
              </div>

              <div>
                <p className="font-bold mb-2 pl-2">Date End</p>
                <DatePicker
                  className="w-full"
                  format="MM/dd/yyyy"
                  cleanable={false}
                  value={dateEnd}
                  onChange={(value) => setDateEnd(value!)}
                  shouldDisableDate={(date) => date < dateStart}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold mb-2 pl-2">Content</p>
            <Input
              ref={contentRef}
              as="textarea"
              rows={5}
              placeholder="Detail of task..."
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

export default ModalCreateUpdateTask;
