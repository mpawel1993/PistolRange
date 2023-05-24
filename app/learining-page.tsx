import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AnswerField from "./answer-field";
import NavigationField from "./navigation-field";
import {PossibleAnswer, Question, StorageObject} from "../model/model";
import {SetStateAction, useEffect, useState} from "react";
import Header from "./header";
import EndOfModuleModal from "./end-of-module-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FromBeginningModal from "./from-begining-modal";
const LearningPage = ({navigation}) => {
    let isQuestionsLoaded = false;

    const [params, setParams] = useState(navigation.state);
    const [category, setCategory] = useState('');
    const [isSummaryVisible, setIsSummaryVisible] = useState(false);
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
    const [storageKey, setStorageKey] = useState('');
    const [isStorageItemsExist, setIsStorageItemsExist] = useState(false);
    const [userResponse, setUserResponse] = useState('no');

    //After Component Mount
    useEffect(() => {
        let que = params.params.questions.map(x => Object.assign({}, x));
        que.map(a => {
            a.possibleAnswer.map(b => b.gradient = ['#94c02b', '#71912a']);
        });
        setQuestions(que);
        setCategory(params.params.categoryName);
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

    const handleQuit = () => {
        navigation.navigate('ActivityPage');
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
            if (next === undefined) {
                if (question.actualAnswer === question.goodAnswer) {
                    question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['green', 'green'];
                    setIsSummaryVisible(true);
                    questions[question.id - 1].isButtonsDisabled = true
                    setQuestions(questions);
                } else {
                    question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['red', 'red'];
                    setActualQuestion({...actualQuestion, question});
                }
            } else {
                if (!question.isButtonsDisabled) {
                    const id = question.id;
                    if (id === questions.length) {
                        setNextButtonDisabled(true);
                    } else {
                        setPreviousButtonDisabled(false);
                    }

                    if (question.actualAnswer === question.goodAnswer) {
                        question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['green', 'green'];
                        questions[id - 1].isButtonsDisabled = true
                        setQuestions(questions);
                        setActualQuestion(next);
                        storeData();
                    } else {
                        question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['red', 'red'];
                        setActualQuestion(question);
                    }
                } else {
                    setActualQuestion(next);
                }
            }
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

    useEffect(() => {
        if(userResponse === 'yes'){
            readAsyncData();
        }
    }, [userResponse]);

    useEffect(() => {
        if (storageKey != '') {
            checkAsyncData();
        }
    }, [storageKey]);

    const sendData = (data) => {
        setUserResponse(data)
    }

    const storeData = async () => {
        if (storageKey != '') {
            console.log(questions);
            try {
                let tmpQuestions = JSON.parse(JSON.stringify(questions));
                tmpQuestions.map(x => {
                    x.value = '';
                    x.paragraph = '';
                    x.goodAnswer = '';
                    x.possibleAnswer.map(a => {
                        a.value = '';
                    })
                });

                let forSave = {
                    questions: tmpQuestions, actualQuestion: actualQuestion
                } as StorageObject;
                await AsyncStorage.setItem(storageKey, JSON.stringify(forSave));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const checkAsyncData = async () => {
        try {
            const item = await AsyncStorage.getItem(storageKey);
            if(item !== null){
                setIsStorageItemsExist(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const readAsyncData = async () => {
        try {
            const item = await AsyncStorage.getItem(storageKey);
            if(item !== null){
                let parsed = JSON.parse(item) as StorageObject;

                parsed.questions.forEach(a => {
                    let c = questions.filter(b => b.id == a.id)[0];
                    console.log('here');
                })

            }
        } catch (error) {
            console.error(error);
        }
    }

    return (<View style={styles.container}>
        <Header/>
        <View>
            <ImageBackground source={require('../assets/learning_logo.png')} resizeMode="cover" style={styles.learningLogo}>
                <Text style={styles.text}>{category}</Text>
            </ImageBackground>
        </View>

        <View>
            <Text style={styles.text}>{actualQuestion.value}</Text>
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
        </View>
        <EndOfModuleModal isModalVisible={isSummaryVisible} />
        <FromBeginningModal isModalVisible={isStorageItemsExist} userResponse = {sendData}/>
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
    },learningLogo:{
        width:300
    }
});

export default LearningPage;