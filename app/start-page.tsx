import {Image, View, StyleSheet, Dimensions, Text, TouchableOpacity} from "react-native";
import Field from "./field";

const StartPage = ({ navigation }) =>{

    const handleTap = () => {
        navigation.navigate('ActivityPage');
    }

    return (<View style={styles.container}>
        <Text style={styles.text} >Witaj w darmowej aplikacji</Text>
        <Text style={styles.text} >która pomoże ci przygotować się</Text>
        <Text style={styles.text} >do egzaminu teoretycznego</Text>
        <Text style={styles.text} />
        <Text style={styles.text} />
        <Text style={styles.text} />
        <TouchableOpacity onPress={()=>handleTap()}>
            <Field text={'ZACZYNAMY!'}/>
        </TouchableOpacity>
        <Image source={require('../assets/welcome-page-logo.png')} style={styles.button}/>
    </View>)
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },text:{
        fontSize:25,
        color:'#98c135',
    },
    button:{
        width:300,
        resizeMode: 'contain'
    }
});

export default StartPage;