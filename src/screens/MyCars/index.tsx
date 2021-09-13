import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/CarDTO';
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

 interface CarProps {
	 id: string;
	 user_id: number;
	 car: CarDTO;
	 startDate: string;
	 endDate: string;
 }


export function MyCars(){
	const [cars, setCars] = useState<CarProps[]>([]);
	const [loading, setLoading] = useState(true);

	const theme = useTheme();
	const navigation = useNavigation();

	useEffect(() => {
		async function fetchCars(){
			try {
				const response = await api.get('schedules_byuser?user_id=1');
				setCars(response.data);
			} catch (error) {
				console.log(error);
			} finally{
				setLoading(false);
			}
		}
		fetchCars();
	},[]);

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
								<CarFooterDate>{item.startDate}</CarFooterDate>
								<AntDesign 
									name="arrowright"	
									size={20}
									color={theme.colors.title}
									style={{marginHorizontal: 10 }}
								/>
								<CarFooterDate>{item.endDate}</CarFooterDate>
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

