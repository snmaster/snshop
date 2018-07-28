import db from '../models/index';
import fbaccountkit from '../../fbaccountkit';
import Request from 'request';
import uuid from 'node-uuid';
import jwt from 'jwt-simple';

const registerHandler = (req,res)=>{
	let {
        user_name,
		phone_number,
		fullname,
		password,
		confirm_password,
        auth_code,
        redirectUrlOnSuccess
	} = req.body;
	redirectUrlOnSuccess =redirectUrlOnSuccess? redirectUrlOnSuccess.replace('/',''):null;
	console.log(req.body);
	let {account_kit} = fbaccountkit;
	let {app_id,app_secret} = account_kit;
	const url = `https://graph.accountkit.com/v1.2/access_token?grant_type=authorization_code&code=${auth_code}&access_token=AA|${app_id}|${app_secret}`;
	Request.get({url,json:true},(err,resp,respBody)=>{
		let {
			access_token,
	        expires_at,
			id} = respBody;
		
	    db.sequelize.transaction().then(t=>{
	    	return db.UserAccount.findAll({where:{AccountKitId:id},transaction:t})
		    .then(accounts=>{
		    	if(accounts.length>0){
					return accounts[0].update({
		    			UserName:phone_number,
		    			Password:password,
					},{fields:['UserName','Password'],transaction:t});
					
                    //res.redirect(`/register?message=${encodeURIComponent("This Phone no ${phone_number} is already used in another account. Pleace register with another number!")}&redirectUrlOnSuccess=${redirectUrlOnSuccess?redirectUrlOnSuccess:''}`);
		    		//res.send(`This Phone no ${phone_number} is already used in another account. Pleace register with another number.`);
                }
                else
                {
                    return db.UserAccount.create({UserName:user_name,Password:password,FullName:fullname,PhoneNo:phone_number,AccountKitId:id,AccountType:'CUSTOMER'},{transaction:t,fields:['UserName','Password','FullName','PhoneNo','AccountKitId','AccountType']});
		    	}
			})
			.then((account)=>{    
				console.log(account);                            
				let token = jwt.encode(account.UserName,uuid.v4());
				res.cookie('access_token',token,{encode:m=>(m)});
				res.cookie('user_id',account.id,{encode:m=>(m)});
				res.cookie('user_name', account.UserName,{encode:m=>(m)});
				res.cookie('account_type',account.AccountType,{encode:m=>(m)});
				// res.cookie('profile_pic',customer.Photo,{encode:m=>(m)});
				res.cookie('full_name',account.FullName,{encode:m=>(m)});
				// res.cookie('entity_id',customer.id,{encode:m=>(m)});
				if(redirectUrlOnSuccess){
					res.redirect(decodeURIComponent(redirectUrlOnSuccess));
				}
				else
					res.redirect("/");                             
				t.commit();
				return null;
			})			
			.catch(error=>{
		    	throw error;
		    	t.rollback();
		    	res.status(500).send(error.message);
		    });
	    });
	    
	});
}

export default registerHandler;