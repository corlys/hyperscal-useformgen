"use client";
import { logout } from "@/actions/logout";
import { FormModel, FormSchema } from "@/components/form/types";
import { useFormGen } from "@/components/form/useFormGen";
import { FormGenerator } from "@/components/form/FormGenerator";
import { Button } from "@/components/ui/button";

export default function FormPage() {
  const schema = {
    name: "simple-form",
    definitions: [
      {
        name: "first_name",
        type: "text",
        label: { text: "First Name" },
        rules: [{ name: "required" }],
      },
      {
        name: "last_name",
        type: "text",
        label: { text: "Last Name" },
        rules: [{ name: "required" }],
      },
    ],
  } as FormSchema;

  const { state, model, updateModelValue, handleSubmit } = useFormGen({
    schema: schema,
    model: { first_name: "", last_name: "" },
  });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     console.log(model, state.isDirty);
  // };

  const logSubmit = async (model: FormModel) => {
    console.log(model);
  };
  // DONE: Challenge #2: Browser console is throwing a warning. Fix it.
  return (
    <div className="flex flex-col gap-4 jutify-center items-start w-full md:w-96">
      <h1>Form Page</h1>
      <form
        onSubmit={handleSubmit(logSubmit)}
        className="flex flex-col items-start jutify-center gap-4 w-full"
      >
        <FormGenerator
          schema={schema}
          state={state}
          model={model}
          updateModelValue={updateModelValue}
        />
        <Button className="self-end" type={"submit"}>
          Submit
        </Button>
      </form>
      <hr className="h-px w-full" />
      <form action={logout}>
        <Button type="submit" variant="destructive">
          Logout
        </Button>
      </form>
    </div>
  );
}
