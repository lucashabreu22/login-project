import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as C from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signUp } = useAuth();
  const navigete = useNavigate();

  const handleSignup = (email, emailConfirm, password) => {
    if (!email || !emailConfirm || !password) {
      setError("Preencha todos os campos");
      return;
    }
    if (email !== emailConfirm) {
      setError("Os emails não coincidem");
      return;
    }

    const response = signUp(email, password);
    if (response) {
      setError(response);
      return;
    }

    alert("Cadastro realizado com sucesso!");
    navigete("/home");
  };

  return (
    <C.Container>
      <C.Content>
        <C.Label>Cadastrar</C.Label>
        <Input
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Confirme seu email"
          type="email"
          value={emailConfirm}
          onChange={(e) => setEmailConfirm(e.target.value)}
        />
        <Input
          placeholder="Digite sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <C.LabelError>{error}</C.LabelError>}
        <Button
          Text="Cadastrar"
          onClick={() => {
            handleSignup(email, emailConfirm, password);
          }}
        />
        <C.LabelSignin>
          Já tem uma conta?{" "}
          <C.Strong>
            <Link to="/signin">Entrar</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
