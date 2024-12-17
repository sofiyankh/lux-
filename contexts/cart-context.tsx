"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  title: string
  slug: string
  image: string
  price: number
  compareAtPrice?: number
  quantity: number
  selectedColor?: string
  selectedSize?: string
  maxQuantity?: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  subtotal: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize,
      )

      let newItems: CartItem[]
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) } : item,
        )
      } else {
        newItems = [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      }

      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { ...state, items: newItems, subtotal, itemCount }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, items: newItems, subtotal, itemCount }
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items
        .map((item) =>
          item.id === action.payload.id ? { ...item, quantity: Math.max(0, action.payload.quantity) } : item,
        )
        .filter((item) => item.quantity > 0)

      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, items: newItems, subtotal, itemCount }
    }

    case "CLEAR_CART":
      return { ...state, items: [], subtotal: 0, itemCount: 0 }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }

    case "OPEN_CART":
      return { ...state, isOpen: true }

    case "CLOSE_CART":
      return { ...state, isOpen: false }

    case "LOAD_CART": {
      const subtotal = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, items: action.payload, subtotal, itemCount }
    }

    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  subtotal: 0,
  itemCount: 0,
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => dispatch({ type: "ADD_ITEM", payload: item })
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id })
  const updateQuantity = (id: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  const clearCart = () => dispatch({ type: "CLEAR_CART" })
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" })
  const openCart = () => dispatch({ type: "OPEN_CART" })
  const closeCart = () => dispatch({ type: "CLOSE_CART" })

  return (
    <CartContext.Provider
      value={{ state, dispatch, addItem, removeItem, updateQuantity, clearCart, toggleCart, openCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
