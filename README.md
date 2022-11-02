
# PaymentAPI

## _API de Pagamento Integrada com a PagSeguro_

### Antes de começar

Antes de começar, você precisa ter uma conta do tipo Vendedor ou Empresarial na PagSeguro.
Após criação da conta você precisará anotar EMAIL, TOKEN e APPLICATION_NAME no arquivo ENV deste projeto. Instruções de como fazer isso e documentações podem ser encontradas nos links abaixo.

Realização obrigatória:
[Criar Conta](https://cadastro.pagseguro.uol.com.br/)
[Obter Token](https://dev.pagseguro.uol.com.br/reference/get-access-token)

Consulta futura:
[Abrir Docs](https://dev.pagseguro.uol.com.br/docs)
[API Reference](https://dev.pagseguro.uol.com.br/reference)
[API Recorrencia](https://dev.pagseguro.uol.com.br/v1.0/reference/api-recorrencia)

# MongoDB
Para utilizar essa aplicação você precisa de um docker container rodando a imagem mongo na porta 27017. Use o comando abaixo e substitua a palavra "example" por credenciais de sua preferencia. Não esqueça de anotar esta informação em seu arquivo ENV.

    docker run --name mongodatabase -e MONGO_INITDB_ROOT_USERNAME=example -e MONGO_INITDB_ROOT_PASSWORD=example -p 27017:27017 -d -t mongo

