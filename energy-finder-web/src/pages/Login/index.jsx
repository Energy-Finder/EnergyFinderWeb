import React, { useEffect, useState } from "react";
import './style.css';
import '../global.css';
import api from "../../utils/api";

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [loginOrRegisterLabel, setLoginOrRegisterLabel] = useState('Realizar Login');
    const [loginOrRegisterBtn, setLoginOrRegisterBtn] = useState('Entrar');
    const [loginOrRegisterSecondBtn, setLoginOrRegisterSecondBtn] = useState('Não possuo cadastro');

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    useEffect(() => {
        if (isRegister) {
            setLoginOrRegisterLabel('Realizar Cadastro');
            setLoginOrRegisterBtn('Cadastrar');
            setLoginOrRegisterSecondBtn('Já possuo cadastro');
        } else {
            setLoginOrRegisterLabel('Realizar Login');
            setLoginOrRegisterBtn('Entrar');
            setLoginOrRegisterSecondBtn('Não possuo cadastro');
        }
    }, [isRegister]);

    const auth = async function (event) {
        event.preventDefault();
        try {
            const { data } = await api.get(`/user/auth/${userEmail}/${userPassword}`);

            if (data.auth) {
                localStorage.setItem('@dataUser', JSON.stringify(data));
                console.log(data);
                alert('logado!');
            } else {
                alert('Erro na autenticação');
            }
        } catch (error) {
            console.error(error.response.data);
            alert(error.response.status);
        }
    }

    const register = async function (event) {
        event.preventDefault();

        const userJson = {
            username: userName,
            email: userEmail,
            password: userPassword
        }

        try {
            const { data } = await api.post('/user', userJson);
            if (data.success) {
                alert('criado!');
                setIsRegister(false);
            }
        } catch (error) {
            console.error(error.response.data);
            alert(error.response.status);
        }
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
                    <form className="inputs" onSubmit={e => isRegister ? register(e) : auth(e) }>
                        <p>{loginOrRegisterLabel}</p>
                        {isRegister && <input type="text" required placeholder="Nome" onChange={e => setUserName(e.target.value)} />}
                        <input type="email" required placeholder="Email" onChange={e => setUserEmail(e.target.value)} />
                        <input type="password" required placeholder="Senha" onChange={e => setUserPassword(e.target.value)} />
                        <button type="submit"> {loginOrRegisterBtn} </button>
                        <p onClick={() => setIsRegister(!isRegister)}>{loginOrRegisterSecondBtn}</p>
                    </form>
                </div>
            </section>
        </section>
    )
}

export default Login;