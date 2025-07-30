import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "motion/react";
import { toast } from "sonner";
import Select from "react-select";
import { useMutation } from "@tanstack/react-query";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";

const categoryOptions = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "bird", label: "Bird" },
  { value: "rabbit", label: "Rabbit" },
];

const PetForm = ({ initialData = null, onSubmit }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [imageURL, setImageURL] = useState(initialData?.image || "");
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState("");

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post(
        "https://kind-paws.vercel.app/api/pets/add-pet",
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Pet added successfully!");
      formik.resetForm();
      editor?.commands.setContent("");
      setImageURL("");
    },
    onError: () => {
      toast.error("Failed to add pet. Try again.");
    },
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.longDescription || "",
    onUpdate: ({ editor }) => {
      formik.setFieldValue("longDescription", editor.getHTML());
    },
  });

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      age: initialData?.age || "",
      gender: initialData?.gender || "",
      category: initialData
        ? categoryOptions.find(
            (opt) =>
              opt.label.toLowerCase() === initialData.category?.toLowerCase()
          ) || null
        : null,
      location: initialData?.location || "",
      shortDescription: initialData?.shortDescription || "",
      longDescription: initialData?.longDescription || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      age: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      category: Yup.object().required("Required"),
      location: Yup.string().required("Required"),
      shortDescription: Yup.string().required("Required"),
      longDescription: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (!imageURL) {
        setImageError("Image is required");
        return;
      }
      setImageError("");

      const payload = {
        ...values,
        category: values.category.label,
        image: imageURL,
        isAdopted: initialData?.isAdopted || false,
        ownerId: initialData?.ownerId || user?.uid,
        ownerName: initialData?.ownerName || user?.displayName,
        ownerEmail: initialData?.ownerEmail || user?.email,
        ownerPhoto: initialData?.ownerPhoto || user?.photoURL,
      };
      console.log(payload);
      onSubmit(payload);
    },
  });

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      setUploading(true);

      const imgUpload = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_imgbb_apiKey
      }`;

      const res = await axios.post(imgUpload, formData);

      const data = await res.data;

      if (data.success) {
        const imgUrl = data.data.url;
        setImageURL(imgUrl);
        toast.success("Image uploaded!");
        return imgUrl; // The direct image URL
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto p-6 border rounded-2xl shadow-md bg-white my-10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Pet Details</h2>

      <div className="mb-4">
        <label className="block font-medium text-sm text-gray-700">
          Pet Image
        </label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="mt-1 block w-full"
        />
        {uploading && (
          <p className="text-sm text-blue-600 mt-2">Uploading...</p>
        )}
        {imageURL && (
          <img
            src={imageURL}
            alt="Pet preview"
            className="w-32 mt-2 rounded-md"
          />
        )}
        {imageError && (
          <p className="text-red-500 text-sm mt-1">{imageError}</p>
        )}
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-sm text-gray-700">
            Pet Name
          </label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps("name")}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700">
            Pet Age
          </label>
          <input
            id="age"
            type="text"
            {...formik.getFieldProps("age")}
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="example: 5 months"
          />
          {formik.touched.age && formik.errors.age && (
            <div className="text-red-500 text-sm">{formik.errors.age}</div>
          )}
        </div>
        <div>
          <label
            className="block font-medium text-sm text-gray-700"
            htmlFor="gender"
          >
            Pet Gender
          </label>
          <select
            id="gender"
            {...formik.getFieldProps("gender")}
            className="mt-1 block w-full border rounded-md p-2"
          >
            <option value="" label="Select gender" />
            <option value="Male" label="Male" />
            <option value="Female" label="Female" />
            <option value="Other" label="Other" />
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-red-500 text-sm">{formik.errors.gender}</div>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700">
            Pet Category
          </label>
          <Select
            id="category"
            options={categoryOptions}
            value={formik.values.category}
            onChange={(val) => formik.setFieldValue("category", val)}
          />
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500 text-sm">{formik.errors.category}</div>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700">
            Location
          </label>
          <input
            id="location"
            type="text"
            {...formik.getFieldProps("location")}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {formik.touched.location && formik.errors.location && (
            <div className="text-red-500 text-sm">{formik.errors.location}</div>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700">
            Short Description
          </label>
          <textarea
            id="shortDescription"
            {...formik.getFieldProps("shortDescription")}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {formik.touched.shortDescription &&
            formik.errors.shortDescription && (
              <div className="text-red-500 text-sm">
                {formik.errors.shortDescription}
              </div>
            )}
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700">
            Long Description
          </label>
          <div className="border rounded-md p-2 min-h-[150px] mt-1">
            <EditorContent editor={editor} />
          </div>
          {formik.touched.longDescription && formik.errors.longDescription && (
            <div className="text-red-500 text-sm">
              {formik.errors.longDescription}
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <button
            type="submit"
            disabled={mutation.isPending || uploading}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            {mutation.isPending ? "Submitting..." : "Submit"}
          </button>

          {location.pathname === `/dashboard/update-pet/${id}` && (
            <button
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              type="button"
              onClick={() => navigate(-1)}
            >
              Go Back to all Pets
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default PetForm;
