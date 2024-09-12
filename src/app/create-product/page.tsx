// src/app/product-details/[productId]/page.tsx
import { useRouter } from "next/router";
import { ProductDetails } from "@/components/ProductDetails";
import CreateProduct from "@/components/CreateProduct";

const CreateProductPage = () => {
  return (
    <div>
      <CreateProduct />
    </div>
  );
};

export default CreateProductPage;
