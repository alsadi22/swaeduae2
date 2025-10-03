import React from 'react';
import { Navigate } from 'react-router-dom';

// Simple redirect component without using useAuth
export default function Login() {
  return <Navigate to="/auth/login" replace />;
}