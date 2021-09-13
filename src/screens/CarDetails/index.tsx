import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Animated, {useSharedValue, 
				useAnimatedScrollHandler, 
				useAnimatedStyle, 
				interpolate, Extrapolate} from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { CarDTO } from '../../dtos/CarDTO';

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
   Footer
 } from './styles';


 interface Params {
	 car: CarDTO;
 }

export function CarDetails(){
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
					imagesUrl={car.photos}
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
					 <Period>{car.rent.period}</Period>
					 <Price>R$ {car.rent.price}</Price>
				 </Rent>
			 </Details>
			 
			 <Accessories>
			 	{ car.accessories.map(accessory => (
					 <Accessory 
					 	key={accessory.type}
					 	name={accessory.name} 
						icon={getAccessoryIcon(accessory.type)} />
				 ))
				}
			 </Accessories>

			 <About>{car.about} {car.about}</About>
		 </AnimatedContent>

		 <Footer>
			 <Button title="Escolher período do aluguel" onPress={handleChooseRentalPeriod} />
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
