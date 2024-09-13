import axios from "axios";

export async function GET() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            descriptionHtml
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
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
      data: JSON.stringify({ query }),
    });
    console.log(response.data.data.products.edges, "response");
    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
