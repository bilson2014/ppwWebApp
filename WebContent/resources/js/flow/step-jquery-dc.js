/**
 * @auther DangChengcheng 请保留作者
 * @mailTo dc2002007@163.com
 */

var Step_Tool_dc = function(ClassName, callFun) {
	this.ClassName = ClassName, this.callFun = callFun,
			this.Steps = new Array(), this.stepAllHtml = "";
}

Step_Tool_dc.prototype = {
	/**
	 * 绘制到目标位置
	 */
	createStepArray : function(currStep, stepListJson) {
		this.currStep = currStep;

		for (var i = 0; i < stepListJson.length; i++) {
			var Step_Obj = new Step(this.currStep, stepListJson[i].StepNum,
					stepListJson[i].StepText, stepListJson[i].StepDescription,
					stepListJson.length);

			Step_Obj.createStepHtml();
			this.Steps.push(Step_Obj);
		}

	},
	drawStep : function(currStep, stepListJson) {
		this.clear();
		this.createStepArray(currStep, stepListJson);
		if (this.Steps.length > 0) {
			this.stepAllHtml += "<ul>";
			for (var i = 0; i < this.Steps.length; i++) {
				this.stepAllHtml += this.Steps[i].htmlCode;
			}
			this.stepAllHtml += "</ul>";
			jQuery("." + this.ClassName).html(this.stepAllHtml);
			this.createEvent();
		} else {
			jQuery("." + this.ClassName).html("没有任何步骤");
		}
	},
	createEvent : function() {
		var self = this;
		if (self.callFun != null) {
			jQuery("." + this.ClassName + " ul li").click(function() {
				var num = jQuery(this).attr("data-value");
				var text = jQuery(this).attr("data-text");
				result = {
					value : num,
					text : text
				};
				if (num <= currentIndex)
					eval(self.callFun + "(result)");
			});
		}
		// if (this.mouseenter != null) {
		// jQuery("." + this.ClassName + " ul li").on("mouseenter",function(){
		// var num = jQuery(this).attr("data-value");
		// var text = jQuery(this).attr("data-text");
		// result = {
		// value : num,
		// text : text
		// };
		// if(num<=currentIndex)
		// eval(self.mouseenter + "(result)");
		// });
		// }
		// if (this.mouseleave != null) {
		// jQuery("." + this.ClassName + " ul li").on("mouseleave",function(){
		// var num = jQuery(this).attr("data-value");
		// var text = jQuery(this).attr("data-text");
		// result = {
		// value : num,
		// text : text
		// };
		// if(num<=currentIndex)
		// eval(self.mouseleave + "(result)");
		// });
		// }
	},
	clear : function() {
		this.Steps = new Array();
		jQuery("." + this.ClassName).html("");
		this.stepAllHtml = "";
	}
}
var Step = function(currStep, StepNum, StepText, StepDescription, totalCount) {
	this.currStep = currStep, this.StepNum = StepNum, this.StepText = StepText,
			this.StepDescription = StepDescription,
			this.totalCount = totalCount, this.htmlCode = "";
}
Step.prototype = {
	createStepHtml : function() {
		// var stepHtml="\<span\>"+"\</span\>";
		var stepHtml = "\<a href=\"javascript:void(0);\"  \>" + this.StepText + "\</a\>";
		if (this.currStep > this.totalCount) {
			this.currStep = this.totalCount;
		} else if (this.currStep <= 0) {
			this.currStep = 1;
		}
		var classSype;
		if ((this.currStep - 1) == this.StepNum && this.StepNum == 1) {
			classSype = "firstFinshStepTwo drop-target";
		} else if (this.currStep > this.StepNum && this.StepNum == 1) {
			classSype = "firstFinshStep drop-target";
		} else if (this.currStep == this.StepNum && this.StepNum == 1) {
			classSype = "firstFinshStep_curr1 drop-target";
		} else if (this.currStep == this.StepNum
				&& this.currStep != this.totalCount) {// 当前步骤,下一个未进行,并且不是最后一个
			classSype = "coressStep drop-target";
		} else if (this.currStep == this.StepNum
				&& this.StepNum == this.totalCount) {// 当前步骤 并且是最后一步
			classSype = "finshlast drop-target";
		} else if (this.currStep < this.StepNum
				&& this.StepNum == this.totalCount) {// 未进行步骤,并且是最后一个
			classSype = "last drop-target";
		} else if (this.currStep < this.StepNum) {// 未进行的步骤
			classSype = "loadStep drop-target";
		} else if ((this.currStep - 1) == this.StepNum) {
			classSype = "finshlastBefore drop-target";
		} else if (this.currStep > this.StepNum) {// 已进行的步骤
			classSype = "finshStep drop-target";
		}
		stepHtml = "\<li class=\"" + classSype + "\"  data-value=\""
				+ this.StepNum + " \" data-text=\"" + this.StepText
				+ "\"  data-description= '" + this.StepDescription + "'  \>"
				+ stepHtml + "\</a\>";
		this.htmlCode = stepHtml;
	}

}
