import type { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
