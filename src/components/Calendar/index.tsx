import React from 'react';
import { Calendar as LibCalendar, 
		LocaleConfig,
		DateCallbackHandler
	} from 'react-native-calendars';
import { useTheme } from 'styled-components/native';
import { generateInterval } from './generateInterval';
import { ptBR } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
	[date: string]: {
		color: string;
		textColor: string;
		disabled?: boolean;
		disableTouchEvent?: boolean;
	}
}

interface DayProps {
	dateString: string;
	day: number;
	month: number;
	year: number;
	timestamp: number;
}

interface CalendarProps {
	markedDates: MarkedDateProps;
	onDayPress:  DateCallbackHandler;
}

function Calendar({markedDates, onDayPress }: CalendarProps){
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
		 markingType="period"
		 markedDates={markedDates}
		 onDayPress={onDayPress}
	 />
  );
}

export {
	Calendar,
	MarkedDateProps,
	DayProps,
	generateInterval
}

