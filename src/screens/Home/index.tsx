import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { StackNavigationProp } from '@react-navigation/stack';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import { 
   Container,
   Header,
   HeaderContent,
   TotalCars,
   CarList
 } from './styles';

 type RootStackParamList = {
	CarDetails: undefined;
  };
  
  type HomeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'CarDetails'
  >;

export function Home(){
	const { navigate } = useNavigation<HomeScreenNavigationProp>();
	const carData = {
		brand: 'Audi',
		name: 'RS 5 Coupé',
		rent: {
			period: 'AO DIA',
			price: 120,
		},
		thumbnail: 'https://spng.pngfind.com/pngs/s/133-1331571_download-audi-png-auto-car-imag-png-images.png'
	}

return(
	<Container>
		<StatusBar
		 	barStyle="light-content"
			backgroundColor="transparent"
			translucent
		 />
		<Header>
			<HeaderContent>
				<Logo 
					width = {RFValue(108)}
					height = {RFValue(12)}
				/>
				<TotalCars>
					Total de 12 carros
				</TotalCars>
			</HeaderContent>
		</Header>

		<CarList
			data={[1,2,3]}
			keyExtractor={item => String(item)}
			renderItem={({ item }) => 
				<Car data={carData}
				onPress={() => navigate('CarDetails')}/>}
		/>
	</Container>
	);
}

