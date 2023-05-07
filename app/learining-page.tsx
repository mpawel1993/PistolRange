import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AnswerField from "./answer-field";
import NavigationField from "./navigation-field";
import {PossibleAnswer, Question} from "../model/model";
import {useEffect, useLayoutEffect, useState} from "react";

const LearningPage = ({navigation}) => {
    let isQuestionsLoaded = false;

    const baseQuestions: Question[] = JSON.parse(JSON.stringify(require('../assets/questionList.json')));
    const [questions, setQuestions] = useState([] as Question[]); //Filtered questions list
    const [actualQuestion, setActualQuestion] = useState({//Actual Loaded Questions
        value: '', possibleAnswer:
            [{id: 'a', value: '', gradient: ['white', 'white']} as PossibleAnswer,
                {id: 'b', value: '', gradient: ['white', 'white']} as PossibleAnswer,
                {id: 'c', value: '', gradient: ['white', 'white']} as PossibleAnswer]
    } as Question);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
    const [previousDisabled, setPreviousButtonDisabled] = useState(false);

    const handleQuit = () => {
        navigation.navigate('ActivityPage');
    }

    //After Component Mount
    useEffect(() => {
        let que = baseQuestions.map(x => Object.assign({}, x));
        que.map(a => {
            a.possibleAnswer.map(b => b.gradient = ['#94c02b', '#71912a']);
        });
        setQuestions(que);
    }, []);

    useEffect(() => {
        if (questions.length !== 0 && !isQuestionsLoaded) {
            let que = questions.map(x => Object.assign({}, x));
            que.map(a => {
                a.possibleAnswer.map(b => b.gradient = ['#94c02b', '#71912a']);
            });
            chooseQuestion(1);
            isQuestionsLoaded = true;
        }
    }, [questions]);

    useEffect(() => {
    }, [actualQuestion]);

    const chooseQuestion = (questionId: number) => {
        const question = questions.filter(x => {
            return x.id == questionId;
        })[0];
        setActualQuestion(question);
    }

    const handlePickUp = async (option) => {
        let question = actualQuestion;
        question.actualAnswer = undefined;
        question.possibleAnswer.map(x => x.gradient = ['green', 'green']);
        setActualQuestion({...actualQuestion, question});
        question.possibleAnswer.filter(x => x.id === option)[0].gradient = ['yellow', 'yellow'];
        question.actualAnswer = option;
        setActualQuestion({...actualQuestion, question});
    }

    const handleNextQuestion = () => {
        let question = actualQuestion;

        let id = question.id
        id++;

        if (id === questions.length) {
            setNextButtonDisabled(true);
        } else {
            setPreviousButtonDisabled(false);
        }

        if (question.actualAnswer === question.goodAnswer) {
            setActualQuestion(questions.filter(x => x.id = id)[0]);
        } else {
            question.possibleAnswer.filter(x => x.id === question.actualAnswer)[0].gradient = ['red', 'red'];
            setActualQuestion({...actualQuestion, question});
        }

    }

    const handlePreviousQuestion = () => {
        let id = actualQuestion.id;
        id--;

        if (id === 1) {
            setPreviousButtonDisabled(true);
        } else {
            setNextButtonDisabled(false);
        }

        const question = questions.filter(x => {
            return x.id == id;
        })[0];

        setActualQuestion(question);
    }

    return (<View style={styles.container}>
        <Text style={styles.header}>Nauka</Text>
        <View>
            <Text style={styles.text}>{actualQuestion.id}. {actualQuestion.value}</Text>
        </View>

        <TouchableOpacity onPress={() => handlePickUp('a')}>
            <AnswerField gradientColours={actualQuestion.possibleAnswer.filter(x => x.id === 'a')[0].gradient}
                         option={actualQuestion.possibleAnswer.filter(x => x.id === 'a')[0].id}
                         possibleAnswer={actualQuestion.possibleAnswer.filter(x => x.id === 'a')[0].value}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePickUp('b')}>
            <AnswerField gradientColours={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].gradient}
                         option={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].id}
                         possibleAnswer={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].value}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePickUp('c')}>
            <AnswerField gradientColours={actualQuestion.possibleAnswer.filter(x => x.id === 'c')[0].gradient}
                         option={actualQuestion.possibleAnswer.filter(x => x.id === 'c')[0].id}
                         possibleAnswer={actualQuestion.possibleAnswer.filter(x => x.id === 'c')[0].value}/>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', paddingTop: 15}}>
            <TouchableOpacity disabled={previousDisabled} onPress={() => handlePreviousQuestion()}>
                <NavigationField text={'POPRZEDNIE'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleQuit()}>
                <NavigationField text={'KONIEC'}/>
            </TouchableOpacity>
            <TouchableOpacity disabled={nextButtonDisabled} onPress={() => handleNextQuestion()}>
                <NavigationField text={'NASTĘPNE'}/>
            </TouchableOpacity>
        </View>

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

export default LearningPage;