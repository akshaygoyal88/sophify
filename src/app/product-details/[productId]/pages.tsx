// src/app/product-details/[productId]/page.tsx
import { useRouter } from "next/router";
import { ProductDetails } from "@/components/ProductDetails";

const ProductDetailsPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  return (
    <div>
      <h1>Product Details</h1>
      {productId && <ProductDetails userId={productId as string} />}
    </div>
  );
};

export default ProductDetailsPage;
