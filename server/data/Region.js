import db from '../models/index';
import {property} from 'lodash';
import cloudinary from '../cloudinary';

export const type=`
    type Region{
        id:Int!
        Name:String!
    }
    type RegionMutationResult{
        instance:Region
        errors:[error]
    }

    input InputRegion{
        id:Int
        Name:String!
        ImagePath:String        
    }
`;

export const query=`
    Region:[Region]
`;


export const  mutation=`   
`;

export const resolver={

    type:{
        Region:{
            id:property('id'),
            Name:property('Name')      
        }
    },
    query:{
        Region(_,{}){
            return db.Region.findAll();
        },
    },
    mutation:{
        
    }
};