import { useEffect } from "react"
import CardSection from "../components/CardSection"
import Categories from "../components/Categories"
import ExplorerSection from "../components/ExplorerSection"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
import { supabase } from "../supabase_client"

const HomeScreen: React.FC = () => {

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) supabase.auth.signInAnonymously()
    })
  }, [])

  return (
    <>
      <Header />

      <Hero />

      <main className="px-30 py-20 flex flex-col gap-10">

        <Categories />
        <CardSection />
        <ExplorerSection></ExplorerSection>
      </main>
      <Footer></Footer>

    </>
  )

}

export default HomeScreen