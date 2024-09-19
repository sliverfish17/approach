import { ComponentType, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "@/firebase";
import { PAGES } from "@/types/Pages";
import { Loader } from "@/components/UI/Loader";

interface PrivateRouteProps {
  component: ComponentType;
}

export const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
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

  return !isAuthenticated ? <Navigate to={PAGES.SIGN_IN} /> : <Component />;
};
