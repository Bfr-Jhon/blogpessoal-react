import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Postagem from "../../models/Postagem"
import { buscar } from "../../services/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"
import { Player } from '@lottiefiles/react-lottie-player'
import bloggingAnimation from '../../assets/Blogging.json'

function Home() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagens, setPostagens] = useState<Postagem[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "info")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    async function buscarPostagens() {
        try {
            setIsLoading(true)

            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Hero */}
            <div style={{ backgroundColor: "#282A36" }}>
                <div className="container mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Esquerda */}
                    <div className="flex flex-col gap-4 justify-center">
                        <span className="text-xs w-fit px-3 py-1 rounded-full"
                            style={{
                                backgroundColor: "rgba(189,147,249,0.15)",
                                color: "#BD93F9",
                                border: "0.5px solid rgba(189,147,249,0.3)"
                            }}>
                            Plataforma de publicação
                        </span>

                        <h2 className="text-4xl font-medium leading-tight"
                            style={{ color: "#F8F8F2", letterSpacing: "-0.02em" }}>
                            Escreva.<br />
                            <span style={{ color: "#FF79C6" }}>Compartilhe.</span><br />
                            Conecte.
                        </h2>

                        <p className="text-sm"
                            style={{ color: "#6272A4", maxWidth: "300px", lineHeight: "1.6" }}>
                            Um espaço para desenvolvedores publicarem ideias, reflexões e aprendizados.
                        </p>

                        <div className="mt-2">
                            <ModalPostagem />
                        </div>
                    </div>

                    {/* Direita */}
                    <div className="hidden md:flex items-center justify-center">
                        <Player
                            autoplay
                            loop
                            src={bloggingAnimation}
                            style={{ width: '100%', maxWidth: '520px' }}
                        />
                    </div>

                </div>
            </div>

            {/* Divisor */}
            <div
                style={{
                    borderTop: "0.5px solid rgba(248,248,242,0.08)",
                    backgroundColor: "#282A36"
                }}
            />

            {/* Lista de postagens */}
            <ListaPostagens postagens={postagens} isLoading={isLoading} />
        </>
    )
}

export default Home