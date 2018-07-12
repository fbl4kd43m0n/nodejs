//home controller

module.exports = {

	//funciones del controlador
	
	index : function(req, res, next){
		res.render('index', {title : 'Bem Vindo ao Crud com NODE JS'});
	}
}