import prisma from "@/utils/forPisma";
import RestaurantCard from "./components/RestaurantCard";
import { HomeHero } from "./components";

const getRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      main_image: true,
      name: true,
      reviews: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true
    },
  });
  return restaurants
}

export default async function Home() {
  const restaurants = await getRestaurants();
  

  return (
    <section className="page bg-col-fff">
      <HomeHero />

      <article className="d-flex space-between flex-wrap inside-cont m-auto pTB-32">
        {restaurants.map(rest => <RestaurantCard key={rest.id} restaurant={rest} />)}
      </article>
    </section>
  );
}
