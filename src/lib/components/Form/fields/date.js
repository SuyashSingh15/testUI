import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

const Field = ({ column, field, fieldLabel, formik, otherProps, classes, fieldConfigs }) => {
    const isDisabled = (fieldConfigs?.disabled) || (column.dependentField && formik.values[column.dependentField.field] === "");
    const dateValue = formik.values[field] ? dayjs(formik.values[field]) : null;
    console.log("dateValue", dateValue);

    fieldLabel = fieldLabel || column.label;
    fieldLabel += column.required ? " *" : "";
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {fieldLabel && <InputLabel sx={{
                margin: '0.9rem 2rem 2.5rem 0rem',
                position: 'absolute', zIndex: '1', transform: 'translate(14px, -9px) scale(0.75)',
                color: formik.touched[field] && formik.errors[field] ? "#f44336" : "inherit"
            }}>{fieldLabel}</InputLabel>}
            <DatePicker
                {...otherProps}
                variant="standard"
                minDate={column?.dependentField?.operator === ">=" && formik.values[column.dependentField.field] !== "" ? dayjs(formik.values[column.dependentField.field]) : null}
                readOnly={column?.readOnly === true}
                key={field}
                fullWidth
                name={field}
                value={dateValue}
                onChange={(value) => {
                    console.log("value", value);
                    formik.setFieldValue(field, value)
                }}
                onBlur={formik.handleBlur}
                helperText={formik.touched[field] && formik.errors[field]}
                disableFuture={column.disableFuture}
                disablePast={column?.disablePast}
                disabled={isDisabled}
                slotProps={{
                    textField: {
                        helperText: formik.touched[field] && formik.errors[field],
                        error: formik.touched[field] && formik.errors[field]
                    },
                }}
                renderInput={(params) => {
                    let helperText;
                    if (isDisabled && column.showErrorText) {
                        helperText = `Survey already started`;
                    } else if (formik.touched[field] && formik.errors[field]) {
                        helperText = formik.errors[field];
                    }
                    const showError = !!helperText;
                    const props = { ...params, variant: "standard", error: showError };
                    return <TextField
                        {...props}
                        helperText={helperText}
                        fullWidth />
                }}
            />
        </LocalizationProvider>
    );
};

export default Field;
