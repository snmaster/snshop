import React from 'react';
import Waypoint from 'react-waypoint';
import GridCard from './GridCard';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import RemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import muiThemeable from 'material-ui/styles/muiThemeable';
import CircularProgress from 'material-ui/CircularProgress';
import NavigationArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import NavigationArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import update from 'react-addons-update';
import Loader from '../Loader';
class CsGrid extends React.Component{
	constructor(){
		super(...arguments);
		this.state = {
			isCardExpended:false,
			isSelectAll:false
		};
	}

	componentDidMount(){
		let {primaryKey} = this.props;
		let {data} = this.props;
		this.ids= data? data.map(d=>(d[primaryKey])):[];
	}

	shouldComponentUpdate(nextProps,nextState){
		let {data,loading,columns} = this.props;
		let nextData = nextProps.data
		let nextLoading = nextProps.loading;
		return true;
	}
	
	handleSortChange(index){
		let {columns,refetch} = this.props;
		let currentColumn = columns[index];
		let nextColumn = Object.assign({},currentColumn);
		let nextColumns = columns;
		if(!currentColumn.orderBy){
			nextColumn.orderBy = "ASC";
		}else if(currentColumn.orderBy == "ASC"){
			nextColumn.orderBy = "DESC";
		}else if(currentColumn.orderBy == "DESC"){
			nextColumn.orderBy=null;
		}
		
		if(nextColumn.orderBy ==="ASC"){// change from non ordering to ordering
			let maxSortOrder = 0;
			for(let c of columns){
				let sortOrder = c.sortOrder? c.sortOrder: 0;
				if(sortOrder>0){
					if(c.key !== nextColumn.key){
						maxSortOrder = Math.max(maxSortOrder,sortOrder);
					}
				}
			}
			nextColumn.sortOrder = maxSortOrder + 1;
		}else if(!nextColumn.orderBy){ // change from ordering to non ordering
			for(let c of columns){
				let sortOrder = c.sortOrder? c.sortOrder: 0 ;
				if(sortOrder>0){
					if(c.key !== nextColumn.key){
						if(sortOrder> nextColumn.sortOrder){
							nextColumns = update(nextColumns,{
								[columns.indexOf(c)]:{
									sortOrder:{
										$set:sortOrder -1
									}
								}
							});
						}
					}
				}
			}
			nextColumn.sortOrder = null;
		}

		nextColumns = update(nextColumns,{
			[index]:{
				$set:nextColumn
			}
		});
		refetch(nextColumns,populateOrderBy(nextColumns));
	}

	handleRowSelectedChange	(id,isSelected){
		let {rowsSelectionChanged,selected} = this.props;
		if(isSelected)
			selected=update(this.props.selected,{
					$push:[id]
				});
		else{
			let index = selected.indexOf(id);
			if(index > -1){
				selected=update(this.props.selected,{
						$splice:[[index,1]]
					});
			}
			
		}
		rowsSelectionChanged(selected);
	}


	componentWillReceiveProps({data,primaryKey}){
		let currentData = this.props.data;
		if(data !== currentData){
			this.ids= data.map(d=>(d[primaryKey]));
		}
	}

	handleSelectAllChange(selectAll){
		let {rowsSelectionChanged} = this.props;
		let selected = [];
		if(selectAll){
			this.setState({isSelectAll:true});
			selected=update(this.props.selected,{
						$splice:[[index,1]]
					});
		}
		else{
			this.setState({isSelectAll:false});
		}
		rowsSelectionChanged(selected);
	}

