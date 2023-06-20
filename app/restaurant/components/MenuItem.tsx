import styles from "../../../styles/Restaurant/Restaurant.module.css";
import { Item } from "@prisma/client";

const MenuItem = ({ item }: { item: Item }) => {
  return (
    <div className={`${styles.menuItem} border-grey b-rad4`}>
      <h4>{item.name}</h4>
      <p className="mb-16 col-light-grey">{item.description}</p>
      <p>{item.price}</p>
    </div>
  );
};
 
export default MenuItem;