import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();
    const { handleLogout, usuario } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'sucesso')
        navigate("/")
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className="w-full flex justify-center px-8"
                style={{
                    background: "linear-gradient(180deg, #282A36, #1E1F29)",
                    borderBottom: "1px solid #44475A",
                    height: "60px",
                }}>

                <div className="container flex justify-between items-center">
                    
                    <Link to="/home"
                        className="text-lg font-semibold"
                        style={{
                            color: "#F8F8F2",
                            letterSpacing: "-0.03em"
                        }}>
                        Blog <span style={{ color: "#FF79C6" }}>JO</span>
                    </Link>

                    <div className="flex gap-6 text-sm">

                        <Link to='/postagens'
                            style={{ color: "#6272A4", transition: "0.3s" }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = "#FF79C6"
                                e.currentTarget.style.textShadow = "0 0 6px #FF79C6"
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = "#6272A4"
                                e.currentTarget.style.textShadow = "none"
                            }}>
                            Postagens
                        </Link>

                        <Link to='/temas'
                            style={{ color: "#6272A4", transition: "0.3s" }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = "#BD93F9"
                                e.currentTarget.style.textShadow = "0 0 6px #BD93F9"
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = "#6272A4"
                                e.currentTarget.style.textShadow = "none"
                            }}>
                            Temas
                        </Link>

                        <Link to='/cadastrartema'
                            style={{ color: "#6272A4", transition: "0.3s" }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = "#50FA7B"
                                e.currentTarget.style.textShadow = "0 0 6px #50FA7B"
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = "#6272A4"
                                e.currentTarget.style.textShadow = "none"
                            }}>
                            Cadastrar tema
                        </Link>

                        <Link to='/perfil'
                            style={{
                                color: "#F8F8F2",
                                textShadow: "0 0 4px rgba(255,255,255,0.3)"
                            }}>
                            Perfil
                        </Link>

                        <Link to=''
                            onClick={logout}
                            style={{ color: "#FF5555", transition: "0.3s" }}
                            onMouseEnter={e => {
                                e.currentTarget.style.textShadow = "0 0 6px #FF5555"
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.textShadow = "none"
                            }}>
                            Sair
                        </Link>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Navbar