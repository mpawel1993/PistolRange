import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Field from "./field";

const FinishLearning = ({navigation}) =>{

    const navigateToActivityPage = () =>  {
        navigation.navigate('ActivityPage');
    }

    return(<View style={styles.container}>
        <Text>Modul ukonczony ????</Text>
        <TouchableOpacity onPress={()=>navigateToActivityPage()}>
            <Field text={'Powrot'}/>
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
        resizeMode: 'contain'
    }
});

export default FinishLearning;