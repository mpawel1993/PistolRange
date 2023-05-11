import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Field from "./field";
import {Question} from "../model/model";

const ActivityPage = ({ navigation }) =>{

    const navigateToSetOfQuestions = () => {
        navigation.navigate('SetOfQuestionsPage');
    }

    const navigateToExam = () => {
        const baseQuestions: Question[] = JSON.parse(JSON.stringify(require('../assets/questionList.json')));
        let numbers = [];
        let min, max, r, n, p;
        min = 1;
        max = 20;
        r = 10; // how many numbers you want to extract

        for (let i = 0; i < r; i++) {
            do {
                n = Math.floor(Math.random() * (max - min + 1)) + min;
                p = numbers.includes(n);
                if(!p){
                    numbers.push(n);
                }
            }
            while(p);
        }
        let  finalQuestions: Question[] = [];
        numbers.forEach(a => {
            let question = baseQuestions.filter(q => q.id == a)[0];
            finalQuestions.push(question);
        });
        assignId(finalQuestions);
         navigation.navigate('ExamPage', {questions: finalQuestions});
    }

    const assignId = (array: any[]) => {
        let index = 1;
        array.forEach(a => {
            a.id = index;
            index++;
        });
    }

    return(<View style={styles.container}>
        <TouchableOpacity onPress={()=>navigateToSetOfQuestions()}>
            <Field text={'NAUKA'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigateToExam()}>
            <Field text={'EGZAMINc'}/>
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