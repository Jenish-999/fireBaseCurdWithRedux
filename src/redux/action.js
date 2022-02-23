import { toast } from "react-toastify";
import { action_types } from "./types";

export const user_register_action = () => {
  return {
    type: action_types.REGISTER_USER,
  };
};

export const user_display_action = (post) => {
  return {
    type: action_types.DISPLAY_USER,
    payload: post
  };
};

export const user_delete_action = () => {
  return {
    type: action_types.DELETE_USER,
  };
};

export const user_update_action = (post) => {
  return {
    type: action_types.UPDATE_USER,
    payload: post
  };
};

export const user_view_action = (post) => {
  return {
    type: action_types.VIEW_USER,
    payload: post
  };
};

export const registerUserFunction = (name, email, address, contact,id) => {
  return (dispatch) => {
    dispatch(user_register_action());

    if(!id){
        const resp = fetch("https://memberscurdopt-default-rtdb.firebaseio.com/curdOpt.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            address,
            contact,
          }),
        });
    
        if (resp){
            toast.success("Success, Data is uploaded");
        }else{
            toast.error("Error, try again later!!");
        }
    }else{
        const resp = fetch(`https://memberscurdopt-default-rtdb.firebaseio.com/curdOpt/${id}.json`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              address,
              contact,
            }),
          });
      
          if (resp){
              toast.success("Success, Data is updated");
          }else{
              toast.error("Error, try again later!!");
          }
    }

  };
};


export const displayUserFunction = (post) =>{
    return (dispatch)=>{
        dispatch(user_display_action(post));


    }
}

export const setUpdateData = (post) =>{
    return (dispatch) =>{
        dispatch(user_update_action(post));
    }
}

export const userViewFunction = (post) =>{
    return (dispatch) =>{
        dispatch(user_view_action(post));
    }

}

