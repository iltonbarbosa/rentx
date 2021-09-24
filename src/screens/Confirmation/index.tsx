import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useWindowDimensions, StatusBar } from 'react-native';
import { ConfirmButtom } from '../../components/ConfirmButtom';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { 
   Container,
   Content,
   Title,
   Message,
   Footer
 } from './styles';

 interface Params {
	 title: string;
	 message: string;
	 nextScreenRoute: string;
 }

export function Confirmation(){
	const { width } = useWindowDimensions();
	const navigation = useNavigation();
	const route = useRoute();

	const { title, message, nextScreenRoute} = route.params as Params;

	function handleConfirmRental(){
		navigation.navigate(nextScreenRoute);
	}
  return(
	 <Container>
		 <StatusBar 
		 	barStyle="light-content"
			translucent
			backgroundColor="transparent" 
		 />
		 <LogoSvg width={width} />

		 <Content>
			 <DoneSvg width={80} height={80} />
			 <Title>{title}</Title>

			 <Message>{message}</Message>
		 </Content>

		 <Footer>
			 <ConfirmButtom 
			 	title="OK"
				 onPress={handleConfirmRental} />
		 </Footer>

	 </Container>
  );
}
