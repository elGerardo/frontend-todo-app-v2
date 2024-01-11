import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, ProgressBar } from "react-bootstrap";
import Check from "../shared/check";

export default function Card({
  id,
  title,
  text,
  progress,
  totalTasks,
  onDelete,
  steps,
  onChangeStep,
}) {
  const handleOnDelete = (task_id) => {
    onDelete(task_id);
  };

  const handleOnCompletedItem = (id, next_id) => {
    setTimeout(() => {
      if (next_id !== undefined) {
        const currentElement = document.getElementById(id);
        currentElement.style.marginTop = "-50px";

        const nextElement = document.getElementById(next_id);
        nextElement.style.marginTop = "0px";
      }
    }, 250);
  };

  let marginTop = 50;

  return (
    <div className="bg-white shadow-sm rounded m-3">
      <div className="d-flex justify-content-between p-1">
        <h5 className="p-2">{title}</h5>
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
            <Dropdown.Item onClick={() => handleOnDelete(id)}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="p-3">
        <p>
          {text.substring(0, 250)}
          {text.length > 250 && <span>...</span>}
        </p>
        {steps.length > 0 && (
          <div className="ov-hidden">
            {steps.map(({ id, title, description }, index) => {
              return (
                <div
                  key={id}
                  id={id}
                  style={{ marginTop: `${marginTop * index}px` }}
                  className="d-flex"
                >
                  <div className="d-flex justify-content-center mx-3">
                    {/*<Form.Check
                      className="check-primary"
                      type={"radio"}
                      onChange={() =>
                        handleOnCompletedItem(
                          id,
                          steps[index + 1] !== undefined
                            ? steps[index + 1]["id"]
                            : undefined
                        )
                      }
                    />*/}
                    <Check
                      isFinished={false}
                      onClick={() =>
                        handleOnCompletedItem(
                          id,
                          steps[index + 1] !== undefined
                            ? steps[index + 1]["id"]
                            : undefined,
                          index
                        )
                      }
                    />
                  </div>
                  <div>
                    <p className="fw-bold m-0">{title}</p>
                    {description !== null && (
                      <p className="text-gray m-0">{description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
