import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './style.css';
import '../global.css';
import api from "../../utils/api";

function Login() {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [loginOrRegisterLabel, setLoginOrRegisterLabel] = useState('Realizar Login');
    const [loginOrRegisterBtn, setLoginOrRegisterBtn] = useState('Entrar');
    const [loginOrRegisterSecondBtn, setLoginOrRegisterSecondBtn] = useState('Não possuo cadastro');

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

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


    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = function () {
        if (token) {
            navigate('/home');
        }
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const auth = async function (event) {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.get(`/user/auth/${userEmail}/${userPassword}`);
            if (data.auth) {
                localStorage.setItem('@dataUser', JSON.stringify(data.data[0]));
                localStorage.setItem('token', data.token);
                navigate('/home');
            } else {
                setAlertMessage('Erro ao gerar token de autenticação');
            }
        } catch (error) {
            console.error(error.response.status);
            if (error.response.status = 404) {
                setAlertMessage('Usuário não encontrado');
            } else {
                setAlertMessage('Erro ao realizar login');
            }
        }
        setLoading(false);
        setOpenAlert(true);
    }

    const register = async function (event) {
        event.preventDefault();
        setLoading(true);
        const userJson = {
            username: userName,
            email: userEmail,
            password: userPassword
        }

        try {
            const { data } = await api.post('/user', userJson);
            if (data.success) {
                setAlertMessage('Cadastrado com sucesso!');
                setIsRegister(false);
            }
        } catch (error) {
            console.error(error.response);
            setAlertMessage('Erro ao realizar cadastro');
        }
        setLoading(false);
        setOpenAlert(true);
    }

    return (
        <>
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
                        <form className="inputs" onSubmit={e => isRegister ? register(e) : auth(e)}>
                            <p>{loginOrRegisterLabel}</p>
                            {isRegister && <input type="text" required placeholder="Nome" onChange={e => setUserName(e.target.value)} />}
                            <input type="email" required placeholder="Email" onChange={e => setUserEmail(e.target.value)} />
                            <input type="password" required placeholder="Senha" onChange={e => setUserPassword(e.target.value)} />
                            {!loading &&
                                <>
                                    <button type="submit"> {loginOrRegisterBtn} </button>
                                    <p onClick={() => setIsRegister(!isRegister)}>{loginOrRegisterSecondBtn}</p>
                                </>
                            }
                            {loading &&
                                <div className="loader"></div>
                            }
                        </form>
                    </div>
                </section>

            </section>
            <Snackbar open={openAlert}
                autoHideDuration={6000}
                onClose={() => setOpenAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={() => setOpenAlert(false)} severity={alertMessage.includes('sucesso') ? 'success' : 'error'}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Login;