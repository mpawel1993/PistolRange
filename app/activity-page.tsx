import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const ActivityPage = ({ navigation }) =>{

    const navigateToSetOfQuestions = () => {
        navigation.navigate('SetOfQuestionsPage');
    }

    const navigateToExam = () => {
        console.log('Activity Page');
    }

    return(<View style={styles.container}>
        <TouchableOpacity onPress={()=>navigateToSetOfQuestions()}>
            <Image source={require('../assets/learning.png')} style={styles.button}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigateToExam()}>
            <Image source={require('../assets/exam.png')} style={styles.button}/>
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
        resizeMode: 'contain'
    }
});

export default ActivityPage;