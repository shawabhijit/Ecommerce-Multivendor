import type { ColorOption, DiscountOption } from "./Types"

export const colorOptions: ColorOption[] = [
    { name: 'Navy Blue', count: 8580, colorCode: '#001f3f', isSelected: false },
    { name: 'Grey', count: 7164, colorCode: '#AAAAAA', isSelected: false },
    { name: 'Beige', count: 4887, colorCode: '#F5F5DC', isSelected: false },
    { name: 'Red', count: 7600, colorCode: '#FF4136', isSelected: false },
    { name: 'Yellow', count: 6800, colorCode: '#FFDC00', isSelected: false },
    { name: 'Orange', count: 5700, colorCode: '#FF851B', isSelected: false },
    { name: 'Purple', count: 4900, colorCode: '#B10DC9', isSelected: false },
    { name: 'Brown', count: 4500, colorCode: '#8B4513', isSelected: false },
    { name: 'Blue', count: 17208, colorCode: '#0074D9', isSelected: false },
    { name: 'White', count: 13504, colorCode: '#FFFFFF', isSelected: false },
    { name: 'Black', count: 10665, colorCode: '#111111', isSelected: false },
    { name: 'Green', count: 9534, colorCode: '#2ECC40', isSelected: false },
    { name: 'Pink', count: 4300, colorCode: '#FF69B4', isSelected: false },
    { name: 'Maroon', count: 3900, colorCode: '#800000', isSelected: false },
    { name: 'Teal', count: 3600, colorCode: '#20B2AA', isSelected: false },
    { name: 'Olive', count: 3400, colorCode: '#808000', isSelected: false },
    { name: 'Sky Blue', count: 3200, colorCode: '#87CEEB', isSelected: false },
    { name: 'Lime', count: 3000, colorCode: '#00FF00', isSelected: false },
    { name: 'Gold', count: 2800, colorCode: '#FFD700', isSelected: false },
    { name: 'Turquoise', count: 2600, colorCode: '#40E0D0', isSelected: false },
];


export const discountOptions: DiscountOption[] = [
    { label: '10% and above', value: 10, isSelected: false },
    { label: '20% and above', value: 20, isSelected: false },
    { label: '30% and above', value: 30, isSelected: false },
    { label: '40% and above', value: 40, isSelected: true },
    { label: '50% and above', value: 50, isSelected: false },
    { label: '60% and above', value: 60, isSelected: false },
    { label: '70% and above', value: 70, isSelected: false },
    { label: '80% and above', value: 80, isSelected: false },
    { label: '90% and above', value: 90, isSelected: false },
];