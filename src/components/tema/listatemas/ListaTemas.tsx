import { useNavigate } from "react-router-dom";
import CardTema from "../cardtema/CardTema"
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [temas, setTemas] = useState<Tema[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "info");
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarTemas();
    }, [temas.length])

    async function buscarTemas() {
        try {

            setIsLoading(true);

            await buscar('/temas', setTemas, {
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

    return (
        <>
            {isLoading && (
                <div className="flex justify-center w-full py-8"
                    style={{ backgroundColor: "#282A36" }}>
                    <SyncLoader color="#FF79C6" size={12} />
                </div>
            )}

            <div className="flex justify-center w-full py-8"
                style={{ backgroundColor: "#282A36" }}>
                <div className="container flex flex-col">

                    {(!isLoading && temas.length === 0) && (
                        <span className="text-3xl text-center my-8"
                            style={{ color: "#F8F8F2" }}>
                            Nenhum Tema foi encontrado!
                        </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                        {
                            temas.map((tema) => (
                                <CardTema key={tema.id} tema={tema} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaTemas;