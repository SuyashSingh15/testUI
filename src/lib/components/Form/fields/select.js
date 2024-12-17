import React from "react";
import {
    FormHelperText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Field = ({
    column,
    field,
    fieldLabel,
    formik,
    activeRecord,
    otherProps,
    classes,
    onChange,
    lookups,
}) => {
    let options = lookups ? lookups[column?.lookup] : [];
    if (column.dependentField?.operator === "equals" && formik.values[column.dependentField.field] !== "") {
        const selectedHospitalId = formik.values[column.dependentField.field];
        options = options.filter(
            (option) => option[column.dependentField.lookupFieldToBeComparedWith] === selectedHospitalId
        );
    }
    let inputValue;
    if (column.valueParserForForm) {
        inputValue = column.valueParserForForm(formik.values[field]);
    } else {
        inputValue = String(formik.values[field]);
    }
    if (column.multiSelect) {
        if (!inputValue || inputValue.length === 0) {
            inputValue = [];
        } else if (!Array.isArray(inputValue)) {
            inputValue = inputValue.split(",").map((e) => parseInt(e));
        }
    }
    fieldLabel = fieldLabel || column.label;
    fieldLabel += column.required ? " *" : "";
    return (
        <FormControl fullWidth key={field} variant="standard">
            <InputLabel error={formik.touched[field] && formik.errors[field]}>{fieldLabel}</InputLabel>
            <Select
                IconComponent={KeyboardArrowDownIcon}
                {...otherProps}
                error={formik.touched[field] && formik.errors[field]}
                name={field}
                disabled={column.dependentField?.field && !formik.values[column.dependentField.field] || !options.length}
                multiple={column.multiSelect === true}
                readOnly={column.readOnly === true}
                value={inputValue}
                renderValue={(selected) => {
                    if (Array.isArray(selected)) {
                        return selected
                            .map((value) => {
                                const option = options.find(
                                    (option) => option.value === value
                                );
                                return option ? option.label : "Select";
                            })
                            .join(", ");
                    } else {
                        const selectedOption = options.find(
                            (option) => option.value === parseInt(selected)
                        );
                        return selectedOption ? selectedOption.label : "Select";
                    }
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                {Array.isArray(options) &&
                    options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
            </Select>
            {formik.touched[field] && formik.errors[field] &&
                (<FormHelperText error={true}>
                    {formik.errors[field]}
                </FormHelperText>)
            }
        </FormControl>
    );
};

export default Field;
