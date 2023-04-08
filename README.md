<<<<<<< HEAD
# iventory-back
=======
1. Criar um arquivo .env (Mesmo que ainda não existam variáveis no projeto)

2. Para executar o projeto no Docker:

```
yarn dev
```

Esse comando fará o build da imagem (caso seja a primeira vez) e inicializará o docker-compose.
Caso queiram buildar o projeto novamente por algum motivo, podem executar o comando com a flag --build:

```
yarn dev --build
```

3. Para executar o projeto fora do Docker:

```
yarn

yarn start
```

4. Para executar os testes unitários automatizados:

```
yarn test
```

4. Para executar os testes end-to-end automatizados:

```
yarn test:e2e
```
>>>>>>> f279eb2fca5b31667fd503ee039ccdbcf8f60412
