import { useNavigation, useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO }  from 'date-fns';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../databases/model/Car';

import api from '../../services/api';


import { 
   Container,
   Header,
   Title,
   SubTitle,
   Content,
   Appointments,
   AppointmentsTitle,
   AppointmentsQuantity,
   CarWrapper,
   CarFooter,
   CarFooterTite,
   CarFooterPeriod,
   CarFooterDate,
 } from './styles';

 interface DataProps {
	id: string;
	car: ModelCar;
	start_date: string;
	end_date: string;
 }

export function MyCars(){
	const [cars, setCars] = useState<DataProps[]>([]);
	const [loading, setLoading] = useState(true);
	const screenIsFocus = useIsFocused();

	const theme = useTheme();
	const navigation = useNavigation();

	useEffect(() => {
		async function fetchCars(){
			try {
				const response = await api.get('/rentals');
				const dataFormatted = response.data.map((data: DataProps) => {
					return {
						id: data.id,
						car: data.car,
						start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
						end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
					}
				});
				setCars(dataFormatted);
			} catch (error) {
				console.log(error);
			} finally{
				setLoading(false);
			}
		}
		fetchCars();
	},[screenIsFocus]);

	function handleGoBack(){
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
			 	onPress={handleGoBack}
				color={theme.colors.shape}	 
			/>

			 <Title>
				 Seus agendamentos {'\n'}
				 estão aqui {'\n'}
			 </Title>

			 <SubTitle>
				 Conforto, segurança e praticidade.
			 </SubTitle>

		 </Header>
		{ loading ? <LoadAnimation /> :
			<Content>
			<Appointments>
				<AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
				<AppointmentsQuantity>{Car.length}</AppointmentsQuantity>				
			</Appointments>

			<FlatList 
				data={cars}
				keyExtractor={item => String(item.id)}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<CarWrapper>
						<Car data={item.car}/>
						<CarFooter>
							<CarFooterTite>Período</CarFooterTite>
							<CarFooterPeriod>
								<CarFooterDate>{item.start_date}</CarFooterDate>
								<AntDesign 
									name="arrowright"	
									size={20}
									color={theme.colors.title}
									style={{marginHorizontal: 10 }}
								/>
								<CarFooterDate>{item.end_date}</CarFooterDate>
							</CarFooterPeriod>
						</CarFooter>
					</CarWrapper>
				)}
			/>

		</Content>
		}
	 </Container>
  );
}

