import { withLayout } from "../hoc/withLayout"
import BoardScreen from "../screens/Board"
import HomeScreen from "../screens/Home"
import LevelDifficultScreen from "../screens/LevelDifficult"
import SplashScreen from "../screens/Splash"

export const routes = {
    Splash: withLayout(SplashScreen),
    Home: withLayout(HomeScreen),
    Level: withLayout(LevelDifficultScreen),
    Board: withLayout(BoardScreen)
}