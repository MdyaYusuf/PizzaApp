import { useContext } from "react";
import Modal from "./UI/Modal";
import { UIContext } from "../contexts/UIContext";
import { CartContext } from "../contexts/CartContext";
import useFetch from "../hooks/useFetch";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
}

export default function Checkout() {

  const { uiProgress, hideCheckout } = useContext(UIContext);
  const { items, clearAll } = useContext(CartContext);
  const { data, isLoading, error, sendRequest } = useFetch("http://localhost:3000/orders", config);
  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  function handleClose() {
    hideCheckout();
    clearAll();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData
        }
      })
    );
  }

  if (data && !error) {

    return (
      <Modal open={uiProgress === "checkout"}>
        <h3>Sipariş Alındı.</h3>
        <button className="btn btn-sm btn-outline-danger me-2" onClick={() => handleClose()}>Kapat</button>
      </Modal>
    )
  }

  return (
    <Modal open={uiProgress === "checkout"}>
      <h2>Checkout</h2>
      <p className="text-danger">Sipariş Toplamı: {cartTotal} ₺</p>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Ad Soyad</label>
          <input type="text" name="name" id="name" className="form-control" />
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Eposta</label>
              <input type="email" name="email" id="email" className="form-control" />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Telefon</label>
              <input type="text" name="phone" id="phone" className="form-control" />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="adress" className="form-label">Adres</label>
          <textarea className="form-control" name="adress" id="adress"></textarea>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="city" className="form-label">Şehir</label>
              <input type="text" name="city" id="city" className="form-control" />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="district" className="form-label">Mahalle</label>
              <input type="text" name="district" id="district" className="form-control" />
            </div>
          </div>
        </div>
        {isLoading ? (<div className="alert alert-warning">Yükleniyor...</div>) : (
          <>
            <button className="btn btn-sm btn-outline-danger me-2" onClick={() => hideCheckout()}>Kapat</button>
            <button type="submit" className="btn btn-sm btn-primary me-2" onClick={() => hideCheckout()}>Siparişi Tamamla</button>
          </>
        )}
      </form>
    </Modal>
  );
}