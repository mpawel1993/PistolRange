import {Image, View, StyleSheet, Dimensions, Text, TouchableOpacity} from "react-native";
import Field from "./field";

const StartPage = ({ navigation }) =>{

    const handleTap = () => {
        navigation.navigate('ActivityPage');
    }

    return (<View style={styles.container}>
        <Text style={styles.text} >Witaj w darmowej aplikacji która pomoże ci przygotować się do egzaminu teoretycznego</Text>
        <TouchableOpacity onPress={()=>handleTap()}>
            <Field text={'ZACZYNAMY'}/>
        </TouchableOpacity>
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
    },
    button:{
        width:300,
        resizeMode: 'contain'
    }
});

export default StartPage;