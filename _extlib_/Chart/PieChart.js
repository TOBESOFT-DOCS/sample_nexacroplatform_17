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

if (!nexacro.PieChart) {
	nexacro.PieChart = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._ChartBase.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this.categorycolumn = new nexacro.BindableValue("");
	};

	var _pPieChart = nexacro._createPrototype(nexacro._ChartBase, nexacro.PieChart);
	nexacro.PieChart.prototype = _pPieChart;
	_pPieChart._type_name = "PieChart";




	_pPieChart.categorycolumn = "";


	_pPieChart._boardWidth = 0;
	_pPieChart._boardHeight = 0;
	_pPieChart._centerLeft = 0;
	_pPieChart._centerTop = 0;

	_pPieChart._invalidcategorycolumn = false;





	_pPieChart.on_destroy_contents = function () {
		this.categorycolumn = null;
		this._boardWidth = null;
		this._boardHeight = null;
		this._centerLeft = null;
		this._centerTop = null;

		nexacro._ChartBase.prototype.on_destroy_contents.call(this);

		return true;
	};

	_pPieChart.set_categorycolumn = function (v) {
		if (this.categorycolumn._value != v) {
			this.categorycolumn._set(v);
			this.on_apply_categorycolumn();
		}

		this._draw();
	};

	_pPieChart._checkcategorycolumn = function () {
		var categorycolumn = this.categorycolumn;
		var bindtype = categorycolumn._bindtype;
		if (bindtype == 0) {
			this._invalidcategorycolumn = true;
		}
		else {
			categorycolumn = this._getBindableValue("categorycolumn");
			var binddataset = this._binddataset;
			if (binddataset) {
				var coltype = binddataset._getColumnType(categorycolumn);
				if (!coltype) {
					this._invalidcategorycolumn = true;
				}
				else {
					this._invalidcategorycolumn = false;
				}
			}
		}
	};

	_pPieChart.on_apply_categorycolumn = function () {
		this.on_apply_binddataset();
	};

	_pPieChart.setSeries = function (id, contents) {
		var series, seriesId, seriesIndex = -1;

		if (id && typeof (id) == "string") {
			seriesId = id;
		}
		else {
			if (!nexacro._GraphicsLib.isEmpty(contents)) {
				nexacro._GraphicsLibObject.Each(contents, function (name, val, object) {
					if (name == "id") {
						seriesId = contents.id;
					}
				});
			}
		}

		if (seriesId) {
			series = this.getSeriesByID(seriesId);
			seriesIndex = nexacro._GraphicsLibArray.indexOf(this.seriesset, series);
		}

		if (series) {
			var seriesContents = {
			};
			if (typeof (contents) == "object") {
				if (!nexacro._GraphicsLib.isEmpty(contents)) {
					nexacro._GraphicsLibObject.Each(contents, function (name, val, object) {
						if (name == "id") {
							seriesId = contents.id;
						}
					});
				}
				seriesContents = contents;
			}
			else {
				seriesIndex = -1;
			}

			if (seriesIndex != -1) {
				this.contents.seriesset[seriesIndex] = this._mergeContents(true, this.contents.seriesset[seriesIndex], seriesContents);

				this._drawing = true;
				this._setProperties(seriesContents, series);
				this._drawing = false;
			}

			if (seriesIndex != -1 && this.contents.seriesset[seriesIndex]) {
				seriesIndex = series._configIndex;
			}
		}
		else {
			if (this.seriesset.length > 0) {
				seriesIndex = -1;
			}
			else {
				series = this._appendSeries(contents);
				if (series && series != -1) {
					seriesIndex = series._configIndex;
				}
			}
		}

		this._draw();

		return seriesIndex;
	};

	_pPieChart.showSeries = function (id) {
		var s = this.getSeriesByID(id);
		if (s) {
			var visible = s._orgVisible;
			s._orgVisible = undefined;
			if (visible) {
				s.set_visible(true);
			}
		}
	};

	_pPieChart.hideSeries = function (id) {
		var s = this.getSeriesByID(id);
		if (s) {
			if (s._orgVisible === undefined || s._orgVisible === null) {
				s._orgVisible = s.visible;
			}
			s.set_visible(false);
		}
	};



	_pPieChart._arrange = function () {
		nexacro._ChartBase.prototype._arrange.call(this);

		if (this._rearrange) {
			this._arrangeBoard();
		}
		var s = this.seriesset[0];
		if (s) {
			s._rearrangeProcessItemData();
		}
		this._arrangeSeries();
	};

	_pPieChart._createSeriesset = function (o, id) {
		if (!this._seriesGroup) {
			return false;
		}

		var seriesset = this.seriesset, series, seriesLength = -1;

		if (seriesset) {
			seriesLength = seriesset.length;
			if (seriesLength > 0) {
				return;
			}
		}

		var s = seriesset[0], seriesId;
		if (s) {
			seriesId = s.id;
			if (seriesId == id) {
				throw nexacro.MakeNativeError(this, "native_exist_id", seriesId);
				return;
			}
		}

		series = this._appendSeries(o);
		return series;
	};

	_pPieChart._createSeries = function (contents, id) {
		var series = new nexacro.ChartPieSeriesControl(id, this, this._graphicsControl);
		if (series) {
			return series;
		}
	};

	_pPieChart._setSeries = function () {
		var series = this.seriesset, length = series.length, items;

		for (var i = 0; i < length; i++) {
			var s = series[i];
			if (s) {
				if (this._changedData) {
					s._setData();

					if (nexacro._isNull(s._data)) {
						return false;
					}

					items = s._setItemData();
					this._seriesitems = items;
					this._changedColorset = true;
				}

				if (this._changedColorset && !s._changedFillStyle) {
					items = this._seriesitems;
					if (items) {
						s._setItemColor(items);
					}
					this._changedColorset = false;
				}
				else {
					items = this._seriesitems;
					if (items) {
						s.on_apply_fillstyle();
					}
				}
			}
		}
	};

	_pPieChart._getHighlightVisible = function () {
		var series = this.seriesset, length = series.length, highlightvisible = false;

		for (var i = 0; i < length; i++) {
			var s = series[i];
			if (s.highlightvisible) {
				highlightvisible = true;
				break;
			}
		}

		return highlightvisible;
	};

	_pPieChart._showSeriesItem = function (id) {
		var s = this.seriesset[0];
		var seriesGroup = this._seriesGroup;
		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item.category;

				if (name == id) {
					item._isShow = true;
					this._rearrange = true;
					if (this.legend) {
						this._applyLegendItem();
					}
				}
			}
		}
		this._draw();
	};

	_pPieChart._hideSeriesItem = function (id) {
		var s = this.seriesset[0];
		var seriesGroup = this._seriesGroup;

		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item.category;

				if (name == id) {
					item._isShow = false;

					this._rearrange = true;
					if (this.legend) {
						this._applyLegendItem();
					}
				}
			}
		}
		this._draw();
	};
	_pPieChart._GetSeriesItemIndex = function (id) {
		var s = this.seriesset[0];
		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item.category;

				if (name == id) {
					return i;
				}
			}
		}
	};
	_pPieChart._GetSeriesItemFromId = function (id) {
		var s = this.seriesset[0];
		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item.category;

				if (name == id) {
					return item;
				}
			}
		}
	};
	_pPieChart._GetSeriesItemFromIndex = function (index) {
		var s = this.seriesset[0];
		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item.category;

				if (i == index) {
					return item;
				}
			}
		}
	};
	_pPieChart._GetSeriesItemIndexFromSlice = function (_slice) {
		var s = this.seriesset[0];
		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item._slice;
				var itemslice = item._slice;
				if (itemslice) {
					if (_slice == itemslice) {
						return i;
					}
					else if (itemslice.highlightvisible == true) {
						if (itemslice._highlight) {
							if (itemslice._highlight == _slice) {
								return i;
							}
						}
					}
					else if (s.valuelineblurangle != undefined && s.valuelineblurangle != null) {
						if (item._sliceborder) {
							if (item._sliceborder == _slice) {
								return i;
							}
						}
					}
				}
			}
		}
	};
	_pPieChart._setDataset = function () {
		nexacro._ChartBase.prototype._setDataset.call(this);
	};

	delete _pPieChart;
}

