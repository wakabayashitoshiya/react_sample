import React from "react"
import { Controller } from "react-hook-form";
import {Radio , FormControl , RadioGroup , FormControlLabel , FormLabel} from '@material-ui/core/';
import { any, bool, string } from "prop-types";

const RadioControl = (props) => {
  const name = props.name;
  const control = props.control;
  const value = props.value;
  const hoge = props.hoge;

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
                value={hoge["authorityVal"][0]}
                control={<Radio color="primary" />}
                label={hoge["authorityName"][0]}
                labelPlacement="start"
                inputRef={ref}
              />
              <FormControlLabel
                value={hoge["authorityVal"][1]}
                control={<Radio color="primary" />}
                label={hoge["authorityName"][1]}
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
  hoge: any,
  readOnly: bool,
  type: string,
  helperText: string,
  error: bool
};

export default React.memo(RadioControl);
