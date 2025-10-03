// --- Import necessary hooks and components ---
import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
// --------------------------------------------------

// --- ADD: Import Firestore functions ---
import { collection, addDoc, onSnapshot, query, orderBy, QuerySnapshot } from 'firebase/firestore';
// --------------------------------------------------

// --- UPDATE: The component now accepts the 'db' object from App.js ---
const Chat = ({ route, navigation, db }) => {
  // --- UPDATE: Get userID, name, and color from the route parameters ---
  const { userID, name, color } = route.params;

  // --- State to hold the chat messages ---
  const [messages, setMessages] = useState([]);

  // --- UPDATE: The onSend function now adds new messages to the Firestore database ---
  const onSend = (newMessages) => {
    // --- addDoc creates a new document in the "messages" collection ---
    // --- We send the first message from the newMessages array, which is the message object ---
    // --- Created by Gifted Chat ---
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  //  --------------------------------------------------
  // ---  UPDATE: useEffect ---
  // --- The useEffect hook runs when the component mounts ---
  useEffect(() => {
    // Set the navigation header title to the user's name
    navigation.setOptions({ title: name });

    /*
    // --- Set initial static messages for the chat room ---
    setMessages([
      {
        // --- Each message needs a unique ID ---
        _id: 1,
        text: 'Hello developer, welcome!',
        createdAt: new Date(),
        // --- User object for the sender of this message ---
        user: {
          _id: 2, // --- Unique user ID ---
          name: 'React Native', // --- Display name ---
          avatar: 'https://placeimg.com/140/140/any', // Avatar image
        },
      },
      // --- This is the required system message ---
      {
        _id: 2,
        text: 'You have entered the chat.',
        createdAt: new Date(),
        system: true, // --- This property identifies it as a system message ---
      },
    ]);
    */

    // --- ADD: Create a query to listen to the 'messages' collection in Firestore ---
    // --- We order the messages by their creation date in descending order to show the newest messages first. ---
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    // --- ADD: onSnapshot creates a real-time listener for the query ---
    // --- The callback function will be executed whenever the query results change ---
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages = [];
      querySnapshot.forEach((doc) => {
        // --- For each document, create a message object that Gifted Chat understands ---
        newMessages.push({
          _id: doc.id,
          ...doc.data(),
          // --- Convert the Firestore Timestamp to a JavaScript Date object ---
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      // --- Update the messages state with the new messages from Firestore ---
      setMessages(newMessages);
    });

    // --- ADD: Cleanup function to unsubscribe from the listener when the component unmounts ---
    // --- This is important to prevent memory leaks ---
    return () =>{
      unsubscribe();
    };
  }, []); // The empty array [] means this runs only once.

  // --- REMOVED: The renderBubble function is no longer needed for this step ---
  // --- Gifted Chat's default bubbles will work perfectly ---
  // --- Custom function to render the message bubbles with custom colors ---
  /*
  const renderBubble = (props) => {
    return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: "#000" // Sender's bubble color
      },
      left: {
        backgroundColor: "#FFF" // Receiver's bubble color
      }
    }}
    />
  }
  */

  return (
    // --- Use the selected background color for the main container ---
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages} // --- Feed the messages from the state ---
        onSend={messages => onSend(messages)} // --- Handle sending new messages ---
        user={{
          _id: 1,
          name: name // --- This should be a unique ID for the current user ---
        }}
      />
      {/* 
       --- Add keyboardAvoidingView specifically for Android devices.
      Gifted Chat handles keyboard avoidance well on iOS, but Android often needs this extra help. ---
      */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // --- We remove justifyContent and alignItems as GiftedChat will manage its own layout ---

  }
});

export default Chat;