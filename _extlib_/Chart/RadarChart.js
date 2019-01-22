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

if (!nexacro.RadarChart) {
	nexacro.RadarChart = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._ChartBase.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this.categorycolumn = new nexacro.BindableValue("");
		this._visibleSeriesset = [];
		this._radarangleinfo = [];
		this.valueaxes = [];
	};

	var _pRadarChart = nexacro._createPrototype(nexacro._ChartBase, nexacro.RadarChart);
	nexacro.RadarChart.prototype = _pRadarChart;
	_pRadarChart._type_name = "RadarChart";






	_pRadarChart.categoryaxis = null;
	_pRadarChart.valueaxes = null;
	_pRadarChart.radius = undefined;
	_pRadarChart.radartype = "polygon";


	_pRadarChart._boardWidth = 0;
	_pRadarChart._boardHeight = 0;
	_pRadarChart._centerLeft = 0;
	_pRadarChart._centerTop = 0;

	_pRadarChart._drawing = false;
	_pRadarChart._isnegativedata = false;
	_pRadarChart._invalidcategorycolumn = false;
	_pRadarChart._startangle = null;
	_pRadarChart._endangle = null;






	_pRadarChart.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			nexacro._ChartBase.prototype.on_create_contents.call(this);
		}
	};
	_pRadarChart.on_destroy_contents = function () {
		this.categorycolumn = null;
		this._boardWidth = null;
		this._boardHeight = null;
		this._centerLeft = null;
		this._centerTop = null;


		this._drawing = null;
		this._isnegativedata = null;
		this._invalidcategorycolumn = null;
		this._visibleSeriesset = null;
		this._radarangleinfo = null;

		if (this.valueaxes.length) {
			this.deleteAllValueaxis();
		}

		if (this.categoryaxis) {
			this._deleteCategoryaxis();
		}

		this.valueaxes = null;
		this.categoryaxis = null;

		nexacro._ChartBase.prototype.on_destroy_contents.call(this);

		return true;
	};


	_pRadarChart.set_categoryaxis = function () {
	};
	_pRadarChart.set_valueaxes = function () {
	};

	_pRadarChart.set_radius = function (val) {
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
			this.radius = val;
			this.on_apply_radius(lVal);
		}

		this._draw();
	};

	_pRadarChart.on_apply_radius = function (radius) {
		if (!nexacro._GraphicsLib.isEmpty(radius)) {
			this._radius = radius * 0.01;
		}
		this._changedData = true;
	};

	_pRadarChart.set_radartype = function (val) {
		var axislinetype_enum = ["polygon", "circle"];
		if (axislinetype_enum.indexOf(val) == -1) {
			return;
		}

		if (this.radartype != val) {
			this.radartype = val;
			this.on_apply_radartype();
			this._draw();
		}
	};
	_pRadarChart.on_apply_radartype = function () {
		this._rearrange = true;
	};
	_pRadarChart.on_apply_categorycolumn = function () {
		this.on_apply_binddataset();
	};
	_pRadarChart._createSubControl = function (contents) {
		if (!contents) {
			return false;
		}

		this._createBoard();

		var capitalize = nexacro._GraphicsLibString.capitalize;
		var capNm;
		var value;
		var setter;
		var charttype = this._type_name;
		var subControl;
		var createdCategoryaxis = false;
		var createdValueaxis = false;
		var axis;
		nexacro._GraphicsLibArray.forEach(this._createdOrder, function (name, index) {
			if (!contents.hasOwnProperty(name)) {
				return false;
			}

			value = contents[name];
			if (!value) {
				return false;
			}

			capNm = capitalize(name);
			setter = "_create" + capNm;

			if (capNm == "Categoryaxis") {
				createdCategoryaxis = true;
			}


			if (Array.isArray(value)) {
				nexacro._GraphicsLibArray.forEach(value, function (o, idx) {
					if (name == "seriesset") {
						capNm = "Series";
					}
					else if (name == "valueaxes") {
						capNm = "Valueaxis";
					}

					if (this[setter]) {
						if (o.id) {
							subControl = this[setter](o, o.id);
						}
						else {
							subControl = this[setter](o, "Chart" + capNm + idx);
						}
					}

					if (subControl) {
						this._drawing = true;
						this._setProperties(o, subControl);
						this._drawing = false;
					}
				}, this);

				if (capNm == "Series") {
					this._drawing = true;
					this._setSeries();
					this._drawing = false;
				}
			}
			else if (nexacro._GraphicsLib.isObject(value)) {
				if (this[setter]) {
					if (value.id) {
						subControl = this[setter](value, value.id);
					}
					else {
						subControl = this[setter](value, "Chart" + capNm);
					}
				}
				if (subControl) {
					this._drawing = true;
					this._setProperties(value, subControl);
					this._drawing = false;
				}
			}
			else if (nexacro._isString(value)) {
			}
		}, this);


		if (!createdCategoryaxis) {
			axis = this._createCategoryaxis();
			axis._afterSetProperties();
		}
		if (!createdValueaxis && this.valueaxes.length <= 0) {
			axis = this._createValueaxes();
			axis._afterSetProperties();
		}
	};

	_pRadarChart.setCategoryaxis = function (val) {
		var re = false, cont = {
		}, categoryaxis = this.categoryaxis;

		if (nexacro._GraphicsLib.isEmpty(val)) {
			return false;
		}

		if (typeof (val) == "object") {
			cont = val;
		}

		if (categoryaxis && cont) {
			this.contents.categoryaxis = this._mergeContents(true, this.contents.categoryaxis, cont);

			this._drawing = true;
			this._setProperties(cont, categoryaxis);
			this._drawing = false;
		}

		if (categoryaxis) {
			re = true;
			this._changedData = true;
		}

		this._draw();

		return re;
	};
	_pRadarChart.getValueaxisByID = function (id) {
		var index = nexacro._GraphicsLibArray.indexOfProp(this.valueaxes, "id", id);
		if (index > -1) {
			return this.valueaxes[index];
		}
		return null;
	};
	_pRadarChart.setValueaxis = function (id, contents) {
		var valueaxis, valueaxisId, valueaxisIndex = -1;

		if (id && typeof (id) == "string") {
			valueaxisId = id;
		}
		else {
			if (!nexacro._GraphicsLib.isEmpty(contents)) {
				nexacro._GraphicsLibObject.Each(contents, function (name, val, object) {
					if (name == "id") {
						valueaxisId = contents.id;
					}
				});
			}
		}

		if (valueaxisId) {
			valueaxis = this.getValueaxisByID(valueaxisId);
			valueaxisIndex = nexacro._GraphicsLibArray.indexOf(this.valueaxes, valueaxis);
		}

		if (valueaxis) {
			var axisContents = {
			};
			if (typeof (contents) == "object") {
				if (!nexacro._GraphicsLib.isEmpty(contents)) {
					nexacro._GraphicsLibObject.Each(contents, function (name, val, object) {
						if (name == "id") {
							valueaxisId = contents.id;
						}
					});
				}
				else {
					valueaxisIndex = -1;
					return valueaxisIndex;
				}

				axisContents = contents;
			}

			this.contents.valueaxes[valueaxisIndex] = this._mergeContents(true, this.contents.valueaxes[valueaxisIndex], axisContents);

			this._drawing = true;
			this._setProperties(axisContents, valueaxis);
			this._drawing = false;
		}
		else {
			if (typeof (contents) == "object") {
				if (typeof (valueaxisId) == "string") {
					contents.id = valueaxisId;
				}
			}

			valueaxis = this._appendValueaxis(contents);
			if (valueaxis) {
				valueaxisIndex = this.valueaxes.length - 1;
			}
		}

		this._changedData = true;

		this._draw();

		return valueaxisIndex;
	};
	_pRadarChart._appendValueaxis = function (contents) {
		var axis, id, axisContents = {
		}, valueaxesLeng = -1, charttype = this._type_name, seriesset = this.seriesset, s1, s2, linevisible1 = false, location, linevisible2 = false;

		if (this.valueaxes.length > 0) {
			return null;
		}
		if (!this._isApplyContents && nexacro._GraphicsLib.isEmpty(contents)) {
			return valueaxesLeng;
		}

		if (typeof (contents) == "object") {
			axisContents = contents;
			id = contents.id;
		}

		if (!id) {
			valueaxesLeng = this.valueaxes.length + 1;
			id = "Valueaxis" + valueaxesLeng;
			contents.id = id;
		}

		if (!this._isApplyContents) {
			this.contents.valueaxes.push(axisContents);
		}





		axis = new nexacro.ChartRadarValueAxisControl(id, this, this._graphicsControl);
		axis._type_name = "ChartRadarValueAxisControl";
		axis._type = "valueAxis";



		if (axis) {
			this._drawing = true;
			this._setProperties(axisContents, axis);
			this._drawing = false;
			this.valueaxes.push(axis);
		}

		if (axis) {
			valueaxesLeng = this.valueaxes.length - 1;
		}

		return axis;
	};
	_pRadarChart.deleteValueaxis = function (val) {
		var re = false;

		if (typeof (val) == "string") {
			var axis = this.getValueaxisByID(val);
			if (axis) {
				var index = nexacro._GraphicsLibArray.indexOf(this.valueaxes, axis);
				if (index > -1) {
					this._deleteAxis(axis, false, index);
					re = true;
				}
			}
		}

		if (re) {
			this._changedData = true;
		}

		this._draw();
		return re;
	};

	_pRadarChart.deleteAllValueaxis = function () {
		var length = this.valueaxes.length, valueaxis;

		for (var i = 0; i < length; i++) {
			var index = length - i - 1;
			valueaxis = this.valueaxes[index];

			if (valueaxis) {
				this.deleteValueaxis(valueaxis.id);
			}
		}

		if (length > 0) {
			this._rearrange = true;
		}

		this._draw();

		return length;
	};
	_pRadarChart.showCategoryaxis = function () {
		if (this.categoryaxis) {
			this.categoryaxis.set_visible(true);
		}
	};

	_pRadarChart.hideCategoryaxis = function () {
		if (this.categoryaxis) {
			this.categoryaxis.set_visible(false);
		}
	};
	_pRadarChart.showValueaxis = function (id) {
		var axis = this.getValueaxisByID(id);

		if (axis != this.valueaxes[0]) {
			return;
		}
		if (axis) {
			axis.set_visible(true);
		}
		this._draw();
	};

	_pRadarChart.hideValueaxis = function (id) {
		var axis = this.getValueaxisByID(id);

		if (axis != this.valueaxes[0]) {
			return;
		}

		if (axis) {
			axis.set_visible(false);
		}
		this._draw();
	};
	_pRadarChart.set_categorycolumn = function (v) {
		if (this.categorycolumn._value != v) {
			this.categorycolumn._set(v);
			this.on_apply_categorycolumn();
		}

		this._draw();
	};

	_pRadarChart._checkcategorycolumn = function () {
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


	_pRadarChart.setSeries = function (id, contents) {
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
							if (typeof (seriesId) == "string") {
								contents.id = seriesId;
							}
						}
					});
				}
				else {
					seriesIndex = -1;
					return seriesIndex;
				}
				seriesContents = contents;

				this.contents.seriesset[seriesIndex] = this._mergeContents(true, this.contents.seriesset[seriesIndex], seriesContents);

				this._drawing = true;
				this._setProperties(seriesContents, series);
				this._drawing = false;

				if (this.contents.seriesset[seriesIndex]) {
					seriesIndex = series._configIndex;
				}
			}
			else {
				seriesIndex = -1;
			}
		}
		else {
			if (typeof (contents) == "object") {
				if (typeof (seriesId) == "string") {
					contents.id = seriesId;
				}
			}

			series = this._appendSeries(contents);
			if (series && series != -1) {
				seriesIndex = series._configIndex;
			}
		}

		if (seriesIndex >= 0) {
			this._changedData = true;
			this._changedColorset = true;
		}

		this._draw();

		return seriesIndex;
	};

	_pRadarChart.showSeries = function (id) {
		var s = this.getSeriesByID(id);
		if (s) {
			var visible = s._orgVisible;
			s._orgVisible = undefined;
			if (visible) {
				s.set_visible(true);
			}
		}
	};

	_pRadarChart.hideSeries = function (id) {
		var s = this.getSeriesByID(id);
		if (s) {
			if (s._orgVisible === undefined || s._orgVisible === null) {
				s._orgVisible = s.visible;
			}
			s.set_visible(false);
		}
	};





	_pRadarChart._createSeriesset = function (o, id) {
		if (!this._seriesGroup) {
			return false;
		}

		var series, seriesLength = 0;

		if (this.seriesset) {
			seriesLength = this.seriesset.length;
		}

		for (var i = 0; i < seriesLength; i++) {
			var s = this.seriesset[i];
			if (s) {
				var seriesId = s.id;
				if (seriesId == id) {
					throw nexacro.MakeNativeError(this, "native_exist_id", seriesId);
					return;
				}
			}
		}

		series = this._appendSeries(o);
		return series;
	};
	_pRadarChart._measure = function () {
		nexacro._ChartBase.prototype._measure.call(this);

		if (this._recreate) {
			this._initAxis();
			this._setDatapointFormat();
			this._setDatapoint();
			this._setDataMinMax();
			this._resetAxis();
		}

		this._setAxis();
	};
	_pRadarChart._arrange = function () {
		nexacro._ChartBase.prototype._arrange.call(this);
		if (this._rearrange) {
			this._arrangeBoard();
		}
		if (this._rearrange) {
			this._arrangeAxisRect();
		}
		this._arrangeAxis();

		var seriesset = this._visibleSeriesset;



		this._arrangeSeries();
	};



	_pRadarChart._createSeries = function (contents, id) {
		var series = new nexacro.ChartRadarSeriesControl(id, this, this._graphicsControl);
		if (series) {
			return series;
		}
	};

	_pRadarChart._setSeries = function () {
		var colorset = this._colorset;
		var highlightcolorset = this._highlightcolorset;
		var selectcolorset = this._selectcolorset;
		var colorcnt = 0;

		var categoryaxis, valueaxis, angleitems;
		if (this._changedData) {
			this._radarangleinfo = [];
		}
		nexacro._GraphicsLibArray.forEach(this.seriesset, function (obj, index) {
			if (obj) {
				if (this._changedData) {
					obj._setData();

					if (!nexacro._isNull(obj._data) || (obj._data && obj._data.length > 2)) {
						angleitems = obj._setItemData();
						if (this._radarangleinfo.length <= 0 && angleitems.length > 0) {
							this._radarangleinfo = angleitems;
						}
					}
				}

				if (nexacro._isNull(obj._data) || (obj._data && obj._data.length <= 2)) {
					return false;
				}


				if (this._changedColorset || obj._changedSeriesColor) {
					if (nexacro._isString(colorset)) {
						obj._setDefault(colorset);
					}
					else {
						var seriesColor = colorset[colorcnt];
						var highlightColor = highlightcolorset[colorcnt];
						var selectColor = selectcolorset[colorcnt];

						if (seriesColor) {
							colorcnt++;
						}
						else {
							colorcnt = 0;
						}

						if (colorcnt == 0) {
							seriesColor = colorset[colorcnt];
							colorcnt++;
						}

						obj._setDefault(seriesColor, highlightColor, selectColor);
					}

					obj._changedSeriesColor = false;
				}

				categoryaxis = this.categoryaxis;
				valueaxis = this.valueaxes[0];

				if (categoryaxis) {
					categoryaxis._afterSetProperties();
					categoryaxis.on_apply_visible(categoryaxis.visible);
				}
				if (valueaxis) {
					valueaxis._afterSetProperties();
					valueaxis.on_apply_visible(valueaxis.visible);
				}


				if (!categoryaxis && !valueaxis) {
					return false;
				}
			}
		}, this);
	};

	_pRadarChart._initAxis = function () {
		var axis = this.valueaxes[0];
		if (axis) {
			axis._initData();
		}
	};

	_pRadarChart._resetAxis = function () {
		var axis = this.valueaxes[0];
		if (axis) {
			axis._resetData();
		}
	};
	_pRadarChart._getHighlightVisible = function () {
		var seriesset = this.seriesset;
		if (seriesset) {
			var length = seriesset.length, highlightvisible = false;

			for (var i = 0; i < length; i++) {
				var s = seriesset[i];
				if (s) {
					if (s.highlightpointvisible || s.highlightlinevisible || s.highlightlineareavisible) {
						highlightvisible = true;
						break;
					}
				}
			}
			return highlightvisible;
		}
	};
	_pRadarChart._setDatapointFormat = function () {
		var series = this.seriesset;
		var s;
		for (var i = 0; i < series.length; i++) {
			s = series[i];
			if (s) {
				if (nexacro._isNull(s._data)) {
					break;
				}

				this._initSeriesDatapoints(s);
				this._setSeriesDatapointsFormat(s);
			}
		}

		this._getVisibleSeries();
	};
	_pRadarChart._getVisibleSeries = function () {
		var length = this.seriesset.length, pointvisible = false, linevisible = false, visibleSeriesset = [];

		for (var i = 0; i < length; i++) {
			var series = this.seriesset[i];
			if (series) {
				var data = series._data;
				if (data) {
					if (data.length <= 2) {
						continue;
					}
				}


				linevisible = series.linevisible;
				pointvisible = series.pointvisible;
				if (linevisible || pointvisible) {
					visibleSeriesset.push(series);
				}
			}
		}

		this._visibleSeriesset = visibleSeriesset;
	};
	_pRadarChart._deleteSeries = function (series_, index) {
		nexacro._ChartBase.prototype._deleteSeries.call(this, series_, index);
		var serieslength = this.seriesset.length;
		var series = this.seriesset;
		var valueaxis;
		if (this.valueaxes) {
			valueaxis = this.valueaxes[0];
		}
		if (serieslength == 0) {
			if (this.categoryaxis) {
				this.categoryaxis.on_apply_visible(false);
				this.categoryaxis.on_apply_boardlinevisible(false);
			}
			if (valueaxis) {
				valueaxis.on_apply_visible(false);
				valueaxis.on_apply_boardlinevisible(false);
			}
		}
	};

	_pRadarChart._setDatapoint = function () {
		var seriesset = this.seriesset, s, categoryaxis, valueaxis, ps, sdata, pointshape;
		categoryaxis = this.categoryaxis, 
			valueaxis = this.valueaxes[0];

		for (var i = 0; i < seriesset.length; i++) {
			s = seriesset[i];
			if (s) {
				var data = s._data;
				if (nexacro._isNull(data)) {
					break;
				}

				if (s._datapoints.pointsize != null) {
					continue;
				}

				if (!s._datapoints.format) {
					continue;
				}
				pointshape = s.pointshape;


				this._setSeriesDatapoints(s);


				categoryaxis.ticks = categoryaxis._categoriesTickGenerator;
				categoryaxis._setCategoriesData(s._datapoints);

				if ((pointshape == "square") || (pointshape == "diamond") || (pointshape == "triangle") || (pointshape == "cross")) {
					if (s._pointshapeObj[pointshape]) {
						seriesset[i]._pointshape = s._pointshapeObj[pointshape];
					}
				}
			}
		}
	};

	_pRadarChart._initSeriesDatapoints = function (series) {
		series._datapoints = {
			points : []
		};
	};

	_pRadarChart._setSeriesDatapointsFormat = function (series) {
		var format = series._datapoints.format, categoryaxis = this.categoryaxis, valueaxis = this.valueaxes[0];


		if (!format) {
			format = [];
			format.push({
				x : true, 
				category : true, 
				required : true
			});
			format.push({
				y : true, 
				category : false, 
				required : true, 
				defaultvalue : null
			});

			if (series.linevisible || (series.linevisible && series.lineareavisible) || series.pointvisible) {
				format.push({
					angle : true, 
					category : false, 
					required : true
						
				});
			}

			series._datapoints.format = format;
		}
	};

	_pRadarChart._setSeriesDatapoints = function (series) {
		var datapoints, format, pointsize, points, insertSteps, data, p, val, f, categoryaxis = this.categoryaxis, valueaxis = this.valueaxes[0];

		datapoints = series._datapoints;
		format = datapoints.format;
		datapoints.pointsize = format.length;
		pointsize = datapoints.pointsize;
		points = datapoints.points;

		data = series._data;
		var i, j;
		for (i = j = 0; i < data.length; i++, j += pointsize) {
			p = data[i];

			var nullify = p == null;
			if (!nullify) {
				for (var k = 0; k < pointsize; k++) {
					val = p[k];

					f = format[k];
					if (f) {
						if (f.category == false && val != null) {
							val = +val;
							if (isNaN(val)) {
								val = null;
							}
							else if (val == Infinity) {
								val = Number.MAX_VALUE;
							}
							else if (val == -Infinity) {
								val = -Number.MAX_VALUE;
							}
						}
						if (val == null && p.length > k) {
							if (f.defaultValue != null) {
								val = f.defaultValue;
							}
							else {
								val = null;
							}
						}
						else if (val === undefined && (p.length - 1) < k) {
							if (f.required && f.angle) {
								val = this._radarangleinfo[i];
							}
						}
					}

					points[j + k] = val;
				}
			}
		}
	};

	_pRadarChart._setDataMinMax = function () {
		var series = this.seriesset;
		for (var i = 0; i < series.length; i++) {
			var s = series[i], data;

			if (s) {
				data = s._data;
				if (nexacro._isNull(data)) {
					s._redrawSeries = false;
					break;
				}
				this._setSeriesDataMinMax(s);
			}
		}
	};

	_pRadarChart._setSeriesDataMinMax = function (series) {
		var datapoints = series._datapoints, xmin = Number.POSITIVE_INFINITY, ymin = Number.POSITIVE_INFINITY, xmax = Number.NEGATIVE_INFINITY, ymax = Number.NEGATIVE_INFINITY, points, pointsize, val, f, categoryaxis = this.categoryaxis, valueaxis = this.valueaxes[0], format;

		points = datapoints.points;
		pointsize = datapoints.pointsize;
		format = datapoints.format;

		for (var i = 0; i < points.length; i += pointsize) {
			if (points[i] == null) {
				continue;
			}

			for (var j = 0; j < pointsize; j++) {
				val = points[i + j];

				f = format[j];
				if (!f || val == Number.MAX_VALUE || val == -Number.MAX_VALUE) {
					continue;
				}

				if (f.x) {
					if (val < xmin) {
						xmin = val;
					}
					if (val > xmax) {
						xmax = val;
					}
				}
				if (f.y) {
					if (val < ymin) {
						ymin = val;
					}
					if (val > ymax) {
						ymax = val;
					}
				}
			}
		}
		if (categoryaxis._tickmin) {
			xmin = categoryaxis._tickmin;
		}
		if (categoryaxis._tickmax) {
			xmax = categoryaxis._tickmax;
		}
		if (valueaxis._tickmin) {
			ymin = valueaxis._tickmin;
		}
		if (valueaxis._tickmax) {
			ymax = valueaxis._tickmax;
		}

		if (categoryaxis && categoryaxis._updateMinMax) {
			categoryaxis._updateMinMax(xmin, xmax);
		}
		if (valueaxis && valueaxis._updateMinMax) {
			valueaxis._updateMinMax(ymin, ymax);
		}
	};

	_pRadarChart._setAxis = function () {
		var categoryaxis = this.categoryaxis, valueaxis = this.valueaxes[0], clientWidth = this._getClientWidth(), clientHeight = this._getClientHeight(), changedData = this._changedData, arrange = this._rearrange;

		if (categoryaxis) {
			if (changedData || arrange) {
				categoryaxis._changedTicks = true;
			}
			categoryaxis._setData(clientWidth, clientHeight);
		}
		if (valueaxis) {
			if (changedData || arrange) {
				valueaxis._changedTicks = true;
			}
			valueaxis._setData(clientWidth, clientHeight);
		}
		if (this._reset == true) {
			this._reset = false;
		}
	};

	_pRadarChart._arrangeAxisRect = function () {
		var categoryaxis = this.categoryaxis, valueaxis = this.valueaxes[0];
	};
	_pRadarChart._arrangeAxis = function () {
		var axis, boardRect = this._boardRect, boardBorderSize = this._boardBorderSize, boardBorderWidth = this._boardBorderWidth, boardBorderHeight = this._boardBorderHeight, boardspacing = this._boardspacing || this._nullspacing, left = 0, top = 0, width = 0, height = 0, rearrange = this._rearrange, categoryaxis = this.categoryaxis, valueaxis = this.valueaxes[0];





		if (rearrange || (categoryaxis && categoryaxis._rearrange) || (valueaxis && valueaxis._rearrange)) {
			if (boardRect) {
				left = this._boardRectLeft;
				top = this._boardRectTop;
				width = this._boardWidth;
				height = this._boardHeight;
			}
			if (categoryaxis) {
				if (rearrange || categoryaxis._rearrange) {
					categoryaxis._setTransformationHelpers();
				}
			}
			if (valueaxis) {
				if (rearrange || valueaxis._rearrange) {
					valueaxis._setTransformationHelpers();
				}
			}
			if (categoryaxis) {
				if (rearrange || categoryaxis._rearrange) {
					categoryaxis._arrange(left, top, width, height);
				}
			}
			if (valueaxis) {
				if (rearrange || valueaxis._rearrange) {
					valueaxis._arrange(left, top, width, height);
				}
			}
		}
	};

	_pRadarChart._destroySubControl = function () {
		nexacro._ChartBase.prototype._destroySubControl.call(this);


		var valueaxes = this.valueaxes;
		if (valueaxes && valueaxes.length > 0) {
			this.deleteAllValueaxis();
		}

		if (this.categoryaxis) {
			this._deleteCategoryaxis();
		}
	};

	_pRadarChart._deleteCategoryaxis = function () {
		var categoryaxis = this.categoryaxis;
		if (categoryaxis) {
			this._deleteAxis(categoryaxis, true);
			this._changedData = true;
		}
	};
	_pRadarChart._deleteAxis = function (axis, isCategory, index) {
		var pThis = this, axisId = axis.id, charttype = this._type_name;


		if (isCategory) {
			this.categoryaxis = null;
			this._deleteContentsProp("categoryaxis");
		}
		else {
			if (this.valueaxes.length > 0) {
				this._deleteContentsProp("valueaxes", index);
				nexacro._GraphicsLibArray.remove(this.valueaxes, axis);
			}
		}


		axis._destroy(false);
	};
	_pRadarChart._createCategoryaxis = function (o, id) {
		if (this.categoryaxis) {
			return false;
		}

		var series = this.seriesset, axis;
		if (!id) {
			id = "Categoryaxis";
		}

		axis = new nexacro.ChartRadarCategoryAxisControl(id, this, this._graphicsControl);
		axis._type_name = "ChartRadarCategoryAxisControl";
		axis._type = "categoryAxis";


		this.categoryaxis = axis;

		return axis;
	};

	_pRadarChart._createValueaxes = function (o, id) {
		var seriesset = this.seriesset;
		if (this.valueaxes.length > 0) {
			return null;
		}
		var valueaxis;
		if (!id) {
			id = "Valueaxis" + this.valueaxes.length;
		}

		valueaxis = new nexacro.ChartRadarValueAxisControl(id, this, this._graphicsControl);
		valueaxis._type_name = "ChartRadarValueAxisControl";
		valueaxis._type = "valueAxis";

		this.valueaxes.push(valueaxis);

		return valueaxis;
	};

	_pRadarChart._setDataset = function () {
		nexacro._ChartBase.prototype._setDataset.call(this);
	};
	_pRadarChart._setAxislabelChangeInBoardAreaPos = function (item) {
		if (item && item._type_name == "GraphicsText") {
			var labelBoundRect = item.getGlobalBoundRect(), boardRect = this._boardRect, rectx = this._boardRectLeft, recty = this._boardRectTop, rectwidth = this._boardWidth + rectx, rectheight = this._boardHeight + recty, itemLeft = labelBoundRect.left, itemTop = labelBoundRect.top, textW = labelBoundRect.width, textH = labelBoundRect.height, pos = item.getCenter();
			var cx = pos.x;
			var cy = pos.y;
			var x = item.x;
			var y = item.y;
			var _txtWidthHalf = (item._txtSize[0] || textW) / 2;
			var _txtHeightHalf = (item._txtSize[1] || textH) / 2;

			if (cx - (_txtWidthHalf) < rectx) {
				item.set_textAlign("center");
				item.set_x(rectx + _txtWidthHalf + 1);
			}
			else if (cx + (_txtWidthHalf) > rectwidth) {
				item.set_textAlign("center");
				item.set_x(rectwidth - _txtWidthHalf - 1);
			}
			if (cy - (_txtHeightHalf) < recty) {
				item.set_verticalAlign("middle");
				item.set_y(recty + _txtHeightHalf + 1);
			}
			else if (cy + (_txtHeightHalf) > rectheight) {
				item.set_verticalAlign("middle");
				item.set_y(rectheight - _txtHeightHalf - 1);
			}
		}
	};

	delete _pRadarChart;
}


