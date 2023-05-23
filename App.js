import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Navigator from './routes/stack-navigator'

const App = () => {
    return (
        <View style={styles.container}>
            <Navigator/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black'
    },background:{
        flex: 1,
    }
});

export default App;