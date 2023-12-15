import * as React from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Auth from "./pages/Auth";
import Reg from "./pages/Reg";
import PasswordRecovery from "./pages/PasswordRecovery";
import NewPassword from "./pages/NewPassword";

export default function App() {
  return <MainLayout children={<NewPassword />} />;
}
