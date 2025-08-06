import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const userStorage = localStorage.getItem("user_db");

    if (userToken && userStorage) {
      const hasUser = JSON.parse(userStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser?.length) setUser(hasUser[0]);
    }
  }, []);

  const signIn = (email, password) => {
    const userStorage = JSON.parse(localStorage.getItem("user_db"));
    const hasUser = userStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({
          email,
          token,
        });
        return; // Login bem-sucedido
      } else {
        return "Usuário ou senha inválidos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signUp = (email, password) => {
    const userStorage = JSON.parse(localStorage.getItem("user_db"));
    const hasUser = userStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      alert("Usuário já cadastrado");
      return;
    }

    let newUser;

    if (userStorage) {
      newUser = [...userStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("user_db", JSON.stringify(newUser));
    return;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
