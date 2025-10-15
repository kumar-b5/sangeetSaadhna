import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const getFirebaseApp = (): FirebaseApp => {
  if (!firebaseConfig.projectId) {
    throw new Error('Missing Firebase configuration. Check environment variables.');
  }

  if (getApps().length) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
};

