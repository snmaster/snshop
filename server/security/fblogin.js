import db from '../models/index';
import uuid from 'node-uuid';
import jwt from 'jwt-simple';
import {populateSessionData,generateToken} from './login';


let LocalStrategy = require('passport-local').Strategy;

function fblogin(username,userid){
    let where = {facebookId:userid};
    return db.sequelize.transaction((t)=>{
        return db.UserAccount.findAll({where,transaction:t})
        .then((result)=>{
            console.log(result);
            // let userAccount = result[0];
            if(result.length > 0){
                // let sessionKey = jwt.encode(username,uuid.v4());
                // return {
                //             access_token:sessionKey,
                //             success:true,
                //             user_id:userAccount.id,
                //             user_name:userAccount.UserName,
                //             account_type:'type',
                //             //profile_pic:Photo?cloudinary.url(Photo):`/img/letter/letter_${FullName[0].toLowerCase()}.png`,
                //             //full_name:FullName,
                //             //entity_id:EntityId
                //         };
                return result[0];
            }
            else {
                return db.UserAccount.create({UserName:username,FullName:username,AccountType:'Customer',Password:'',facebookId:userid},{transaction:t,fields:['UserName','FullName','AccountType','Password','facebookId']})
                // .then(userAccount=>{
                //     let sessionKey = jwt.encode(username,uuid.v4());
                //     return {
                //                 access_token:sessionKey,
                //                 success:true,
                //                 user_id:userAccount.id,
                //                 user_name:userAccount.UserName,
                //                 account_type:'type'
                //             };
                // });
            }
        })
        .then(async ({id,UserName,AccountType,FullName})=>{
            const token = await generateToken({id,account_type:AccountType,FullName});	
            const sessionData = await populateSessionData({id,UserName,account_type:AccountType,FullName,token});
            return {sessionData,success:true};
        })
        .catch(error=>({message:error,success:false}));       
    })
    .catch(error=>({message:error,success:false}));
}

function fbloginHandler(req,res){
	//console.log(req.body);
    let {username,userid,redirectUrlOnSuccess} = req.body;
    //redirectUrlOnSuccess =redirectUrlOnSuccess? redirectUrlOnSuccess.replace('/',''):null;
    fblogin(username,userid)//.then(session=>{res.json(session);});
        .then(({sessionData,success})=>{
		if(success){
            let {user_id,user_name,full_name,access_token,account_type} = sessionData;
			res.cookie('access_token',access_token,{encode:m=>(m)});
			res.cookie('user_id',user_id,{encode:m=>(m)});
			res.cookie('user_name', user_name,{encode:m=>(m)});
			res.cookie('account_type','CUSTOMER',{encode:m=>(m)});
			// response.cookie('profile_pic',profile_pic,{encode:m=>(m)});
			res.cookie('full_name',full_name,{encode:m=>(m)});
			// response.cookie('entity_id',entity_id,{encode:m=>(m)});
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



export {fbloginHandler};
export default fblogin;