// import React from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Programs from './pages/Programs';
// import Blogs from './pages/Blogs';
// import Error from './pages/Error';
// import Connect from './pages/Connect';
// import BlogPost from './components/BlogPost';
// import Company from './pages/Company';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import ChatSupport from './components/ChatSupport';
// import { ToastContainer } from 'react-toastify';
// import ScrollToTop from './pages/ScrollToTop';
// import AdminDashboard from './components/admin/AdminDashboard';

// const AppRoutes = () => {
//   const location = useLocation();
//   const hideLayoutRoutes = ['/adminzone'];
//   const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

//   return (
//     <>
//       <ScrollToTop />
//       {!shouldHideLayout && <NavBar />}
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<Company />} />
//         <Route path="/programs" element={<Programs />} />
//         <Route path="/blogs" element={<Blogs />} />
//         <Route path="/post" element={<BlogPost />} />
//         <Route path="/connect" element={<Connect />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/adminzone" element={<AdminDashboard />} />
//         <Route path="*" element={<Error />} />
//       </Routes>
//       {!shouldHideLayout && <ChatSupport />}
//       {!shouldHideLayout && <Footer />}
//     </>
//   );
// };

// export default AppRoutes;
