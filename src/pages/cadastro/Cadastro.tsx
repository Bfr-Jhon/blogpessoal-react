import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar()
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario)
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")

      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro")
      }

    } else {
      ToastAlerta("Dados do usuário inconsistentes!", "info")
      setUsuario({
        ...usuario,
        senha: ""
      })
      setConfirmarSenha("")
    }
    setIsLoading(false)
  }

  function retornar() {
    navigate("/")
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-12"
        style={{ backgroundColor: "#282A36" }}>
        <div className="w-full max-w-sm rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#44475A",
            border: "1px solid rgba(255,255,255,0.08)"
          }}>

          <div className="p-10 flex flex-col gap-5">

            <div className="text-center mb-2">
              <p className="text-lg font-medium" style={{ color: "#F8F8F2", letterSpacing: "-0.03em" }}>
                Blog <span style={{ color: "#FF79C6" }}>JO</span>
              </p>
              <p className="text-xs mt-1" style={{ color: "#6272A4" }}>Crie sua conta</p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={cadastrarNovoUsuario}>
              <div className="flex flex-col gap-1">
                <label htmlFor="nome" className="text-xs font-medium" style={{ color: "#BD93F9" }}>
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Nome"
                  className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                  style={{ backgroundColor: "#282A36", border: "1px solid #6272A4", color: "#F8F8F2" }}
                  value={usuario.nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="usuario" className="text-xs font-medium" style={{ color: "#BD93F9" }}>
                  Usuario
                </label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Usuario"
                  className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                  style={{ backgroundColor: "#282A36", border: "1px solid #6272A4", color: "#F8F8F2" }}
                  value={usuario.usuario}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="foto" className="text-xs font-medium" style={{ color: "#BD93F9" }}>
                  Foto
                </label>
                <input
                  type="text"
                  id="foto"
                  name="foto"
                  placeholder="Foto"
                  className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                  style={{ backgroundColor: "#282A36", border: "1px solid #6272A4", color: "#F8F8F2" }}
                  value={usuario.foto}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
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
                  placeholder="Senha"
                  className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                  style={{ backgroundColor: "#282A36", border: "1px solid #6272A4", color: "#F8F8F2" }}
                  value={usuario.senha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="confirmarSenha" className="text-xs font-medium" style={{ color: "#BD93F9" }}>
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  placeholder="Confirmar Senha"
                  className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                  style={{ backgroundColor: "#282A36", border: "1px solid #6272A4", color: "#F8F8F2" }}
                  value={confirmarSenha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="reset"
                  className="w-1/2 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{ backgroundColor: "#FF5555", color: "#F8F8F2" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  onClick={retornar}>
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-lg text-sm font-semibold flex justify-center transition-all duration-200"
                  style={{ backgroundColor: "#FF79C6", color: "#282A36" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  disabled={isLoading}>
                  {isLoading ? <ClipLoader color="#282A36" size={20} /> : "Cadastrar"}
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default Cadastro;