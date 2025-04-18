"use client";

import React, { useState, useEffect } from "react";
import Container from "../Container";
import ProductBox from "../ProductBox";

export default function RecentlyAdded() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.in/api/products?limit=5");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.products); // <-- This is important
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="bg-gray-100 p-3">
      <Container>
        <h1 className="text-center text-3xl font-bold">Recently Added Products</h1>
        <div className="my-4 grid grid-cols-5 gap-3">
          {products.map((prod) => (
            <ProductBox key={prod.id} product={prod} />
          ))}
        </div>
      </Container>
    </div>
  );
}
