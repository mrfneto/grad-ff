import { auth, db, storage } from '@/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where
} from 'firebase/firestore'

export const useFirebase = _collection => {
  // AUTH

  const doLogin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const doLogout = () => signOut(auth)

  // STORAGE

  const fileUpload = async (file, path) => {
    const storageRef = ref(storage, path)
    const snapshot = uploadBytes(storageRef, file)
    const url = getDownloadURL(snapshot.ref)

    return url
  }
  // FIRESTORE

  const save = (payload, id = null) =>
    id
      ? updateDoc(doc(db, _collection, id), payload).then(() => {
          return id
        })
      : addDoc(collection(db, _collection), payload).then(doc => {
          return doc.id
        })

  const find = id =>
    getDoc(doc(db, _collection, id)).then(doc => {
      return doc.exists() ? doc.data() : null
    })

  const remove = (_collection, id) =>
    deleteDoc(doc(db, _collection, id)).then(() => {
      return id
    })

  const get = async ({
    filters = [],
    sorting = [],
    limitCount = null,
    startAfterDoc = null
  }) => {
    let queryRef = collection(db, _collection)

    if (filters.length > 0) {
      filters.forEach(({ field, operator, value }) => {
        queryRef = query(queryRef, where(field, operator, value))
      })
    }

    if (sorting.length > 0) {
      sorting.forEach(({ field, direction }) => {
        queryRef = query(queryRef, orderBy(field, direction))
      })
    }

    if (limitCount) {
      queryRef = query(queryRef, limit(limitCount))
    }

    if (startAfterDoc) {
      queryRef = query(queryRef, startAfter(startAfterDoc))
    }

    const querySnapshot = await getDocs(queryRef)

    const docs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]

    return { docs, lastVisible }
  }

  return { doLogin, doLogout, fileUpload, save, find, remove, get }
}

/**
 *  const { docs, lastVisible: lastDoc } = await get({
      filters: [
        { field: 'tipo', operator: '==', value: 'Disciplinas Obrigatórias ' }
      ],
      sorting: [{ field: 'disciplina' }],
      limitCount: 5
    })
 */
