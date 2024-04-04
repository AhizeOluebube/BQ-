import { Navigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!token) {
  //     toast.error("You have to sign first", {
  //       id: "unique",
  //     });
  //     setLoading(false);
  //     return;
  //   }

  //   const validateUser = async () => {
  //     await handleGetUser();
  //     setLoading(false);
  //   };

  //   validateUser();
  // }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // return token ? <Outlet /> : <Navigate to="/signin" />;
  return token ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
