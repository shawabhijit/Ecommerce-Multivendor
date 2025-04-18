import SellerNav from './layout/SellerNav';
import { SellerDashboard } from './dashboard/SellerDashboard';
import { OrderManagement } from './orders/OrderManagement';
import { ProductManagement } from './products/ProductsManagement';
import { AddEditProduct } from './products/AddEditProducts/SellerAddProduct';
import SellerEarnings from './earnings/SellerEarnings';



const SellerIndex = ({isLogedin}) => {

    return (
        <>
            <SellerNav isLogedin={isLogedin} />
            <main className="flex-grow min-h-screen overflow-hidden">
                <div className="container mx-auto px-4 space-y-8 pb-10 pt-28">
                    {/* <SellerDashboard /> */}
                    {/* <OrderManagement /> */}
                    {/* <ProductManagement /> */}
                    {/* <AddEditProduct /> */}
                    <SellerEarnings />
                </div>
            </main>
        </>
    );
};

export default SellerIndex;