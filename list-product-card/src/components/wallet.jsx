import '../style/components/wallet.css'
import WalletProductCard from './walletProductCard';

function Wallet({ product }) {
  return (
    <div className="container_wallet">
        <h2>Votre panier</h2>
      {product.length === 0 ? (
        <p>Panier vide</p>
      ) : (
        product.map((item, index) => (
          <WalletProductCard key={index} product={item} />
        ))
      )}
    </div>
  );
}

export default Wallet