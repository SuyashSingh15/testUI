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

const TransferField = ({
    component,
    name,
    field,
    formik,
    type,
    model,
    ...props
}) => {
    const { value } = formik.getFieldProps(name || field);
    const { setFieldValue } = formik;
    const Component = component || props.column.relation;
    const classes = useStyles();

    const onAssignChange = useCallback((newValue) => {
        setFieldValue(name || field, newValue);
    }, [setFieldValue, name, field]);

    return (
        <div>
            <div className={`${classes.divSpacing} ${classes.boldText}`}>Available</div>
            <Component selected={value} available={true} onAssignChange={onAssignChange} />
            <div className={`${classes.divSpacing} ${classes.boldText}`}>Assigned</div>
            <Component selected={value} assigned={true} onAssignChange={onAssignChange} />
        </div>
    );
}

export default TransferField;
