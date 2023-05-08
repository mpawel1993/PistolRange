import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import {useEffect} from "react";

const WelcomePage = ({ navigation }) => {

    const navigateToStartPage = () => {
        navigation.navigate('StartPage');
    }

    useEffect(() => {
        const toRef = setTimeout(() => {
            navigateToStartPage();
        }, 2000);
    }, []);


    return (<View style={styles.container}>
        <Image source={require('../assets/welcome-page-logo.png')} style={styles.button}/>
        {/*<TouchableOpacity onPress={() => navigateToStartPage()}>*/}
        {/*</TouchableOpacity>*/}
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