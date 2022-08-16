<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: *");


include 'ConexaoBD.php';
$objBd = new ConexaoBD;
$conex = $objBd->conexao();


$method = $_SERVER['REQUEST_METHOD']; //método de request utilizado para acessar a página
switch($method) {
    
    //Método para buscar dados
    case "GET":
            //Recebe os dados de users (caso tenha).
            $sql = "SELECT * FROM users";
            $path = explode('/', $_SERVER['REQUEST_URI']); // Transforma a URI em uma array de strings
            // verifica se a váriavel foi iniciada e se é numérica (no caso se refere ao id)
            if(isset($path[3]) && is_numeric($path[3])) { 
            $sql .= " WHERE id = :id";
            $stmt = $conex->prepare($sql); //Prepara uma declaração SQL para execução
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute(); 
            $users = $stmt->fetch(PDO::FETCH_ASSOC); //Caso tenha apenas 1 cadastro na tabela
        } else {
            $stmt = $conex->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC); //Caso tenha mais de 1 cadastro na tabela
        }
            echo json_encode($users);
            break;

    //Método para lançar dados
    case "POST":
            // Decodifica a string JSON -> Lê o conteúdo e retorna todos os dados após os cabeçalhos http
            $user = json_decode(file_get_contents('php://input'));
            //inserção de dados na variável sql
            $sql = "INSERT INTO users(id, nome, email, cpf, dataNascimento, telefone, endereco) 
            VALUES (null, :nome, :email, :cpf, :dataNascimento, :telefone, :endereco)";
            //Prepara uma declaração SQL para execução
            $stmt = $conex->prepare($sql);
            $stmt->bindParam(':nome', $user->nome);
            $stmt->bindParam(':email', $user->email);
            $stmt->bindParam(':cpf', $user->cpf);
            $stmt->bindParam(':dataNascimento', $user->dataNascimento);
            $stmt->bindParam(':telefone', $user->telefone);
            $stmt->bindParam(':endereco', $user->endereco);
            //Execução do método
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Cadastrado com sucesso!!!'];
            } else {
                $response = ['status' => 0, 'message' => 'Erro ao cadastrar'];
            }
            echo json_encode($response); //retorna a representação do JSON
            break;
    
    //Método para atualizar dados
    case "PUT":
            // Decodifica a string JSON -> Lê o conteúdo e retorna todos os dados após os cabeçalhos http
            $user = json_decode( file_get_contents('php://input') );
            //inserção de dados na variável sql
            $sql = "UPDATE users SET nome= :nome, email =:email, cpf =:cpf, dataNascimento =:dataNascimento, telefone =:telefone, endereco =:endereco WHERE id = :id";
            $stmt = $conex->prepare($sql);
            //Prepara uma declaração SQL para execução
            $stmt->bindParam(':id', $user->id);
            $stmt->bindParam(':nome', $user->nome);
            $stmt->bindParam(':email', $user->email);
            $stmt->bindParam(':cpf', $user->cpf);
            $stmt->bindParam(':dataNascimento', $user->dataNascimento);
            $stmt->bindParam(':telefone', $user->telefone);
            $stmt->bindParam(':endereco', $user->endereco);

            //Execução do método
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Atualizado com sucesso.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response); //retorna a representação do JSON
            break;
    
    //Método para deletar dados
    case "DELETE":
            $sql = "DELETE FROM users WHERE id = :id";
            $path = explode('/', $_SERVER['REQUEST_URI']); // Transforma a URI em uma array de strings
            $stmt = $conex->prepare($sql); //Prepara uma declaração SQL para execução
            $stmt->bindParam(':id', $path[3]); //Deletar a partir do ID
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Deletado com sucesso.'];
            } else {
                $response = ['status' => 0, 'message' => 'Falha ao deletar dados do cliente.'];
            }
            echo json_encode($response);
            break;        
}
?>