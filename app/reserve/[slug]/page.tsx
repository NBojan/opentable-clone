import Link from "next/link";
import prisma from "@/utils/forPisma";
import ReserveForm from "../components/ReserveForm";
import styles from "../../../styles/Reserve/Reserve.module.css";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { convertToDisplayTime } from "@/utils/convertTime";

const getRestaurant = async (slug: string) => {
  const response = await prisma.restaurant.findUnique({
    where: { slug },
    select: { name: true, main_image: true },
  });
  if (!response) notFound();
  return response;
};

const Reserve = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { day: string; time: string; partySize: string };
}) => {
  const restaurant = await getRestaurant(params.slug);
  const { day, time, partySize } = searchParams;
  const date = new Date(`${day}T${time}`);

  if (!day || !time || !partySize) {
    return (
      <section className="page bg-col-fff">
        <article className="inside-cont m-auto pTB-32">
          <h3 className="capitalize">missing query parameters!</h3>
          <p className="col-light-grey mb-12">
            Follow the link from the restaurant reservation bar to make a
            reservation.
          </p>
          <Link href="/" className="btn btn-s btn-prim">
            Back to Homepage
          </Link>
        </article>
      </section>
    );
  }

  return (
    <section className="page bg-col-fff">
      <article className="inside-cont m-auto pTB-32">
        <h3>Lovely place!</h3>

        <div className={`${styles.reserveCard} d-flex align-center`}>
          <img src={restaurant.main_image} alt="rest. image" />

          <div className={styles.reserveCardInfo}>
            <h4>{restaurant.name}</h4>
            <div className="d-flex space-between col-light-grey">
              <span>{format(date, "eeee, MMM dd")}</span>
              <span className="mLR-8">{convertToDisplayTime(time)}</span>
              <span>
                {partySize} {parseInt(partySize) === 1 ? "person" : "people"}
              </span>
            </div>
          </div>
        </div>

        <ReserveForm queries={{...searchParams, ...params}} />
      </article>
    </section>
  );
};

export default Reserve;
