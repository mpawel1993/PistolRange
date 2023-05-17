import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AnswerField from "./answer-field";
import NavigationField from "./navigation-field";
import {PossibleAnswer, Question} from "../model/model";
import {useEffect, useRef, useState} from "react";
import ExamSummary from "./exam-summary";

const ExamPage = ({navigation}) => {
    const [time, setTime] = useState(1800|| 10);
    const [formattedTime, setFormattedTime] = useState('30min: 0 sec');
    const timerRef = useRef(time);
    let isQuestionsLoaded = false;
    const [params, setParams] = useState(navigation.state);
    const [questions, setQuestions] = useState([] as Question[]); //Filtered questions list
    const [actualQuestion, setActualQuestion] = useState({//Actual Loaded Questions
        id:1,
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

    //After Component Mount
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
    }

    const handlePickUp = (option) => {
        let question = actualQuestion;
        question.actualAnswer = undefined;
        question.possibleAnswer.map(x => x.gradient = ['#94c02b', '#71912a']);
        setActualQuestion({...actualQuestion, question});
        question.possibleAnswer.filter(x => x.id == option)[0].gradient = ['yellow', 'yellow'];
        question.actualAnswer = option;
        setActualQuestion({...actualQuestion, question});
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
        const id = actualQuestion.id;
        let prevId = JSON.parse(JSON.stringify(id));
        prevId--;
        let previous = questions.filter(x => x.id == prevId)[0]

        if (id === questions.length) {
            setNextButtonDisabled(true);
        } else {
            setPreviousButtonDisabled(false);
        }

        setActualQuestion(previous);
    }

    const summaryExam = () =>{
        let goodAnswers = 0;
        let badAnswers = 0;

        questions.forEach(question => {
            question.isButtonsDisabled = true;
            if(question.actualAnswer !== undefined){
                if (question.actualAnswer === question.goodAnswer) {
                    question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['green', 'green'];
                    goodAnswers++;
                    setQuestions(questions);
                } else {
                    question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['red', 'red'];
                    badAnswers++;
                    setActualQuestion({...actualQuestion, question});
                }
            }
        });
        let er = goodAnswers == 10 ? 'ZALICZONY' : 'NIEZALICZONY';
        goodAnswers == 10 ? setIsExamPassed(true) : setIsExamPassed(false);

        setFinalInfo(`Dobrze: ${goodAnswers} , Zle ${10 - goodAnswers}, Rezultat: ${er}` )
    }

    return (<View style={styles.container}>
        <Text style={styles.header}>EGZAMIN({actualQuestion.id}/{questions.length})</Text>
        <View>
            <Text style={styles.text}>{formattedTime}</Text>
        </View>
        <View>
            <Text style={styles.text}> {actualQuestion.value}</Text>
        </View>

        <TouchableOpacity disabled={actualQuestion.isButtonsDisabled} onPress={() => handlePickUp('a')}>
            <AnswerField gradientColours={actualQuestion.possibleAnswer.filter(x => x.id === 'a')[0].gradient}
                         option={actualQuestion.possibleAnswer.filter(x => x.id === 'a')[0].id}
                         possibleAnswer={actualQuestion.possibleAnswer.filter(x => x.id === 'a')[0].value}/>
        </TouchableOpacity>
        <TouchableOpacity disabled={actualQuestion.isButtonsDisabled} onPress={() => handlePickUp('b')}>
            <AnswerField gradientColours={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].gradient}
                         option={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].id}
                         possibleAnswer={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].value}/>
        </TouchableOpacity>
        <TouchableOpacity disabled={actualQuestion.isButtonsDisabled} onPress={() => handlePickUp('c')}>
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
            <ExamSummary isModalVisible={isSummaryVisible} finalInfo={finalInfo} navigation={navigation} passed={isExamPassed}/>
        </View>

    </View>)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },text: {
        fontSize: 20,
        color: '#98c135',
        padding: 5
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