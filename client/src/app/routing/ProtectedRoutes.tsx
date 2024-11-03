import { usePersistLogin } from '../../hooks/usePersistLogin';
import React, { ReactNode } from 'react';

// Props type for children
interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const { isLoading } = usePersistLogin();

  if (isLoading) return <p>Loading... from Persist Login Hook ...</p>; // Show loading spinner

  return <>{children}</>; // Render protected content once verified
};

export default ProtectedLayout;