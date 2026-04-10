import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    const { id } = useParams<{ id: string }>()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { 'Authorization': token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: { 'Authorization': token }
            })

            ToastAlerta('Postagem apagada com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar a postagem', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{ background: "#1E1F29" }}>

            <h1 className="text-2xl font-semibold text-center mb-2"
                style={{ color: "#F8F8F2" }}>
                Deletar Postagem
            </h1>

            <p className="text-sm text-center mb-6"
                style={{ color: "#6272A4" }}>
                Tem certeza que deseja apagar essa postagem?
            </p>

            <div className="w-full max-w-sm rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                    background: "#282A36",
                    border: "1px solid #44475A",
                    boxShadow: "0 4px 25px rgba(0,0,0,0.3)"
                }}>

                <div className="flex w-full py-3 px-4 items-center gap-3"
                    style={{ borderBottom: "1px solid #44475A" }}>
                    
                    <img
                        src={postagem.usuario?.foto}
                        className="w-9 h-9 rounded-full object-cover"
                        alt={postagem.usuario?.nome}
                        style={{ border: "2px solid #FF79C6" }}
                    />

                    <h3 className="text-sm font-medium"
                        style={{ color: "#F8F8F2" }}>
                        {postagem.usuario?.nome}
                    </h3>
                </div>

                <div className="p-4 flex flex-col gap-2">
                    
                    <h4 className="text-sm font-semibold"
                        style={{ color: "#BD93F9" }}>
                        {postagem.titulo}
                    </h4>

                    <p className="text-xs leading-relaxed"
                        style={{ color: "#E6E6FA" }}>
                        {postagem.texto}
                    </p>

                </div>

                <div className="flex"
                    style={{ borderTop: "1px solid #44475A" }}>
                    
                    <button
                        className="w-full py-2 text-xs font-medium transition-all duration-300"
                        style={{
                            color: "#FF5555",
                            background: "rgba(255,85,85,0.05)"
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(255,85,85,0.15)"
                            e.currentTarget.style.textShadow = "0 0 6px #FF5555"
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "rgba(255,85,85,0.05)"
                            e.currentTarget.style.textShadow = "none"
                        }}
                        onClick={retornar}>
                        Não
                    </button>

                    <button
                        className="w-full py-2 text-xs font-medium flex items-center justify-center transition-all duration-300"
                        style={{
                            color: "#50FA7B",
                            background: "rgba(80,250,123,0.05)",
                            borderLeft: "1px solid #44475A"
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(80,250,123,0.15)"
                            e.currentTarget.style.textShadow = "0 0 6px #50FA7B"
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "rgba(80,250,123,0.05)"
                            e.currentTarget.style.textShadow = "none"
                        }}
                        onClick={deletarPostagem}>
                        {isLoading ? <ClipLoader color="#50FA7B" size={16} /> : "Sim"}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem