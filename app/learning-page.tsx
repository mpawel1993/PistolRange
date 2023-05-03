import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const LearningPage = ({ navigation }) =>{

    return(<View style={styles.container}>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },text:{
        fontSize:20,
        color:'white'
    },button:{
        width:300,
        resizeMode: 'contain'
    }
});

export default LearningPage;