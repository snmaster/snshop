import update from 'react-addons-update';

const initialData={
	userId:null,
	userName:'',
	fullName:''
	// accountType:'',
	// profilePic:null,
	// fullName:null,
	// entityId:null
};

const UserProfile=(state=initialData,action)=>{
	switch(action.type){
		case "USER_PROFILE_EDIT":
			return Object.assign({},state,action.edit);
			break;
		case "USER_PROFILE_RESET":
			return Object.assign({},initialData);
		default:
			return state;
	}
};

export default UserProfile;
export {initialData};