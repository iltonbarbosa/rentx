import React from 'react';
import { Calendar as LibCalendar, LocaleConfig } from 'react-native-calendars';
import { useTheme } from 'styled-components/native';

LocaleConfig.locales['pt-br'] = {
	monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
	monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
	dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
	dayNamesShort: ['DOM', 'SEG','TER','QUA','QUI','SEX','SAB'],
	today: 'Hoje'
}

LocaleConfig.defaultLocale = 'pt-br';

export function Calendar(){
	const theme = useTheme();
  return(
	 <LibCalendar 
	 	theme={{
			 textDayFontFamily: theme.fonts.primary_400,
			 textDayHeaderFontFamily: theme.fonts.primary_500,
			 textMonthFontFamily: theme.fonts.secondary_600,
			 textDayHeaderFontSize: 10,
		 }}
		 firstDay={1}
		 minDate={new Date()}
	 />
  );
}

