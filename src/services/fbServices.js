// https://chatgpt.com/share/a1979fa4-83c8-4317-be89-b355292eb618

import { auth, db } from '@/plugins/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import {
  updateDoc,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  startAfter,
  limit,
  where,
  orderBy
} from 'firebase/firestore'

class fbServices {
  _collection

  constructor(collectionName = null) {
    this._collection = collectionName
    this.loading = false
    this.error = null
  }

  async _execute(fn) {
    this.loading = true
    this.error = null

    try {
      const result = await fn()
      return result
    } catch (err) {
      this.error = err
      throw err
    } finally {
      this.loading = false
    }
  }

  // Auth methods
  async login(email, password) {
    return this._execute(async () => {
      await signInWithEmailAndPassword(auth, email, password)
    })
  }

  async register(email, password) {
    return this._execute(async () => {
      await createUserWithEmailAndPassword(auth, email, password)
    })
  }

  async signOut() {
    return this._execute(async () => {
      await signOut(this._auth)
    })
  }

  // Firestore methods

  async save(data, id) {
    return this._execute(async () => {
      return id
        ? await updateDoc(doc(db, this._collection, id), data)
        : await addDoc(collection(db, this._collection), data)
    })
  }

  async remove(id) {
    return this._execute(async () => {
      await deleteDoc(doc(db, this._collection, id))
    })
  }

  async find(id) {
    return this._execute(async () => {
      await getDoc(doc(db, this._collection, id)).then(doc => {
        return doc.exists() ? doc.data() : null
      })
    })
  }

  async get({
    filters = [],
    sorting = [],
    limitCount = null,
    startAfterDoc = null
  }) {
    return this._execute(async () => {
      let queryRef = collection(db, this._collection)

      // Apply where clauses if provided
      if (filters.length > 0) {
        filters.forEach(({ field, operator, value }) => {
          queryRef = query(queryRef, where(field, operator, value))
        })
      }

      // Apply order by clauses if provided
      if (sorting.length > 0) {
        sorting.forEach(({ field, direction }) => {
          queryRef = query(queryRef, orderBy(field, direction))
        })
      }

      // Apply limit if provided
      if (limitCount) {
        queryRef = query(queryRef, limit(limitCount))
      }

      // Apply start after for pagination if provided
      if (startAfterDoc) {
        queryRef = query(queryRef, startAfter(startAfterDoc))
      }

      // Execute the query
      const querySnapshot = await getDocs(queryRef)
      // Return the documents and the last visible document for pagination
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]

      return { docs, lastVisible }
    })
  }

  // Storage methods
  async uploadFile(file, path) {
    const operation = async () => {
      const storageRef = ref(this._storage, path)
      const snapshot = await uploadBytes(storageRef, file)
      console.log('Arquivo enviado com sucesso:', snapshot)
      return snapshot
    }

    return this._execute(operation)
  }

  async downloadFile(path) {
    const operation = async () => {
      const storageRef = ref(this._storage, path)
      const url = await getDownloadURL(storageRef)
      return url
    }

    return this._execute(operation)
  }
}

export const dbOrders = new fbServices('orders')
export const dbDisciplinas = new fbServices('disciplinas')
