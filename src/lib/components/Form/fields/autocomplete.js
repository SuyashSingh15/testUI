import * as React from 'react';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Field = ({ column, field, fieldLabel, formik, combos, data, otherProps, model, fieldConfigs }) => {
    const SurveyType = combos?.[model?.comboType];
    let inputValue = formik.values[field]?.split(", ")?.map(Number) || [];
    let filteredCombos = SurveyType?.filter(combo => inputValue.includes(combo.LookupId)) || [];
    const isDisabled = fieldConfigs?.disabled;
    const handleAutoCompleteChange = (event, newValue) => {
        formik?.setFieldValue(field, newValue ? newValue.map(val => val.LookupId).join(', ') : '');
    }

    return (
        <FormControl
            fullWidth
            key={field}
            variant="standard"
            error={formik.touched[field] && Boolean(formik.errors[field])}
        >
            <Autocomplete
                {...otherProps}
                multiple
                id={field}
                options={SurveyType || []}
                getOptionLabel={(option) => option.DisplayValue || ''}
                defaultValue={filteredCombos}
                renderInput={(params) => <TextField {...params} variant="standard" />}
                onChange={handleAutoCompleteChange}
                value={filteredCombos}
                size="small"
                disabled={isDisabled}
            />
            {formik.touched[field] && formik.errors[field] && <FormHelperText>{formik.errors[field]}</FormHelperText>}
        </FormControl>
    )
}

export default Field;

