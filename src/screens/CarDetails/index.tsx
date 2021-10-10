import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo';
import {useSharedValue, useAnimatedScrollHandler, 
		useAnimatedStyle, 
		interpolate, Extrapolate} from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../databases/model/Car';
import api from '../../services/api';

import { 
   Container,
   Header,
   Details,
   Description,
   Brand,
   Name,
   Rent,
   Period,
   Price,
   About,
   Accessories,
   AnimatedHeaderAndSlider,
   AnimatedCarImages,
   AnimatedContent,
   Footer,
   OffLineInfo
 } from './styles';



 interface Params {
	 car: ModelCar;
 }

export function CarDetails(){
	const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
	const netInfo = useNetInfo();

	const navigation = useNavigation();
	const route = useRoute();
	const { car } = route.params as Params;
	const statusBarHeight = getStatusBarHeight();

	const theme = useTheme();

	const scrollY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler(event => {
		scrollY.value = event.contentOffset.y;
	});

	const headerStyleAnimation = useAnimatedStyle(() => {
		return {
			height: interpolate(
				scrollY.value,
				[0, 200],
				[200, statusBarHeight + 50],
				Extrapolate.CLAMP
			),
		}
	});

	const sliderCarsStyleAnimation = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[0, 150],
				[1, 0],
				Extrapolate.CLAMP
			)
		}
	});

	function handleChooseRentalPeriod(){
		navigation.navigate('Scheduling', {car});
	}

	function handleGoBack(){
		if(navigation.canGoBack())
			navigation.goBack();	
	}

  useEffect(() => {
	  async function fetchCarUpdated(){
		  const response = await api.get(`/cars/${car.id}`);
		  setCarUpdated(response.data);
	  }

	  if(netInfo.isConnected === true)
	  	fetchCarUpdated();
	  
  }, [netInfo.isConnected]);	

  return(
	 <Container>
		<StatusBar
			barStyle="dark-content"
			translucent
			backgroundColor="transparent"
		/> 	
		<AnimatedHeaderAndSlider
			style={headerStyleAnimation}>
			<Header>
				<BackButton onPress={handleGoBack} />
			</Header>
			<AnimatedCarImages style={sliderCarsStyleAnimation}>
				<ImageSlider 
					imagesUrl={
						!!carUpdated.photos ?
						carUpdated.photos :
							[{ id: car.thumbnail, photo: car.thumbnail}]
					}
				/>
			</AnimatedCarImages>
		</AnimatedHeaderAndSlider>	

		 <AnimatedContent
		 		onScroll={scrollHandler}
				scrollEventThrottle={16}
		 >
			 <Details>
				 <Description>
					 <Brand>{car.brand}</Brand>
					 <Name>{car.name}</Name>
				 </Description>

				 <Rent>
					 <Period>{car.period}</Period>
					 <Price>
						 R$ {netInfo.isConnected === true ? car.price : '...'}
					 </Price>
				 </Rent>
			 </Details>
			 
			 {
				carUpdated.accessories && 
				<Accessories>
					{ carUpdated.accessories.map(accessory => (
						<Accessory 
							key={accessory.type}
							name={accessory.name} 
							icon={getAccessoryIcon(accessory.type)} />
					))
					}
				</Accessories>
			 }

			 <About>{car.about} {car.about}</About>
		 </AnimatedContent>

		 <Footer>
			 <Button 
			 	title="Escolher período do aluguel" 
				onPress={handleChooseRentalPeriod}
				enabled={netInfo.isConnected === true} 
			/>
			{
				netInfo.isConnected === false &&
				<OffLineInfo>
					Conecte-se à internet para ver mais detalhes e fazer o agendamento.
				</OffLineInfo>
			}
		 </Footer>
	 </Container>
  );
}

const styles = StyleSheet.create({
	header: {
		position: 'absolute',
		overflow: 'hidden',
		zIndex: 1,
	}
})
