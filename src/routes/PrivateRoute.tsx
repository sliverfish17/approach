import { Loader } from "@/components/Loader";
import { auth } from "@/firebase";
import { PAGES } from "@/types/Pages";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate(PAGES.SIGN_IN);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
