import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import useWindowSize from "@/hooks/useWindowsSize";
import useUser from "../store/userUser";
import { useField } from "@/store/useField";

export default function Welcome() {
  //states
  const [isWelcome, setIsWelcome] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const { createAccount } = useUser();
  const username = useField({
    type: "text",
    required: true,
    placeholder: "Username",
  });
  const password = useField({
    type: "text",
    required: true,
    placeholder: "Password",
  });
  const confirmPassword = useField({
    type: "text",
    required: true,
    placeholder: "Confirm Password",
  });
  const size = useWindowSize();

  //callbacks
  const handleGetStarted = () => {
    setIsWelcome(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {!isWelcome ? (
        <div
          className={`rounded shadow-lg p-5 ${
            size.width <= 990 ? "w-100" : "w-50"
          }`}
        >
          <h1 className="text-center mb-4 h1-gradient">ToDo App</h1>
          <Button
            onClick={() => setIsLogin(true)}
            style={
              isLogin
                ? {
                    background: "rgb(245, 245, 245)",
                    color: "rgb(235, 51, 72)",
                  }
                : {
                    background:
                      "linear-gradient(72deg, rgba(235, 51, 72, 1) 0%, rgba(241, 81, 68, 1) 100%)",
                  }
            }
            className={`me-3 ${isLogin && "shadow"}`}
          >
            Login
          </Button>
          <Button
            onClick={() => setIsLogin(false)}
            style={
              !isLogin
                ? {
                    background: "rgb(245, 245, 245)",
                    color: "rgb(235, 51, 72)",
                  }
                : {
                    background:
                      "linear-gradient(72deg, rgba(235, 51, 72, 1) 0%, rgba(241, 81, 68, 1) 100%)",
                  }
            }
            className={`me-3 ${!isLogin && "shadow"}`}
          >
            Create Account
          </Button>
          {isLogin ? (
            <motion.div
              key="login"
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
              <h3 className="mt-4 text-left">Welcome</h3>
              <p>Good to see you again</p>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control {...username} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control {...password} />
                </Form.Group>
                <div className="w-100 d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="w-75"
                    onClick={() =>
                      createAccount({
                        username: username.value,
                        password: password.value,
                      })
                    }
                  >
                    Login
                  </Button>
                </div>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="signin"
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
              <h3 className="mt-4">Create Account</h3>
              <p>Get started now!</p>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control {...username} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control {...password} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control {...confirmPassword} />
                </Form.Group>
                <div className="w-100 d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="w-75"
                    onClick={() =>
                      createAccount({
                        username: username.value,
                        password: password.value,
                      })
                    }
                  >
                    Create Account
                  </Button>
                </div>
              </Form>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="text-center w-50">
          <h1 className="h1-gradient">
            <b>ToDo App</b>
          </h1>
          <p>
            An App where you can keep a life style organized, creating notes and
            task list that always help you to never forget something.
          </p>
          <Button className="shadow" onClick={() => handleGetStarted()}>
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
}
