import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

const Stars = ({ rating }: { rating: number }) => {
    let starArray = [];

    for(let i = 0; i < 5; i++){
        starArray.push(<span key={i} className="col-prim-5 mr-1">{rating >= i+1 ? <BsStarFill /> : rating >= i+0.5 ? <BsStarHalf /> : <BsStar />}</span>)
    }

    return (
        <>
            {starArray.map(star => <>{star}</>)}
        </>
    )
};
 
export default Stars;