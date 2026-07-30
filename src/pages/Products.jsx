import { useSearchParams } from "react-router-dom";
import FeaturedProducts from "../components/products/FeaturedProduct";

export default function Products({ onAddToCart }) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  return (
    <>
      <FeaturedProducts onAddToCart={onAddToCart} searchQuery={searchQuery} />
    </>
  );
}
