# talentrh-components

## Input CPF
##### Exemplo:
```
{{talent-input-cpf
  placeholder='CPF'
  value=model.cpf}}
```
##### Outras opções:
```
required=true
disabled=true
onUpdateStatus='nomeDaAction'
```
Passar nome de uma action pela propriedade onUpdateStatus, a mesma será acionada pelo componente durante a digitação
recebendo o tipo do campo e o status atual do componente (true ou false), sendo false caso o valor informado seja inválido e true caso seja válido.

##### Exemplo da action para onUpdateStatus:
```
updateStatus(inputType, status) {
  this.set(inputType, status);
}
```
Neste exemplo de action, a mesma vai atualizar a propriedade com o nome inputType para o status atual do componente, permitindo saber se o valor do input é valido antes de submeter o form.

## Input CEP
##### Exemplo:
```
{{talent-input-cep
  value=modelTest.cep
  placeholder='CEP'}}
```
##### Outras opções:
* `required=true`
* `disabled=true`
* `onUpdateStatus='nomeDaAction'` | Explicado no input CPF.
* `buttonComplete=true` | Habilita botão de completar campos automaticamente,
suportando atualmente: address, district e complement.

```
{{talent-input-cep
  value=model.cep
  address=model.address
  district=model.district
  complement=model.complement
  buttonComplete=true
  onUpdateStatus='updateStatus'
  placeholder='CEP'}}
```
* `loadCity='nomeDaAction'` | Para o preenchimento automatico do campo CIDADE é necessário informar uma action
para o componente, a mesma será acionada após clicar no botão de preencher automatico recebendo as informações da cidade ficando a critério do desenvolvedor a manipulação desses dados.

## Input CEP
##### Exemplo:
```
{{talent-input-cnpj
  value=valuecnpj
  placeholder='CNPJ'}}
```
##### Outras opções:
* `required=true`
* `disabled=true`
* `onUpdateStatus='nomeDaAction'` | Explicado no input CPF.
* `buttonComplete=true` | Habilita botão de completar campos automaticamente,
suportando atualmente: name, address, district, zipcode, number, phone.

