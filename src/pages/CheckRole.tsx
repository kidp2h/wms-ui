import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Role } from 'wms-types';

export const CheckRole = ( role:Role) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(role == 'EMPLOYEE')
    navigate('/dashboard/management');
  }, []);

  return <></>;
};
