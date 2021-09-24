import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard, Alert,
		TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';	

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import { 
   Container,
   Header,
   Steps,
   Title,
   SubTitle,
   Form,
   FormTitle
 } from './styles';


export function SignUpFirstStep(){
	const navigation = useNavigation();
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ driverLicence, setDriverLicence ] = useState('');

	function handleBack(){
		navigation.goBack();
	}


	async function handleNextStep(){
		try {
			const schema = Yup.object().shape({
				driverLicence: Yup.string()
				.required('O documento é obrigatório.'),
				email: Yup.string()
					.required('E-mail obrigatório.')
					.email('Digite um e-mail válido.'),		
				name: Yup.string()
					.required('O nome é obrigatório.')
					.min(5, 'informe no mínimo 5 caracteres.')	
			});
			
			const data = { name, email, driverLicence }
			await schema.validate(data);

			navigation.navigate('SignUpSecondStep', {user: data });
			
		} catch (error) {
			if(error instanceof Yup.ValidationError){
				Alert.alert('Opa', error.message);
			}else{
				Alert.alert('Opa', 'Ocorreu erro de cadastro.');
			}
		}

	}

  return(
	<KeyboardAvoidingView behavior="position" enabled>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<Header>
					<BackButton onPress={handleBack} />
					<Steps>
						<Bullet active/>
						<Bullet/>
					</Steps>	
				</Header>

				<Title>
					Crie sua{'\n'}conta
				</Title>

				<SubTitle>
					Faça seu cadastro{'\n'}
					de forma rápida e fácil.
				</SubTitle>

				<Form>
					<FormTitle>1. Dados</FormTitle>
					<Input
						iconName="user"
						placeholder="Nome"
						onChangeText={setName}
						value={name}
					/>
					<Input
						iconName="mail"
						placeholder="E-mail"
						keyboardType="email-address"
						onChangeText={setEmail}
						value={email}
					/>
					<Input
						iconName="credit-card"
						placeholder="CNH"
						keyboardType="numeric"
						value={driverLicence}
						onChangeText={setDriverLicence}
					/>
				</Form>

				<Button
					title="Próximo"
					onPress={handleNextStep}
				/>

			</Container>
		</TouchableWithoutFeedback>
	 </KeyboardAvoidingView>
 );
}
