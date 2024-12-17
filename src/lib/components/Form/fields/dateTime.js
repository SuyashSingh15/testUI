import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

const field = ({ column, field, fieldLabel, formik, otherProps, classes }) => {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
            {...otherProps}
            variant="standard"
            readOnly={column?.readOnly === true}
            key={field}
            fullWidth
            name={field}
            value={formik.values[field]}
            onChange={(value) => formik.setFieldValue(field, value)}
            onBlur={formik.handleBlur}
            helperText={formik.touched[field] && formik.errors[field]}
            disablePast={column?.disablePast}
            renderInput={(params) => {
                const props = { ...params, variant: "standard" };
                return <TextField
                    {...props}
                    helperText={formik.errors[field]}
                    fullWidth
                />
            }}
        />
    </LocalizationProvider>
}

export default field;