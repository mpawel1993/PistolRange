import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Field from "./Field";

const SetOfQuestionsPage = ({ navigation }) =>{


    function handleTap() {
        navigation.navigate('LearningPage');
    }

    return(<View style={styles.container}>
        <TouchableOpacity onPress={()=>handleTap()}>
            <Field text={'Ustawa o Broni i Amunicji'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleTap()}>
            <Field text={'Przechowywanie i noszenie Broni'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleTap()}>
            <Field text={'Przewożenie broni środkami transportu publicznego'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleTap()}>
            <Field text={'Sankcje Karne Pytania'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleTap()}>
            <Field text={'Obrona Konieczna i Stan Wyższej Konieczności'}/>
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
        height:50,
        resizeMode: 'contain'
    }
});

export default SetOfQuestionsPage;