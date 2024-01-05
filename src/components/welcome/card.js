import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, ProgressBar } from "react-bootstrap";

export default function Card({ text }) {
  return (
    <div className="bg-white shadow-sm rounded m-3">
      <div className="d-flex justify-content-between p-1">
        <p className="p-2">Title</p>
        <Dropdown className="p-1">
          <Dropdown.Toggle className="btn-secondary text-gray rounded px-2 py-1">
            <FontAwesomeIcon
              icon={faEllipsis}
              size="xl"
              className="align-middle"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className="shadow-lg">
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="p-3">
        <p>
          {text.substring(0, 250)}
          {text.length > 250 && <span>...</span>}
        </p>
        <ProgressBar className={`mt-4`} now={75} label={`${75}%`} />
      </div>
    </div>
  );
}
