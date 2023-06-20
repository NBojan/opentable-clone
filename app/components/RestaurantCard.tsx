import Link from "next/link";
import calcRating from "@/utils/calcRating";
import styles from "../../styles/Homepage/Homepage.module.css";
import { FaArrowRight } from "react-icons/fa";
import { priceToDollar } from "@/utils/prices";
import { Cuisine, Price, Review, Location } from "@prisma/client";
import Stars from "./Stars";

interface RestaurantCardType {
  id: number;
  slug: string
  name: string;
  price: Price;
  cuisine: Cuisine;
  reviews: Review[];
  main_image: string;
  location: Location;
}

const RestaurantCard = ({ restaurant }: { restaurant: RestaurantCardType }) => {
  const { slug, name, price, cuisine, reviews, main_image, location } = restaurant;
  const rating = calcRating(reviews);

  return (
    <Link href={`/restaurant/${slug}`} className={`${styles.restaurantCard} d-flex flex-column`}>
      <img src={main_image} alt="rest image" />

      <div className={`${styles.cardInfo} d-flex flex-column space-between flex1`}>
        <div>
          <h4>{name}</h4>

          <div className="d-flex align-center mb-8">
            <div className="mr-8"><Stars rating={rating} /></div>
            <p>{reviews.length} {reviews.length === 1 ? `review` : `Reviews`}</p>
          </div>

          <div className="d-flex align-center mb-8">
            <span className="mr-8 capitalize">{cuisine.name}</span>
            <span className="mr-8">{priceToDollar(price)}</span>
            <span className="mr-8 capitalize">{location.name}</span>
          </div>
        </div>

        <div className={`${styles.cardHover} d-flex align-center transition-2`}>
            <h5 className="mr-6">Check it out!</h5>
            <span className="lh-0"><FaArrowRight /></span> 
        </div>
      </div>
    </Link>
  );
};
 
export default RestaurantCard;