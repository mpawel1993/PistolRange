import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AnswerField from "./answer-field";
import NavigationField from "./navigation-field";
import {PossibleAnswer, Question} from "../model/model";
import {useEffect, useState} from "react";

const ExamPage = ({ navigation }) =>{

    const questions: Question[]  = JSON.parse(JSON.stringify(require('../assets/questionList.json')));
    const [questionId, setQuestionId] = useState(1);

    const [actualQuestion, setActualQuestion] = useState({value:''} as Question);
    const [aAnswer , setAAnswer] = useState({id:'a' , value:''} as PossibleAnswer);
    const [bAnswer , setBAnswer] = useState({id:'b' , value:''} as PossibleAnswer);
    const [cAnswer , setCAnswer] = useState({id:'c' , value:''} as PossibleAnswer);

    useEffect(() => {
        afterComponentMount();
    }, []);

    const afterComponentMount = () =>{
        const actualQuestion  = questions.filter(x => {
            return x.id == questionId;
        })[0];
        setActualQuestion(actualQuestion);
        setAAnswer(actualQuestion.possibleAnswer.filter(x => x.id ==='a')[0]);
        setBAnswer(actualQuestion.possibleAnswer.filter(x => x.id ==='b')[0]);
        setCAnswer(actualQuestion.possibleAnswer.filter(x => x.id ==='c')[0]);
    }

    const handlePickUp =(option) => {
        console.log('Option' , option);
    }

    const handleNextQuestion = () =>{
        console.log("Next");
    }

    const handlePreviousQuestion = () =>{
        console.log('Next Question');
    }

    return(<View style={styles.container}>
        <Text style={styles.header}>Egzamin</Text>
        <View>
            <Text style={styles.text}>{actualQuestion.value}</Text>
        </View>

        <TouchableOpacity onPress={() => handlePickUp('a')}>
            <AnswerField option={aAnswer.id} possibleAnswer={aAnswer.value}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePickUp('b')}>
            <AnswerField option={bAnswer.id} possibleAnswer={bAnswer.value}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePickUp('c')} id={'elo'}>
            <AnswerField option={cAnswer.id} possibleAnswer={cAnswer.value}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNextQuestion()}>
            <NavigationField text={'NASTĘPNE'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePreviousQuestion()}>
            <NavigationField text={'POPRZEDNIE'}/>
        </TouchableOpacity>
        <TouchableOpacity>
            <NavigationField text={'KONIEC'}/>
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
        fontSize:25,
        color:'#98c135',
        padding:5
    },button:{
        width:300,
        height:100,
        resizeMode: 'contain'
    },question:{
        backgroundColor:'red'
    },header:{
        fontSize:30,
        color:'#98c135'
    }
});

export default ExamPage;