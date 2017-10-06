# talentrh-components

## Como usar

### Input CPF
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

