/**
 * Created by ChitSwe on 1/3/17.
 */

const  cloud_name='chitswe';


const PhotoManager = {
    url:`https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
    ProductBrand:{
        preset:'shopkeeper_brand',
        upload:(file)=>{
            const PRESET = PhotoManager.ProductBrand.preset;
            const URL =PhotoManager.url;
            return PhotoManager.upload(file,PRESET,URL);
        }
    },
    ProductGroup:{
        preset:'shopkeeper_product_group',
        upload:(file)=>{
            return PhotoManager.upload(file,PhotoManager.ProductGroup.preset,PhotoManager.url);
        }
    },
    Product:{
        preset:'shopkeeper_product',
        upload:(file)=>{
            return PhotoManager.upload(file,PhotoManager.Product.preset,PhotoManager.url);
        }
    },
     User:{
        preset:'shopkeeper_user',
        upload:(file)=>{
            return PhotoManager.upload(file,PhotoManager.User.preset,PhotoManager.url);
        }
    },
    Customer:{
        preset:'shopkeeper_customer',
        upload:(file)=>{
            return PhotoManager.upload(file,PhotoManager.Customer.preset,PhotoManager.url);
        }
    },

    BankTransfer:{
        preset:'shopkeeper_banktransfer',
        upload:file=>{
            return PhotoManager.upload(file,PhotoManager.BankTransfer.preset,PhotoManager.url);
        }
    },
    ProductSpecValueIcon:{
        preset:'shopkeeper_product_spec_value',
        upload:file=>{
            return PhotoManager.upload(file,PhotoManager.ProductSpecValueIcon.preset,PhotoManager.url);
        }
    },
    ProductSpecIcon:{
        preset:'shopkeeper_product_spec',
        upload:file=>{
            return PhotoManager.upload(file,PhotoManager.ProductSpecIcon.preset,PhotoManager.url);
        }
    },
    
    upload:(file,PRESET,URL)=>{
        const formData = new FormData();
        formData.append('upload_preset',PRESET);
        formData.append('file',file);
        return fetch(URL,{
            method:'POST',
            body:formData
        }).then((response)=>{
            return response.json();
        }).then(({secure_url,format,public_id})=>{
            return {secure_url,format,public_id};
        });
    }
};

export default PhotoManager;