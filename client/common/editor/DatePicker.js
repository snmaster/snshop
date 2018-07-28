import React,{PropTypes} from 'react';
import {default as MDatePicker} from 'material-ui/DatePicker';

class DatePicker extends React.Component{
	formatDate(value){
		if(value instanceof Date)
			return value.formatAsShortDate();
		else
			return '';
	}
	render(){
		let {formatDate,...props} = this.props;
		return (
			<MDatePicker
				{...props}
				formatDate={this.formatDate}
			/>
		);
	}
}

export default DatePicker;