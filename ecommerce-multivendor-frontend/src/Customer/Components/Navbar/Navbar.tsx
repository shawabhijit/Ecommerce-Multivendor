import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AddShoppingCart, FavoriteBorder, Storefront } from '@mui/icons-material';

const Navbar = () => {

    let isLoggedIn = true; // This should be replaced with actual authentication logic
    const theme = useTheme()
    const isLarge = useMediaQuery(theme.breakpoints.up('lg')) // Check if the screen size is large or larger
    return (
        <div>
            <Box>
                <div className='flex justify-between items-center px-5 lg:px-20 h-[70px] border-b border-gray-300'>
                    <div className='flex items-center gap-2 md:gap-9'>
                        <div className='flex items-center gap-2 md:gap-4 p-2 md:p-4 '>
                            { !isLarge && <IconButton>
                                <MenuIcon />
                            </IconButton>}
                            <h1 className='logo-bold cursor-pointer text-lg md:text-2xl text-[#09c5a9] '>HikariHub</h1>
                        </div>
                        <ul className='flex items-center font-medium text-gray-800'>
                            { ["Men", "Women", "Home & Furniture","Electronics"].map( item => 
                                <li className='mainCategory items-center hover:text-[#00927c] hover:border-b-2  px-4 border-[#00927c]'>{item}</li>
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
                            <FavoriteBorder sx={{fontSize:29}}/>
                        </IconButton>
                        <IconButton>
                            <AddShoppingCart className='text-gray-700' sx={{fontSize:29}} />
                        </IconButton>
                        {
                            isLarge && <Button variant="outlined" startIcon={<Storefront />}>
                                Become Seller
                            </Button>
                        }
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Navbar