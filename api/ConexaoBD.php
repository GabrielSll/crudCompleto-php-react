<?php 

    //  ------------- Conexão com o banco de dados  -------------
    
    class ConexaoBD {
        private $server = 'localhost';
        private $dbname = 'crud-newm';
        private $user = 'root';
        private $senha = '';
    
    public function conexao() {
        try {
            $conex = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname,$this->user, $this->senha);
            $conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conex;
        } catch (\Exception $e) {
            echo 'Erro no banco de dados: '.$e->getMessage();
        }
    }
    
    }

?>