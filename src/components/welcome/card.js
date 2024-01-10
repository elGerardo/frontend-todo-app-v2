import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, ProgressBar } from "react-bootstrap";

export default function Card({ id, title, text, progress, totalTasks, onDelete }) {
  const handleOnDelete = (task_id) => {
    onDelete(task_id)
  }
  
  return (
    <div className="bg-white shadow-sm rounded m-3">
      <div className="d-flex justify-content-between p-1">
        <p className="p-2">{title}</p>
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
            <Dropdown.Item onClick={() => handleOnDelete(id)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="p-3">
        <p>
          {text.substring(0, 250)}
          {text.length > 250 && <span>...</span>}
        </p>
        {progress !== undefined && totalTasks !== undefined && (
          <ProgressBar
            className={`mt-4`}
            now={(progress / totalTasks) * 100}
            label={`${((progress / totalTasks) * 100).toFixed(0)} %`}
          />
        )}
      </div>
    </div>
  );
}
