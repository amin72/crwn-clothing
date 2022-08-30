import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const config = {
    apiKey: "AIzaSyBtsclQ8RHrxSMie6AjK_KyDNTI73X0-GA",
    authDomain: "crwn-db-ef288.firebaseapp.com",
    projectId: "crwn-db-ef288",
    storageBucket: "crwn-db-ef288.appspot.com",
    messagingSenderId: "220640897448",
    appId: "1:220640897448:web:29ec0ade16bf062f70959d"
}

const app = firebase.initializeApp(config)

export const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({ 'prompt': 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export const firestore = firebase.firestore()

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()
  
    if (!snapshot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        }).catch(error => {
            console.log('error creating user', error.message)
        })
    }
  
    return userRef
}

export default app
