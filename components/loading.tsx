import { Infinity } from "ldrs/react";
import "ldrs/react/Infinity.css";

type LoadingProps = {
  size?: number | string;
};

function Loading({ size }: LoadingProps) {
  return (
    <div>
      <Infinity
        size={size}
        stroke="4"
        strokeLength="0.15"
        bgOpacity="0.1"
        speed="1.3"
        color="black"
      />
    </div>
  );
}

export default Loading;
