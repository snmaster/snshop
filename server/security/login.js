import db from '../models/index';
import uuid from 'node-uuid';
import jwt from 'jwt-simple';
import secret from "../../secret";
let LocalStrategy = require('passport-local').Strategy;

function login(username,password,remember){
	let where = {UserName:username};
	if(password)
		where.Password=password;
	else{
		where.$or=[
			{
				Password:''
			},
			{Password:null}
		];
	}
	return db.UserAccount.findAll({where})
				.then(result=>{
					let userAccount = result[0];
					if(userAccount){
						return userAccount								
					}
						//let sessionKey = jwt.encode(username,secret.auth_secret);
						// return db.UserSession.create({UserAccountId:userAccount.id,ExpiredIn:remember? null: 300,Counter:1,SessionKey:sessionKey},{fields:['UserAccountId','ExpiredIn','Counter','SessionKey']})
						// .then(session=>{
							
						// 	const data = {
						// 		user_id:userAccount.id,
						// 		TokenVersion:1,
						// 		generatedAt: new Date(),
						// 		expiredIn:7200,
						// 		account_type:userAccount.AccountType,
						// 		entity_id:userAccount.id,
						// 		full_name:userAccount.FullName
						// 	}

						// 	jwt.encode(username,secret.auth_secret);

						// 	return {
						// 		access_token:sessionKey,
						// 		success:true,
						// 		user_id:userAccount.id,
						// 		user_name:userAccount.UserName,
						// 		account_type:userAccount.AccountType,
						// 		full_name:userAccount.FullName
						// 		//profile_pic:Photo?cloudinary.url(Photo):`/img/letter/letter_${FullName[0].toLowerCase()}.png`,
						// 		//entity_id:EntityId
						// 	};
						// });					

					// }
					// else {
					// 	return {message:'User name or password is incorrect.',success:false};
					// }
				})
				.then(async ({id,UserName,AccountType,FullName})=>{
					const token = await generateToken({id,account_type:AccountType,FullName});	
					const sessionData = await populateSessionData({id,UserName,account_type:AccountType,FullName,token});
					return {sessionData,success:true};
				})
				.catch(error=>({message:error,success:false}));
}

export async function populateSessionData({id,UserName,account_type,FullName,token}){
	
	return {
        access_token:token,
        user_name:UserName,
        user_id:id,
        account_type,
        entity_id:id,
        //profile_pic:entity.Photo?cloudinary.url(entity.Photo):`/img/letter/letter_${entity.FullName[0].toLowerCase()}.png`,
        full_name:FullName
    };
}


function loginHandler(req,res){
	console.log(req.body);
	let {username,password,remember,redirectUrlOnSuccess} = req.body;
	//redirectUrlOnSuccess =redirectUrlOnSuccess? redirectUrlOnSuc	cess.replace('/',''):null;
	login(username,password,remember)
	.then(({sessionData,success})=>{
		if(success){
			let {user_id,user_name,full_name,success,access_token,account_type} = sessionData;
			res.cookie('access_token',access_token,{encode:m=>(m)});
			res.cookie('user_id',user_id,{encode:m=>(m)});
			res.cookie('user_name', user_name,{encode:m=>(m)});
			res.cookie('account_type',account_type,{encode:m=>(m)});
			// response.cookie('profile_pic',profile_pic,{encode:m=>(m)});
			res.cookie('full_name',full_name,{encode:m=>(m)});
			// response.cookie('entity_id',entity_id,{encode:m=>(m)});
			console.log(redirectUrlOnSuccess);
			if(redirectUrlOnSuccess){
				res.redirect(decodeURIComponent(redirectUrlOnSuccess));
			}
			else
				res.redirect("/");
		}
		else{	
			res.redirect(`/customer/login?message=${encodeURIComponent("Phone number or password is incorrect!")}&redirectUrlOnSuccess=${redirectUrlOnSuccess?redirectUrlOnSuccess:''}`);
		}
		return null;
	});
}

function adminSiteLoginHandler(req,res){
	let {username,password,remember} = req.body;
	login(username,password,remember).then(session=>{
		res.json(session);
	});
}

export async function generateToken({id,account_type,FullName,expiredIn}){
    //expiredIn = expiredIn? expiredIn: 7200;        
    const data = {
        user_id:id,
        TokenVersion:1,
        generatedAt: new Date(),
        expiredIn,
        account_type,
        entity_id:id,
        full_name:FullName
	}
	
    return jwt.encode(data,secret.auth_secret);
}


export {loginHandler,adminSiteLoginHandler};
export default login;