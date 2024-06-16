import { ZodSchema, z, ZodString } from "zod";
import { FormSchema } from "@/components/form/types";

const formSchemaToZodSchema = (schema: FormSchema) => {
  // console.log("formSchema", schema);
  let schemaTemplate: Record<string, ZodSchema<any>> = {};
  // console.log("formschema 0", schemaTemplate.shape);
  schema.definitions.forEach((item) => {
    let zodSchema: ZodSchema<any>;
    zodSchema = z
      .string({
        required_error: "string value not provided",
        invalid_type_error: "wrong value provided",
      })
      .min(1, "cannot be empty");
    if (item.name === "email") {
      zodSchema = (zodSchema as ZodString).email("Please enter valid email");
    }
    if (!item.rules?.some((item) => item.name === "required")) {
      zodSchema = zodSchema.optional();
    }
    schemaTemplate[item.name] = zodSchema;
    // console.log("formschema final item");
  });
  const finalSchema = z.object(schemaTemplate);
  return finalSchema as ZodSchema;
};

export { formSchemaToZodSchema };
