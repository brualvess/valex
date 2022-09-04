# Valex
 Este é um projeto com TypeSCript será uma Api de cartões de benefícios. A API será responsável pela criação, recarga, ativação, assim como o processamento das compras.
___
## Rotas
### Cartões
Nessa rota, empresas com uma chave de API válida podem criar cartões para os seus funcionários. A rota recebe o id do funcionário e o tipo do cartão.

**Obs :** No campo cardType serão aceito somente os valores ('groceries', 'restaurant', 'transport', 'education', 'health')

**Criar cartão ( /card ) [POST]**

* Headers

``` x-api-key :[access_token] ``` 

* Body

``` 
{
    "id": 1,
    "cardType": "restaurant"
}
``` 
**Ativar cartão ( /activateCard ) [PUT]**

Nessa rota funcionários podem ativar os seus cartões. Para um cartão ser ativavo precisamos do id do cartão, CVC e da senha que será cadastrada.
* Body
``` 
{
    "id": 1,
    "cvc": "243",
    "password": "2987"
}
```
**Visualizar saldo e transações ( /balance:id ) [GET]**

Nessa rota funcionários podem consultar saldo e transações feitas no seu cartão, para isso precisamos do identificador do cartão que será recebido por parameters.

* Parameters

```  http://localhost:4000/balance/2  ```


* Retorno esperado

```
{
  "balance": 35000,
  "transactions": [
		{ "id": 1, "cardId": 2, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	]
  "recharges": [
		{ "id": 1, "cardId": 2, "timestamp": "21/01/2022", "amount": 40000 }
	]
}
```
**Bloqueio de cartão ( /block ) [PUT]**

Nessa rota, funcionários podem bloquear cartões. Para um cartão ser bloqueado precisamos do identificador e da senha do cartão.

* Body

``` 
{
    "id": 1,
    "password": "2987"
}
```
  
  **Desbloqueio de cartão ( /unblock ) [PUT]**
Nessa rota, funcionários podem desbloquear cartões. Para um cartão ser bloqueado precisamos do identificador e da senha do cartão.

* Body

``` 
{
    "id": 1,
    "password": "2987"
}
```
### Recargas 
**Recarregar cartão( /recharges ) [POST]**
Nessa rota, empresas com uma chave de API válida podem recarregar cartões de seus funcionários. Para um cartão ser recarregado precisamos do identificador do cartão e do valor a ser recarregado, só serão aceito valores maiores que 0.

* Body

``` 
{
    "id": 1,
    "amount": 50
}
```
### Compras
**Fazer pagamentos com o cartão 
(/payments ) [POST]**

Nessa rota, funcionários podem comprar em Points of Sale (maquininhas). Para uma compra em um POS ser efetuada precisamos do identificador do cartão utilizado e da senha do mesmo, do identificador do estabelecimento e do valor da compra.

*Body
``` 
{
    "cardId": 1,
    "password": "1234",
    "businessId": 1,
    "amount": 50
}
```

