import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AnswerField from "./answer-field";
import {PossibleAnswer, Question} from "../model/model";
import {useEffect, useRef, useState} from "react";
import ExamSummary from "./exam-summary";
import {LinearGradient} from "expo-linear-gradient";
import Header from "./header";

const ExamPage = ({navigation}) => {
    const [time, setTime] = useState(1800 || 10);
    const [formattedTime, setFormattedTime] = useState('30min: 0 sec');
    const timerRef = useRef(time);
    let isQuestionsLoaded = false;
    const [params, setParams] = useState(navigation.state);
    const [questions, setQuestions] = useState([] as Question[]); //Filtered questions list
    const [actualQuestion, setActualQuestion] = useState({//Actual Loaded Questions
        id: 1,
        value: '', possibleAnswer:
            [{id: 'a', value: '', gradient: ['white', 'white']} as PossibleAnswer,
                {id: 'b', value: '', gradient: ['white', 'white']} as PossibleAnswer,
                {id: 'c', value: '', gradient: ['white', 'white']} as PossibleAnswer]
    } as Question);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
    const [previousDisabled, setPreviousButtonDisabled] = useState(false);
    const [isSummaryVisible, setIsSummaryVisible] = useState(false);
    const [finalInfo, setFinalInfo] = useState('');
    const [isExamPassed, setIsExamPassed] = useState(false);
    const [wasSummaryDisplayed, setWasSummaryDisplayed] = useState(false);
    const [goodAnswers, setGoodAnswers] = useState(0);

    useEffect(() => {
        let que = params.params.questions.map(x => Object.assign({}, x));
        que.map(a => {
            a.possibleAnswer.map(b => b.gradient = ['#94c02b', '#71912a']);
        });
        setQuestions(que);
    }, [params]);

    useEffect(() => {
        if (questions.length !== 0 && !isQuestionsLoaded) {
            let que = questions.map(x => Object.assign({}, x));
            que.map(a => {
                a.possibleAnswer.map(b => b.gradient = ['#94c02b', '#71912a']);
            });
            const question = questions.filter(x => x.id == 1)[0];
            setActualQuestion(question);
            isQuestionsLoaded = true;
        }
    }, [questions]);

    useEffect(() => {
        if (actualQuestion.id == 1) {
            setNextButtonDisabled(false);
            setPreviousButtonDisabled(true);
        } else if (actualQuestion.id <= 1) {
            setActualQuestion(questions.filter(x => x.id == 1)[0])
            setNextButtonDisabled(false);
            setPreviousButtonDisabled(true);
        } else if (actualQuestion.id >= questions.length) {
            setActualQuestion(questions.filter(x => x.id == questions.length)[0])
        } else {
            setNextButtonDisabled(false);
            setPreviousButtonDisabled(false);
        }
    }, [actualQuestion]);

    useEffect(() => {
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
            } else {
                setTime(timerRef.current);
                setFormattedTime(secondsToHms(timerRef.current));
            }
            console.log('here' , );

            if (timerRef.current < 0) {
                handleQuit();
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    function secondsToHms(d) {
        d = Number(d);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        var mDisplay = m > 0 ? m + (m == 1 ? " min : " : " min : ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
        return mDisplay + sDisplay;
    }

    const handleQuit = () => {
        summaryExam();
        setIsSummaryVisible(true);
        setWasSummaryDisplayed(true);
        if (wasSummaryDisplayed == true) {
            navigation.navigate('ActivityPage');
        }
    }

    const handlePickUp = (option) => {
        let question = actualQuestion;
        question.actualAnswer = undefined;
        question.possibleAnswer.map(x => x.gradient = ['#94c02b', '#71912a']);
        setActualQuestion({...actualQuestion, question});
        question.possibleAnswer.filter(x => x.id == option)[0].gradient = ['yellow', 'yellow'];
        question.actualAnswer = option;
        setActualQuestion({...actualQuestion, question});
        questions[actualQuestion.id - 1].actualAnswer = option;
        setQuestions(questions);
    }

    const handleNextQuestion = () => {
        let question = actualQuestion;
        if (actualQuestion.actualAnswer !== undefined) {
            let nextId = JSON.parse(JSON.stringify(question.id));
            nextId++;
            let next = questions.filter(x => x.id == nextId)[0]
            if (nextId === questions.length) {
                setNextButtonDisabled(true);
            } else {
                setPreviousButtonDisabled(false);
            }
            setActualQuestion(next);
        }
    }

    const handlePreviousQuestion = () => {
        const question = JSON.parse(JSON.stringify(actualQuestion));
        let prevId = JSON.parse(JSON.stringify(question.id));
        prevId--;
        let previous = questions.filter(x => x.id == prevId)[0]
        if (prevId === questions.length) {
            setNextButtonDisabled(true);
        } else {
            setPreviousButtonDisabled(false);
        }
        setActualQuestion(previous);
    }

    const summaryExam = () => {
        let goodAnswers = 0;

        questions.map(question => {
            question.isButtonsDisabled = true;
            if (question.actualAnswer !== undefined) {

                question.possibleAnswer.filter(x => x.id == 'a')[0].gradient = ['grey', 'grey'];
                question.possibleAnswer.filter(x => x.id == 'b')[0].gradient = ['grey', 'grey'];
                question.possibleAnswer.filter(x => x.id == 'c')[0].gradient = ['grey', 'grey'];
                question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].isPicked = true;

                if (question.actualAnswer === question.goodAnswer) {
                    question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['green', 'green'];
                    setActualQuestion({...actualQuestion, question});
                    goodAnswers++;
                } else {
                    question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['red', 'red'];
                    question.possibleAnswer.filter(x => x.id == question.goodAnswer)[0].gradient = ['green', 'green'];
                    setActualQuestion({...actualQuestion, question});
                }
            }
            setGoodAnswers(goodAnswers);
        });
    }

    return (<View style={styles.container}>
        <View style={{flex: 0.09}}>
            <Header/>
        </View>

        <View style={{flex: 0.20}}>
            <ImageBackground source={require('../assets/animal_header.png')}
                             style={{width: 400, height: 75, flexDirection: 'row'}} resizeMode={"stretch"}>
                <View style={{width: 130, alignItems: 'center'}}>
                    <Text style={{color: '#2b2a29', fontWeight:'bold', paddingTop: 50}}>{actualQuestion.id}/{questions.length}</Text>
                </View>
                <View style={{width: 285, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color: '#2b2a29', fontSize: 20, fontWeight:'bold'}}>EGZAMIN</Text>
                        <View style={{width: 10}}/>
                        <Text style={{color: '#2b2a29', fontSize: 20, fontWeight:'bold'}}>{formattedTime}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>

        <View style={{
            flex: 0.5,
            width: '100%',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10
        }}>
            <View style={{paddingTop: 5}}>
                <Text style={styles.text}>{actualQuestion.value}{actualQuestion.paragraph}</Text>
            </View>
        </View>

        <View style={{flex: 1.25, width: '100%', alignItems: 'center'}}>
        <TouchableOpacity disabled={actualQuestion.isButtonsDisabled} onPress={() => handlePickUp('a')}>
            <AnswerField gradientColours={actualQuestion.possibleAnswer.filter(x => x.id === 'a')[0].gradient}
                         option={actualQuestion.possibleAnswer.filter(x => x.id === 'a')[0].id}
                         possibleAnswer={actualQuestion.possibleAnswer.filter(x => x.id === 'a')[0].value}
                         isPicked={actualQuestion.possibleAnswer.filter(x => x.id === 'a')[0].isPicked}/>
        </TouchableOpacity>
        <TouchableOpacity disabled={actualQuestion.isButtonsDisabled} onPress={() => handlePickUp('b')}>
            <AnswerField gradientColours={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].gradient}
                         option={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].id}
                         possibleAnswer={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].value}
                         isPicked={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].isPicked}/>
        </TouchableOpacity>
        <TouchableOpacity disabled={actualQuestion.isButtonsDisabled} onPress={() => handlePickUp('c')}>
            <AnswerField gradientColours={actualQuestion.possibleAnswer.filter(x => x.id === 'c')[0].gradient}
                         option={actualQuestion.possibleAnswer.filter(x => x.id === 'c')[0].id}
                         possibleAnswer={actualQuestion.possibleAnswer.filter(x => x.id === 'c')[0].value}
                         isPicked={actualQuestion.possibleAnswer.filter(x => x.id === 'c')[0].isPicked}/>
        </TouchableOpacity>
        </View>

        <View style={{flex: 0.25, width: '100%', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', paddingTop: 15}}>
                <TouchableOpacity disabled={previousDisabled} onPress={() => handlePreviousQuestion()}>
                    <Image style={{width: 100, height: 55}} source={require('../assets/lewo.png')}/>
                </TouchableOpacity>
                <View style={{width: 10}}/>
                <TouchableOpacity onPress={() => handleQuit()}>
                    <LinearGradient style={{width: 150, height: 55, alignItems: "center", justifyContent: 'center'}}
                                    colors={['#94c02b', '#71912a']}>
                        <Text style={{fontSize: 15, color: '#2b2a29',padding: 5}}>KONIEC</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={{width: 10}}/>
                <TouchableOpacity disabled={nextButtonDisabled} onPress={() => handleNextQuestion()}>
                    <Image style={{width: 100, height: 55}} source={require('../assets/prawo.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <ExamSummary isModalVisible={isSummaryVisible} good={goodAnswers} navigation={navigation} passed={isExamPassed}/>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    }, text: {
        fontSize: 15,
        color: '#98c135',
        padding: 5,
    }, button: {
        width: 300,
        height: 100,
        resizeMode: 'contain'
    }, header: {
        fontSize: 30,
        color: '#98c135'
    }
});

export default ExamPage;