import React, { useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'

import { auth } from './../index'

type singupType = (
  email: string,
  password: string
) => Promise<firebase.auth.UserCredential>

type loginType = (
  email: string,
  password: string
) => Promise<firebase.auth.UserCredential>

interface ValueProps {
  currentUser: firebase.User | null
  singup: singupType
  loginin: loginType
}

const AuthContext = React.createContext({} as ValueProps)

export function useAuth(): ValueProps {
  return useContext(AuthContext)
}

export function AuthProvider({
  children,
}: {
  children: Element[] | JSX.Element[]
}) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

  const singup: singupType = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const login: loginType = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  const value: ValueProps = {
    currentUser,
    singup,
    loginin: login,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
