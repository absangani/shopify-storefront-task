import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("TITLE-ASC");
  const [after, setAfter] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async (cursor = null) => {
    setLoading(true);
    const response = await fetchProducts(search, sort, cursor);
    setLoading(false);

    if (response.error) {
      setError(response.error);
    } else {
      setProducts(response.products);
      setPageInfo(response.pageInfo);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, sort]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛍️ Product Listing</h2>

      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          className="border p-3 w-full md:w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="TITLE-ASC">Title (A-Z)</option>
          <option value="TITLE-DESC">Title (Z-A)</option>
          <option value="PRICE-ASC">Price (Low to High)</option>
          <option value="PRICE-DESC">Price (High to Low)</option>
        </select>
        <button
          className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition"
          onClick={() => loadProducts()}
        >
          Refresh
        </button>
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Product List */}
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-lg font-semibold text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border shadow-lg rounded-lg overflow-hidden">
              <img
                src={product.featuredImage?.url || "https://via.placeholder.com/200"}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col product_detail_card">
                <h3 className="text-sm font-semibold">{product.title}</h3>
                {/* <p className="text-sm text-gray-500">{product.description}</p> */}
                <p className="text-indigo-600 font-bold">
                  {product.priceRange?.minVariantPrice?.amount} {product.priceRange?.minVariantPrice?.currencyCode}
                </p>
                <button className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-md w-full hover:bg-indigo-600 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-8">
        {pageInfo?.hasPreviousPage && (
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
            onClick={() => loadProducts(null)}
          >
            ⬅️ Previous
          </button>
        )}
        {pageInfo?.hasNextPage && (
          <button
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            onClick={() => loadProducts(pageInfo.endCursor)}
          >
            Next ➡️
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
