import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./routes";
import store from "../store/store";

const App: React.FC = () => {
    return (
      <Provider store={store}>
        <Router>
          <RoutesConfig />
        </Router>
      </Provider>
    );
  };
  
  export default App;