import { combineReducers } from 'redux';

import {AddGetCategory} from './Reducer_AddGetCategoryDetails';
import {DescriptionAndSpentAmout} from './Reducer_DescriptionAndSpentAmout';

export default combineReducers({
    AddGetCategory,
    DescriptionAndSpentAmout
});