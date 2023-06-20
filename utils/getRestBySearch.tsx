import prisma from "./forPisma";
import { Params } from "@/app/search/page";

export const getRestBySearch = async (searchParams: Params) => {
    const { location, cuisine, price } = searchParams;
    const select = {
      id: true, name: true,
      cuisine: true, location: true,
      reviews: true, main_image: true,
      price: true, slug: true,
    };
    const where: any = {};
    if (!location) {
      const restaurants = await prisma.restaurant.findMany({ select });
      return restaurants;
    }
    if (location) {
      where.location = {
        name: {
          equals: location.toLowerCase(),
        },
      };
    }
    if (cuisine) {
      where.cuisine = {
        name: {
          equals: cuisine.toLowerCase(),
        },
      };
    }
    if (price) {
      where.price = {
        equals: price,
      };
    }
    const restaurants = await prisma.restaurant.findMany({ where, select });
    return restaurants
  };