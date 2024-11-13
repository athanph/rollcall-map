import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Container from "./components/Container";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Container>
      <Sidebar />
      <Main />
      <ToastContainer className="text-xs" />
    </Container>
  );
};

export default App;
