import { Navigate } from 'react-router-dom';

const RiderRoute = ({ children }) => {
  const isRiderAuthenticated = localStorage.getItem('currentRider') !== null;
  
  if (!isRiderAuthenticated) {
    return <Navigate to="/rider-login" replace />;
  }

  return children;
};

export default RiderRoute;