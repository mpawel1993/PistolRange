import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Field from "./field";
import {Question} from "../model/model";
import React from "react";

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

    return(
        <View style={styles.container}>
            <Text style={styles.text} >Witaj w darmowej aplikacji</Text>
            <Text style={styles.text} >która pomoże ci przygotować się</Text>
            <Text style={styles.text} >do egzaminu teoretycznego</Text>
            <Text style={styles.text} />
            <Text style={styles.text} />
            <Text style={styles.text} />
            <TouchableOpacity onPress={()=>navigateToSetOfQuestions()}>
                <Field text={'NAUKA'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigateToExam()}>
                <Field text={'EGZAMIN'}/>
            </TouchableOpacity>
        </View>);
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