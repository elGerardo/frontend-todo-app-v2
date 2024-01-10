import { useField } from "@/hooks/useField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Form, Button, Dropdown } from "react-bootstrap";
import {
  faChevronLeft,
  faNoteSticky,
  faListDots,
  faPlus,
  faEllipsisVertical,
  faTrash,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTask } from "@/store/useTask";
import { useUser } from "@/store/userUser";
import { useRouter } from "next/router";

const COLOR_OPTIONS = [
  "#FF9492",
  "#FFB18A",
  "#FFCE7F",
  "#FFFE91",
  "#97FE93",
  "#04FDC9",
  "#4CCEE4",
  "#6AAEFF",
  "#AF92FF",
  "#FF9DFF",
  "#FFC8FF",
  "#C4B2FE",
];

export default function DeatilCreate() {
  const router = useRouter();
  const [isNote, setIsNote] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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

  const [listFieldErrors, setListFieldErrors] = useState([]);

  const { user, find } = useUser();
  const { store, tasks, errors } = useTask();
  const [currentIndicator, setCurrentIndicator] = useState(0);

  const [listFields, setListFields] = useState([]);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [isSelectingColor, setIsSelectingColor] = useState(false);

  const handleListFielOnChange = (field, value, indexItem) => {
    const currentListFields = [...listFields];
    currentListFields[indexItem][field]["value"] = value;
    setListFields(currentListFields);
  };

  const handleFinish = async (type) => {
    if (type === "note") {
      await store(
        {
          title: title.value,
          description: description.value,
          type,
          color: selectedColor,
        },
        tasks,
        user.access
      );
      return;
    }

    const steps = [];
    let order = 1;
    const listErors = [];
    let hasErrors = false;

    for (let index = 0; index < listFields.length; index++) {
      steps[index] = {
        order,
        title: listFields[index]["title"]["value"],
        description:
          listFields[index]["title"]["description"] !== undefined
            ? listFields[index]["title"]["description"]
            : "N/A",
        color: selectedColor,
      };
      order++;

      if (listFields[index]["title"]["value"] === "") {
        listErors.push("Pleas Fill up this field");
        hasErrors = true;
        continue;
      }
      listErors.push("");
    }

    if (hasErrors) {
      setListFieldErrors(listErors);
      return;
    } else {
      setListFieldErrors([]);
    }

    await store(
      {
        type,
        title: title.value,
        description: description.value !== "" ? description.value : "N/A",
        color: selectedColor,
        steps,
      },
      tasks,
      user.access
    );
  };

  const handleAddListField = () => {
    const currentListFields = [...listFields];
    currentListFields.push({
      index: currentIndicator,
      order: currentIndicator + 1,
      title: {
        required: true,
        placeholder: "Enter title",
        type: "text",
        value: "",
      },
      description: {
        required: true,
        placeholder: "Enter description",
        as: "textarea",
        value: "",
      },
    });

    setListFields(currentListFields);
    setCurrentIndicator(currentIndicator + 1);
  };

  const handleIsSelectingColor = () => {
    setIsSelectingColor(!isSelectingColor);
  };

  const handleSelectedColor = (color) => {
    setIsSelectingColor(false);
    setSelectedColor(color);
  };

  const handleDeleteListField = (position) => {
    const currentListFields = [...listFields];
    const newData = currentListFields.filter((_, index) => index !== position);
    setListFields(newData);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const from = source.index;
    const to = destination.index;

    const newData = listFields;

    const dataFrom = newData[from - 1];

    const newTo = to - 1;
    const newFrom = from - 1;
    if (to > from) {
      for (let index = newFrom; index < newTo; index++) {
        newData[index] = listFields[index + 1];
      }

      newData[to - 1] = { ...dataFrom, order: to };
    } else {
      for (let index = newFrom; index !== newTo; index--) {
        newData[index] = listFields[index - 1];
      }

      newData[to - 1] = { ...dataFrom, order: from };
    }

    setListFields(newData);
  };

  useEffect(() => {
    async function checkSession() {
      if (user === null) {
        let session = localStorage.getItem(
          process.env.NEXT_PUBLIC_SESSION_STORAGE
        );
        if (session === null) {
          router.push("/");
          return;
        }
        session = JSON.parse(
          localStorage.getItem(process.env.NEXT_PUBLIC_SESSION_STORAGE)
        );

        const result = await find({
          access: session.access,
          user_id: session.user.id,
        });

        if (result !== null && result !== false) {
          localStorage.removeItem(process.env.NEXT_PUBLIC_SESSION_STORAGE);
          router.push("/");
          return;
        }
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }
    checkSession();
  }, []);

  return (
    !isLoading && (
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
                <FontAwesomeIcon icon={faChevronLeft} size="xl" className="" />
              </Link>
              <h2 className="ms-3">
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
            <div className="d-flex justify-content-between">
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
              <Dropdown
                className="p-1"
                onClick={() => handleIsSelectingColor()}
              >
                <Dropdown.Toggle className="btn-secondary text-gray rounded px-2 py-1">
                  <FontAwesomeIcon
                    icon={faCircle}
                    size="xl"
                    className="align-middle"
                    style={{ color: selectedColor, borderColor: "none" }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className={`shadow-lg flex ${
                    isSelectingColor ? "d-block" : "d-none"
                  }`}
                >
                  <div className="d-flex justify-content-center flex-wrap">
                    {COLOR_OPTIONS.map((item, index) => {
                      return (
                        <div
                          key={`${index}-${item}`}
                          className="color-option rounded mx-1 my-1"
                          style={{ backgroundColor: item }}
                          onClick={() => handleSelectedColor(item)}
                        />
                      );
                    })}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control {...title} />
                {errors !== null && (
                  <p className="text-danger">{errors["title"]}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control {...description} />
                {errors !== null && (
                  <p className="text-danger">{errors["description"]}</p>
                )}
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
                    onClick={() => handleFinish("note")}
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
                      onClick={() => handleFinish("list")}
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
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="listFieldDroppable">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {listFields.map((item, index) => {
                            return (
                              <Draggable
                                key={`${item.index}-${item.type}`}
                                draggableId={`${item.index}-${item.type}`}
                                index={index + 1}
                              >
                                {(provided) => (
                                  <div
                                    key={index}
                                    className="d-flex"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
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
                                        <Button
                                          className="px-2 py-1 m-0"
                                          onClick={() =>
                                            handleDeleteListField(index)
                                          }
                                        >
                                          <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                      </div>
                                    </div>
                                    <Form.Group className="w-100 mb-3">
                                      <Form.Control
                                        className="rounded mb-2"
                                        {...item.title}
                                        onChange={(event) =>
                                          handleListFielOnChange(
                                            "title",
                                            event.target.value,
                                            index
                                          )
                                        }
                                      />
                                      <p className="text-danger">
                                        {listFieldErrors[index]}
                                      </p>
                                      <Form.Control
                                        className="rounded"
                                        {...item.description}
                                        onChange={(event) =>
                                          handleListFielOnChange(
                                            "description",
                                            event.target.value,
                                            index
                                          )
                                        }
                                      />
                                    </Form.Group>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </motion.div>
              )}
            </Form>
          </div>
        </div>
      </motion.div>
    )
  );
}
