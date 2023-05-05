import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Field from "./field";

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
        <TouchableOpacity onPress={()=>navigateToExam()}>
            <Field text={'EGZAMIN'}/>
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

export default ActivityPage;