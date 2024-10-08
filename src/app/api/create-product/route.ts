import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

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

export async function POST(req: Request) {
  // Parse request body
  const {
    title,

    body_html,
    vendor,
    product_type,
    tags,
    variants,
    options,
    images,
  }: Product = await req.json();

  console.log("Received product data:", {
    title,

    product_type,
    tags,
    variants,
    options,
    images,
  });

  try {
    const response = await axios.post(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${process.env.SHOPIFY_API_VERSION}/products.json`,
      {
        product: {
          title,
          body_html,
          vendor,
          product_type,
          tags,
          variants: variants.map((variant) => {
            return { title: variant.title, price: variant.price };
          }),

          options: options.map((option) => {
            console.log(variants, "variants");
            console.log(option.name, "options");
            console.log(option.position, "position");
            return {
              name: option.name,
              position: option.position,
              values: option.values,
            };
          }),

          images: images.map((image) => ({
            src: image.src,
          })),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.message },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
