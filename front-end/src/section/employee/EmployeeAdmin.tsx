import { useEffect, useState } from "react";
import TableEmployee from "./TableEmployee";
import { IEmployeeModel } from "../../models/EmployeeModel";
import { getEmployee } from "../../services/employeeService";
import SearchIcon from "@rsuite/icons/Search";
import { Button, Input, InputGroup } from "rsuite";
import { useAppDispatch } from "../../store/store";
import { setLoading } from "../../store/reducer/reducer";
import ModalCreateUpdateEmployee from "./ModalCreateUpdateEmployee";

const EmployeeAdmin = () => {
  const dispatch = useAppDispatch();

  const [empLst, setEmpLst] = useState<IEmployeeModel[]>([]);

  const getEmpLst = async () => {
    dispatch(setLoading(true));
    let data = await getEmployee();

    if (data) {
      data = data.sort((p, n) => (n.role ?? 0) - (p.role ?? 0));
    }
    setEmpLst(data ?? []);
    setEmpLstFilter(data ?? []);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getEmpLst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [empLstFilter, setEmpLstFilter] = useState(empLst);
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

  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [empUpdate, setEmpUpdate] = useState<IEmployeeModel | null>(null);

  const setItemUpdate = (item: IEmployeeModel) => {
    setVisibleUpdate(true);
    setEmpUpdate(item);
  };

  const openCreateModal = () => {
    setVisibleUpdate(true);
    setEmpUpdate(null);
  };

  return (
    <>
      <ModalCreateUpdateEmployee
        item={empUpdate}
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        getEmployee={getEmpLst}
      />

      <div>
        <h1 className="text-3xl p-6 mb-2">Manage Employee</h1>

        <div className="w-full flex px-6 mb-8">
          <div className="flex-1">
            <p className="text-xl">
              <span className="font-bold">Total:</span> {empLst.length} Employee
              {empLst.length > 0 ? "s" : ""}
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <div>
              <Button appearance="ghost" onClick={openCreateModal}>
                + Create Employee
              </Button>
            </div>

            <div>
              <InputGroup inside className="w-full">
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={onSearchChange}
                />
              </InputGroup>
            </div>
          </div>
        </div>
      </div>

      <TableEmployee
        empLst={empLstFilter}
        getEmployee={getEmpLst}
        setEmpUpdate={setItemUpdate}
      />
    </>
  );
};

export default EmployeeAdmin;
