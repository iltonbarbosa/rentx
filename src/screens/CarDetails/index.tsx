import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import { 
   Container,
   Header,
   CarImages,
   Content,
   Details,
   Description,
   Brand,
   Name,
   Rent,
   Period,
   Price,
   About,
   Acessories
 } from './styles';

export function CarDetails(){
  return(
	 <Container>
		 <Header>
			 <BackButton onPress={() => {}} />

		 </Header>
		 <CarImages>
		 	<ImageSlider imagesUrl={['https://spng.pngfind.com/pngs/s/133-1331571_download-audi-png-auto-car-imag-png-images.png']}/>
		 </CarImages>

		 <Content>
			 <Details>
				 <Description>
					 <Brand>Lamborghini</Brand>
					 <Name>Huracan</Name>
				 </Description>

				 <Rent>
					 <Period>Ao dia</Period>
					 <Price>R$ 580</Price>
				 </Rent>
			 </Details>
			 
			 <Acessories>
			 	<Accessory name="380km/h" icon={speedSvg} />
				 <Accessory name="3.2s" icon={accelerationSvg} />
				 <Accessory name="800 HP" icon={forceSvg} />
				 <Accessory name="Gasolina" icon={gasolineSvg} />
				 <Accessory name="Auto" icon={exchangeSvg} />
				 <Accessory name="2 pessoas" icon={peopleSvg} />
			 </Acessories>

			 <About>
				 Este é um automóvel desportivo. Surgiu do lendário touro de lide indultado
				 na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
			 </About>
		 </Content>
	 </Container>
  );
}

