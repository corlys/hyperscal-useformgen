// DONE: Challenge #3 - create a password field component
//
import { TextFieldProps } from "@/components/form/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye } from "@/components/ui/icons/eye";
import React, { useEffect, useState } from "react";

const PasswordField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ field, value, path, updateModelValue, ...props }, ref) => {
    useEffect(() => {
      console.log(`PasswordField ${path} mounted`);
      return () => {
        console.log(`PasswordField ${path} unmounted`);
      };
    }, []);

    useEffect(() => {
      console.log(`PasswordField ${path} rerendered`);
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="flex flex-row justify-between">
        <Input
          type={showPassword ? "text" : field.type}
          ref={ref}
          name={field.name}
          id={path}
          className="rounded-r-none"
          // @ts-ignore
          value={value}
          onChange={(e) => updateModelValue(path, field, e.target.value)}
        />
        <Button
          type="button"
          className="rounded-l-none rounded-r-md bg-white hover:bg-white border border-input border-l-white"
          onClick={handleShowPassword}
        >
          <Eye />
        </Button>
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";
export { PasswordField };
