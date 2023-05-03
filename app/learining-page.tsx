import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AnswerField from "./AnswerField";
import Field from "./Field";
import NavigationField from "./navigation-field";

const LearningPage = ({ navigation }) =>{

    const handlePickUp =(option) => {
        console.log('Picked Up');
    }

    return(<View style={styles.container}>
        <Text style={styles.header}>Nauka</Text>
        <View>
            <Text style={styles.text}>1.Bronią, w rozumieniu ustawy o broni i amunicji, nie jest: (art. 4 ust. 1 uobia)</Text>
        </View>

        <TouchableOpacity onPress={() => handlePickUp('a')}>
            <AnswerField option={'A'} possibleAnswer={'broń palna'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePickUp('b')}>
            <AnswerField option={'B'} possibleAnswer={'broń pneumatyczna'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePickUp('c')} id={'elo'}>
            <AnswerField option={'C'} possibleAnswer={'broń ostra'}/>
        </TouchableOpacity>

        <TouchableOpacity>
            <NavigationField text={'NASTĘPNE'}/>
        </TouchableOpacity>

        <TouchableOpacity>
            <NavigationField text={'POPRZEDNIE'}/>
        </TouchableOpacity>
        <TouchableOpacity>
            <NavigationField text={'KONIEC'}/>
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