// App.js 

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
// --------------------------------------------------
// --- IMPORT the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// --------------------------------------------------
// --- Import your environment variables ---
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';
// --------------------------------------------------

const Stack = createNativeStackNavigator();

// --------------------------------------------------
// --- Your web app's Firebase Configuration ---
// --- IMPORTANT: Replace with your actual config from the Firebase console ---
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};
// --------------------------------------------------

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
// --- Initialize Cloud Firestore and get a reference to the service ---
const db = getFirestore(app);

// --------------------------------------------------


// The app's main Chat component that renders the chat UI
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        {/* Pass the database object to the Chat component as a prop */}
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
