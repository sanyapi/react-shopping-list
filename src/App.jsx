import { useState, useEffect } from "react"
import "./styles.css"

export default function App() {

  // declaring states
  // first value is the state variable
  // second is a function to update that state variable
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  // function to be called when the user submits the form
  function handleSubmit(e)  {
    e.preventDefault();   // prevents the default form submission
    
    // adds a new object to the items array using setItems
    setItems([...items, { name: newItem, price: '', quantity: '' }]);
    
    // resets the value of newItem to an empty string using setNewItem
    setNewItem('');
  }

 // function to be called whenever an item is changed/modified
  function handleItemChange(e, index, field) {

    // creates a copy of the items array to store the updated items
    const updatedItems = [...items];

    // stores the changed item name, price, and qty into the updatedItems array
    // specifically storing  in the index and field values
    // done by using e.target, checking for the value in the value={item.property}
    updatedItems[index][field] = e.target.value;

    // sets the value of items[] to the value of updatedItems
    setItems(updatedItems);
  }

  // handles the increasing and decreasing of the quantity counter
  function handleQuantityChange(index, newQuantity) {
    newQuantity = Math.max(newQuantity, 0); // ensures quantity is at least 0

    // creates a copy of the items array to store the updated items
    const updatedItems = [...items];

    updatedItems[index].quantity = newQuantity; // updates the quantity of the item

    setItems(updatedItems);
  }

  // computes the total for each time an item quantity is set
  useEffect(() => {
    let total = 0;
    items.forEach(item => {
      // checks if price and quantity are set
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
