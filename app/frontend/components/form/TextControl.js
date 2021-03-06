import React from "react"
import { Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { any, bool, string } from "prop-types";

const TextControl = (props) => {
  const name = props.name;
  const control = props.control;
  const label = props.label;
  const value = props.value;
  const readOnly = props.readOnly;
  const type = props.type;
  const error = props.error;
  const helperText = props.helperText;

  if(props.display == "none" ){
    console.log("---------------------------")
    console.log(value)
    console.log("---------------------------")
  }
  /*
  * RHF(React Hook Form)のControllerコンポーネント(wapper)
  * 使用してMaterial-UIのTextFieldを使用している
  * かなりカオス
  */
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value}
      render={
        function render ({ field:{ value, ref, onChange} }) {
          if(props.display == "none" ){
            return (
              <TextField
                label={label}
                variant="outlined"
                defaultValue={value}
                onChange={onChange}
                inputRef={ref}
//                style={{ display: 'none' }} 
                InputProps={{
                  readOnly: readOnly,
//                  style: { display: 'none' },
                }}
                type={type}
                helperText={helperText}
                error={error}
              />
            );             
          }else{
            return (
              <TextField
                label={label}
                variant="outlined"
                defaultValue={value}
                onChange={onChange}
                inputRef={ref}
                InputProps={{
                  readOnly: readOnly,
                }}
                type={type}
                helperText={helperText}
                error={error}
              />
            );             
          }
        }
      }
    />
  );
}
// 何故かTSが邪魔しているので
TextControl.propTypes = {
  name: string,
  control: any,
  label: string,
  value: any,
  readOnly: bool,
  type: string,
  helperText: string,
  display: string,
  error: bool
};

export default React.memo(TextControl);
