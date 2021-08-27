import React from 'react';
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
  return(
	 <Container>
		 <Header>
			 <StatusBar
			 	barStyle="light-content"
				translucent
				backgroundColor="transparent"
			 />
			 <BackButton 
			 	onPress={() => {}}
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
			 <Button title="Confirmar" />
		 </Footer>
	 </Container>
  );
}

