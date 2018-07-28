/**
 * Created by ChitSwe on 1/6/17.
 */
const MutationHelper = {
    buildErrorResult:(error)=>{
        return new Promise((resolve)=>{resolve({instance:null,errors:error.errors.map(e=>({key:e.path,message:e.message}))});})
    }
};