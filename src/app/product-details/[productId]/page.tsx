"use client";

import { useParams } from "next/navigation";
import { ProductDetails } from "@/components/ProductDetails";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params.productId as string;

  if (typeof productId !== "string") {
    return <div>Invalid product ID</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <ProductDetails productId={productId} />
    </div>
  );
};

export default ProductDetailsPage;
