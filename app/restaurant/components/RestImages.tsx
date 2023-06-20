import styles from "../../../styles/Restaurant/Restaurant.module.css";

const RestImages = ({ images }: { images: string[] }) => {
  return (
    <div className="mb-8">
      <h4 className="border-b-grey pb-8 mb-24">4 Photos</h4>

      <div className={`${styles.restImages} d-flex space-between flex-wrap`}>
        {images.map(image => <img src={image} alt="rest. image" key={image} />)}        
      </div>
    </div>
  );
};
 
export default RestImages;