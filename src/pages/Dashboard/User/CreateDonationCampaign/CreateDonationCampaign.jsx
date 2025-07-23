import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const uploadImageToImgbb = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("image", file);

  return axios.post(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgress(percent);
    },
  }).then(res => res.data.data.url);
};

const CampaignSchema = Yup.object().shape({
  picture: Yup.mixed().required("Pet picture is required"),
  maxAmount: Yup.number().required("Max donation amount required").positive(),
  deadline: Yup.date().required("Last date is required"),
  shortDesc: Yup.string().required("Short description is required"),
  longDesc: Yup.string().required("Long description is required"),
});

const CreateCampaignForm = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (values) => {
      const { picture, ...rest } = values;

      const imageUrl = await uploadImageToImgbb(picture, setUploadProgress);

      const payload = {
        ...rest,
        picture: imageUrl,
        createdAt: new Date().toISOString(),
      };

      // Replace with your actual backend POST endpoint
      await axios.post("/api/campaigns", payload);
    },
    onSuccess: () => toast.success("Campaign created successfully!"),
    onError: () => toast.error("Failed to create campaign."),
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Donation Campaign</h2>
      <Formik
        initialValues={{
          picture: null,
          maxAmount: "",
          deadline: "",
          shortDesc: "",
          longDesc: "",
        }}
        validationSchema={CampaignSchema}
        onSubmit={(values) => mutate(values)}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Pet Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFieldValue("picture", e.currentTarget.files[0])}
              />
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-1 text-xs text-muted">Uploading: {uploadProgress}%</div>
              )}
              <ErrorMessage name="picture" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium">Max Donation Amount</label>
              <Field
                name="maxAmount"
                type="number"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="maxAmount" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium">Last Date of Donation</label>
              <Field
                name="deadline"
                type="date"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="deadline" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium">Short Description</label>
              <Field
                name="shortDesc"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="shortDesc" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium">Long Description</label>
              <Field
                as="textarea"
                name="longDesc"
                rows={4}
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="longDesc" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white p-2 rounded hover:bg-secondary transition"
            >
              {isLoading ? "Creating..." : "Create Campaign"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCampaignForm;
 