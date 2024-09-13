// src/app/api/add-to-cart/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const mutation = `
    mutation checkoutCreate($input: CheckoutInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                }
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  try {
    // Parse the request body
    const requestBody = await req.json();

    // Ensure the request body is valid
    if (!requestBody.variantId || !requestBody.quantity) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Define variables for the GraphQL query
    const variables = {
      input: {
        lineItems: [
          {
            variantId: requestBody.variantId, // Single item variant ID
            quantity: requestBody.quantity,
          },
        ],
      },
    };

    // Make the API request to Shopify
    const response = await axios.post(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-04/graphql.json`,
      {
        query: mutation,
        variables: variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        },
      }
    );

    // Handle checkout user errors
    const { checkoutUserErrors, checkout } = response.data.data.checkoutCreate;
    if (checkoutUserErrors.length > 0) {
      return NextResponse.json({ errors: checkoutUserErrors }, { status: 400 });
    }

    // Return the checkout data
    return NextResponse.json(checkout);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Error adding to cart" },
      { status: 500 }
    );
  }
}
