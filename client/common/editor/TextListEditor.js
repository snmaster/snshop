import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import TextEditor from './TextEditor';
import FlatButton from 'material-ui/FlatButton';
import update from 'react-addons-update';
import Chip from 'material-ui/Chip';

class TextListEditor extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { typedText: '', isOpen: false };
    }
    handleOnFocus() {
        this.setState({ isOpen: true });
    }
    handleTextFieldChange(text) {
        this.setState({ typedText: text });
    }
    handleChipDelete(index) {
        let newValue = update(this.props.value, {
            $splice: [
                [index, 1]
            ]
        });
        this.props.onChange(newValue);
    }
    handleTextFieldValidated(text) {
        let newValue = update(this.props.value==null?[]:this.props.value, { $push: [text] });
        this.setState({ typedText: '' });
        this.props.onChange(newValue);
    }
    handleClear() {
        this.setState({ typedText: '' });
        this.props.onChange([]);
    }
    handleCancel() {
        this.setState({ isOpen: false });
    }
    handleSubmit() {
        this.setState({ isOpen: false });
    }
    render() {
        const actions = [
            <FlatButton
        label="Clear"
        secondary={true}
        onTouchTap={this.handleClear.bind(this)}
      />,
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
        const styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
        let wrapperStyle = this.props.wrapperStyle ? this.props.wrapperStyle : {};
        wrapperStyle.display = wrapperStyle.display ? wrapperStyle.display : 'inline-block';
        wrapperStyle.width = wrapperStyle.width ? wrapperStyle.width : '256px';
        let value = [];
        if (Array.isArray(this.props.value))
            value = this.props.value;
        return (
            <div style={wrapperStyle}>
                <TextField
                    name="textField"
                    value={value.join()}
                    onFocus={this.handleOnFocus.bind(this)}
                    fullWidth={true}
                >
                </TextField>
                <Dialog 
                actions={actions}
                model={true}
                open={this.state.isOpen}
                style={{padding:'0'}}
                contentStyle={{width:'20em'}}
                >
                    <div style={styles.wrapper}>
                        {value.map((text,index)=>(<Chip style={styles.chip} key={index} onRequestDelete={e=>{this.handleChipDelete(index)}}>{text}</Chip>))}
                    </div>
                    <TextEditor validateOnBlur={false} hintText="Enter Text" 
                    inputStyle={{width:'100%',minWidth:'100%'}}  
                    name="textField" 
                    value={this.state.typedText} 
                    onValidating={text=>(text?true:false)} 
                    onValidated={this.handleTextFieldValidated.bind(this)} 
                    onChange={this.handleTextFieldChange.bind(this)}/>
                    
                </Dialog>
            </div>
        );
    }
}

TextListEditor.PropTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired
};

export default TextListEditor;
