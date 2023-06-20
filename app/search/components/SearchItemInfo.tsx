import calcRating from "@/utils/calcRating";
import { Stars } from "@/app/components";
import { priceToDollar } from "@/utils/prices";
import { Cuisine, Location, Price, Review } from "@prisma/client";

const SearchItemInfo = ({
  name,
  reviews,
  price,
  cuisine,
  location,
}: {
  name: string;
  cuisine: Cuisine;
  location: Location;
  price: Price;
  reviews: Review[]
}) => {
  const rating = calcRating(reviews);
  return (
    <div className="info">
      <h4 className="capitalize">{name}</h4>
      <div className="mb-8 d-flex align-center">
        <div className="mr-8">
          <Stars rating={rating} />
        </div>
        <p>
          {reviews.length} {reviews.length === 1 ? `review` : `Reviews`}
        </p>
      </div>
      <div className="d-flex align-center mb-8">
        <span className="mr-8">{priceToDollar(price)}</span>
        <span className="mr-8 capitalize">{cuisine.name}</span>
        <span className="mr-8 capitalize">{location.name}</span>
      </div>
    </div>
  );
};

export default SearchItemInfo;
