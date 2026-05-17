import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { BASE_URL } from "../utils/BASE_URL";
import toast, { Toaster } from "react-hot-toast";

const Addblog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [Description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [Alttag, setAltTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddBlog = async (e) => {
    e.preventDefault();

    if (!title || !content || !image || !Description || !Alttag) {
      toast.error("All fields are required, including the image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("description", Description);
    formData.append("alttag", Alttag)

    try {
      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/create-blog`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add blog.");
      }

      const result = await response.json();
      toast.success("Blog added successfully!");
      navigate("/blog");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-28 mb-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Add New Blog</h1>
      <form onSubmit={handleAddBlog}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Meta Description</label>
          <textarea
            type="text"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="h-80"
          />
        </div>
        <div className="mb-6 mt-14">
          <label className="block font-medium mb-1">Upload Image</label>
          <div className="flex items-center">
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex items-center justify-center px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-md hover:bg-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Choose File
            </label>
            <input
              id="image-upload"
              type="file"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
                  toast.error("File size is too large. Only files under 2MB are allowed.");
                  return;
                }
                setImage(selectedFile);
              }}
              className="hidden"
              accept="image/*"
              required
            />
            <span className="ml-4 text-sm text-gray-500">
              {image ? image.name : "No file selected"}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Alt Tag</label>
          <input
            type="text"
            value={Alttag}
            onChange={(e) => setAltTag(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2 hover:bg-sky-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" text-white px-4 py-2 rounded bg-sky-500 hover:bg-sky-600"
            disabled={isLoading}
          >
            Add Blog
          </button>
        </div>
      </form>
      {isLoading && (
        <div className="flex justify-center items-center mt-28 absolute inset-0 bg-opacity-50 bg-gray-700 z-50">
          <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Addblog;
