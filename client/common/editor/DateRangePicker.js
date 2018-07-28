import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';

class DateRangePicker extends React.Component {
    constructor() {
        super(...arguments);

        let now = new Date();
        this.from = now.startOfDay();
        this.to = now.endOfDay();
        this.intervals = [{
            text: 'Custom',
            from: null,
            to: null
        }, {
            text: 'Today',
            from: now.clone().startOfDay(),
            to: now.clone().endOfDay()
        }, {
            text: 'This Week',
            from: now.clone().startOfWeek(),
            to: now.clone().endOfWeek()
        }, {
            text: 'This Month',
            from: now.clone().startOfMonth(),
            to: now.clone().endOfMonth()
        }, {
            text: 'This Quarter',
            from: now.clone().startOfQuarter(),
            to: now.clone().endOfQuarter()
        }, {
            text: 'This Year',
            from: now.clone().startOfYear(),
            to: now.clone().endOfYear()
        }, {
            text: 'Yesterday',
            from: now.clone().yesterday().startOfDay(),
            to: now.clone().yesterday().endOfDay()
        }, {
            text: 'Last Week',
            from: now.clone().lastWeek().startOfWeek(),
            to: now.clone().lastWeek().endOfWeek()
        }, {
            text: 'Last Month',
            from: now.clone().lastMonth(),
            to: now.clone().lastMonth().endOfMonth()
        }, {
            text: 'Last Quarter',
            from: now.clone().lastQuarter(),
            to: now.clone().lastQuarter().endOfQuarter()
        }, {
            text: 'Last Year',
            from: now.clone().lastYear(),
            to: now.clone().lastYear().endOfYear()
        }, {
            text: 'Last 7 Days',
            from: now.clone().addDays(-6).startOfDay(),
            to: now.clone().endOfDay()
        }, {
            text: 'Last 30 Days',
            from: now.clone().addDays(-29).startOfDay(),
            to: now.clone().endOfDay()
        }, {
            text: 'Last 90 Days',
            from: now.clone().addDays(-89).startOfDay(),
            to: now.clone().endOfDay()
        }, {
            text: 'Last 365 Days',
            from: now.clone().addDays(-354).startOfDay(),
            to: now.clone().endOfDay()
        }, {
            text: 'Tomorrow',
            from: now.clone().tomorrow().startOfDay(),
            to: now.clone().tomorrow().endOfDay()
        }, {
            text: 'Next Week',
            from: now.clone().nextWeek().startOfWeek(),
            to: now.clone().nextWeek().endOfWeek()
        }, {
            text: 'Next Month',
            from: now.clone().nextMonth(),
            to: now.clone().nextMonth().endOfMonth()
        }, {
            text: 'Next Quarter',
            from: now.clone().nextQuarter(),
            to: now.clone().nextQuarter().endOfQuarter()
        }, {
            text: 'Next Year',
            from: now.clone().nextYear(),
            to: now.clone().nextYear().endOfYear()
        }];
        this.state = { isOpen: false, selectedInterval: this.intervals[0] };
    }
    handleChange(value) {
        if (value.text != "Custom") {
            this.from = value.from;
            this.to = value.to;
        }
        this.setState({ selectedInterval: value });

    }
    handleOpen() {
        if (this.props.value && this.props.value.from)
            this.from = this.props.value.from;
        if (this.props.value && this.props.value.to)
            this.to = this.props.value.to;
        this.setState({ isOpen: true });
    }
    handleCancel() {
        this.setState({ isOpen: false });
    }
    handleSubmit() {
        let error = false;
        let fromErrorText = "";
        let toErrorText = "";
        if (this.props.min) {
            let min = this.props.min.clone().startOfDay();
            if (this.from < min) {
                fromErrorText = 'Minimum allowed value is ' + min.formatAsShortDate();
                error = true;
            }
            if (this.to < min) {
                toErrorText = 'Minimum allowed value is ' + min.formatAsShortDate();
                error = true;
            }
        }
        if (this.props.max) {
            let max = this.props.max.clone().endOfDay();
            if (this.from > max) {
                fromErrorText = 'Maximum allowed value is ' + max.formatAsShortDate();
                error = true;
            }
            if (this.to > max) {
                toErrorText = 'Maximum allowed value is ' + max.formatAsShortDate();
                error = true;
            }
        }

        this.setState({ fromErrorText: fromErrorText, toErrorText: toErrorText });

        if (!error && this.props.onChange) {
            this.setState({ isOpen: false });
            this.props.onChange({ from: this.from.startOfDay(), to: this.to.endOfDay() });
        }
    }



