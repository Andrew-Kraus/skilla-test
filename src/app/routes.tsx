import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import TableCalls from '../pages/table-calls';

const RoutesConfig: React.FC = () => {

  return (
    <Routes>
      <Route path='/' element={<TableCalls />} />
      <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoutesConfig;