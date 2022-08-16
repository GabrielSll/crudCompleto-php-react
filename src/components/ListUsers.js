import axios from "axios"
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import {Table} from 'react-bootstrap'

export default function ListUsers () {


    const [users, setUsers] = useState([])


    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost/api/users/')
        .then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        })
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost/api/users/${id}/delete`).then(function(response) {
            console.log(response.data);
            getUsers(); 
        })
    }

    return (
             <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome:</th>
                        <th>E-mail: </th>
                        <th>CPF</th>
                        <th>Data de nascimento</th>
                        <th>Telefone</th>
                        <th>Endereco</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                   {users.map((user, key) =>
                    <tr key={key}>
                        <td>{user.id}</td>
                        <td>{user.nome}</td>
                        <td>{user.email}</td>
                        <td>{user.cpf}</td>
                        <td>{user.dataNascimento}</td>
                        <td>{user.telefone}</td>
                        <td>{user.endereco}</td>
                            <td>
                                    <Link to={`user/${user.id}/edit`} className="editar">Editar</Link>
                                <button onClick={() => deleteUser(user.id)} className="delete">Deletar</button>
                            </td>   
                    </tr>
                   )}
                </tbody>
             </Table>
    )
}