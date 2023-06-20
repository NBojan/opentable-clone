import ReviewCard from "./ReviewCard";
import { Review } from "@prisma/client";

const RestReviews = ({ reviews }: { reviews: Review[] }) => {
  if(reviews.length) return (
    <div>
      <h4 className="border-b-grey pb-8 mb-0">What {reviews.length} {reviews.length === 1 ? "person" : "people"} are saying :</h4>

      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>

  )
  else return (
    <div>
      <h4 className="border-b-grey pb-8 mb-0">No reviews available.</h4>
    </div>
  );
};
 
export default RestReviews;