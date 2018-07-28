import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import TextEditor from './TextEditor';
import FlatButton from 'material-ui/FlatButton';
import update from 'react-addons-update';

class MultiSelectEditor extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { isOpen: false, searchText: '',selectAll:false };
        this.dataItems = [];
        this.selectedItems = [];
    }
    handleCancel() {
        this.setState({ isOpen: false });
    }
    handleSubmit() {
        this.setState({ isOpen: false });
    }
    handleOnFocus() {
        this.props.onDataNeed()
            .then(data => {
                this.dataItems = data;
                this.setState({ isOpen: true });
                return data;
            }).catch(error => { console.log(error); });
    }
    handleSearchTextChange(text) {
        this.setState({ searchText: text });
    }
    selectionChange(item, value, checked) {
        let valueList = null;
        if (checked) {
            valueList = update(this.props.value, { $push: [value] });
            this.selectedItems.push(item);
        } else {
            let index = this.props.value.indexOf(value);
            if (index > -1) {
                valueList = update(this.props.value, {
                    $splice: [
                        [index, 1]
                    ]
                });
            }
            index = this.selectedItems.indexOf(item);
            if (index > -1)
                this.selectedItems.splice(index, 1);
        }
        if (valueList != null)
            this.props.onItemSelectionChange(valueList);
    }
    resolvePrimaryText(item) {
        return this.props.textField && item[this.props.textField] ? item[this.props.textField] : item;
    }
    resolveSecondaryText(item) {
        return this.props.secondaryTextField && item[this.props.secondaryTextField] ? item[this.props.secondaryTextField] : '';
    }
    resolveValue(item) {
        return this.props.valueField && item[this.props.valueField] ? item[this.props.valueField] : item;
    }
    populateListItems() {
        let dataItems = this.state.searchText ?
            this.dataItems.filter(item => {
                let primaryText = this.props.textField && item[this.props.textField] ? item[this.props.textField] : item;
                return primaryText.includes(this.state.searchText);
            }) : this.dataItems;
        let items = dataItems.map(item => {
            let primaryText = this.resolvePrimaryText(item);
            let secondaryText = this.resolveSecondaryText(item);
            let value = this.resolveValue(item);
            return (<ListItem
			            key={value}
				        leftCheckbox={<Checkbox onCheck={(e,checked)=>{this.selectionChange(item,value,checked);}} checked={this.isItemSelected(item)}/>
            }
            primaryText = { primaryText }
            secondaryText = { secondaryText }
            />);
        });
        return items;
    }
    isItemSelected(item) {
        let selected = false;
        let value = this.resolveValue(item);
        this.props.value.some(item => {
            if (item === value) {
                selected = true;
                return true;
            }
        });
        return selected;
    }
    handleClear() {
        this.selectedItems = [];
        this.setState({selectAll:false});
        this.props.onItemSelectionChange([]);
    }

    onCheckSelectAll(e, checked) {
        let valueList = [];
        this.selectedItems = [];
        if (checked) {
            this.selectedItems = this.dataItems.slice();
            valueList = this.dataItems.map((item) => {return this.resolveValue(item);});
        }
        this.setState({selectAll:checked});
        this.props.onItemSelectionChange(valueList);
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
        let text = "";
        this.selectedItems.forEach(item => {
            if (text)
                text = text + ", ";
            text = text + this.resolvePrimaryText(item);
        })
        let wrapperStyle = this.props.wrapperStyle ? this.props.wrapperStyle : {};
        wrapperStyle.display = wrapperStyle.display? wrapperStyle.display:'inline-block';
        wrapperStyle.width = wrapperStyle.width? wrapperStyle.width:'256px';
        return (
            <div style={wrapperStyle}>
				<TextField
					name="textField"
					value={text}
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
					<TextEditor hintText="Type to search" inputStyle={{width:'100%',minWidth:'100%'}}  name="searchBox" value={this.state.searchText} onChange={this.handleSearchTextChange.bind(this)}/>
					<Checkbox checked={this.state.selectAll} labelStyle={{marginLeft:'1em'}} style={{marginLeft:'1em', marginBottom:'.5em'}} onCheck={this.onCheckSelectAll.bind(this)} label="Select All"/>
				 
					<List style={{height:'20em',overflow:'auto',padding:'0'}}>
				        {this.populateListItems()}
      				</List>
				</Dialog>
			</div>
        );
    }
}

MultiSelectEditor.PropTypes = {
    onDataNeed: PropTypes.func.isRequired,
    onItemSelectionChange: PropTypes.func,
    textField: PropTypes.string,
    secondaryTextField: PropTypes.string,
    valueField: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])),
    wrapperStyle:PropTypes.object
}

export default MultiSelectEditor;
