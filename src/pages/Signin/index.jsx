import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as C from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (email, password) => {
    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    const response = signIn(email, password);
    if (response) {
      setError(response);
      return;
    }

    navigate("/home");
  };

  return (
    <C.Container>
      <C.Content>
        <C.Label>Entrar</C.Label>
        <Input
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Digite sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <C.LabelError>{error}</C.LabelError>}
        <Button
          Text="Entrar"
          onClick={() => {
            handleLogin(email, password);
          }}
        />
        <C.LabelSignup>
          Não tem uma conta?{" "}
          <C.Strong>
            <Link to="/signup">Cadastre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;
