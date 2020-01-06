import firebase from 'firebase-admin'
import { firebaseServiceAccount } from './config'

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseServiceAccount)
})

export default firebase.firestore()
