import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

declare global {
	namespace ReactNavigation {
		interface RootParamList {
			Home: string;
			Signin: string;
			SignUpFirstStep: string;
			SignUpSecondStep: {};
			CarDetails: {};
			Scheduling: {};
			SchedulingDetails: {};
			SchedulingComplete: string;
			MyCars: string;
			Confirmation: {nextScreenRoute: string, title: string;message:string};
			
		}
	}
}

export function Routes(){
	const { user } = useAuth();
  return(
	 <NavigationContainer>
		 {user.id ? <AppTabRoutes /> : <AuthRoutes />}
	 </NavigationContainer>
  );
}

