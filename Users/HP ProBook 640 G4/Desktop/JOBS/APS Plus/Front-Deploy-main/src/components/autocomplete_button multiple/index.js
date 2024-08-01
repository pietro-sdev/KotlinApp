import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function AutoCompleteButtonMultiple({ value, startValue = "", freeSolo, variant,
    borderRadius = '0.5rem', color = "white", backgroundColor = '#003895', width = '100%',
    label, names, textColor = '#000', onInputChange, margin = 0, fontFamily = "Mulish",
    fontStyle = "normal", fontWeight = "500", fontSize = "18px", lineHeight = "24px",onChange
}) {

    return (
        <Autocomplete
        multiple
        id="tags-filled"
        defaultValue={[]}
        options={names}
        freeSolo={freeSolo}
        key="thirteen"
        value={undefined}
        onInputChange={onInputChange}
        onChange = {onChange}
        sx={{
            borderRadius: borderRadius,
            /*,textTransform: 'none' */
            fontFamily: 'Mulish'
            , backgroundColor: backgroundColor
            , width: width
            // , height:height
            , margin: margin
            , '& .MuiAutocomplete-inputRoot': {
                color: textColor,
                fontFamily: fontFamily,
                fontStyle: fontStyle,
                fontWeight: fontWeight,
                fontSize: fontSize,
                lineHeight: lineHeight,
            }
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label={label}
            placeholder="Digite aqui"
          />
        )}
      />
    );

}