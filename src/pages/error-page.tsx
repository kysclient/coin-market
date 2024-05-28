import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  return (
    <div
      id="error-page"
      className="container mx-auto flex items-center justify-center flex-col space-y-5 my-auto h-screen"
    >
      <h1 className="font-bold text-3xl">이런!</h1>
      <p>죄송합니다. 예상치 못한 오류가 발생했습니다.</p>
      <p className="text-gray-500">
        <i>{error?.statusText || error?.message}</i>
      </p>

      <button
        onClick={() => {
          navigate("/");
        }}
        className="px-4 py-2 text-main-accent text-xl"
      >
        홈으로
      </button>
    </div>
  );
};

export default ErrorPage;
