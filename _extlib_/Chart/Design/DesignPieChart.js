//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2017 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro17-public-license-readme-1.0.html
//
//==============================================================================

if (nexacro.PieChart) {
	var _pPieChart = nexacro.PieChart.prototype;

	_pPieChart._use_makeContentsString = false;
	_pPieChart._use_categorycolumn = true;

	_pPieChart.createCssDesignContents = function () {
	};

	_pPieChart.destroyCssDesignContents = function () {
	};

	_pPieChart.set_categorycolumn = function (v) {
		if (v === undefined || v === null) {
			v = "";
		}

		if (this.categorycolumn._value != v) {
			this.categorycolumn._set(v);
			this.on_apply_categorycolumn();
		}

		this._draw();
	};

	_pPieChart.makeContentsString = function () {
		var ds = this._binddataset;
		if (ds && ds.getColCount() > 0) {
			var str_contents = "{\n";
			str_contents += this._getDesignContentsTitle() + ", \n";
			str_contents += this._getDesignContentsLegend() + ", \n";
			str_contents += this._getDesignContentsTooltip() + ", \n";
			str_contents += this._getDesignContentsBoard() + ", \n";
			str_contents += this._getDesignContentsSereisset() + "\n";
			str_contents += "}";

			return "<Contents><![CDATA[" + str_contents + "]]></Contents>";
		}

		return "";
	};

	_pPieChart._getDesignContentsTitle = function () {
		var str_contents = "\t\"title\": {\n";
		str_contents += "\t\t\"id\": \"title\", \n";
		str_contents += "\t\t\"text\": \"Pie Chart\", \n";
		str_contents += "\t\t\"textfont\": \"20pt/normal \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"padding\": \"0px 0px 5px\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pPieChart._getDesignContentsBoard = function () {
		var str_contents = "\t\"board\": {\n";
		str_contents += "\t\t\"id\": \"board\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pPieChart._getDesignContentsTooltip = function () {
		var str_contents = "\t\"tooltip\": {\n";
		str_contents += "\t\t\"id\": \"tooltip\", \n";
		str_contents += "\t\t\"background\": \"#4b4b4b\", \n";
		str_contents += "\t\t\"linestyle\": \"0px none\", \n";
		str_contents += "\t\t\"textcolor\": \"#ffffff\", \n";
		str_contents += "\t\t\"textfont\": \"10pt/normal \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"padding\": \"5px\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pPieChart._getDesignContentsLegend = function () {
		var str_contents = "\t\"legend\": {\n";
		str_contents += "\t\t\"id\": \"legend\", \n";
		str_contents += "\t\t\"padding\": \"3px 10px 3px 10px\", \n";
		str_contents += "\t\t\"itemtextfont\": \"9pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"itemtextcolor\": \"#4c4c4c\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pPieChart._getDesignContentsSereisset = function () {
		var ds = this._binddataset;
		if (ds) {
			var str_contents = "\t\"seriesset\": [\n";
			var max_series = 1;
			var col_cnt = ds.getColCount();
			if (col_cnt > 1) {
				str_contents += this._getDesignContentsSereis(0, ds.getColID(1)) + "\n";
			}

			str_contents += "\t]";

			return str_contents;
		}
	};

	_pPieChart._getDesignContentsSereis = function (index, valuecolumn_id) {
		var str_contents = "\t  {\n";
		str_contents += "\t\t\"id\": \"series" + index + "\", \n";
		str_contents += "\t\t\"radius\": 150, \n";
		str_contents += "\t\t\"innerradius\": 70, \n";
		str_contents += "\t\t\"linestyle\": \"2px solid #ffffff\", \n";
		str_contents += "\t\t\"itemtextvisible\": true, \n";
		str_contents += "\t\t\"itemtextfont\": \"10pt/normal \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"valuecolumn\": \"bind:" + valuecolumn_id + "\"\n";
		str_contents += "\t  }";

		return str_contents;
	};

	delete _pPieChart;
}
