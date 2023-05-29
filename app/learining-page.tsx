import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AnswerField from "./answer-field";
import {PossibleAnswer, Question, StorageObject} from "../model/model";
import {useEffect, useState} from "react";
import Header from "./header";
import EndOfModuleModal from "./end-of-module-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FromBeginningModal from "./from-begining-modal";
import {LinearGradient} from "expo-linear-gradient";
import {log} from "expo-updates/build-cli/utils/log";

const LearningPage = ({navigation}) => {
    let [isQuestionsLoaded, setIsQuestionLoaded] = useState(false);
    const [params, setParams] = useState(navigation.state);
    const [category, setCategory] = useState('');
    const [isSummaryVisible, setIsSummaryVisible] = useState(false);
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
    const [storageKey, setStorageKey] = useState('');
    const [isStorageItemsExist, setIsStorageItemsExist] = useState(false);
    const [userResponse, setUserResponse] = useState('yes');

    //After Component Mount
    useEffect(() => {
        let que = params.params.questions.map(x => Object.assign({}, x));
        que.map(a => {
            a.possibleAnswer.map(b => b.gradient = ['#94c02b', '#71912a']);
        });
        setQuestions(que);
        setCategory(params.params.categoryName);
        setStorageKey(params.params.storageKey);
    }, [params]);

    useEffect(() => {
        if (questions.length !== 0 && !isQuestionsLoaded) {
            let que = questions.map(x => Object.assign({}, x));
            que.map(a => {
                a.possibleAnswer.map(b => b.gradient = ['#94c02b', '#71912a']);
            });
            const question = questions.filter(x => x.id == 1)[0];
            setActualQuestion(question);
            setIsQuestionLoaded(true);
        } else {
            if (questions.length !== 0) {
                const question = questions.filter(x => x.actualAnswer == undefined)[0];
                setActualQuestion(question);
                setIsQuestionLoaded(true);
            }
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
            setPreviousButtonDisabled(false);
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
        question.possibleAnswer.filter(x => x.id == option)[0].gradient = ['#ffff2b', '#ffff2a'];
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
            if (next === undefined) {
                if (question.actualAnswer === question.goodAnswer) {
                    question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['#085908' , '#28a628'];
                    setIsSummaryVisible(true);
                    questions[question.id - 1].isButtonsDisabled = true
                    setQuestions(questions);
                } else {
                    question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['#500000' , '#740000'];
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
                        question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['#085908' , '#28a628'];
                        questions[id - 1].isButtonsDisabled = true
                        setQuestions(questions);
                        setActualQuestion(next);
                        storeData();
                    } else {
                        question.possibleAnswer.filter(x => x.id == question.actualAnswer)[0].gradient = ['#500000' , '#740000'];
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
        if (userResponse === 'no') {
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
            try {
                let tmpQuestions = JSON.parse(JSON.stringify(questions));
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
            if (item !== null) {
                setIsStorageItemsExist(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const readAsyncData = async () => {
        try {
            const item = await AsyncStorage.getItem(storageKey);
            if (item !== null) {
                let parsed = JSON.parse(item) as StorageObject;
                setQuestions(parsed.questions);
            }
        } catch (error) {
            console.error(error);
        }
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
                    <Text style={{color: '#2b2a29', fontSize: 15, fontWeight:'bold'}}>{category}</Text>
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
                             isPicked={false}/>
            </TouchableOpacity>
            <TouchableOpacity disabled={actualQuestion.isButtonsDisabled} onPress={() => handlePickUp('b')}>
                <AnswerField gradientColours={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].gradient}
                             option={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].id}
                             possibleAnswer={actualQuestion.possibleAnswer.filter(x => x.id === 'b')[0].value}
                             isPicked={false}/>
            </TouchableOpacity>
            <TouchableOpacity disabled={actualQuestion.isButtonsDisabled} onPress={() => handlePickUp('c')}>
                <AnswerField gradientColours={actualQuestion.possibleAnswer.filter(x => x.id === 'c')[0].gradient}
                             option={actualQuestion.possibleAnswer.filter(x => x.id === 'c')[0].id}
                             possibleAnswer={actualQuestion.possibleAnswer.filter(x => x.id === 'c')[0].value}
                             isPicked={false}/>
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
                        <Text style={styles.btnText}>KONIEC</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={{width: 10}}/>
                <TouchableOpacity disabled={nextButtonDisabled} onPress={() => handleNextQuestion()}>
                    <Image style={{width: 100, height: 55}} source={require('../assets/prawo.png')}/>
                </TouchableOpacity>
            </View>
            <EndOfModuleModal isModalVisible={isSummaryVisible}/>
            <FromBeginningModal isModalVisible={isStorageItemsExist} userResponse={sendData}/>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, text: {
        fontSize: 15,
        color: '#98c135',
        padding: 5,
    }, btnText: {
        fontSize: 15,
        color: '#2b2a29',
        padding: 5
    }, button: {
        resizeMode: 'contain'
    }, question: {
        backgroundColor: 'red'
    }, header: {
        fontSize: 30,
        color: '#98c135'
    }, learningLogo: {
        width: 170,
        height: 100,
        resizeMode: 'cover'
    }, navImage: {
        width: 50,
        height: 50
    }, navButton: {
        width: 50,
    }
});

export default LearningPage;