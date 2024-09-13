"use client";
import axios from "axios";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ProductVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  position: number;
  inventory_policy: string;
  compare_at_price: string | null;
  option1: string;
  option2: string | null;
  option3: string | null;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode: string | null;
  fulfillment_service: string;
  grams: number;
  inventory_management: string | null;
  requires_shipping: boolean;
  sku: string;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  admin_graphql_api_id: string;
  image_id: string | null;
}

interface ProductOption {
  name: string;
  position: string;
  values: string[];
}

interface ProductImage {
  id: number;
  product_id: number;
  src: string;
  position: number;
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
  alt: string | null;
  admin_graphql_api_id: string;
}

interface Product {
  id: number;
  title: string;
  body_html: string | null;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix: string | null;
  published_scope: string;
  tags: string;
  status: string;
  admin_graphql_api_id: string;
  variants: ProductVariant[];
  options: ProductOption[];
  images: ProductImage[];
  image: ProductImage | null;
}

export const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(products, "products");

  console.log(products[0], "products");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data.data.products.edges);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative pt-16">
      <h1 className="mb-2">Shopify Products</h1>{" "}
      <div className="absolute top-0 right-0 p-4">
        <Link href="/create-product">
          <button
            type="button"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Variant
          </button>
        </Link>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default Dashboard;
