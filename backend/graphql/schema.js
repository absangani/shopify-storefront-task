const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum ProductSortKeys {
    TITLE
    PRICE
    CREATED_AT
    BEST_SELLING
  }

  type Money {
    amount: String
    currencyCode: String
  }

  type PriceRange {
    maxVariantPrice: Money
    minVariantPrice: Money
  }

  type ProductOptionValue {
    name: String
  }

  type ProductOption {
    name: String
    optionValues: [ProductOptionValue]
  }

  type Variant {
    id: ID
    sku: String
    title: String
    weight: Float
    price: Money
  }

  type FeaturedImage {
    id: ID
    url: String
  }

  type Product {
    id: ID
    title: String
    tags: [String]
    totalInventory: Int
    handle: String
    descriptionHtml: String
    description: String
    encodedVariantAvailability: String
    availableForSale: Boolean
    priceRange: PriceRange
    compareAtPriceRange: PriceRange
    options: [ProductOption]
    variants: [Variant]
    featuredImage: FeaturedImage
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
    hasPreviousPage: Boolean
  }

  type ProductConnection {
    products: [Product]
    pageInfo: PageInfo
    error: String
  }

  type Query {
    products(
      first: Int = 10
      query: String
      sortKey: ProductSortKeys
      reverse: Boolean
      after: String
    ): ProductConnection
  }
`;

module.exports = typeDefs;
