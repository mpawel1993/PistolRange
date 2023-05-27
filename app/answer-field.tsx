import {StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const AnswerField = ({option, possibleAnswer, gradientColours}) => {

    return (<View style={{flexDirection:'row'}}>
        <View>
            <Text style={styles.answerOption}>{option.toUpperCase()}</Text>
        </View>
        <View>
            <LinearGradient style={styles.gradient}
                            colors={gradientColours == undefined ? ['white', 'white'] : gradientColours}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}>
                <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                    <View style={[{flex: 5, justifyContent:'space-evenly', marginVertical:10}]}>
                        <Text style={styles.text}>{possibleAnswer}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
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
        width: 350

    },text:{
        fontSize:15,
        color:'#2b2a29'
    },answerOption:{
        color:'white',
        fontSize:40,
        paddingLeft:10,
        backgroundColor:'black'
    }
});

export default AnswerField;