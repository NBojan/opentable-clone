import Link from "next/link";
import styles from "../../../styles/Search/Search.module.css";
import { Params } from "../page";
import { prices } from "../../../utils/prices";

interface Filters {
  locations: {
    id: number;
    name: string;
  }[];
  cuisines: {
    id: number;
    name: string;
  }[];
}

const Filters = ({
  filters,
  searchParams,
}: {
  filters: Filters;
  searchParams: Params;
}) => {
  const { cuisines, locations } = filters;

  return (
    <div className={`${styles.filtersCont} mr-32`}>
      <div className="filters">
        <div className={`${styles.links} region border-b-grey pTB-12`}>
          <h4>Regions</h4>
          {locations.map((location) => (
            <Link
              href={`/search?location=${location.name}`}
              key={location.id}
              className="d-block col-light-grey mb-4 transition-2 capitalize"
            >
              {location.name}
            </Link>
          ))}
        </div>

        <div className={`${styles.links} cuisine border-b-grey pTB-12`}>
          <h4>Cuisine</h4>
          {cuisines.map((cuisine) => (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, cuisine: cuisine.name },
              }}
              key={cuisine.id}
              className="d-block col-light-grey mb-4 transition-2 capitalize"
            >
              {cuisine.name}
            </Link>
          ))}
        </div>

        <div className={`${styles.prices} price pTB-12`}>
          <h4>Price</h4>
          <div className="d-flex">
            {prices.map((price) => (
              <Link
                href={{
                  pathname: "/search",
                  query: { ...searchParams, price: price.price },
                }}
                className="border-grey transition-2"
                key={price.text}
              >
                {price.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
