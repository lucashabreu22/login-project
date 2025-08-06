import { useNavigate } from "react-router-dom";
import * as C from "./styles";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <C.Container>
      <C.Content>
        <C.Label>Bem-vindo à Home</C.Label>
        <Button
          Text="Sair"
          onClick={() => {
            signOut();
            navigate("/");
          }}
        />
      </C.Content>
    </C.Container>
  );
};

export default Home;
