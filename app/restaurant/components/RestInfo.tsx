import calcRating from "@/utils/calcRating";
import { Review } from "@prisma/client";
import { Stars } from "@/app/components";

const RestInfo = ({ descr, reviews } : {descr:string, reviews: Review[]}) => {
  const rating = calcRating(reviews);

    return (
      <div className="pTB-16">
        <div className="d-flex align-center mb-16">
          <div className="mr-12">
            <Stars rating={rating} />
          </div>
          {rating ? <p className="mr-12">{rating}</p> : null}
          <p className="mr-12">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>

        <p className="col-light-grey">{descr}</p>
      </div>
    );
}
 
export default RestInfo;