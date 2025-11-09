// src/contexts/cartContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface CartItem {
  id: string;
  title: string;
  writer: string;
  price: number;
  stock_quantity: number;
  quantity: number; // Quantity in cart
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  totalPrice: number;
  addToCart: (book: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopping_cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (book: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === book.id);

      if (existingItem) {
        // Increase quantity if already in cart
        return prevCart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock_quantity) }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (bookId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  // Update quantity of item in cart
  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === bookId
          ? { ...item, quantity: Math.min(quantity, item.stock_quantity) }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Check if item is in cart
  const isInCart = (bookId: string): boolean => {
    return cart.some((item) => item.id === bookId);
  };

  // Calculate total items in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cart,
    cartCount,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
