import DashboardComponent from './components/Dashboard';
import DetailComponent from './components/DetailComponent';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FavouriteComponent from './components/FavouriteComponent';

const Stack = createStackNavigator();


export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardComponent} />
        <Stack.Screen name="Details" component={DetailComponent} />
        <Stack.Screen name="Favourite" component={FavouriteComponent} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
