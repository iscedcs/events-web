import { signInFormSchema } from "@/lib/schema/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export type signInValues = z.infer<typeof signInFormSchema>;

export default function SignInForm() {
  const [loading, setIsLoading] = useState(false);

  const form = useForm<signInValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });
  return (
    <div>
      <p>Form</p>
    </div>
  );
}
