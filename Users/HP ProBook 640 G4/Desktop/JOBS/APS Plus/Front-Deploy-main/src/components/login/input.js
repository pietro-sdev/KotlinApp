import React, { useState } from "react";
import { TextField, Grid } from "@mui/material";
import styles from '../../view/login/login.module.css'

export function Input(props) {
    const { InputProps, name, disabled, label, value, onChange, error, helperText, xs, additionalClass, type, InputLabelProps } = props;
    const [focusedOnce, setFocusedOnce] = useState(false);
    return (
        <Grid
            item
            className={styles.grid}
            xs={xs}
        >
            <TextField className={`${styles.textfield} ${focusedOnce && additionalClass}`}
                variant="outlined"
                inputProps={{ className: styles.textField }}
                fullWidth
                disabled={disabled}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => { setFocusedOnce(true); }}
                error={focusedOnce && error}
                helperText={helperText}
                type={type}
                InputLabelProps={InputLabelProps}
                InputProps={{ startAdornment: InputProps }}
            />
        </Grid>
    );
}