import { memo } from "react";
import { useAppSelector } from "../../store/store";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";

const Loading = memo(() => {
  const { isLoading } = useAppSelector((s) => s.loadingStore);

  return (
    <div
      className={`h-screen w-screen ${
        isLoading ? "fixed top-0 left-0 bg-gray-300 opacity-50" : "hidden"
      }`}
      style={{ zIndex: 9999 }}
    >
      <div className="h-full w-full gap-3 box-center">
        <SpinnerIcon pulse style={{ fontSize: "1.5em" }} />
        <p className="text-lg font-bold">Loading...</p>
      </div>
    </div>
  );
});

export default Loading;