	render(){
		let {primaryKey,changeToCardAt,cardLabelWidth,columns,data,loading,fetchMore,refetch,hasMore,page,muiTheme,onRowDoubleClick,selected} = this.props;
		let {isCardExpended,isSelectAll} = this.state;
		data= data? data: [];
		cardLabelWidth = cardLabelWidth? cardLabelWidth: '150px';
		let expandCollapseBtnClassName="btn-expand-collapse";
		let headers = columns.map(({caption,width,canGrow,key,captionAlign,hideAt,orderBy,sortOrder,sortable},index)=>{
							hideAt = hideAt? hideAt:'';
							let style = {};
							if(width)
								style.width = width;
							if(canGrow)
								style.flexGrow=canGrow;
							if(captionAlign)
								style.textAlign=captionAlign;
							style.color="rgba(0, 0, 0, 0.54)";
							if(orderBy)
								style.color="rgba(0, 0, 0, 0.87)";
							style.flexShrink=0;
							expandCollapseBtnClassName = `${expandCollapseBtnClassName}   ${hideAt? hideAt + '-inline-block':''} `
							return (
								<div 
									key={key} 
									className={`cs-column ${hideAt? hideAt + '-hide':''} ${sortable? "sortable": ""} `  }
									style={style}
									onClick={()=>{if(sortable) this.handleSortChange(index);}}
									>
									<div style={{position:'relative',display:'inline-block', width:'16px',height:'16px'}}>
										<NavigationArrowDown style={{height:'16px',width:'16px',position:'absolute'}} className={`${!orderBy || orderBy == "DESC" ? "display-none" : ""} ${!orderBy ? "next-orderby" : ""}`}/>
										<NavigationArrowUp style={{height:'16px',width:'16px',position:'absolute'}} className={`${!orderBy || orderBy == "ASC" ? "display-none" : ""} ${orderBy === "ASC"? "next-orderby" : ''}`}/>
									</div>
									<sup>{sortOrder}</sup>
									{caption}
								</div>
								);
						});
		return (
			<div className="cs-grid" style={{position:'relative'}}>
				<div className={`cs-header ${changeToCardAt? changeToCardAt + '-hide': ''}`}>
					<div className='cs-row-selector cs-column'>
						<Checkbox style={{width:'20px',margin:'0 10px 0 16px',display:'block'}} checked={isSelectAll} onCheck={(e,inputChecked)=>{this.handleSelectAllChange(inputChecked);}}/>
						<IconButton onClick={()=>{this.setState({isCardExpended:true});}} style={{display:'none',padding:0,height:0,width:'32px',marginRight:'10px'}} className={`btn-expand  ${expandCollapseBtnClassName} ${isCardExpended? 'display-none':''}`}>
							<AddCircleOutline color={muiTheme.palette.accent1Color}/>
						</IconButton>
						<IconButton onClick={()=>{this.setState({isCardExpended:false});}} style={{display:'none',padding:0,height:0,width:'32px',marginRight:'10px'}} className={`btn-collapse  ${expandCollapseBtnClassName} ${!isCardExpended? 'display-none':''}`}>
							<RemoveCircleOutline color={muiTheme.palette.primary1Color}/>
						</IconButton>
					</div>
					{
						headers
					}
				</div>
				<div className="cs-body" >
					{
						data.map(item=>(<GridCard onDoubleClick={onRowDoubleClick} isCardExpended={isCardExpended} isSelected={selected.indexOf(item[primaryKey])>-1} key={item[primaryKey]} onSelectedChanged={this.handleRowSelectedChange.bind(this)} changeToCardAt={changeToCardAt} cardLabelWidth={cardLabelWidth} columns={columns} primaryKey={primaryKey} item={item}/>))
					}
					{
						loading? 
						<Loader size={30}  thickness={3}/>
						:
						null
					}
					<Waypoint onEnter={()=>{if(!loading && hasMore) fetchMore(page+1,populateOrderBy(columns))}} bottomOffset="-100px"/>
				</div>
			</div>
			);
	}
}
function populateOrderBy(columns){
	let order = [];
	for(let column of columns){
		let {orderBy} = column;
		switch(orderBy){
			case "DESC":
				order.splice(column.sortOrder-1,0,[column.key,"desc"]);
				break;
			case "ASC":
				order.splice(column.sortOrder-1,0,[column.key,"asc"]);
				break;
		}
	}
	return order;
}
export {populateOrderBy};
export default muiThemeable()(CsGrid);