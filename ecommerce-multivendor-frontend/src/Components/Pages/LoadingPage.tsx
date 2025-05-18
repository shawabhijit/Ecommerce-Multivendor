import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingPage = () => {
    const [loadingTime, setLoadingTime] = useState(0);
    const [startTime] = useState(performance.now());

    useEffect(() => {
        const interval = setInterval(() => {

            const currentTime = performance.now();
            const elapsedSeconds = ((currentTime - startTime) / 1000).toFixed(2);
            setLoadingTime(parseFloat(elapsedSeconds));
            
        }, 300);

        return () => clearInterval(interval);
    }, [startTime]);

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-white"
        >
            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                className="flex flex-col items-center justify-center gap-10"
            >
                <motion.h1
                    variants={variants}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-bold bg-clip-text bg-gradient-to-r text-[#F97316]"
                >
                    Hiakri<span className="text-[#3B82F6]">Hub</span>
                </motion.h1>

                <motion.div
                    variants={variants}
                    transition={{ duration: 0.5 }}
                    className="relative h-32 w-32 flex items-center justify-center"
                >
                    <motion.div
                        animate={{
                            rotate: 360,
                            boxShadow: ["0 0 10px 2px rgba(155, 135, 245, 0.2)", "0 0 20px 5px rgba(155, 135, 245, 0.5)", "0 0 10px 2px rgba(155, 135, 245, 0.2)"]
                        }}
                        transition={{
                            rotate: { duration: 3, ease: "linear", repeat: Infinity },
                            boxShadow: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
                        }}
                        className="absolute h-28 w-28 rounded-full border-2 border-[#3B82F6] border-t-transparent"
                    />

                    <motion.div
                        animate={{
                            rotate: -180,
                            boxShadow: ["0 0 8px 2px rgba(126, 105, 171, 0.2)", "0 0 15px 3px rgba(126, 105, 171, 0.4)", "0 0 8px 2px rgba(126, 105, 171, 0.2)"]
                        }}
                        transition={{
                            rotate: { duration: 2, ease: "linear", repeat: Infinity },
                            boxShadow: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
                        }}
                        className="absolute h-16 w-16 rounded-full border-2 border-[#7E69AB] border-b-transparent"
                    />

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{
                            scale: [0.8, 1.1, 0.8],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                        className="h-8 w-8 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]"
                    />
                </motion.div>

                <motion.p
                    variants={variants}
                    className="text-gray-500 text-xs"
                >
                    Load time: {loadingTime}s
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default LoadingPage;