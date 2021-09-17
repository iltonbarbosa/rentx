import React from 'react';

import { createStackNavigator  } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator ();

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { Signin } from '../screens/Signin';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';

export function StackRoutes(){
	return(
		<Navigator 
			initialRouteName="Signin" 
			screenOptions={{ headerShown: false }}>

			<Screen 
				name="Signin"
				component={Signin}
			/>
			<Screen 
				name="SignUpFirstStep"
				component={SignUpFirstStep}
			/>
			<Screen 
				name="Home"
				component={Home}
				options={{ gestureEnabled: false }}
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
			<Screen
				name="MyCars"
				component={MyCars}
			/>
			
		</Navigator>
	)
}

