import '../style/components/walletProductCard.css'

function WalletProductCard({product}){
    return(
        <div className="products_wallet">
            <div className="name_price_product">
                <h3>{product.name} x{product.quantity}</h3>
                <p>{product.price}$</p>
            </div>
            <div className="delete_product">
                <button><img src='/public/assets/images/icon-remove-item.svg'/></button>
            </div>
        </div>
    )
}

export default WalletProductCard;