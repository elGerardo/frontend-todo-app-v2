import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Check({ isFinished, onClick }) {
  const [clicked, setClicked] = useState(isFinished);

  const handleOnClick = () => {
    setClicked(true);
    onClick();
  };

  return !clicked ? (
    <FontAwesomeIcon
      onClick={() => handleOnClick()}
      className={`text-light cursor-pointer`}
      size="2x"
      icon={faCircle}
    />
  ) : (
    <motion.div
      key="finished"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <FontAwesomeIcon
        className={`text-success`}
        size="2x"
        icon={faCircleCheck}
      />
    </motion.div>
  );
}