if (!nexacro.ChartRadarCategoryAxisControl) {
	nexacro.ChartRadarCategoryAxisControl = function (id, parent, graphicsControl) {
		nexacro.ChartAxisControl.call(this, id, parent, graphicsControl);

		this._direction = "x";
	};

	var _pChartRadarCategoryAxisControl = nexacro._createPrototype(nexacro.ChartAxisControl, nexacro.ChartRadarCategoryAxisControl);
	nexacro.ChartRadarCategoryAxisControl.prototype = _pChartRadarCategoryAxisControl;
	_pChartRadarCategoryAxisControl._type_name = "ChartRadarCategoryAxisControl";


	_pChartRadarCategoryAxisControl.boardlinevisible = true;

	_pChartRadarCategoryAxisControl.set_labelgap = function (val) {
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


		if (this.labelgap != val) {
			this._changeContentsProperty("labelgap", val, this.labelgap);
			this.labelgap = val;
			this._labelgap = +val;
			this.on_apply_labelgap();
		}

		this.parent._draw();
	};

	_pChartRadarCategoryAxisControl.destroy = function () {
		this._destroy(true);
	};

	_pChartRadarCategoryAxisControl._destroy = function (parent_clear) {
		if (parent_clear) {
			var axisId = this.id;
			if (this.parent) {
				this.parent.categoryaxis = null;
				this.parent._deleteContentsProp("categoryaxis");
			}
		}

		delete this.locale;
		delete this.labeltype;
		delete this.labelmask;
		delete this._axisLine;
		delete this._axisRect;

		if (this._title) {
			this._title.destroy();
			delete this._title;
			this._title = null;
		}

		if (this._ticks) {
			for (var i = 0; i < this._ticks.length; i++) {
				var tick = this._ticks[i];
				var ticktext = tick.labelElement;
				if (ticktext) {
					ticktext.destroy();
					delete ticktext;
					ticktext = null;
				}

				var tickline = tick.lineElement;
				if (tickline) {
					tickline.destroy();
					delete tickline;
					tickline = null;
				}

				var tickboardline = tick.boardlineElement;
				if (tickboardline) {
					tickboardline.destroy();
					delete tickboardline;
					tickboardline = null;
				}
				delete tick;
				tick = null;
			}
		}

		this.id = null;
		this.locale = null;
		this.opposite = null;
		this.datetickunit = null;
		this.tickinterval = null;
		this.ticks = null;
		this.autotickscale = null;
		this.tickstartgap = null;
		this.tickendgap = null;
		this.tickmin = null;
		this.tickmax = null;
		this.gap = null;
		this.boardlinevisible = null;
		this.boardlinestyle = null;
		this.boardlineopacity = null;
		this.axislinestyle = null;
		this.axislineopacity = null;
		this.ticksize = null;
		this.ticklinestyle = null;
		this.ticklineopacity = null;
		this.labeltype = null;
		this.labelmask = null;
		this.labeltextfont = null;
		this.labeltextcolor = null;
		this.labelrotate = null;
		this.labeltextwidth = null;
		this.labelgap = null;
		this.titletext = null;
		this.titletextfont = null;
		this.titletextcolor = null;
		this.titlegap = null;
		this.titletextalign = null;
		this.titlerotate = null;
		this.id = null;

		this._axisRect = null;
		this._type = null;
		this._used = null;
		this._direction = null;
		this._location = null;
		this._datamin = null;
		this._datamax = null;
		this._min = null;
		this._max = null;
		this._tickstartgap = null;
		this._tickendgap = null;
		this._delta = null;
		this._tickinterval = null;
		this._datetickunit = null;
		this._tickmax = null;
		this._tickmin = null;
		this._ticks = null;
		this._labeltextfont = null;
		this._labelWidth = null;
		this._labelHeight = null;
		this._tickendspace = null;
		this._labeltextcolor = null;
		this._title = null;
		this._titleHeight = null;
		this._titleWidth = null;
		this._titletextfont = null;
		this._titletextcolor = null;
		this._halign = null;
		this._valign = null;
		this._boardlinestyle = null;
		this._axislinestyle = null;
		this._axisLine = null;
		this._axislineopacity = null;
		this._ticklinestyle = null;
		this._ticklineopacity = null;
		this._scale = null;
		this._categories = null;
		this._titlerotate = null;
		this._changedTicks = null;
		this._changedTickStyle = null;
		this._changedBoardLineStyle = null;
		this._changedTickLabelStyle = null;
		this._changedTickLabelRotate = null;
		this._rearrange = null;

		this._tickLabelTextAlign = null;
		this._tickLabelVerticalAlign = null;
		this._selectionMin = null;
		this._selectionMax = null;
		this._isTimeAxis = null;

		this._timeUnitSize = null;
		this._specMonths = null;
		this._axislineindex = null;

		if (this._boardLineGroup) {
			this._boardLineGroup.destroy();
			this._boardLineGroup = null;
		}

		if (this._tickGroup) {
			this._tickGroup.destroy();
			this._tickGroup = null;
		}

		if (this._labelGroup) {
			this._labelGroup.destroy();
			this._labelGroup = null;
		}

		if (this._group) {
			var itemID = this._group.id;

			var item = this._graphicsControl.getObjectByID(itemID);
			if (item) {
				this._graphicsControl.removeChild(item);
			}
			this._group.destroy();
			this._group = null;
		}

		if (this.parent) {
			this.parent._rearrange = true;
			this.parent._recreate = true;
			this.parent = null;
		}

		nexacro.Object.prototype.destroy.call(this);
		return true;
	};
	_pChartRadarCategoryAxisControl._create = function () {
		this._group = new nexacro.GraphicsGroup();
		this._group.set_id(this.id + "_ChartAxisGroup");



		this._labelGroup = new nexacro.GraphicsGroup();
		this._labelGroup.set_id("ChartAxisLabelGroup");
		this._group.addChild(this._labelGroup);

		this._boardLineGroup = new nexacro.GraphicsGroup();
		this._boardLineGroup.set_id(this.id + "_ChartAxisBoardLineGroup");
		this._group.addChild(this._boardLineGroup);

		this._createAxisLine();

		if (this.parent._seriesGroup) {
			this._graphicsControl.insertChild(this._group, this.parent._seriesGroup);
		}
		else {
			this._graphicsControl.addChild(this._group);
		}
	};
	_pChartRadarCategoryAxisControl._createAxisLine = function () {
		if (!this._axisLine) {
			this._axisLine = new nexacro.GraphicsPaths();
			this._axisLine.set_id("ChartAxisLine");
			this._group.addChild(this._axisLine);
			this._axisLine._axis = this;
		}
	};
	_pChartRadarCategoryAxisControl._arrange = function (left, top, width, height) {
		if (this.parent._rearrange || this._rearrange) {
			this._arrangeTickGroup(width, height);
			this._boardLineGroup.setTransform("translate(" + 0 + "," + 0 + ")");
			this._arrangeLabelGroup();
		}

		this._rearrange = false;
	};

	_pChartRadarCategoryAxisControl._setData = function (clientWidth, clientHeight) {
		var changedTicks = this._changedTicks, axislinestyle = this._axislinestyle, axislineopacity = this._axislineopacity, boardlinestyle = this._boardlinestyle, boardlinevisible = this.boardlinevisible, boardlineopacity = this._boardlineopacity, boardlineWidth = 0, axislineWidth = 0;

		if (changedTicks || this._changedTickLabelRotate) {
			this._setRange();
			this._setupTickGeneration(clientWidth, clientHeight);
			this._setMinMaxTicks();

			this._setTicks();
			this._labelGroup.clear();
			this._boardLineGroup.clear();
			if (this._axisLine) {
				this._axisLine.clear();
			}
		}

		var ticks = this._ticks, tick, value, chart = this.parent, align, tickLabel, labeltextfont = this.labeltextfont ? this.labeltextfont.value || this.labeltextfont : "10pt Verdana", labeltextcolor = this.labeltextcolor ? this.labeltextcolor.value || this.labeltextcolor : "#000000", labelrotate = this.labelrotate, textAlign = this._tickLabelTextAlign, verticalAlign = this._tickLabelVerticalAlign, labelmaxwidth = this.labeltextwidth, axisLine;


		if (changedTicks && (nexacro._isNull(textAlign) || nexacro._isNull(verticalAlign))) {
			this._getTickLabelAlign(labelrotate);
			textAlign = this._tickLabelTextAlign;
			verticalAlign = this._tickLabelVerticalAlign;
		}

		if (changedTicks || this._changedTickStyle || this._changedBoardLineStyle
			 || this._changedTickLabelRotate || this._changedTickLabelStyle) {
			for (var i = 0; i < ticks.length; i++) {
				tick = ticks[i];

				value = tick.v;
				if (nexacro._GraphicsLib.isEmpty(tick.label) || value < this._min || value > this._max) {
					continue;
				}

				if (changedTicks) {
					axisLine = new nexacro.GraphicsPaths();
					axisLine.set_id("ChartAxisTickBoardLine" + i);
					this._boardLineGroup.addChild(axisLine);
					tick.boardlineElement = axisLine;
					axisLine._axis = this;

					axisLine.set_strokepen(boardlinestyle ? boardlinestyle.value || boardlinestyle : "1px solid #d0d0d0");
					axisLine.set_opacity(boardlineopacity ? boardlineopacity._sysvalue : 1);
				}
				else {
					if (this._changedBoardLineStyle) {
						axisLine = tick.boardlineElement;
						if (axisLine) {
							axisLine.set_strokepen(boardlinestyle ? boardlinestyle.value || boardlinestyle : "1px solid #d0d0d0");
							axisLine.set_opacity(boardlineopacity ? boardlineopacity._sysvalue : 1);
						}
					}
				}

				if (changedTicks || this._changedTickLabelRotate) {
					tickLabel = new nexacro.GraphicsText(0, 0);
					tickLabel.set_id("ChartAxisLabel" + i);
					tickLabel.set_text(tick.label);
					this._labelGroup.addChild(tickLabel);
					tick.labelElement = tickLabel;
					tickLabel._axis = this;

					tickLabel.set_font(labeltextfont);
					tickLabel.set_color(labeltextcolor);
					if (labelmaxwidth > 0) {
						tickLabel.set_wordWrap(true);
						tickLabel.set_width(labelmaxwidth);
					}
					else {
						tickLabel.set_wordWrap(false);
					}

					tickLabel.set_textAlign(textAlign);
					tickLabel.set_verticalAlign(verticalAlign);
					tickLabel.setTransform("rotate(" + labelrotate + ",0,0)");
				}
				else {
					if (this._changedTickLabelStyle) {
						tickLabel = tick.labelElement;
						tickLabel.set_font(labeltextfont);
						tickLabel.set_color(labeltextcolor);

						if (labelmaxwidth > 0) {
							tickLabel.set_wordWrap(true);
							tickLabel.set_width(labelmaxwidth);
						}
						else {
							tickLabel.set_wordWrap(false);
						}
					}
				}
			}
		}
		if (changedTicks || this._changedTickStyle) {
			this._axisLine.set_strokepen(axislinestyle ? axislinestyle.value || axislinestyle : "1px solid #d0d0d0");
			this._axisLine.set_opacity(axislineopacity ? axislineopacity._sysvalue : 1);
		}
		this._changedTicks = false;
		this._changedTickStyle = false;
		this._changedBoardLineStyle = false;
		this._changedTickLabelStyle = false;
		this._changedTickLabelRotate = false;

		var info = this._labelGroup.getGlobalBoundRect(false, true);

		this._labelHeight = info.height;
		this._labelWidth = info.width;
	};
	_pChartRadarCategoryAxisControl._getTickLabelAlign = function (labelrotate, labelangle) {
		return;
	};
	_pChartRadarCategoryAxisControl._arrangeTickGroup = function (width, height) {
		var x = 0, y = 0, chart = this.parent, ticks = this._ticks, tick, value, index, tickmin = this._min, tickmax = this._max, axisLine, centerX = chart._centerLeft, centerY = chart._centerTop, categoryaxis = this, axislinetype = chart.radartype || "polygon", categoryaxislinewidth = 1, valueaxislinewidth = 1, valueaxisboardlinewidth = 1, valueaxis = chart.valueaxes[0];
		var length = valueaxis._ticks.length - 1;
		var max = Math.max(valueaxis._max, 0);

		var endvalue = 0;
		var startX = centerX;
		var startY = centerY;
		var endX = centerX;
		var endY = centerY;
		var range;
		var bstartline = false;

		categoryaxislinewidth = (categoryaxis && categoryaxis._axislinestyle) ? categoryaxis._axislinestyle._getBorderLeftWidth() : 1;
		valueaxislinewidth = (valueaxis && valueaxis._axislinestyle) ? valueaxis._axislinestyle._getBorderLeftWidth() : 1;
		valueaxisboardlinewidth = (valueaxis && valueaxis._boardlinestyle) ? valueaxis._boardlinestyle._getBorderLeftWidth() : 1;
		var polygonstartx = categoryaxislinewidth / 8;

		for (var i = 0; i < ticks.length; i++) {
			axisLine = ticks[i].boardlineElement;
			value = ticks[i].v;
			if (isNaN(value) || value < tickmin || value > tickmax) {
				continue;
			}

			endX = this.p2c(value, max);
			endY = valueaxis.p2c(max, value);
			if (axisLine) {
				axisLine.moveTo(startX, startY);
				axisLine.lineTo(endX, endY);
				ticks[i]._point = {
					"x" : endX, 
					"y" : endY
				};
			}
		}

		var categorylength = 0;
		if (chart._radarangleinfo) {
			categorylength = chart._radarangleinfo.length;
		}
		if (this._axisLine && ticks.length > 0) {
			for (var j = 0; j < categorylength; j++) {
				if (j == 0) {
					startX = categoryaxis.p2c(j, max);
					startY = valueaxis.p2c(max, j);
					if (axislinetype == "polygon") {
						this._axisLine.moveTo(startX - polygonstartx, startY);
					}
					else {
						this._axisLine.moveTo(startX, startY);
					}
					bstartline = true;
				}

				else {
					endX = categoryaxis.p2c(j, max);
					endY = valueaxis.p2c(max, j);

					if (bstartline) {
						if (axislinetype == "polygon") {
							this._axisLine.lineTo(endX, endY);
						}
						else {
							range = valueaxis.p2range(max, j);
							this._axisLine.arcTo(new nexacro.Point(endX, endY), new nexacro._GraphicsSize(range, range), 0, 1, 0);
						}
					}
				}
			}
			if (bstartline) {
				if (axislinetype == "polygon") {
					this._axisLine.lineTo(startX + polygonstartx, startY);
				}
				else {
					this._axisLine.arcTo(new nexacro.Point(startX, startY), new nexacro._GraphicsSize(range, range), 0, 1, 0);
				}
			}
		}
	};
	_pChartRadarCategoryAxisControl._arrangeLabelGroup = function () {
		var ticks = this._ticks, chart = this.parent, tick, labelEle, dX = 0, textW = 0, textH = 0, x = 0, y = 0, value, maxRadius = Math.min(chart._boardWidth, chart._boardHeight) / 2, labelrotate = this.labelrotate, location = this._location, labelgap = +this._labelgap, centerX = chart._centerLeft, centerY = chart._centerTop, categoryaxis = this, valueaxis = chart.valueaxes[0], radius, startangle, ptPos, originpoint, vPoint = {
			x : 0, 
			y : 0
		}, vUnit, rotateX = 0, rotateY = 0, targetX = 0, targetY = 0, categoryaxislinewidth = 1, valueaxislinewidth = 1, valueaxisboardlinewidth = 1, axislinetype = chart.radartype || "polygon", labelBoundRect;

		categoryaxislinewidth = (categoryaxis && categoryaxis._axislinestyle) ? categoryaxis._axislinestyle._getBorderLeftWidth() : 1;
		valueaxislinewidth = (valueaxis && valueaxis._axislinestyle) ? valueaxis._axislinestyle._getBorderLeftWidth() : 1;
		valueaxisboardlinewidth = (valueaxis && valueaxis._boardlinestyle) ? valueaxis._boardlinestyle._getBorderLeftWidth() : 1;
		var linewidth = Math.max(categoryaxislinewidth, valueaxisboardlinewidth);
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

		if (nexacro._GraphicsLib.isEmpty(chart.radius)) {
			radius = maxRadius * 0.8;
		}
		else {
			radius = maxRadius * chart._radius;
		}
		if (labelgap && (axislinetype == "circle")) {
			if (labelgap > 0) {
				labelgap++;
			}
		}
		labelgap += (linewidth / 2);
		for (var i = 0; i < ticks.length; i++) {
			tick = ticks[i];
			labelEle = tick.labelElement;
			value = tick.v;


			if (nexacro._GraphicsLib.isEmpty(tick.label) || nexacro._GraphicsLib.isEmpty(labelEle) || value < this._min || value > this._max) {
				continue;
			}
			var angledata = chart._radarangleinfo[value];

			if (angledata) {
				x = Math.floor(tick._point.x * 1000) / 1000;
				y = Math.floor(tick._point.y * 1000) / 1000;

				labelBoundRect = labelEle.getGlobalBoundRect(), 
					textW = labelBoundRect.width, 
					textH = labelBoundRect.height;

				var _txtHeight = (labelEle._txtSize[1] || textH), _txtWidth = (labelEle._txtSize[0] || textW);
				var textAlign = "center";
				var verticalAlign = "middle";


				if (y > centerY) {
					verticalAlign = "top";
				}
				else if (y < centerY) {
					verticalAlign = "bottom";
				}
				if (x > centerX) {
					textAlign = "left";
				}
				else if (x < centerX) {
					textAlign = "right";
				}
				if (labelEle._lines && labelEle._lines.length > 1) {
					verticalAlign = "middle";
				}



				labelEle.set_verticalAlign(verticalAlign);
				labelEle.set_textAlign(textAlign);

				startangle = angledata.startangle * 180 / Math.PI;
				ptPos = {
					x : x, 
					y : y
				};
				originpoint = {
					x : centerX, 
					y : centerY
				};
				vPoint = {
					x : 0, 
					y : 0
				};



				vUnit = getUnitVector(ptPos, originpoint);


				labelEle.set_x(x);
				labelEle.set_y(y);
				if (labelgap != 0) {
					rotateX = ptPos.x + vUnit.x * labelgap;
					rotateY = ptPos.y + vUnit.y * labelgap;

					if ((0 <= Number(startangle) && Number(startangle) < 90) || (360 <= Number(startangle) && Number(startangle) < 450)) {
						targetX = rotateX + labelgap;
					}
					else if ((90 <= Number(startangle) && Number(startangle) < 180) || (450 <= Number(startangle) && Number(startangle) < 540)) {
						targetX = rotateX + labelgap;
					}
					else if ((180 <= Number(startangle) && Number(startangle) < 270) || (540 <= Number(startangle) && Number(startangle) < 630)) {
						targetX = rotateX - labelgap;
					}
					else {
						targetX = rotateX - labelgap;
					}
					targetY = rotateY;

					labelEle.set_x(targetX);
					labelEle.set_y(targetY);
				}


				chart._setAxislabelChangeInBoardAreaPos(labelEle);
			}
		}




		function positionlefttop (itemText, cx, cy, rotate, width) {
			var vPoint = {
				x : 0, 
				y : 0
			};
			var verticalAlign = "bottom";
			var textAlign = "right";

			var labelBoundRect = itemText.getGlobalBoundRect(), textW = labelBoundRect.width, textH = labelBoundRect.height, _txtHeight = (itemText._txtSize[1] || textH), _txtWidth = (itemText._txtSize[0] || textW);





			itemText.set_verticalAlign(verticalAlign);
			itemText.set_textAlign(textAlign);
			var textLeft = cx;
			var textTop = cy - (width / 2);

			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positioncentertop (itemText, cx, cy, rotate, width) {
			var vPoint = {
				x : 0, 
				y : 0
			};
			var verticalAlign = "bottom";
			var textAlign = "center";
			itemText.set_verticalAlign("bottom");
			itemText.set_textAlign("center");

			itemText.set_verticalAlign(verticalAlign);
			itemText.set_textAlign(textAlign);
			var textLeft = cx;
			var textTop = cy - (width / 2);

			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positionrighttop (itemText, cx, cy, rotate, width) {
			var vPoint = {
				x : 0, 
				y : 0
			};
			var verticalAlign = "bottom";
			var textAlign = "left";


			itemText.set_verticalAlign(verticalAlign);
			itemText.set_textAlign(textAlign);
			var textLeft = cx;
			var textTop = cy - (width / 2);

			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positionleftmiddle (itemText, cx, cy, rotate, width) {
			var vPoint = {
				x : 0, 
				y : 0
			};
			var verticalAlign = "middle";
			var textAlign = "right";

			itemText.set_verticalAlign(verticalAlign);
			itemText.set_textAlign(textAlign);
			var textLeft = cx;
			var textTop = cy - (width / 2);

			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positioncentermiddle (itemText, cx, cy, rotate, width) {
			var vPoint = {
				x : 0, 
				y : 0
			};
			var verticalAlign = "middle";
			var textAlign = "center";


			itemText.set_verticalAlign(verticalAlign);
			itemText.set_textAlign(textAlign);
			var textLeft = cx;
			var textTop = cy - (width / 2);

			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positionrightmiddle (itemText, cx, cy, rotate, width) {
			var vPoint = {
				x : 0, 
				y : 0
			};
			var verticalAlign = "middle";
			var textAlign = "left";


			itemText.set_verticalAlign(verticalAlign);
			itemText.set_textAlign(textAlign);
			var textLeft = cx;
			var textTop = cy - (width / 2);

			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positionleftbottom (itemText, cx, cy, rotate, width) {
			var vPoint = {
				x : 0, 
				y : 0
			};
			var verticalAlign = "top";
			var textAlign = "right";
			itemText.set_verticalAlign(verticalAlign);
			itemText.set_textAlign(textAlign);
			var textLeft = cx;
			var textTop = cy - (width / 2);


			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positioncenterbottom (itemText, cx, cy, rotate, width) {
			var vPoint = {
				x : 0, 
				y : 0
			};
			var verticalAlign = "top";
			var textAlign = "center";


			itemText.set_verticalAlign(verticalAlign);
			itemText.set_textAlign(textAlign);
			var textLeft = cx;
			var textTop = cy - (width / 2);

			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positionrightbottom (itemText, cx, cy, rotate, width) {
			var vPoint = {
				x : 0, 
				y : 0
			};
			var verticalAlign = "top";
			var textAlign = "left";


			itemText.set_verticalAlign(verticalAlign);
			itemText.set_textAlign(textAlign);
			var textLeft = cx;
			var textTop = cy - (width / 2);

			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
	};
	_pChartRadarCategoryAxisControl._changeContentsProperty = function (nm, newVal, oldVal) {
		var contents = this.parent.contents;
		if (contents && contents.categoryaxis) {
			contents.categoryaxis[nm] = newVal;
		}
	};
	_pChartRadarCategoryAxisControl._setTransformationHelpers = function () {
		var chart = this.parent, maxRadius = Math.min(chart._boardWidth, chart._boardHeight) / 2, radius = 0, w = 0, centerX = chart._centerLeft, centerY = chart._centerTop, s, m, range, tickmin = chart.valueaxes[0]._min, tickmax = chart.valueaxes[0]._max;

		if (nexacro._GraphicsLib.isEmpty(chart.radius)) {
			radius = maxRadius * 0.8;
		}
		else {
			radius = maxRadius * chart._radius;
		}
		w = radius;

		s = this._scale = w / Math.abs(tickmax - tickmin);
		s = s;
		m = Math.min(tickmax, tickmin);

		this.p2c = function (p, y) {
			var angledata = chart._radarangleinfo[p];
			if (angledata) {
				range = (y - m) * s;
				return ((Math.sin(angledata.startangle) * range + centerX));
			}
			else {
				return centerX;
			}
		};
		this.p2range = function (p, y) {
			var angledata = chart._radarangleinfo[p];
			if (angledata) {
				range = (y - m) * s;
				return range;
			}
			else {
				return radius;
			}
		};
	};
	_pChartRadarCategoryAxisControl._setupTickGeneration = function (width, height) {
	};
	_pChartRadarCategoryAxisControl._afterSetProperties = function () {
		this.on_apply_boardlinevisible(this.boardlinevisible);
		this.on_apply_axislinestyle(this._axislinestyle);
		this.on_apply_labeltextfont(this._labeltextfont);
		this.on_apply_labeltextcolor(this._labeltextcolor);
	};

	delete _pChartRadarCategoryAxisControl;
}
if (!nexacro.ChartRadarValueAxisControl) {
	nexacro.ChartRadarValueAxisControl = function (id, parent, graphicsControl) {
		nexacro.ChartAxisControl.call(this, id, parent, graphicsControl);
		this._direction = "y";
	};

	var _pChartRadarValueAxisControl = nexacro._createPrototype(nexacro.ChartAxisControl, nexacro.ChartRadarValueAxisControl);
	nexacro.ChartRadarValueAxisControl.prototype = _pChartRadarValueAxisControl;
	_pChartRadarValueAxisControl._type_name = "ChartRadarValueAxisControl";

	_pChartRadarValueAxisControl.axislineindex = "0";
	_pChartRadarValueAxisControl._axislineindex = 0;
	_pChartRadarValueAxisControl.labelgapangle = "0";
	_pChartRadarValueAxisControl.boardlinevisible = true;


	_pChartRadarValueAxisControl.set_axislineindex = function (v) {
		if (isNaN(v = +v) || v < -1) {
			return;
		}

		if (this.axislineindex != v) {
			this._changeContentsProperty("axislineindex", v, this.axislineindex);
			this.axislineindex = v;
			this._axislineindex = +v;
			this.on_apply_axislineindex(v);
			this.parent._draw();
		}
	};
	_pChartRadarValueAxisControl.on_apply_axislineindex = function (axislineindex) {
		if (axislineindex >= 0) {
			this._changedTicks = true;
			this._rearrange = true;
		}
	};


	_pChartRadarValueAxisControl.destroy = function () {
		this._destroy(true);
	};
	_pChartRadarValueAxisControl._destroy = function (parent_clear) {
		if (parent_clear) {
			var axisId = this.id;
			if (this.parent) {
				var index = -1;
				nexacro._GraphicsLibArray.forEach(this.parent.valueaxes, function (axis, i) {
					if (axis instanceof nexacro.ChartAxisControl && axis.id == axisId) {
						axis.parent._deleteContentsProp("valueaxes", i);
						index = i;
					}
				});
				nexacro._GraphicsLibArray.removeAt(this.parent.valueaxes, index);
			}
		}

		delete this.locale;
		delete this.labeltype;
		delete this.labelmask;
		delete this._axisLine;
		delete this._axisRect;

		if (this._title) {
			this._title.destroy();
			delete this._title;
			this._title = null;
		}

		if (this._ticks) {
			for (var i = 0; i < this._ticks.length; i++) {
				var tick = this._ticks[i];
				var ticktext = tick.labelElement;
				if (ticktext) {
					ticktext.destroy();
					delete ticktext;
					ticktext = null;
				}

				var tickline = tick.lineElement;
				if (tickline) {
					tickline.destroy();
					delete tickline;
					tickline = null;
				}

				var tickboardline = tick.boardlineElement;
				if (tickboardline) {
					tickboardline.destroy();
					delete tickboardline;
					tickboardline = null;
				}
				delete tick;
				tick = null;
			}
		}

		this.id = null;
		this.locale = null;
		this.opposite = null;
		this.datetickunit = null;
		this.tickinterval = null;
		this.ticks = null;
		this.autotickscale = null;
		this.tickstartgap = null;
		this.tickendgap = null;
		this.tickmin = null;
		this.tickmax = null;
		this.gap = null;
		this.boardlinevisible = null;
		this.boardlinestyle = null;
		this.boardlineopacity = null;
		this.axislinestyle = null;
		this.axislineopacity = null;
		this.ticksize = null;
		this.ticklinestyle = null;
		this.ticklineopacity = null;
		this.labeltype = null;
		this.labelmask = null;
		this.labeltextfont = null;
		this.labeltextcolor = null;
		this.labelrotate = null;
		this.labeltextwidth = null;
		this.labelgap = null;
		this.titletext = null;
		this.titletextfont = null;
		this.titletextcolor = null;
		this.titlegap = null;
		this.titletextalign = null;
		this.titlerotate = null;
		this.id = null;

		this._axisRect = null;
		this._type = null;
		this._used = null;
		this._direction = null;
		this._location = null;
		this._datamin = null;
		this._datamax = null;
		this._min = null;
		this._max = null;
		this._tickstartgap = null;
		this._tickendgap = null;
		this._delta = null;
		this._tickinterval = null;
		this._datetickunit = null;
		this._tickmax = null;
		this._tickmin = null;
		this._ticks = null;
		this._labeltextfont = null;
		this._labelWidth = null;
		this._labelHeight = null;
		this._tickendspace = null;
		this._labeltextcolor = null;
		this._title = null;
		this._titleHeight = null;
		this._titleWidth = null;
		this._titletextfont = null;
		this._titletextcolor = null;
		this._halign = null;
		this._valign = null;
		this._boardlinestyle = null;
		this._axislinestyle = null;
		this._axisLine = null;
		this._axislineopacity = null;
		this._ticklinestyle = null;
		this._ticklineopacity = null;
		this._scale = null;
		this._categories = null;
		this._titlerotate = null;
		this._changedTicks = null;
		this._changedTickStyle = null;
		this._changedBoardLineStyle = null;
		this._changedTickLabelStyle = null;
		this._changedTickLabelRotate = null;
		this._rearrange = null;

		this._tickLabelTextAlign = null;
		this._tickLabelVerticalAlign = null;
		this._selectionMin = null;
		this._selectionMax = null;
		this._isTimeAxis = null;

		this._timeUnitSize = null;
		this._specMonths = null;


		if (this._boardLineGroup) {
			this._boardLineGroup.destroy();
			this._boardLineGroup = null;
		}

		if (this._tickGroup) {
			this._tickGroup.destroy();
			this._tickGroup = null;
		}

		if (this._labelGroup) {
			this._labelGroup.destroy();
			this._labelGroup = null;
		}

		if (this._group) {
			var itemID = this._group.id;

			var item = this._graphicsControl.getObjectByID(itemID);
			if (item) {
				this._graphicsControl.removeChild(item);
			}
			this._group.destroy();
			this._group = null;
		}

		if (this.parent) {
			this.parent._rearrange = true;
			this.parent._recreate = true;
			this.parent = null;
		}

		nexacro.Object.prototype.destroy.call(this);
		return true;
	};
	_pChartRadarValueAxisControl._create = function () {
		this._group = new nexacro.GraphicsGroup();
		this._group.set_id(this.id + "_ChartAxisGroup");



		this._boardLineGroup = new nexacro.GraphicsGroup();
		this._boardLineGroup.set_id(this.id + "_ChartAxisBoardLineGroup");
		this._group.addChild(this._boardLineGroup);


		this._labelGroup = new nexacro.GraphicsGroup();
		this._labelGroup.set_id("ChartAxisLabelGroup");
		this._group.addChild(this._labelGroup);

		this._createAxisLine();

		if (this.parent._seriesGroup) {
			this._graphicsControl.insertChild(this._group, this.parent._seriesGroup);
		}
		else {
			this._graphicsControl.addChild(this._group);
		}
	};
	_pChartRadarValueAxisControl._createAxisLine = function () {
		if (!this._axisLine) {
			this._axisLine = new nexacro.GraphicsPaths();
			this._axisLine.set_id("ChartAxisLine");
			this._group.addChild(this._axisLine);
			this._axisLine._axis = this;
		}
	};
	_pChartRadarValueAxisControl._arrange = function (left, top, width, height) {
		if (this.parent._rearrange || this._rearrange) {
			this._arrangeTickGroup(width, height);
			this._boardLineGroup.setTransform("translate(" + 0 + "," + 0 + ")");
			this._arrangeLabelGroup();
		}

		this._rearrange = false;
	};

	_pChartRadarValueAxisControl._setData = function (clientWidth, clientHeight) {
		var changedTicks = this._changedTicks, axislinestyle = this._axislinestyle, axislineopacity = this._axislineopacity, boardlinestyle = this._boardlinestyle, boardlinevisible = this.boardlinevisible, boardlineopacity = this._boardlineopacity, boardlineWidth = 0, axislineWidth = 0;


		if (changedTicks || this._changedTickLabelRotate) {
			this._setRange();
			this._setupTickGeneration(clientWidth, clientHeight);
			this._setMinMaxTicks();

			this._setTicks();

			this._labelGroup.clear();
			this._boardLineGroup.clear();
			if (this._axisLine) {
				this._axisLine.clear();
			}
		}

		var ticks = this._ticks, tick, value, chart = this.parent, align, tickLabel, labeltextfont = this.labeltextfont ? this.labeltextfont.value || this.labeltextfont : "10pt Verdana", labeltextcolor = this.labeltextcolor ? this.labeltextcolor.value || this.labeltextcolor : "#000000", labelrotate = this.labelrotate, textAlign = this._tickLabelTextAlign, verticalAlign = this._tickLabelVerticalAlign, labelmaxwidth = this.labeltextwidth, checkmaxvalue, axisLine;


		if (changedTicks && (nexacro._isNull(textAlign) || nexacro._isNull(verticalAlign))) {
			this._getTickLabelAlign(labelrotate);
			textAlign = this._tickLabelTextAlign;
			verticalAlign = this._tickLabelVerticalAlign;
		}

		if (changedTicks || this._changedTickStyle || this._changedBoardLineStyle
			 || this._changedTickLabelRotate || this._changedTickLabelStyle) {
			for (var i = 0; i < ticks.length; i++) {
				tick = ticks[i];

				value = tick.v;
				if (nexacro._GraphicsLib.isEmpty(tick.label) || value < this._min || value > this._max) {
					continue;
				}
				checkmaxvalue = value;
				if (changedTicks) {
					axisLine = new nexacro.GraphicsPaths();
					axisLine.set_id("ChartAxisTickBoardLine" + i);
					this._boardLineGroup.addChild(axisLine);
					tick.boardlineElement = axisLine;
					axisLine._axis = this;

					axisLine.set_strokepen(boardlinestyle ? boardlinestyle.value || boardlinestyle : "1px solid #d0d0d0");
					axisLine.set_opacity(boardlineopacity ? boardlineopacity._sysvalue : 1);
				}
				else {
					if (this._changedBoardLineStyle) {
						axisLine = tick.boardlineElement;
						if (axisLine) {
							axisLine.set_strokepen(boardlinestyle ? boardlinestyle.value || boardlinestyle : "1px solid #d0d0d0");
							axisLine.set_opacity(boardlineopacity ? boardlineopacity._sysvalue : 1);
						}
					}
				}

				if (changedTicks || this._changedTickLabelRotate) {
					tickLabel = new nexacro.GraphicsText(0, 0);
					tickLabel.set_id("ChartAxisLabel" + i);
					tickLabel.set_text(tick.label);
					this._labelGroup.addChild(tickLabel);
					tick.labelElement = tickLabel;
					tickLabel._axis = this;

					tickLabel.set_font(labeltextfont);
					tickLabel.set_color(labeltextcolor);
					if (labelmaxwidth > 0) {
						tickLabel.set_wordWrap(true);
						tickLabel.set_width(labelmaxwidth);
					}
					else {
						tickLabel.set_wordWrap(false);
					}

					tickLabel.set_textAlign(textAlign);
					tickLabel.set_verticalAlign(verticalAlign);
					tickLabel.setTransform("rotate(" + labelrotate + ",0,0)");
				}
				else {
					if (this._changedTickLabelStyle) {
						tickLabel = tick.labelElement;
						tickLabel.set_font(labeltextfont);
						tickLabel.set_color(labeltextcolor);

						if (labelmaxwidth > 0) {
							tickLabel.set_wordWrap(true);
							tickLabel.set_width(labelmaxwidth);
						}
						else {
							tickLabel.set_wordWrap(false);
						}
					}
				}
			}
		}
		if (changedTicks || this._changedTickStyle) {
			this._axisLine.set_strokepen(axislinestyle ? axislinestyle.value || axislinestyle : "1px solid #d0d0d0");
			this._axisLine.set_opacity(axislineopacity ? axislineopacity._sysvalue : 1);
		}
		this._changedTicks = false;
		this._changedTickStyle = false;
		this._changedBoardLineStyle = false;
		this._changedTickLabelStyle = false;
		this._changedTickLabelRotate = false;

		var info = this._labelGroup.getGlobalBoundRect(false, true);

		this._labelHeight = info.height;
		this._labelWidth = info.width;
	};
	_pChartRadarValueAxisControl._getTickLabelAlign = function (labelrotate, index) {
		return;
	};
	_pChartRadarValueAxisControl._arrangeTickGroup = function () {
		var x = 0, y = 0, chart = this.parent, ticks = this._ticks, tick, value, index, maxRadius = Math.min(chart._boardWidth, chart._boardHeight) / 2, tickmin = this._min, tickmax = this._max, axisLine, centerX = chart._centerLeft, centerY = chart._centerTop, categoryaxis = chart.categoryaxis, range, radius, axislinetype = chart.radartype || "polygon", tickposition = this._axislineindex || 0, categoryaxislinewidth = 1, valueaxislinewidth = 1, valueaxisboardlinewidth = 1, angledata, valueaxis = this;

		var startX = centerX;
		var startY = centerY;
		var endX = centerX;
		var endY = centerY;
		var bstartline = false;
		var categorylength = 0;

		categoryaxislinewidth = (categoryaxis && categoryaxis._axislinestyle) ? categoryaxis._axislinestyle._getBorderLeftWidth() : 1;
		valueaxislinewidth = (valueaxis && valueaxis._axislinestyle) ? valueaxis._axislinestyle._getBorderLeftWidth() : 1;
		valueaxisboardlinewidth = (valueaxis && valueaxis._boardlinestyle) ? valueaxis._boardlinestyle._getBorderLeftWidth() : 1;

		var polygonstartx = valueaxisboardlinewidth / 8;
		if (chart._radarangleinfo) {
			categorylength = chart._radarangleinfo.length;
		}
		var tickspointarr = [];
		if (nexacro._GraphicsLib.isEmpty(chart.radius)) {
			radius = maxRadius * 0.8;
		}
		else {
			radius = maxRadius * chart._radius;
		}
		for (var i = 0; i < ticks.length; i++) {
			axisLine = ticks[i].boardlineElement;
			value = ticks[i].v;
			tickspointarr = [];
			if (isNaN(value) || value < tickmin || value > tickmax) {
				continue;
			}

			for (var j = 0; j < categorylength; j++) {
				var _point;
				range = valueaxis.p2range(value, j);
				if (j == 0) {
					startX = categoryaxis.p2c(j, value);
					startY = valueaxis.p2c(value, j);
					if (axislinetype == "polygon") {
						axisLine.moveTo(startX - polygonstartx, startY);
					}
					else {
						axisLine.moveTo(startX, startY);
					}
					angledata = chart._radarangleinfo[j];
					_point = {
						"x" : startX, 
						"y" : startY, 
						"startangle" : angledata.startangle, 
						"range" : range
					};
					bstartline = true;
				}

				else {
					endX = categoryaxis.p2c(j, value);
					endY = valueaxis.p2c(value, j);

					if (bstartline) {
						if (axislinetype == "polygon") {
							axisLine.lineTo(endX, endY);
						}
						else {
							axisLine.arcTo(new nexacro.Point(endX, endY), new nexacro._GraphicsSize(range, range), 0, 1, 0);
						}
					}
					angledata = chart._radarangleinfo[j];
					_point = {
						"x" : endX, 
						"y" : endY, 
						"startangle" : angledata.startangle, 
						"range" : range
					};
				}
				tickspointarr.push(_point);
			}
			if (bstartline) {
				if (axislinetype == "polygon") {
					axisLine.lineTo(startX + polygonstartx, startY);
				}
				else {
					axisLine.arcTo(new nexacro.Point(startX, startY), new nexacro._GraphicsSize(range, range), 0, 1, 0);
				}
			}
			ticks[i]._point = tickspointarr;
		}

		if (this._axisLine && ticks.length > 0 && categorylength > 0) {
			startX = centerX;
			startY = centerY;
			if (tickposition > categorylength - 1) {
				tickposition = 0;
			}
			ticks = categoryaxis._ticks;
			var indextick = tickposition;
			value = ticks[indextick].v;
			endX = categoryaxis.p2c(value, this._max);
			endY = this.p2c(this._max, value);

			this._axisLine.moveTo(startX, startY);

			this._axisLine.lineTo(endX, endY);
		}
	};
	_pChartRadarValueAxisControl._arrangeLabelGroup = function () {
		var ticks = this._ticks, chart = this.parent, tick, labelEle, dX = 0, textW = 0, textH = 0, x = 0, y = 0, value, maxRadius = Math.min(chart._boardWidth, chart._boardHeight) / 2, labelrotate = this.labelrotate, location = this._location, labelgap = +this._labelgap, centerX = chart._centerLeft, centerY = chart._centerTop, categoryaxis = chart.categoryaxis, valueaxis = this, radius, startangle, range, ptPos, originpoint, vPoint = {
			x : 0, 
			y : 0
		}, vUnit, rotateX = 0, rotateY = 0, targetX = 0, targetY = 0, tickposition = this._axislineindex || 0, labelposition = this._labelposition, categoryaxislinewidth = 1, valueaxislinewidth = 1, labelBoundRect;

		categoryaxislinewidth = (categoryaxis && categoryaxis._axislinestyle) ? categoryaxis._axislinestyle._getBorderLeftWidth() : 1;
		valueaxislinewidth = this._axislinestyle ? this._axislinestyle._getBorderLeftWidth() : 1;

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

		if (nexacro._GraphicsLib.isEmpty(chart.radius)) {
			radius = maxRadius * 0.8;
		}
		else {
			radius = maxRadius * chart._radius;
		}


		for (var i = 0; i < ticks.length; i++) {
			tick = ticks[i];
			labelEle = tick.labelElement;
			value = tick.v;


			if (nexacro._GraphicsLib.isEmpty(tick.label) || nexacro._GraphicsLib.isEmpty(labelEle) || value < this._min || value > this._max || tick._point.length <= 0) {
				continue;
			}
			if (tick._point && tick._point.length - 1 < tickposition) {
				tickposition = 0;
			}
			targetX = tick._point[tickposition].x;
			targetY = tick._point[tickposition].y;
			startangle = tick._point[tickposition].startangle * 180 / Math.PI;

			range = tick._point[tickposition].range;


			var textAlign = "center";
			var verticalAlign = "middle";


			labelEle.set_verticalAlign(verticalAlign);
			labelEle.set_textAlign(textAlign);
			if (labelgap != 0) {
				startangle = startangle + labelgap;
				var radian = startangle * Math.PI / 180;
				targetX = ((Math.sin(radian) * (range) + centerX));
				targetY = ((-Math.cos(radian) * (range) + centerY));
			}



			targetY = targetY - (valueaxislinewidth / 2);


			labelEle.set_x(targetX);
			labelEle.set_y(targetY);


			chart._setAxislabelChangeInBoardAreaPos(labelEle);
		}
	};
	_pChartRadarValueAxisControl._changeContentsProperty = function (nm, newVal, oldVal) {
		var contents = this.parent.contents;
		if (contents && contents.categoryaxis) {
			contents.categoryaxis[nm] = newVal;
		}
	};
	_pChartRadarValueAxisControl._afterSetProperties = function () {
		this.on_apply_boardlinevisible(this.boardlinevisible);
		this.on_apply_axislinestyle(this._axislinestyle);
		this.on_apply_labeltextfont(this._labeltextfont);
		this.on_apply_labeltextcolor(this._labeltextcolor);
	};




	_pChartRadarValueAxisControl._setTransformationHelpers = function () {
		var chart = this.parent, maxRadius = Math.min(chart._boardWidth, chart._boardHeight) / 2, radius = 0, h = 0, centerX = chart._centerLeft, centerY = chart._centerTop, s, m, tickmin = this._min, range, tickmax = this._max;

		if (nexacro._GraphicsLib.isEmpty(chart.radius)) {
			radius = maxRadius * 0.8;
		}
		else {
			radius = maxRadius * chart._radius;
		}
		h = radius;
		s = this._scale = h / Math.abs(tickmax - tickmin);
		s = s;
		m = Math.min(tickmax, tickmin);



		this.p2c = function (p, x) {
			var angledata = chart._radarangleinfo[x];
			if (angledata) {
				range = (p - m) * s;
				return ((-Math.cos(angledata.startangle) * range + centerY));
			}
			else {
				return centerY;
			}
		};
		this.p2range = function (p, x) {
			var angledata = chart._radarangleinfo[x];
			if (angledata) {
				range = (p - m) * s;
				return range;
			}
			else {
				return radius;
			}
		};
	};
	_pChartRadarValueAxisControl._checkinterval = function (width, height) {
		var chart = this.parent, ticks, maxRadius = Math.min(width, height) / 2, radius = 0, range = 0;

		if (nexacro._GraphicsLib.isEmpty(chart.radius)) {
			radius = maxRadius * 0.8;
		}
		else {
			radius = maxRadius * chart._radius;
		}

		range = radius;
		if (typeof this.ticks == "number" && this.ticks > 0) {
			ticks = this.ticks;
		}
		else {
			ticks = (0.3 * Math.sqrt(range));
		}

		var delta = (this._max - this._min) / ticks, dec = -Math.floor(Math.log(delta) / Math.LN10), maxDec, magn = Math.pow(10, -dec), norm = delta / magn, tickinterval;

		if (norm < 1.5) {
			tickinterval = 1;
		}
		else if (norm < 3) {
			tickinterval = 2;
			if (norm > 2.25 && (maxDec == null || dec + 1 <= maxDec)) {
				tickinterval = 2.5;
				++dec;
			}
		}
		else if (norm < 7.5) {
			tickinterval = 5;
		}
		else {
			tickinterval = 10;
		}

		tickinterval *= magn;

		return tickinterval;
	};
	_pChartRadarValueAxisControl._setupTickGeneration = function (width, height) {
		var chart = this.parent, ticks, maxRadius = Math.min(width, height) / 2, radius = 0, range = 0;


		if (nexacro._GraphicsLib.isEmpty(chart.radius)) {
			radius = maxRadius * 0.8;
		}
		else {
			radius = maxRadius * chart._radius;
		}

		range = radius;
		if (typeof this.ticks == "number" && this.ticks > 0) {
			ticks = this.ticks;
		}
		else {
			ticks = (0.3 * Math.sqrt(range));
		}

		var delta = (this._max - this._min) / ticks, dec = -Math.floor(Math.log(delta) / Math.LN10), maxDec, magn = Math.pow(10, -dec), norm = delta / magn, tickinterval;

		if (norm < 1.5) {
			tickinterval = 1;
		}
		else if (norm < 3) {
			tickinterval = 2;
			if (norm > 2.25 && (maxDec == null || dec + 1 <= maxDec)) {
				tickinterval = 2.5;
				++dec;
			}
		}
		else if (norm < 7.5) {
			tickinterval = 5;
		}
		else {
			tickinterval = 10;
		}

		tickinterval *= magn;

		this._delta = delta;
		var tickintervalchk = this.tickinterval;

		if (!tickintervalchk && !this._tickmax && range > 0) {
			ticks = [];
			var start = this._floorInBase(this._min, tickinterval), i = 0, v = Number.NaN, prev;

			var min = -1, max = -1;
			min = this._min;
			max = this._max;

			do {
				prev = v;
				v = start + i * tickinterval;
				ticks.push(v);
				++i;
			} while (v < max && v != prev);

			if (ticks.length > 0) {
				var old = this._max;
				this._tickmax = this._max = Math.max(this._max, ticks[ticks.length - 1]);
				if (ticks[ticks.length - 1] > old) {
					tickinterval = this._checkinterval(width, height);
				}
			}
		}
		this._tickinterval = tickintervalchk || tickinterval;

		if (!this._tickGenerator) {
			this._tickGenerator = function (axis, istotal) {
				var ticks = [], start = axis._floorInBase(axis._min, axis._tickinterval), i = 0, v = Number.NaN, prev;

				var min = -1, max = -1;
				if (istotal) {
					min = axis._tickmin || axis._datamin;
					max = axis._tickmax || axis._datamax;
				}
				else {
					min = axis._min;
					max = axis._max;
				}
				if (min == -1) {
					return false;
				}

				do {
					prev = v;
					v = start + i * axis._tickinterval;
					ticks.push(v);
					++i;
				} while (v < max && v != prev);

				return ticks;
			};
		}
	};
	delete _pChartRadarValueAxisControl;
}
if (!nexacro.ChartRadarSeriesControl) {
	nexacro.ChartRadarSeriesControl = function (id, parent, graphicsControl) {
		nexacro._SeriesBase.prototype.constructor.apply(this, arguments);

		this._seriesitems = [];

		this._clickItemIndex = [];
		this._clickShow = false;
	};

	var _pChartRadarSeriesControl = nexacro._createPrototype(nexacro._SeriesBase, nexacro.ChartRadarSeriesControl);
	nexacro.ChartRadarSeriesControl.prototype = _pChartRadarSeriesControl;
	_pChartRadarSeriesControl._type_name = "ChartRadarSeriesControl";




	_pChartRadarSeriesControl.visible = true;


	_pChartRadarSeriesControl.lineopacity = 1;
	_pChartRadarSeriesControl.linestyle = "";
	_pChartRadarSeriesControl.linevisible = true;

	_pChartRadarSeriesControl.highlightlinestyle = "";
	_pChartRadarSeriesControl.highlightlineopacity = 1;
	_pChartRadarSeriesControl.highlightlinevisible = false;
	_pChartRadarSeriesControl.highlightlineopacity = 1;
	_pChartRadarSeriesControl.highlightlinestyle = "";

	_pChartRadarSeriesControl.selectlineopacity = 1;
	_pChartRadarSeriesControl.selectlinestyle = "";

	_pChartRadarSeriesControl.pointfillstyle = "";
	_pChartRadarSeriesControl.pointlinestyle = "";
	_pChartRadarSeriesControl.pointopacity = 1;
	_pChartRadarSeriesControl.pointshape = "circle";
	_pChartRadarSeriesControl.pointsize = undefined;
	_pChartRadarSeriesControl.pointvisible = false;



	_pChartRadarSeriesControl.highlightpointfillstyle = "";
	_pChartRadarSeriesControl.highlightpointlinestyle = "";
	_pChartRadarSeriesControl.highlightpointopacity = 1;
	_pChartRadarSeriesControl.highlightpointsize = undefined;
	_pChartRadarSeriesControl.highlightpointvisible = false;


	_pChartRadarSeriesControl.selectpointfillstyle = "";
	_pChartRadarSeriesControl.selectpointlinestyle = "";
	_pChartRadarSeriesControl.selectpointopacity = 1;

	_pChartRadarSeriesControl.lineareafillstyle = "";
	_pChartRadarSeriesControl.lineareaopacity = 0.5;
	_pChartRadarSeriesControl.lineareavisible = false;

	_pChartRadarSeriesControl.highlightlineareafillstyle = "";
	_pChartRadarSeriesControl.highlightlineareavisible = false;
	_pChartRadarSeriesControl.highlightlineareaopacity = 1;
	_pChartRadarSeriesControl.selectlineareafillstyle = "";
	_pChartRadarSeriesControl.selectlineareaopacity = 1;


	_pChartRadarSeriesControl.pointitemtextposition = "";
	_pChartRadarSeriesControl.lineitemtextposition = "";






	_pChartRadarSeriesControl._pointshape = null;
	_pChartRadarSeriesControl._pointborderwidth = null;
	_pChartRadarSeriesControl._lineborderwidth = null;
	_pChartRadarSeriesControl._linebordercolor = null;
	_pChartRadarSeriesControl._color = null;
	_pChartRadarSeriesControl._changedSeriesColor = true;








	_pChartRadarSeriesControl.destroy = function () {
		if (!this._chart) {
			return;
		}



		if (this._seriesitems.length > 0) {
			for (var i = 0; i < this._seriesitems.length; i++) {
				if (this._seriesitems[i]) {
					if (this._seriesitems[i]._series) {
						delete this._seriesitems[i]._series;
						this._seriesitems[i]._series = null;
					}

					this._seriesitems[i].destroy();
					delete this._seriesitems[i];
					this._seriesitems[i] = null;
				}
			}
		}




		this.visible = true;


		this.lineopacity = null;
		this.linestyle = null;
		this.linevisible = null;

		this.highlightlinestyle = null;
		this.highlightlineopacity = null;
		this.highlightlinevisible = null;
		this.highlightlineopacity = null;
		this.highlightlinestyle = null;

		this.selectlineopacity = null;
		this.selectlinestyle = null;

		this.pointfillstyle = null;
		this.pointlinestyle = null;
		this.pointopacity = null;
		this.pointshape = null;
		this.pointsize = null;
		this.pointvisible = null;



		this.highlightpointfillstyle = null;
		this.highlightpointlinestyle = null;
		this.highlightpointopacity = null;
		this.highlightpointsize = null;
		this.highlightpointvisible = null;


		this.selectpointfillstyle = null;
		this.selectpointlinestyle = null;
		this.selectpointopacity = null;


		this.lineareafillstyle = null;
		this.lineareaopacity = null;
		this.lineareavisible = null;

		this.highlightlineareafillstyle = null;
		this.highlightlineareavisible = null;
		this.highlightlineareaopacity = null;
		this.selectlineareafillstyle = null;
		this.selectlineareaopacity = null;


		this.pointitemtextposition = null;
		this.lineitemtextposition = null;






		this._pointshape = null;
		this._pointborderwidth = null;
		this._lineborderwidth = null;
		this._linebordercolor = null;
		this._color = null;
		this._changedSeriesColor = null;

		return true;
	};

	_pChartRadarSeriesControl.set_visible = function (val) {
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

	_pChartRadarSeriesControl.on_apply_visible = function (visible) {
		if (this._is_initprop) {
			return;
		}

		if (visible) {
			var selecttype = this.selecttype;
			if (selecttype) {
				this._chart._changedData = true;
			}
			else {
				this._redrawSeries = false;
				this._applyPropertySeries("visible", true);
			}

			if (this.itemtextvisible) {
				this.on_apply_itemtextvisible(true);
			}
		}
		else {
			this._redrawSeries = false;
			this._applyPropertySeries("visible", false);

			if (!this._itemtextvisible) {
				this.on_apply_itemtextvisible(false);
			}
		}

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};


	_pChartRadarSeriesControl.set_linestyle = function (val) {
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

	_pChartRadarSeriesControl.on_apply_linestyle = function (linestyle) {
		if (linestyle) {
			this._borderwidth = linestyle._width;

			this._linebordercolor = linestyle.color.value;
		}
		this._redrawSeries = false;

		this._applyPropertySeries("Line", "linestyle", linestyle);
	};

	_pChartRadarSeriesControl.set_lineopacity = function (val) {
		this.lineopacity = val;
		if (0 === val || val) {
			if (this._lineopacity == null || this._lineopacity.value != val) {
				var oldValue;
				if (this._lineopacity) {
					oldValue = this._lineopacity.value;
				}
				this._changeContentsProperty("lineopacity", val, oldValue);

				var lineopacity = nexacro.OpacityObject(val);
				this._lineopacity = lineopacity;
				this.on_apply_lineopacity(lineopacity);
			}
		}
		else {
			if (this._lineopacity) {
				this._lineopacity = null;
				this.on_apply_lineopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_lineopacity = function (lineopacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Line", "lineopacity", lineopacity);
	};
	_pChartRadarSeriesControl.set_linevisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.linevisible != val) {
			this._changeContentsProperty("linevisible", val, this.linevisible);
			this.linevisible = val;
			this.on_apply_linevisible(val);
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_linevisible = function (linevisible) {
		var pointvisible = this.pointvisible;

		if (linevisible) {
			this._chart._changedData = true;
			this._applyPropertySeries("Line", "linevisible", true);


			if (!pointvisible && this.itemtextvisible) {
				this.on_apply_itemtextvisible(true);
			}
		}
		else {
			this._chart._changedData = true;
			this._applyPropertySeries("Line", "linevisible", false);
			if (this.lineareavisible) {
				this._applyPropertySeries("Area", "lineareavisible", false);
			}
			if (!pointvisible && !this._itemtextvisible) {
				this.on_apply_itemtextvisible(false);
			}
		}
	};
	_pChartRadarSeriesControl.set_highlightlinevisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.highlightlinevisible != val) {
			this._changeContentsProperty("highlightlinevisible", val, this.highlightlinevisible);
			this.highlightlinevisible = val;
			this.on_apply_highlightlinevisible(val);
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_highlightlinevisible = function (highlightlinevisible) {
	};

	_pChartRadarSeriesControl.set_highlightlinestyle = function (val) {
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

	_pChartRadarSeriesControl.on_apply_highlightlinestyle = function (highlightlinestyle) {
	};

	_pChartRadarSeriesControl.set_highlightlineopacity = function (val) {
		this.highlightlineopacity = val;
		if (0 === val || val) {
			if (this._highlightlineopacity == null || this._highlightlineopacity.value != val) {
				var oldValue;
				if (this._highlightlineopacity) {
					oldValue = this._highlightlineopacity.value;
				}
				this._changeContentsProperty("highlightlineopacity", val, oldValue);

				var highlightlineopacity = nexacro.OpacityObject(val);
				this._highlightpointopacity = highlightlineopacity;
				this.on_apply_highlightlineopacity(highlightlineopacity);
			}
		}
		else {
			if (this._highlightpointopacity) {
				this._highlightpointopacity = null;
				this.on_apply_highlightlineopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_highlightlineopacity = function (highlightlineopacity) {
	};

	_pChartRadarSeriesControl.set_selectlineopacity = function (val) {
		this.selectlineopacity = val;
		if (0 === val || val) {
			if (this._selectlineopacity == null || this._selectlineopacity.value != val) {
				var oldValue;
				if (this._selectlineopacity) {
					oldValue = this._selectlineopacity.value;
				}
				this._changeContentsProperty("selectlineopacity", val, oldValue);

				var selectlineopacity = nexacro.OpacityObject(val);
				this._selectlineopacity = selectlineopacity;
				this.on_apply_selectlineopacity(selectlineopacity);
			}
		}
		else {
			if (this._selectlineopacity) {
				this._selectlineopacity = null;
				this.on_apply_selectlineopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_selectlineopacity = function (selectlineopacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Line", "selectlineopacity", selectlineopacity, "select");
	};
	_pChartRadarSeriesControl.set_selectlinestyle = function (val) {
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

	_pChartRadarSeriesControl.on_apply_selectlinestyle = function (selectlinestyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Line", "selectlinestyle", selectlinestyle, "select");
	};




	_pChartRadarSeriesControl.set_pointlinestyle = function (val) {
		this.pointlinestyle = val;
		if (val) {
			if (this._pointlinestyle == null || this._pointlinestyle.value != val) {
				var oldValue;
				if (this._pointlinestyle) {
					oldValue = this._pointlinestyle.value;
				}
				this._changeContentsProperty("pointlinestyle", val, oldValue);

				var pointlinestyle = nexacro.BorderLineObject(val);
				this._pointlinestyle = pointlinestyle;
				this.on_apply_pointlinestyle(pointlinestyle);
			}
		}
		else {
			if (this._pointlinestyle) {
				this._pointlinestyle = null;
				this.on_apply_pointlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_pointlinestyle = function (pointlinestyle) {
		if (pointlinestyle) {
			this._pointborderwidth = pointlinestyle._width;
		}
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "pointlinestyle", pointlinestyle);
	};

	_pChartRadarSeriesControl.set_pointfillstyle = function (val) {
		this.pointfillstyle = val;
		if (val) {
			if (this._pointfillstyle == null || this._pointfillstyle.value != val) {
				var oldValue;
				if (this._pointfillstyle) {
					oldValue = this._pointfillstyle.value;
				}
				this._changeContentsProperty("pointfillstyle", val, oldValue);

				var pointfillstyle = nexacro.BackgroundObject(val, this);
				this._pointfillstyle = pointfillstyle;
				this.on_apply_pointfillstyle(pointfillstyle);
			}
		}
		else {
			if (this._pointfillstyle) {
				this._pointfillstyle = null;
				this.on_apply_pointfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_pointfillstyle = function (pointfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "pointfillstyle", pointfillstyle);

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartRadarSeriesControl.set_pointopacity = function (val) {
		this.pointopacity = val;
		if (0 === val || val) {
			if (this._pointopacity == null || this._pointopacity.value != val) {
				var oldValue;
				if (this._pointopacity) {
					oldValue = this._pointopacity.value;
				}
				this._changeContentsProperty("pointopacity", val, oldValue);

				var pointopacity = nexacro.OpacityObject(val);
				this._pointopacity = pointopacity;
				this.on_apply_pointopacity(pointopacity);
			}
		}
		else {
			if (this._pointopacity) {
				this._pointopacity = null;
				this.on_apply_pointopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_pointopacity = function (pointopacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "pointopacity", pointopacity);
	};

	_pChartRadarSeriesControl.set_pointsize = function (val) {
		if (val !== undefined && val !== null && val !== "") {
			if (isNaN(val) || val < 0) {
				return;
			}

			val = parseInt(val);
		}

		if (this.pointsize != val) {
			this._changeContentsProperty("pointsize", val, this.pointsize);
			this.pointsize = val;
			this.on_apply_pointsize();
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_pointsize = function () {
		this._chart._changedData = true;
	};

	_pChartRadarSeriesControl.set_pointshape = function (val) {
		var pointshape_enum = ["circle", "square", "diamond", "triangle", "cross"];
		if (pointshape_enum.indexOf(val) == -1) {
			return;
		}

		if (this.pointshape != val) {
			this._changeContentsProperty("pointshape", val, this.pointshape);
			this.pointshape = val;
			this.on_apply_pointshape();
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_pointshape = function () {
		this._chart._changedData = true;
	};
	_pChartRadarSeriesControl.set_pointvisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.pointvisible != val) {
			this._changeContentsProperty("pointvisible", val, this.pointvisible);
			this.pointvisible = val;
			this.on_apply_pointvisible(val);
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_pointvisible = function (pointvisible) {
		if (pointvisible) {
			var selecttype = this.selecttype;
			if (selecttype) {
				this._chart._changedData = true;
			}
			else {
				this._chart._changedData = true;
				this._applyPropertySeries("Point", "pointvisible", true);
			}

			if (this.itemtextvisible) {
				this.on_apply_itemtextvisible(true);
			}
		}
		else {
			this._chart._changedData = true;
			this._applyPropertySeries("Point", "pointvisible", false);

			if (!this._itemtextvisible) {
				this.on_apply_itemtextvisible(false);
			}
		}
	};
	_pChartRadarSeriesControl.set_highlightpointvisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.highlightpointvisible != val) {
			this._changeContentsProperty("highlightpointvisible", val, this.highlightpointvisible);
			this.highlightpointvisible = val;
			this.on_apply_highlightpointvisible();
		}
	};

	_pChartRadarSeriesControl.on_apply_highlightpointvisible = function () {
	};

	_pChartRadarSeriesControl.set_highlightpointsize = function (val) {
		if (val !== undefined && val !== null && val !== "") {
			if (isNaN(val) || val < 0) {
				return;
			}

			val = parseInt(val);
		}

		if (this.highlightpointsize != val) {
			this._changeContentsProperty("highlightpointsize", val, this.highlightpointsize);
			this.highlightpointsize = val;
			this.on_apply_highlightpointsize();
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_highlightpointsize = function () {
		this._chart._rearrange = true;
		this._chart._recreate = true;
	};

	_pChartRadarSeriesControl.set_highlightpointlinestyle = function (val) {
		this.highlightpointlinestyle = val;
		if (val) {
			if (this._highlightpointlinestyle == null || this._highlightpointlinestyle.value != val) {
				var oldValue;
				if (this._highlightpointlinestyle) {
					oldValue = this._highlightpointlinestyle.value;
				}
				this._changeContentsProperty("highlightpointlinestyle", val, oldValue);

				var highlightpointlinestyle = nexacro.BorderLineObject(val);
				this._highlightpointlinestyle = highlightpointlinestyle;
				this.on_apply_highlightpointlinestyle(highlightpointlinestyle);
			}
		}
		else {
			if (this._highlightpointlinestyle) {
				this._highlightpointlinestyle = null;
				this.on_apply_highlightpointlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_highlightpointlinestyle = function (highlightpointlinestyle) {
	};

	_pChartRadarSeriesControl.set_highlightpointfillstyle = function (val) {
		this.highlightpointfillstyle = val;
		if (val) {
			if (this._highlightpointfillstyle == null || this._highlightpointfillstyle.value != val) {
				var oldValue;
				if (this._highlightpointfillstyle) {
					oldValue = this._highlightpointfillstyle.value;
				}
				this._changeContentsProperty("highlightpointfillstyle", val, oldValue);

				var highlightpointfillstyle = nexacro.BackgroundObject(val, this);
				this._highlightpointfillstyle = highlightpointfillstyle;
				this.on_apply_highlightpointfillstyle(highlightpointfillstyle);
			}
		}
		else {
			if (this._highlightpointfillstyle) {
				this._highlightpointfillstyle = null;
				this.on_apply_highlightpointfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_highlightpointfillstyle = function (highlightpointfillstyle) {
	};

	_pChartRadarSeriesControl.set_highlightpointopacity = function (val) {
		this.highlightpointopacity = val;
		if (0 === val || val) {
			if (this._highlightpointopacity == null || this._highlightpointopacity.value != val) {
				var oldValue;
				if (this._highlightpointopacity) {
					oldValue = this._highlightpointopacity.value;
				}
				this._changeContentsProperty("highlightpointopacity", val, oldValue);

				var highlightpointopacity = nexacro.OpacityObject(val);
				this._highlightpointopacity = highlightpointopacity;
				this.on_apply_highlightpointopacity(highlightpointopacity);
			}
		}
		else {
			if (this._highlightpointopacity) {
				this._highlightpointopacity = null;
				this.on_apply_highlightpointopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_highlightpointopacity = function (highlightpointopacity) {
	};

	_pChartRadarSeriesControl.set_selectpointlinestyle = function (val) {
		this.selectpointlinestyle = val;
		if (val) {
			if (this._selectpointlinestyle == null || this._selectpointlinestyle.value != val) {
				var oldValue;
				if (this._selectpointlinestyle) {
					oldValue = this._selectpointlinestyle.value;
				}
				this._changeContentsProperty("selectpointlinestyle", val, oldValue);

				var selectpointlinestyle = nexacro.BorderLineObject(val);
				this._selectpointlinestyle = selectpointlinestyle;
				this.on_apply_selectpointlinestyle(selectpointlinestyle);
			}
		}
		else {
			if (this._selectpointlinestyle) {
				this._selectpointlinestyle = null;
				this.on_apply_selectpointlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_selectpointlinestyle = function (selectpointlinestyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "selectpointlinestyle", selectpointlinestyle, "select");
	};

	_pChartRadarSeriesControl.set_selectpointfillstyle = function (val) {
		this.selectpointfillstyle = val;
		if (val) {
			if (this._selectpointfillstyle == null || this._selectpointfillstyle.value != val) {
				var oldValue;
				if (this._selectpointfillstyle) {
					oldValue = this._selectpointfillstyle.value;
				}
				this._changeContentsProperty("selectpointfillstyle", val, oldValue);

				var selectpointfillstyle = nexacro.BackgroundObject(val, this);
				this._selectpointfillstyle = selectpointfillstyle;
				this.on_apply_selectpointfillstyle(selectpointfillstyle);
			}
		}
		else {
			if (this._selectpointfillstyle) {
				this._selectpointfillstyle = null;
				this.on_apply_selectpointfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_selectpointfillstyle = function (selectpointfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "selectpointfillstyle", selectpointfillstyle, "select");
	};

	_pChartRadarSeriesControl.set_selectpointopacity = function (val) {
		this.selectpointopacity = val;
		if (0 === val || val) {
			if (this._selectpointopacity == null || this._selectpointopacity.value != val) {
				var oldValue;
				if (this._selectpointopacity) {
					oldValue = this._selectpointopacity.value;
				}
				this._changeContentsProperty("selectpointopacity", val, oldValue);

				var selectpointopacity = nexacro.OpacityObject(val);
				this._selectpointopacity = selectpointopacity;
				this.on_apply_selectpointopacity(selectpointopacity);
			}
		}
		else {
			if (this._selectpointopacity) {
				this._selectpointopacity = null;
				this.on_apply_selectpointopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_selectpointopacity = function (selectpointopacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "selectpointopacity", selectpointopacity, "select");
	};



	_pChartRadarSeriesControl.set_lineareavisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.lineareavisible != val) {
			this._changeContentsProperty("lineareavisible", val, this.lineareavisible);
			this.lineareavisible = val;
			this.on_apply_lineareavisible();
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_lineareavisible = function () {
		this._chart._changedData = true;
	};

	_pChartRadarSeriesControl.set_lineareafillstyle = function (val) {
		this.lineareafillstyle = val;
		if (val) {
			if (this._lineareafillstyle == null || this._lineareafillstyle.value != val) {
				var oldValue;
				if (this._lineareafillstyle) {
					oldValue = this._lineareafillstyle.value;
				}
				this._changeContentsProperty("lineareafillstyle", val, oldValue);

				var lineareafillstyle = nexacro.BackgroundObject(val, this);
				this._lineareafillstyle = lineareafillstyle;
				this.on_apply_lineareafillstyle(lineareafillstyle);
			}
		}
		else {
			if (this._lineareafillstyle) {
				this._lineareafillstyle = null;
				this.on_apply_lineareafillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_lineareafillstyle = function (lineareafillstyle) {
		if (this.lineareavisible) {
			this._applyPropertySeries("Area", "lineareafillstyle", lineareafillstyle);

			if (this._chart.legend) {
				this._chart._applyLegendItem();
			}
			this._chart._rearrange = true;
			this._chart._recreate = true;
		}
	};

	_pChartRadarSeriesControl.set_lineareaopacity = function (val) {
		this.lineareaopacity = val;
		if (0 === val || val) {
			if (this._lineareaopacity == null || this._lineareaopacity.value != val) {
				var oldValue;
				if (this._lineareaopacity) {
					oldValue = this._lineareaopacity.value;
				}
				this._changeContentsProperty("lineareaopacity", val, oldValue);

				var lineareaopacity = nexacro.OpacityObject(val);
				this._lineareaopacity = lineareaopacity;
				this.on_apply_lineareaopacity(lineareaopacity);
			}
		}
		else {
			if (this.lineareaopacity) {
				this.lineareaopacity = null;
				this.on_apply_lineareaopacity(null);
			}
		}

		this._chart._draw();
	};
	_pChartRadarSeriesControl.on_apply_lineareaopacity = function (lineareaopacity) {
		this._applyPropertySeries("Area", "lineareaopacity", lineareaopacity);
	};
	_pChartRadarSeriesControl.set_highlightlineareavisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.highlightlineareavisible != val) {
			this._changeContentsProperty("highlightlineareavisible", val, this.highlightlineareavisible);
			this.highlightlineareavisible = val;
			this.on_apply_highlightlineareavisible(val);
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_highlightlineareavisible = function (highlightlinevisible) {
	};
	_pChartRadarSeriesControl.set_highlightlineareafillstyle = function (val) {
		this.highlightlineareafillstyle = val;
		if (val) {
			if (this._highlightlineareafillstyle == null || this._highlightlineareafillstyle.value != val) {
				var oldValue;
				if (this._highlightlineareafillstyle) {
					oldValue = this._highlightlineareafillstyle.value;
				}
				this._changeContentsProperty("highlightlineareafillstyle", val, oldValue);

				var highlightlineareafillstyle = nexacro.BackgroundObject(val, this);
				this._highlightlineareafillstyle = highlightlineareafillstyle;
				this.on_apply_highlightlineareafillstyle(highlightlineareafillstyle);
			}
		}
		else {
			if (this._highlightlineareafillstyle) {
				this._highlightlineareafillstyle = null;
				this.on_apply_highlightlineareafillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_highlightlineareafillstyle = function (highlightpointfillstyle) {
	};



	_pChartRadarSeriesControl.set_highlightlineareaopacity = function (val) {
		this.highlightlineareaopacity = val;
		if (0 === val || val) {
			if (this._highlightlineareaopacity == null || this._highlightlineareaopacity.value != val) {
				var oldValue;
				if (this._highlightlineareaopacity) {
					oldValue = this._highlightlineareaopacity.value;
				}
				this._changeContentsProperty("highlightlineareaopacity", val, oldValue);

				var highlightlineareaopacity = nexacro.OpacityObject(val);
				this._highlightlineareaopacity = highlightlineareaopacity;
				this.on_apply_highlightpointopacity(highlightlineareaopacity);
			}
		}
		else {
			if (this._highlightlineareaopacity) {
				this._highlightlineareaopacity = null;
				this.on_apply_highlightpointopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_highlightlineareaopacity = function (highlightlineareaopacity) {
	};


	_pChartRadarSeriesControl.set_selectlineareafillstyle = function (val) {
		this.selectlineareafillstyle = val;
		if (val) {
			if (this._selectlineareafillstyle == null || this._selectlineareafillstyle.value != val) {
				var oldValue;
				if (this._selectlineareafillstyle) {
					oldValue = this._selectlineareafillstyle.value;
				}
				this._changeContentsProperty("selectlineareafillstyle", val, oldValue);

				var selectlineareafillstyle = nexacro.BackgroundObject(val, this);
				this._selectlineareafillstyle = selectlineareafillstyle;
				this.on_apply_selectlineareafillstyle(selectlineareafillstyle);
			}
		}
		else {
			if (this._selectlineareafillstyle) {
				this._selectlineareafillstyle = null;
				this.on_apply_selectlineareafillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_selectlineareafillstyle = function (selectlineareafillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Area", "selectlineareafillstyle", selectlineareafillstyle, "select");
	};



	_pChartRadarSeriesControl.set_selectlineareaopacity = function (val) {
		this.selectlineareaopacity = val;
		if (0 === val || val) {
			if (this._selectlineareaopacity == null || this._selectlineareaopacity.value != val) {
				var oldValue;
				if (this._selectlineareaopacity) {
					oldValue = this._selectlineareaopacity.value;
				}
				this._changeContentsProperty("selectlineareaopacity", val, oldValue);

				var selectlineareaopacity = nexacro.OpacityObject(val);
				this._selectlineareaopacity = selectlineareaopacity;
				this.on_apply_selectlineareaopacity(selectlineareaopacity);
			}
		}
		else {
			if (this._selectlineareaopacity) {
				this._selectlineareaopacity = null;
				this.on_apply_selectlineareaopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartRadarSeriesControl.on_apply_selectlineareaopacity = function (selectlineareaopacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Area", "selectlineareaopacity", selectlineareaopacity, "select");
	};
	_pChartRadarSeriesControl.set_pointitemtextgap = function (val) {
		if (val !== undefined && val !== null && val !== "") {
			if (isNaN(val)) {
				return;
			}

			val = parseInt(val);
		}
		if (this.pointitemtextgap != val) {
			this._changeContentsProperty("pointitemtextgap", val, this.pointitemtextgap);
			this.pointitemtextgap = val;
			this.on_apply_pointitemtextgap();
		}
	};
	_pChartRadarSeriesControl.on_apply_pointitemtextgap = function () {
		this._chart._rearrange = true;
		this._chart._recreate = true;
	};
	_pChartRadarSeriesControl.set_lineitemtextgap = function (val) {
		if (val !== undefined && val !== null && val !== "") {
			if (isNaN(val)) {
				return;
			}

			val = parseInt(val);
		}
		if (this.lineitemtextgap != val) {
			this._changeContentsProperty("lineitemtextgap", val, this.lineitemtextgap);
			this.lineitemtextgap = val;
			this.on_apply_lineitemtextgap();
		}
	};
	_pChartRadarSeriesControl.on_apply_lineitemtextgap = function () {
		this._chart._rearrange = true;
		this._chart._recreate = true;
	};
	_pChartRadarSeriesControl.set_pointitemtextposition = function (val) {
		var itemtextposition_enum = ["lefttop", "centertop", "righttop", "leftmiddle", "centermiddle", "rightmiddle", "leftbottom", "centerbottom", "rightbottom"];
		if (itemtextposition_enum.indexOf(val) == -1) {
			return;
		}

		if (this.pointitemtextposition != val) {
			this._changeContentsProperty("pointitemtextposition", val, this.pointitemtextposition);
			this.pointitemtextposition = val;
			this.on_apply_pointitemtextposition();
		}

		this._chart._draw();
	};
	_pChartRadarSeriesControl.on_apply_pointitemtextposition = function () {
		this._chart._recreate = true;
		this._chart._rearrange = true;
	};
	_pChartRadarSeriesControl.set_lineitemtextposition = function (val) {
		var itemtextposition_enum = ["lefttop", "centertop", "righttop", "leftmiddle", "centermiddle", "rightmiddle", "leftbottom", "centerbottom", "rightbottom"];
		if (itemtextposition_enum.indexOf(val) == -1) {
			return;
		}

		if (this.lineitemtextposition != val) {
			this._changeContentsProperty("lineitemtextposition", val, this.lineitemtextposition);
			this.lineitemtextposition = val;
			this.on_apply_lineitemtextposition();
		}

		this._chart._draw();
	};
	_pChartRadarSeriesControl.on_apply_lineitemtextposition = function () {
		this._chart._recreate = true;
		this._chart._rearrange = true;
	};

	_pChartRadarSeriesControl._applyPropertySeries = function (type, style, value, select) {
		var item = null, seriesGroup = this._chart._graphicsControl.getObjectByID("ChartSeriesGroup");

		if (seriesGroup) {
			for (var i = 1; i <= this._itemCnt; i++) {
				if (type == "Line" && this.lineareavisible == true) {
					type = "Area";
				}
				var itemID = this._configIndex + " Series" + type + "Item_" + (i - 1), isselectitem = false;

				item = seriesGroup.getObjectByID(itemID);
				if (!nexacro._isNull(item)) {
					var length = this._selectedItem.length;
					if (length > 0) {
						if (type == "Line" || type == "Area") {
							var selecttype = this.selecttype;
							if (selecttype == "select") {
								isselectitem = true;
							}
							else if (selecttype == "unselect") {
								isselectitem = false;
							}
							else {
								var selectlinestyle = this.selectlinestyle, selectlineareafillstyle = this.selectlineareafillstyle, selectlineopacity = this.selectlineopacity, selectlineareaopacity = this.selectlineareaopacity;

								if (selectlinestyle || selectlineareafillstyle || selectlineopacity || selectlineareaopacity) {
									isselectitem = true;
								}
							}
						}
						else {
							isselectitem = this._selectedItem[i - 1];
						}
					}

					if (isselectitem) {
						if (style == "selectpointfillstyle" || style == "selectlineareafillstyle") {
							item.set_fillstyle(value);
						}
						else if (style == "selectpointlinestyle" || style == "selectlinestyle") {
							item.set_strokepen(value);
						}
						else if (style == "selectpointopacity" || style == "selectlineopacity" || style == "selectlineareaopacity") {
							item.set_opacity(value);
						}
						else if (style == "pointvisible" || style == "linevisible" || style == "lineareavisible") {
							item.set_visible(value);
						}
					}
					else {
						if (style == "pointfillstyle" || style == "lineareafillstyle") {
							item.set_fillstyle(value);
						}
						else if (style == "pointlinestyle" || style == "linestyle") {
							item.set_strokepen(value);
						}
						else if (style == "pointopacity" || style == "lineopacity" || style == "lineareaopacity") {
							item.set_opacity(value);
						}
						else if (style == "pointvisible" || style == "linevisible" || style == "lineareavisible") {
							item.set_visible(value);
						}
					}
				}
			}
		}
	};



	_pChartRadarSeriesControl._draw2 = function (redraw) {
		if (!redraw) {
			return;
		}
		this._itemCnt = 0;
		this._itemtextlist = [];


		if (this.linevisible) {
			this._drawSeriesLines();
		}

		if (this.pointvisible) {
			this._drawSeriesPoints();
		}
	};
	_pChartRadarSeriesControl._draw = function (redraw) {
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
	_pChartRadarSeriesControl._drawnow = function () {
		if (this.linevisible) {
			this._drawSeriesLines();
		}

		if (this.pointvisible) {
			this._drawSeriesPoints();
		}
	};
	_pChartRadarSeriesControl._drawSeriesLines = function () {
		var linestyle = this.linestyle || "1px solid " + this._color, lineopacity = this.lineopacity, lineareavisible = this.lineareavisible, lineareafillstyle = this.lineareafillstyle || this._color, lineareaopacity = this.lineareaopacity, categoryaxis = this._chart.categoryaxis, valueaxis = this._chart.valueaxes[0], path, area, datapoints = this._datapoints, seriesGroup = this._chart._seriesGroup, selectedItem = this._selectedItem, selectlinestyle = this.selectlinestyle || "1px solid " + this._selectcolor, selectlineareafillstyle = this.selectlineareafillstyle || this._selectcolor, selectlineopacity = this.selectlineopacity || this.lineopacity, selectlineareaopacity = this.selectlineareaopacity || this.lineareaopacity, isselectitem = false, effect = this._chart_aniframe_obj, length = 0;

		length = selectedItem.length;
		for (var i = 0; i < length; i++) {
			var isselect = selectedItem[i];
			if (isselect) {
				isselectitem = true;
				break;
			}
		}
		if (effect && effect.isloadanimation) {
			isselectitem = false;
		}

		if (isselectitem) {
			path = this._drawLine(datapoints, 0, 0, categoryaxis, valueaxis, selectlinestyle, selectlineopacity, false, false);
			if (lineareavisible) {
				area = this._drawLine(datapoints, 0, 0, categoryaxis, valueaxis, "1px solid " + selectlineareafillstyle, selectlineopacity, lineareavisible, false);
			}
			if (area) {
				if (lineareavisible) {
					area.set_fillstyle(selectlineareafillstyle);
					if (!nexacro._GraphicsLib.isEmpty(selectlineareaopacity)) {
						area.set_opacity(selectlineareaopacity);
					}
					area.closePath();
				}
			}
		}
		else {
			path = this._drawLine(datapoints, 0, 0, categoryaxis, valueaxis, linestyle, lineopacity, false, false);
			if (lineareavisible) {
				area = this._drawLine(datapoints, 0, 0, categoryaxis, valueaxis, "1px solid " + lineareafillstyle, lineopacity, lineareavisible, false);
			}
			if (area) {
				if (lineareavisible) {
					area.set_fillstyle(lineareafillstyle);
					if (!nexacro._GraphicsLib.isEmpty(lineareaopacity)) {
						area.set_opacity(+lineareaopacity);
					}
					area.closePath();
				}
			}
		}

		var itemtextvisible = this.itemtextvisible, pointvisible = this.pointvisible;
		if (!pointvisible && itemtextvisible) {
			if (path) {
				if (effect && effect.isloadanimation) {
				}
				else {
					this._drawLineItemText(datapoints, categoryaxis, valueaxis, path);
				}
			}
		}
	};
	_pChartRadarSeriesControl._drawSeriesPoints = function () {
		var pointlinestyle = this.pointlinestyle || "1px solid " + this._color, pointfillstyle = this.pointfillstyle || this._color, pointopacity = this.pointopacity, index = 0, categoryaxis = this._chart.categoryaxis, valueaxis = this._chart.valueaxes[0], datapoints = this._datapoints, points = datapoints.points.slice(0), ps = datapoints.pointsize, selectitem, selectpointlinestyle = this.selectpointlinestyle || "1px solid " + this._selectcolor, selectpointfillstyle = this.selectpointfillstyle || this._selectcolor, selectpointopacity = this.selectpointopacity || this.pointopacity, selectedItem = this._selectedItem, isselectitem = false, effect = this._chart_aniframe_obj, pointsize;
		if ((this.pointsize == "" || this.pointsize == undefined) && this.pointsize !== 0) {
			pointsize = 5;
		}
		else {
			pointsize = this.pointsize;
		}
		if (effect && effect.isloadanimation) {
			points = this._getanimationdrawvalue(points);
		}
		for (var i = 0; i < points.length; i += ps) {
			var length = selectedItem.length;
			if (length > 0) {
				isselectitem = selectedItem[index];
			}
			if (effect && effect.isloadanimation) {
				isselectitem = false;
			}
			if (isselectitem) {
				this._drawPoint(points[i], points[i + 1], pointsize, categoryaxis, valueaxis, this.pointshape, this._pointshape, selectpointlinestyle, selectpointfillstyle, selectpointopacity, index);
			}
			else {
				this._drawPoint(points[i], points[i + 1], pointsize, categoryaxis, valueaxis, this.pointshape, this._pointshape, pointlinestyle, pointfillstyle, pointopacity, index);
			}
			index++;
		}
		this._itemCnt += index;
	};
	_pChartRadarSeriesControl._showPointHighlight = function (item) {
		if (!this.highlightpointvisible) {
			return;
		}
		var pointHighlight = item._pointHighlight;

		if (!pointHighlight) {
			var points = item._points, index = item.index, highlightpointlinestyle = this.highlightpointlinestyle || "1px solid " + this._highlightcolor, highlightpointfillstyle = this.highlightpointfillstyle || this._highlightcolor, highlightpointopacity = this.highlightpointopacity, highlightpointsize = this.highlightpointsize, categoryaxis = this._chart.categoryaxis, valueaxis = this._chart.valueaxes[0], highlightGroup = this._chart._highlightGroup;


			if ((highlightpointsize == "" || highlightpointsize == undefined) && highlightpointsize !== 0) {
				highlightpointsize = 15;
			}

			if (!points) {
				return false;
			}

			this._drawPoint(points[0], points[1], highlightpointsize, categoryaxis, valueaxis, this.pointshape, this._pointshape, highlightpointlinestyle, highlightpointfillstyle, highlightpointopacity, index, item);
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, false);
			this._chart._graphicsControl.draw();
		}
	};
	_pChartRadarSeriesControl._hidePointHighlight = function (item) {
		if (!this.highlightpointvisible) {
			return;
		}

		var pointHighlight = item._pointHighlight;
		if (pointHighlight && !nexacro._GraphicsLib.isEmpty(pointHighlight.parent)) {
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, true);
			this._chart._highlightGroup.removeChild(pointHighlight);
			delete item._pointHighlight;
			item._pointHighlight = null;
			this._chart._graphicsControl.draw();
		}
	};
	_pChartRadarSeriesControl._showLineHighlight = function (item) {
		if (!this.highlightlinevisible) {
			return;
		}
		var lineHighlight = item._lineHighlight;
		if (!lineHighlight) {
			this._drawLineHighlight(item);
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, false);
			this._chart._graphicsControl.draw();
		}
	};
	_pChartRadarSeriesControl._hideLineHighlight = function (item) {
		if (!this.highlightlinevisible) {
			return;
		}

		var lineHighlight = item._lineHighlight;
		if (lineHighlight && !nexacro._GraphicsLib.isEmpty(lineHighlight.parent)) {
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, true);
			this._chart._highlightGroup.removeChild(lineHighlight);
			delete item._lineHighlight;
			item._lineHighlight = null;
			this._chart._graphicsControl.draw();
		}
	};


	_pChartRadarSeriesControl._showLineAreaHighlight = function (item) {
		if (!this.highlightlineareavisible) {
			return;
		}
		var lineareaHighlight = item._lineareaHighlight;
		if (!lineareaHighlight) {
			this._drawLineAreaHighlight(item);
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, false);
			this._chart._graphicsControl.draw();
		}
	};
	_pChartRadarSeriesControl._hideLineAreaHighlight = function (item) {
		if (!this.highlightlineareavisible) {
			return;
		}

		var lineareaHighlight = item._lineareaHighlight;
		if (lineareaHighlight && !nexacro._GraphicsLib.isEmpty(lineareaHighlight.parent)) {
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, true);
			this._chart._highlightGroup.removeChild(lineareaHighlight);
			delete item._lineareaHighlight;
			item._lineareaHighlight = null;
			this._chart._graphicsControl.draw();
		}
	};
	_pChartRadarSeriesControl._drawLineHighlight = function (item) {
		var highlightlinestyle = this.highlightlinestyle || "1px solid " + this._highlightcolor, highlightlineopacity = this.highlightlineopacity, datapoints = this._datapoints, categoryaxis = this._chart.categoryaxis, valueaxis = this._chart.valueaxes[0], path, highlightGroup = this._chart._highlightGroup;

		path = this._drawLine(datapoints, 0, 0, categoryaxis, valueaxis, highlightlinestyle, highlightlineopacity, false, true);
		highlightGroup.addChild(path);

		item._lineHighlight = path;
		path._item = item;
		path._series = this;
	};
	_pChartRadarSeriesControl._drawLineAreaHighlight = function (item) {
		var highlightlineareafillstyle = this.highlightlineareafillstyle || this._highlightcolor, highlightlineareaopacity = this.highlightlineareaopacity, highlightlinestyle = "1px solid " + highlightlineareafillstyle, highlightlineopacity = this.highlightlineopacity, datapoints = this._datapoints, categoryaxis = this._chart.categoryaxis, valueaxis = this._chart.valueaxes[0], area, highlightGroup = this._chart._highlightGroup;


		area = this._drawLine(datapoints, 0, 0, categoryaxis, valueaxis, highlightlinestyle, highlightlineopacity, true, true);
		highlightGroup.addChild(area);

		area.set_fillstyle(highlightlineareafillstyle);
		if (!nexacro._GraphicsLib.isEmpty(highlightlineareaopacity)) {
			area.set_opacity(highlightlineareaopacity);
		}
		area.closePath();
		item._lineareaHighlight = area;
		area._item = item;
		area._series = this;
	};
	_pChartRadarSeriesControl._drawPoint = function (x, y, radius, categoryaxis, valueaxis, pointshape, _pointshape, pointlinestyle, pointfillstyle, pointopacity, index, item) {
		var chart = this._chart, point, cx, cy, points = [], evtInfo, seriesId, shiftPointX = 0, shiftPointY = 0, seriesGroup = chart._seriesGroup, tmp, xoffset = 0, yoffset = 0, effect = this._chart_aniframe_obj, highlightGroup = chart._highlightGroup;


		if (x == null || y == null || x < categoryaxis._min || x > categoryaxis._max || y < valueaxis._min || y > valueaxis._max) {
			return;
		}
		xoffset += -this._chart._boardRectLeft;
		yoffset += -this._chart._boardRectTop;
		cx = categoryaxis.p2c(x, y) + xoffset;
		cy = valueaxis.p2c(y, x) + yoffset;





		if (item) {
			var highlightitem = item._pointHighlight;
			if (!highlightitem) {
				if (pointshape == "square" || pointshape == "diamond" || pointshape == "triangle" || pointshape == "cross") {
					radius = radius / 2;
					point = _pointshape(cx, cy, radius);
				}
				else {
					point = new nexacro.GraphicsEllipse(cx, cy, radius, radius);
				}
				seriesId = this._configIndex + " SeriesHighlightPointItem";
				point.set_id(seriesId);
				highlightGroup.addChild(point);

				item._pointHighlight = point;
				item.index = index;
				point._item = item;
				point.index = item.index;
				point.value = item.value;
			}
		}
		else {
			if (seriesGroup) {
				seriesId = this._configIndex + " SeriesPointItem_" + index;
				point = seriesGroup.getObjectByID(seriesId);
				if (point) {
					if (pointshape == "square" || pointshape == "diamond" || pointshape == "triangle" || pointshape == "cross") {
						radius = radius / 2;
						point = _pointshape(cx, cy, radius, point);
					}
					else {
						point.set_cx(cx);
						point.set_cy(cy);
						point.set_width(radius);
						point.set_height(radius);
					}
				}
				else {
					if (pointshape == "square" || pointshape == "diamond" || pointshape == "triangle" || pointshape == "cross") {
						radius = radius / 2;
						point = _pointshape(cx, cy, radius);
					}
					else {
						point = new nexacro.GraphicsEllipse(cx, cy, radius, radius);
					}
					point.set_id(seriesId);
					seriesGroup.addChild(point);
				}
				point.index = index;
				point.value = y;

				points[0] = x;
				points[1] = y;

				point.radius = radius;
				point._points = points;
			}
		}
		point.set_strokepen(pointlinestyle);
		point.set_fillstyle(pointfillstyle);
		point.set_opacity(pointopacity);

		point._series = this;
		this._seriesitems[point.index] = point;

		if (point && !item) {
			var itemtextvisible = this.itemtextvisible;

			if (itemtextvisible && point) {
				if (effect && effect.isloadanimation) {
				}
				else {
					this._drawPointItemText(cx, cy, point);
				}
			}
		}
	};

	_pChartRadarSeriesControl._drawLine = function (datapoints, xoffset, yoffset, categoryaxis, valueaxis, linestyle, lineopacity, Islineareavisible, Ishighlight) {
		var points = datapoints.points.slice(0), ps = datapoints.pointsize, prevx = null, prevy = null, path, startPointX, endPointX, startPointY, endPointY, ypos = 1, xpos = 0, effect = this._chart_aniframe_obj, seriesid, bcreate = false, seriesGroup = this._chart._seriesGroup, lineareavisible = Islineareavisible, bstartline = false;
		xoffset += -this._chart._boardRectLeft;
		yoffset += -this._chart._boardRectTop;

		if (points.length <= 0) {
			return;
		}

		if (Ishighlight) {
			path = new nexacro.GraphicsPaths();
			if (!lineareavisible) {
				path.set_id(this._configIndex + " SeriesHighlightLineItem_0");
			}
			else {
				path.set_id(this._configIndex + " SeriesHighlightAreaItem_0");
			}
		}
		else {
			if (effect && effect.isloadanimation) {
				points = this._getanimationdrawvalue(points);
			}

			if (!lineareavisible) {
				seriesid = this._configIndex + " SeriesLineItem_0";
			}
			else {
				seriesid = this._configIndex + " SeriesAreaItem_0";
			}
			path = seriesGroup.getObjectByID(seriesid);

			if (path) {
				path.clear();
			}
			else {
				path = new nexacro.GraphicsPaths();
				path.set_id(seriesid);
				bcreate = true;
			}
		}



		path.set_strokepen(linestyle);
		path.set_opacity(lineopacity);

		if (!nexacro._GraphicsLib.isEmpty(lineopacity)) {
			path.set_opacity(lineopacity);
		}

		for (var i = ps; i < points.length; i += ps) {
			var x1, y1, x2, y2;


			x1 = points[i - ps];
			x2 = points[i];


			y1 = points[i - ps + 1];
			y2 = points[i + 1];


			if (y1 == null || y2 == null) {
				continue;
			}


			if (y1 <= y2 && y1 < valueaxis._min) {
				if (y2 < valueaxis._min) {
					continue;
				}
				x1 = (valueaxis._min - y1) / (y2 - y1) * (x2 - x1) + x1;
				y1 = valueaxis._min;
			}
			else if (y2 <= y1 && y2 < valueaxis._min) {
				if (y1 < valueaxis._min) {
					continue;
				}
				x2 = (valueaxis._min - y1) / (y2 - y1) * (x2 - x1) + x1;
				y2 = valueaxis._min;
			}

			if (y1 >= y2 && y1 > valueaxis._max) {
				if (y2 > valueaxis._max) {
					continue;
				}
				x1 = (valueaxis._max - y1) / (y2 - y1) * (x2 - x1) + x1;
				y1 = valueaxis._max;
			}
			else if (y2 >= y1 && y2 > valueaxis._max) {
				if (y1 > valueaxis._max) {
					continue;
				}
				x2 = (valueaxis._max - y1) / (y2 - y1) * (x2 - x1) + x1;
				y2 = valueaxis._max;
			}


			if (x1 <= x2 && x1 < categoryaxis._min) {
				if (x2 < categoryaxis._min) {
					continue;
				}
				y1 = (categoryaxis._min - x1) / (x2 - x1) * (y2 - y1) + y1;
				x1 = categoryaxis._min;
			}
			else if (x2 <= x1 && x2 < categoryaxis._min) {
				if (x1 < categoryaxis._min) {
					continue;
				}
				y2 = (categoryaxis._min - x1) / (x2 - x1) * (y2 - y1) + y1;
				x2 = categoryaxis._min;
			}

			if (x1 >= x2 && x1 > categoryaxis._max) {
				if (x2 > categoryaxis._max) {
					continue;
				}
				y1 = (categoryaxis._max - x1) / (x2 - x1) * (y2 - y1) + y1;
				x1 = categoryaxis._max;
			}
			else if (x2 >= x1 && x2 > categoryaxis._max) {
				if (x1 > categoryaxis._max) {
					continue;
				}
				y2 = (categoryaxis._max - x1) / (x2 - x1) * (y2 - y1) + y1;
				x2 = categoryaxis._max;
			}

			if (x1 != prevx || y1 != prevy) {
				startPointX = categoryaxis.p2c(x1, y1) + xoffset;
				startPointY = valueaxis.p2c(y1, x1) + yoffset;



				path.moveTo(startPointX, startPointY);
				bstartline = true;
			}

			prevx = x2;
			prevy = y2;


			endPointX = categoryaxis.p2c(x2, y2) + xoffset;
			endPointY = valueaxis.p2c(y2, x2) + yoffset;


			if (bstartline) {
				path.lineTo(endPointX, endPointY);
			}
		}

		if (Ishighlight) {
			if (!lineareavisible) {
				if (bstartline) {
					path.lineTo(startPointX, startPointY);
				}
			}
		}
		else {
			path._series = this;
			path.index = 0;
			path.value = -1;
			path._points = points;
			if (bcreate) {
				this._itemCnt++;
				this._chart._seriesGroup.addChild(path);
			}

			if (!lineareavisible) {
				if (bstartline) {
					path.lineTo(startPointX, startPointY);
				}
			}
		}

		return path;
	};

	_pChartRadarSeriesControl._drawPointItemText = function (cx, cy, item) {
		var seriesGroup = this._chart._seriesGroup;
		var itemText = this._createSeriesItemText(item);
		var textRect = null, textWidth = 0, textHeight = 0, textLeft = 0, textTop = 0, radius = item.radius, width = this._pointborderwidth, itemtextPosition = this.pointitemtextposition, itemtextGap = this.pointitemtextgap;
		function positionlefttop (itemText, cx, cy, itemtextGap) {
			itemText.set_verticalAlign("bottom");
			itemText.set_textAlign("right");
			var textLeft = cx;
			var textTop = cy;
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			itemText.set_x(textLeft - itemtextGap);
			itemText.set_y(textTop - itemtextGap);
		}
		function positioncentertop (itemText, cx, cy, itemtextGap) {
			itemText.set_verticalAlign("bottom");
			itemText.set_textAlign("center");
			var textLeft = cx;
			var textTop = cy;
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			itemText.set_x(textLeft);
			itemText.set_y(textTop - itemtextGap);
		}
		function positionrighttop (itemText, cx, cy, itemtextGap) {
			itemText.set_verticalAlign("bottom");
			itemText.set_textAlign("left");
			var textLeft = cx;
			var textTop = cy;
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			itemText.set_x(textLeft + itemtextGap);
			itemText.set_y(textTop - itemtextGap);
		}
		function positionleftmiddle (itemText, cx, cy, itemtextGap) {
			itemText.set_verticalAlign("middle");
			itemText.set_textAlign("right");
			var textLeft = cx;
			var textTop = cy;
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			itemText.set_x(textLeft - itemtextGap);
			itemText.set_y(textTop);
		}
		function positioncentermiddle (itemText, cx, cy, itemtextGap) {
			itemText.set_verticalAlign("middle");
			itemText.set_textAlign("center");
			var textLeft = cx;
			var textTop = cy;
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			itemText.set_x(textLeft);
			itemText.set_y(textTop - itemtextGap);
		}
		function positionrightmiddle (itemText, cx, cy, itemtextGap) {
			itemText.set_verticalAlign("middle");
			itemText.set_textAlign("left");
			var textLeft = cx;
			var textTop = cy;
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			itemText.set_x(textLeft + itemtextGap);
			itemText.set_y(textTop);
		}
		function positionleftbottom (itemText, cx, cy, itemtextGap) {
			itemText.set_verticalAlign("top");
			itemText.set_textAlign("right");
			var textLeft = cx;
			var textTop = cy;
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			itemText.set_x(textLeft - itemtextGap);
			itemText.set_y(textTop + itemtextGap);
		}
		function positioncenterbottom (itemText, cx, cy, itemtextGap) {
			itemText.set_verticalAlign("top");
			itemText.set_textAlign("center");
			var textLeft = cx;
			var textTop = cy;
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			itemText.set_x(textLeft);
			itemText.set_y(textTop + itemtextGap);
		}
		function positionrightbottom (itemText, cx, cy, itemtextGap) {
			itemText.set_verticalAlign("top");
			itemText.set_textAlign("left");
			var textLeft = cx;
			var textTop = cy;
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			itemText.set_x(textLeft + itemtextGap);
			itemText.set_y(textTop + itemtextGap);
		}
		if (!nexacro._isNull(itemText)) {
			if (itemtextPosition) {
				switch (itemtextPosition) {
					case "lefttop":
						positionlefttop(itemText, cx, cy, itemtextGap);
						break;
					case "centertop":
						positioncentertop(itemText, cx, cy, itemtextGap);
						break;
					case "righttop":
						positionrighttop(itemText, cx, cy, itemtextGap);
						break;
					case "leftmiddle":
						positionleftmiddle(itemText, cx, cy, itemtextGap);
						break;
					case "centermiddle":
						positioncentermiddle(itemText, cx, cy, itemtextGap);
						break;
					case "rightmiddle":
						positionrightmiddle(itemText, cx, cy, itemtextGap);
						break;
					case "leftbottom":
						positionleftbottom(itemText, cx, cy, itemtextGap);
						break;
					case "centerbottom":
						positioncenterbottom(itemText, cx, cy, itemtextGap);
						break;
					case "rightbottom":
						positionrightbottom(itemText, cx, cy, itemtextGap);
						break;
					default:
						positioncentermiddle(itemText, cx, cy, itemtextGap);
						break;
				}
			}
			else {
				positioncentermiddle(itemText, cx, cy, itemtextGap);
			}

			this._chart._setChangeInBoardAreaPos(itemText);
			seriesGroup.addChild(itemText);
			itemText._series = this;
		}
	};

	_pChartRadarSeriesControl._drawLineItemText = function (datapoints, axisx, axisy, item) {
		var points = datapoints.points, xoffset = 0, yoffset = 0, ps = datapoints.pointsize;
		var itemtextPosition = this.lineitemtextposition, itemtextGap = this.lineitemtextgap;
		var rotateaxis = this._chart.rotateaxis;

		xoffset += -this._chart._boardRectLeft;
		yoffset += -this._chart._boardRectTop;
		function positionlefttop (itemText, cx, cy, itemtextGap, width) {
			itemText.set_verticalAlign("bottom");
			itemText.set_textAlign("right");
			var textLeft = cx;
			var textTop = cy - (width / 2);
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			itemText.set_x(textLeft - itemtextGap);
			itemText.set_y(textTop - itemtextGap);
		}
		function positioncentertop (itemText, cx, cy, itemtextGap, width) {
			itemText.set_verticalAlign("bottom");
			itemText.set_textAlign("center");
			var textLeft = cx;
			var textTop = cy - (width / 2);
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			itemText.set_x(textLeft);
			itemText.set_y(textTop - itemtextGap);
		}
		function positionrighttop (itemText, cx, cy, itemtextGap, width) {
			itemText.set_verticalAlign("bottom");
			itemText.set_textAlign("left");
			var textLeft = cx;
			var textTop = cy - (width / 2);
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			itemText.set_x(textLeft + itemtextGap);
			itemText.set_y(textTop - itemtextGap);
		}
		function positionleftmiddle (itemText, cx, cy, itemtextGap, width) {
			itemText.set_verticalAlign("middle");
			itemText.set_textAlign("right");
			var textLeft = cx;
			var textTop = cy - (width / 2);
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			itemText.set_x(textLeft - itemtextGap);
			itemText.set_y(textTop);
		}
		function positioncentermiddle (itemText, cx, cy, itemtextGap, width) {
			itemText.set_verticalAlign("middle");
			itemText.set_textAlign("center");
			var textLeft = cx;
			var textTop = cy - (width / 2);
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			itemText.set_x(textLeft);
			itemText.set_y(textTop - itemtextGap);
		}
		function positionrightmiddle (itemText, cx, cy, itemtextGap, width) {
			itemText.set_verticalAlign("middle");
			itemText.set_textAlign("left");
			var textLeft = cx;
			var textTop = cy - (width / 2);
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			itemText.set_x(textLeft + itemtextGap);
			itemText.set_y(textTop);
		}
		function positionleftbottom (itemText, cx, cy, itemtextGap, width) {
			itemText.set_verticalAlign("top");
			itemText.set_textAlign("right");
			var textLeft = cx;
			var textTop = cy - (width / 2);
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			itemText.set_x(textLeft - itemtextGap);
			itemText.set_y(textTop + itemtextGap);
		}
		function positioncenterbottom (itemText, cx, cy, itemtextGap, width) {
			itemText.set_verticalAlign("top");
			itemText.set_textAlign("center");
			var textLeft = cx;
			var textTop = cy - (width / 2);
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			itemText.set_x(textLeft);
			itemText.set_y(textTop + itemtextGap);
		}
		function positionrightbottom (itemText, cx, cy, itemtextGap, width) {
			itemText.set_verticalAlign("top");
			itemText.set_textAlign("left");
			var textLeft = cx;
			var textTop = cy - (width / 2);
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			itemText.set_x(textLeft + itemtextGap);
			itemText.set_y(textTop + itemtextGap);
		}
		for (var i = 0; i < points.length; i += ps) {
			var itemindex = points[i], preitemindex = points[i + ps], value = points[i + 1], point = [], linetype = this.linetype, itemText;



			item.index = itemindex;
			item.value = value;

			itemText = this._createSeriesItemText(item);
			if (!nexacro._isNull(itemText)) {
				var textRect = null, textWidth = 0, textHeight = 0, textLeft = 0, textTop = 0, cx = 0, cy = 0, width = this._lineborderwidth, seriesGroup = this._chart._seriesGroup;

				cx = axisx.p2c(itemindex, value) + xoffset;
				cy = axisy.p2c(value, itemindex) + yoffset;

				if (itemtextPosition) {
					switch (itemtextPosition) {
						case "lefttop":
							positionlefttop(itemText, cx, cy, itemtextGap, width);
							break;
						case "centertop":
							positioncentertop(itemText, cx, cy, itemtextGap, width);
							break;
						case "righttop":
							positionrighttop(itemText, cx, cy, itemtextGap, width);
							break;
						case "leftmiddle":
							positionleftmiddle(itemText, cx, cy, itemtextGap, width);
							break;
						case "centermiddle":
							positioncentermiddle(itemText, cx, cy, itemtextGap, width);
							break;
						case "rightmiddle":
							positionrightmiddle(itemText, cx, cy, itemtextGap, width);
							break;
						case "leftbottom":
							positionleftbottom(itemText, cx, cy, itemtextGap, width);
							break;
						case "centerbottom":
							positioncenterbottom(itemText, cx, cy, itemtextGap, width);
							break;
						case "rightbottom":
							positionrightbottom(itemText, cx, cy, itemtextGap, width);
							break;
						default:
							positioncentermiddle(itemText, cx, cy, itemtextGap, width);
							break;
					}
				}
				else {
					positioncentermiddle(itemText, cx, cy, itemtextGap, width);
				}






				this._chart._setChangeInBoardAreaPos(itemText);


				seriesGroup.addChild(itemText);
				itemText._series = this;
				this._itemCnt++;
				this._seriesitems[itemindex] = itemText;
			}
		}
	};
	_pChartRadarSeriesControl._setItemData = function () {
		var data = this._data, itemdata;

		if (data) {
			itemdata = this._processItemData(data);
		}
		return itemdata;
	};

	_pChartRadarSeriesControl._setItemColor = function (items) {
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

	_pChartRadarSeriesControl._processItemData = function (data) {
		var length = data.length, slice = [], i = 0, total = 0;

		if (length <= 2) {
			return slice;
		}
		for (i = 0; i < length; i++) {
			var angleItems = {
			};
			if (data[i] != null && data[i][0] != undefined) {
				angleItems.index = i;
				slice.push(angleItems);
			}
		}


		var items = slice;
		var checkangleval = 10;
		for (i = 0; i < items.length; ++i) {
			total += checkangleval;
		}
		var startangle = 0;
		for (i = 0; i < items.length; ++i) {
			var value = 0;
			var percent = 0;
			var angle = 0;
			var endangle = Math.PI * 2;

			angle = checkangleval * endangle / total;
			percent = (checkangleval / (total / 100)).toFixed(2);
			items[i].startangle = 0;
			items[i].angle = angle;
			items[i].startangle += startangle;
			startangle += angle;
			items[i].endangle = startangle;
			items[i].percent = nexacro.toNumber(percent);
		}

		return items;
	};


	_pChartRadarSeriesControl._afterSetProperties = function () {
		var legend = this._chart.legend;
		if (legend) {
			this._chart._applyLegendItem();
		}
	};
	_pChartRadarSeriesControl._setColor = function (colorset) {
		this._color = colorset;
		this._changedSeriesColor = true;

		var changedColorset = this._chart._changedColorset;
		var width, style, color;
		if (changedColorset) {
			var pointvisible = this.pointvisible, linevisible = this.linevisible, lineareavisible = this.lineareavisible, linestyle, lineareafillstyle, pointlinestyle, pointfillstyle;



			if (linevisible) {
				if (this._linestyle) {
					width = this._linestyle.width;
					style = this._linestyle.style;
					color = this._linestyle.color;

					linestyle = width + " " + style + " " + color;
					this.set_linestyle(linestyle);
				}
				else {
					linestyle = "1px solid " + colorset;
					this._applyPropertySeries("Line", "linestyle", linestyle);
					this.linestyle = linestyle;
				}

				if (this.lineareavisible) {
					if (this._lineareafillstyle) {
						lineareafillstyle = this._lineareafillstyle;
						this.set_lineareafillstyle(lineareafillstyle);
					}
					else {
						lineareafillstyle = colorset;
						this._applyPropertySeries("Area", "lineareafillstyle", lineareafillstyle);
						this.lineareafillstyle = lineareafillstyle;
					}
				}
			}

			if (pointvisible) {
				if (this._pointlinestyle) {
					width = this._pointlinestyle.width;
					style = this._pointlinestyle.style;
					color = this._pointlinestyle.color;

					pointlinestyle = width + " " + style + " " + color;
					this.set_pointlinestyle(pointlinestyle);
				}
				else {
					pointlinestyle = "1px solid " + colorset;
					this._applyPropertySeries("Point", "pointlinestyle", pointlinestyle);
					this.pointlinestyle = pointlinestyle;
				}

				if (this._pointfillstyle) {
					pointfillstyle = this._pointfillstyle;
					this.set_pointfillstyle(pointfillstyle);
				}
				else {
					pointfillstyle = colorset;
					this._applyPropertySeries("Point", "pointfillstyle", pointfillstyle);
					this.pointfillstyle = pointfillstyle;
				}
			}
		}
	};
	_pChartRadarSeriesControl.on_apply_itemtextfont = function (itemtextfont) {
		if (this._is_initprop) {
			return;
		}

		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && this._itemCnt > 0) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesItemText_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					item.set_font(itemtextfont ? itemtextfont.value || itemtextfont : "6pt Verdana");
				}
			}
		}
	};
	delete _pChartRadarSeriesControl;
}
