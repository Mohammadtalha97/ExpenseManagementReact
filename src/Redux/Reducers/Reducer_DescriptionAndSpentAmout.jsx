import {
    GET_EXPENSE_REQUEST,
    GET_EXPENSE_SUCCESS,
    GET_EXPENSE_FAILED,
    POST_EXPENSE_REQUEST,
    POST_EXPENSE_SUCCESS,
    POST_EXPENSE_FAILED
} from '../Constant/Constant_DescriptionAndSpentAmout';




 //POST 
 export const DescriptionAndSpentAmout = ( state = [], action = []) => {
    switch(action.type)
    {
        case POST_EXPENSE_REQUEST:
            return {
                fetching : true,
                error : ''
            }
        
        case POST_EXPENSE_SUCCESS :
            return {
                fetching : false,
                error : '',
                data : action.data
            }
        
        case POST_EXPENSE_FAILED :
            return {
                fetching : false,
                error : action.error,
                data : action.data
            } 
        case GET_EXPENSE_REQUEST:
            return {
                fetching : true,
                error : ''
            }
        
        case GET_EXPENSE_SUCCESS :
            return {
                fetching : false,
                error : '',
                data : action.data
            }
        
        case GET_EXPENSE_FAILED :
            return {
                fetching : false,
                error : action.error,
                data : action.data
            } 

        default: return state
    }
 }


