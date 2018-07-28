function checkForTypes(user,types){
	if(types.length == 0)
		return true;
	if(types.indexOf(user.type) >=0){
		return true;
	}
	return false;
}

function checkForUsers(user,users){
	if(users.length == 0)
		return true;
	return false;
}

function checkForRoles(user,roles){
	if(roles.length ==0)
		return true;
	return false;
}

export default (context,authorizeFor)=>{
	let {user,httpResponse} = context;
	if(!user){
		httpResponse.status(401).send("User is not authenticated.");
		return false;
	}
	if(user && !user.isAuthenticated){
		httpResponse.status(401).send("User is not authenticated.");
		return false;
	}

	let {users,types,roles} = authorizeFor;
	users = users? users: [];
	types = types? types:[];
	roles = roles? roles:[];

	if(checkForTypes(user,types) && checkForUsers(user,users) && checkForRoles(user,roles)){
		return true;
	}else{
		httpResponse.status(403).send("You are not allowed for this resource");
		return false;
	}

};