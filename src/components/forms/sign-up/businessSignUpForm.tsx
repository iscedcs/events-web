import { extendedSignUpSchema } from "@/lib/schema/signUp";
import z from "zod";

export type businessSignUpValues = z.infer<typeof extendedSignUpSchema>;
export default function BusinessSignUpForm() {
  return (
    <div>
      <p>Business Form</p>
    </div>
  );
}
