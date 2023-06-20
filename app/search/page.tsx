import prisma from "@/utils/forPisma";
import styles from "../../styles/Search/Search.module.css";
import { Price } from "@prisma/client";
import { getRestBySearch } from "@/utils/getRestBySearch";
import { Filters, SearchHero, SearchItem } from "./components";

export interface Params {
  location?: string;
  cuisine?: string;
  price?: Price;
}

const getLocationCuisine = async () => {
  const locations = await prisma.location.findMany({
    select: { name: true, id: true },
  });
  const cuisines = await prisma.cuisine.findMany({
    select: { name: true, id: true },
  });
  return { locations, cuisines };
};



const Search = async ({ searchParams }: { searchParams: Params }) => {
  const filters = await getLocationCuisine();
  const restaurants = await getRestBySearch(searchParams);

  return (
    <section className="page bg-col-fff">
      <SearchHero />

      <article
        className={`${styles.searchCont} d-flex inside-cont m-auto pTB-32`}
      >
        <Filters filters={filters} searchParams={searchParams} />

        <div className="flex1">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <SearchItem restaurant={restaurant} key={restaurant.id} />
            ))
          ) : (
            <h3 className="ta-center">No restaurants matching your search...</h3>
          )}
        </div>
      </article>
    </section>
  );
};

export default Search;
