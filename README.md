# talentrh-components
Componentes padronizados para EmberJS.


2 - Como Usar
======
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

## Input CNPJ
##### Exemplo:
```
{{talent-input-cnpj
  value=valuecnpj
  placeholder='CNPJ'}}
```
##### Outras opções:
* `required=true`
* `disabled=true`
* `onUpdateStatus='nomeDaAction'` | Explicado no input CNPJ.
* `buttonComplete=true` | Habilita botão de completar campos automaticamente,
suportando atualmente: name, address, district, zipcode, number, phone.
```
{{talent-input-cnpj
  value=value
  name=cnpjName
  address=cnpjAddress
  district=cnpjDistrict
  zipcode=cnpjZipcode
  number=cnpjNumber
  phone=cnpjPhone
  buttonComplete=true
  onUpdateStatus='updateStatus'
  placeholder='CNPJ'}}
```
## Input Select2
##### Exemplo usando Ember Data:
```
{{talent-input-select2
  modelName='city'
  endpoint='/cities/ajax'
  placeholder='Selecionar Cidade'
  label='Cidade'
  showProperties='id| - |name'
  optional=true
  selected=modelTest.city
  startValue=modelTest.city.name}}
```
##### Exemplo usando Ajax:
```
{{talent-input-select2
  ajax=true
  endpoint='/cities/ajax'
  placeholder='Selecionar Cidade'
  label='Cidade'
  showProperties='id| - |name'
  optional=true
  selected=modelTest.city
  startValue=modelTest.city.name}}
```
##### Propriedades:
* `disabled=true`
* `ajax=true` | Informa que o componente vai utilizar Ajax "puro" ao invés do Ember Data.
* `modelName='nomeDoModel'` | Caso o componente esteja usando Ember Data, informar o nome do model. 
* `endpoint='/exemplo/cidades'` | Informar o endpoint o qual o componente buscará os registros.
* `optional=true` | Exibe um "X" permitindo desselecionar o valor atual do select clicando no mesmo.
* `startValue=modelTest.city.name` | 
* `showProperties='property'` | Informar a propriedade que será mostrada no select, pode ser usado o "|" para separar duas ou mais propriedades.
* `onButtonNew='nomeDaAction'` | Caso essa propriedade for informada, aparecerá um botão ao lado do select que ao ser clicado invocará a action cujo nome foi passado no 'onButtonNew'. Utilizar esse recurso quando for necessario abrir um modal ou levar para outra tela para criar um novo registro.

## Input Datetime
##### Exemplo:
```
{{talent-input-datetime
  placeholder='Data inicial'
  format='DD/MM/YYYY HH:mm'
  value=datetimeValue}}
```
##### Outras opções:
* `mask='99/99/9999 99:99'` | Permite informar uma máscara para o campo
* `formatToDate=true` | Esta opção faz com que a data e/ou hora selecionada no input seja transformado de string para  formato de data.

3 - Desenvolver
======
* 1- `git clone`
* 2- `cd talentrh-components`
* 3- Instalar as dependência executando `npm install && bower install`
* 4- Remover comentario do método `isDevelopingAddon` em talentrh-components/index.js
* 5- Executar o comando `npm link` para gerar um link do módulo
* 6- No projeto em que será testado o addon, executar o comando `npm link talentrh-components`
