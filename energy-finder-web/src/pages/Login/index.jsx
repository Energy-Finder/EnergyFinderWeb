import React, { useEffect, useState } from "react";
import './style.css';
import '../global.css';
import api from "../../utils/api";

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [loginOrRegisterLabel, setLoginOrRegisterLabel] = useState('Realizar Login');
    const [loginOrRegisterBtn, setLoginOrRegisterBtn] = useState('Não possuo cadastro');

    const[userEmail, setUserEmail] = useState('');
    const[userPassword, setUserPassword] = useState('');

    useEffect(() => {
        if (isRegister) {
            setLoginOrRegisterLabel('Realizar Cadastro');
            setLoginOrRegisterBtn('Já tenho cadastro');
        } else {
            setLoginOrRegisterLabel('Realizar Login');
            setLoginOrRegisterBtn('Não tenho cadastro');
        }
    }, [isRegister]);

    const auth = async function () {
        const { data } = await api.get(`/user/auth/${userEmail}/${userPassword}`);
        console.log(data);
    }

    return (
        <section>
            <section className="canva-side">
                <p>Fornecedor de energia ideal? só com o
                    <span className="brand-span">
                        <span> E</span>nergy <span>F</span>inder
                    </span>.
                </p>
            </section>
            <section className="form-side">
                <div className="form">
                    <p className="brand"><span>E</span>nergy <span>F</span>inder</p>
                    <div className="inputs">
                        <p>{loginOrRegisterLabel}</p>
                        {isRegister && <input type="text" placeholder="Nome" />}
                        <input type="text" placeholder="Email" onChange={e => setUserEmail(e.target.value)}/>
                        <input type="text" placeholder="Senha" onChange={e => setUserPassword(e.target.value)}/>
                        {!isRegister && <button onClick={() => auth()}> Entrar </button>}
                        {isRegister && <button> Cadastrar </button>}
                        <p onClick={() => setIsRegister(!isRegister)}>{loginOrRegisterBtn}</p>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Login;