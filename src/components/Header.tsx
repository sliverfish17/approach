import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { logoutUser } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { PAGES } from "@/types/Pages";
import toast from "react-hot-toast";

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
      <h1 className="text-xl font-bold">MyApp</h1>
      <div>
        {user ? (
          <div className="flex items-center">
            <span className="mr-4">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => navigate(PAGES.SIGN_IN)}
              className="bg-blue-500 text-white p-2 mr-2 rounded"
            >
              Login
            </button>
            <button
              onClick={() => navigate(PAGES.SIGN_UP)}
              className="bg-green-500 text-white p-2 rounded"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
