import WelcomePage from "../app/welcome-page";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import StartPage from "../app/start-page";
import ActivityPage from "../app/activity-page";
import LearningPage from "../app/learning-page";


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
            screen: LearningPage,
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