import { Unauthorized } from "@/components/auth/unauthorized"

export default function UnauthorizedPage() {
  return (
    <Unauthorized
      title="Access Denied"
      message="You don't have permission to access this page. Please sign in with the appropriate account."
      redirectPath="/"
      redirectLabel="Go to Homepage"
    />
  )
}
