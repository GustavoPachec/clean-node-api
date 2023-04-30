# Criar Enquete

> ## Caso de Sucesso

() 1. Recebe uma requisição do tipo **POST** na rota **/api/surveys/**
() 1. Valida se a requisição foi feita por um admin
() 1. Valida os dados obrigatórios **question** e **answers**
() 1. Cria uma enquete com os dados fornecidos
() 1. Retorna 204

## Exceções

() 1. Retorna erro 404 se a API não existir
() 1. Retorna erro 403 se ao usuário não for admin
(X) 1. Retorna erro 400 se **question** ou **answer** não forem fornecidos pelo client
() 1. Retorna erro 500 se der erro ao tentar criar a enquete
