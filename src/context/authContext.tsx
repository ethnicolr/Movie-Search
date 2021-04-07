import React, { useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'

import { auth, db } from './../index'

export type singupType = (
  email: string,
  password: string
) => Promise<firebase.auth.UserCredential>

export type loginType = (
  email: string,
  password: string
) => Promise<firebase.auth.UserCredential>

export type logoutType = () => Promise<void>

interface ValueProps {
  currentUser: firebase.User | null
  singup: singupType
  login: loginType
  logout: logoutType
  handleLoginModal: (value: boolean) => void
  handleSingUpModal: (value: boolean) => void
  addToStorage: (id: string) => Promise<void>
  deleteFromStorage: (id: string) => Promise<void>
  favoriteList: string[]
  isOpenLogin: boolean
  isOpenSingUp: boolean
}

const AuthContext = React.createContext({} as ValueProps)

export function useAuth(): ValueProps {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
  const [favoriteList, setFavoriteList] = useState<string[]>([])
  const [isOpenLogin, setModalLogin] = useState(false)
  const [isOpenSingUp, setModalSingUp] = useState(false)

  const singup: singupType = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const login: loginType = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout: logoutType = () => {
    console.log('test')
    return auth.signOut()
  }
  const handleLoginModal = (value: boolean) => {
    setModalLogin(value)
  }

  const handleSingUpModal = (value: boolean) => {
    setModalSingUp(value)
  }

  const getFaviriteList = async (
    docRef: firebase.firestore.DocumentReference
  ) => {
    const userData = await docRef.get()
    const favorite = userData.data()?.favorite as string[]
    return favorite
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = db.collection('users').doc(user.uid)
        docRef.get().then(async (doc) => {
          if (!doc.exists) {
            db.collection('users')
              .doc(user.uid)
              .set({ email: user.email, favorite: [] })
          } else {
            const favorite = await getFaviriteList(docRef)
            setFavoriteList(favorite)
          }
        })
      } else {
        setFavoriteList([])
      }

      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  const addToStorage = async (id: string) => {
    if (currentUser) {
      const docRef = db.collection('users').doc(currentUser.uid)
      const newList = [...favoriteList, id]
      docRef.update('favorite', newList)
      setFavoriteList(newList)
    }
  }

  const deleteFromStorage = async (id: string) => {
    if (currentUser) {
      const docRef = db.collection('users').doc(currentUser.uid)
      const newList = favoriteList.filter((movie) => movie !== id)
      docRef.update('favorite', [...newList])
      setFavoriteList(newList)
    }
  }

  const value: ValueProps = {
    currentUser,
    favoriteList,
    isOpenLogin,
    isOpenSingUp,
    addToStorage,
    deleteFromStorage,
    singup,
    login,
    logout,
    handleLoginModal,
    handleSingUpModal,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
