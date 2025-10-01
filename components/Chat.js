// --- STEP 2: Code Implementation update Chat.js file. ---
// --- Import necessary hooks and components from React and React Native ---
import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
// --- UPDATE : Import the Bubble component for customization ---
// --- Import the Gifted Chat Library ---
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  // GET both name and color from the route parameters
  const { name, color } = route.params;

  // --- Create a new state to hold the chat messages ---
  const [messages, setMessages] = useState([]);

  // --- This function is called when a user sends a message ---
  const onSend = (newMessages = []) => {
    // --- Append the new message(s) to the existing messges state ---
    // --- GiftedChat.append is a helper function to make this process easier ---
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // --- The useEffect hook runs when the component mounts ---
  useEffect(() => {
    // Set the navigation header title to the user's name
    navigation.setOptions({ title: name });

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
  }, []); // The empty array [] means this runs only once.

  // --- Custom function to render the message bubbles with custom colors ---
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

  return (
    // --- Use the selected background color for the main container ---
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages} // --- Feed the messages from the state ---
        renderBubble={renderBubble} // --- Apply the custom bubble style ---
        onSend={messages => onSend(messages)} // --- Handle sending new messages ---
        user={{
          _id: 1, // --- This should be a unique ID for the current user ---
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