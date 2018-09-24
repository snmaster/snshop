import db from '../models/index';
import uuid from 'node-uuid';
import jwt from 'jwt-simple';
import Request from 'request';
import fbaccountkit from '../../fbaccountkit';
let LocalStrategy = require('passport-local').Strategy;

function smslogin(username,userid){
    let where = {UserName:username};
    return db.sequelize.transaction((t)=>{
        return db.UserAccount.findOrCreate({where, defaults: { UserName:username,Password:''},transaction:t})
            .spread((instance, created) => {
                if(created)
                {                
                    return {
                        success:true,
                         //access_token:sessionKey,
                        user_id:instance.id,
                        user_name:username,
                        //account_type:type,
                        //profile_pic:Photo?cloudinary.url(Photo):`/img/letter/letter_${FullName[0].toLowerCase()}.png`,
                        //full_name:FullName,
                        //entity_id:EntityId
                    };
                }
                else{
                    return {
                        success:true,
                        //access_token:sessionKey,
                        user_id:instance.id,
                        user_name:username,
                        //account_type:type,
                        //profile_pic:Photo?cloudinary.url(Photo):`/img/letter/letter_${FullName[0].toLowerCase()}.png`,
                        //full_name:FullName,
                        //entity_id:EntityId
                    };
                }
            });
    })
    .catch(error=>({message:error,success:false}));
}

function smsloginHandler(req,res){
	//console.log(req.body);
    let {username,auth_code,redirectUrlOnSuccess} = req.body;
    let {account_kit} = fbaccountkit;
    let {app_id,app_secret} = account_kit;
    const url = `https://graph.accountkit.com/v1.2/access_token?grant_type=authorization_code&code=${auth_code}&access_token=AA|${app_id}|${app_secret}`;
    console.log(url);
    redirectUrlOnSuccess =redirectUrlOnSuccess? redirectUrlOnSuccess.replace('/',''):null;
    Request.get({url,json:true},(err,resp,respBody)=>{
		let {
			access_token,
	        expires_at,
            id} = respBody;          
            
        var me_endpoint_url = `https://graph.accountkit.com/v1.2/me?access_token=${access_token}`;
        console.log(me_endpoint_url);
        Request.get({url:me_endpoint_url,json:true}, (err, resp, respBody)=> {
            console.log(respBody);
            let {phone} = respBody; 
            let {number} = phone;
            console.log(number);
            db.sequelize.transaction().then(t=>{
                return db.UserAccount.findAll({where: {AccountKitId: id},transaction:t})
                .then(result=>{
                    console.log(result);
                    let userAccount = result[0];
                    if(userAccount){
                        let token = jwt.encode(number,uuid.v4());
                        res.cookie('access_token',token,{encode:m=>(m)});
                        res.cookie('user_id',userAccount.id,{encode:m=>(m)});
                        res.cookie('user_name', userAccount.UserName,{encode:m=>(m)});
                        // res.cookie('account_type','CUSTOMER',{encode:m=>(m)});
                        // res.cookie('profile_pic',customer.Photo,{encode:m=>(m)});
                        // res.cookie('full_name',customer.FullName,{encode:m=>(m)});
                        // res.cookie('entity_id',customer.id,{encode:m=>(m)});
                        res.redirect('/');
                        t.commit();
                        return null;
					}
                    else 
                    {
                        // return db.UserAccount.create({UserName:number,Password:'',AccountKitId:id},{transaction:t,fields:['UserName','Password','AccountKitId']})
                        //     .then((account)=>{    
                        //         console.log(account);                            
                        //         let token = jwt.encode(number,uuid.v4());
                        //         res.cookie('access_token',token,{encode:m=>(m)});
                        //         res.cookie('user_id',account.id,{encode:m=>(m)});
                        //         res.cookie('user_name', account.UserName,{encode:m=>(m)});
                        //         // res.cookie('account_type','CUSTOMER',{encode:m=>(m)});
                        //         // res.cookie('profile_pic',customer.Photo,{encode:m=>(m)});
                        //         // res.cookie('full_name',customer.FullName,{encode:m=>(m)});
                        //         // res.cookie('entity_id',customer.id,{encode:m=>(m)});
                        //         res.redirect('/');
                        //         t.commit();
                        //         return null;
                        //     });
                        res.redirect(`/customer/register?message=${encodeURIComponent("Please register with phone no!")}&redirectUrlOnSuccess=${redirectUrlOnSuccess?redirectUrlOnSuccess:''}`);
					}
				})
				.catch(error=>({message:error,success:false}));

                // return db.UserAccount.findOrCreate({where: {AccountKitId: id}, defaults: { UserName:number,Password:'',AccountKitId:id},transaction:t})
                // .spread((instance, created) => {
                //     if(created)
                //     {                
                //         const token = jwt.encode(number,uuid.v4());
                //         return {
                //             success:true,
                //             access_token:token,
                //             user_id:instance.id,
                //             user_name:number,
                //             //account_type:type,
                //             //profile_pic:Photo?cloudinary.url(Photo):`/img/letter/letter_${FullName[0].toLowerCase()}.png`,
                //             //full_name:FullName,
                //             //entity_id:EntityId
                //         };
                //     }
                //     else{
                //         return instance.update({UserName:number,Password:'',AccountKitId:id},{transaction:t,fields:['UserName','AccountKitId','Password']})
                //             .then((instance)=>{
                //                 return {
                //                     success:true,
                //                     access_token:token,
                //                     user_id:instance.id,
                //                     user_name:number,
                //                     //account_type:type,
                //                     //profile_pic:Photo?cloudinary.url(Photo):`/img/letter/letter_${FullName[0].toLowerCase()}.png`,
                //                     //full_name:FullName,
                //                     //entity_id:EntityId
                //                 };
                //             });
                //     }
                // });
            });
            
        })
	    
	    
	});
}

export {smsloginHandler};
export default smslogin;