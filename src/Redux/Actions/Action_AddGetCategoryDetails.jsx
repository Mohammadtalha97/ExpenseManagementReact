import {
  GET_CATEGORY_DETAILS_REQUEST,
  GET_CATEGORY_DETAILS_SUCCESS,
  GET_CATEGORY_DETAILS_FAILED,
  POST_CATEGORY_DETAILS_REQUEST,
  POST_CATEGORY_DETAILS_SUCCESS,
  POST_CATEGORY_DETAILS_FAILED,
} from "../Constant/Constant_AddGetCategoryDetails";

//get_request
const getRequest = () => {
  return {
    type: GET_CATEGORY_DETAILS_REQUEST,
    error: "",
  };
};

//get_success
const getSuccess = (data) => {
  return {
    type: GET_CATEGORY_DETAILS_SUCCESS,
    error: "",
    data: data,
  };
};

//get_failed
const getFailed = (data) => {
  return {
    type: GET_CATEGORY_DETAILS_FAILED,
    error: "",
    data: data,
  };
};

//get category method
export const getCategory = (obj) => {
  // console.log('inside get action', obj);
  getRequest();
  return (dispatch) => {
    const category = JSON.parse(localStorage.getItem("CategoryDetails")) || [];

    // console.log('all',category)

    const getCategory = category.filter((x) => (x.UserEmail = obj));

    // console.log('Single',getCategory)

    if (getCategory) {
      dispatch(getSuccess(getCategory));
    } else {
      dispatch(getFailed(getCategory));
    }
  };
};

//post_request

const postRequest = () => {
  return {
    type: POST_CATEGORY_DETAILS_REQUEST,
    error: "",
  };
};

//post_success

const postSuccess = (data) => {
  return {
    type: POST_CATEGORY_DETAILS_SUCCESS,
    error: "",
    data: data,
  };
};

//post_failed
const postFailed = (data, err) => {
  return {
    type: POST_CATEGORY_DETAILS_FAILED,
    error: err,
    data: data,
  };
};

//post category method

export const addCategory = (categoryDetails) => {
  postRequest();

  return (dispatch) => {
    let categoryDetailsLocalStorage =
      JSON.parse(localStorage.getItem("CategoryDetails")) || [];

    let localStorageEmail = localStorage.getItem("UserEmail");

    if (
      categoryDetailsLocalStorage.filter(
        (x) => x.UserEmail === localStorageEmail
      )
    ) {
      let tempArray = [];
      tempArray = {
        categoryId:
          categoryDetailsLocalStorage.length === 0
            ? 1
            : Math.max(
                ...categoryDetailsLocalStorage.map((x) => {
                  return x.categoryId;
                })
              ) + 1,
        categoryName: categoryDetails.categoryName,
        categoryAmount: categoryDetails.categoryAmount,
        UserEmail: categoryDetails.UserEmail,
        RemainingAmount: categoryDetails.categoryAmount,
        SpentList: [],
        Status: true,
      };

      categoryDetailsLocalStorage.push(tempArray);

      let checkStatus = localStorage.setItem(
        "CategoryDetails",
        JSON.stringify(categoryDetailsLocalStorage)
      );
      if (checkStatus) {
        return dispatch(postSuccess(categoryDetailsLocalStorage));
      } else {
        return dispatch(
          postFailed(
            categoryDetailsLocalStorage,
            "something went wrong while saving data"
          )
        );
      }
    } else {
      return dispatch(categoryDetailsLocalStorage, "Something went wrong..!!");
    }
  };
};
