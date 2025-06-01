import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo = "/login", allowedRoles }) => {
  const { isLogin, isAuthChecked, role } = useSelector(
    (state) => state.authSlice
  );

  if (!isAuthChecked) {
    return <div>Yükleniyor...</div>; // ya da loading spinner bile olabilir
  }

  if (!isLogin) {
    return <Navigate to={redirectTo} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
