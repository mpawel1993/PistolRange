import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Field from "./field";
import {Question} from "../model/model";
import {LinearGradient} from "expo-linear-gradient";

const SetOfQuestionsPage = ({navigation}) => {

    const baseQuestions: Question[] = JSON.parse(JSON.stringify(require('../assets/questionList.json')));

    let categories = ['WSZYSTKIE', 'USTAWA O BRONI I AMUNICJI', 'PRZECHOWYWANIE I NOSZENIE BRONI',
        'PRZEWOŻENIE BRONI ŚRODKAMI TRANSPORTU PUBLICZNEGO', 'BEZPIECZENSTWO NA STRZELNICACH', 'SANKCJE KARNE',
        'OBRONA KONIECZNA I STAN WYŻSZEJ KONIECZNOŚCI'];

    const handleNavigateToAll = (categoryName) => {
        let storageKey = 'all';
        navigation.navigate('LearningPage', {
            questions: baseQuestions,
            categoryName: categoryName,
            storageKey: storageKey
        });
    }

    const handleNavigateToActOfGunAndAmmo = (categoryName) => {
        let storageKey = 'ActOfGunAndAmmo';
        let set1 = baseQuestions.filter(x => x.id > 0 && x.id <= 145);
        let set2 = baseQuestions.filter(x => x.id >= 154 && x.id <= 158);
        let set3 = baseQuestions.filter(x => x.id >= 164 && x.id <= 169);
        let actual = [...set1, ...set2, ...set3];
        assignId(actual);
        navigation.navigate('LearningPage', {questions: actual, categoryName: categoryName, storageKey: storageKey});
    }

    const handleNavigationToCarryGun = (categoryName) => {
        let storageKey = 'CarryGun';
        let actual = baseQuestions.filter(x => x.id >= 146 && x.id <= 153);
        assignId(actual);
        navigation.navigate('LearningPage', {questions: actual, categoryName: categoryName, storageKey: storageKey});
    }

    const handleNavigationToPublicTransport = (categoryName) => {
        let storageKey = 'PublicTransport';
        let actual = baseQuestions.filter(x => x.id >= 159 && x.id <= 163);
        assignId(actual);
        navigation.navigate('LearningPage', {questions: actual, categoryName: categoryName, storageKey: storageKey});
    }

    const handleNavigationToSafetyOnShootingRange = (categoryName) => {
        let storageKey = 'SafetyOnShootingRange';
        let actual = baseQuestions.filter(x => x.id >= 170 && x.id <= 184);
        assignId(actual);
        navigation.navigate('LearningPage', {questions: actual, categoryName: categoryName, storageKey: storageKey});
    }

    const handleNavigationToCriminalSanctions = (categoryName) => {
        let storageKey = 'CriminalSanctions';
        let set1 = baseQuestions.filter(x => x.id >= 185 && x.id <= 193);
        let set2 = baseQuestions.filter(x => x.id >= 197 && x.id <= 200);
        let actual = [];
        actual = [...set1, ...set2];
        assignId(actual);
        navigation.navigate('LearningPage', {questions: actual, categoryName: categoryName, storageKey: storageKey});
    }

    const handleNavigationToSelfDefence = (categoryName) => {
        let storageKey = 'SelfDefence';
        let actual = baseQuestions.filter(x => x.id >= 194 && x.id <= 196);
        assignId(actual)
        navigation.navigate('LearningPage', {questions: actual, categoryName: categoryName, storageKey: storageKey});
    }

    const assignId = (array: any[]) => {
        let index = 1;
        array.forEach(a => {
            a.id = index;
            index++;
        });
    }

    const navigateToActivityPage = () => {
        navigation.navigate('ActivityPage');
    }

    return (<View style={styles.container}>
        <Image source={require('../assets/learning_image.png')} style={styles.button}/>
        <TouchableOpacity onPress={() => handleNavigateToActOfGunAndAmmo(categories[1])}>
            <Field text={categories[1]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationToCarryGun(categories[2])}>
            <Field text={categories[2]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationToPublicTransport(categories[3])}>
            <Field text={categories[3]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationToSafetyOnShootingRange(categories[4])}>
            <Field text={categories[4]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationToCriminalSanctions(categories[5])}>
            <Field text={categories[5]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationToSelfDefence(categories[6])}>
            <Field text={categories[6]}/>
        </TouchableOpacity>

        <View style={styles.back}>
            <View>
                <TouchableOpacity onPress={() => navigateToActivityPage()}>
                    <ImageBackground style={{width: 100, height: 100}} source={require('../assets/back_set.png')}/>
                </TouchableOpacity>
            </View>
            <View style={{width: 10}}>
            </View>
            <View>
                <TouchableOpacity onPress={() => handleNavigateToAll(categories[0])}>
                    <LinearGradient colors={['#94c02b', '#71912a']} style={styles.gradient}>
                        <Text style={{fontSize: 20,fontFamily:'Bahnschrift'}}>{categories[0]}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    }, text: {
        fontSize: 20,
        color: 'white'
    }, button: {
        width: 300,
        height: 50,
        resizeMode: 'contain'
    }, back: {
        paddingTop: 3,
        flexDirection: 'row',
    }, gradient: {
        width: 270,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#94c02b',
        fontWeight: 'bold'
    }
});

export default SetOfQuestionsPage;