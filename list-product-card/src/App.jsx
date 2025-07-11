import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import dataProducts from "./data/products.jsx";
import ProductCard from "./components/productCard.jsx";
import Wallet from "./components/wallet.jsx";


function App() {


  const [product, setProduct] = useState([]);

  const afficheProduit = () => {
    console.log(product);
  }

  const handleAddToCard = (product) => {
    setProduct(prev => {
      const found = prev.find(p => p.name === product.name);

      if (!found) {
        return [...prev, { ...product, quantity: 1 }];
      }

      return prev.map(p =>
        p.name === product.name
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    });

  }
  return (
    <div className="container">
      <div className="container_products_wallet">
        <div className="container_product">
          {dataProducts.map((product, index) => (
            <ProductCard product={product} setProduct={setProduct} onAddToCard={handleAddToCard} />
          ))}
        </div>


        <Wallet product={product} />
      </div>
    </div>
  );
}

export default App;
