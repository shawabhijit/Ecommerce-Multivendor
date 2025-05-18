import { motion } from "framer-motion";
import VendorTable from "./VendorTable";
import { fadeIn } from "../Customers/Customers";

export interface Vendor {
  id: string;
  name: string;
  businessName: string;
  email: string;
  verificationStatus: "verified" | "pending" | "rejected";
  productsCount: number;
  joinedDate: string;
}




const VendorList = ({ allSelers }) => {

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <div className="grid gap-6">
        <VendorTable vendors={allSelers} />
      </div>
    </motion.div>

  );
};

export default VendorList;