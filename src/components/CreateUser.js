import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function CreateUser() {

    
    const navigate = useNavigate()


    const [inputs, setInputs] = useState({})


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({...values, [name]: value }));
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost/api/users/submit', inputs)
        .then(function(response) {
            console.log(response.data)
            
            let nome = document.getElementById('nome').value;
            let email = document.getElementById('email').value;
            let data = document.getElementById('data').value;
            let cpf = document.getElementById('cpf').value;
            let telefone = document.getElementById('telefone').value;
            let endereco = document.getElementById('endereco').value;
            
            if(nome == ""){
                document.getElementById('erro-nome').innerHTML = "Campo Obrigatório"
                document.getElementById('nome').focus();
            } else if (email == "") {
                document.getElementById('erro-email').innerHTML = "Campo Obrigatório"
                document.getElementById('email').focus();
            } else if (data == "") {
                document.getElementById('erro-data').innerHTML = "Campo Obrigatório"
                document.getElementById('data').focus();
            } else if (cpf.length != 11) {
                document.getElementById('erro-cpf').innerHTML = "O Cpf deve ter 11 digitos"
                document.getElementById('cpf').focus();
            } else if (telefone == "") {
                document.getElementById('erro-telefone').innerHTML = "Campo Obrigatório"
                document.getElementById('telefone').focus();
            } else if (endereco == "") {
                document.getElementById('erro-endereco').innerHTML = "Campo Obrigatório"
                document.getElementById('endereco').focus();
            } else {
                navigate('/');
            }

            
        })
        console.log(inputs)
    }

    return (
       
       
       <div className="form">
             
             
                <div className="title">Bem vindo</div>
                <div className="subtitle">Cadastro de clientes</div>


            <form onSubmit={handleSubmit}>
                

                <div className="input-container ic1">
                    <input id="nome"
                        name="nome"
                        className="input"
                        type="text"
                        placeholder="Nome"
                        onChange={handleChange}
                        pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$" />
                    <small id="erro-nome" className="vermelho"></small>
                </div>


                <div className="input-container ic2">
                    <input id="data"
                        name="dataNascimento"
                        className="input"
                        type="text"
                        placeholder="Data Nascimento"
                        onChange={handleChange} />
                    <small id="erro-data" className="vermelho"></small>
                </div>


                <div className="input-container ic2">
                    <input id="cpf"
                        name="cpf"
                        className="input"
                        type="number"
                        placeholder="CPF"
                        onChange={handleChange} />
                    <small id="erro-cpf" className="vermelho"></small>    
                </div>


                <div className="input-container ic2">
                    <input id="telefone"
                        name="telefone"
                        className="input"
                        type="number"
                        placeholder="Telefone"
                        onChange={handleChange} />
                    <small id="erro-telefone" className="vermelho"></small>   
                </div>


                <div className="input-container ic2">
                    <input id="email"
                        name="email"
                        className="input"
                        type="text"
                        placeholder="E-mail"
                        onChange={handleChange} />
                    <small id="erro-email" className="vermelho"></small>
                </div>


                <div className="input-container ic2">
                    <input id="endereco"
                        name="endereco"
                        className="input"
                        type="text"
                        placeholder="Endereço"
                        onChange={handleChange} />
                    <small id="erro-endereco" className="vermelho"></small>
                </div>


                <button name="submit" type="text" className="submit">Enviar Cadastro</button>
            </form>
        </div>
    )
}
