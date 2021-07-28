import { any } from "prop-types";
import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useForm } from "react-hook-form";
import TextControl from "../../components/form/TextControl";
import RadioControl from "../../components/form/RadioControl";
import UserRegisterButtonControl from "./UserRegisterButtonControl";
import LogoutButton from "../../components/LogoutButton";
import axios from "axios";
import { getErrorCondition, getErroMessage} from "../../common/error"

// user initialState
const initialState = {
  id: undefined,
  login_id: undefined,
  password: undefined,
  user_name: undefined,
  email: undefined,
  authority: undefined,
  errors: {}
}

// user reducer
const reducer = (state, action) => {

  switch(action.type) {
    case "GET_USER":
      return {...state,
        id: action.payload.id,
        login_id: action.payload.login_id,
        password: action.payload.password,
        user_name: action.payload.user_name,
        email: action.payload.email,
        authority: action.payload.authority,
        errors: {},
      };
    case "NEW":
      return {...state,
        id: "new",
        errors: {},
      };
    case "CONFIRM":
      return {...state,
        errors: action.payload,
      };
    case "ERROR_CLEAR":
      return {...state,
        errors: {},
      };
  }
  return state;
}

const UserForm = (props) => {
  const {id} = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const [pageMode, setPageMode] = useState(props.pageMode);
  const readOnly = (pageMode === "edit" || pageMode === "new") ? false : true;
  const {control, handleSubmit, reset} = useForm({
    shouldUnregister: false
  });
  const [dummy, setDummy] = useState(false); // Material-UIのTextFieldリフレッシュ用useState

  // userデータ取得
  const getUserInfo = async () => {
    const url = `/api/users/${id}`;
    console.log(pageMode);
    if(pageMode == "new"){
      dispatch ({type: 'NEW', payload: ""})
    }else{
      await axios.get(url).then(
        (response) => {
          const user = response.data.user;
          dispatch ({type: 'GET_USER', payload: user})
        }
      ).catch (
        (error) => {
          if (error.response.status === 404 ) {
            // 一旦アラート表示して検索画面に逃してしまう
            alert("該当ユーザが存在しないよ。");
            history.push("/users");
          } else {
            // その他はサーバサイドエラーとしてしまう。
            history.push('/');
          }
        }
      )
    }
  }

  // user 入力チェック
  const doConfirm = async (data) => {
    const url = `/api/users/${id}/confirm`;
    const userJSON = `{"user": ${JSON.stringify(data)}, "mode": "edit"}`

    await axios.post(url, JSON.parse(userJSON))
    .then(
      () => {
        setPageMode("confirm");
      }
    ).catch(
      (error) => {
        if (error.response.status === 400) {
          const errors = error.response.data;

          console.log(errors);
          dispatch ({type: 'CONFIRM', payload: errors})
        }
        else if (error.response.status === 404) {
          // 一旦アラート表示して検索画面に逃してしまう
          alert("該当ユーザが存在しないよ。");
          history.push("/users");
        } else {
          // その他はサーバサイドエラーとしてしまう。
          history.push('/');
        }
      }
    );
  }

  // user登録 入力チェック
  const doCreateConfirm = async (data) => {
    const url = `/api/users/new/confirm`;
    const userJSON = `{"user": ${JSON.stringify(data)}, "mode": "new"}`

    await axios.post(url, JSON.parse(userJSON))
    .then(
      () => {
        console.log("hogehoge");
        setPageMode("new_confirm");
      }
    ).catch(
      (error) => {
        if (error.response.status === 400) {
          const errors = error.response.data;

          console.log(errors);
          dispatch ({type: 'CONFIRM', payload: errors})
        } else {
          // その他はサーバサイドエラーとしてしまう。
          history.push('/');
        }
      }
    );
  }

  // user 登録更新
  const doPost = async (data) => {
    const url = `/api/users/${id}/update`;
    const userJSON = `{"user": ${JSON.stringify(data)}, "mode": "edit"}`

    axios.patch(url, JSON.parse(userJSON))
    .then(

    ).catch(

    );
  }

  // user 登録更新
  const doCreatePost = async (data) => {
    const url = `/api/users/create`;
    const userJSON = `{"user": ${JSON.stringify(data)}, "mode": "create"}`

    axios.post(url, JSON.parse(userJSON))
    .then( 
      () => {
        history.push("/users");
      }
    ).catch(
      (error) => {
        if (error.response.status === 400) {
          const errors = error.response.data;

          console.log(errors);
          dispatch ({type: 'CONFIRM', payload: errors})
        } else {
          // その他はサーバサイドエラーとしてしまう。
          history.push('/');
        }
      }
    );
  }

  useEffect(() => {
    console.log('**** useEffect ****');
    getUserInfo(id);
  }, []);

  useEffect(() => {
    console.log('**** useEffect(Error) ****');
    setDummy(false);
  }, [state.errors]);

  // Material-UIのTextFieldリフレッシュ用ダミー描画
  // エラーメッセージがあるときに詳細に戻るとラベルがShrinkしないため苦肉の策
  if (dummy){
    return <></>;
  }

  // 初期レンダリング時はデータが取れていないので
  // RHFの関係上、空レンダリングする
  if (state.id === undefined){
    return <></>;
  }

  console.log(pageMode);

  if(pageMode === "new" || pageMode === "new_confirm"){
    return (
      <main>
        <h1>ユーザ</h1>
        <br/>
        <LogoutButton />
        <br/>
        <form onSubmit={handleSubmit(
          pageMode === "new_confirm" ? doCreatePost : doCreateConfirm
        )}>
          <br/>
          <TextControl
            control={control}
            name="login_id"
            label="ログインID"
            value={state.login_id}
            readOnly={readOnly}
            error={getErrorCondition(state.errors, "login_id")}
            helperText={getErroMessage(state.errors, "login_id")}            
          />
          <br/>
          <br/>
          <TextControl
            control={control}
            name="password"
            label="パスワード"
            value={state.password}
            readOnly={readOnly}
            type="password"
            error={getErrorCondition(state.errors, "password")}
            helperText={getErroMessage(state.errors, "password")}            
          />
          <br/>
          <br/>
          <TextControl
            control={control}
            name="user_name"
            label="ユーザ名"
            value={state.user_name}
            readOnly={readOnly}
            error={getErrorCondition(state.errors, "user_name")}
            helperText={getErroMessage(state.errors, "user_name")}            
          />
          <br/>
          <br/>
          <TextControl
            control={control}
            name="email"
            label="メール"
            value={state.email}
            readOnly={readOnly}
            error={getErrorCondition(state.errors, "email")}
            helperText={getErroMessage(state.errors, "email")}            
          />
          <br/>
          <br/>
          <RadioControl
            control={control}
            name="authority"
            label="権限"
            value={state.authority}
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
  }else{
    return (
      <main>
        <h1>ユーザ</h1>
        <br/>
        <LogoutButton />
        <br/>
        <form onSubmit={handleSubmit(
          pageMode === "confirm" ? doPost : doConfirm
        )}>
          <br/>
          <br/>
          <TextControl
            control={control}
            name="id"
            label="ID"
            value={state.id}
            readOnly={true}
          />
          <br/>
          <br/>
          <TextControl
            control={control}
            name="login_id"
            label="ログインID"
            value={state.login_id}
            readOnly={readOnly}
            error={getErrorCondition(state.errors, "login_id")}
            helperText={getErroMessage(state.errors, "login_id")}            
          />
          <br/>
          <br/>
          <TextControl
            control={control}
            name="password"
            label="パスワード"
            value={state.password}
            readOnly={readOnly}
            type="password"
            error={getErrorCondition(state.errors, "password")}
            helperText={getErroMessage(state.errors, "password")}            
          />
          <br/>
          <br/>
          <TextControl
            control={control}
            name="user_name"
            label="ユーザ名"
            value={state.user_name}
            readOnly={readOnly}
            error={getErrorCondition(state.errors, "user_name")}
            helperText={getErroMessage(state.errors, "user_name")}            
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
}

// 何故かTSが邪魔しているので
UserForm.propTypes = {
  pageMode: any,
  location: any
}

export default React.memo(UserForm);
