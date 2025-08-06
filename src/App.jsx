import { GlobalStyle } from "./styles/global";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
        <GlobalStyle />
      </AuthProvider>
    </>
  );
}

export default App;
