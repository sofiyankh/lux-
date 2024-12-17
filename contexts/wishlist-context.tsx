"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { ProductCardProps } from "@/components/product/product-card"

export interface WishlistItem extends ProductCardProps {}

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "TOGGLE_ITEM"; payload: WishlistItem }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: WishlistItem[] }

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((item) => item.id === action.payload.id)
      if (exists) return state
      const newItems = [...state.items, action.payload]
      return { items: newItems }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      return { items: newItems }
    }

    case "TOGGLE_ITEM": {
      const exists = state.items.find((item) => item.id === action.payload.id)
      if (exists) {
        return { items: state.items.filter((item) => item.id !== action.payload.id) }
      } else {
        return { items: [...state.items, action.payload] }
      }
    }

    case "CLEAR_WISHLIST":
      return { items: [] }

    case "LOAD_WISHLIST":
      return { items: action.payload }

    default:
      return state
  }
}

const initialState: WishlistState = {
  items: [],
}

const WishlistContext = createContext<{
  state: WishlistState
  dispatch: React.Dispatch<WishlistAction>
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  toggleItem: (item: WishlistItem) => void
  clearWishlist: () => void
} | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist)
        dispatch({ type: "LOAD_WISHLIST", payload: items })
      } catch (error) {
        console.error("Failed to load wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: WishlistItem) => dispatch({ type: "ADD_ITEM", payload: item })
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id })
  const toggleItem = (item: WishlistItem) => dispatch({ type: "TOGGLE_ITEM", payload: item })
  const clearWishlist = () => dispatch({ type: "CLEAR_WISHLIST" })

  return (
    <WishlistContext.Provider
      value={{ state, dispatch, addItem, removeItem, toggleItem, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
