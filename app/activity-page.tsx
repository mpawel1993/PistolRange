import {Image, Linking, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
        max = 200;
        r = 10;

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

    const loadInBrowser = () => {
        Linking.openURL('https://pistolrange.pl/promocje/').catch(err => console.error("Couldn't load page", err));
    };

    return(
        <View style={styles.container}>
            <Image source={require('../assets/welcome_message.png')} style={styles.word}/>
            <TouchableOpacity onPress={() => navigateToSetOfQuestions()}>
                <Field text={'NAUKA'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToExam()}>
                <Field text={'EGZAMIN'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => loadInBrowser()}>
                <Image source={require('../assets/actual_sales_logo.png')} style={styles.button}/>
            </TouchableOpacity>
        </View>);
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },text:{
        fontSize:20,
        color:'white'
    },button:{
        width:350,
        height: 250,
        resizeMode: 'contain'
    },word:{
        width:300,
        height: 300,
        resizeMode: 'contain'
    }
});

export default ActivityPage;