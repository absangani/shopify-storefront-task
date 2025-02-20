import axios from "axios";

const API_URL = "http://localhost:4000/graphql"; // Update API URL if needed

export const fetchProducts = async (search = "", sort = "TITLE-ASC", after = null) => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        query getProducts($query: String, $sortKey: ProductSortKeys, $reverse: Boolean, $after: String, $first: Int) {
          products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse, after: $after) {
            products {
              id
              title
              tags
              totalInventory
              handle
              descriptionHtml
              description
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
              variants {
                id
                sku
                title
                weight
                price { amount currencyCode }
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
      variables: {
        query: search || "",
        sortKey: sort.split("-")[0], // Extract "TITLE" from "TITLE-ASC"
        reverse: sort.split("-")[1] === "DESC",
        after: after,
        first: 10, // Ensure pagination works
      },
    });

    const data = response.data.data?.products || {};
    console.log("data", data);
    return {
      products: data.products || [],
      pageInfo: data.pageInfo || {},
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      pageInfo: {},
      error: "Failed to fetch products. Please try again later.",
    };
  }
};
