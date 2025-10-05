import type { ReactNode } from "react";
import "./layout.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <div className="root-container">{children}</div>;
}
