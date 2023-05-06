import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const NavigationField = ({text}) =>{


    return(<View >
        <LinearGradient style={styles.container}
            // Button Linear Gradient
                        colors={['#515160', '#414941']}>
            <Text style={styles.text}>{text}</Text>
        </LinearGradient>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor:'#34333d',
        borderColor:'#fefefe',
        borderRadius:10,
        height:50,
        width: 100,

    },text:{
        fontSize:15,
        color:'#2b2a29'
    }
});

export default NavigationField;