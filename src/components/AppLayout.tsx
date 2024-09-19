import { ReactNode } from "react";
import Header from "@/components/UI/Header";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <Header />
      <main className="p-6">{children}</main>
    </div>
  );
};
