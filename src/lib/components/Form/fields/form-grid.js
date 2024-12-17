import React from 'react';
import { makeStyles } from "@material-ui/core";
import { useCallback } from "react";

const useStyles = makeStyles({
    divSpacing: {
        marginTop: '10px',
        marginBottom: '10px'
    },
    boldText: {
        fontWeight: 'bold'
    }
});
const TransferField = ({ component, name, field, formik, type, model, ...props }) => {
    const { value } = formik.getFieldProps(name || field);
    const { setFieldValue } = formik;
    const Component = component || props.column.grid;
    const classes = useStyles();
    const onAssignChange = useCallback((value) => {
        setFieldValue(name || field, value);
    }, [setFieldValue, name, field]);
    return (
        <div>
            <Component selectedId={props.id} processRowUpdate={props.column?.processRowUpdate}
            />
        </div>
    )
}

export default TransferField;