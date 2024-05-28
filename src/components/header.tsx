import { useLocation, useNavigate } from "react-router-dom";

const headerRoutes = [
  {
    path: "/",
    title: "마켓",
  },
  {
    path: "/bookmark",
    title: "북마크",
  },
];
const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header
      id="header"
      className="z-[9999] px-2 bg-black fixed top-0 left-0 w-full border-b border-zinc-400"
    >
      <div className="max-w-7xl flex flex-row mx-auto items-center">
        <h1
          className="cursor-pointer"
          id="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="/korbit_logo.jpg" className="w-[100px]" alt="korbit_logo" />
        </h1>

        <div className="ml-4 flex flex-row space-x-2">
          {headerRoutes.map((route, idx) => (
            <button
              key={route.path}
              onClick={() => {
                navigate(route.path);
              }}
              className="px-4 py-2 transition duration-200 rounded-lg hover:bg-zinc-800"
            >
              <p
                className={`${
                  location.pathname === route.path
                    ? "text-white"
                    : "text-zinc-400"
                }`}
              >
                {route.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
