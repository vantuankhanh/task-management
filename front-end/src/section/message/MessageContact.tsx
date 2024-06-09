import React, { useEffect, useState } from "react";
import { IEmployeeModel } from "../../models/EmployeeModel";
import { useAppDispatch } from "../../store/store";
import { getEmployee } from "../../services/employeeService";
import { setLoading } from "../../store/reducer/reducer";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { useUser } from "../../hooks/use-user";

interface IMessageContactProps {
  setCurrentChat: (value: React.SetStateAction<IEmployeeModel | null>) => void;
}

const MessageContact = ({ setCurrentChat }: IMessageContactProps) => {
  const dispatch = useAppDispatch();
  const user = useUser();

  const [empLst, setEmpLst] = useState<IEmployeeModel[]>([]);
  const [empLstFilter, setEmpLstFilter] = useState<IEmployeeModel[]>([]);

  const getEmpLst = async () => {
    dispatch(setLoading(true));
    const data = await getEmployee();
    const d = data.filter((emp) => emp.id !== user?.id);
    setEmpLst(d ?? []);
    setEmpLstFilter(d ?? []);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getEmpLst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentEmployee, setCurrentEmployee] = useState<number | null>(null);
  const onEmployeeSelect = (employee: IEmployeeModel, index: number) => () => {
    if (currentEmployee !== index) {
      setCurrentEmployee(index);
      setCurrentChat(employee);
    }
  };

  const [search, setSearch] = useState("");
  const onSearchChange = (e: string) => {
    setSearch(e);
    if (e) {
      setEmpLstFilter(
        empLst.filter((emp) => emp.email.includes(e) || emp.name.includes(e))
      );
    } else {
      setEmpLstFilter(empLst);
    }
  };

  return (
    <div className="h-full w-3/12">
      <InputGroup inside className="w-full h-9 mb-4">
        <InputGroup.Button>
          <SearchIcon />
        </InputGroup.Button>
        <Input
          placeholder="Search..."
          value={search}
          onChange={onSearchChange}
        />
      </InputGroup>

      <div className="message-user-list">
        {empLstFilter.map((e, i) => (
          <div
            key={e.id ?? "" + i}
            className={`message-user-card ${
              currentEmployee === i ? "bg-blue-600 text-white" : ""
            }`}
            onClick={onEmployeeSelect(e, i)}
          >
            <p className="text-lg font-bold overflow-ellipsis overflow-hidden">
              {e.email}
            </p>
            <p>{e.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageContact;
