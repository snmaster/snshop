import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import RemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import muiThemeable from 'material-ui/styles/muiThemeable';
class GridCard extends React.Component{
	constructor(){
		super(...arguments);
		this.state={
			isVisibleCard:false
		};
	}

	componentWillReceiveProps(nextProps){
		let {isCardExpended} = this.props;
		let isNextCardExpended= nextProps.isCardExpended;
		if(isNextCardExpended !== isCardExpended){
			this.setState({isVisibleCard:isNextCardExpended});
		}
	}

	render(){
		let {columns,item,primaryKey,changeToCardAt,cardLabelWidth,muiTheme,onDoubleClick,isSelected,onSelectedChanged} = this.props;
		let {isVisibleCard} = this.state;
		let cols=[];
		let fields=[];
		let offsetDivClassName = "offset-div";
		let expandCollapseBtnClassName="btn-expand-collapse";
		for(let column of columns){
			let {key,width,canGrow,textAlign,hideAt,caption,format} = column;
			hideAt=hideAt? hideAt:'';
			let style = {};
			let fieldStyle={};
			if(width)
				style.width = width;
			if(canGrow)
				style.flexGrow=canGrow;
			if(textAlign){
				style.textAlign = textAlign;
				fieldStyle.textAlign = textAlign;
			}
			style.flexShrink=0;
			style.color="rgba(0, 0, 0, 0.87)";
			fieldStyle.color="rgba(0, 0, 0, 0.87)";
			cols.push(<div  style={style} key = {`${key}${item[primaryKey]}`} className={`cs-column ${hideAt? hideAt + '-hide':''} ${changeToCardAt? changeToCardAt + '-hide':''}`}>
						{format? format(item[key]): item[key]}
					</div>);
			fields.push(
				<div key = {`${key}${item[primaryKey]}`} className={`cs-field ${changeToCardAt? changeToCardAt + '-flex':''} ${hideAt? hideAt + '-flex':''}`}>
					<div className="cs-label" style={{width:cardLabelWidth,color:"rgba(0, 0, 0, 0.54)"}}>{caption}</div>
					<div className="cs-value" style={{fieldStyle}}>{format? format(item[key]): item[key]}</div>
				</div>
				);
			offsetDivClassName = `${offsetDivClassName} ${changeToCardAt? changeToCardAt + '-flex':''} ${hideAt? hideAt + '-flex':''}`
			expandCollapseBtnClassName = `${expandCollapseBtnClassName}   ${hideAt? hideAt + '-inline-block':''} `
		}
		return (
			<div onDoubleClick={()=>{if(onDoubleClick)onDoubleClick(item);}} className={`cs-row-wrapper ${changeToCardAt? changeToCardAt+'-card' : ''} ${isSelected? 'selected':''}`} >
				<div className="cs-row-selector-wrapper">
					<div className="cs-row-selector cs-column">
						<Checkbox checked={isSelected} onCheck={(e,isInputChecked)=>{onSelectedChanged(item[primaryKey],isInputChecked);}} style={{width:'20px',margin:'0 10px 0 16px',display:'block'}}/>
						<IconButton onClick={()=>{this.setState({isVisibleCard:true});}} style={{display:'none',padding:0,height:0,width:'32px',marginRight:'10px'}} className={`btn-expand  ${expandCollapseBtnClassName} ${isVisibleCard? 'display-none':''}`}>
							<AddCircleOutline color={muiTheme.palette.accent1Color}/>
						</IconButton>
						<IconButton onClick={()=>{this.setState({isVisibleCard:false});}} style={{display:'none',padding:0,height:0,width:'32px',marginRight:'10px'}} className={`btn-collapse  ${expandCollapseBtnClassName} ${!isVisibleCard? 'display-none':''}`}>
							<RemoveCircleOutline color={muiTheme.palette.primary1Color}/>
						</IconButton>
					</div>
					<div  className={`cs-row ${changeToCardAt? changeToCardAt+'-hide' : ''}`}>
						{cols}
					</div>
				</div>
				<div className={`cs-card ${changeToCardAt? changeToCardAt + '-block': ''} ${!isVisibleCard? 'display-none':''}`}>
					<div className={offsetDivClassName}></div>
					{fields}
				</div>
			</div>
			);
	}
}

export default muiThemeable()(GridCard);