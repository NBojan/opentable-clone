import Link from "next/link";

const RestNavbar = ({ slug }: { slug: string }) => {
  return (
    <div className="border-b-grey pTB-8">
      <Link href={`/restaurant/${slug}`} className="mr-16 hov-prim transition-2">
        Overview
      </Link>
      <Link href={`/restaurant/${slug}/menu`} className="mr-16 hov-prim transition-2">
        Menu
      </Link>
    </div>
  );
};
 
export default RestNavbar;