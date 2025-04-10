import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AddShoppingCart, FavoriteBorder, Storefront } from '@mui/icons-material';
import CategoryShett from './CategoryShett';
import levelOneCategories from '../../Data/LevelOneCategory/LevelOneCategories';
import { useState } from 'react';

const Navbar = () => {

    let isLoggedIn = true; // This should be replaced with actual authentication logic
    const theme = useTheme()
    const isLarge = useMediaQuery(theme.breakpoints.up('lg')) // Check if the screen size is large or 
    const [selectedCategory, setSelectedCategory] = useState("Electronics")
    const [showCategorySheet, setShowCategorySheet] = useState(false)


    return (
        <div>
            <Box className="sticky top-0 left-0 right-0 bg-white z-10">
                <div className='flex justify-between items-center px-5 lg:px-20 h-[70px] border-b border-gray-300'>
                    <div className='flex items-center gap-2 md:gap-9'>
                        <div className='flex items-center gap-2 md:gap-4 p-2 md:p-4 '>
                            {!isLarge && <IconButton>
                                <MenuIcon />
                            </IconButton>}
                            <h1 className='logo-bold cursor-pointer text-lg md:text-2xl text-[#09c5a9] '>HikariHub</h1>
                        </div>
                        <ul className='flex items-center font-medium text-gray-800'>
                            {levelOneCategories.map(item =>
                                <div
                                    //onMouseLeave={() => setShowCategorySheet(false)}
                                    onMouseEnter={() => {
                                        setShowCategorySheet(true)
                                        setSelectedCategory(item.name)
                                    }}
                                >
                                    <li
                                        className='mainCategory items-center hover:text-[#00927c] hover:border-b-2  px-4 border-[#00927c]'>
                                        {item.name}
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                    <div className='flex gap-1 lg:gap-6 items-center'>
                        <IconButton>
                            <SearchIcon className='text-white'></SearchIcon>
                        </IconButton>
                        {
                            isLoggedIn ? <Button className='gap-2'>
                                <Avatar
                                    sx={{ width: 29, height: 29 }}
                                    src="/static/images/avatar/1.jpg"
                                />
                                <h1 className='font-semibold hidden  lg:block'>Abhi</h1>
                            </Button> :
                                <Button variant="contained">Login</Button>
                        }
                        <IconButton>
                            <FavoriteBorder sx={{ fontSize: 29 }} />
                        </IconButton>
                        <IconButton>
                            <AddShoppingCart className='text-gray-700' sx={{ fontSize: 29 }} />
                        </IconButton>
                        {
                            isLarge && <Button variant="outlined" startIcon={<Storefront />}>
                                Become Seller
                            </Button>
                        }
                    </div>
                </div>
                {showCategorySheet && <div
                    onMouseLeave={() => setShowCategorySheet(false)}
                    onMouseEnter={() => setShowCategorySheet(true)}
                    className='absolute top-[4.41rem] left-20 right-20 categorySheet'>
                    <CategoryShett selectedCategory={selectedCategory} />
                </div>}
            </Box>
        </div>
    )
}

export default Navbar