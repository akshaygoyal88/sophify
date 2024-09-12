import axios from "axios";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useEffect, useState } from "react";

interface Product {
  images: string;
  title: string;
}

export const ProductDetails = ({ userId }: { userId: string }) => {
  const [product, setProducts] = useState<Product | null>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products/${userId}`);
        setProducts(res.data.data.products.edges);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    // <div className="product-grid">
    //   <div className="product-item">
    //     {product?.images?.edges?.length > 0 && (
    //       <img src={product.images.edges[0].node.src} alt={product.title} />
    //     )}
    //     <h2>{product.title}</h2>
    //     <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
    //   </div>
    // </div>
  );
};
