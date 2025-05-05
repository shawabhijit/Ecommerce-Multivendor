import { useParams } from "react-router-dom"
import ProductDetails from "./ProductDetails";


export default function ProductDetailsWrapper() {
    const { id } = useParams();

    if (!id) {
        return <div>Invalid Product id</div>
    }

    return <ProductDetails id={id} />
}