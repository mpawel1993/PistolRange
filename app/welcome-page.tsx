import {Image, View, StyleSheet, Dimensions, Text, TouchableOpacity} from "react-native";

const WelcomePage = ({ navigation }) =>{

    const handleTap = () =>{
        navigation.navigate('StartPage');
    }

    return (<View style={styles.container}>
        <TouchableOpacity onPress={()=>handleTap()}>
            <Image source={require('../assets/welcome-page-logo.png')} style={styles.button}/>
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
    },button:{
        width:300,
        height:200,
        resizeMode: 'contain'
    }
});

export default WelcomePage;