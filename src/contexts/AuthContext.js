import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth";
import { doc, setDoc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(email, password, name, ph) {
    try{
        console.log(currentUser)
        const docRef= await setDoc(doc(db,"users",email),{
            Name: name,
            Email: email,
            Mobile: ph,
        });
    } catch(e){
        console.log("error adding doc",e);
    }
    return createUserWithEmailAndPassword(auth,email,password).then(res=> console.log(res.user));
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth,email, password).then(res=> console.log(res.user))
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email).then(res=> console.log(res.user))
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function getSnap(col, dat){
    return getDoc(doc(db, col, dat))
  }

  async function addMessage(dat,sender,newMessage){

    const docRef = doc(db,'messages',dat);
    await updateDoc(docRef,{
      messages: arrayUnion({
        msg: newMessage,
        sender: sender,
        timestamp: 'dummy time'
      })
    }).then(() => {
      console.log("Message added successfully!");
    }).catch((error) => {
      console.error("Error adding message:", error);
    });


    return 
    
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getSnap,
    addMessage
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}