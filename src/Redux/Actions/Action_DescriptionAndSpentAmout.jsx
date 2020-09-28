import {
  GET_EXPENSE_REQUEST,
  GET_EXPENSE_SUCCESS,
  GET_EXPENSE_FAILED,
  POST_EXPENSE_REQUEST,
  POST_EXPENSE_SUCCESS,
  POST_EXPENSE_FAILED,
} from "../Constant/Constant_DescriptionAndSpentAmout";

//post_request

const postRequest = () => {
  return {
    type: POST_EXPENSE_REQUEST,
    error: "",
  };
};

//post_success

const postSuccess = (data) => {
  return {
    type: POST_EXPENSE_SUCCESS,
    error: "",
    data: data,
  };
};

//post_failed
const postFailed = (data, err) => {
  return {
    type: POST_EXPENSE_FAILED,
    error: err,
    data: data,
  };
};

//post category method

export const addExpense = (expenseDetails) => {
  //  postRequest()

  return (dispatch) => {
    let categoryDetailsLocalStorage =
      JSON.parse(localStorage.getItem("CategoryDetails")) || [];

    let tempArray = [];
    categoryDetailsLocalStorage.map((x) => {
      if (x.categoryId === expenseDetails.categoryObject.categoryId) {
        tempArray.push(expenseDetails.categoryObject);
      } else {
        tempArray.push(x);
      }
    });

    let checkStatus = localStorage.setItem(
      "CategoryDetails",
      JSON.stringify(tempArray)
    );
  };
};
