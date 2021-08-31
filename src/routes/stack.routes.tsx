import React from 'react';

import { createStackNavigator  } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator ();

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';

export function StackRoutes(){
	return(
		<Navigator 
			initialRouteName="Home" 
			screenOptions={{ headerShown: false }}>

			<Screen 
				name="Home"
				component={Home}
			/>
			<Screen
				key="CarDetails"
				name="CarDetails"
				component={CarDetails}
			/>
			<Screen
				name="Scheduling"
				component={Scheduling}

			/>
			<Screen
				name="SchedulingDetails"
				component={SchedulingDetails}
			/>
			<Screen
				name="SchedulingComplete"
				component={SchedulingComplete}
			/>
			
		</Navigator>
	)
}

