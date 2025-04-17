import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faSun } from "@fortawesome/free-solid-svg-icons";
// import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import PureComponent from "./components/dashboard";

export const App = () => {
  const [activeBtn, setActiveBtn] = useState("dashboard");
  const [dataFomr, setDataForm] = useState({
    description: "",
    value: "",
    category: "",
    date: "",
    type: "",
  });
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [receitaMensal, setReceitaMensal] = useState(0); 
  const [despesaMensal, setDespesaMensal] = useState(0); 
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setSaldoTotal(calculateBalance());
    setReceitaMensal(calculateMonthlyIncomeBalance());
    setDespesaMensal(calculateMonthlyExpenseBalance());
  }, [transactions]);

  const handleChangeForm = (e) => {
    e.preventDefault();

    const form = e.target; //Form enviado

    const formData = new FormData(form); //Criando objeto FormData para manipular os dados do form

    const category = formData.get("category"); //Pego o valor do select
    const description = formData.get("description");
    const value = formData.get("value");
    const date = formData.get("date");
    const type = formData.get("type");

    if(!isDateInCurrentMonth(date)){
      alert("A data deve ser do mês atual.");
      return;
    }

    const newTransaction = {
      category,
      description,
      value: parseFloat(value),
      date,
      type,
    };

    setDataForm(newTransaction);

    setTransactions([...transactions, newTransaction]);
    
    form.reset(); //Limpo o form após o submit
  };

  const isDateInCurrentMonth = (date) => {
    const currentDate = new Date();
    const transactionDate = new Date(date);

    return (
      currentDate.getFullYear() === transactionDate.getFullYear() &&
      currentDate.getMonth() === transactionDate.getMonth()
    );
  }

  const getStartOfCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  }

  const getEndOfCurrentMonth = () => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${lastDay}`;
  };

  const calculateBalance = () => {
    const saldo = transactions.reduce((total, transaction) => {
      const valor = Number(transaction.value);
      if (transaction.type === "receita") {
        return total + valor;
      } else if (transaction.type === "despesa") {
        return total - valor;
      }
      return total;
    }, 0);
  
    return saldo;
  };

  const calculateMonthlyIncomeBalance = () => {
    const incomeMonthly = transactions.reduce((total, transaction) => {
      const saldo = Number(transaction.value);
      if(transaction.type === "receita" && isDateInCurrentMonth(transaction.date)){
        return total + saldo;
      }
      return total;
    }, 0);
    return incomeMonthly;
  }
  const calculateMonthlyExpenseBalance = () => {
    const expenseMonthly = transactions.reduce((total, transaction) => {
      const saldo = Number(transaction.value);
      if(transaction.type === "despesa" && isDateInCurrentMonth(transaction.date)){
        return total - saldo;
      }
      return total;
    }, 0);
    return expenseMonthly;
  }

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
          <button
            className={activeBtn === "edit-dash" ? "active" : ""}
            onClick={() => setActiveBtn("edit-dash")}
          >
            Editar Dashboard
          </button>
        </div>

        <div className="wallet">
          <div id="balance" className="wallet-category">
            <h2>
              Seu saldo <FontAwesomeIcon icon={faWallet} />
            </h2>
            <p>R$ {saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          </div>
          <div id="balance" className="wallet-category">
            <h2>
              Receita Mensal <FontAwesomeIcon icon={faWallet} />
            </h2>
            <p>R$ {receitaMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          </div>
          <div id="balance" className="wallet-category">
            <h2>
              Despesa Mensal
              <FontAwesomeIcon icon={faWallet} />
            </h2>
            <p>R$ {despesaMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          </div>
        </div>

        <main className="container-main">
          <PureComponent className="dashboard" />

          <div className="form">
            <form
              action=""
              className="new_transaction_form"
              onSubmit={handleChangeForm}
            >
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
                <label htmlFor="description">Data</label>
                <input type="date" id="date" name="date" min={getStartOfCurrentMonth()} max={getEndOfCurrentMonth()} required />
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

              <div className="form-group-categorys">
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

                <div className="form-group">
                  <label htmlFor="type">Tipo</label>
                  <select id="type" name="type" required>
                    <option value="">Selecione...</option>
                    <option value="despesa">Despesa</option>
                    <option value="receita">Receita</option>
                  </select>
                </div>
              </div>

              {/* <div className="form-group">
                <label htmlFor="add-category">Adicionar Categoria</label>
                <input type="text" placeholder="Digite o nome da Categoria" />
                <button type="submit" className="btn-category">Adicionar Categoria</button>
              </div> */}

              <button type="submit" className="btn-submit">
                <FontAwesomeIcon icon={faWallet} />
                Adicionar transação
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
