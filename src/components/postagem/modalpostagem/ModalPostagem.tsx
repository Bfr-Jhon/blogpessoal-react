import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormPostagem from '../formpostagem/FormPostagem';


function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <button
                        className="px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                        style={{ backgroundColor: "#FF79C6", color: "#282A36" }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                        Nova Postagem
                    </button>
                }
                modal
                contentStyle={{
                    backgroundColor: '#282A36',
                    border: '0.5px solid rgba(255,255,255,0.08)',
                    borderRadius: '1rem',
                    paddingBottom: '2rem',
                    overflowY: 'auto',
                    maxHeight: '85vh',
                    width: '50%',
                }}
            >
                <FormPostagem />
            </Popup>
        </>
    )
}

export default ModalPostagem;