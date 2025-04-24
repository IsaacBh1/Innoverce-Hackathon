import NavigationButton from "../../components/ui/NavigationButton.jsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
export default function HomeScreen() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ButtomNavigation} />
      <Tab.Screen name="Settings" component={ButtomNavigation} />
      <Tab.Screen name="Bla" component={ButtomNavigation} />
      <Tab.Screen name="Koukou" component={ButtomNavigation} />
    </Tab.Navigator>
  );
}
