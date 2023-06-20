import Link from "next/link";
import SearchItemInfo from "./SearchItemInfo";
import styles from "../../../styles/Search/Search.module.css";
import { FaArrowRight } from "react-icons/fa";
import { Cuisine, Location, Price, Review } from "@prisma/client";

const SearchItem = ({
  restaurant,
}: {
  restaurant: {
    id: number;
    name: string;
    cuisine: Cuisine;
    location: Location;
    reviews: Review[];
    main_image: string;
    price: Price;
    slug: string;
  };
}) => {
  const { name, cuisine, location, main_image, price, slug, reviews } =
    restaurant;

  return (
    <div className={`${styles.searchItem} d-flex border-b-grey pb-16 mb-16`}>
      <img src={main_image} alt="Rest Image" />

      <div className="d-flex flex-column space-between">
        <SearchItemInfo
          name={name}
          reviews={reviews}
          price={price}
          cuisine={cuisine}
          location={location}
        />

        <Link
          href={`/restaurant/${slug}`}
          className="d-flex align-center hov-prim transition-2"
        >
          <span className="mr-6">View more information</span>
          <span className="lh-0">
            <FaArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SearchItem;
