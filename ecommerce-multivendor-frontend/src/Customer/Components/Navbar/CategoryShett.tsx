import React from 'react'
import ElectronicsLevelTwo from '../../Data/LevelTwoCategories/ElectronicsLevelTwo'
import FashionLevelTwo from '../../Data/LevelTwoCategories/FashionLevelTwo'
import homeAndFurnitureLevelTwo from '../../Data/LevelTwoCategories/Home&FurnitureLevelTwo'
import ElectronicsLevelThree from '../../Data/LevelThreeCategories/ElectronicsLevelThree'
import FashionLevelThree from '../../Data/LevelThreeCategories/FashionLevelThree'
import HomeFurnitureLevelThreeCategories from '../../Data/LevelThreeCategories/Home&FurnitureLevelThree'
import { Box } from '@mui/material'
import { Category } from '../../Data/CategoryType'
import { useNavigate } from 'react-router-dom'

const categoryTwo:{[key:string]:any} = {
    Electronics: ElectronicsLevelTwo,
    Fashion: FashionLevelTwo,
    Furniture: homeAndFurnitureLevelTwo
}

const levelThree: { [key: string]: any } = {
    Electronics: ElectronicsLevelThree,
    Fashion: FashionLevelThree,
    Furniture: HomeFurnitureLevelThreeCategories
}

const CategoryShett = ({selectedCategory,setShowSheet} :any) => {

    const childCategory = (category:any , parentCategoryId: any) => {
        return category.filter((item:Category) => item.parentCategoryId === parentCategoryId);
    }

    const navigate = useNavigate();

    return (
        <>
        <Box className = "bg-white shadow-lg lg:h-[200px] overflow-y-auto">
            <div className='flex text-sm flex-wrap gap-10 cursor-pointer'>
                {
                        categoryTwo[selectedCategory]?.map((category : Category , index : number) => <div className={`p-8 lg:w-[20%] ${index%2==0 ? "bg-slate-100" : "bg-white"}`}>
                        <p key={category.category_Id} className='text-[#00927c] mb-5 font-semibold text-lg'>{category.name}</p>
                        <ul className='space-y-3'>
                            {
                                childCategory(levelThree["Electronics"], category.category_Id)?.map((item:Category) => 
                                <li onClick={() => navigate("/products/"+item.category_Id)} key={item.category_Id} className='text-gray-700 hover:text-[#00927c] hover:border-b-2'>{item.name}</li>)

                            }
                        </ul>
                    </div>
                    )
                }
            </div>
        </Box>
        
        </>
    )
}

export default CategoryShett