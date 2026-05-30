import CardSection from "../components/CardSection"
import Categories from "../components/Categories"
import ExplorerSection from "../components/ExplorerSection"
import Hero from "../components/Hero"
import PageLayout from "../components/PageLayout"

const HomeScreen: React.FC = () => {
  return (
    <PageLayout>
      <Hero />

      <main className="px-30 py-10 flex flex-col gap-10">
        <Categories />
        <CardSection />
        <ExplorerSection />
      </main>
    </PageLayout>
  )
}

export default HomeScreen
