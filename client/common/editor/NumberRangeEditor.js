import React, { PropTypes } from 'react';
import NumberEditor from './NumberEditor';
import TextField from 'material-ui/TextField';
import Accounting from 'accounting';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class NumberRangeEditor extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { isOpen: false, fromErrorText: '', toErrorText: '' }
        this.from = null;
        this.to = null;
    }
    handleOnFocus(e) {
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

        if (!this.from)
            this.from = 0;

        if (!this.to)
            this.to = 0;
        let error = false;
        let fromErrorText = "";
        let toErrorText = "";
        if (this.props.min || this.props.min === 0) {
            if (this.from < this.props.min) {
                fromErrorText = 'Minimum allowed value is ' + this.props.min;
                error = true;
            }
            if (this.to < this.props.min) {
                toErrorText = 'Minimum allowed value is ' + this.props.min;
                error = true;
            }
        }
        if (this.props.max || this.props.max === 0) {
            if (this.from > this.props.max) {
                fromErrorText = 'Maximum allowed value is ' + this.props.max;
                error = true;
            }
            if (this.to > this.props.max) {
                toErrorText = 'Maximum allowed value is ' + this.props.max;
                error = true;
            }
        }

        this.setState({ fromErrorText: fromErrorText, toErrorText: toErrorText });

        if (!error && this.props.onChange) {
            this.setState({ isOpen: false });
            this.props.onChange({ from: this.from, to: this.to });
        }
    }
    handleOnChange(value) {
        this.from = value.from;
        this.to = value.to;
        this.forceUpdate();
    }
    render() {
        let numberPrecision = this.props.numberPrecision == null ? Accounting.settings.number.precision : this.props.numberPrecision;
        let start = Accounting.formatNumber(this.from, numberPrecision);
        let end = Accounting.formatNumber(this.to, numberPrecision);
        if (!this.state.isOpen) {
            start = this.props.value && (this.props.value.from || this.props.value.from === 0) ? Accounting.formatNumber(this.props.value.from, numberPrecision) : '';
            end = this.props.value && (this.props.value.to || this.props.value.to === 0) ? Accounting.formatNumber(this.props.value.to, numberPrecision) : '';
        }
        const actions = [
            <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel.bind(this)}
      />,
            <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
        ];
        let wrapperStyle = this.props.wrapperStyle ? this.props.wrapperStyle : {};
        wrapperStyle.display = wrapperStyle.display? wrapperStyle.display:'inline-block';
        wrapperStyle.width = wrapperStyle.width? wrapperStyle.width:'256px';
        return (
            <div style={wrapperStyle}>
                <TextField  
                    onFocus={this.handleOnFocus.bind(this)} 
                    value={start + ' - ' + end}
                    className={this.props.className}
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
                ></TextField>
                <Dialog 
                title="Number Range" 
                actions={actions}
                model={true}
                open={this.state.isOpen}
                style={{padding:'0'}}
                contentStyle={{width:'15em'}}
                >
                <NumberEditor errorText={this.state.fromErrorText} style={{width:'100%'}} onChange={x=>{this.handleOnChange({from:x,to:this.to});}}   floatingLabelText="From" name="from" value={this.from}/>
                <NumberEditor errorText={this.state.toErrorText} style={{width:'100%'}} onChange={x=>{this.handleOnChange({from:this.from,to:x})}}  floatingLabelText="To" name="to" value={this.to}/>
                </Dialog>
            </div>
        );
    }
}

NumberRangeEditor.PropTypes = {
    value: PropTypes.shape({
        from: PropTypes.number,
        to: PropTypes.number
    }).isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
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
    wrapperStyle: PropTypes.object,
    textareaStyle: PropTypes.object,
    type: PropTypes.string,
    underlineDisabledStyle: PropTypes.object,
    underlineFocusStyle: PropTypes.object,
    underlineShow: PropTypes.bool,
    underlineStyle: PropTypes.object
};

export default NumberRangeEditor;
