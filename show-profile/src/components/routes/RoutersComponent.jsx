import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProviderContext } from "../context/Context";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Profile } from "../pages/Profile";
import { ProfileEdit } from "../pages/ProfileEdit";
import { Banner } from "../pages/Banner";
import { Layout } from "../pages/navbar/Layout";
import { NotFound } from "../pages/404/NotFound";
import { ResetPassword } from "../pages/ResetPassword";
import { ResetPasswordEmail } from "../pages/ResetPasswordEmail";

export const RoutersComponent = () => {
  return (
    <BrowserRouter>
      <ProviderContext>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="profile/edit/:name/:phone"
            element={
              <Layout>
                <ProfileEdit />
              </Layout>
            }
          />
          <Route
            path="banner"
            element={
              <Layout>
                <Banner />
              </Layout>
            }
          ></Route>
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          ></Route>
          <Route
            path="profile/reset-password/:email"
            element={
              <Layout>
                <ResetPassword />
              </Layout>
            }
          ></Route>
          <Route
            path="profile/confirm-reset"
            element={
              <Layout>
                <ResetPasswordEmail />
              </Layout>
            }
          ></Route>
        </Routes>
      </ProviderContext>
    </BrowserRouter>
  );
};
