import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
  AiOutlineSetting,
  AiOutlineHeart,
  AiOutlineLogout,
  AiFillCustomerService,
} from "react-icons/ai";
import { RxExit } from "react-icons/rx";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = ({ logout }: { logout: () => void }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.div
      className=" h-screen w-20 px-6 py-10 text-white flex flex-col items-center justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div className="text-2xl font-bold mb-8">S</motion.div>
      <nav className="space-y-6">
        {menuItems.map(({ name, icon: Icon, path }, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center p-3 rounded-md cursor-pointer transition-all"
            onHoverStart={() => setHoveredItem(name)}
            onHoverEnd={() => setHoveredItem(null)}
          >
            <Link to={path} className="flex flex-col items-center">
              <Icon size={24} />
              {hoveredItem === name && (
                <motion.div
                  className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-md"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  {name}
                </motion.div>
              )}
            </Link>
          </motion.div>
        ))}
      </nav>
      <motion.button onClick={logout}>
        {" "}
        <AiOutlineLogout size={24} />
      </motion.button>
    </motion.div>
  );
};

const menuItems = [
  { name: "Home", icon: AiOutlineHome, path: "/" },
  { name: "Music", icon: AiFillCustomerService, path: "/music" },
  {
    name: "Library",
    icon: AiOutlineUnorderedList,
    path: "/library",
  },
  { name: "Settings", icon: AiOutlineSetting, path: "/settings" },
  { name: "Favorites", icon: AiOutlineHeart, path: "/favorites" },
];

export default Sidebar;
