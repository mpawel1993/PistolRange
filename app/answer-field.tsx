import {StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const AnswerField = ({option, possibleAnswer, gradientColours}) => {

    return (<View style={styles.container}>
        <LinearGradient style={styles.gradient}
                        colors={gradientColours == undefined ? ['blue', 'blue'] : gradientColours}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}>
            <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                <View style={[{flex: 1, flexDirection: 'row'}]}>
                    <Text style={styles.answerOption}>{option.toUpperCase()}</Text>
                </View>
                <View style={[{flex: 5, justifyContent:'space-evenly', marginVertical:10}]}>
                    <Text style={styles.text}>{possibleAnswer}</Text>
                </View>
            </View>
        </LinearGradient>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        padding:3
    },
    gradient:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'#fefefe',
        borderRadius:10,
        height:100,
        width: 300

    },text:{
        fontSize:20,
        color:'#2b2a29'
    },answerOption:{
        color:'white',
        fontSize:40,
        paddingLeft:10
    }
});

export default AnswerField;