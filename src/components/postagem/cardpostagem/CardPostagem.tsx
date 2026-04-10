import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
            style={{
                background: "#282A36",
                border: "1px solid #44475A",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
            }}
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(189,147,249,0.25)"
                e.currentTarget.style.transform = "translateY(-4px)"
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)"
                e.currentTarget.style.transform = "translateY(0)"
            }}
        >
                
            <div className="flex flex-col flex-1">
                
                <div className="flex w-full py-3 px-4 items-center gap-3"
                    style={{ borderBottom: "1px solid #44475A" }}>
                    
                    <img
                        src={postagem.usuario?.foto}
                        className="w-14 h-14 rounded-full object-cover"
                        alt={postagem.usuario?.nome}
                        style={{ border: "2px solid #FF79C6" }}
                    />

                    <h3 className="text-sm font-medium"
                        style={{ color: "#F8F8F2" }}>
                        {postagem.usuario?.nome}
                    </h3>
                </div>

                <div className="p-4 flex flex-col gap-3 flex-1">
                    
                    <div className="flex flex-col gap-1">
                        
                        <h4 className="text-base font-semibold"
                            style={{ color: "#BD93F9" }}>
                            {postagem.titulo}
                        </h4>

                        <p className="text-xs" style={{ color: "#6272A4" }}>
                            {new Intl.DateTimeFormat("pt-BR", {
                                dateStyle: 'short',
                                timeStyle: 'short',
                            }).format(new Date(postagem.data))}
                        </p>

                    </div>

                    <p className="text-sm leading-relaxed flex-1"
                        style={{ color: "#E6E6FA" }}>
                        {postagem.texto}
                    </p>

                    <div className="mt-auto pt-2"
                        style={{ borderTop: "1px solid #44475A" }}>
                        
                        <span className="text-xs font-medium px-3 py-1 rounded-full"
                            style={{
                                background: "rgba(255,121,198,0.1)",
                                color: "#FF79C6",
                                border: "1px solid rgba(255,121,198,0.3)",
                                maxWidth: "65%",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "inline-block"
                            }}>
                            # {postagem.tema?.descricao}
                        </span>

                    </div>
                </div>
            </div>

            <div className="flex"
                style={{ borderTop: "1px solid #44475A" }}>
                
                <Link to={`/editarpostagem/${postagem.id}`}
                    className="w-full flex items-center justify-center py-2 text-xs font-medium transition-all duration-300"
                    style={{
                        color: "#50FA7B",
                        background: "rgba(80,250,123,0.05)"
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(80,250,123,0.15)"
                        e.currentTarget.style.textShadow = "0 0 6px #50FA7B"
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(80,250,123,0.05)"
                        e.currentTarget.style.textShadow = "none"
                    }}>
                    Editar
                </Link>

                <Link to={`/deletarpostagem/${postagem.id}`}
                    className="w-full flex items-center justify-center py-2 text-xs font-medium transition-all duration-300"
                    style={{
                        color: "#FF5555",
                        background: "rgba(255,85,85,0.05)",
                        borderLeft: "1px solid #44475A"
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(255,85,85,0.15)"
                        e.currentTarget.style.textShadow = "0 0 6px #FF5555"
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(255,85,85,0.05)"
                        e.currentTarget.style.textShadow = "none"
                    }}>
                    Deletar
                </Link>

            </div>
        </div>
    )
}

export default CardPostagem