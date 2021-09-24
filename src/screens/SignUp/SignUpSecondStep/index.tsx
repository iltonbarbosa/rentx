import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard,Alert,
		TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';		

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import { useTheme } from 'styled-components';
import api from '../../../services/api';

import { 
   Container,
   Header,
   Steps,
   Title,
   SubTitle,
   Form,
   FormTitle
 } from './styles';


interface Params {
	user: {
		name: string;
		email: string;
		driverLicence: string;
	}
} 


export function SignUpSecondStep(){
	const navigation = useNavigation();
	const route = useRoute();
	const theme = useTheme();
	const [loading, setLoading] = useState(false);

	const [ password, setPassword ] = useState('');
	const [ passwordConfirm, setPasswordConfirm ] = useState('');

	const { user } = route.params as Params;

	async function handleRegister(){
		setLoading(true);
		try {
			const schema = Yup.object().shape({
				password: Yup.string()
					.required('A senha é obrigatória.')
					.min(4, 'Informe pelo menos 4 caracteres ou números.'),
				passwordConfirm: Yup.string()
					.required('Confirme a senha.')		
			});

			if(password != passwordConfirm){
				setLoading(false);
				return Alert.alert('Informe a mesma senha em ambos os campos.')
				
			}
	
			await schema.validate({ password, passwordConfirm });

			await api.post('/users', {
				name: user.name,
				email: user.email,
				driver_license: user.driverLicence,
				password
			})
			.then(() => {
				navigation.navigate('Confirmation', {
					nextScreenRoute: 'SignIn',
					title: 'Conta Criada com sucesso!',
					message: `Agora é só fazer o login\ne aproveitar`
				});
			})
			.catch((error) => {
				setLoading(false);
				console.log("erro: "+error);
				Alert.alert('Opa', 'Erro no cadastro de usuário!');
			})
			
		} catch (error) {
			if(error instanceof Yup.ValidationError){
				Alert.alert('Opa', error.message);
			}else{
				Alert.alert('Opa', 'Ocorreu erro de login, verifique as credenciais');
			}
		}

	}

	function handleBack(){
		navigation.goBack();
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
					<FormTitle>2. Senha</FormTitle>
						<PasswordInput
							iconName="lock"
							placeholder="Senha"
							onChangeText={setPassword}
							value={password}
						/>
						<PasswordInput
							iconName="lock"
							placeholder="Repetir senha"
							onChangeText={setPasswordConfirm}
							value={passwordConfirm}
						/>
				</Form>

				<Button
					color={theme.colors.success}
					title="Cadastrar"
					onPress={handleRegister}
					enabled={!loading}
					loading={loading}
				/>

			</Container>
		</TouchableWithoutFeedback>
	 </KeyboardAvoidingView>
 );
}
