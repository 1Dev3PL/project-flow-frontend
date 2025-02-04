import { BrowserRouter, Route, Routes } from "react-router";
import { SignUpPage } from "pages/signUp";
import { SignInPage } from "pages/login";
import { AppLayout } from "app/layout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<SignInPage />} />
        <Route element={<AppLayout />}>
          <Route path={"/"} element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
