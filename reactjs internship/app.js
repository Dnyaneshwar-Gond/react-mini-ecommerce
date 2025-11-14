const { useState } = React;

const initialProducts = [
  { id: 1, name: "Laptop - UltraSlim", category: "Electronics", price: 1200, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900" },
  { id: 2, name: "Men's Cotton T-Shirt", category: "Clothing", price: 25, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900" },
  { id: 3, name: "The Great Gatsby", category: "Books", price: 15, img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900" },
  { id: 4, name: "Smartphone Pro", category: "Electronics", price: 800, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900" },
  { id: 5, name: "Slim Fit Jeans", category: "Clothing", price: 50, img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900" },
  { id: 6, name: "Sapiens - Yuval Noah Harari", category: "Books", price: 20, img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=900" }
];

function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState({});

  const filtered =
    category === "All" ? initialProducts : initialProducts.filter(p => p.category === category);

  function addToCart(p) {
    setCart(prev => ({
      ...prev,
      [p.id]: prev[p.id] ? { ...prev[p.id], quantity: prev[p.id].quantity + 1 } : { ...p, quantity: 1 }
    }));
  }

  function removeFromCart(id) {
    setCart(prev => {
      const copy = { ...prev };
      if (!copy[id]) return prev;
      if (copy[id].quantity > 1) copy[id].quantity--;
      else delete copy[id];
      return copy;
    });
  }

  const cartItems = Object.values(cart);
  const total = cartItems.reduce((s, it) => s + it.price * it.quantity, 0);

  return (
    <div className="app-root">
      <h1 className="title">🛒 Product Filter & Cart</h1>

      <div className="filter-bar">
        {["All", "Electronics", "Books", "Clothing"].map(cat => (
          <button
            key={cat}
            className={`filter-btn ${cat === category ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="container">
        <div className="products">
          {filtered.map(p => (
            <div className="product-card" key={p.id}>
              <div className="product-thumb">
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>

              <div className="product-info">
                <h3>{p.name}</h3>
                <div className="meta">{p.category}</div>
                <div className="price">${p.price}</div>
                <button className="add-btn" onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart">
          <h2>🛍️ Cart</h2>

          {cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cartItems.map(it => (
              <div className="cart-item" key={it.id}>
                <img src={it.img} alt={it.name} />
                <div className="info">
                  <div style={{fontWeight:700}}>{it.name}</div>
                  <div className="meta">Price: ${it.price}</div>
                  <div className="meta">Qty: {it.quantity}</div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(it.id)}>
                  Remove
                </button>
              </div>
            ))
          )}

          <div className="total">Total: ${total}</div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2025 DG Tech Solutions. Created by Dnyaneshwar Gond.
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
