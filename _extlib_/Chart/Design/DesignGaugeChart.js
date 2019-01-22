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

if (nexacro.GaugeChart) {
	var _pGaugeChart = nexacro.GaugeChart.prototype;

	_pGaugeChart._use_makeContentsString = false;
	_pGaugeChart._use_categorycolumn = true;

	_pGaugeChart.createCssDesignContents = function () {
	};

	_pGaugeChart.destroyCssDesignContents = function () {
	};

	_pGaugeChart.set_categorycolumn = function (v) {
		if (v === undefined || v === null) {
			v = "";
		}

		if (this.categorycolumn._value != v) {
			this.categorycolumn._set(v);
			this.on_apply_categorycolumn();
		}

		this._draw();
	};

	_pGaugeChart.makeContentsString = function () {
		var ds = this._binddataset;
		if (ds && ds.getColCount() > 0) {
			var str_contents = "{\n";
			str_contents += this._getDesignContentsTitle() + ", \n";
			str_contents += this._getDesignContentsLegend() + ", \n";
			str_contents += this._getDesignContentsTooltip() + ", \n";
			str_contents += this._getDesignContentsIndicator() + ", \n";
			str_contents += this._getDesignContentsBoard() + ", \n";
			str_contents += this._getDesignContentsValueaxis(1) + ", \n";
			str_contents += this._getDesignContentsSereisset() + "\n";
			str_contents += "}";

			return "<Contents><![CDATA[" + str_contents + "]]></Contents>";
		}

		return "";
	};

	_pGaugeChart._getDesignContentsTitle = function () {
		var str_contents = "\t\"title\": {\n";
		str_contents += "\t\t\"id\": \"title\", \n";
		str_contents += "\t\t\"text\": \"Gauge Chart\", \n";
		str_contents += "\t\t\"textfont\": \"20pt/normal \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"padding\": \"0px 0px 5px\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pGaugeChart._getDesignContentsBoard = function () {
		var str_contents = "\t\"board\": {\n";
		str_contents += "\t\t\"id\": \"board\"\n";
		str_contents += "\t}";

		return str_contents;
	};

	_pGaugeChart._getDesignContentsTooltip = function () {
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

	_pGaugeChart._getDesignContentsLegend = function () {
		var str_contents = "\t\"legend\": {\n";
		str_contents += "\t\t\"id\": \"legend\", \n";
		str_contents += "\t\t\"padding\": \"3px 10px 3px 10px\", \n";
		str_contents += "\t\t\"itemtextfont\": \"9pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"itemtextcolor\": \"#4c4c4c\"\n";
		str_contents += "\t}";

		return str_contents;
	};
	_pGaugeChart._getDesignContentsIndicator = function () {
		var str_contents = "\t\"indicator\": {\n";
		str_contents += "\t\t\"id\": \"indicator\", \n";
		str_contents += "\t\t\"visible\": \"true\", \n";
		str_contents += "\t\t\"image\": \"\", \n";
		str_contents += "\t\t\"size\": \"\", \n";
		str_contents += "\t\t\"indent\": \"\", \n";
		str_contents += "\t\t\"fillstyle\": \"#4b4b4b\", \n";
		str_contents += "\t\t\"linestyle\": \"0px none\", \n";
		str_contents += "\t\t\"opacity\": \"1\"\n";
		str_contents += "\t}";

		return str_contents;
	};
	_pGaugeChart._getDesignContentsSereisset = function () {
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

	_pGaugeChart._getDesignContentsValueaxis = function (min_axis) {
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
		return str_contents;
	};
	_pGaugeChart._getDesignContentsAxis = function (index) {
		var str_contents = "\t  {\n";
		str_contents += "\t\t\"id\": \"valueaxis" + index + "\", \n";
		str_contents += "\t\t\"labeltextcolor\": \"#6f6f6f\", \n";
		str_contents += "\t\t\"labeltextfont\": \"10pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"axislinestyle\": \"1px solid #d0d0d0\" \n";
		str_contents += "\t  }";

		return str_contents;
	};
	_pGaugeChart._getDesignContentsSereis = function (index, valuecolumn_id) {
		var str_contents = "\t  {\n";
		str_contents += "\t\t\"id\": \"series" + index + "\", \n";
		str_contents += "\t\t\"titletext\": \"series\", \n";
		str_contents += "\t\t\"itemtextvisible\": \"true\", \n";
		str_contents += "\t\t\"itemtextcolor\": \"#003860\", \n";
		str_contents += "\t\t\"itemtextfont\": \"bold 12pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"valuecolumn\": \"bind:" + valuecolumn_id + "\"\n";
		str_contents += "\t  }";

		return str_contents;
	};

	delete _pGaugeChart;
}
