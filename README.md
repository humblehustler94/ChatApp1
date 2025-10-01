# ChatApp

A mobile chat application built with React Native and Expo. This project allows users to enter a start screen, choose their name and a chat background color, and then proceed to a chat screen.

## App Preview

*(Here, you can add a screenshot or, even better, a GIF of your app in action that you recorded)*

![A demo showing the user flow from the Start screen to the Chat screen.](assets/5.1%20-%20Final%20Task%20Recording.gif)

--------------------------------------------------------------------------
![A demo showing changing Chat bubble messages.](assets/5.2%20-%20Final%20Results%20Customize%20Chat%20Bubble.gif)

--------------------------------------------------------------------------

## Key Features

- **Start Screen:** A welcoming screen where users can configure their chat experience.
- **User Name Input:** Users can enter their name, which will be used to personalize the chat screen.
- **Customizable UI:** Users can choose from a selection of background colors for their chat screen.
- **Screen Navigation:** Seamless navigation between the Start screen and the Chat screen using React Navigation.
- **Dynamic Header:** The user's name is dynamically set as the title in the Chat screen's navigation header.
- **Personalized Chat Background:** The Chat screen's background color is set based on the user's selection from the Start screen.

## Technologies Used

- **React Native:** A JavaScript framework for building native mobile apps.
- **Expo:** A platform and toolchain for universal React applications.
- **React Navigation:** A library for handling routing and navigation between screens.
- **JavaScript (ES6+)**
- **Node.js**

## Setup and Installation

To run this project locally, follow these steps:

1.  **Prerequisites:**
    -   Ensure you have Node.js installed (version 16.x is recommended for compatibility).
    -   Have the Expo Go app installed on your iOS or Android mobile device.

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/humblehuster94/ChatApp1.git
    ```

3.  **Navigate to the project directory:**
    ```bash
    cd ChatApp
    ```

4.  **Install dependencies:**
    ```bash
    npm install
    ```

5.  **Start the Metro Bundler:**
    ```bash
    npm start
    ```

6.  **Run the app:**
    -   Scan the QR code displayed in the terminal with the Expo Go app on your mobile device.
    -   Alternatively, you can run it on an Android emulator or iOS simulator.

## Future Features

- [ ] Implement real-time messaging using a backend service like Firebase/Firestore.
- [ ] Display a list of messages on the Chat screen.
- [ ] Allow users to send and receive messages, images, and location data.