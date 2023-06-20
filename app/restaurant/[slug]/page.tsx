import styles from "../../../styles/Restaurant/Restaurant.module.css";
import prisma from "@/utils/forPisma";
import { notFound } from "next/navigation";
import { RestaurantSection, ReservationBar, RestHero } from "../components";

const getRestaurant = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      name: true,
      reviews: true,
      description: true,
      images: true,
      location: true,
      slug: true,
      openTime: true,
      closeTime: true
    },
  });
  if (!restaurant) notFound();
  return restaurant;
};

const Restaurant = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await getRestaurant(params.slug);

  return (
    <>
      <RestHero name={restaurant.name} location={restaurant.location} />

      <article className={`${styles.restLayout} inside-cont m-auto pb-32`}>
        <div className={`${styles.restBody} d-flex align-start space-between`}>
          <RestaurantSection restaurant={restaurant} />
          <ReservationBar slug={restaurant.slug} openTime={restaurant.openTime} closeTime={restaurant.closeTime} />
        </div>
      </article>
    </>
  );
};

export default Restaurant;
