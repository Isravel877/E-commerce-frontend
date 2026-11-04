import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Containers.css";

export function Container() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/products")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);

  return (
    <div className="products">

      {products.map(product => (

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>
  );
}