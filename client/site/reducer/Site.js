import update from 'react-addons-update';
const initialData={
	isSnackbarOpen:false,
	snackbarMessage:'',
	isNavDrawerOpen:false
}

const Site=(state=initialData,action)=>{
	switch(action.type){
		 case 'SITE_SNACKBAR_OPEN':
		 	return update(state,{
		 		isSnackbarOpen:{$set:true},
		 		snackbarMessage:{$set:action.message}
		 	});
		 	break;
		 case 'SITE_SNACKBAR_CLOSE':
		 	return update(state,{
	 			isSnackbarOpen:{$set:false},
	 			snackbarMessage:{$set:''}
		 	});
		 case 'SITE_NAV_DRAWER_OPEN':
		 	return update(state,{
		 		isNavDrawerOpen:{$set:true}
		 	});
		 	break;
		 case 'SITE_NAV_DRAWER_CLOSE':
		 	return update(state,{
		 		isNavDrawerOpen:{$set:false}
		 	});
		 	break;
		 case 'SITE_NAV_DRAWER_TOGGLE':
		 	return update(state,{
		 		isNavDrawerOpen:{$set:!state.isNavDrawerOpen}
		 	});
		 	break;
		 default:
		 	return state;
		 	break;
	}
};
export {initialData};
export default Site;