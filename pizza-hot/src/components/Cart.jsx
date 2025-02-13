import Modal from "./UI/Modal";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./UI/CartItem";

export default function Cart() {

  const { items } = useContext(CartContext);

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Modal open={false}>
      <h2>Sepetiniz</h2>
      <ul className="cart-items">
        {items.map(item => <CartItem key={item.id} item={item} />)}
      </ul>
      <div className="cart-summary">
        <div className="moadl-actions text-end">
          <button className="btn btn-sm btn-danger me-2">Kapat</button>
          <button className="btn btn-sm btn-outline-success">Sipariş Ver</button>
        </div>
        <p className="badge text-bg-success mb-0 fs-5">{cartTotal}</p>
      </div>
    </Modal>
  );
}