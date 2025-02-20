const axios = require("axios");
require("dotenv").config();

const resolvers = {
  Query: {
    // first,after,reverse,sortKey,query
    products: async (_, { query, sortKey, after, reverse }) => {
      try {
        let search = query ? `title:${query}* OR description:${query}* OR tags:${query}*` : "";
        console.log("sort", search);
        // Default sorting: Title Ascending
        sortKey = sortKey || "RELEVANCE";
        reverse = Boolean(reverse);


        // Shopify GraphQL API request
        const response = await axios.post(
          process.env.SHOPIFY_STORE_URL,
          {
            query: `
              query getProducts($reverse: Boolean, $sortKey: ProductSortKeys!, $query: String!, $after: String) {
                products(first: 10, sortKey: $sortKey, query: $query, reverse: $reverse, after: $after) {
                  nodes {
                    id
                    title
                    tags
                    totalInventory
                    handle
                    descriptionHtml
                    description(truncateAt: 10)
                    encodedVariantAvailability
                    availableForSale
                    priceRange {
                      maxVariantPrice { amount currencyCode }
                      minVariantPrice { amount currencyCode }
                    }
                    compareAtPriceRange {
                      maxVariantPrice { amount currencyCode }
                      minVariantPrice { amount currencyCode }
                    }
                    options {
                      name
                      optionValues { name }
                    }
                    variants(first: 10) {
                      nodes {
                        id
                        sku
                        title
                        weight
                        price { amount currencyCode }
                      }
                    }
                    featuredImage {
                      id
                      url
                    }  
                  }
                  pageInfo {
                    endCursor
                    hasNextPage
                    hasPreviousPage
                  }
                }
              }`,
            variables: { sortKey: sortKey, query: search, reverse, after }
          },
          {
            headers: {
              "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );

        const productsData = response.data?.data?.products;
        if (!productsData) {
          return { products: [], pageInfo: null, error: "No products found." };
        }

        return {
          products: productsData.nodes.map(product => ({
            id: product.id,
            title: product.title,
            description: product.descriptionHtml, // Now using `descriptionHtml`
            tags: product.tags,
            totalInventory: product.totalInventory,
            handle: product.handle,
            availableForSale: product.availableForSale,
            priceRange: product.priceRange,
            compareAtPriceRange: product.compareAtPriceRange,
            options: product.options.map(option => ({
              name: option.name,
              optionValues: option.optionValues.map(value => value.name),
            })),
            variants: product.variants.nodes.map(variant => ({
              id: variant.id,
              title: variant.title,
              sku: variant.sku,
              weight: variant.weight,
              price: variant.price,
            })),
            featuredImage: product.featuredImage || null, // Handling missing images
          })),
          pageInfo: productsData.pageInfo,
          error: null,
        };

      } catch (error) {
        console.error("Error fetching products:", error?.response?.data || error.message);
        return {
          products: [],
          pageInfo: null,
          error: "Failed to fetch products. Please try again later.",
        };
      }
    }
  }
};

module.exports = resolvers;
