import Card from "@/components/welcome/card";
import Header from "@/components/welcome/header";
import { useField } from "@/hooks/useField";
import { Form, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/store/userUser";
import { useTask } from "@/store/useTask";

const STATUS_COMPLETED = "COMPLETED";

export default function Welcome() {
  const { user, find } = useUser();
  const { tasks, destroy, finishStep } = useTask();

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const search = useField({
    type: "text",
    required: false,
    placeholder: "Search...",
  });

  const handleOnDeleteTaks = async (task_id) => {
    await destroy(task_id, tasks, user.access);
  };

  const handleStepFinished = async (task_id, step_id) => {
    const task = tasks.find((task) => task.id === task_id);
    const step = task.steps.find((step) => step.id === step_id);

    await finishStep(
      task_id,
      step_id,
      {
        title: step.title,
        description: step.description,
        color: step.color,
        order: step.order,
        status: STATUS_COMPLETED,
      },
      user.access,
      tasks
    );
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
    !isLoading ? (
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
          <div style={{ maxWidth: "700px" }} className="w-100">
            <Header />
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control {...search} />
              </Form.Group>
            </Form>
            {tasks !== null &&
              tasks.map(({ id, description, title, type, steps, color }) => {
                const filteredSteps = steps.filter(
                  (step) => step.status !== STATUS_COMPLETED
                );
                return (
                  <Card
                    backgroundColor={color}
                    onDelete={handleOnDeleteTaks}
                    key={id}
                    id={id}
                    className="masonry-item"
                    text={description !== null ? description : ""}
                    title={title}
                    progress={
                      type === "list"
                        ? steps.filter(
                            ({ status }) => status === STATUS_COMPLETED
                          ).length
                        : undefined
                    }
                    steps={
                      type === "list"
                        ? filteredSteps.length === 0
                          ? [steps[steps.length - 1]]
                          : filteredSteps
                        : []
                    }
                    totalTasks={type === "list" ? steps.length : undefined}
                    onChangeStep={(step_id) => handleStepFinished(id, step_id)}
                  />
                );
              })}
          </div>
        </div>
      </motion.div>
    ) : <div className="loading text-center mt-5"><Spinner animation="border" variant="secondary"/></div>
  );
}
