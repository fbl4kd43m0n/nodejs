$(function(){
  $('.form-nuevoproducto form').form({
    nombre : {
      identifier : 'nombre',
      rules: [
        {
          type : 'empty',
          prompt : 'Por favor escreva um nome'
        }
      ]
    },
    
    precio : {
      identifier : 'precio',
      rules : [
        {
          type: 'empty',
          prompt : 'O campo preço é obrigatório'
        },
        {
          type: 'number',
          prompt: 'O preço precisa ser numérico'
        }
      ]
    },
    
    stock : {
      identifier : 'stock',
      rules : [
        {
          type: 'empty',
          prompt : 'Por favor entre com um valor em stock'
        },
        {
          type: 'integer',
          prompt: 'O campo stock só aceita valor inteiro'
        }
      ]
    }
  });
});