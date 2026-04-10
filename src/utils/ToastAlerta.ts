import { toast } from 'react-toastify';

const toastConfig = {
    position: 'top-right' as const,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    style: {
        backgroundColor: "#13101E", // mais profundo (Dracula base)
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "0.75rem",
        color: "#E8EAF0",
        fontSize: "13px",
        boxShadow: "0 0 10px rgba(196,132,154,0.15)" // leve glow neon
    }
}

export function ToastAlerta(mensagem: string, tipo: string) {
    switch (tipo) {
        case 'sucesso':
            toast.success(mensagem, {
                ...toastConfig,
                style: {
                    ...toastConfig.style,
                    borderLeft: "3px solid #C4849A",
                }
            });
            break;

        case 'erro':
            toast.error(mensagem, {
                ...toastConfig,
                style: {
                    ...toastConfig.style,
                    borderLeft: "3px solid #E07070",
                }
            });
            break;

        case 'info':
        default:
            toast.info(mensagem, {
                ...toastConfig,
                style: {
                    ...toastConfig.style,
                    borderLeft: "3px solid #7C8FD4",
                }
            });
            break;
    }
}