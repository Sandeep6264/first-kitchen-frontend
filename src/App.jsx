// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './common/NavBar/NavBar';
import Login from './common/Login/Login';
import Signup from './common/Signup/Signup';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Offers from './pages/Offers/Offers';
import RestaurantDetail from './pages/RestaurantDetail/RestaurantDetail';
import MyOrders from './pages/MyOrders/MyOrders';
import LiveTracking from './pages/LiveTracking/LiveTracking';
import { useAuth } from './context/AuthContext';
import Loader from './common/Loader/Loader';

// Define your routes here (outside component)
const router = [
  {
    // Add unauthenticated routes here
    name: "Unauthenticated",
    routes: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "*", element: <Login /> } // redirect unknown to login
    ]
  },
  {
    // Add authenticated routes here
    name: "Authenticated",
    routes: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/myorders", element: <MyOrders /> },
      { path: "/offers", element: <Offers /> },
      { path: "/restaurant/:id", element: <RestaurantDetail /> },
      { path: "/livetracking", element: <LiveTracking /> },
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