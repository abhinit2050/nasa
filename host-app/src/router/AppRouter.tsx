import {  Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Apod from "../pages/Apod";
import Mars from "../pages/Mars";
import MainLayout from "../layout/MainLayout";

export default function AppRouter() {
  return (
   
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/apod" element={<Apod />} />
          <Route path="/mars" element={<Mars />} />
        </Route>
      </Routes>
   
  );
}


// <BrowserRouter>
//   <Routes>

//     {/* Public */}
//     <Route element={<MainLayout />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/apod" element={<Apod />} />
//       <Route path="/mars" element={<Mars />} />
//     </Route>

//     {/* Auth */}
//     <Route path="/login" element={<Login />} />

//     {/* User Protected */}
//     <Route
//       path="/collections"
//       element={
//         <ProtectedRoute>
//           <Collections />
//         </ProtectedRoute>
//       }
//     />

//     {/* Admin */}
//     <Route
//       path="/admin"
//       element={
//         <AdminRoute>
//           <AdminDashboard />
//         </AdminRoute>
//       }
//     />

//   </Routes>
// </BrowserRouter>