import Card from "@/components/welcome/card";
import Header from "@/components/welcome/header";
import { useField } from "@/hooks/useField";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";

export default function Welcome() {
  const search = useField({
    type: "text",
    required: false,
    placeholder: "Search...",
  });

  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, x: -25 }}
      transition={{ x: { duration: 0.2 } }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.2,
        },
      }}
      exit={{ opacity: 0, x: 25 }}
    >
      <div className="d-flex flex-column align-items-center">
        <div style={{ maxWidth: "700px" }}>
          <Header />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control {...search} />
            </Form.Group>
          </Form>
          <Card
            className="masonry-item"
            text="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry."
          />
        </div>
      </div>
    </motion.div>
  );
}
