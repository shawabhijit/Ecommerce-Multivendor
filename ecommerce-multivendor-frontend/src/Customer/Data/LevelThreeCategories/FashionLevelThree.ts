import { Category } from "../CategoryType";

const FashionLevelThree : Category[] = [
    { 
        name: "T-Shirts", category_Id: "tshirts", parentCategoryName: "Men", parentCategoryId: "men" 
    },
    { 
        name: "Jeans", category_Id: "jeans", parentCategoryName: "Men", parentCategoryId: "men" 
    },
    { 
        name: "Dresses", category_Id: "dresses", parentCategoryName: "Women", parentCategoryId: "women" 
    },
    { 
        name: "Kurtas", category_Id: "kurtas", parentCategoryName: "Women", parentCategoryId: "women" 
    },
    { 
        name: "Boys Clothing", category_Id: "boys-clothing", parentCategoryName: "Kids", parentCategoryId: "kids" 
    },
    { 
        name: "Girls Clothing", category_Id: "girls-clothing", parentCategoryName: "Kids", parentCategoryId: "kids" 
    },
]

export default FashionLevelThree;
