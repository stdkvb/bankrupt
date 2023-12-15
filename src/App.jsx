import * as React from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Auth from "./pages/Auth";
import Reg from "./pages/Reg";

export default function App() {
  return <AuthLayout children={<Reg />} />;
}
