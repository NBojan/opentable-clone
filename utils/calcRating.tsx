import { Review } from "@prisma/client";

const calcRating = (reviews: Review[]) => {
    let rating = reviews.reduce((sum, review) => {
        sum += review.rating;
        return sum
    }, 0)
    if(rating > 0) rating = rating / reviews.length;
    return rating
}
 
export default calcRating;