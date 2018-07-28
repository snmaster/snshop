import update from 'react-addons-update';
const initialData={
	open:false,
	edit:{
		UserName:'',
		Password:'',
		Remember:false
	}
};

const Login=(state=initialData,action)=>{
	switch(action.type){
		 case 'LOGIN_DIALOG_CLOSE':
		 	return update(state,{open:{$set:false}});
		 	break;
		 case 'LOGIN_DIALOG_OPEN':
		 	return update(state,{open:{$set:true}});
		 	break;
		 case 'LOGIN_EDIT':
		 	return update(state,{edit:{$set:Object.assign({},state.edit,action.edit)}});
		 default:
		 	return state;
		 	break;
	}
	return state;
};
export {initialData};
export default Login;