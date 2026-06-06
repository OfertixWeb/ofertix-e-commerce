import type React from "react"
import { useEffect } from "react"
import Footer from "./Footer"
import Header from "./Header"
import { supabase } from "../supabase_client"

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) supabase.auth.signInAnonymously()
    })
  }, [])

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default PageLayout
