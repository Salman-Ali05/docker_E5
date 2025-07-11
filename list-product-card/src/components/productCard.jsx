import "../style/components/productCard.css";

function ProductCard({ product, onAddToCard}) {
  return (
    <div className="product_card">
      <div className="card_top">
        <img
          className="product_image"
          src={product.image.desktop}
          alt="image"
        />
        <button onClick={() => onAddToCard(product)}>
          <img src="/public/assets/images/icon-add-to-cart.svg" />
          <p>Ajouter au panier</p>
        </button>
      </div>
      <div class="card_bottom">
        <p>{product.category}</p>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
