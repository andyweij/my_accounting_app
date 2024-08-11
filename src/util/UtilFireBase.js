import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  docRef,
  query,
  where,
  collection,
  arrayUnion,
  getDocs,
  FieldValue
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
  console.log(param);
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
export const createDataByFireStore = async (path ,newItem)=> {

const docRef = doc(db,path)
await updateDoc(docRef, {
  data: arrayUnion(newItem)
});

  // await setDoc(doc(db, path), {
  //   data
  // });
};
export const removeItemData=async(array)=>{
  const docRef = doc(db, "item/類別");
  // 1. 先获取当前文档的数组数据
  const docSnap = await getDoc(docRef);
  await updateDoc(docRef, {
          data: array
      });
}
// if (docSnap.exists()) {
//   const data = docSnap.data();
//   const array = data.arrayField; // 替换 'arrayField' 为你的数组字段名

//   // 2. 移除指定索引位置的元素，例如要移除第2个元素（索引为1）
//   const indexToRemove = 1;
//   array.splice(indexToRemove, 1);

//   // 3. 更新文档中的数组字段
//   await updateDoc(docRef, {
//       arrayField: array
//   });

//   console.log("更新成功！");
// } else {
//   console.log("文档不存在！");
// }