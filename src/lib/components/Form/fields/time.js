import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const Field = ({ column, field, fieldLabel, formik, otherProps, classes, onChange }) => {
  const [timePeriod, setTimePeriod] = useState("AM");
  const [time, setTime] = useState(null);

  useEffect(() => {
    let dateTime;
    const hasDependentField = column?.dependentField?.operator === ">=";
    if (formik.values[field]) {
      if (hasDependentField && dayjs(formik.values[field]).diff(dayjs(formik.values[column.dependentField.field]).add(5, 'minute'), "m") <= 0) {
        const dependentFieldTime = dayjs(formik.values[column.dependentField.field]).add(5, 'minute')
        if (dependentFieldTime.get("hour") > 12) {
          setTimePeriod("PM");
        } else {
          setTimePeriod("AM");
        }
        setTime(dependentFieldTime);
        formik.setFieldValue(field, dependentFieldTime.toISOString());
      } else {
        if (column.isUtc) {
          dateTime = dayjs
            .utc(formik.values[field])
            .utcOffset(dayjs().utcOffset(), true)
            .format();
        }
        else {
          dateTime = dayjs(formik.values[field]);
        }
        setTime(dateTime);
        setTimePeriod(dateTime.format("A"));
      }
    }
    else {
      if (hasDependentField && formik.values[column.dependentField.field]) {
        const dependentFieldTime = dayjs(formik.values[column.dependentField.field]).add(5, 'minute');
        if (dependentFieldTime.get("hour") > 12) {
          setTimePeriod("PM");
        } else {
          setTimePeriod("AM");
        }
        setTime(dependentFieldTime);
        formik.setFieldValue(field, dependentFieldTime.toISOString());
      } else {
        setTime(null);
      }
    }
  }, [JSON.stringify(formik.values), timePeriod]);

  const handleRadioChange = (event) => {
    setTimePeriod(event.target.value);
    updateFormikTime(time, event.target.value);
  };

  const handleTimeChange = (newTime) => {
    if (column.showExternalControls) {
      setTime(newTime);
      setTimePeriod(dayjs(newTime).format("A"));
      updateFormikTime(newTime, dayjs(newTime).format("A"));
      return;
    } else if (column.isUtc) {
      newTime =
        newTime?.isValid()
          ? newTime.format("YYYY-MM-DDTHH:mm:ss") + ".000Z"
          : null;
    }
    return formik.setFieldValue(field, newTime);
  };

  const updateFormikTime = (timeValue, period) => {
    if (!timeValue) return;
    let hours = timeValue.hour();
    const minutes = timeValue.minute();
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours >= 12) hours -= 12;
    const dateTime = dayjs().hour(hours).minute(minutes);
    formik.setFieldValue(field, dateTime.toISOString());
  };

  fieldLabel = fieldLabel || column.label;
  fieldLabel += column.required ? " *" : "";
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: '1rem' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          {...otherProps}
          label={fieldLabel}
          variant="standard"
          readOnly={column?.readOnly === true}
          key={field}
          fullWidth
          disabled={column.dependentField && formik.values[column.dependentField.field] === ""}
          name={field}
          value={time}
          minTime={column?.dependentField?.operator === ">=" && formik.values[column.dependentField.field] !== "" ? dayjs(formik.values[column.dependentField.field]).add(4, 'minute') : null}
          slotProps={{
            textField: {
              helperText: formik.touched[field] && formik.errors[field],
              error: formik.touched[field] && formik.errors[field],
              variant: "filled",
              placeholder: "hh:mm"
            },
          }}
          closeOnSelect={column.closeOnSelect}
          format="hh:mm"
          views={["hours", "minutes"]}
          onChange={handleTimeChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched[field] && formik.errors[field]}
          renderInput={(params) => {
            const props = { ...params, variant: "standard" };
            return (
              <TextField
                {...props}
                helperText={formik.errors[field]}
                fullWidth
              />
            );
          }}
        />
        {column.showExternalControls && <FormControl component="fieldset" >
          <RadioGroup
            value={timePeriod}
            onChange={handleRadioChange}
            style={{
              flexDirection: "row",
              flexWrap: "nowrap",
            }}
          >
            <FormControlLabel
              value="AM"
              control={<Radio checked={timePeriod === "AM"} />}
              label="AM"
            />
            <FormControlLabel
              value="PM"
              control={<Radio checked={timePeriod === "PM"} />}
              label="PM"
            />
          </RadioGroup>
        </FormControl>}
      </LocalizationProvider>
    </div>
  );
};

export default Field;
