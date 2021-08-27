import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';

import { 
   Container,
   Details,
   Brand,
   Name,
   About,
   Rent,
   Periodo,
   Price,
   Type,
   CarImage,
 } from './styles';

 interface CarData {
	 brand: string;
	 name: string;
	 rent: {
		 period: string;
		 price: number;
	 },
	 thumbnail: string;
 }

 interface Props extends RectButtonProps {
	 data: CarData;
 }

export function Car({ data, ...rest } : Props){
  return(
	 <Container {...rest }>
		 <Details>
			 <Brand>{data.brand}</Brand>
			 <Name>{data.name}</Name>

			 <About>
				 <Rent>
					 <Periodo>{data.rent.period}</Periodo>
					 <Price>{`RS ${data.rent.price}`}</Price>
				 </Rent>

				 <Type>
					<GasolineSvg />
				 </Type>
			 </About>
		 </Details>

		 <CarImage 
		 	source={{ uri: data.thumbnail}}
			resizeMode="contain"	 
		/>
	 </Container>
  );
}

