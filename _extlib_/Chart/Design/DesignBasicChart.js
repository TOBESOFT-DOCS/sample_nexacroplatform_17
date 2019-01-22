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

if (nexacro.BasicChart) {
	var _pBasicChart = nexacro.BasicChart.prototype;

	_pBasicChart._use_makeContentsString = false;
	_pBasicChart._use_categorycolumn = true;

	_pBasicChart.createCssDesignContents = function () {
	};

	_pBasicChart.destroyCssDesignContents = function () {
	};

	_pBasicChart.set_categorycolumn = function (v) {
		if (v === undefined || v === null) {
			v = "";
		}

		if (this.categorycolumn._value != v) {
			this.categorycolumn._set(v);
			this.on_apply_categorycolumn();
		}
	};

	_pBasicChart.makeContentsString = function () {
		var ds = this._binddataset;
		if (ds && ds.getColCount() > 0) {
			var str_contents = "{\n";
			str_contents += this._getDesignContentsTitle() + ", \n";
			str_contents += this._getDesignContentsLegend() + ", \n";
			str_contents += this._getDesignContentsHrangebar() + ", \n";
			str_contents += this._getDesignContentsVrangebar() + ", \n";
			str_contents += this._getDesignContentsTooltip() + ", \n";
			str_contents += this._getDesignContentsBoard() + ", \n";
			str_contents += this._getDesignContentsCategoryaxis() + ", \n";
			str_contents += this._getDesignContentsSereisset() + ", \n";
			str_contents += this._getDesignContentsValueaxes(1) + "\n";
			str_contents += "}";

			return "<Contents><![CDATA[" + str_contents + "]]></Contents>";
		}

		return "";
	};

	_pBasicChart._getDesignContentsTitle = function () {
		var str_contents = "\t\"title\": {\n";
		str_contents += "\t\t\"id\": \"title\", \n";
		str_contents += "\t\t\"text\": \"Bar Chart\", \n";
		str_contents += "\t\t\"textfont\": \"20pt/normal \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"padding\": \"0px 0px 5px\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pBasicChart._getDesignContentsLegend = function () {
		var str_contents = "\t\"legend\": {\n";
		str_contents += "\t\t\"id\": \"legend\", \n";
		str_contents += "\t\t\"padding\": \"3px 10px 3px 10px\", \n";
		str_contents += "\t\t\"itemtextfont\": \"9pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"itemtextcolor\": \"#4c4c4c\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pBasicChart._getDesignContentsHrangebar = function () {
		var str_contents = "\t\"hrangebar\": {\n";
		str_contents += "\t\t\"id\": \"hrangebar\", \n";
		str_contents += "\t\t\"trackbarpadding\": \"1px\", \n";
		str_contents += "\t\t\"background\": \"#eaeaea\", \n";
		str_contents += "\t\t\"linestyle\": \"1px solid #d5d5d5\", \n";
		str_contents += "\t\t\"trackbarlinestyle\": \"0px none\", \n";
		str_contents += "\t\t\"trackbarfillstyle\": \"#c9c9c9\", \n";
		str_contents += "\t\t\"size\": \"12\"\n";
		str_contents += "\t}";

		return str_contents;
	};
	_pBasicChart._getDesignContentsVrangebar = function () {
		var str_contents = "\t\"vrangebar\": {\n";
		str_contents += "\t\t\"id\": \"vrangebar\", \n";
		str_contents += "\t\t\"trackbarpadding\": \"1px\", \n";
		str_contents += "\t\t\"background\": \"#eaeaea\", \n";
		str_contents += "\t\t\"linestyle\": \"1px solid #d5d5d5\", \n";
		str_contents += "\t\t\"trackbarlinestyle\": \"0px none\", \n";
		str_contents += "\t\t\"trackbarfillstyle\": \"#c9c9c9\", \n";
		str_contents += "\t\t\"size\": \"12\"\n";
		str_contents += "\t}";

		return str_contents;
	};
	_pBasicChart._getDesignContentsTooltip = function () {
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

	_pBasicChart._getDesignContentsBoard = function () {
		var str_contents = "\t\"board\": {\n";
		str_contents += "\t\t\"id\": \"board\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pBasicChart._getDesignContentsCategoryaxis = function () {
		var str_contents = "\t\"categoryaxis\": {\n";
		str_contents += "\t\t\"id\": \"categoryaxis\", \n";
		str_contents += "\t\t\"titletext\": \"categoryaxis\", \n";
		str_contents += "\t\t\"titletextcolor\": \"#4c4c4c\", \n";
		str_contents += "\t\t\"titletextfont\": \"bold 12pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"labeltextcolor\": \"#6f6f6f\", \n";
		str_contents += "\t\t\"labeltextfont\": \"11pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"axislinestyle\": \"1px solid #525252\", \n";
		str_contents += "\t\t\"ticklinestyle\": \"1px solid #525252\", \n";
		str_contents += "\t\t\"boardlinestyle\": \"1px solid #d0d0d0\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pBasicChart._getDesignContentsSereisset = function () {
		var ds = this._binddataset;
		if (ds) {
			var str_contents = "\t\"seriesset\": [\n";

			var col_cnt = ds.getColCount();
			if (col_cnt > 1) {
				var index_cnt = 0;

				for (var i = 1; i < col_cnt; i++) {
					str_contents += this._getDesignContentsSereis(index_cnt, ds.getColID(i));
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

	_pBasicChart._getDesignContentsValueaxes = function (min_axis) {
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

	_pBasicChart._getDesignContentsSereis = function (index, valuecolumn_id) {
		var str_contents = "\t  {\n";
		str_contents += "\t\t\"id\": \"series" + index + "\", \n";
		str_contents += "\t\t\"titletext\": \"series\", \n";
		str_contents += "\t\t\"barvisible\": true, \n";
		str_contents += "\t\t\"barsize\": \"65\", \n";
		str_contents += "\t\t\"itemtextvisible\": true, \n";
		str_contents += "\t\t\"itemtextcolor\": \"#003860\", \n";
		str_contents += "\t\t\"itemtextfont\": \"bold 12pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"valuecolumn\": \"bind:" + valuecolumn_id + "\"\n";
		str_contents += "\t  }";

		return str_contents;
	};

	_pBasicChart._getDesignContentsAxis = function (index) {
		var str_contents = "\t  {\n";
		str_contents += "\t\t\"id\": \"valueaxis" + index + "\", \n";
		str_contents += "\t\t\"titletext\": \"valueaxis\", \n";
		str_contents += "\t\t\"boardlinevisible\": true, \n";
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

	delete _pBasicChart;
}
