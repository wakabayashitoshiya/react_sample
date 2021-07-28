import React from "react"
import { Controller } from "react-hook-form";
import {Radio , FormControl , RadioGroup , FormControlLabel , FormLabel} from '@material-ui/core/';
import { any, bool, string } from "prop-types";

const RadioControl = (props) => {
  const name = props.name;
  const control = props.control;
  const value = props.value;

  /*
  * RHF(React Hook Form)のControllerコンポーネント(wapper)
  * 使用してMaterial-UIのTextFieldを使用している
  * かなりカオス
  */
  console.log(name);
  return (
    <Controller
      name={name}
      control={control}  
      defaultValue={value}
      render={
        function render ({ field:{ value, ref, onChange} }) {
          return (
            <FormControl component="fieldset">
            <FormLabel component="legend">権限</FormLabel>
            <RadioGroup 
              row 
              aria-label="position" 
              name="position" 
              defaultValue="administrator" 
              value={value} 
              onChange={onChange}>
            <FormControlLabel
                value="administrator"
                control={<Radio color="primary" />}
                label="管理者"
                labelPlacement="start"
                inputRef={ref}
              />
              <FormControlLabel
                value="member"
                control={<Radio color="primary" />}
                label="メンバー"
                labelPlacement="start"
                inputRef={ref}
              />
            </RadioGroup>
          </FormControl>
          )
        }
      }
    />
  );
}
// 何故かTSが邪魔しているので
RadioControl.propTypes = {
  name: string,
  control: any,
  label: string,
  value: any,
  readOnly: bool,
  type: string,
  helperText: string,
  error: bool
};

export default React.memo(RadioControl);
