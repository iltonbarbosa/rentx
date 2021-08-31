import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import ArrowSvg from '../../assets/arrow.svg';
import { Calendar } from '../../components/Calendar';

import { 
   Container,
   Header,
   Title,
   RentalPeriod,
   DateInfo,
   DateTitle,
   DateValue,
   DateValueContainer,
   Content,
   Footer,
 } from './styles';




export function Scheduling(){
	const theme = useTheme();
	const navigation = useNavigation();

	function handleConfirmRental(){
		navigation.navigate('SchedulingDetails');
	}

	function handleBack(){
		navigation.goBack();	
	}

  return(
	 <Container>
		 <Header>
			 <StatusBar
			 	barStyle="light-content"
				translucent
				backgroundColor="transparent"
			 />
			 <BackButton 
			 	onPress={handleBack}
				color={theme.colors.shape}	 
			/>

			 <Title>
				 Escolha uma {'\n'}
				 data de início e {'\n'}
				 fim do aluguel
			 </Title>

			 <RentalPeriod>
				 <DateInfo>
					 <DateTitle>DE</DateTitle>
					 <DateValueContainer selected={false}>
					 	<DateValue></DateValue>
					</DateValueContainer>
				 </DateInfo>

				 <ArrowSvg />

				 <DateInfo>
					 <DateTitle>ATÉ</DateTitle>
					 <DateValueContainer selected={false}>
					 	<DateValue></DateValue>
					 </DateValueContainer>	 
				 </DateInfo>

			 </RentalPeriod>
		 </Header>

		 <Content>
			<Calendar />
		 </Content>
		 <Footer>
			 <Button title="Confirmar"
			 onPress={handleConfirmRental} />
		 </Footer>
	 </Container>
  );
}

