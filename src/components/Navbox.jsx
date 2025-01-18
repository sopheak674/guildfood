import { Link } from "react-router-dom";

const Nav = ({ title, link }) => {
  return (
    <Link to={link} className="flex-shrink-0 px-4 py-2 bg-green-700 rounded-full text-center text-white text-sm font-medium hover:bg-green-500 mx-2"
    >
      <p className="flex items-center text-center text-white text-l font-bold ">
        {title}
      </p>
    </Link>
  );
};

export default Nav;
