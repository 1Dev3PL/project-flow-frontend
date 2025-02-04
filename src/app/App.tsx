import "./App.css";
import { AppRouter } from "./router";
import { Providers } from "./providers";

function App() {
  return (
    <>
      <Providers>
        <AppRouter />
      </Providers>
    </>
  );
}

export default App;
