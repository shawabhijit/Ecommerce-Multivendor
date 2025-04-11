type ColorFilterOption = {
    label: string;
    value: string;
    hex: string;
};

type GenericFilterOption = {
    label: string;
    value: string | number;
};

type PriceFilterOption = {
    label: string;
    value: string;
    min: number;
    max: number;
};


export const colorFilter: ColorFilterOption[] = [
    { label: "Black", value: "black", hex: "#000000" },
    { label: "White", value: "white", hex: "#FFFFFF" },
    { label: "Red", value: "red", hex: "#FF0000" },
    { label: "Blue", value: "blue", hex: "#0000FF" },
    { label: "Green", value: "green", hex: "#008000" },
    { label: "Yellow", value: "yellow", hex: "#FFFF00" },
    { label: "Purple", value: "purple", hex: "#800080" },
    { label: "Pink", value: "pink", hex: "#FFC0CB" },
    { label: "Grey", value: "grey", hex: "#808080" },
    { label: "Brown", value: "brown", hex: "#A52A2A" },
    { label: "Orange", value: "orange", hex: "#FFA500" },
    { label: "Maroon", value: "maroon", hex: "#800000" },
    { label: "Navy", value: "navy", hex: "#000080" },
    { label: "Teal", value: "teal", hex: "#008080" },
    { label: "Olive", value: "olive", hex: "#808000" },
    { label: "Beige", value: "beige", hex: "#F5F5DC" },
    { label: "Lavender", value: "lavender", hex: "#E6E6FA" },
    { label: "Coral", value: "coral", hex: "#FF7F50" },
    { label: "Mint", value: "mint", hex: "#98FF98" },
    { label: "Peach", value: "peach", hex: "#FFE5B4" },
    { label: "Turquoise", value: "turquoise", hex: "#40E0D0" },
    { label: "Sky Blue", value: "sky-blue", hex: "#87CEEB" },
    { label: "Indigo", value: "indigo", hex: "#4B0082" },
    { label: "Gold", value: "gold", hex: "#FFD700" },
    { label: "Silver", value: "silver", hex: "#C0C0C0" },
    { label: "Charcoal", value: "charcoal", hex: "#36454F" },
    { label: "Khaki", value: "khaki", hex: "#F0E68C" },
    { label: "Lime", value: "lime", hex: "#00FF00" },
    { label: "Magenta", value: "magenta", hex: "#FF00FF" },
    { label: "Cyan", value: "cyan", hex: "#00FFFF" }
];



export const priceFilter: PriceFilterOption[] = [
    { label: "Under ₹500", value: "0-500", min: 0, max: 500 },
    { label: "₹500 - ₹1,000", value: "500-1000", min: 500, max: 1000 },
    { label: "₹1,000 - ₹2,000", value: "1000-2000", min: 1000, max: 2000 },
    { label: "₹2,000 - ₹5,000", value: "2000-5000", min: 2000, max: 5000 },
    { label: "₹5,000 - ₹10,000", value: "5000-10000", min: 5000, max: 10000 },
    { label: "Above ₹10,000", value: "10000+", min: 10000, max: Infinity }
];

export const discountFilter: GenericFilterOption[] = [
    { label: "10% or more", value: 10 },
    { label: "20% or more", value: 20 },
    { label: "30% or more", value: 30 },
    { label: "40% or more", value: 40 },
    { label: "50% or more", value: 50 },
    { label: "60% or more", value: 60 },
    { label: "70% or more", value: 70 }
];

export const brandFilter: GenericFilterOption[] = [
    { label: "Nike", value: "nike" },
    { label: "Adidas", value: "adidas" },
    { label: "Puma", value: "puma" },
    { label: "Zara", value: "zara" },
    { label: "Levi's", value: "levis" },
    { label: "Apple", value: "apple" },
    { label: "Samsung", value: "samsung" },
    { label: "Sony", value: "sony" },
    { label: "HP", value: "hp" },
    { label: "Dell", value: "dell" }
];

export const ratingsFilter: GenericFilterOption[] = [
    { label: "4★ & above", value: 4 },
    { label: "3★ & above", value: 3 },
    { label: "2★ & above", value: 2 },
    { label: "1★ & above", value: 1 }
];

export const deliveryFilter: GenericFilterOption[] = [
    { label: "Tomorrow Delivery", value: "next-day" },
    { label: "Free Delivery", value: "free" },
    { label: "Express Delivery", value: "express" }
];


export const materialFilter: GenericFilterOption[] = [
    { label: "Cotton", value: "cotton" },
    { label: "Polyester", value: "polyester" },
    { label: "Leather", value: "leather" },
    { label: "Denim", value: "denim" },
    { label: "Wool", value: "wool" }
];

