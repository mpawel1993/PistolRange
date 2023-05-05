import WelcomePage from "../app/welcome-page";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import StartPage from "../app/start-page";
import ActivityPage from "../app/activity-page";
import SetOfQuestionsPage from "../app/set-of-questions-page";
import LeariningPage from "../app/learining-page";
import ExamPage from "../app/exam-page";


const HomeStack = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                headerShown: false,
                animationEnabled: false
            },
        },
        StartPage: {
            screen: StartPage,
            navigationOptions: {
                headerShown: false,
                animationEnabled: false
            },
        },
        ActivityPage: {
            screen: ActivityPage,
            navigationOptions: {
                headerShown: false,
                animationEnabled: false
            },
        },
        LearningPage: {
            screen: LeariningPage,
            navigationOptions: {
                headerShown: false,
                animationEnabled: false
            },
        },
        SetOfQuestionsPage: {
            screen: SetOfQuestionsPage,
            navigationOptions: {
                headerShown: false,
                animationEnabled: false
            },
        },
        ExamPage: {
            screen: ExamPage,
            navigationOptions: {
                headerShown: false,
                animationEnabled: false
            },
        }
    },
    {
        transparentCard: true
    }
);
export default createAppContainer(HomeStack);