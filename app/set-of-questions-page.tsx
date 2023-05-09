import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Field from "./field";
import {Question} from "../model/model";

const SetOfQuestionsPage = ({navigation}) => {

    const baseQuestions: Question[] = JSON.parse(JSON.stringify(require('../assets/questionList.json')));

    function handleNavigateToAll() {
        navigation.navigate('LearningPage', {questions: baseQuestions});
    }

    function handleNavigateToActOfGunAndAmmo() {
        let set1 = baseQuestions.filter(x => x.id > 0 && x.id <= 145);
        let set2 = baseQuestions.filter(x => x.id >= 154 && x.id <= 158);
        let set3 = baseQuestions.filter(x => x.id >= 164 && x.id <= 169);
        let actual = [...set1, ...set2, ...set3];
        assignId(actual);
        navigation.navigate('LearningPage', {questions: actual});
    }

    const handleNavigationToCarryGun = () => {
        let actual = baseQuestions.filter(x => x.id >= 146 && x.id <= 153);
        assignId(actual);
        navigation.navigate('LearningPage', {questions: actual});
    }

    const handleNavigationToPublicTransport = () => {
        let actual = baseQuestions.filter(x => x.id >= 159 && x.id <= 163);
        assignId(actual);
        navigation.navigate('LearningPage', {questions: actual});
    }

    const handleNavigationToSafetyOnShootingRange = () => {
        let actual = baseQuestions.filter(x => x.id >= 170 && x.id <= 184);
        assignId(actual);
        navigation.navigate('LearningPage', {questions: actual});
    }

    const handleNavigationToCriminalSanctions = () => {
        let set1 = baseQuestions.filter(x => x.id >= 185 && x.id <= 193);
        let set2 = baseQuestions.filter(x => x.id >= 197 && x.id <= 200);
        let actual = [];
        actual = [...set1, ...set2];
        assignId(actual);
        navigation.navigate('LearningPage', {questions: actual});
    }

    const handleNavigationToSelfDefence = () => {
        let actual = baseQuestions.filter(x => x.id >= 194 && x.id <= 196);
        assignId(actual)
        navigation.navigate('LearningPage', {questions: actual});
    }

    const assignId = (array: any[]) => {
        let index = 1;
        array.forEach(a => {
            a.id = index;
            index++;
        });
    }

    return (<View style={styles.container}>
        <TouchableOpacity onPress={() => handleNavigateToAll()}>
            <Field text={'Wszystkie'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigateToActOfGunAndAmmo()}>
            <Field text={'Ustawa o Broni i Amunicji'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationToCarryGun()}>
            <Field text={'Przechowywanie i noszenie Broni'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationToPublicTransport()}>
            <Field text={'Przewożenie broni środkami transportu publicznego'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationToSafetyOnShootingRange()}>
            <Field text={'Bezpieczenstwo na strzelnicach'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationToCriminalSanctions()}>
            <Field text={'Sankcje Karne Pytania'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationToSelfDefence()}>
            <Field text={'Obrona Konieczna i Stan Wyższej Konieczności'}/>
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
        height:50,
        resizeMode: 'contain'
    }
});

export default SetOfQuestionsPage;