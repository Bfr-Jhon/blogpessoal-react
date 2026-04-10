import { type ChangeEvent, type SyntheticEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Usuario from "../../models/Usuario"
import { atualizar, buscar } from "../../services/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"


function AtualizarPerfil() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [user, setUser] = useState<Usuario>({} as Usuario)
    const [confirmarSenha, setConfirmarSenha] = useState<string>("")

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const id: string = usuario.id.toString()

    async function buscarUsuarioPorId() {
        try {
            await buscar(`/usuarios/${id}`, setUser, {
                headers: {
                    Authorization: token,
                },
            })

            setUser((user) => ({ ...user, senha: "" }))
            setConfirmarSenha("")

        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            } else {
                ToastAlerta("Usuário não encontrado!", "erro")
                retornar()
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info")
            navigate("/")
        }
    }, [token])

    useEffect(() => {
        setUser({} as Usuario)
        setConfirmarSenha("")
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (id !== undefined) {
            buscarUsuarioPorId()
        }
    }, [id])

    function retornar() {
        navigate("/perfil")
    }

    function sucesso() {
        handleLogout()
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function atualizarUsuario(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (confirmarSenha === user.senha && user.senha.length >= 8) {
            try {
                await atualizar(`/usuarios/atualizar`, user, setUser, {
                    headers: {
                        Authorization: token,
                    },
                })
                ToastAlerta("Usuário atualizado! Efetue o Login Novamente!", "sucesso")
                sucesso()
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar o usuário!", "erro")
                    retornar()
                }
            }
        } else {
            ToastAlerta("Dados inconsistentes. Verifique as informações do usuário.", "erro")
            setUser({ ...user, senha: "" })
            setConfirmarSenha("")
        }

        setIsLoading(false)
    }

    const inputClass = "px-4 py-2 rounded-lg text-sm w-full focus:outline-none focus:ring-1"
    const inputStyle = {
        backgroundColor: "#282A36",
        border: "1px solid rgba(248,248,242,0.12)",
        color: "#F8F8F2",
        // @ts-ignore
        "--tw-ring-color": "#FF79C6",
    }
    const labelClass = "text-sm font-medium mb-1"
    const labelStyle = { color: "#BD93F9" }


    return (
        <div className="min-h-screen py-12 px-4 flex items-center justify-center"
            style={{ backgroundColor: "#282A36" }}
        >
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: "#1E1F29", border: "1px solid rgba(248,248,242,0.08)" }}
            >

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
                    {/* Seção da foto */}
                    <div className="flex flex-col items-center justify-center p-10"
                        style={{ borderRight: "1px solid rgba(248,248,242,0.08)" }}>
                        <img
                            src={user.foto}
                            alt={user.nome}
                            className="w-36 h-36 rounded-full object-cover"
                            style={{ border: "3px solid #FF79C6" }}
                        />
                        <h2 className="mt-5 text-lg font-semibold text-center"
                            style={{ color: "#F8F8F2" }}>
                            {user.nome}
                        </h2>
                        <p className="text-sm mt-1 text-center"
                            style={{ color: "#6272A4" }}>
                            {user.usuario}
                        </p>
                    </div>

                    {/* Seção do formulário */}
                    <div className="p-8 lg:p-12">
                        <h1 className="text-2xl font-semibold text-center mb-6"
                            style={{ color: "#F8F8F2" }}>
                            Editar Perfil
                        </h1>

                        <form onSubmit={atualizarUsuario} className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="nome" className={labelClass} style={labelStyle}>
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    placeholder="Nome"
                                    className={inputClass}
                                    style={inputStyle}
                                    value={user.nome || ""}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="usuario" className={labelClass} style={labelStyle}>
                                    Usuário
                                </label>
                                <input
                                    type="email"
                                    id="usuario"
                                    name="usuario"
                                    placeholder="Usuario"
                                    className={inputClass}
                                    style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }}
                                    disabled
                                    value={user.usuario || ""}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="foto" className={labelClass} style={labelStyle}>
                                    Foto
                                </label>
                                <input
                                    type="url"
                                    id="foto"
                                    name="foto"
                                    placeholder="Foto"
                                    className={inputClass}
                                    style={inputStyle}
                                    value={user.foto || ""}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="senha" className={labelClass} style={labelStyle}>
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="senha"
                                    name="senha"
                                    placeholder="Senha"
                                    className={inputClass}
                                    style={inputStyle}
                                    value={user.senha || ""}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    required
                                    minLength={8}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="confirmarSenha" className={labelClass} style={labelStyle}>
                                    Confirmar Senha
                                </label>
                                <input
                                    type="password"
                                    id="confirmarSenha"
                                    name="confirmarSenha"
                                    placeholder="Confirmar Senha"
                                    className={inputClass}
                                    style={inputStyle}
                                    value={confirmarSenha}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                                    required
                                    minLength={8}
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    className="w-1/2 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                                    style={{ backgroundColor: "#FF5555", color: "#282A36" }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                                    onClick={retornar}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="w-1/2 py-2 rounded-lg text-sm font-semibold flex justify-center transition-all duration-200"
                                    style={{ backgroundColor: "#FF79C6", color: "#282A36" }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <ClipLoader color="#282A36" size={20} /> : "Atualizar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AtualizarPerfil