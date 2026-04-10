import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className="flex flex-col rounded-xl overflow-hidden justify-between"
            style={{
                backgroundColor: "#282A36",
                border: "0.5px solid rgba(255,255,255,0.08)"
            }}>

            <div className="py-2 px-4"
                style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                <span className="text-xs font-medium"
                    style={{ color: "#BD93F9" }}>
                    Tema
                </span>
            </div>

            <p className="p-6 text-base font-medium"
                style={{ color: "#F8F8F2" }}>
                {tema.descricao}
            </p>

            <div className="flex"
                style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
                <Link to={`/editartema/${tema.id}`}
                    className="w-full flex items-center justify-center py-2 text-xs font-medium transition-all duration-200"
                    style={{ color: "#FF79C6", backgroundColor: "rgba(255,121,198,0.08)" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,121,198,0.18)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,121,198,0.08)")}>
                    Editar
                </Link>
                <Link to={`/deletartema/${tema.id}`}
                    className="w-full flex items-center justify-center py-2 text-xs font-medium transition-all duration-200"
                    style={{
                        color: "#FF5555",
                        backgroundColor: "rgba(255,85,85,0.08)",
                        borderLeft: "0.5px solid rgba(255,255,255,0.06)"
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,85,85,0.18)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,85,85,0.08)")}>
                    Deletar
                </Link>
            </div>
        </div>
    )
}

export default CardTema