import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../imgs/icons/search-solid.png';
import logoutIcon from '../../imgs/icons/log-out.svg';
import api from "../../utils/api";
import Swal from 'sweetalert2'
import '../global.css';
import './style.css';

function Home() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('@dataUser'));
    const data = new Date();
    const hours = data.getHours();

    const [userName, setUserName] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [providers, setProviders] = useState([]);
    const [kwh, setKwh] = useState('');
    const [notFoundMsg, setNotFoundMsg] = useState('Nada por enquanto... Faça uma pesquisa!');
    const [welcomeMessage, setWelcomeMessage] = useState('Olá');

    const checkDayPeriod = function () {
        if (hours >= 6 && hours < 12) {
            setWelcomeMessage('Bom dia');
        } else if (hours >= 12 && hours < 18) {
            setWelcomeMessage('Boa tarde');
        } else {
            setWelcomeMessage('Boa noite');
        }
    }

    const checkAuth = function () {
        if (!token) {
            logout();
        } else {
            setUserName(userData.userName);
        }
    }

    const logout = function () {
        localStorage.removeItem('@dataUser');
        localStorage.removeItem('token');
        navigate('/');
    }

    const alertLogout = function () {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Ao clicar em sim você realizará logout...",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        })
    }

    const alertToken = function () {
        Swal.fire({
            title: 'Sua sessão expirou!',
            text: "Deseja se autenticar novamente?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        })
    }

    const getProviders = async function (event) {
        event.preventDefault();

        try {
            const { data } = await api.get(`/provider/${kwh}`, {
                headers: {
                    'x-access-token': token
                }
            });

            if (data.data.length > 0) {
                setProviders(data.data);
            } else {
                setProviders([]);
                setNotFoundMsg('Nenhum fornecedor encontrado para a sua demanda :(');
            }
        } catch (error) {
            console.error(error);
            if (error.response.status == 401) {
                alertToken();
            }
        }
    }

    useEffect(() => {
        checkAuth();
        checkDayPeriod();
    }, []);

    return (
        <section className="home-body">
            <header>
                <p className="brand"><span>E</span>nergy <span>F</span>inder</p>
                <div className="username-div">
                    <p className="username-label">{welcomeMessage}, {userName}</p>
                    <img src={logoutIcon} onClick={() => alertLogout()} />
                </div>
            </header>

            <section className="home-container">
                <div className="search-box">
                    <p className="search-provider-label"><span>B</span>uscar <span>f</span>ornecedores</p>
                    <p className="kwh-label">Informe a sua demanda mensal de energia (em KwH):</p>
                    <form className="input-search-form" onSubmit={e => getProviders(e)}>
                        <input type="text" required placeholder="Ex: 3000" onChange={e => setKwh(e.target.value)} />
                        <button type="submit"><img src={searchIcon} height="25" width="25" /></button>
                    </form>
                    <div className="providers-list">
                        {providers.map((provider) =>
                            <div className="card" key={provider.providerId}>
                                <div className="name-and-logo-row">
                                    <p className="provider-name">{provider.providerName} <span>{provider.providerUf}</span></p>
                                    <img src={provider.providerLogo} alt="" />
                                </div>
                                <p className="provider-average">
                                    <b>Limite mínimo de Kwh:</b> {provider.providerKwhLimit}
                                </p>
                                <p className="provider-average">
                                    <b>Avaliação média:</b> {provider.providerAverageRating}
                                </p>
                                <p className="provider-clients">
                                    <b>Total de clientes:</b> {provider.providerClientsTotal}</p>
                                <div className="price-div">
                                    <h1 className="provider-price">Preço:</h1>
                                    <p className="provider-price"><b>R$</b> {provider.providerKwhPrice} / <span>Kwh</span></p>
                                </div>
                            </div>
                        )}
                    </div>
                    {providers.length < 1 &&
                        <div className="not-found-providers">
                            <p>{notFoundMsg}</p>
                        </div>
                    }
                </div>
            </section>
        </section>
    )
}

export default Home;