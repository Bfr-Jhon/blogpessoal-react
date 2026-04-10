import { EnvelopeIcon, GithubLogoIcon, LinkedinLogoIcon, GlobeIcon } from "@phosphor-icons/react"
import { AuthContext } from "../../contexts/AuthContext"
import { useContext, type ReactNode } from "react"

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className="w-full flex justify-center px-8"
                style={{
                    background: "linear-gradient(180deg, #282A36, #1E1F29)",
                    borderTop: "1px solid #44475A",
                }}>
                <div className="container flex flex-col items-center py-6 gap-3">
                    
                    <p className="text-sm font-medium"
                        style={{ color: "#6272A4" }}>
                        Blog <span style={{ color: "#FF79C6" }}>Jo</span> · Desenvolvido por <span style={{ color: "#BD93F9" }}>Jhonatha</span> · © {data}
                    </p>

                    <div className="flex gap-5">
                        
                        <a href="https://www.linkedin.com/in/jhonatha-oliveira/" target="_blank" rel="noreferrer">
                            <LinkedinLogoIcon size={26} weight="bold"
                                style={{ color: "#6272A4", transition: "0.3s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#FF79C6")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#6272A4")} />
                        </a>

                        <a href="https://github.com/Bfr-Jhon" target="_blank" rel="noreferrer">
                            <GithubLogoIcon size={26} weight="bold"
                                style={{ color: "#6272A4", transition: "0.3s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#BD93F9")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#6272A4")} />
                        </a>

                        <a href="https://github.com/Bfr-Jhon/Portfolio" target="_blank" rel="noreferrer">
                            <GlobeIcon size={26} weight="bold"
                                style={{ color: "#6272A4", transition: "0.3s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#50FA7B")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#6272A4")} />
                        </a>

                        <a href="mailto:jhonathavinicius21@gmail.com">
                            <EnvelopeIcon size={26} weight="bold"
                                style={{ color: "#6272A4", transition: "0.3s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#FF5555")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#6272A4")} />
                        </a>

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

export default Footer