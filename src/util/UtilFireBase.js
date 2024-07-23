import { getDatabase, ref, set, child, get, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';

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
const db = getDatabase(app);
const dbRef = ref(getDatabase());

// export const getDataBaseData = e => {
//   let rs;
//   console.log(e);
//   get(child(dbRef, e))
//     .then(snapshot => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         rs = data;
//       } else {
//         console.log('No data available');
//       }
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };
export const getDataBaseData = path => {
  return new Promise((resolve, reject) => {
    get(child(dbRef, path))
      .then(snapshot => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          resolve(null);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const createDataByPath = (path, newList) => {
  get(child(dbRef, path))
    .then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        set(ref(db, 'classification/'), {
          ...newList,
        });
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
};

export const createDataByDate = (path, info) => {
  get(child(dbRef, path))
    .then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        set(ref(db, 'classification/'), {
          ...info,
        });
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
};
