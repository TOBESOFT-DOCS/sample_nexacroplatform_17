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

if (nexacro.BubbleChart) {
	var _pBubbleChart = nexacro.BubbleChart.prototype;

	_pBubbleChart._use_makeContentsString = false;
	_pBubbleChart._use_categorycolumn = false;

	_pBubbleChart.createCssDesignContents = function () {
	};

	_pBubbleChart.destroyCssDesignContents = function () {
	};

	_pBubbleChart.makeContentsString = function () {
		var ds = this._binddataset;
		if (ds && ds.getColCount() > 0) {
			var str_contents = "{\n";
			str_contents += this._getDesignContentsTitle() + ", \n";
			str_contents += this._getDesignContentsLegend() + ", \n";
			str_contents += this._getDesignContentsHrangebar() + ", \n";
			str_contents += this._getDesignContentsVrangebar() + ", \n";
			str_contents += this._getDesignContentsTooltip() + ", \n";
			str_contents += this._getDesignContentsBoard() + ", \n";
			str_contents += this._getDesignContentsSereisset() + ", \n";
			str_contents += this._getDesignContentsValueaxes(2) + "\n";
			str_contents += "}";

			return "<Contents><![CDATA[" + str_contents + "]]></Contents>";
		}

		return "";
	};

	_pBubbleChart._getDesignContentsTitle = function () {
		var str_contents = "\t\"title\": {\n";
		str_contents += "\t\t\"id\": \"title\", \n";
		str_contents += "\t\t\"text\": \"Bubble Chart\", \n";
		str_contents += "\t\t\"textfont\": \"20pt/normal \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"padding\": \"0px 0px 5px\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pBubbleChart._getDesignContentsLegend = function () {
		var str_contents = "\t\"legend\": {\n";
		str_contents += "\t\t\"id\": \"legend\", \n";
		str_contents += "\t\t\"padding\": \"3px 10px 3px 10px\", \n";
		str_contents += "\t\t\"itemtextfont\": \"9pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"itemtextcolor\": \"#4c4c4c\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pBubbleChart._getDesignContentsHrangebar = function () {
		var str_contents = "\t\"hrangebar\": {\n";
		str_contents += "\t\t\"id\": \"hrangebar\", \n";
		str_contents += "\t\t\"trackbarpadding\": \"1px\", \n";
		str_contents += "\t\t\"background\": \"#eaeaea\", \n";
		str_contents += "\t\t\"linestyle\": \"1px solid #d5d5d5\", \n";
		str_contents += "\t\t\"trackbarlinestyle\": \"0px none\", \n";
		str_contents += "\t\t\"trackbarfillstyle\": \"#c9c9c9\", \n";
		str_contents += "\t\t\"size\": \"12\", \n";
		str_contents += "\t\t\"visible\": \"true\"\n";
		str_contents += "\t}";

		return str_contents;
	};
	_pBubbleChart._getDesignContentsVrangebar = function () {
		var str_contents = "\t\"vrangebar\": {\n";
		str_contents += "\t\t\"id\": \"vrangebar\", \n";
		str_contents += "\t\t\"trackbarpadding\": \"1px\", \n";
		str_contents += "\t\t\"background\": \"#eaeaea\", \n";
		str_contents += "\t\t\"linestyle\": \"1px solid #d5d5d5\", \n";
		str_contents += "\t\t\"trackbarlinestyle\": \"0px none\", \n";
		str_contents += "\t\t\"trackbarfillstyle\": \"#c9c9c9\", \n";
		str_contents += "\t\t\"size\": \"12\", \n";
		str_contents += "\t\t\"visible\": \"true\"\n";
		str_contents += "\t}";

		return str_contents;
	};
	_pBubbleChart._getDesignContentsTooltip = function () {
		var str_contents = "\t\"tooltip\": {\n";
		str_contents += "\t\t\"id\": \"tooltip\", \n";
		str_contents += "\t\t\"background\": \"#4b4b4b\", \n";
		str_contents += "\t\t\"linestyle\": \"0px none\", \n";
		str_contents += "\t\t\"textcolor\": \"white\", \n";
		str_contents += "\t\t\"textfont\": \"10pt/normal \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"padding\": \"5px\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pBubbleChart._getDesignContentsBoard = function () {
		var str_contents = "\t\"board\": {\n";
		str_contents += "\t\t\"id\": \"board\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pBubbleChart._getDesignContentsSereisset = function () {
		var ds = this._binddataset;
		if (ds) {
			var str_contents = "\t\"seriesset\": [\n";
			var col_cnt = ds.getColCount();
			if (col_cnt > 2) {
				var index_cnt = 0;
				var valuecolumn_id = ds.getColID(0);
				var value2column_id = ds.getColID(1);
				for (var i = 2; i < col_cnt; i++) {
					str_contents += this._getDesignContentsSereis(index_cnt, valuecolumn_id, value2column_id, ds.getColID(i));
					index_cnt++;

					if (i == (col_cnt - 1)) {
						str_contents += "\n";
					}
					else {
						str_contents += ", \n";
					}
				}
			}

			str_contents += "\t]";

			return str_contents;
		}
	};

	_pBubbleChart._getDesignContentsValueaxes = function (min_axis) {
		var str_contents = "\t\"valueaxes\": [\n";
		for (var i = 0; i < min_axis; i++) {
			str_contents += this._getDesignContentsAxis(i);

			if (i == (min_axis - 1)) {
				str_contents += "\n";
			}
			else {
				str_contents += ", \n";
			}
		}
		str_contents += "\t]";

		return str_contents;
	};

	_pBubbleChart._getDesignContentsSereis = function (index, valuecolumn_id, value2column_id, value3column_id) {
		var str_contents = "\t  {\n";
		str_contents += "\t\t\"id\": \"series" + index + "\", \n";
		str_contents += "\t\t\"itemtextvisible\": \"true\", \n";
		str_contents += "\t\t\"itemtextfont\": \"bold 9pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"valuecolumn\": \"bind:" + valuecolumn_id + "\", \n";
		str_contents += "\t\t\"value2column\": \"bind:" + value2column_id + "\", \n";
		str_contents += "\t\t\"value3column\": \"bind:" + value3column_id + "\"\n";
		str_contents += "\t  }";

		return str_contents;
	};

	_pBubbleChart._getDesignContentsAxis = function (index) {
		var str_contents = "\t  {\n";
		str_contents += "\t\t\"id\": \"valueaxis" + index + "\", \n";
		str_contents += "\t\t\"titletext\": \"valueaxis\", \n";
		str_contents += "\t\t\"boardlinevisible\": \"true\", \n";
		str_contents += "\t\t\"boardlinestyle\": \"1px solid #d0d0d0\", \n";
		str_contents += "\t\t\"labeltextcolor\": \"#6f6f6f\", \n";
		str_contents += "\t\t\"labeltextfont\": \"10pt/normal \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"titletextcolor\": \"#4c4c4c\", \n";
		str_contents += "\t\t\"titletextfont\": \"bold 12pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"ticklinestyle\": \"1px solid #525252\", \n";
		str_contents += "\t\t\"axislinestyle\": \"1px solid #525252\"\n";
		str_contents += "\t  }";

		return str_contents;
	};

	delete _pBubbleChart;
}
