
$().ready(function(){
	var ProductTree = {
		loadDatas:function(){
			var teamId = $("#teamId").val();
			getData(function (msg){
				
			}, getContextPath()+'/product/loadWithTeam/'+teamId);
		}
	}
});
