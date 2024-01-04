import { useField } from "@/hooks/useField";
import { motion } from "framer-motion";
import { Form } from "react-bootstrap";

export default function DeatilCreate() {
  const title = useField({
    type: "text",
    required: true,
    placeholder: "Enter title",
  });

  return (
    <motion.div
      key="detailCreate"
      initial={{ opacity: 0, x: 25 }}
      transition={{ x: { duration: 0.2 } }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.2,
        },
      }}
      exit={{ opacity: 0, x: -25 }}
    >
      <div className="mt-5">
        <div style={{ maxWidth: "700px" }} className="m-0 m-auto">
          <h2>Create</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control {...title} />
            </Form.Group>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
