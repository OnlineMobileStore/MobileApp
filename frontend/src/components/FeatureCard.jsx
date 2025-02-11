import React from "react";
import { motion } from "framer-motion";
import shipping from "../assets/shipping.png";
import support from "../assets/support.png";
import refund from "../assets/refund.png";

// Component for dynamically loading image + text horizontally
const DynamicComponent = ({ imageSrc, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }} // Start position from right
      whileInView={{ opacity: 1, x: 50 }} // Move to final position
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.5 }} // Trigger when 50% is in view
      style={{
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent:"center",
        margin: "20px 0",
        gap: "10px", 
        width:"170px"
      }}
    >
      <img
        src={imageSrc}
        alt="Dynamic"
        style={{ width: "100px", height: "100px"}}
      />
      <span style={{textAlign:"center"}}>{text}</span>
    </motion.div>
  );
};

const FeatureCard = () => {
  return (
    <div style={{display:"flex",alignContent:"center",justifyContent:"space-Around"}}>
      {/* Dynamically load image and text horizontally */}
      <DynamicComponent
        imageSrc={shipping}
        text="Get your orders delivered quickly, right at your doorstep! 🎉"
      />
      <DynamicComponent
        imageSrc={refund}
        text="Enjoy hassle-free returns with our easy refund policy. 🎊"
      />
      <DynamicComponent
        imageSrc={support}
        text="Reach out anytime for assistance—our team is always ready! 🚀"
      />
    </div>
  );
};

export default FeatureCard;
