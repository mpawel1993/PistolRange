import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Field from "./field";
import {Question} from "../model/model";

const ActivityPage = ({ navigation }) =>{

    const navigateToSetOfQuestions = () => {
        navigation.navigate('SetOfQuestionsPage');
    }

    const navigateToExam = () => {
        navigation.navigate('ExamPage');
    }

    return(<View style={styles.container}>
        <TouchableOpacity onPress={()=>navigateToSetOfQuestions()}>
            <Field text={'NAUKA'}/>
        </TouchableOpacity>
        <Field text={'EGZAMIN(Niedostepne)'}/>
        {/*<TouchableOpacity onPress={()=>navigateToExam()}></TouchableOpacity>*/}
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

export default ActivityPage;