import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import PrivateRoute from "@/routes/PrivateRoute";
import { PAGES } from "@/types/Pages";
import Registration from "@/pages/Registration";
import { AppLayout } from "@/components/AppLayout";
import { PublicRoute } from "@/routes/PublicRoute";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

const publicPages = [
  {
    path: PAGES.SIGN_IN,
    component: Login,
  },
  {
    path: PAGES.SIGN_UP,
    component: Registration,
  },
];

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppLayout>
          <Toaster />
          <Routes>
            {publicPages.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<PublicRoute component={route.component} />}
              />
            ))}
            <Route
              path={PAGES.HOME}
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate replace to={PAGES.HOME} />} />
          </Routes>
        </AppLayout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
