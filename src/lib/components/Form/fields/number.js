import React from 'react';
import StringField from './string';

const field = ({ column, otherProps, formik, field, ...props }) => {
    const { minValue: min, maxValue: max } = column;
    const minKey = 47;
    const maxKey = 58;
    otherProps = {
        InputProps: {
            inputProps: {
                min: Math.max(0, min),
                max,
                readOnly: column?.readOnly === true,
                onKeyPress: (event) => {
                    const keyCode = event.which ? event.which : event.keyCode;
                    if (!(keyCode > minKey && keyCode < maxKey)) {
                        event.preventDefault();
                    }
                },
            }
        },
        type: 'number',
        ...otherProps,
        onBlur: (event) => {
            if (event.target.value < Math.max(0, min)) {
                formik.setFieldValue(field, Math.max(0, min));
            }
            if (props.onBlur) {
                props.onBlur(event);
            }
        },
    }
    return <StringField column={column} otherProps={otherProps} formik={formik} field={field} {...props} />;
};

export default field;   