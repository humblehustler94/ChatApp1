// components/Start.js
// --- STEP 3: Create new file Start.js file add the following code. ---
// Import necessary components
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    // ADD state for the choosen background color.
    const [color, setColor] = useState('');

    // Define the color choices from your design specifications
    const colors = {
        black: '#090C08',
        purple: '#474056',
        grey: '#8A95A5',
        green: '#B9C6AE'
    };


    return (
        // ADD ImageBackground to use an image as the screen background
        <ImageBackground
            source={require('../assets/background-image.png')} // Make sure you have this image in an 'assets' folder
            resizeMode="cover"
            style={styles.backgroundImage}
        >
            {/* ADD the App Title */}
            <Text style={styles.appTitle}>ChatApp</Text>

            {/* ADD a container for the user inputs */}
            <View style={styles.inputContainer}>
                {/* Your Name TextInput - Apply new styles */}
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Your name'
                    placeholderTextColor="#090C08" // Style the placeholder text
                />

                {/* ADD section for choosing background color */}
                <Text style={styles.chooseColorText}>Choose background color:</Text>
                <View style={styles.colorSelector}>
                    <TouchableOpacity
                        style={[styles.colorCircle, { backgroundColor: colors.black }]}
                        onPress={() => setColor(colors.black)}
                    />
                    <TouchableOpacity
                        style={[styles.colorCircle, { backgroundColor: colors.purple }]}
                        onPress={() => setColor(colors.purple)}
                    />
                    <TouchableOpacity
                        style={[styles.colorCircle, { backgroundColor: colors.grey }]}
                        onPress={() => setColor(colors.grey)}
                    />
                    <TouchableOpacity
                        style={[styles.colorCircle, { backgroundColor: colors.green }]}
                        onPress={() => setColor(colors.green)}
                    />
                </View>

                {/* CHANGE the Button to a styled TouchableOpacity */}
                <TouchableOpacity
                    style={styles.startButton}
                    // UPDATE onPress to pass both name AND color to the Chat screen
                    onPress={() => navigation.navigate('Chat', { name: name, color: color })}
                >
                    <Text style={styles.startButtonText}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

// ADD all the styles from the design specifications
const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        justifyContent: 'space-evenly', // Evenly distribute content vertically
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    inputContainer: {
        backgroundColor: 'white',
        width: '88%',
        alignItems: 'center',
        padding: '6%',
    },
    textInput: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: '#090C08',
        fontSize: 16,
        fontWeight: '300',
        color: '#090C08',
        opacity: 0.5,
        marginBottom: 15,
    },
    chooseColorText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1,
        marginBottom: 10,
    },
     colorSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of width/height to make it a circle
  },
  startButton: {
    backgroundColor: '#757083',
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  }
});

export default Start;