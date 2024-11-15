import { useAuthState } from "./firebaselogin";
import { useDbData } from "./firebaseDb";
import { useState } from "react";

export const useProfile = () => {
  const [user] = useAuthState();
  const [isAdmin, isLoading, error] =  useDbData(`/admins/${user?.uid || 'guest'}`);
  return [{ user, isAdmin }, isLoading, error];
};