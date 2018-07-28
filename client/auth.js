import {setCookie,getCookie} from './cookieManager';

function saveUserProfile(profile){
	let {access_token,user_id,user_name,account_type,profile_pic,full_name,entity_id}=profile;
	if(access_token)	
		setCookie('access_token',access_token,"/");
	else
		setCookie('access_token','',"/");

	if(user_id)
		setCookie('user_id',user_id,"/");
	else
		setCookie('user_id','',"/");

	if(user_name)
		setCookie('user_name',user_name,"/");
	else
		setCookie('user_name','',"/");

	if(account_type)
		setCookie('account_type',account_type,"/");
	else
		setCookie('account_type','',"/");

	if(profile_pic)
		setCookie('profile_pic',profile_pic,"/");
	else
		setCookie('profile_pic','',"/");

	if(full_name)
		setCookie('full_name',full_name,"/");
	else
		setCookie('full_name','',"/");
	if(entity_id)
		setCookie('entity_id',entity_id,'/');
	else
		setCookie('entity_id','',"/");
}

function logout(){
	saveUserProfile({
		access_token:'',
		user_id:null,
		user_name:'',
		account_type:'',
		//profile_pic:null,
		full_name:'',
		//entity_id:null
	});
}

function getAccessToken(){
	return getCookie('access_token');
}

function getUserProfile(){
	return {
		access_token:getCookie('access_token'),
		user_id:getCookie('user_id'),
		user_name:getCookie('user_name'),
		account_type:getCookie('account_type'),
		//profile_pic:getCookie('profile_pic'),
		full_name:getCookie('full_name'),
		//entity_id:getCookie("entity_id")
	} 
}

function login({UserName,Password,Remember}){
	let request = new Request('/login',{
		method:'POST',
		body:JSON.stringify({
			username:UserName,
			password:Password,
			remember:Remember
		}),
		headers:new Headers({
			'Content-Type':'application/json'
		})
	});
	return fetch(request).then((response=>(response.json())));
}

function adminSiteLogin({UserName,Password,Remember}){
	let request = new Request('/adminlogin',{
		method:'POST',
		body:JSON.stringify({
			username:UserName,
			password:Password,
			remember:Remember
		}),
		headers:new Headers({
			'Content-Type':'application/json'
		})
	});
	return fetch(request).then((response=>(response.json())));
}

export {getAccessToken,saveUserProfile,getUserProfile,login,adminSiteLogin,logout	};