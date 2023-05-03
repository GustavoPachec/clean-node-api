# Criar Enquete

> ## Caso de Sucesso

(x) 1. Recebe uma requisição do tipo **POST** na rota **/api/surveys/**
(X) 1. Valida se a requisição foi feita por um admin
(x) 1. Valida os dados obrigatórios **question** e **answers**
(x) 1. Cria uma enquete com os dados fornecidos
(X) 1. Retorna 204

## Exceções

(x) 1. Retorna erro 404 se a API não existir
(X) 1. Retorna erro 403 se ao usuário não for admin
(X) 1. Retorna erro 400 se **question** ou **answer** não forem fornecidos pelo client
(X) 1. Retorna erro 500 se der erro ao tentar criar a enquete
