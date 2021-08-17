//import React, { useReducer, useState } from "react";
//import { useParams } from "react-router";
import TextControl from "../../../components/form/TextControl";
import RadioControl from "../../../components/form/RadioControl";
import UserRegisterButtonControl from "../UserRegisterButtonControl";
import { useForm } from "react-hook-form";
import React from "react";
import { any } from "prop-types";
import LogoutButton from "../../../components/LogoutButton";
import { getErrorCondition, getErroMessage} from "../../../common/error"

// user initialState
  //const initialState = {
  //  id: undefined,
  //  login_id: undefined,
  //  password: undefined,
  //  user_name: undefined,
  //  email: undefined,
  //  authority: undefined,
  //  errors: {}
  //}

  //const authorityOption = {
  //  authorityName:["メンバー" , "管理者"],
  //  authorityVal:["member","administrator"],
  //}
    // user 登録更新

  const CreateComponent = (props) => {
    const {control, handleSubmit, reset} = useForm({
      shouldUnregister: false
    });
    const id = props.state.id
    const login_id = props.state.login_id   
    const password = props.state.password 
    const user_name = props.state.user_name
    const email = props.state.email
    const authority = props.state.authority
    const errors = props.state.errors
    const setPageMode = props.setPageMode
    const pageMode = props.pageMode
    const dispatch = props.dispatch
    const setDummy = props.setDummy
    const doCreatePost = props.doCreatePost
    const doConfirm = props.doConfirm
    const readOnly = props.readOnly
    const authorityOption = props.authorityOption
    if (pageMode === "new_confirm"){
      console.log("doCreatePost")
    }else{
      console.log("doConfirm")
    }

    console.log(props.state)
    return(
    <main>
      <h1>ユーザ</h1>
      <br/>
      <LogoutButton />
      <br/>
      <form onSubmit={handleSubmit(
        pageMode === "new_confirm" ? doCreatePost : doConfirm
      )}>
        <br/>
        <TextControl
          control={control}
          name="login_id"
          label="ログインID"
          value={login_id}
          readOnly={readOnly}
          error={getErrorCondition(errors, "login_id")}
          helperText={getErroMessage(errors, "login_id")}            
        />
        <br/>
        <br/>
        <TextControl
            control={control}
            name="password"
            label="パスワード"
            value={password}
            readOnly={readOnly}
            type="password"
            error={getErrorCondition(errors, "password")}
            helperText={getErroMessage(errors, "password")}
        />
        <br/>
        <br/>
        <TextControl
          control={control}
          name="user_name"
          label="ユーザ名"
          value={user_name}
          readOnly={readOnly}
          error={getErrorCondition(errors, "user_name")}
          helperText={getErroMessage(errors, "user_name")}            
        />
        <br/>
        <br/>
        <TextControl
          control={control}
          name="email"
          label="メール"
          value={email}
          readOnly={readOnly}
          error={getErrorCondition(errors, "email")}
          helperText={getErroMessage(errors, "email")}            
        />
        <br/>
        <br/>
        <RadioControl
          control={control}
          name="authority"
          label="権限"
          authorityOption={authorityOption}
          value={authority}
          readOnly={readOnly}
        />
        <br/>
        <br/>
        <UserRegisterButtonControl
          id={id}
          pageMode={pageMode}
          useState={setPageMode}
          dispatch={dispatch}
          setDummy={setDummy}  // Material-UIのTextFieldリフレッシュ用useState
          reset={reset}
        />
      </form>
    </main>        
    );
  }

  CreateComponent.propTypes = {
    state: any,
    doCreatePost: any ,
    doConfirm: any,
    pageMode: any,
    readOnly:any,
    setPageMode: any,
    dispatch:any,
    setDummy:any,
    authorityOption: any
  }

export default React.memo(CreateComponent);