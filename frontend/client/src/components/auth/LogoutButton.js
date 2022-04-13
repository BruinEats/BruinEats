import React from 'react';
import { Button } from '@ui-kitten/components';
import useAuth from '../../hooks/useAuth';

function LogoutButton() {
  const { logOut } = useAuth();

  return <Button onPress={() => logOut()}>log out</Button>;
}

export default LogoutButton;
