import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { logoutUser } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { PAGES } from "@/types/Pages";
import toast from "react-hot-toast";
import { Button } from "./Button";

export const Header = () => {
  const [user, setUser] = useState<null | { email: string }>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ email: user.email || "" });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    toast.success("You successfully logged out");
    navigate(PAGES.SIGN_IN);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <h1 className="text-xl font-bold">Kolotenko</h1>
      <div>
        {user ? (
          <div className="flex items-center">
            <span className="mr-4">{user.email}</span>
            <Button color="red" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => navigate(PAGES.SIGN_IN)} color="red">
              Login
            </Button>
            <Button color="blue" onClick={() => navigate(PAGES.SIGN_UP)}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
