
# PaymentAPI

API de Pagamento integrada com a PagSeguro

### Antes de começar

Antes de começar, você precisa ter uma conta do tipo Vendedor ou Empresarial na PagSeguro. Você pode criar uma nova conta através do link abaixo:

[Criar Conta](https://cadastro.pagseguro.uol.com.br/).

Após criação da conta você precisará anotar EMAIL, TOKEN e APPLICATION NAME no
arquivo ENV deste projeto.

### Documentação PagSeguro

Existem dois tipos de documentação disponíveis no site do PagSeguro:
[Docs](https://dev.pagseguro.uol.com.br/docs)
[API Reference](https://dev.pagseguro.uol.com.br/reference)

Esta aplicação faz uso da API de Recorrencia do PagSeguro e sua documentação encontra-se em:
[API Recorrencia](https://dev.pagseguro.uol.com.br/v1.0/reference/api-recorrencia)

# MongoDB
Para utilizar essa aplicação você precisa de um docker container rodando
MongoDB vLTS na porta 27017. Use o comando abaixo e substitua a palavra "example"
por credenciais de sua preferencia. Não esqueça de anotar esta informação em seu
arquivo ENV.

    docker run --name mongodatabase -e MONGO_INITDB_ROOT_USERNAME=example -e MONGO_INITDB_ROOT_PASSWORD=example -p 27017:27017 -d -t mongo

