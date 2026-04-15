import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { router } from "@/app/providers/router";
import { store } from "@/app/providers/store";

function App() {
  
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;