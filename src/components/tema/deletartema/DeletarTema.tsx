import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [tema, setTema] = useState<Tema>({} as Tema);

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarTemaPorId() {
        try {

            setIsLoading(true);

            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            });

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "info");
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId();
        }
    }, [id])

    function retornar() {
        navigate('/temas');
    }

    async function deletarTema() {

        setIsLoading(true);

        try {

            await deletar(`/temas/${id}`, {
                headers: { Authorization: token }
            });

            ToastAlerta('Tema deletado com sucesso!', "sucesso")

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }

        setIsLoading(false);
        retornar()

    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{ backgroundColor: "#282A36" }}>

            <h1 className="text-2xl font-semibold text-center mb-2"
                style={{ color: "#F8F8F2" }}>
                Deletar Tema
            </h1>
            <p className="text-sm text-center mb-6"
                style={{ color: "#6272A4" }}>
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>

            <div className="w-full max-w-sm rounded-xl overflow-hidden"
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
                    <button
                        className="w-full py-2 text-xs font-medium transition-all duration-200"
                        style={{ color: "#FF5555", backgroundColor: "rgba(255,85,85,0.08)" }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,85,85,0.18)")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,85,85,0.08)")}
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className="w-full py-2 text-xs font-medium flex items-center justify-center transition-all duration-200"
                        style={{
                            color: "#FF79C6",
                            backgroundColor: "rgba(255,121,198,0.08)",
                            borderLeft: "0.5px solid rgba(255,255,255,0.06)"
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,121,198,0.18)")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,121,198,0.08)")}
                        onClick={deletarTema}>
                        {isLoading ? <ClipLoader color="#FF79C6" size={16} /> : "Sim"}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema