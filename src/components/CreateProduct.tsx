"use client";

import { useState } from "react";

interface Product {
  title: string;
  description: string;
  image: string;
  product_type: string;
  tags: string;
  variants: {
    price: string;
    title: string;
  }[];
  options: {
    name: string;
    position: number;
    values: string[];
  }[];
  images: string[];
}

const CreateProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    image: "",
    product_type: "",
    tags: "",
    variants: [{ price: "", title: "" }],
    options: [{ name: "", position: 1, values: [""] }],
    images: [""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: string
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("variant")) {
      const variantIndex = parseInt(name.split("_")[1], 10);
      setProduct((prev) => {
        console.log([...prev.variants], "[...prev.variants]s");
        const variants = [...prev.variants];
        console.log(
          { ...variants[variantIndex], [field]: value },
          "variants11"
        );

        variants[variantIndex] = { ...variants[variantIndex], [field]: value };

        console.log(variants[variantIndex], "variants[variantIndex]");
        return { ...prev, variants };
      });
    } else if (name.startsWith("option")) {
      const optionIndex = parseInt(name.split("_")[1], 10);
      setProduct((prev) => {
        const options = [...prev.options];
        options[optionIndex] = { ...options[optionIndex], [field]: value };
        return { ...prev, options };
      });
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleVariantAdd = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, { price: "", title: "" }],
    }));
  };

  const handleOptionAdd = () => {
    setProduct((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        { name: "", position: prev.options.length + 1, values: [""] },
      ],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted product:", product);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title:
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={(e) => handleChange(e, 0, "title")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={(e) => handleChange(e, 0, "description")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Image URL:
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={(e) => handleChange(e, 0, "image")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Type:
          <input
            type="text"
            name="product_type"
            value={product.product_type}
            onChange={(e) => handleChange(e, 0, "product_type")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tags:
          <input
            type="text"
            name="tags"
            value={product.tags}
            onChange={(e) => handleChange(e, 0, "tags")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Variants</h3>
        {product.variants.map((variant, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Variant Title:
              <input
                type="text"
                name={`variant_${index}_title`}
                value={variant.title}
                onChange={(e) => handleChange(e, index, "title")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Variant Price:
              <input
                type="text"
                name={`variant_${index}_price`}
                value={variant.price}
                onChange={(e) => handleChange(e, index, "price")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={handleVariantAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Variant
        </button>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Options</h3>
        {product.options.map((option, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Option Name:
              <input
                type="text"
                name={`option_${index}_name`}
                value={option.name}
                onChange={(e) => handleChange(e, index, "name")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Option Position:
              <input
                type="number"
                name={`option_${index}_position`}
                value={option.position}
                onChange={(e) => handleChange(e, index, "position")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Option Values:
              <input
                type="text"
                name={`option_${index}_values`}
                value={option.values.join(", ")}
                onChange={(e) => handleChange(e, index, "values")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={handleOptionAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Option
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Images (comma separated URLs):
          <input
            type="text"
            name="images"
            value={product.images.join(", ")}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                images: e.target.value.split(", "),
              }))
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateProduct;
