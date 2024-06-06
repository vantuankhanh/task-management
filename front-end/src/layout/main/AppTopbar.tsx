import { useUser } from "../../hooks/use-user";
import Logo from "../../assets/logo.png";

const AppTopbar = () => {
  const user = useUser();

  return (
    <div className="topbar">
      <div className="flex gap-7 items-center">
        <img className="h-10" src={Logo} alt="Logo" />
        <h1 className="text-3xl">TASK MANAGER</h1>
      </div>

      <div className="p-2 flex gap-3 items-center cursor-pointer">
        <div
          className="text-white rounded-full inline-flex items-center justify-center w-8 h-8"
          style={{ backgroundColor: "#2196F3" }}
        >
          <p>{user?.email.slice(0, 1)}</p>
        </div>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default AppTopbar;
