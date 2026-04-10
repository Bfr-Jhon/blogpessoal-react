import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import type Tema from "../../../models/Tema";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' });
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarTemaPorId(id: string) {
        try {
            setIsLoading(true);
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout();
        } finally {
            setIsLoading(false);
        }
    }

    async function buscarTemas() {
        try {
            setIsLoading(true);
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout();
        } finally {
            setIsLoading(false);
        }
    }

    async function buscarPostagemPorId(id: string) {
        try {
            setIsLoading(true);
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) handleLogout();
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "info");
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();
        if (id !== undefined) buscarPostagemPorId(id);
    }, [id]);

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        });
    }, [tema]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id !== undefined) {
                await atualizar('/postagens', postagem, setPostagem, {
                    headers: { Authorization: token }
                });
                ToastAlerta('Postagem atualizada com sucesso!', "sucesso");
            } else {
                await cadastrar('/postagens', postagem, setPostagem, {
                    headers: { Authorization: token }
                });
                ToastAlerta('Postagem cadastrada com sucesso!', "sucesso");
            }
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                ToastAlerta('Erro ao salvar a Postagem!', "erro");
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{ background: "#1E1F29" }}>

            <div className="w-full max-w-xl p-6 rounded-2xl"
                style={{
                    background: "#282A36",
                    border: "1px solid #44475A",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.4)"
                }}>

                <h1 className="text-2xl font-semibold text-center mb-6"
                    style={{ color: "#F8F8F2" }}>
                    {id === undefined ? "Cadastrar Postagem JO" : "Editar Postagem JO"}
                </h1>

                <button
                    onClick={retornar}
                    className="w-full mb-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                    style={{
                        background: "#44475A",
                        color: "#F8F8F2"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#6272A4"}
                    onMouseLeave={e => e.currentTarget.style.background = "#44475A"}
                >
                    Voltar
                </button>

                <form className="flex flex-col gap-4" onSubmit={gerarNovaPostagem}>

                    <input
                        type="text"
                        placeholder="Título da postagem"
                        name='titulo'
                        className="px-4 py-2 rounded-lg text-sm outline-none"
                        style={{
                            background: "#1E1F29",
                            border: "1px solid #44475A",
                            color: "#F8F8F2"
                        }}
                        value={postagem.titulo}
                        onChange={atualizarEstado}
                        onFocus={e => e.currentTarget.style.boxShadow = "0 0 8px #BD93F9"}
                        onBlur={e => e.currentTarget.style.boxShadow = "none"}
                    />

                    <select
                        name='tema'
                        className="px-4 py-2 rounded-lg text-sm outline-none"
                        style={{
                            background: "#1E1F29",
                            border: "1px solid #44475A",
                            color: "#F8F8F2"
                        }}
                        value={tema.id === 0 ? '' : tema.id}
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                    >
                        <option value="" disabled>Selecione um tema</option>
                        {temas.map((t) => (
                            <option key={t.id} value={t.id}>{t.descricao}</option>
                        ))}
                    </select>

                    <textarea
                        placeholder="Escreva sua postagem..."
                        name='texto'
                        className="px-4 py-2 rounded-lg text-sm h-40 resize-none outline-none"
                        style={{
                            background: "#1E1F29",
                            border: "1px solid #44475A",
                            color: "#F8F8F2"
                        }}
                        value={postagem.texto}
                        onChange={atualizarEstado}
                        onFocus={e => e.currentTarget.style.boxShadow = "0 0 8px #FF79C6"}
                        onBlur={e => e.currentTarget.style.boxShadow = "none"}
                    />

                    <button
                        type='submit'
                        className='w-full py-2 rounded-lg text-sm font-semibold flex justify-center transition-all duration-300'
                        style={{
                            background: carregandoTema ? "#44475A" : "#FF79C6",
                            color: "#1E1F29"
                        }}
                        disabled={carregandoTema}
                        onMouseEnter={e => {
                            if (!carregandoTema) {
                                e.currentTarget.style.boxShadow = "0 0 12px #FF79C6";
                            }
                        }}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                    >
                        {isLoading
                            ? <ClipLoader color="#1E1F29" size={20} />
                            : (id === undefined ? 'Cadastrar' : 'Atualizar')}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default FormPostagem;