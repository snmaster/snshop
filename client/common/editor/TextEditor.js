import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class TextEditor extends React.Component {

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    onKeyPress(e) {
        if (e.charCode == 13) {
            if (this.props.validateOnEnterKeyPress) {
                this.commitEditor();
                setTimeout(() => { this.refs.textField.input.setSelectionRange(0, this.refs.textField.input.value.length); }, 10);
            }
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
                }
                if (this.props.restoreOldValueOnError) {
                    this.props.onChange(this.old);
                }
            }
        } else if (this.props.onValidated) {
            this.props.onValidated(value);
        }
    }
    onBlur(e) {
        if (this.props.validateOnBlur)
            this.commitEditor();
    }
    onFocus(e) {
        this.old = e.target.value;
        if (this.props.selectAllOnFocus)
            this.refs.textField.input.setSelectionRange(0, e.target.value.length);
    }

    render() {

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
            value={this.props.value}
            onFocus={this.onFocus.bind(this)} 
            onKeyPress={this.onKeyPress.bind(this)} 
            onBlur={this.onBlur.bind(this)} 
            onChange = {this.onChange.bind(this)}>{this.props.children}</TextField>);
    }


}


TextEditor.PropTypes = {
    validateOnBlur: PropTypes.bool,
    validateOnEnterKeyPress: PropTypes.bool,
    onValidating: PropTypes.func,
    onValidated: PropTypes.func,
    retainFocusOnError: PropTypes.bool,
    restoreOldValueOnError: PropTypes.bool,
    selectAllOnFocus: PropTypes.bool,
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
    onChange: PropTypes.func,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    style: PropTypes.object,
    textareaStyle: PropTypes.object,
    type: PropTypes.string,
    underlineDisabledStyle: PropTypes.object,
    underlineFocusStyle: PropTypes.object,
    underlineShow: PropTypes.bool,
    underlineStyle: PropTypes.object,
    value: PropTypes.string
};
TextEditor.defaultProps = {
    validateOnBlur: true,
    validateOnEnterKeyPress: true,
    retainFocusOnError: false,
    restoreOldValueOnError: false,
    selectAllOnFocus: true
};
export default TextEditor;
