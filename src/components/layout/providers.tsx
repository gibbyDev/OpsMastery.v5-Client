'use client';
import { useTheme } from 'next-themes';
import React from 'react';

// You can create your own provider or just use React's context/provider as needed
export function Providers({ children }: { children: React.ReactNode }) {
  // Example: useTheme for dark/light mode
  const { theme } = useTheme();

  // Add your own context providers here if needed
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}
