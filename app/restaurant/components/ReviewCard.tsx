import { Review } from "@prisma/client";
import styles from "../../../styles/Restaurant/Restaurant.module.css";
import { Stars } from "@/app/components";

const ReviewCard = ({review} : {review: Review}) => {
    return (
      <div className={`${styles.review} d-flex align-center border-b-grey pTB-16`}>
        <div className={`${styles.circleCont} mr-32 d-flex flex-column align-center`}>
          <span className={`${styles.circle} mb-4`}>
            {review.first_name.slice(0, 1)} {review.last_name.slice(0, 1)}
          </span>
          <p>
            {review.first_name} {review.last_name}
          </p>
        </div>

        <div className="flex1">
          <div className="mb-16">
            <Stars rating={review.rating} />
          </div>
          <div className="col-light-grey">{review.text}</div>
        </div>
      </div>
    );
}
 
export default ReviewCard;