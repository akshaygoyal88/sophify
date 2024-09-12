import { gql, GraphQLClient } from "graphql-request";
const storefrontAccessToken = process.env.STOREFRONTACCESSTOKEN;

const endpoint = process.env.SHOPIFY_STORE_DOMAIN;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  },
});
