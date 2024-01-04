import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/detail/create");
  };

  return (
    <div className="d-flex justify-content-between mt-5">
      <h2>Good Afternoon</h2>
      <div>
        <FontAwesomeIcon
          icon={faPlus}
          onClick={() => handleCreate()}
          size="xl"
          className="align-middle me-3 text-gray"
        />
        <FontAwesomeIcon
          icon={faEllipsis}
          size="xl"
          className="align-middle text-gray"
        />
      </div>
    </div>
  );
}
