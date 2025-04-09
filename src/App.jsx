import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faSun } from "@fortawesome/free-solid-svg-icons";
// import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import PureComponent from "./components/dashboard";

export const App = () => {
  const [activeBtn, setActiveBtn] = useState("dashboard");
  return (
    <>
      <div className="container">
        <div className="header">
          <h1>
            Balance<span>Fy</span>
          </h1>
          <div className="header_right">
            <FontAwesomeIcon className="theme" icon={faSun} color="#FAE41A" />
            <button className="report">
              <FontAwesomeIcon icon={faFile} />
              Relatório
            </button>
          </div>
        </div>
        <div className="btn-main">
          <button
            className={activeBtn === "dashboard" ? "active" : ""}
            onClick={() => setActiveBtn("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={activeBtn === "historico" ? "active" : ""}
            onClick={() => setActiveBtn("historico")}
          >
            Histórico de Transições
          </button>
        </div>

        <div className="wallet">
          <div id="balance" className="wallet-category">
            <h2>
              Seu saldo <FontAwesomeIcon icon={faWallet} />
            </h2>
            <p>R$ 1.000,00</p>
          </div>
          <div id="balance" className="wallet-category">
            <h2>
              Receita Mensal <FontAwesomeIcon icon={faWallet} />
            </h2>
            <p>R$ 1.000,00</p>
          </div>
          <div id="balance" className="wallet-category">
            <h2>
              Despesa Mensal
              <FontAwesomeIcon icon={faWallet} />
            </h2>
            <p>R$ 1.000,00</p>
          </div>
        </div>

        <main className="container-main">
          <PureComponent className="dashboard" />

          <div className="form">
            <form action="" className="new_transaction_form">
              <h2>Adicionar Transações</h2>

              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Ex: Salário, Uber, Netflix..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="value">Valor</label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  placeholder="Digite o valor da transação"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select id="category" name="category" required>
                  <option value="">Selecione...</option>
                  <option value="alimentacao">Alimentação</option>
                  <option value="fixos">Fixos</option>
                  <option value="lazer">Lazer</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <button type="submit" className="btn-submit">
                Adicionar
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
