/**
 * Created by ChitSwe on 1/25/17.
 */
import update from 'react-addons-update';

const setProp=(obj,prop,value)=>{
    return update(obj,{
        [prop]:{
            $set:value
        }
    });
};
export {setProp};