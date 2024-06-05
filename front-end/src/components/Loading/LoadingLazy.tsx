import { memo } from "react";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";

const LoadingLazy = memo(() => {
  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 bg-gray-300 opacity-50"
      style={{ zIndex: 999 }}
    >
      <div className="h-full w-full gap-3 box-center">
        <SpinnerIcon pulse style={{ fontSize: "1.5em" }} />
        <p className="text-lg font-bold">Loading...</p>
      </div>
    </div>
  );
});

export default LoadingLazy;
