import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  // Extract the product ID from the URL
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Extract the last part of the path as the ID

  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  const globalId = `gid://shopify/Product/${id}`;

  const productQuery = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        variants(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios({
      url: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-07/graphql.json`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.STORE_FRONT_ACCESS_TOKEN,
      },
      data: JSON.stringify({
        query: productQuery,
        variables: { id: globalId },
      }),
    });

    const product = response.data.data.product;

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
