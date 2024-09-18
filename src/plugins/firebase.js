import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: `${import.meta.env.VITE_PROJECTID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: `${import.meta.env.VITE_PROJECTID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
auth.languageCode = 'pt'

export { auth, db, storage }
