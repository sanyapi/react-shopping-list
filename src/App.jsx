import { useState, useEffect } from "react"
import "./styles.css"

export default function App() {

  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  function handleSubmit(e)  {
    e.preventDefault();
    setItems([...items, { name: newItem, price: '', quantity: '' }]);
    setNewItem('');
  }

  function handleItemChange(e, index, field) {
    const updatedItems = [...items];
    updatedItems[index][field] = e.target.value;
    setItems(updatedItems);
  }

  // handles the increasing and decreasing of the quantity counter
  function handleQuantityChange(index, newQuantity) {
    newQuantity = Math.max(newQuantity, 0); // ensure quantity is at least 0
    const updatedItems = [...items];
    updatedItems[index].quantity = newQuantity; // update the quantity of the item
    setItems(updatedItems);
  }

  useEffect(() => {
    let total = 0;
    items.forEach(item => {
      if (item.price && item.quantity) {
        total += parseFloat(item.price) * parseInt(item.quantity);
      }
    });
    setTotalValue(total);
  }, [items]);


  return (
    <>
      <div className="app-container">
        <div className="app">
          <h1 className="app-name">MY SHOPPING LIST</h1>
          <form onSubmit={handleSubmit} className="add-item-form">
            <div className="add-item-box">
              <input
                type="text"
                name="add-item"
                id="add-item"
                placeholder="Add an item"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
              />
              <button>
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </form>
          {items.map((item, index) => (
            <div key={index} className="item-display-container">
              <div className="checkbox-container">
                <input type="checkbox" className="checkbox" />
              </div>
              <div className="item-name-container">
                <input
                  type="text"
                  name="item-name"
                  id="item-name"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={e => handleItemChange(e, index, 'name')}
                />
              </div>
              <div className="price-container">
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Price"
                  value={item.price}
                  onChange={e => handleItemChange(e, index, 'price')}
                />
              </div>
              <div className="qty-container">
                <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <input
                  type="number"
                  name="qty"
                  id="qty"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={e => handleItemChange(e, index, 'quantity')}
                />
                <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>
                  <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          ))}
          <div className="total-container">
            Estimated Total
            <div className="total">
            <input type="number" value={totalValue} readOnly />
            </div>
          </div>
        </div>
      </div>
    </>
  )

}
