"use client";
import { FormModel, FormSchema } from "@/components/form/types";
import { useFormGen } from "@/components/form/useFormGen";
import { FormGenerator } from "@/components/form/FormGenerator";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formSchemaToZodSchema } from "@/utils/formSchemaToZod";
import { z, ZodSchema } from "zod";
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleLogin = async (model: FormModel) => {
    // event.preventDefault();
    // const formData = new FormData(event.target);
    // const data = Object.fromEntries(formData.entries());
    console.log(model);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: model?.email,
        password: model?.user_password,
      }),
    });
    if (res.status === 200) {
      let returnUrl = searchParams.get("return");
      returnUrl = (returnUrl && decodeURIComponent(returnUrl)) ?? "/";
      router.push(returnUrl);
    }
  };

  const schema = {
    name: "login-form",
    definitions: [
      {
        name: "email",
        type: "text",
        label: { text: "Email" },
        rules: [{ name: "required" }, { name: "email" }],
      },
      {
        name: "user_password",
        type: "password",
        label: { text: "Password" },
        rules: [{ name: "required" }],
      },
    ],
  } as FormSchema;

  const zodSchema = formSchemaToZodSchema(schema);

  const { state, model, updateModelValue, handleSubmit } = useFormGen({
    schema: schema,
    model: { email: "", user_password: "" },
    zodSchema,
  });

  // DONE: Challenge: #4 - Change to use form generator with useFormGenerator hook and do the submit
  // TODO: Optional Challenge #1 - Use tailwindcss to style the login page
  return (
    <div className="w-full md:w-96">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col items-start jutify-center gap-4"
      >
        <FormGenerator
          schema={schema}
          state={state}
          model={model}
          updateModelValue={updateModelValue}
        />
        <Button className="w-full mt-4" type={"submit"}>
          Log In
        </Button>
      </form>
    </div>
  );
}
