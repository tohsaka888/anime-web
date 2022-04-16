import { createContext } from "react";

type BreakpointContextProps = {
  breakpoint: number;
  size: string;
};

export const BreakpointContext = createContext<BreakpointContextProps | null>(
  null
);
