import GridBase from './index';
import React from 'react';
import * as yup from 'yup';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Form from '../Form/Form';

const nonAlphaNumeric = /[^a-zA-Z0-9]/g;
const customStyle = {};
const showRowsSelected = true;
const defaultValueConfigs = {
    "string": "",
    "boolean": false,
    "radio": false,
    "oneToMany": ""
}
class UiModel {

    constructor(modelConfig) {
        const { title, controllerType, url } = modelConfig;
        let { api, idProperty = api + 'Id' } = modelConfig;
        if (!api) {
            api = `${title.replaceAll(nonAlphaNumeric, '-').toLowerCase()}`;
            idProperty = title.replaceAll(' ', '') + 'Id';
        }
        // api = controllerType === 'cs' ? `${api}.ashx` : `internal-reporting/api/${api}`;
        api = url
        const defaultValues = { ...modelConfig.defaultValues };
        Object.assign(this, { standard: true, idProperty, ...modelConfig, api });
        const columnVisibilityModel = {};
        for (const col of this.columns) {
            const name = col.field || col.id;
            if (col.hide === true) {
                columnVisibilityModel[col.id || col.field] = false;
            }
            defaultValues[name] = col.defaultValue === undefined ? (defaultValueConfigs[col.type] || "") : col.defaultValue;
        }
        this.columnVisibilityModel = columnVisibilityModel;
        this.defaultValues = defaultValues;
    }

    getValidationSchema({ id }) {
        const { columns } = this;
        let validationConfig = {};
        for (const column of columns) {
            const { field, label, header, type = 'string', requiredIfNew = false, required = false, min = '', max = '', validationLength = 0, multiSelect } = column;
            const formLabel = label || header;
            if (!formLabel) {
                continue;
            }
            let config;
            switch (type) {
                case 'string':
                    config = yup.string().trim().label(formLabel);
                    if (min) {
                        config = config.min(Number(min), `${formLabel} must be at least ${min} characters long`);
                    }
                    if (max) {
                        config = config.max(Number(max), `${formLabel} must be at most ${max} characters long`);
                    }
                    break;
                //Validation "oneToMany" type for grid to show snackbar - commenting out for use in future
                // case 'oneToMany':
                //     config = yup.string().label(formLabel).test(value => {
                //         const valueArray = (value && value.length > 0) ? value.split(',').map(item => item.trim()) : [];
                //         if (valueArray.length < 2) {
                //             snackbar.showError(`Please assign at least 2 ${formLabel}`, null, "error");
                //             return false;
                //         } else {
                //             return true;
                //         }
                //     });
                //     break;
                case 'boolean':
                    config = yup.bool().nullable().transform((value, originalValue) => {
                        if (originalValue === '') return null;
                        return value;
                    }).label(formLabel);
                    break;

                case 'radio':
                case 'dayRadio':
                    config = yup.mixed().label(formLabel).required(`Select at least one option for ${formLabel}`);
                    break;
                case 'date':
                    config = yup.date().nullable().transform((value, originalValue) => {
                        if (originalValue === '' || originalValue === null) return null;
                        return value;
                    }).label(formLabel).required(`${formLabel} is required`);
                    break;
                case 'select':
                    if (multiSelect) {
                        config = yup.array().label(formLabel).required(`Select at least one ${formLabel}`)
                    } else {
                        config = yup.string().trim().label(formLabel).required(`${formLabel} is required`);
                    }
                    break;
                case 'time':
                    config = yup.string().trim().label(formLabel).required(`${formLabel} is required`);
                    break;
                case 'autocomplete':
                    config = yup.string().trim().label(formLabel).required(`Select at least one ${formLabel}`);
                    break;
                default:
                    config = yup.mixed().label(formLabel);
                    break;
            }
            if (!multiSelect && required) {
                config = config.required(`${formLabel} is required`);
            }
            if (requiredIfNew && (!id || id === '')) {
                config = config.required(`${formLabel} is required`);
            }
            validationConfig[field] = config;
        }

        let validationSchema = yup.object({ ...validationConfig, ...this.validationSchema });
        return validationSchema;
    }

    Form = ({ match, ...props }) => {
        return <Form model={this} Layout={this.Layout} {...props} />
    }

    Grid = ({ match, ...props }) => {
        return <Paper><GridBase model={this} showRowsSelected={showRowsSelected} {...props} /></Paper>
    }
    ChildGrid = (props) => {
        const { permissions } = this;
        const propsToBePassed = { ...props };
        if (permissions) propsToBePassed.permissions = permissions;
        return <>
            <GridBase model={this} {...propsToBePassed} customStyle={customStyle} showRowsSelected={showRowsSelected} />
            <Divider orientation='horizontal' sx={{ mt: 2 }} />
        </>
    }
}

export {
    UiModel
}