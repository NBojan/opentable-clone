import styles from "../../../styles/Restaurant/Restaurant.module.css";
import { Review, Location } from "@prisma/client";
import { RestImages, RestInfo, RestNavbar, RestTitle, RestReviews } from "./index";

interface RestaurantInfo {
    name: string;
    reviews: Review[];
    description: string;
    images: string[];
    location: Location;
    slug: string;
}

const RestaurantSection = ({ restaurant }: { restaurant: RestaurantInfo }) => {
  return (
    <div className={`${styles.restSection} mr-32`}>
      <RestNavbar slug={restaurant.slug} />
      <RestTitle name={restaurant.name} />
      <RestInfo descr={restaurant.description} reviews={restaurant.reviews} />
      <RestImages images={restaurant.images} />
      <RestReviews reviews={restaurant.reviews} />
    </div>
  );
};
 
export default RestaurantSection;