import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  docRef,
  query,
  where,
  collection,
  arrayUnion,
  getDocs,
  deleteDoc,
  FieldValue,
  deleteField,
  arrayRemove,
} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyA0yKuFTNSGZmQo_dq6x27Lb8LzSc7JhqE',
  authDomain: 'myaccountingmanagement.firebaseapp.com',
  projectId: 'myaccountingmanagement',
  storageBucket: 'myaccountingmanagement.appspot.com',
  messagingSenderId: '244066512651',
  databaseURL: 'https://myaccountingmanagement-default-rtdb.firebaseio.com',
  appId: '1:244066512651:web:fbccbda7489d17f9783c0e',
  measurementId: 'G-Y9V1V0P2Z7',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getDataByDay = async param => {
  const dataMainPath = collection(db, param.path);
  const docRef = doc(dataMainPath, param.date);
  const dayInfo = collection(docRef, param.day);

  const docSnap = await getDocs(dayInfo);
  const result = {};
  docSnap.forEach(doc => {
    result[doc.id] = doc.data();
  });
  return result;
  // if (docSnap.exists()) {
  //   console.log('Document data:', docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log('No such document!');
  // }
};

export const getItemList = async () => {
  const dataMainPath = collection(db, 'item');
  const docSnap = await getDocs(dataMainPath);
  const result = {};
  docSnap.forEach(doc => {
    result[doc.id] = doc.data();
  });
  return result;
};

export const createItem = async (path, newItem) => {
  const docRef = doc(db, path);
  await updateDoc(docRef, {
    data: arrayUnion(newItem),
  });
};

export const removeItemData = async array => {
  const docRef = doc(db, 'item/類別');
  // 1. 先获取当前文档的数组数据
  const docSnap = await getDoc(docRef);
  await updateDoc(docRef, {
    data: array,
  });
};

export const createAccountRecord = async newData => {
  try {
    const docPath = doc(
      db,
      'account/' + newData.collection + '/' + newData.day + '/' + newData.item,
    );
    let result = await getDataByDay({
      path: 'account/',
      date: newData.collection,
      day: newData.day,
    });

    if (Object.keys(result).find(r => r == newData.item) == undefined) {
      await setDoc(
        doc(
          db,
          'account' +
            '/' +
            newData.collection +
            '/' +
            newData.day +
            '/' +
            newData.item,
        ),
        { [newData.ps]: arrayUnion(parseInt(newData.data)) },
      );
    } else {
      updateDoc(docPath, { [newData.ps]: arrayUnion(parseInt(newData.data)) });
      console.log(docPath);
    }
    return true;
  } catch (error) {
    console.error('Error creating/updating account record:', error);
    // 如果发生异常，则返回 false
    return false;
  }
};
export const deleteAccountRecord = async path => {
  const docRef = doc(
    db,
    'account/' + path.collection + '/' + path.day + '/' + path.data,
  );
  updateDoc(docRef, {
    [path.item]: deleteField(),
  });
};
