import React from "react";
import searchIcon from '../../imgs/icons/search-solid.png';
import logoutIcon from '../../imgs/icons/log-out.svg';
import '../global.css';
import './style.css';

function Home() {
    return (
        <section className="home-body">
            <header>
                <p className="brand"><span>E</span>nergy <span>F</span>inder</p>
                <div className="username-div">
                    <p className="username-label">Olá usuário!</p>
                    <img src={logoutIcon} />
                </div>

            </header>

            <section className="home-container">
                <div className="search-box">
                    <p className="search-provider-label"><span>B</span>uscar <span>f</span>ornecedores</p>
                    <p className="kwh-label">Informe a quantidade de KwH</p>
                    <div className="input-search-row">
                        <input type="text" placeholder="Ex: 3000" />
                        <button><img src={searchIcon} height="25" width="25" /></button>
                    </div>
                    <div className="providers-list">
                        <div className="card">
                            <p className="provider-name">Enel <span>SP</span></p>
                            <p className="provider-average">
                                <b>Limite mínimo de Kwh:</b> 300 kwh
                            </p>
                            <p className="provider-average">
                                <b>Avaliação média:</b> 5.0
                            </p>
                            <p className="provider-clients">
                                <b>Total de clientes:</b> 50</p>
                            <div className="price-div">
                                <h1 className="provider-price">Preço:</h1>
                                <p className="provider-price"><b>R$</b> 200,00 / <span>Kwh</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Home;