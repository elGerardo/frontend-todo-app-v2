import { useField } from "@/hooks/useField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Form, Button } from "react-bootstrap";
import {
  faChevronLeft,
  faNoteSticky,
  faListDots,
  faPlus,
  faEllipsisH,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DeatilCreate() {
  const [isNote, setIsNote] = useState(true);

  const title = useField({
    type: "text",
    required: true,
    placeholder: "Enter title",
  });

  const description = useField({
    required: true,
    placeholder: "Description",
    as: "textarea",
  });

  const [listFields, setListFields] = useState([]);

  const handleListFielOnChange = (index, value, indexItem) => {
    const currentListFields = [...listFields];
    currentListFields[index][indexItem].value = value;
    setListFields(currentListFields);
  };

  const handleFinishList = () => {};

  const handleAddListField = () => {
    const currentListFields = [...listFields];
    currentListFields.push([
      {
        required: true,
        placeholder: "Enter title",
        type: "text",
        value: "",
      },
      {
        required: true,
        placeholder: "Enter description",
        as: "textarea",
        value: "",
      },
    ]);
    setListFields(currentListFields);
  };

  useEffect(() => {}, [listFields]);

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
          <div className="d-flex">
            <Link href="/welcome" className="pt-1 text-black align-middle">
              <FontAwesomeIcon
                icon={faChevronLeft}
                size="xl"
                className="align-middle"
              />
            </Link>
            <h2 className="align-middle ms-3">
              <span>Create</span>
              {isNote ? (
                <motion.div
                  className="ms-1 d-inline-block"
                  key="isNote"
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
                  <span>Note</span>
                </motion.div>
              ) : (
                <motion.div
                  className="ms-1 d-inline-block"
                  key="isList"
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
                  <span>List</span>
                </motion.div>
              )}
            </h2>
          </div>
          <div>
            <Button
              variant="none"
              className={!isNote ? "btn-primary" : "btn-light"}
              onClick={() => setIsNote(true)}
            >
              <FontAwesomeIcon icon={faNoteSticky} />
            </Button>
            <Button
              variant="none"
              className={
                isNote ? "btn-primary ms-3 my-2" : "btn-light ms-3 my-2"
              }
              onClick={() => setIsNote(false)}
            >
              <FontAwesomeIcon icon={faListDots} />
            </Button>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control {...title} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control {...description} />
            </Form.Group>
            {isNote && (
              <motion.div
                key="isNote"
                initial={{ opacity: 0, x: 25 }}
                transition={{ x: { duration: 0.2 } }}
                animate={{
                  x: 0,
                  opacity: 1,

                  transition: {
                    duration: 0.2,
                    delay: 0.2,
                  },
                }}
                exit={{ opacity: 0, x: -25 }}
              >
                <Button
                  variant="primary"
                  className="mb-3"
                  onClick={() => handleFinishList()}
                >
                  Finish
                </Button>
              </motion.div>
            )}
            {!isNote && (
              <motion.div
                key="isList"
                initial={{ opacity: 0, x: 25 }}
                transition={{ x: { duration: 0.2 } }}
                animate={{
                  x: 0,
                  opacity: 1,

                  transition: {
                    duration: 0.2,
                    delay: 0.2,
                  },
                }}
                exit={{ opacity: 0, x: -25 }}
              >
                <div className="d-flex">
                  <Button
                    variant="primary"
                    className="mb-3"
                    onClick={() => handleFinishList()}
                    disabled={listFields.length === 0 ? true : false}
                  >
                    Finish
                  </Button>
                  <Button
                    variant="primary ms-3"
                    className="mb-3"
                    onClick={() => handleAddListField()}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>
                {listFields.map((item, index) => {
                  return (
                    <div key={index} className="d-flex">
                      <div
                        style={{ width: "75px" }}
                        className="d-flex flex-column align-items-center"
                      >
                        <div className="mt-4 p-2 text-gray cursor-pointer">
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            size="xl"
                          />
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className="mx-1"
                            size="xl"
                          />
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            size="xl"
                          />
                        </div>
                        <div className="mt-3">
                          <Button className="px-2 py-1 m-0">
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </div>
                      </div>
                      <Form.Group className="w-100 mb-3">
                        <Form.Control
                          className="rounded mb-2"
                          {...item[0]}
                          onChange={(event) =>
                            handleListFielOnChange(index, event.target.value, 0)
                          }
                        />
                        <Form.Control
                          className="rounded"
                          {...item[1]}
                          onChange={(event) =>
                            handleListFielOnChange(index, event.target.value, 1)
                          }
                        />
                      </Form.Group>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
