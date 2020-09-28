import {
    GET_CATEGORY_DETAILS_REQUEST,
    GET_CATEGORY_DETAILS_SUCCESS,
    GET_CATEGORY_DETAILS_FAILED,
    POST_CATEGORY_DETAILS_REQUEST,
    POST_CATEGORY_DETAILS_SUCCESS,
    POST_CATEGORY_DETAILS_FAILED

 } from '../Constant/Constant_AddGetCategoryDetails';




 //POST 
 export const AddGetCategory = ( state = [], action = []) => {
    switch(action.type)
    {
        case POST_CATEGORY_DETAILS_REQUEST:
            return {
                fetching : true,
                error : ''
            }
        
        case POST_CATEGORY_DETAILS_SUCCESS :
            return {
                fetching : false,
                error : '',
                data : action.data
            }
        
        case POST_CATEGORY_DETAILS_FAILED :
            return {
                fetching : false,
                error : action.error,
                data : action.data
            } 
        case GET_CATEGORY_DETAILS_REQUEST:
            return {
                fetching : true,
                error : ''
            }
        
        case GET_CATEGORY_DETAILS_SUCCESS :
            return {
                fetching : false,
                error : '',
                data : action.data
            }
        
        case GET_CATEGORY_DETAILS_FAILED :
            return {
                fetching : false,
                error : action.error,
                data : action.data
            } 

        default: return state
    }
 }




//  //GET

//  export const GetCategory = (state = [], action = []) => {
//     switch(action.type)
//     {
//         case GET_CATEGORY_DETAILS_REQUEST:
//             return {
//                 fetching : true,
//                 error : ''
//             }
        
//         case GET_CATEGORY_DETAILS_SUCCESS :
//             return {
//                 fetching : false,
//                 error : '',
//                 data : action.data
//             }
        
//         case GET_CATEGORY_DETAILS_FAILED :
//             return {
//                 fetching : false,
//                 error : action.error,
//                 data : action.data
//             } 
        
//         default: return state
//     }
//  }