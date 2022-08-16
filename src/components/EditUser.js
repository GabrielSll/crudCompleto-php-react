import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function ListUsers() {


    const navigate = useNavigate()
    const [inputs, setInputs] = useState([])
    const {id} = useParams();


    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost/api/user/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        })
    }


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({...values, [name]: value }));
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost/api/users/${id}/edit`, inputs)
        .then(function(response) {
            console.log(response.data)
            navigate('/')
        })
        console.log(inputs)
    }


    return (
        
        <div className="form">
               
                <div className="title">Editar Cliente</div>
                <div className="subtitle">Inserir dados a serem editados</div>


            <form onSubmit={handleSubmit}>
                

                <div className="input-container ic1">
                    <input id="nome"
                        name="nome"
                        value={inputs.nome}
                        className="input"
                        type="text"
                        placeholder="Nome"
                        onChange={handleChange}
                        pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$" />
                </div>


                <div className="input-container ic2">
                    <input id="data"
                        name="dataNascimento"
                        value={inputs.dataNascimento}
                        className="input"
                        type="text"
                        placeholder="Data Nascimento"
                        onChange={handleChange} />
                </div>


                <div className="input-container ic2">
                    <input id="cpf"
                        name="cpf"
                        value={inputs.cpf}
                        className="input"
                        type="number"
                        placeholder="CPF"
                        onChange={handleChange} />
                </div>


                <div className="input-container ic2">
                    <input id="telefone"
                        name="telefone"
                        value={inputs.telefone}
                        className="input"
                        type="number"
                        placeholder="Telefone"
                        onChange={handleChange} />
                </div>


                <div className="input-container ic2">
                    <input id="email"
                        name="email"
                        value={inputs.email}
                        className="input"
                        type="text"
                        placeholder="E-mail"
                        onChange={handleChange} />
                </div>


                <div className="input-container ic2">
                    <input id="endereco"
                        name="endereco"
                        value={inputs.endereco}
                        className="input"
                        type="text"
                        placeholder="Endereço"
                        onChange={handleChange} />
                </div>


                <button name="submit" className="submit">Enviar Cadastro</button>
            </form>
        </div>
    )
}
