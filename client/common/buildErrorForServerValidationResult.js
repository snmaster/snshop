/**
 * Created by ChitSwe on 1/24/17.
 */
function buildErrorForServerValidationResult(errors){
    let errs = {};
    if(errors && errors.length>0){
        errors.every((error)=>{
            if(error.key)
                errs[error.key] = error.message;
            else
                errs.errorText = error.message;
            return true;
        });
    }
    return errs;
}

export default buildErrorForServerValidationResult;