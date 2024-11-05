import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { AppLayout } from "./components/layout/layout";
import { FruitDashboard } from "./Fruits/FruitDashboard";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AppLayout>
      <FruitDashboard />
      <ToastContainer stacked />
    </AppLayout>
  );
}

export default App;
