import { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import useWindowSize from "@/hooks/useWindowsSize";
import { useUser } from "../store/userUser";
import { useField } from "@/hooks/useField";
import { useRouter } from "next/router";

export default function Welcome() {
  //states
  const router = useRouter();
  const [isWelcome, setIsWelcome] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState("");
  const { createAccount, login, user, errors } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const loginUsername = useField({
    type: "text",
    required: true,
    placeholder: "Username",
  });
  const loginPassword = useField({
    type: "password",
    required: true,
    placeholder: "Password",
  });

  const createUsername = useField({
    type: "text",
    required: true,
    placeholder: "Username",
  });
  const createPassword = useField({
    type: "password",
    required: true,
    placeholder: "Password",
  });
  const createConfirmPassword = useField({
    type: "password",
    required: true,
    placeholder: "Confirm Password",
  });
  const size = useWindowSize();

  //callbacks
  const handleGetStarted = () => {
    setIsWelcome(false);
  };

  const handleCreateAccount = async () => {
    setIsProcessing(true);
    await createAccount({
      username: createUsername.value,
      password: createPassword.value,
      confirm_password: createConfirmPassword.value,
    });
  };

  const handleLogin = async () => {
    setIsProcessing(true)
    await login({
      username: loginUsername.value,
      password: loginPassword.value,
    });
  };

  useEffect(() => {
    const session = localStorage.getItem(
      process.env.NEXT_PUBLIC_SESSION_STORAGE
    );
    if (session !== null) {
      router.push("/welcome");
    } else {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (errors !== null) setLoginError(errors.message);
  }, [errors]);

  useEffect(() => {
    async function login() {
      if (user !== null && user !== undefined) {
        router.push("/welcome");
      }
    }
    login();
  }, [user]);

  return (
    !isLoading && (
      <div className="d-flex justify-content-center align-items-center vh-100">
        {!isWelcome ? (
          <div className={`p-5 ${size.width <= 990 ? "w-100" : "w-50"}`}>
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
              className={`me-3  ${isLogin && ""}`}
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
              className={`me-3 ${!isLogin && ""}`}
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
                <p>Good to see you again!</p>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control {...loginUsername} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control {...loginPassword} />
                  </Form.Group>
                  <p className="text-danger">{loginError}</p>
                  <div className="w-100 d-flex justify-content-center">
                    {!isProcessing ? (
                      <Button
                        variant="primary"
                        className="w-75 shadow"
                        onClick={() => handleLogin()}
                      >
                        Login
                      </Button>
                    ) : (
                      <div className="loading">
                        <Spinner animation="border" variant="secondary" />
                      </div>
                    )}
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
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Control {...createUsername} />
                    <p className="text-danger">{errors?.username}</p>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Control {...createPassword} />
                    <p className="text-danger">{errors?.password}</p>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="confirm_password">
                    <Form.Control {...createConfirmPassword} />
                    <p className="text-danger">{errors?.confirm_password}</p>
                  </Form.Group>
                  <div className="w-100 d-flex justify-content-center">
                    {!isProcessing ? (
                      <Button
                        variant="primary"
                        className="w-75 shadow"
                        onClick={() => handleCreateAccount()}
                      >
                        Create Account
                      </Button>
                    ) : (
                      <div className="loading">
                        <Spinner animation="border" variant="secondary" />
                      </div>
                    )}
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
              An App where you can keep a life style organized, creating notes
              and task list that always help you to never forget something.
            </p>
            <Button className="shadow" onClick={() => handleGetStarted()}>
              Get Started
            </Button>
          </div>
        )}
      </div>
    )
  );
}
