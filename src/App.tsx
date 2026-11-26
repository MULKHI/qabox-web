import { useEffect, useMemo, useState } from "react";
import { readUser, type User } from "./lib/auth";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { DocsPage } from "./pages/DocsPage";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [user, setUser] = useState<User | null>(readUser);

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  const signOut = () => {
    localStorage.removeItem("qabox_token");
    localStorage.removeItem("qabox_user");
    setUser(null);
    window.history.pushState({}, "", "/");
    setPath("/");
  };

  useEffect(() => {
    if (path === "/dashboard" && !localStorage.getItem("qabox_token")) {
      window.history.replaceState({}, "", "/sign-in");
      setPath("/sign-in");
    } else if (path === "/dashboard") setUser(readUser());
  }, [path]);

  return useMemo(() => {
    if (path === "/pricing") return <PricingPage />;
    if (path === "/docs") return <DocsPage />;
    if (path === "/sign-in") return <AuthPage key="login" mode="login" />;
    if (path === "/sign-up") return <AuthPage key="register" mode="register" />;
    if (path === "/dashboard") return <DashboardPage user={user} signOut={signOut} />;
    return <HomePage />;
  }, [path, user]);
}
