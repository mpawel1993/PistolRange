import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const Field = ({text}) => {

    return (<View style={styles.container}>
        <LinearGradient style={styles.gradient}
                        colors={['#94c02b', '#71912a']}>
            <Text style={styles.text}>{text}</Text>
        </LinearGradient>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        padding: 3
    },
    gradient: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#94c02b',
        width: 380,
        paddingTop: 20,
        paddingBottom: 20,
        fontWeight: 'bold'
    }, text: {
        fontSize: 20,
        color: '#2b2a29'
    }
});

export default Field;