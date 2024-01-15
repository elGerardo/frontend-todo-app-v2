import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [message, setMessage] = useState("")

  const handleLogOut = () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_SESSION_STORAGE);
    window.location.href = ""
  };

  const handleGoCreate = () => {
    router.push("/detail/create");
  };

  useEffect(() => {
    const hour = new Date().getHours()
    if(hour < 12) {
      setMessage("Good Morning! 🌄") 
      return
    }

    if(hour > 12 && hour < 19) {
      setMessage("Good Afternoon! 🌤️") 
      return
    }

    setMessage("Good Night! 🌕")
  })

  return (
    <div className="d-flex justify-content-between mt-5">
      <h2>{message}</h2>
      <div className="d-flex align-items-center">
        <FontAwesomeIcon
          icon={faPlus}
          onClick={() => handleGoCreate()}
          size="xl"
          className="btn-gray text-gray cursor-pointer"
        />
        <div className="d-flex justify-content-between ">
          <Dropdown className="">
            <Dropdown.Toggle className="btn-gray text-gray">
              <FontAwesomeIcon icon={faEllipsis} size="xl" className="" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow-lg">
              <Dropdown.Item onClick={() => handleLogOut()}>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
