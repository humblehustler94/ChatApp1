// components/Start.js

import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';

// --------------------------------------------------
// --- ADD: Import Firebase auth functions ---
import { getAuth, signInAnonymously } from "firebase/auth";
// --------------------------------------------------

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    // --- UPDATE: Set a default color to avoid issues if none is selected ---
    const [color, setColor] = useState('#090C08');

    // --------------------------------------------------
    // --- ADD: Initialize Firebase Auth ---
    // --- This gives us access to the authentication methods. ---
    const auth = getAuth();

    // Define the color choices from your design specifications
    const colors = {
        black: '#090C08',
        purple: '#474056',
        grey: '#8A95A5',
        green: '#B9C6AE'
    };

    // --------------------------------------------------
    // --- ADD: Function to handle anonymous sign-in ---
    const signInUser = () => {
        signInAnonymously(auth)
        .then(result => {
            // --- Once signed in, navigate to the Chat screen ---
            // --- Pass teh user's unique ID, naem, and selected color as params ---
            navigation.navigate('Chat', {
                userID: result.user.uid,
                name: name,
                color: color
            });
            Alert.alert("Signed in successfully!");
        })
        .catch((error) => {
            Alert.alert("Unable to sign in, try again later.");
            console.error(error);
        })
    }
    // --------------------------------------------------


    return (
        <ImageBackground
            source={require('../assets/background-image.png')} // Make sure you have this image in an 'assets' folder
            resizeMode="cover"
            style={styles.backgroundImage}
        >
            <Text style={styles.appTitle}>ChatApp</Text>

            <KeyboardAvoidingView
                style={styles.inputContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Your name'
                    placeholderTextColor="#757083" // Style the placeholder text
                />
            
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

                <TouchableOpacity
                    style={styles.startButton}
                    // --- UPDATE: Call the new signInUser function on press ---
                    onPress={signInUser}
                >
                    <Text style={styles.startButtonText}>Start Chatting</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>

        </ImageBackground >
    );
}

// ADD all the styles from the design specifications
const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        justifyContent: 'space-around', // Evenly distribute content vertically
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
        borderColor: '#757083',
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
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