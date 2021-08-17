import React from "react"
import { Controller } from "react-hook-form";
import {Radio , FormControl , RadioGroup , FormControlLabel , FormLabel} from '@material-ui/core/';
import { any, bool, string } from "prop-types";

const RadioControl = (props) => {
  const name = props.name;
  const control = props.control;
  const value = props.value;
  const authorityOption = props.authorityOption;
  const readOnly = props.readOnly;

  console.log("--------------------hogeeeeee---------------------");

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
          return (
            <FormControl component="fieldset">
            <FormLabel component="legend">権限</FormLabel>
            <RadioGroup 
              row 
              aria-label="position" 
              name="position" 
              defaultValue="member" 
              value={value} 
              onChange={onChange}>
              <FormControlLabel
                value={authorityOption["authorityVal"][0]}
                control={<Radio color="primary" />}
                label={authorityOption["authorityName"][0]}
                labelPlacement="start"
                inputRef={ref}
                disabled={readOnly}
              />
              <FormControlLabel
                value={authorityOption["authorityVal"][1]}
                control={<Radio color="primary" />}
                label={authorityOption["authorityName"][1]}
                labelPlacement="start"
                inputRef={ref}
                disabled={readOnly}
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
  authorityOption: any,
  readOnly: bool,
  type: string,
  helperText: string,
  error: bool
};

export default React.memo(RadioControl);
