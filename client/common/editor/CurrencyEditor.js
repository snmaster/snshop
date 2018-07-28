import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Accounting from 'accounting';


class CurrencyEditor extends React.Component {
    constructor() {
        super(...arguments);
        this.text = '';
        this.bypassOnBlur = false;
    }

    onChange(event) {
        this.handleOnChange(event.target.value);
    }
    handleOnChange(text) {
        this.changed = true;
        let number = Number.parseFloat(text);

        if (!number && number != 0) {
            number = null;
        }
        this.text = text;
        this.props.onChange(number);
    }

    onKeyPress(e) {
        if (e.charCode == 13) {
            if(this.props.validateOnEnterKeyPress){                
                this.refs.textField.blur();
                setTimeout(() => { this.refs.textField.input.setSelectionRange(0, this.refs.textField.input.value.length); }, 10);
            }
        } else if ((e.charCode < 48 || e.charCode > 57) && e.charCode != 45 && e.charCode != 46) { //digit and minus sign
            e.preventDefault();
        }
    }
    moveDecimal(n, l) {
        let v = l > 0 ? n * Math.pow(10, l) : n / Math.pow(10, l * -1);
        return v;
    }
    handleUpDownKey(isUp) {
        let text = this.refs.textField.input.value;
        let num = Number.parseFloat(text);
        if (!num)
            num = 0;
        let dec = text.indexOf('.');
        let sign = isUp ? 1 : -1;
        if (dec > -1) { //right of decimal
            let digitsAfterPoint = num.toString().split('.')[1].length;
            let fnum = this.moveDecimal(num, digitsAfterPoint);
            fnum += sign;
            num = this.moveDecimal(fnum, digitsAfterPoint * -1);
        } else { //no decimal
            num += sign;
        }
        this.handleOnChange(num);
    }
    onKeyDown(e) {
        switch (e.keyCode) {
            case 38: //up
                e.preventDefault();
                this.handleUpDownKey(true);
                break;
            case 40: //down
                e.preventDefault();
                this.handleUpDownKey(false);
                break;
            case 27: // escape key
                this.bypassOnBlur = true;
                this.refs.textField.blur();
                this.props.onChange(this.old);
                break;
        }
    }
    commitEditor() {
        let value = this.refs.textField.input.value;
        if (this.props.onValidating) {
            if (this.props.onValidating(value)) {
                this.props.onValidated(value);
            } else {
                if (this.props.retainFocusOnError) {
                    setTimeout(x => { this.refs.textField.focus() }, 10);
                    this.changed = true; //still focus
                }
                if (this.props.restoreOldValueOnError) {
                    this.handleOnChange(this.old);
                }
            }
        } else if (this.props.onValidated)
            this.props.onValidated(value);
    }
    onBlur(e) {
        this.changed = false;
        if (!this.props.bypassOnBlur) {
            this.commitEditor();
            if (!this.changed)
                this.forceUpdate();
        }
        this.bypassOnBlur = false;
    }
    onFocus(e) {
        this.old = this.props.value;
        this.changed = true;
        this.text = this.props.value == null ? '' : Accounting.unformat(this.props.value);
        this.forceUpdate();
        if (this.props.selectAllOnFocus) {
            setTimeout(() => { this.refs.textField.input.setSelectionRange(0, this.refs.textField.input.value.length); }, 10);
        }
    }

    render() {
        let text = "";
        let p = this.props.numberPrecision == null ? Accounting.settings.number.precision : this.props.numberPrecision;
        let s = this.props.currencySymbol == null ? Accounting.settings.currency.symbol : this.props.currencySymbol;
        if (!this.changed) {
            text = this.props.value == null ? '' : Accounting.formatMoney(this.props.value, s, p);
        } else
            text = this.text;
        return (<TextField ref="textField" 
            className={this.props.className}
            defaultValue={this.props.defaultValue}
            disabled = {this.props.disabled}
            errorStyle = {this.props.errorStyle}
            errorText = {this.props.errorText}
            floatingLabelFixed={this.props.floatingLabelFixed}
            floatingLabelFocusStyle = {this.props.floatingLabelFocusStyle}
            floatingLabelStyle={this.props.floatingLabelStyle}
            floatingLabelText={this.props.floatingLabelText}
            fullWidth={this.props.fullWidth}
            hintStyle={this.props.hintStyle}
            hintText={this.props.hintText}
            id={this.props.id}
            inputStyle={Object.assign({textAlign:'right'},this.props.inputStyle)}
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
            value={text}
            onFocus={this.onFocus.bind(this)} 
            onKeyPress={this.onKeyPress.bind(this)} 
            onBlur={this.onBlur.bind(this)} 
            onChange = {this.onChange.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}>
            {this.props.children}</TextField>);

    }


}


CurrencyEditor.PropTypes = {
    validateOnBlur: PropTypes.bool,
    validateOnEnterKeyPress: PropTypes.bool,
    onValidating: PropTypes.func,
    onValidated: PropTypes.func,
    retainFocusOnError: PropTypes.bool,
    restoreOldValueOnError: PropTypes.bool,
    selectAllOnFocus: PropTypes.bool,
    numberPrecision: PropTypes.number,
    currencySymbol: PropTypes.string,
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
    fullWidth: PropTypes.bool,
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
    value: PropTypes.number
};
CurrencyEditor.defaultProps = {
    validateOnBlur: true,
    validateOnEnterKeyPress: true,
    retainFocusOnError: false,
    restoreOldValueOnError: false,
    numberPrecision: null,
    selectAllOnFocus: true,
    currencySymbol: null
};
export default CurrencyEditor;
