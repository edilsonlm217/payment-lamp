# Credenciais
Utilize as informações abaixo para acessar as APIs do PagSeguro Sandbox.

E-mail: edilsonlimaa@gmail.com
Token é: F14B67F437774EE8BA8E044A5B7A31EC


# Ambientes disponíveis
Produção                        =	https://ws.pagseguro.uol.com.br/pre-approvals/
Sandbox	                        =   https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/


# Documentação API de Recorrência
Documentação de Negócios        = https://dev.pagseguro.uol.com.br/v1.0/reference/api-recorrencia
Documentação de DEV             = https://dev.pagseguro.uol.com.br/v1.0/reference/api-recorrencia

# MongoDB
Para utilizar essa aplicação você precisa de um docker container rodando
MongoDB vLTS na porta 27017. Use o comando abaixo:

    docker run --name mongodatabase -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=Falcon2931 -p 27017:27017 -d -t mongo
