import { ComponentType, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "@/firebase";
import { PAGES } from "@/types/Pages";
import { Loader } from "@/components/UI/Loader";

interface PublicRouteProps {
  component: ComponentType;
}

export const PublicRoute = ({ component: Component }: PublicRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return isAuthenticated ? <Navigate to={PAGES.HOME} /> : <Component />;
};
