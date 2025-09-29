// --- STEP 3: Create Chat.js file add the following code below. ---
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  // GET both name and color from the route parameters
  const { name, color} = route.params;
  // Now you can use the 'name' variable in your component.

  useEffect(() => {
    // Set the navigation header title to the user's name
    navigation.setOptions({ title: name});
  }, []); // The empty array [] means this runs only once.

  return (
    // APPLY the selected background color to the main container
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text>Hello {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Chat;