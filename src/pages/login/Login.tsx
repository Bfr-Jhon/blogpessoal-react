import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

function Login() {

  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: ""
  });

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home")
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    handleLogin(usuarioLogin)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#282A36" }}>

      <div className="w-full max-w-sm rounded-2xl p-12 flex flex-col gap-5"
        style={{
          backgroundColor: "#1E1F29",
          border: "0.5px solid rgba(248,248,242,0.08)"
        }}>

        {/* Logo */}
        <div className="text-center mb-2">
          <p className="text-lg font-medium" style={{ color: "#F8F8F2", letterSpacing: "-0.03em" }}>
            Blog <span style={{ color: "#FF79C6" }}></span>
          </p>
          <p className="text-xs mt-1" style={{ color: "#6272A4" }}>Seja bem-vindo(a) de volta</p>
        </div>

        <form onSubmit={login} className="flex flex-col gap-5">

          <div className="flex flex-col gap-1">
            <label htmlFor="usuario" className="text-xs font-medium" style={{ color: "#BD93F9" }}>
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="seu@email.com"
              className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
              style={{
                backgroundColor: "#282A36",
                border: "1px solid rgba(248,248,242,0.12)",
                color: "#F8F8F2"
              }}
              value={usuarioLogin.usuario}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="senha" className="text-xs font-medium" style={{ color: "#BD93F9" }}>
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="••••••••"
              className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
              style={{
                backgroundColor: "#282A36",
                border: "1px solid rgba(248,248,242,0.12)",
                color: "#F8F8F2"
              }}
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg text-sm font-semibold flex justify-center transition-all duration-200"
            style={{ backgroundColor: "#FF79C6", color: "#282A36" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            disabled={isLoading}>
            {isLoading ? <ClipLoader color="#282A36" size={20} /> : "Entrar"}
          </button>

        </form>

        <div className="text-center pt-2"
          style={{ borderTop: "0.5px solid rgba(248,248,242,0.08)" }}>
          <p className="text-xs" style={{ color: "#6272A4" }}>
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro" style={{ color: "#FF79C6" }}>
              Cadastre-se
            </Link>
          </p>
        </div>

      </div>
    </div>

  )
}

export default Login