if (!nexacro.ChartPieSeriesControl) {
	nexacro.ChartPieSeriesControl = function (id, parent, graphicsControl) {
		nexacro._SeriesBase.prototype.constructor.apply(this, arguments);

		this._seriesitems = [];

		this._clickItemIndex = [];
		this._clickShow = false;
	};

	var _pChartPieSeriesControl = nexacro._createPrototype(nexacro._SeriesBase, nexacro.ChartPieSeriesControl);
	nexacro.ChartPieSeriesControl.prototype = _pChartPieSeriesControl;
	_pChartPieSeriesControl._type_name = "ChartPieSeriesControl";


	_pChartPieSeriesControl.highlightfillstyle = "";
	_pChartPieSeriesControl.highlightlinestyle = "";
	_pChartPieSeriesControl.highlightopacity = 1;
	_pChartPieSeriesControl.highlightradius = undefined;
	_pChartPieSeriesControl.highlightvisible = false;
	_pChartPieSeriesControl.innerradius = undefined;
	_pChartPieSeriesControl.itemtextguidelineopacity = 1;
	_pChartPieSeriesControl.itemtextguidelinestyle = "";
	_pChartPieSeriesControl.itemtextguidesize = undefined;
	_pChartPieSeriesControl.fillstyle = "";
	_pChartPieSeriesControl.linestyle = "";
	_pChartPieSeriesControl.opacity = 1;
	_pChartPieSeriesControl.radius = undefined;
	_pChartPieSeriesControl.selectfillstyle = "";
	_pChartPieSeriesControl.selectindent = undefined;
	_pChartPieSeriesControl.selectlinestyle = "";
	_pChartPieSeriesControl.selectopacity = 1;
	_pChartPieSeriesControl.startangle = undefined;
	_pChartPieSeriesControl.endangle = undefined;
	_pChartPieSeriesControl.valuelineblurangle = undefined;
	_pChartPieSeriesControl.visible = true;


	_pChartPieSeriesControl._itemtextguidelocation = "out";
	_pChartPieSeriesControl._itemtextguidesize = null;
	_pChartPieSeriesControl._borderwidth = null;
	_pChartPieSeriesControl._startangle = null;
	_pChartPieSeriesControl._endangle = null;
	_pChartPieSeriesControl._valuelineblurangle = null;
	_pChartPieSeriesControl._itemtextguidelinestyle = null;
	_pChartPieSeriesControl._changedFillStyle = false;
	_pChartPieSeriesControl._fillstyle = null;

	_pChartPieSeriesControl._radius = 0.8;
	_pChartPieSeriesControl._innerradius = 0;
	_pChartPieSeriesControl._highlightradius = null;

	_pChartPieSeriesControl.set_visible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.visible != val) {
			this._changeContentsProperty("visible", val, this.visible);
			this.visible = val;
			this.on_apply_visible(val);
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_visible = function (visible) {
		if (visible) {
			this._applyPropertySeries("visible", true);
			this._setItemTextGuideLineVisible(true);

			if (this.itemtextvisible) {
				this.on_apply_itemtextvisible(true);
			}
		}
		else {
			this._applyPropertySeries("visible", false);
			this._setItemTextGuideLineVisible(false);

			if (!this._itemtextvisible) {
				this.on_apply_itemtextvisible(false);
			}
		}

		this._chart._seriesGroup.set_visible(visible);

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartPieSeriesControl.set_radius = function (val) {
		var lVal = null;
		if (val !== undefined && val !== null && val !== "") {
			if (nexacro._isNumber(val)) {
				lVal = val;
			}
			else {
				if (val.length > 0) {
					lVal = +val;
					if (isNaN(lVal)) {
						return;
					}
				}
			}
		}

		if (lVal < 0 || lVal > 100) {
			return;
		}

		if (this.radius != val) {
			this._changeContentsProperty("radius", val, this.radius);
			this.radius = val;
			this.on_apply_radius(lVal);
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_radius = function (radius) {
		if (!nexacro._GraphicsLib.isEmpty(radius)) {
			this._radius = radius * 0.01;
		}
		this._chart._recreate = true;
	};

	_pChartPieSeriesControl.set_innerradius = function (val) {
		var lVal = null;
		if (val !== undefined && val !== null && val !== "") {
			if (nexacro._isNumber(val)) {
				lVal = val;
			}
			else {
				if (val.length > 0) {
					lVal = +val;
					if (isNaN(lVal)) {
						return;
					}
				}
			}
		}

		if (val < 0 || val > 100) {
			return;
		}

		if (this.innerradius != val) {
			this._changeContentsProperty("innerradius", val, this.innerradius);
			this.innerradius = val;
			this.on_apply_innerradius(lVal);
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_innerradius = function (innerradius) {
		if (!nexacro._GraphicsLib.isEmpty(innerradius)) {
			this._innerradius = innerradius * 0.01;
		}
		this._chart._recreate = true;
	};

	_pChartPieSeriesControl.set_startangle = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}

		if (this.startangle != val) {
			this._changeContentsProperty("startangle", val, this.startangle);
			this.startangle = val;
			this.on_apply_startangle(val);
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_startangle = function (startangle) {
		var endangle = this.endangle || 360;
		if (startangle > 360) {
			startangle = 0;
		}

		var radian;
		radian = startangle * Math.PI / 180;
		this._startangle = radian;

		this._chart._changedData = true;
	};
	_pChartPieSeriesControl.set_endangle = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}

		if (this.endangle != val) {
			this._changeContentsProperty("endangle", val, this.endangle);
			this.endangle = val;
			this.on_apply_endangle(val);
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_endangle = function (endangle) {
		var startangle = this.startangle || 0;
		if (endangle > 360) {
			endangle = 360;
		}

		var radian;
		radian = endangle * Math.PI / 180;
		this._endangle = radian;

		this._chart._changedData = true;
	};

	_pChartPieSeriesControl.set_valuelineblurangle = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}

		if (this.valuelineblurangle != val) {
			if (val > this.endangle) {
				val = 0;
			}
			this._changeContentsProperty("valuelineblurangle", val, this.valuelineblurangle);
			this.valuelineblurangle = val;
			this.on_apply_valuelineblurangle(val);
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_valuelineblurangle = function (valuelineblurangle) {
		var radian;
		radian = valuelineblurangle * Math.PI / 180;
		this._valuelineblurangle = radian;

		this._chart._changedData = true;
	};

	_pChartPieSeriesControl.set_linestyle = function (val) {
		this.linestyle = val;
		if (val) {
			if (this._linestyle == null || this._linestyle.value != val) {
				var oldValue;
				if (this._linestyle) {
					oldValue = this._linestyle.value;
				}
				this._changeContentsProperty("linestyle", val, oldValue);

				var linestyle = nexacro.BorderLineObject(val);
				this._linestyle = linestyle;
				this.on_apply_linestyle(linestyle);
			}
		}
		else {
			if (this._linestyle) {
				this._linestyle = null;
				this.on_apply_linestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_linestyle = function (linestyle) {
		if (linestyle) {
			this._borderwidth = linestyle._width;
		}
		this._redrawSeries = false;
		this._applyPropertySeries("linestyle", linestyle);
	};

	_pChartPieSeriesControl.set_fillstyle = function (v) {
		this.fillstyle = v;
		var i = 0;
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				var length = val.length;
				var fillstr = "";
				var openbrackets = false;
				var closebrackets = false;

				for (i = 0; i < length; i++) {
					var sp = val[i];

					if (sp == "(") {
						openbrackets = true;
					}

					if (sp == ")") {
						if (openbrackets) {
							closebrackets = true;
						}
					}

					if (sp == ",") {
						if (openbrackets) {
							fillstr += sp;
						}
						else {
							fillstr += "/";
						}
					}
					else {
						if (sp == ")") {
							if (i == length - 1) {
								fillstr += sp;
							}
							else {
								fillstr += sp + "/";
								openbrackets = false;
								closebrackets = false;
							}
						}
						else {
							fillstr += sp;
						}
					}
				}

				var fillarr = [];
				var cnt = 0;
				var str = fillstr.split("/");
				for (i = 0; i < str.length; i++) {
					if (str[i] == "") {
						continue;
					}
					else {
						fillarr[cnt] = str[i];
						cnt++;
					}
				}
				this._fillstyle = fillarr;

				this._changedFillStyle = true;
				this._chart._changedColorset = false;
				this.on_apply_fillstyle();
			}
		}
		else {
			this._changedFillStyle = false;
			this._chart._changedColorset = true;
			this._chart.on_apply_colorset(this._chart._colorset);
			this._fillstyle = null;
			this.on_apply_fillstyle();
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_fillstyle = function () {
		if (!this._fillstyle) {
			this._redrawSeries = false;
			if (this._chart.legend) {
				this._chart._applyLegendItem();
			}
			return false;
		}

		var colors = this._fillstyle;
		var seriesitems = this._chart._seriesitems;
		var colorcnt = 0;
		var color;

		if (seriesitems) {
			for (var i = 0; i < seriesitems.length; i++) {
				var item = seriesitems[i];
				if (item && item._isShow) {
					color = colors[colorcnt];
					if (color) {
						colorcnt++;
					}
					else {
						colorcnt = 0;
					}

					if (colorcnt == 0) {
						color = colors[colorcnt];
						colorcnt++;
					}

					seriesitems[i].color = color;

					var slice = item._slice;
					if (slice) {
						slice.set_fillstyle(color);
					}
				}
			}
		}
		this._redrawSeries = false;
		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartPieSeriesControl.set_opacity = function (val) {
		this.opacity = val;
		if (0 === val || val) {
			if (this._opacity == null || this._opacity.value != val) {
				var oldValue;
				if (this._opacity) {
					oldValue = this._opacity.value;
				}
				this._changeContentsProperty("opacity", val, oldValue);

				var opacity = nexacro.OpacityObject(val);
				this._opacity = opacity;
				this.on_apply_opacity(opacity);
			}
		}
		else {
			if (this._opacity) {
				this._opacity = null;
				this.on_apply_opacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_opacity = function (opacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("opacity", opacity);
	};

	_pChartPieSeriesControl.set_itemtextguidesize = function (val) {
		var lVal = null;
		if (val !== undefined && val !== null && val !== "") {
			if (nexacro._isNumber(val)) {
				lVal = val;
			}
			else {
				if (val.length > 0) {
					lVal = +val;
					if (isNaN(lVal)) {
						return;
					}
				}
			}
		}

		if (this.itemtextguidesize != val) {
			this._changeContentsProperty("itemtextguidesize", val, this.itemtextguidesize);
			this.itemtextguidesize = val;
			this.on_apply_itemtextguidesize(lVal);
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_itemtextguidesize = function (itemtextguidesize) {
		if (itemtextguidesize > 0) {
			this._itemtextguidelocation = "out";
		}
		else {
			itemtextguidesize = Math.abs(itemtextguidesize);
			this._itemtextguidelocation = "in";
		}

		this._itemtextguidesize = itemtextguidesize;
		this._chart._recreate = true;
	};

	_pChartPieSeriesControl.set_itemtextguidelinestyle = function (val) {
		this.itemtextguidelinestyle = val;
		if (val) {
			if (this._itemtextguidelinestyle == null || this._itemtextguidelinestyle.value != val) {
				var oldValue;
				if (this._itemtextguidelinestyle) {
					oldValue = this._itemtextguidelinestyle.value;
				}
				this._changeContentsProperty("itemtextguidelinestyle", val, oldValue);

				var itemtextguidelinestyle = nexacro.BorderLineObject(val);
				this._itemtextguidelinestyle = itemtextguidelinestyle;
				this.on_apply_itemtextguidelinestyle(itemtextguidelinestyle);
			}
		}
		else {
			if (this._itemtextguidelinestyle) {
				this._itemtextguidelinestyle = null;
				this.on_apply_itemtextguidelinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_itemtextguidelinestyle = function (itemtextguidelinestyle) {
		if (this._is_initprop) {
			return;
		}

		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && !nexacro._isNull(items)) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesPieItemLine_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					item.set_strokepen(itemtextguidelinestyle ? itemtextguidelinestyle.value || itemtextguidelinestyle : "1px solid #717a8380");
				}
				else {
					this._chart._recreate = true;
				}
			}
		}
	};

	_pChartPieSeriesControl.set_itemtextguidelineopacity = function (val) {
		this.itemtextguidelineopacity = val;
		if (0 === val || val) {
			if (this._itemtextguidelineopacity == null || this._itemtextguidelineopacity.value != val) {
				var oldValue;
				if (this._itemtextguidelineopacity) {
					oldValue = this._itemtextguidelineopacity.value;
				}
				this._changeContentsProperty("itemtextguidelineopacity", val, oldValue);

				var itemtextguidelineopacity = nexacro.OpacityObject(val);
				this._itemtextguidelineopacity = itemtextguidelineopacity;
				this.on_apply_itemtextguidelineopacity(itemtextguidelineopacity);
			}
		}
		else {
			if (this._itemtextguidelineopacity) {
				this._itemtextguidelineopacity = null;
				this.on_apply_highlightopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_itemtextguidelineopacity = function (itemtextguidelineopacity) {
		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && !nexacro._isNull(items)) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesPieItemLine_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					item.set_opacity(itemtextguidelineopacity);
				}
				else {
					this._chart._recreate = true;
				}
			}
		}
	};

	_pChartPieSeriesControl.set_highlightvisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.highlightvisible != val) {
			this._changeContentsProperty("highlightvisible", val, this.highlightvisible);
			this.highlightvisible = val;
			this.on_apply_highlightvisible(val);
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_highlightvisible = function (highlightvisible) {
		this._chart._recreate = true;
	};

	_pChartPieSeriesControl.set_highlightradius = function (val) {
		var lVal = null;
		if (val !== undefined && val !== null && val !== "") {
			if (nexacro._isNumber(val)) {
				lVal = val;
			}
			else {
				if (val.length > 0) {
					lVal = +val;
					if (isNaN(lVal)) {
						return;
					}
				}
				else {
					return;
				}
			}
		}

		if (val < 0 || val > 100) {
			return;
		}

		if (this.highlightradius != val) {
			this._changeContentsProperty("highlightradius", val, this.highlightradius);
			this.highlightradius = val;
			this.on_apply_highlightradius(lVal);
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_highlightradius = function (highlightradius) {
		if (!nexacro._GraphicsLib.isEmpty(highlightradius)) {
			this._highlightradius = highlightradius * 0.01;
		}
		this._chart._recreate = true;
	};

	_pChartPieSeriesControl.set_highlightlinestyle = function (val) {
		this.highlightlinestyle = val;
		if (val) {
			if (this._highlightlinestyle == null || this._highlightlinestyle.value != val) {
				var oldValue;
				if (this._highlightlinestyle) {
					oldValue = this._highlightlinestyle.value;
				}
				this._changeContentsProperty("highlightlinestyle", val, oldValue);

				var highlightlinestyle = nexacro.BorderLineObject(val);
				this._highlightlinestyle = highlightlinestyle;
				this.on_apply_highlightlinestyle(highlightlinestyle);
			}
		}
		else {
			if (this._highlightlinestyle) {
				this._highlightlinestyle = null;
				this.on_apply_highlightlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_highlightlinestyle = function (highlightlinestyle) {
	};

	_pChartPieSeriesControl.set_highlightfillstyle = function (val) {
		this.highlightfillstyle = val;
		if (val) {
			if (this._highlightfillstyle == null || this._highlightfillstyle.value != val) {
				var oldValue;
				if (this._highlightfillstyle) {
					oldValue = this._highlightfillstyle.value;
				}
				this._changeContentsProperty("highlightfillstyle", val, oldValue);

				var highlightfillstyle = nexacro.BackgroundObject(val, this);
				this._highlightfillstyle = highlightfillstyle;
				this.on_apply_highlightfillstyle(highlightfillstyle);
			}
		}
		else {
			if (this._highlightfillstyle) {
				this._highlightfillstyle = null;
				this.on_apply_highlightfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_highlightfillstyle = function (highlightfillstyle) {
	};

	_pChartPieSeriesControl.set_highlightopacity = function (val) {
		this.highlightopacity = val;
		if (0 === val || val) {
			if (this._highlightopacity == null || this._highlightopacity.value != val) {
				var oldValue;
				if (this._highlightopacity) {
					oldValue = this._highlightopacity.value;
				}
				this._changeContentsProperty("highlightopacity", val, oldValue);

				var highlightopacity = nexacro.OpacityObject(val);
				this._highlightopacity = highlightopacity;
				this.on_apply_highlightopacity(highlightopacity);
			}
		}
		else {
			if (this._highlightopacity) {
				this._highlightopacity = null;
				this.on_apply_highlightopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_highlightopacity = function (highlightopacity) {
	};

	_pChartPieSeriesControl.set_selectlinestyle = function (val) {
		this.selectlinestyle = val;
		if (val) {
			if (this._selectlinestyle == null || this._selectlinestyle.value != val) {
				var oldValue;
				if (this._selectlinestyle) {
					oldValue = this._selectlinestyle.value;
				}
				this._changeContentsProperty("selectlinestyle", val, oldValue);

				var selectlinestyle = nexacro.BorderLineObject(val);
				this._selectlinestyle = selectlinestyle;
				this.on_apply_selectlinestyle(selectlinestyle);
			}
		}
		else {
			if (this._selectlinestyle) {
				this._selectlinestyle = null;
				this.on_apply_selectlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_selectlinestyle = function (selectlinestyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("selectlinestyle", selectlinestyle, "select");
	};

	_pChartPieSeriesControl.set_selectfillstyle = function (val) {
		this.selectfillstyle = val;
		if (val) {
			if (this._selectfillstyle == null || this._selectfillstyle.value != val) {
				var oldValue;
				if (this._selectfillstyle) {
					oldValue = this._selectfillstyle.value;
				}
				this._changeContentsProperty("selectfillstyle", val, oldValue);

				var selectfillstyle = nexacro.BackgroundObject(val, this);
				this._selectfillstyle = selectfillstyle;
				this.on_apply_selectfillstyle(selectfillstyle);
			}
		}
		else {
			if (this._selectfillstyle) {
				this._selectfillstyle = null;
				this.on_apply_selectfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_selectfillstyle = function (selectfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("selectfillstyle", selectfillstyle, "select");
	};

	_pChartPieSeriesControl.set_selectopacity = function (val) {
		this.selectopacity = val;
		if (0 === val || val) {
			if (this._selectopacity == null || this._selectopacity.value != val) {
				var oldValue;
				if (this._selectopacity) {
					oldValue = this._selectopacity.value;
				}
				this._changeContentsProperty("selectopacity", val, oldValue);

				var selectopacity = nexacro.OpacityObject(val);
				this._selectopacity = selectopacity;
				this.on_apply_selectopacity(selectopacity);
			}
		}
		else {
			if (this._selectopacity) {
				this._selectopacity = null;
				this.on_apply_selectopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_selectopacity = function (selectopacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("selectopacity", selectopacity, "select");
	};

	_pChartPieSeriesControl.set_selectindent = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val)) {
				return;
			}
		}

		if (this.selectindent != val) {
			this._changeContentsProperty("selectindent", val, this.selectindent);
			this.selectindent = val;
			this.on_apply_selectindent();
		}

		this._chart._draw();
	};

	_pChartPieSeriesControl.on_apply_selectindent = function () {
		this._chart._recreate = true;
	};


	_pChartPieSeriesControl._applyPropertySeries = function (style, value, select) {
		var item, seriesGroup, itemID, isselectitem = false;

		seriesGroup = this._chart._graphicsControl.getObjectByID("ChartSeriesGroup");
		if (seriesGroup) {
			for (var i = 1; i <= this._itemCnt; i++) {
				itemID = this._configIndex + " SeriesPie" + "Item_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (!nexacro._isNull(item)) {
					var length = this._selectedItem.length;
					if (length > 0) {
						isselectitem = this._selectedItem[i - 1];
					}

					if (isselectitem) {
						if (style == "selectlinestyle") {
							item.set_strokepen(value);
						}
						else if (style == "selectfillstyle") {
							item.set_fillstyle(value);
						}
						else if (style == "selectopacity") {
							item.set_opacity(value);
						}
					}
					else {
						if (style == "visible") {
							item.set_visible(value);
						}
						else if (style == "linestyle") {
							item.set_strokepen(value);
						}
						else if (style == "opacity") {
							item.set_opacity(value);
						}
					}
				}
			}
		}
	};

	_pChartPieSeriesControl._setItemTextGuideLineVisible = function (visible) {
		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && !nexacro._isNull(items)) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesPieItemLine_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					item.set_visible(visible);
				}
				else {
					this._chart._recreate = true;
				}
			}
		}
	};

	_pChartPieSeriesControl._draw2 = function (redraw) {
		if (!redraw) {
			return;
		}

		this._drawPieSeries();
	};
	_pChartPieSeriesControl._draw = function (redraw) {
		nexacro._SeriesBase.prototype._draw.call(this);
		var effect = this._chart_aniframe_obj;
		if (!redraw) {
			if (this._chart._isanimationloading) {
				this._end_animation_series_callback();
			}
			return;
		}
		this._itemCnt = 0;
		this._itemtextlist = [];
		if (effect.enableanimation) {
			if (this._chart._isanimationloading) {
				this._end_animation_series_callback();
			}
			else {
				this._start_animate();
			}
		}
		else {
			this._drawnow();
		}
	};
	_pChartPieSeriesControl._drawnow = function () {
		this._itemCnt = 0;
		this._itemtextlist = [];
		this._drawPieSeries();
	};
	_pChartPieSeriesControl._setItemData = function () {
		var data = this._data, itemdata;

		if (data) {
			itemdata = this._processItemData(data);
		}
		return itemdata;
	};

	_pChartPieSeriesControl._setItemColor = function (items) {
		var colorcnt = 0;
		var colorset = this._chart._colorset;
		var item;

		for (var i = 0; i < items.length; i++) {
			item = items[i];
			if (item._isShow && item.value) {
				var itemColor = colorset[colorcnt];
				if (itemColor) {
					colorcnt++;
				}
				else {
					colorcnt = 0;
				}

				if (colorcnt == 0) {
					itemColor = colorset[colorcnt];
					colorcnt++;
				}

				items[i].color = itemColor;
				var slice = items[i]._slice;
				if (slice) {
					slice.set_fillstyle(itemColor);
				}
			}
		}
	};
	_pChartPieSeriesControl._rearrangeProcessItemData = function (arritems, drawpercentangle) {
		var total = 0;

		var items = arritems || this._seriesitems;
		var i = 0;
		var value;
		for (i = 0; i < items.length; ++i) {
			if (items[i]._isShow) {
				value = items[i].value;
				if (value) {
					total += items[i].value;
				}
			}
		}

		for (i = 0; i < items.length; ++i) {
			value = 0;
			var percent = 0;
			var angle = 0;
			var endangle = drawpercentangle || this._endangle || Math.PI * 2;
			value = items[i].value;
			angle = value * endangle / total;
			percent = (value / (total / 100)).toFixed(2);

			items[i].angle = angle;
			items[i].percent = nexacro.toNumber(percent);
		}

		return items;
	};
	_pChartPieSeriesControl._processItemData = function (data) {
		var length = data.length, slice = [], i = 0, value, total = 0;

		for (i = 0; i < length; i++) {
			var seriesItems = {
			};
			var showFlag = true;

			if (data[i] != null && data[i][0] != undefined) {
				if (!this._clickShow && (this._clickItemIndex.length > 0)) {
					for (var j = 0; j < this._clickItemIndex.length; j++) {
						var index = this._clickItemIndex[j];
						if (i == index) {
							showFlag = false;
						}
					}
				}

				if (!showFlag) {
					seriesItems._isShow = false;
				}
				else {
					seriesItems._isShow = true;
				}

				seriesItems.index = i;
				seriesItems.category = data[i][0];
				seriesItems.value = parseFloat(data[i][1]) || 0;
				slice.push(seriesItems);
			}
		}
		this._seriesitems = slice;

		var items = this._seriesitems;
		for (i = 0; i < items.length; ++i) {
			if (items[i]._isShow) {
				value = items[i].value;
				if (value) {
					total += items[i].value;
				}
			}
		}

		for (i = 0; i < items.length; ++i) {
			value = 0;
			var percent = 0;
			var angle = 0;
			var endangle = this._endangle || Math.PI * 2;
			value = items[i].value;
			angle = value * endangle / total;
			percent = (value / (total / 100)).toFixed(2);

			items[i].angle = angle;
			items[i].percent = nexacro.toNumber(percent);
		}

		return items;
	};

	_pChartPieSeriesControl._drawPieSeries = function () {
		var items = this._seriesitems, isNullData = false, board = this._chart._boardRect, boardWidth = 0, boardHeight = 0, borderWidth = this._chart._boardBorderWidth, borderHeight = this._chart._boardBorderHeight, effect = this._chart_aniframe_obj, itemtextvisible = this.itemtextvisible;


		if (!items) {
			return false;
		}

		if (board) {
			this._chart._boardWidth = board.width - borderWidth;
			this._chart._boardHeight = board.height - borderHeight;
			this._chart._centerLeft = this._chart._boardWidth / 2;
			this._chart._centerTop = this._chart._boardHeight / 2;
		}

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item && item._isShow) {
				var category = item.category, value = item.value;
				if (category == null || value === undefined || value === null) {
					isNullData = true;
					break;
				}
			}
		}

		if (items.length <= 0 || isNullData) {
			return;
		}


		this._drawPie();

		if (itemtextvisible) {
			if (effect && effect.isloadanimation) {
			}
			else {
				this._drawLabels();
			}
		}
	};

	_pChartPieSeriesControl._drawPie = function () {
		var chart = this._chart, rEndAngle = this._endangle || 6.28319, rStartAngle = this._startangle || 0, rHighlightStartAngle = this._startangle || 0, rHighlightEndAngle = 0, maxRadius = Math.min(this._chart._boardWidth, this._chart._boardHeight) / 2, radius = 0, innerradius = 0, total = 0, centerX = this._chart._centerLeft, centerY = this._chart._centerTop, linestyle = this.linestyle, opacity = this.opacity, selectlinestyle = this.selectlinestyle || this._chart._selectcolorset[0], selectfillstyle = this.selectfillstyle || this._chart._selectcolorset[0], selectopacity = this.selectopacity || this.opacity, selectedallItem = this._selectedItem, selectedItem = [], isselectitem = false, allitems = this._seriesitems.slice(0), items = [], innerw, innerh, seriesGroup = chart._seriesGroup, slice, itemId, currentAngle = this._startangle || 0, endangle = this._endangle || 6.28319, drawitemCnt = 0, effect = this._chart_aniframe_obj, i = 0, selectlength = 0, angles, valuedata, pThis = this;

		if (effect && effect.isloadanimation) {
			angles = pThis._getanimationdrawvalue(rEndAngle);

			rStartAngle = angles[0];
			rEndAngle = angles[1];
			endangle = angles[1];

			allitems = pThis._rearrangeProcessItemData(allitems, rEndAngle);
		}
		if (nexacro._GraphicsLib.isEmpty(this.radius)) {
			radius = maxRadius * 0.8;
		}
		else {
			radius = maxRadius * this._radius;
		}

		if (nexacro._GraphicsLib.isEmpty(this.innerradius)) {
			innerradius = 0;
		}
		else {
			innerradius = maxRadius * this._innerradius;
		}

		if (radius <= innerradius) {
			innerradius = 0;
		}

		for (i in allitems) {
			if (allitems[i]._isShow) {
				total += allitems[i].value;
			}
		}



		for (i = 0; i < allitems.length; i++) {
			selectlength = selectedItem.length;
			if (selectlength > 0) {
				isselectitem = selectedItem[i];
			}
			if (effect && effect.isloadanimation) {
				isselectitem = false;
			}
			valuedata = allitems[i].value;
			if (valuedata && allitems[i]._isShow) {
				selectlength = selectedallItem.length;
				if (selectlength > 0) {
					selectedItem.push(selectedallItem[i]);
				}

				items.push(allitems[i]);
			}
			this._itemCnt++;
		}
		function drawSlice (pThis, i) {
			if (items[i]._isShow) {
				var angle = items[i].angle;
				var curAngle = items[i].angle * 180 / Math.PI;
				var valuelineblurangle = pThis._valuelineblurangle || 0;

				if (items.length == 1) {
					rStartAngle = 0;

					rHighlightStartAngle = 0;
					rHighlightEndAngle = rEndAngle;
				}
				else {
					items[i].isskip = true;
					items[i].nextskip = true;

					var _valuelineblurangle = pThis._valuelineblurangle || 0;
					var valuelineblurhalfangle = _valuelineblurangle / 2;
					var nextAngle = 0;
					var next2Angle = 0;
					var prevAngle = 0;
					if (valuelineblurangle <= curAngle) {
						if (i == 0) {
							nextAngle = items[i + 1].angle * 180 / Math.PI;
							prevAngle = items[items.length - 1].angle * 180 / Math.PI;

							if (items.length > 3) {
								next2Angle = items[i + 2].angle * 180 / Math.PI;
							}
							else {
								next2Angle = items[i + 1].angle * 180 / Math.PI;
							}

							if (valuelineblurangle <= nextAngle) {
								if (valuelineblurangle <= prevAngle) {
									items[i].isskip = false;
									if (valuelineblurangle <= next2Angle) {
										items[i].nextskip = false;
									}
								}
							}
						}
						else {
							if (i == items.length - 1) {
								nextAngle = items[0].angle * 180 / Math.PI;
								prevAngle = items[items.length - 2].angle * 180 / Math.PI;
								next2Angle = items[i].angle * 180 / Math.PI;
							}
							else {
								nextAngle = items[i + 1].angle * 180 / Math.PI;
								prevAngle = items[i - 1].angle * 180 / Math.PI;
								next2Angle = i < items.length - 2 ? items[i + 2].angle * 180 / Math.PI : items[items.length % (i + 2)].angle * 180 / Math.PI;
							}

							if (valuelineblurangle <= nextAngle) {
								if (valuelineblurangle <= prevAngle) {
									items[i].isskip = false;
								}

								if (valuelineblurangle <= next2Angle) {
									items[i].nextskip = false;
								}
							}
						}
					}

					if (!items[i].isskip) {
						if (!items[i].nextskip) {
							if (i == 0) {
								rStartAngle += valuelineblurhalfangle;
							}

							rEndAngle = rStartAngle + (endangle * (items[i].value / total)) - _valuelineblurangle;
						}
						else {
							rEndAngle = rStartAngle + (endangle * (items[i].value / total));
						}
					}
					else {
						rEndAngle = rStartAngle + (endangle * (items[i].value / total));
					}

					items[i].rStartAngle = rStartAngle;
					items[i].rEndAngle = rEndAngle;

					rHighlightEndAngle = rHighlightStartAngle + (endangle * (items[i].value / total));
				}


				var startAngle = Math.round(rStartAngle * 180 / Math.PI), endAngle = Math.round(rEndAngle * 180 / Math.PI), highlightStartAngle = rHighlightStartAngle * 180 / Math.PI, highlightEndAngle = rHighlightEndAngle * 180 / Math.PI, w = radius, h = radius, p0, p1, p2, p3, la, lb, pathData, index = 0, dx = 0, dy = 0, centerX = pThis._chart._centerLeft, centerY = pThis._chart._centerTop, selectindent = 0, startangle = pThis._startangle || 0;

				if (pThis.selectindent < 0 || nexacro._GraphicsLib.isEmpty(pThis.selectindent)) {
					selectindent = 0;
				}
				else {
					selectindent = pThis.selectindent / 100;
				}

				items[i].startAngle = startAngle;
				items[i].endAngle = endAngle;
				items[i].angle = angle;


				if (drawitemCnt == 0) {
					currentAngle = 4.71238898038469;
				}
				else {
					currentAngle += items[drawitemCnt - 1].angle;
				}

				if (isselectitem) {
					selectindent = radius * selectindent;

					dx = Math.cos(currentAngle + angle / 2 + startangle) * selectindent;
					dy = Math.sin(currentAngle + angle / 2 + startangle) * selectindent;

					centerX = centerX + dx;
					centerY = centerY + dy;

					items[i].selectindentX = centerX;
					items[i].selectindentY = centerY;
				}

				p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
				p1 = (Math.sin(rEndAngle) * w + centerX) + " " + (-Math.cos(rEndAngle) * h + centerY);

				la = Math.abs(startAngle - endAngle) > 180 ? " 1" : " 0";

				if (!nexacro._GraphicsLib.isEmpty(innerradius) && innerradius > 0) {
					if (items.length == 1) {
						pathData = "M" + p0 + " A" + w + " " + h + " 1" + la + " 0 " + p1;
					}
					else {
						pathData = "M" + p0 + " A" + w + " " + h + " 1" + la + " 1 " + p1;
					}

					innerw = innerh = innerradius;

					p2 = (Math.sin(rStartAngle) * innerw + centerX) + " " + (-Math.cos(rStartAngle) * innerh + centerY);
					p3 = (Math.sin(rEndAngle) * innerw + centerX) + " " + (-Math.cos(rEndAngle) * innerh + centerY);



					if (items.length == 1) {
						pathData += " L" + p3 + " A" + innerw + " " + innerh + " 1" + la + " 1 " + p2 + " Z";
					}
					else {
						pathData += " L" + p3 + " A" + innerw + " " + innerh + " 1" + la + " 0 " + p2 + " Z";
					}
				}
				else {
					if (items.length == 1) {
						pathData = "M" + p0 + " A" + w + " " + h + " 1 1 0 " + p1 + " L" + centerX + " " + centerY + "Z";
					}
					else {
						pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + p1 + " L" + centerX + " " + centerY + " L" + p0 + "Z";
					}
				}



				items[i].pathData = pathData;


				index = i + 1;
				itemId = pThis._configIndex + " SeriesPieItem_" + index;
				slice = seriesGroup.getObjectByID(itemId);
				if (slice) {
				}
				else {
					slice = new nexacro.GraphicsPath();
					slice.set_id(itemId);
					seriesGroup.addChild(slice);
				}


				slice._seriesItem = items[i];
				slice._series = pThis;
				slice.setPathData(pathData);
				items[i]._slice = slice;

				if (pThis.highlightvisible) {
					var highlightradius = pThis.highlightradius, hRadius = 0, maxRadius = Math.min(pThis._chart._boardWidth, pThis._chart._boardHeight) / 2, highlightPathData;
					w = h = 0;
					if ((highlightradius == "" || highlightradius == undefined) && highlightradius !== 0) {
						if (radius) {
							hRadius = radius + 5;
						}
					}
					else {
						if (innerradius > 0 && innerradius >= highlightradius) {
							hRadius = innerradius;
						}
						else {
							hRadius = pThis._highlightradius * maxRadius;
						}
					}

					w = h = hRadius;

					p0 = (Math.sin(rHighlightStartAngle) * w + centerX) + " " + (-Math.cos(rHighlightStartAngle) * h + centerY);
					p1 = (Math.sin(rHighlightEndAngle) * w + centerX) + " " + (-Math.cos(rHighlightEndAngle) * h + centerY);

					la = Math.abs(highlightStartAngle - highlightEndAngle) > 180 ? " 1" : " 0";

					if (innerradius > 0) {
						if (items.length == 1) {
							highlightPathData = "M" + p0 + " A" + w + " " + h + " 1" + la + " 0 " + p1;
						}
						else {
							highlightPathData = "M" + p0 + " A" + w + " " + h + " 1" + la + " 1 " + p1;
						}

						innerw = innerh = innerradius;

						p2 = (Math.sin(rHighlightStartAngle) * innerw + centerX) + " " + (-Math.cos(rHighlightStartAngle) * innerh + centerY);
						p3 = (Math.sin(rHighlightEndAngle) * innerw + centerX) + " " + (-Math.cos(rHighlightEndAngle) * innerh + centerY);

						if (items.length == 1) {
							highlightPathData += " L" + p3 + " A" + innerw + " " + innerh + " 1" + la + " 1 " + p2 + " Z";
						}
						else {
							highlightPathData += " L" + p3 + " A" + innerw + " " + innerh + " 1" + la + " 0 " + p2 + " Z";
						}
					}
					else {
						if (items.length == 1) {
							highlightPathData = "M" + p0 + " A" + w + " " + h + " 1 1 0 " + p1 + " L" + centerX + " " + centerY;
						}
						else {
							highlightPathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + p1 + " L" + centerX + " " + centerY + " L" + p0 + "Z";
						}
					}

					slice.highlightPathData = highlightPathData;
					slice.highlightvisible = true;
				}

				if (isselectitem) {
					if (nexacro._isNull(selectfillstyle)) {
						selectfillstyle = items[i].color;
					}
					slice.set_strokepen(selectlinestyle);
					slice.set_fillstyle(selectfillstyle);
					slice.set_opacity(selectopacity);
				}
				else {
					if (!valuelineblurangle) {
						slice.set_strokepen(linestyle ? linestyle.value || linestyle : "1px solid #717a8380");
					}

					slice.set_fillstyle(items[i].color);
					slice.set_opacity(opacity);
				}

				slice.set_strokejoin("round");

				slice._series = pThis;
				rStartAngle += endangle * (items[i].value / total);
				rHighlightStartAngle += endangle * (items[i].value / total);
			}
		}

		function drawSliceBorder (pThis, i) {
			if (items[i]._isShow) {
				var angle = items[i].angle;
				var curAngle = items[i].angle * 180 / Math.PI;
				var valuelineblurangle = pThis._valuelineblurangle || 0;
				var rStartAngle;
				var rEndAngle;
				var rStartAngle1;
				var rEndAngle1;
				var isskip = false;


				if (items.length == 1) {
					rStartAngle = 0;
					rEndAngle = this._endangle || 6.28319;
					if (effect && effect.isloadanimation) {
						var angles = pThis._getanimationdrawvalue(rEndAngle);

						rStartAngle = angles[0];
						rEndAngle = angles[1];
					}
				}
				else {
					isskip = items[i].isskip;
					if (!isskip) {
						if (i == 0) {
							rStartAngle1 = items[i].rEndAngle;
							rEndAngle1 = items[i + 1].rStartAngle;

							rStartAngle = items[i].rEndAngle - 0.08;
							rEndAngle = items[i + 1].rStartAngle + 0.08;
						}
						else if (i == items.length - 1) {
							rStartAngle1 = items[items.length - 1].rEndAngle;
							rEndAngle1 = rStartAngle + valuelineblurangle;

							rStartAngle = items[items.length - 1].rEndAngle - 0.08;
							rEndAngle = rStartAngle + valuelineblurangle + 0.15;
						}
						else {
							rStartAngle1 = items[i].rEndAngle;
							rEndAngle1 = items[i + 1].rStartAngle;

							rStartAngle = items[i].rEndAngle - 0.08;
							rEndAngle = items[i + 1].rStartAngle + 0.08;
						}
					}
				}

				var startAngle = Math.round(rStartAngle * 180 / Math.PI), endAngle = Math.round(rEndAngle * 180 / Math.PI), w = radius, h = radius, p0, p1, p2, p3, la, lb, pathData, index = 0, dx = 0, dy = 0, centerX = pThis._chart._centerLeft, centerY = pThis._chart._centerTop, selectindent = (pThis.selectindent || 0) / 100;

				items[i].startAngle = startAngle;
				items[i].endAngle = endAngle;
				items[i].angle = angle;


				if (drawitemCnt == 0) {
					currentAngle = 4.71238898038469;
				}
				else {
					currentAngle += items[drawitemCnt - 1].angle;
				}

				p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
				p1 = (Math.sin(rEndAngle) * w + centerX) + " " + (-Math.cos(rEndAngle) * h + centerY);



				la = Math.abs(startAngle - endAngle) > 180 ? " 1" : " 0";

				if (!nexacro._GraphicsLib.isEmpty(innerradius) && innerradius > 0) {
					if (items.length == 1) {
						pathData = "M" + p0 + " A" + w + " " + h + " 1" + la + " 0 " + p1;
					}
					else {
						pathData = "M" + p0 + " A" + w + " " + h + " 1" + la + " 1 " + p1;
					}

					innerw = innerh = innerradius;

					p2 = (Math.sin(rStartAngle) * innerw + centerX) + " " + (-Math.cos(rStartAngle) * innerh + centerY);
					p3 = (Math.sin(rEndAngle) * innerw + centerX) + " " + (-Math.cos(rEndAngle) * innerh + centerY);



					if (items.length == 1) {
						pathData += " L" + p3 + " A" + innerw + " " + innerh + " 1" + la + " 1 " + p2 + " Z";
					}
					else {
						pathData += " L" + p3 + " A" + innerw + " " + innerh + " 1" + la + " 0 " + p2 + " Z";
					}
				}
				else {
					if (items.length == 1) {
						pathData = "M" + p0 + " A" + w + " " + h + " 1 1 0 " + p1 + " L" + centerX + " " + centerY + "Z";
					}
					else {
						pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + p1 + " L" + centerX + " " + centerY + " L" + p0 + "Z";
					}
				}

				items[i].pathData = pathData;
				index = i;
				itemId = pThis._configIndex + " SeriesPieItemBorder_" + index;
				slice = seriesGroup.getObjectByID(itemId);
				if (slice) {
					slice.setPathData(pathData);
				}
				else {
					slice = new nexacro.GraphicsPath();
					slice.set_id(itemId);
					slice.setPathData(pathData);



					if (!isskip) {
						seriesGroup.addChild(slice);
					}
				}

				slice._seriesItem = items[i];
				slice._series = pThis;
				items[i]._sliceborder = slice;

				var firstcolor;
				var secondcolor;
				var endindex = items.length - 1;

				if (i == endindex) {
					firstcolor = items[i].color;
					secondcolor = items[0].color;
				}
				else {
					firstcolor = items[i].color;
					secondcolor = items[i + 1].color;
				}

				var startAngle1 = Math.round(rStartAngle1 * 180 / Math.PI);

				var startangle = pThis.startangle || 0;
				if (startAngle1 >= this.endangle) {
					startAngle = startAngle1 % this.endangle;
				}


				if (startAngle1 >= 0 && startAngle1 < 45) {
					angle = "to right";
				}
				else if (startAngle1 >= 45 && startAngle1 < 90) {
					angle = "to bottom";
				}
				else if (startAngle1 >= 90 && startAngle1 < 135) {
					angle = "to bottom";
				}
				else if (startAngle1 >= 135 && startAngle1 < 180) {
					angle = "to left";
				}
				else if (startAngle1 >= 180 && startAngle1 < 225) {
					angle = "to left";
				}
				else if (startAngle1 >= 225 && startAngle1 < 270) {
					angle = "to top";
				}
				else if (startAngle1 >= 270 && startAngle1 < 315) {
					angle = "to top";
				}
				else if (startAngle1 >= 315 && startAngle1 < 360) {
					angle = "to right";
				}

				var gradation = "linear-gradient(" + angle + "," + firstcolor + "," + secondcolor + ")";


				if (slice) {
					slice.set_fillstyle(gradation);
					slice.set_opacity(opacity);
					slice.set_strokejoin("round");
				}
			}
		}
		for (i = 0; i < items.length; i++) {
			selectlength = selectedItem.length;
			if (selectlength > 0) {
				isselectitem = selectedItem[i];
			}
			if (effect && effect.isloadanimation) {
				isselectitem = false;
			}
			drawSlice(this, i);
			drawitemCnt++;
		}
		var valuelineblurangle = this.valuelineblurangle;
		if (valuelineblurangle) {
			drawitemCnt = 0;
			rStartAngle = this._startangle || 0;
			rEndAngle = this._endangle || 6.28319;
			if (effect && effect.isloadanimation) {
				angles = pThis._getanimationdrawvalue(rEndAngle);

				rStartAngle = angles[0];
				rEndAngle = angles[1];
			}
			for (i = 0; i < items.length; i++) {
				valuedata = items[i].value;
				var isskip = items[i].isskip;
				if (!isskip) {
					if (valuedata) {
						drawSliceBorder(this, i);
					}
				}
				drawitemCnt++;
			}
		}
	};


	_pChartPieSeriesControl._drawLabels = function () {
		var startAngle = this._startangle || 0, items, selectedItem = this._selectedItem, isselectitem = false, pThis = this;

		items = this._seriesitems;
		function getDistance (x1, y1, x2, y2) {
			var nLen = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
			return nLen;
		}
		function getUnitVector (ptAnchor, ptPos) {
			var pt = {
				x : 0, 
				y : 0
			};
			if (ptAnchor.x - ptPos.x == 0 && ptAnchor.y - ptPos.y == 0) {
				return pt;
			}

			var dx = ptAnchor.x - ptPos.x;
			var dy = ptAnchor.y - ptPos.y;

			var len = getDistance(ptAnchor.x, ptAnchor.y, ptPos.x, ptPos.y);
			pt.x = dx / len;
			pt.y = dy / len;

			return pt;
		}
		function drawLabel (item, startangle, index, pThis) {
			var labelAngle = 0, halfAngle = 0, sAngle = 0, angle = 0, eAngle = 0, chart = pThis._chart, maxRadius = Math.min(pThis._chart._boardWidth, pThis._chart._boardHeight) / 2, centerX = pThis._chart._centerLeft, centerY = pThis._chart._centerTop, itemText, itemtextguidesize = pThis._itemtextguidesize, textX = 0, textY = 0, itempointsize, pointx, pointy, itemtextguidelinestyle = pThis.itemtextguidelinestyle, itemtextguidelineopacity = pThis.itemtextguidelineopacity, guideStyle, guideline, seriesGroup = pThis._chart._seriesGroup, itemtextguidelocation = pThis._itemtextguidelocation, itemId, radius, targetX = 0, targetY = 0, borderwidth = pThis._borderwidth;

			if (nexacro._GraphicsLib.isEmpty(pThis.radius)) {
				radius = maxRadius * 0.8;
			}
			else {
				radius = maxRadius * pThis._radius;
			}

			if (isselectitem) {
				var selectindentX = item.selectindentX;
				var selectindentY = item.selectindentY;

				centerX = selectindentX;
				centerY = selectindentY;
			}

			var rStartAngle = item.rStartAngle, itemendAngle = item.endAngle, itemangle = item.angle;

			halfAngle = ((startangle + item.angle) + startangle) / 2;

			if (itemtextguidelocation == "in") {
				if (radius > maxRadius) {
					itempointsize = maxRadius + (borderwidth / 2);
				}
				else {
					itempointsize = radius + (borderwidth / 2);
				}
				itemtextguidesize = itempointsize - itemtextguidesize;
				if (itemtextguidesize <= 0) {
					textX = centerX + Math.round(Math.sin(halfAngle) * (itempointsize));
					textY = centerY - Math.round(Math.cos(halfAngle) * (itempointsize));
				}
				else {
					textX = centerX + Math.round(Math.sin(halfAngle) * (itemtextguidesize));
					textY = centerY - Math.round(Math.cos(halfAngle) * (itemtextguidesize));
				}
			}
			else {
				itemtextguidesize = itemtextguidesize / 2;
				textX = centerX + Math.round(Math.sin(halfAngle) * (itemtextguidesize));
				textY = centerY - Math.round(Math.cos(halfAngle) * (itemtextguidesize));

				if (radius > maxRadius) {
					itempointsize = maxRadius + (borderwidth / 2);
				}
				else {
					itempointsize = radius + (borderwidth / 2);
				}

				pointx = centerX + Math.round(Math.sin(halfAngle) * (itempointsize));
				pointy = centerY - Math.round(Math.cos(halfAngle) * (itempointsize));
			}

			itemText = pThis._createSeriesItemText(item);
			if (!nexacro._isNull(itemText)) {
				var items = pThis._seriesitems;
				if (itemtextguidelocation == "out") {
					if (items.length == 1) {
						itemText.set_verticalAlign("top");
						itemText.set_textAlign("right");
					}
					else {
						if (textY > centerY) {
							itemText.set_verticalAlign("top");
						}
						else if (textY == centerY) {
							itemText.set_verticalAlign("middle");
						}
						else if (textY < centerY) {
							itemText.set_verticalAlign("bottom");
						}

						if (textX > centerX) {
							itemText.set_textAlign("left");
						}
						else if (textX == centerX) {
							itemText.set_textAlign("center");
						}
						else if (textX < centerX) {
							itemText.set_textAlign("right");
						}
					}
				}
				else {
					itemText.set_verticalAlign("middle");
					itemText.set_textAlign("center");
				}

				if (itemtextguidelocation == "out") {
					var titlealign, titlehalign, titlevalign, centerAngle = halfAngle * 180 / Math.PI, ptPos = {
						x : pointx, 
						y : pointy
					}, originpoint = {
						x : centerX, 
						y : centerY
					}, vPoint = {
						x : 0, 
						y : 0
					}, vUnit, rotateX = 0, rotateY = 0;
					targetX = 0, 
						targetY = 0;

					vUnit = getUnitVector(ptPos, originpoint);

					rotateX = ptPos.x + vUnit.x * itemtextguidesize;
					rotateY = ptPos.y + vUnit.y * itemtextguidesize;

					if ((0 <= Number(centerAngle) && Number(centerAngle) < 90) || (360 <= Number(centerAngle) && Number(centerAngle) < 450)) {
						targetX = rotateX + itemtextguidesize;
					}
					else if ((90 <= Number(centerAngle) && Number(centerAngle) < 180) || (450 <= Number(centerAngle) && Number(centerAngle) < 540)) {
						targetX = rotateX + itemtextguidesize;
					}
					else if ((180 <= Number(centerAngle) && Number(centerAngle) < 270) || (540 <= Number(centerAngle) && Number(centerAngle) < 630)) {
						targetX = rotateX - itemtextguidesize;
					}
					else {
						targetX = rotateX - itemtextguidesize;
					}
					targetY = rotateY;

					guideline = new nexacro.GraphicsPath();
					itemId = pThis._configIndex + " SeriesPieItemLine_" + index;

					guideline.set_id(itemId);
					guideline.set_strokepen(itemtextguidelinestyle ? itemtextguidelinestyle.value || itemtextguidelinestyle : "1px solid #717a8380");
					guideline.set_opacity(itemtextguidelineopacity);
					guideline.moveTo(ptPos.x, ptPos.y);
					guideline.lineTo(rotateX, rotateY);
					guideline.lineTo(targetX, targetY);

					seriesGroup.addChild(guideline);
					guideline._series = pThis;
					guideline._seriesItem = item;
					guideline.index = itemText.index;
					guideline.value = itemText.value;
				}

				if (itemtextguidelocation == "out") {
					textX = targetX;
					textY = targetY;
				}

				itemText.set_x(textX);
				itemText.set_y(textY);
				seriesGroup.addChild(itemText);
				itemText._series = pThis;
				itemText._seriesItem = item;
				var board = pThis._chart._boardRect, borderWidth = pThis._chart._boardBorderWidth, borderHeight = pThis._chart._boardBorderHeight;

				pThis._chart._setChangeInBoardAreaPos(itemText);
			}
		}
		for (var i = 0; i < this._itemCnt; i++) {
			var length = selectedItem.length;
			if (length > 0) {
				isselectitem = selectedItem[i];
			}

			var valuedata = items[i].value;
			if (valuedata && items[i]._isShow) {
				drawLabel(items[i], startAngle, i, pThis);
				startAngle += items[i].angle;
			}
		}
	};

	_pChartPieSeriesControl._showHighlight = function (item) {
		if (!this.highlightvisible) {
			return;
		}

		var highlight = item._highlight;
		if (!highlight) {
			this._drawHighlight(item);


			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, false);
			this._chart._graphicsControl.draw();
		}
	};

	_pChartPieSeriesControl._hideHighlight = function (item) {
		if (!this.highlightvisible) {
			return;
		}

		var highlight = item._highlight;
		if (highlight && !nexacro._GraphicsLib.isEmpty(highlight.parent)) {
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, true);
			this._chart._highlightGroup.removeChild(highlight);
			delete item._highlight;

			this._chart._graphicsControl.draw();
		}
	};

	_pChartPieSeriesControl._drawHighlight = function (item) {
		var highlightlinestyle = this.highlightlinestyle || "1px solid " + this._chart._highlightcolorset[0], highlightfillstyle = this.highlightfillstyle || this._chart._highlightcolorset[0], highlightopacity = this.highlightopacity, slice, highlightPathData, highlightGroup = this._chart._highlightGroup;

		if (item) {
			highlightPathData = item.highlightPathData;
			if (highlightPathData) {
				slice = new nexacro.GraphicsPath();
				slice.setPathData(highlightPathData);
				slice.set_id("SeriesHighlightPieItem");
				slice.set_strokepen(highlightlinestyle);
				slice.set_fillstyle(highlightfillstyle);
				slice.set_strokejoin("round");
				slice.set_opacity(highlightopacity);

				highlightGroup.addChild(slice);

				item._highlight = slice;
				slice._item = item;
				slice._series = this;
			}
		}
	};

	_pChartPieSeriesControl._afterSetProperties = function () {
		var legend = this._chart.legend;
		if (legend) {
			this._chart._applyLegendItem();
		}
	};

	delete _pChartPieSeriesControl;
}
