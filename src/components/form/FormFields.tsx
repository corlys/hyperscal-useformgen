import React, { useEffect } from "react";
import { FormFieldProps } from "@/components/form/types";
import { TextField } from "@/components/form/fields/TextField";
import { FormLabel } from "@/components/form/FormLabel";
import { PasswordField } from "@/components/form/fields/PasswordField";
import deepEqual from "@/utils/deepEqual";

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ field, path, value, errors, updateModelValue, ...props }, ref) => {
    const generateField = () => {
      let Component = null;

      switch (field.type) {
        case "text":
          Component = TextField;
          break;
        case "password":
          Component = PasswordField;
          break;
        default:
          return <></>;
      }

      return (
        <FormLabel label={field.label} errors={errors} path={path}>
          <Component
            field={field}
            // @ts-ignore
            value={value}
            path={path}
            updateModelValue={updateModelValue}
          />
          {errors &&
            errors.map((err, index) => {
              const key = Object.keys(err)[0];
              const content = err[key];
              return (
                <p key={index} className="text-red-500">
                  {typeof content.value === "string" && content.value}
                </p>
              );
            })}
        </FormLabel>
      );
    };
    return generateField();
  },
);

FormField.displayName = "FormField";

const MemoizedFormField = React.memo(FormField, function (prev, next) {
  return deepEqual(prev, next);
});

export default MemoizedFormField;
