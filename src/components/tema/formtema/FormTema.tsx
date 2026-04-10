import { useState, useContext, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {

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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoTema(e: SyntheticEvent<HTMLFormElement>) {

        e.preventDefault();

        setIsLoading(true);

        if (id !== undefined) {

            try {

                await atualizar('/temas', tema, setTema, {
                    headers: { Authorization: token }
                });

                ToastAlerta('Tema atualizado com sucesso!', "sucesso")

            } catch (error: any) {

                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao Atualizar o Tema!', "erro");
                }
            }

        } else {

            try {

                await cadastrar('/temas', tema, setTema, {
                    headers: { Authorization: token }
                });

                ToastAlerta('Tema cadastrado com sucesso!', "sucesso")

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao Cadastrar o Tema!', "erro");
                }
            }

        }

        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate('/temas');
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{ backgroundColor: "#282A36" }}>
            <h1 className="text-2xl font-semibold text-center mb-6"
                style={{ color: "#F8F8F2" }}>
                {id === undefined ? "Cadastrar" : "Editar"} Tema
            </h1>

            <form className="w-full max-w-sm flex flex-col gap-4"
                onSubmit={gerarNovoTema}
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="descricao" className="text-xs font-medium"
                        style={{ color: "#6272A4" }}>
                        Descrição do Tema
                    </label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="px-4 py-2 rounded-lg text-sm w-full focus:outline-none"
                        style={{ backgroundColor: "#44475A", border: "1px solid rgba(255,255,255,0.15)", color: "#F8F8F2" }}
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="w-full py-2 rounded-lg text-sm font-semibold flex justify-center transition-all duration-200"
                    style={{ backgroundColor: "#FF79C6", color: "#282A36" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    type="submit">
                    {isLoading ? <ClipLoader color="#282A36" size={20} /> : (id === undefined ? "Cadastrar" : "Atualizar")}
                </button>
            </form>
        </div>
    );
}

export default FormTema;