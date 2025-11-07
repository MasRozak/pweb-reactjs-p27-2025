// src/components/EmptyState.tsx
import { type ReactNode } from 'react';

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
  actionButton?: ReactNode;
}

const DefaultIcon = () => (
  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
);

const EmptyState = ({ message, icon = <DefaultIcon />, actionButton }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg text-center">
      {icon}
      <p className="mt-4 text-lg font-medium text-gray-600">{message}</p>
      {actionButton && <div className="mt-6">{actionButton}</div>}
    </div>
  );
};

export default EmptyState;