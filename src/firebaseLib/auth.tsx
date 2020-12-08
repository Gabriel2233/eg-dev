import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import cookie from "js-cookie";

import firebase from "./initFirebase";

import "firebase/auth";

import { IAuthContext } from "../../types/types";
import { auth } from "firebase-admin";

const authContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleUser = async (rawUser: firebase.User | null) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      //create User in DB
      await fetch("/api/user/create", {
        method: "POST",
        body: JSON.stringify(userWithoutToken),
      });

      setUser(user);

      cookie.set("dil-auth", String(true), {
        expires: 1,
      });

      setLoading(false);
      return user;
    } else {
      setUser(false);
      cookie.remove("dil-auth");

      setLoading(false);
      return false;
    }
  };

  const signinWithGitHub = async (redirect: string) => {
    setLoading(true);

    try {
      const res = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GithubAuthProvider());

      handleUser(res.user);

      if (redirect) {
        Router.push(redirect);
      }
    } catch (err) {
      return err.message;
    }
  };

  const signinWithGoogle = async (redirect: string) => {
    setLoading(true);

    try {
      const res = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      handleUser(res.user);

      if (redirect) {
        Router.push(redirect);
      }
    } catch (err) {
      return err.message;
    }
  };

  const signOut = async () => {
    Router.push("/");

    await firebase.auth().signOut();

    handleUser(null);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGitHub,
    signinWithGoogle,
    signOut,
  };
}

export const formatUser = async (user: firebase.User) => {
  const userToken = await user.getIdToken();

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: userToken,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
