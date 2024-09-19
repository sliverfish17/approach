import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { PAGES } from "@/types/Pages";
import { AppLayout } from "@/components/AppLayout";
import { PublicRoute } from "@/routes/PublicRoute";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { lazy, Suspense } from "react";
import { Loader } from "@/components/UI/Loader";

const Login = lazy(() => import("@/pages/Login"));
const Registration = lazy(() => import("@/pages/Registration"));
const Home = lazy(() => import("@/pages/Home"));

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

const privatePages = [
  {
    path: PAGES.HOME,
    component: Home,
  },
];

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppLayout>
          <Toaster />
          <Suspense fallback={<Loader />}>
            <Routes>
              {publicPages.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<PublicRoute component={route.component} />}
                />
              ))}
              {privatePages.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<PrivateRoute component={route.component} />}
                />
              ))}

              <Route path="*" element={<Navigate replace to={PAGES.HOME} />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
