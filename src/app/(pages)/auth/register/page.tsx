"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiServices } from "@/apiServices/apiServices";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rePassword: z.string(),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.rePassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["rePassword"],
      });
    }
  });

type RegisterValues = z.infer<typeof registerSchema>;

export default function Register() {
  //   const form = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  //   const callbackUrl = searchParams.get("callbackUrl") || "/products";
  const [register, setRegister] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

 async function onSubmit(values: RegisterValues) {
  setRegister(true);

  try {
    // 1️⃣ Call your registration API
    const response = await apiServices.register(
      values.name,
      values.email,
      values.password,
      values.rePassword,
      values.phone
    );

    console.log("REGISTER RESPONSE:", response);

    // 2️⃣ Handle "account already exists"
    if (response?.message === "Account Already Exists") {
      form.setError("email", {
        type: "manual",
        message: "Account already exists",
      });
      return; // early exit
    }

    // 3️⃣ If registration successful, auto-login
    if (response?.message === "success") {
      const signInResponse = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, // handle redirect manually
      });

      if (signInResponse?.ok) {
        router.push("/products"); // redirect to protected page
      } else {
        form.setError("email", {
          type: "manual",
          message: "Login after registration failed",
        });
      }
    }
  } catch (error: any) {
    form.setError("email", {
      type: "manual",
      message: error.message || "Something went wrong",
    });
  } finally {
    setRegister(false);
  }
}


  return (
    <div className=" max-w-2xl mx-auto my-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="your Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="*******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>repassword</FormLabel>
                <FormControl>
                  <Input placeholder="*******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="*******" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={register} type="submit">
            {register && <Loader2 className="animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
