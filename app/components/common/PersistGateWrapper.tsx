import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";

interface PersistGateProps {
  children: ReactNode;
  loading?: ReactNode;
  persistor: any;
}

export const PersistGate = ({
  children,
  loading = null,
  persistor,
}: PersistGateProps) => {
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    const handlePersistorState = () => {
      const { bootstrapped } = persistor.getState();
      if (bootstrapped) {
        setBootstrapped(true);
      }
    };

    const unsubscribe = persistor.subscribe(handlePersistorState);
    handlePersistorState();

    return () => {
      unsubscribe();
    };
  }, [persistor]);

  if (!bootstrapped) return <>{loading}</>;

  return <>{children}</>;
};
