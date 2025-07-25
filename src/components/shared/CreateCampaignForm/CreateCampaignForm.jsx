import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useAuth } from "@/hooks/useAuth";

const CampaignSchema = Yup.object().shape({
  picture: Yup.mixed().nullable(),
  goalAmount: Yup.number().required("Goal amount is required").positive(),
  deadline: Yup.date().required("Deadline is required"),
  shortDescription: Yup.string().required("Short description is required"),
  longDescription: Yup.string().required("Long description is required"),
  title: Yup.string().required("Title is required"),
  location: Yup.string().required("Location is required"),
  tags: Yup.string(),
  isFeatured: Yup.boolean(),
});

const CreateCampaignForm = ({
  initialData = null,
  onSubmit,
  isSubmitting = false,
}) => {
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useAuth();

  const uploadImageToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgbb_apiKey
    }`;
    const res = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        const percent = Math.round((e.loaded * 100) / e.total);
        setUploadProgress(percent);
      },
    });

    return res.data.data.url;
  };

  const mutation = useMutation({
    mutationFn: async (values) => {
      let imageUrl = initialData?.image;

      // Upload new image if user picked a new one
      if (values.picture instanceof File) {
        imageUrl = await uploadImageToImgbb(values.picture);
      }

      const payload = {
        ...values,
        image: imageUrl,
        tags: values.tags
          ? values.tags.split(",").map((tag) => tag.trim())
          : [],
        ownerId: initialData?.ownerId || user?.uid,
        ownerName: initialData?.ownerName || user?.displayName,
        ownerEmail: initialData?.ownerEmail || user?.email,
        ownerPhoto: initialData?.ownerPhoto || user?.photoURL,
      };

      delete payload.picture;

      await onSubmit(payload);
    },
    onSuccess: () => {
      if (!initialData) toast.success("Campaign created successfully!");
    },
    onError: () => toast.error("Submission failed. Please try again."),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl my-10"
    >
      <h2 className="text-2xl font-bold mb-4">
        {initialData ? "Update" : "Create"} Donation Campaign
      </h2>

      <Formik
        initialValues={{
          picture: null,
          goalAmount: initialData?.goalAmount || "",
          deadline: initialData?.deadline
            ? new Date(initialData.deadline).toISOString().split("T")[0]
            : "",
          shortDescription: initialData?.shortDescription || "",
          longDescription: initialData?.longDescription || "",
          title: initialData?.title || "",
          location: initialData?.location || "",
          tags: initialData?.tags?.join(", ") || "",
          isFeatured: initialData?.isFeatured || false,
        }}
        enableReinitialize={true}
        validationSchema={CampaignSchema}
        onSubmit={(values) => mutation.mutate(values)}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Campaign Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  setFieldValue("picture", file);
                  setImagePreview(URL.createObjectURL(file));
                  setUploadProgress(0);
                }}
              />
              {uploadProgress > 0 && uploadProgress < 100 && (
                <p className="text-blue-600 text-xs mt-1">
                  Uploading: {uploadProgress}%
                </p>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 mt-2 rounded-md"
                />
              )}
              {!initialData && (
                <ErrorMessage
                  name="picture"
                  component="div"
                  className="text-red-500 text-sm"
                />
              )}
            </div>

            <InputField name="title" label="Title" />
            <InputField name="location" label="Location" />
            <InputField name="goalAmount" label="Goal Amount" type="number" />
            <InputField name="deadline" label="Deadline" type="date" />
            <InputField name="shortDescription" label="Short Description" />
            <InputField name="tags" label="Tags (comma-separated)" />

            <div>
              <label className="block text-sm font-medium">
                Long Description
              </label>
              <Field
                as="textarea"
                name="longDescription"
                rows={4}
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="longDescription"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex items-center">
              <Field type="checkbox" name="isFeatured" className="mr-2" />
              <label className="text-sm font-medium">
                Feature this campaign?
              </label>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending || isSubmitting}
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
            >
              {mutation.isPending || isSubmitting
                ? initialData
                  ? "Updating..."
                  : "Creating..."
                : initialData
                ? "Update Campaign"
                : "Create Campaign"}
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

const InputField = ({ name, label, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium">
      {label}
    </label>
    <Field name={name} type={type} className="w-full border p-2 rounded" />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);

export default CreateCampaignForm;
