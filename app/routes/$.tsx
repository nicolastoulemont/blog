import { redirect } from "@remix-run/node"

// Catch all 404s and redirect to the homepage instead
export const loader = () => {
  throw redirect("/")
}
