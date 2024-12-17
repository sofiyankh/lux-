"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "client" | "admin"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: UserRole
  createdAt: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  loginAsDemo: (role: UserRole) => Promise<void>
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
}

const DEMO_ACCOUNTS = {
  client: {
    id: "demo-client-001",
    email: "client@demo.com",
    password: "demo123",
    firstName: "Sarah",
    lastName: "Johnson",
    phone: "+1 (555) 123-4567",
    role: "client" as UserRole,
    avatar: "/professional-woman-diverse.png",
    createdAt: "2024-01-15T10:00:00Z",
  },
  admin: {
    id: "demo-admin-001",
    email: "admin@demo.com",
    password: "admin123",
    firstName: "Michael",
    lastName: "Chen",
    phone: "+1 (555) 987-6543",
    role: "admin" as UserRole,
    avatar: "/professional-man.png",
    createdAt: "2024-01-01T09:00:00Z",
  },
}

const setAuthCookies = (user: User) => {
  document.cookie = `auth-token=${user.id}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
  document.cookie = `user-role=${user.role}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
}

const clearAuthCookies = () => {
  document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  document.cookie = "user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setAuthCookies(user)
        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
      } catch (error) {
        console.error("Failed to load user from localStorage:", error)
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const demoAccount = Object.values(DEMO_ACCOUNTS).find(
      (account) => account.email === email && account.password === password,
    )

    if (demoAccount) {
      const { password: _, ...user } = demoAccount
      localStorage.setItem("user", JSON.stringify(user))
      setAuthCookies(user)
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
      return
    }

    // Mock user data for regular accounts
    const user: User = {
      id: "user-123",
      email,
      firstName: "John",
      lastName: "Doe",
      phone: "+1 (555) 123-4567",
      role: "client", // Default role for regular users
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("user", JSON.stringify(user))
    setAuthCookies(user)
    setState({
      user,
      isLoading: false,
      isAuthenticated: true,
    })
  }

  const loginAsDemo = async (role: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const demoAccount = DEMO_ACCOUNTS[role]
    const { password: _, ...user } = demoAccount

    localStorage.setItem("user", JSON.stringify(user))
    setAuthCookies(user)
    setState({
      user,
      isLoading: false,
      isAuthenticated: true,
    })
  }

  const register = async (data: RegisterData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: User = {
      id: "user-" + Math.random().toString(36).substr(2, 9),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: "client", // Default role for new registrations
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("user", JSON.stringify(user))
    setAuthCookies(user)
    setState({
      user,
      isLoading: false,
      isAuthenticated: true,
    })
  }

  const logout = () => {
    localStorage.removeItem("user")
    clearAuthCookies()
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!state.user) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedUser = { ...state.user, ...data }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setAuthCookies(updatedUser)
    setState((prev) => ({
      ...prev,
      user: updatedUser,
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
        loginAsDemo, // Added demo login function
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useIsAdmin() {
  const { user } = useAuth()
  return user?.role === "admin"
}

export function useIsClient() {
  const { user } = useAuth()
  return user?.role === "client"
}