    render() {
        let start = this.from.formatAsShortDate();
        let end = this.to.formatAsShortDate();
        if (!this.state.isOpen) {
            start = this.props.value && this.props.value.from ? this.props.value.from.formatAsShortDate() : '';
            end = this.props.value && this.props.value.to ? this.props.value.to.formatAsShortDate() : '';
        }
        const actions = [
            <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel.bind(this)}
      />,
            <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
        ];
        let wrapperStyle = this.props.wrapperStyle ? this.props.wrapperStyle : {};
        wrapperStyle.display = wrapperStyle.display? wrapperStyle.display:'inline-block';
        wrapperStyle.width = wrapperStyle.width? wrapperStyle.width:'256px';

        return (

            <div style={wrapperStyle} className={this.props.className}>
                <TextField  onFocus={this.handleOpen.bind(this)} value = {start && end ? start + ' - ' + end : ''}
                    defaultValue={this.props.defaultValue}
                    disabled = {this.props.disabled}
                    errorStyle = {this.props.errorStyle}
                    errorText = {this.props.errorText}
                    floatingLabelFixed={this.props.floatingLabelFixed}
                    floatingLabelFocusStyle = {this.props.floatingLabelFocusStyle}
                    floatingLabelStyle={this.props.floatingLabelStyle}
                    floatingLabelText={this.props.floatingLabelText}
                    fullWidth={true}
                    hintStyle={this.props.hintStyle}
                    hintText={this.props.hintText}
                    id={this.props.id}
                    inputStyle={this.props.inputStyle}
                    multiLine={this.props.multiLine}
                    name={this.props.name}
                    rows={this.props.rows}
                    rowsMax={this.props.rowsMax}
                    style={this.props.style}
                    textareaStyle={this.props.textareaStyle}
                    type={this.props.type}
                    underlineDisabledStyle={this.props.underlineDisabledStyle}
                    underlineFocusStyle={this.props.underlineFocusStyle}
                    underlineShow={this.props.underlineShow}
                    underlineStyle = {this.props.underlineStyle}
                >
                </TextField>
                <Dialog 
                title="Date Range" 
                actions={actions}
                model={true}
                open={this.state.isOpen}
                style={{padding:'0'}}
                contentStyle={{width:'15em'}}
                >
                    <RadioButtonGroup onChange={(e,v)=>{this.handleChange(v);}} valueSelected={this.state.selectedInterval} style={{maxHeight:'15em',height:'15em',overflow:'auto'}} name="interval" defaultSelected={this.intervals[0]}>
                        {
                            this.intervals.map(i=>{
                                return (<RadioButton key={i.text} value={i} label={i.text} />);
                            })
                        }
                    </RadioButtonGroup>
                    <div>
                        <DatePicker errorText={this.state.fromErrorText}  minDate={this.props.min} maxDate={this.props.max} textFieldStyle={{width:'100%'}} onChange={(e,v)=>{this.from=v.startOfDay();this.handleChange(this.intervals[0]);}} formatDate={(date)=>(date.formatAsShortDate())} floatingLabelText="From" name="fromDate" value={this.from}/>
                        <DatePicker errorText={this.state.toErrorText} minDate={this.props.min} maxDate={this.props.max} textFieldStyle={{width:'100%'}} onChange={(e,v)=>{this.to=v.endOfDay();this.handleChange(this.intervals[0]);}} formatDate={(date)=>(date.formatAsShortDate())} floatingLabelText="To" name="toDate" value={this.to}/>
                    </div>
                </Dialog>
            </div>
        );

    }
}

DateRangePicker.PropTypes = {
    value: PropTypes.shape({
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date)
    }).isRequired,
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    children: PropTypes.node,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    errorStyle: PropTypes.object,
    errorText: PropTypes.node,
    floatingLabelFixed: PropTypes.bool,
    floatingLabelFocusStyle: PropTypes.object,
    floatingLabelStyle: PropTypes.object,
    floatingLabelText: PropTypes.node,
    hintStyle: PropTypes.object,
    hintText: PropTypes.node,
    id: PropTypes.string,
    inputStyle: PropTypes.object,
    multiLine: PropTypes.bool,
    name: PropTypes.string,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    style: PropTypes.object,
    textareaStyle: PropTypes.object,
    type: PropTypes.string,
    underlineDisabledStyle: PropTypes.object,
    underlineFocusStyle: PropTypes.object,
    underlineShow: PropTypes.bool,
    underlineStyle: PropTypes.object,
    wrapperStyle:PropTypes.object

};
export default DateRangePicker;
