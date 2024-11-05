import "./App.css";
import { AppLayout } from "./components/layout/layout";
import { FruitDashboard } from "./Fruits/FruitDashboard";

function App() {
  return (
    <AppLayout>
      <FruitDashboard />
    </AppLayout>
  );
}

export default App;
