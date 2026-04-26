import CardSection from "../components/CardSection"
import Categories from "../components/Categories"
import ExplorerSection from "../components/ExplorerSection"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"

const HomeScreen: React.FC = () => {

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