"use client";
import React, { useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm /*, useFieldArray */ } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/admin/Layouts/DefaultLaout";
import Link from "next/link";
// import dynamic from "next/dynamic";

// const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// ✅ Updated Schema (commented out experience, description, socialMedia)
const FormSchema = z.object({
  name: z.string().nonempty("Name is required."),
  designation: z.string().nonempty("Designation is required."),
  image: z.any().optional(),

  // experience: z.coerce.number().min(0, "Experience must be a positive number."),
  // description: z.string().nonempty("Description is required."),
  // socialMedia: z
  //   .array(
  //     z.object({
  //       name: z.optional(),
  //       link: z.optional(),
  //     })
  //   )
  //   .optional(),
});

const TeamForm = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [description, setDescription] = useState("");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      designation: "",
      image: "",
      // experience: 0,
      // description: "",
      // socialMedia: [{ name: "", link: "" }],
    },
  });

  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "socialMedia",
  // });

  const onSubmit = async (data) => {
    console.log("Submitting...", data);
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("designation", data.designation);

    // formData.append("experience", data.experience?.toString() || "");
    // formData.append("description", data.description || "");
    if (selectedImage) formData.append("image", selectedImage);
    // formData.append("socialMedia", JSON.stringify(data.socialMedia));

    try {
      const res = await axios.post("/api/teams", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res)
      if (res.status === 201) {
        toast({ title: "Team member added successfully!" });
        form.reset();
        setSelectedImage(null);
        // setDescription("");
        router.push("/admin/manage-aboutus/teams/manage");
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while submitting the form.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input placeholder="Enter designation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience (Years)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Years of experience" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        {/* <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <JoditEditor
                value={description}
                onBlur={(newContent) => {
                  setDescription(newContent);
                  form.setValue("description", newContent);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedImage(file);
                      field.onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <div className="space-y-4">
          <FormLabel>Social Media Links</FormLabel>
          {fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <FormField
                control={form.control}
                name={`socialMedia.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Platform (e.g., LinkedIn)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`socialMedia.${index}.link`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white mt-1"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ name: "", link: "" })}
            className="bg-blue-500 text-white"
          >
            + Add Social Link
          </Button>
        </div> */}

        <Button type="submit" className="bg-[var(--primary)] text-white">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

const AddPost = () => {
  return (
    <DefaultLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Add Team Member</h1>
        <Link href="/admin/manage-aboutus/teams/manage">
          <Button className="text-white bg-[var(--primary)]">
            All Team Members
          </Button>
        </Link>
      </div>
      <div className="p-6 bg-gray-100 rounded">
        <TeamForm />
        <Toaster />
      </div>
    </DefaultLayout>
  );
};

export default AddPost;
