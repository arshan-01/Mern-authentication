// src/routes/AppRouter.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/page-login';
import Register from '../pages/auth/page-register';
import ForgotPassword from '../pages/auth/forget-passowrd';
import EmailVerification from '../pages/auth/email-verification';
import ResetPassword from '../pages/auth/reset-password';


function AppRouter() {
  return (
    <Routes>
      <Route path="/enter" element={<Login />} />
      
      {/* Auth Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/enter/new-user" element={<Register/>} />
      <Route path="/enter/forgot-password" element={<ForgotPassword />} />
      <Route path={`/enter/verify-email/:token/:id`} element={<EmailVerification />} />
      <Route path={`/enter/reset-password/:token`} element={<ResetPassword />} />

    </Routes>
  );
}

export default AppRouter;
