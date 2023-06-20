import prisma from "@/utils/forPisma";
import styles from "../../../../styles/Restaurant/Restaurant.module.css";
import { notFound } from "next/navigation";
import { MenuItem, RestHero, RestNavbar } from "../../components";

const getRestaurant = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      name: true,
      location: true,
      items: true
    },
  });
  if (!restaurant) notFound();
  return restaurant;
};

const Menu = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await getRestaurant(params.slug);

  return (
    <>
      <RestHero name={restaurant.name} location={restaurant.location} />

      <article className={`${styles.restLayout} inside-cont m-auto pb-32`}>
        <div className={`${styles.restSection} border-grey`}>
          <RestNavbar slug={params.slug} />

          <h3 className="mTB-16">Menu</h3>

          {restaurant.items.length ? (
            <div className="d-flex space-between flex-wrap">
              {restaurant.items.map((item) => (
                <MenuItem item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <h4>No menu items to show for this restaurant...</h4>
          )}
        </div>
      </article>
    </>
  );
}
 
export default Menu;    