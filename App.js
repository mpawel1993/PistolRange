import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Navigator from './routes/stack-navigator'

const App = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('./assets/background_image.jpg')} resizeMode="cover" style={styles.background}>
                <Navigator/>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },background:{
        flex: 1,
    }
});

export default App;