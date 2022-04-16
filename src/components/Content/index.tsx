import React, { useContext } from "react";
import { BreakpointContext } from "../../Context/BreakpointContext";
import './index.less'

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

function Content({ children, ...props }: Props) {
  const { size } = useContext(BreakpointContext);
  return (
    <div className={`${size}-content-container`} {...props}>
      <div className={``}>{children}</div>
    </div>
  );
}

export default Content;
