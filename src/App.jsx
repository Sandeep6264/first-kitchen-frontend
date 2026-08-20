// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './common/NavBar/NavBar';
import Login from './common/Login/Login';
import Signup from './common/SignUp/Signup';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Offers from './pages/Offers/Offers';
import RestaurantDetail from './pages/RestaurantDetail/RestaurantDetail';
import MyOrders from './pages/MyOrders/MyOrders';
import LiveTracking from './pages/LiveTracking/LiveTracking';
import { useAuth } from './context/AuthContext';
import Loader from './common/Loader/Loader';
import Checkout from './pages/Checkout/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from './AuthGuard';
import PaymentComponent from './pages/PaymentComponent/PaymentComponent';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import UserManagement from './pages/Admin/UserManagement/UserManagement';
import AdminLayout from './pages/Admin/AdminLayout';
import ForgetPassword from './common/ForgetPassword/ForgetPassword';
import ResetPassword from './common/ResetPassword/ResetPassword';

// Define your routes here (outside component)
const router = [
  {
    // Add unauthenticated routes here
    name: "Unauthenticated",
    routes: [
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgetPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/signup", element: <Signup /> },
      // { path="/forgot-password", element: <ForgetPassword /> }, // Placeholder for forgot password page
      { path: "*", element: <Login /> }// redirect unknown to login
      // { path: "/signup", element: <PaymentComponent /> },
    ]
  },
  {
    // Add authenticated routes here
    name: "Authenticated",
    routes: [
      { path: "/home", element: <AuthGuard><Home /></AuthGuard> },
      { path: "/cart", element: <AuthGuard><Cart /></AuthGuard> },
      { path: "/myorders", element: <AuthGuard><MyOrders /></AuthGuard> },
      { path: "/offers", element: <AuthGuard><Offers /></AuthGuard> },
      { path: "/checkout", element: <AuthGuard><Checkout /></AuthGuard> },
      { path: "/payment", element: <AuthGuard><PaymentComponent /></AuthGuard> },
      { path: "/restaurant/:id", element: <AuthGuard><RestaurantDetail /></AuthGuard> },
      // { path: "/restaurant", element: <AuthGuard><UserManagement /></AuthGuard> },
      // { path: "/usermanagement", element: <AuthGuard><UserManagement /></AuthGuard> },
      {
        path: "/usermanagement/*",
        element: (
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        )
      },

      // { path: "/livetracking", element: <AuthGuard><LiveTracking /></AuthGuard> },
      { path: "/livetracking", element: <AuthGuard><Dashboard /></AuthGuard> },

      { path: "*", element: <Home /> } // redirect unknown to home

    ]
  }
];

// Layout component with NavBar and Routes
function Layout() {
  return (
    <>
      {/* Global NavBar */}
      <NavBar />
      {/* Main content area */}
      <main>
        {/* Define Routes */}
        <Routes>
          {router.map((group) =>
            group.routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))
          )}
        </Routes>
      </main>
      <ToastContainer newestOnTop />
    </>
  );
}

// Main App component with Router
function App() {
  const { ...context } = useAuth();

  return (
    <>
      {context.loader && <Loader />}
      < Router basename="/firstKitchen/" > {/* Change this when deploying */}
        < Layout />
      </Router >
    </>
  );
}

export default App;