import { useEffect, useState } from "react";
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

const mockVendors: Vendor[] = [
  {
    id: "9f0c2a98-8c91-4c4b-b1f1-17279f4e29a1",
    name: "Jackson Reed",
    businessName: "Reed & Sons",
    email: "jackson.reed@example.com",
    verificationStatus: "verified",
    productsCount: 38,
    joinedDate: "4/10/2025",
  },
  {
    id: "fc4db6e1-7f60-476a-8793-5ac59d69e527",
    name: "Lily Turner",
    businessName: "Turner Ventures",
    email: "lily.turner@example.com",
    verificationStatus: "pending",
    productsCount: 64,
    joinedDate: "5/2/2025",
  },
  {
    id: "fcb063e2-9d0f-48f0-b2c6-b3de2cfb93fc",
    name: "Owen Hughes",
    businessName: "Hughes Goods Co.",
    email: "owen.hughes@example.com",
    verificationStatus: "verified",
    productsCount: 12,
    joinedDate: "3/28/2025",
  },
  {
    id: "9a7de65d-0e69-486b-8c60-6f496238e142",
    name: "Harper Hayes",
    businessName: "Hayes Textiles",
    email: "harper.hayes@example.com",
    verificationStatus: "rejected",
    productsCount: 27,
    joinedDate: "4/17/2025",
  },
  {
    id: "f89b6f57-2a10-4b0f-bce7-94a8b8d73a3e",
    name: "Ethan Brooks",
    businessName: "Brooks Market",
    email: "ethan.brooks@example.com",
    verificationStatus: "verified",
    productsCount: 53,
    joinedDate: "3/30/2025",
  },
  {
    id: "4f98a7ae-32ec-4aa7-b20a-c9e6c0c68c1a",
    name: "Grace Adams",
    businessName: "Adams Apparel",
    email: "grace.adams@example.com",
    verificationStatus: "pending",
    productsCount: 9,
    joinedDate: "5/3/2025",
  },
  {
    id: "e245f2d7-5cb5-4b49-8b93-197fdf19eb76",
    name: "Henry Bennett",
    businessName: "Bennett Homeware",
    email: "henry.bennett@example.com",
    verificationStatus: "verified",
    productsCount: 45,
    joinedDate: "5/6/2025",
  },
  {
    id: "d6272d4d-263d-4975-a5b6-7119182ab6fb",
    name: "Chloe Rogers",
    businessName: "Rogers Creations",
    email: "chloe.rogers@example.com",
    verificationStatus: "rejected",
    productsCount: 0,
    joinedDate: "4/15/2025",
  },
  {
    id: "a0193a46-b6cb-47f0-9f84-d85eb59a7c9a",
    name: "Daniel Evans",
    businessName: "Evans Supply Co.",
    email: "daniel.evans@example.com",
    verificationStatus: "verified",
    productsCount: 88,
    joinedDate: "4/26/2025",
  },
  {
    id: "1f3e60a7-cddb-457e-816c-2ff52a2e8cf2",
    name: "Avery Jenkins",
    businessName: "Jenkins Distributors",
    email: "avery.jenkins@example.com",
    verificationStatus: "pending",
    productsCount: 21,
    joinedDate: "5/10/2025",
  },
  {
    id: "be1125e7-e47e-42f4-95b4-cf8ac0d7bc68",
    name: "Matthew Clark",
    businessName: "Clark Tools",
    email: "matthew.clark@example.com",
    verificationStatus: "verified",
    productsCount: 76,
    joinedDate: "4/22/2025",
  },
  {
    id: "e5a3f734-e263-4b18-9f17-2c4a42cd443e",
    name: "Ella Perry",
    businessName: "Perry Accessories",
    email: "ella.perry@example.com",
    verificationStatus: "rejected",
    productsCount: 7,
    joinedDate: "3/25/2025",
  },
  {
    id: "b7b8df3f-5889-448c-87b7-59d3b20a2e5f",
    name: "Sebastian Morris",
    businessName: "Morris Foods",
    email: "sebastian.morris@example.com",
    verificationStatus: "verified",
    productsCount: 99,
    joinedDate: "4/5/2025",
  },
  {
    id: "82ffb9aa-861a-4637-858c-805145eb4734",
    name: "Scarlett Foster",
    businessName: "Foster Crafts",
    email: "scarlett.foster@example.com",
    verificationStatus: "pending",
    productsCount: 39,
    joinedDate: "4/28/2025",
  },
  {
    id: "6e5f4e3e-faf8-4d9d-80d6-3adfd7fc012a",
    name: "David Cooper",
    businessName: "Cooper Stationery",
    email: "david.cooper@example.com",
    verificationStatus: "verified",
    productsCount: 32,
    joinedDate: "5/1/2025",
  },
  {
    id: "27aeb29f-6a13-4991-9633-272d76c7fd13",
    name: "Victoria Bailey",
    businessName: "Bailey Books",
    email: "victoria.bailey@example.com",
    verificationStatus: "rejected",
    productsCount: 2,
    joinedDate: "3/31/2025",
  },
  {
    id: "c2b9df5f-2b87-45c7-9d6d-8e1c28fd9985",
    name: "Logan Rivera",
    businessName: "Rivera Deals",
    email: "logan.rivera@example.com",
    verificationStatus: "verified",
    productsCount: 57,
    joinedDate: "4/14/2025",
  },
  {
    id: "db587eb1-5a5b-4a6f-bb96-84bc7fd0f5cb",
    name: "Aria Mitchell",
    businessName: "Mitchell Boutique",
    email: "aria.mitchell@example.com",
    verificationStatus: "pending",
    productsCount: 18,
    joinedDate: "4/24/2025",
  },
  {
    id: "9a74f241-c455-42c1-8671-f95a1903a582",
    name: "Nathan Russell",
    businessName: "Russell Electronics",
    email: "nathan.russell@example.com",
    verificationStatus: "verified",
    productsCount: 70,
    joinedDate: "5/7/2025",
  },
  {
    id: "e9054ef3-8f2d-4740-a8e5-d07a931c35fd",
    name: "Zoe Simmons",
    businessName: "Simmons Gadgets",
    email: "zoe.simmons@example.com",
    verificationStatus: "rejected",
    productsCount: 5,
    joinedDate: "4/18/2025",
  },
];



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