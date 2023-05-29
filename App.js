import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Navigator from './routes/stack-navigator'
import {useFonts} from "expo-font";

const App = () => {
    const [loaded] = useFonts({
        Bahnschrift: require('../PistolRange/assets/fonts/BAHNSCHRIFT.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Navigator/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }, background: {
        flex: 1,
    }
});

export default App;