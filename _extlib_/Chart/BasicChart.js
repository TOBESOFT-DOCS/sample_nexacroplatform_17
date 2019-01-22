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

if (!nexacro.BasicChart) {
	nexacro.BasicChart = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._AxisChartBase.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this.categorycolumn = new nexacro.BindableValue("");
		this._visibleSeriesset = [];
	};

	var _pBasicChart = nexacro._createPrototype(nexacro._AxisChartBase, nexacro.BasicChart);
	nexacro.BasicChart.prototype = _pBasicChart;
	_pBasicChart._type_name = "BasicChart";


	_pBasicChart.categoryaxis = null;


	_pBasicChart.bargrouping = true;
	_pBasicChart.barsize = undefined;
	_pBasicChart.stacktype = "none";
	_pBasicChart.rotateaxis = false;


	_pBasicChart._drawing = false;
	_pBasicChart._isnegativedata = false;

	_pBasicChart._barsize = 0.8;
	_pBasicChart._chartbarsize = 0.8;
	_pBasicChart._barVisibleSeriesCnt = 0;
	_pBasicChart._lineVisibleSeriesCnt = 0;

	_pBasicChart._stackPercentBases = {
	};
	_pBasicChart._stackPercentSums = {
	};
	_pBasicChart._stackGroupingArray = {
	};
	_pBasicChart._stackGroupingObjList = [];
	_pBasicChart._isTimeData = false;

	_pBasicChart._isCompositeSeries = false;
	_pBasicChart._rotateaxisX = null;
	_pBasicChart._rotateaxisY = null;
	_pBasicChart._invalidcategorycolumn = false;
	_pBasicChart._bargrouping = true;






	_pBasicChart.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			nexacro._AxisChartBase.prototype.on_create_contents.call(this);
		}
	};

	_pBasicChart.on_destroy_contents = function () {
		this.stacktype = null;
		this.categorycolumn = null;
		this.barsize = null;
		this.bargrouping = null;

		this._drawing = null;
		this._isnegativedata = null;
		this._barsize = null;
		this._chartbarsize = null;
		this._barVisibleSeriesCnt = null;
		this._lineVisibleSeriesCnt = null;
		this._stackPercentBases = null;
		this._stackPercentSums = null;
		this._stackGroupingArray = null;
		this._stackGroupingObjList = null;
		this._isTimeData = null;
		this._bargrouping = null;
		if (this.categoryaxis) {
			this._deleteCategoryaxis();
		}

		nexacro._AxisChartBase.prototype.on_destroy_contents.call(this);

		return true;
	};



	_pBasicChart.set_categoryaxis = function () {
	};

	_pBasicChart.set_stacktype = function (val) {
		var stacktype_enum = ["none", "normal", "percent"];
		if (stacktype_enum.indexOf(val) == -1) {
			return;
		}

		if (this.stacktype != val) {
			this.stacktype = val;
			this.on_apply_stacktype();
		}

		this._reset = true;
		this._draw();
	};

	_pBasicChart.on_apply_stacktype = function () {
		var barsize = this.barsize;
		var s;
		var i = 0;
		var seriesset = this._visibleSeriesset;
		var ispercent = false;
		for (i = 0; i < seriesset.length; i++) {
			s = seriesset[i];
			if (s) {
				var stacktype = s.stacktype == "none" ? this.stacktype : s.stacktype;
				if (stacktype == "percent") {
					ispercent = true;
				}
			}
		}
		for (i = 0; i < seriesset.length; i++) {
			s = seriesset[i];
			if (s) {
				s._stacktype = s.stacktype == "none" ? this.stacktype : s.stacktype;
				if (s._stacktype == "percent") {
					ispercent = true;
				}
				if (this.stacktype == "percent" || ispercent) {
					s._stacktype = "percent";
				}
			}
		}

		var length = this._getVisibleStackGroupingLength();

		if (length > 1) {
			this._bargrouping = this.bargrouping;
		}
		else {
			this._bargrouping = false;
		}

		if (this._bargrouping) {
			if (barsize == undefined) {
				barsize = 80;
			}

			this._barsize = barsize * 0.01;
			this._chartbarsize = barsize * 0.01;
		}




		this._changedData = true;
	};

	_pBasicChart.set_categorycolumn = function (v) {
		if (v === undefined || v === null) {
			v = "";
		}

		if (this.categorycolumn._value != v) {
			this.categorycolumn._set(v);
			this.on_apply_categorycolumn();
		}
		if (this._changedData == true) {
			this._reset = true;
			this._draw();
		}
		else {
			this._draw();
		}
	};

	_pBasicChart._checkcategorycolumn = function () {
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

	_pBasicChart.on_apply_categorycolumn = function () {
		this.on_apply_binddataset();
	};

	_pBasicChart.set_barsize = function (val) {
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

		if (this.barsize != val) {
			this.barsize = val;
			this.on_apply_barsize(lVal);
		}

		this._reset = true;
		this._draw();
	};

	_pBasicChart.on_apply_barsize = function (barsize) {
		if (!nexacro._GraphicsLib.isEmpty(barsize)) {
			this._barsize = barsize * 0.01;
			this._chartbarsize = barsize * 0.01;
		}
		else {
			this._barsize = 0.8;
			this._chartbarsize = 0.8;
		}
		this._changedData = true;
	};

	_pBasicChart.set_bargrouping = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.bargrouping != val) {
			this.bargrouping = val;
			this.on_apply_bargrouping();
		}

		this._reset = true;
		this._draw();
	};

	_pBasicChart.on_apply_bargrouping = function () {
		this._bargrouping = this.bargrouping;
		if (this.stacktype == "normal" || this.stacktype == "percent") {
			this._bargrouping = false;
		}
		else {
			this._bargrouping = this.bargrouping;
		}

		var barsize = this.barsize;
		if (this._bargrouping) {
			if (barsize == undefined) {
				barsize = 80;
			}

			this._barsize = barsize * 0.01;
			this._chartbarsize = barsize * 0.01;
		}

		this._changedData = true;
	};

	_pBasicChart.set_rotateaxis = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.rotateaxis != val) {
			this.rotateaxis = val;
			this.on_apply_rotateaxis();
		}
		this._drawing = false;


		this._reset = true;
		this._draw();
	};

	_pBasicChart.on_apply_rotateaxis = function () {
		var categoryaxis = this.categoryaxis;
		var valueaxes = this.valueaxes;
		var seriesset = this.seriesset;
		var s1, s2;
		var linevisible1 = false;
		var linevisible2 = false;
		var rotateaxis = this.rotateaxis;
		var i = 0;
		for (i = 0; i < seriesset.length; i++) {
			s1 = seriesset[i];
			s2 = seriesset[i + 1];

			if (s1) {
				linevisible1 = s1.linevisible;
				if (linevisible1) {
					break;
				}
			}

			if (s2) {
				linevisible2 = s2.linevisible;
				if (linevisible2) {
					break;
				}
			}
		}

		if (this._isCompositeSeries) {
			return false;
		}

		if (categoryaxis) {
			categoryaxis.on_apply_opposite(categoryaxis.opposite);
			categoryaxis.on_apply_titlerotate(categoryaxis.titlerotate);
		}
		else {
			if (rotateaxis && !this._isCompositeSeries) {
				this._rotateaxisX = true;
			}
			else {
				this._rotateaxisX = false;
			}
		}

		if (valueaxes.length > 0) {
			for (i = 0; i < valueaxes.length; i++) {
				var valueaxis = valueaxes[i];
				if (valueaxis) {
					valueaxis.on_apply_opposite(valueaxis.opposite);
					valueaxis.on_apply_titlerotate(valueaxis.titlerotate);
				}
			}
		}
		else {
			if (rotateaxis && !this._isCompositeSeries) {
				this._rotateaxisY = true;
			}
			else {
				this._rotateaxisY = false;
			}
		}
		this._xaxes = [];
		this._yaxes = [];
		for (i = 0; i < this._axes.length; i++) {
			var axis = this._axes[i];
			var location = axis._location;
			if (location == "top" || location == "bottom") {
				this._xaxes.push(axis);
			}
			else {
				this._yaxes.push(axis);
			}
		}
		this._rearrange = true;
		this._changedData = true;
	};

	_pBasicChart.setCategoryaxis = function (val) {
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

	_pBasicChart.showSeries = function (id) {
		var s = this.getSeriesByID(id);
		if (s) {
			var barvisible = s._orgBarVisible, pointvisible = s._orgPointVisible, linevisible = s._orgLineVisible;

			s._orgBarVisible = undefined;
			s._orgPointVisible = undefined;
			s._orgLineVisible = undefined;

			this._drawing = true;
			if (barvisible) {
				s.set_barvisible(true);
			}

			if (pointvisible) {
				s.set_pointvisible(true);
			}

			if (linevisible) {
				s.set_linevisible(true);
			}
			this._drawing = false;

			this._changedData = true;

			this._reset = true;
			this._draw();
		}
	};

	_pBasicChart.hideSeries = function (id) {
		var s = this.getSeriesByID(id);
		if (s) {
			if (s._orgBarVisible === undefined || s._orgBarVisible === null) {
				s._orgBarVisible = s.barvisible;
			}
			if (s._orgPointVisible === undefined || s._orgPointVisible === null) {
				s._orgPointVisible = s.pointvisible;
			}
			if (s._orgLineVisible === undefined || s._orgLineVisible === null) {
				s._orgLineVisible = s.linevisible;
			}

			this._drawing = true;
			s.set_barvisible(false);
			s.set_pointvisible(false);
			s.set_linevisible(false);
			this._drawing = false;

			this._changedData = true;

			this._reset = true;
			this._draw();
		}
	};

	_pBasicChart.showCategoryaxis = function () {
		if (this.categoryaxis) {
			this.categoryaxis.set_visible(true);
		}
	};

	_pBasicChart.hideCategoryaxis = function () {
		if (this.categoryaxis) {
			this.categoryaxis.set_visible(false);
		}
	};




	_pBasicChart._destroySubControl = function () {
		nexacro._AxisChartBase.prototype._destroySubControl.call(this);

		if (this.categoryaxis) {
			this._deleteCategoryaxis();
		}
	};

	_pBasicChart._deleteCategoryaxis = function () {
		var categoryaxis = this.categoryaxis;
		if (categoryaxis) {
			this._deleteAxis(categoryaxis, true);
			this._changedData = true;
		}
	};

	_pBasicChart._createSeries = function (id) {
		var series = new nexacro.ChartBasicSeriesControl(id, this, this._graphicsControl);
		if (series) {
			return series;
		}
	};

	_pBasicChart._setSeries = function () {
		var categoryaxis, valueaxis;

		nexacro._AxisChartBase.prototype._setSeries.call(this);

		nexacro._GraphicsLibArray.forEach(this.seriesset, function (obj, index) {
			if (obj) {
				categoryaxis = this.categoryaxis;
				valueaxis = this.getValueaxisByID(obj.valueaxis);

				if (categoryaxis) {
					if (this.valueaxes.length == 0) {
						categoryaxis.on_apply_visible(false);
						categoryaxis.on_apply_boardlinevisible(false);
					}
					else {
						categoryaxis._afterSetProperties();
						categoryaxis.on_apply_visible(categoryaxis.visible);
					}
				}

				if (valueaxis) {
					valueaxis.on_apply_visible(valueaxis.visible);
					obj.on_apply_valueaxis(valueaxis.id);
				}
				else {
					var length = this.valueaxes.length, id;

					if (length <= 0) {
						return false;
					}

					for (var i = 0; i < length; i++) {
						valueaxis = this.valueaxes[i];
						if (valueaxis) {
							var group = valueaxis._group;
							if (group) {
								var visible = valueaxis.visible;
								if (visible) {
									valueaxis.on_apply_visible(visible);
									obj.on_apply_valueaxis(valueaxis.id);
									break;
								}
							}
						}
					}
				}

				if (!categoryaxis) {
					return false;
				}


				if (categoryaxis._direction == "x") {
					obj._xaxis = categoryaxis;
					obj._yaxis = valueaxis;
				}
				else {
					obj._xaxis = valueaxis;
					obj._yaxis = categoryaxis;
				}
			}
		}, this);
	};

	_pBasicChart._createCategoryaxis = function (o, id) {
		if (this.categoryaxis) {
			return false;
		}

		var series = this.seriesset, rotateaxis = this.rotateaxis, s1, s2, linevisible1 = false, linevisible2 = false;


		for (var i = 0; i < series.length; i++) {
			s1 = series[i];
			s2 = series[i + 1];
			if (s1) {
				linevisible1 = s1.linevisible;
				if (linevisible1) {
					break;
				}
			}

			if (s2) {
				linevisible2 = s2.linevisible;
				if (linevisible2) {
					break;
				}
			}
		}

		if (rotateaxis && this._isCompositeSeries) {
			this.rotateaxis = false;
		}

		var axis, location;

		if (!id) {
			id = "Categoryaxis";
		}

		axis = new nexacro.ChartAxisControl(id, this, this._graphicsControl);
		axis._type_name = "ChartCategoryAxisControl";
		axis._type = "categoryAxis";

		if (this._isTimeData && axis.axistype == "datetime") {
			axis._isTimeAxis = true;
		}

		if (o) {
			location = o.opposite ? "top" : "bottom";
		}
		if (!this._isCompositeSeries && this.rotateaxis && this._rotateaxisX) {
			location = "left";
		}

		var opposite = o ? o.opposite : axis.opposite;

		axis.on_apply_opposite(opposite);

		this.categoryaxis = axis;
		this._axes.push(axis);

		if (location == "top" || location == "bottom") {
			this._xaxes.push(axis);
		}
		else {
			this._yaxes.push(axis);
		}

		return axis;
	};

	_pBasicChart._createValueaxes = function (o, id) {
		var seriesset = this.seriesset;
		var rotateaxis = this.rotateaxis;
		var s1, s2;
		var linevisible1 = false;
		var linevisible2 = false;
		var location;
		var valueaxis;
		var index = this.valueaxes.length;

		for (var i = 0; i < seriesset.length; i++) {
			s1 = seriesset[i];
			s2 = seriesset[i + 1];

			if (s1) {
				linevisible1 = s1.linevisible;
				if (linevisible1) {
					break;
				}
			}

			if (s2) {
				linevisible2 = s2.linevisible;
				if (linevisible2) {
					break;
				}
			}
		}

		valueaxis = new nexacro.ChartAxisControl(id, this, this._graphicsControl);
		valueaxis._type = "valueAxis";

		if (o) {
			location = o.opposite ? "right" : "left";
		}

		if (!this._isCompositeSeries && this.rotateaxis && this._rotateaxisY) {
			location = "bottom";
		}

		var opposite = o.opposite || valueaxis.opposite;
		valueaxis.on_apply_opposite(opposite);

		this.valueaxes.push(valueaxis);
		this._axes.push(valueaxis);

		if (location == "top" || location == "bottom") {
			this._xaxes.push(valueaxis);
		}
		else {
			this._yaxes.push(valueaxis);
		}

		return valueaxis;
	};

	_pBasicChart._setDatapointFormat = function () {
		nexacro._AxisChartBase.prototype._setDatapointFormat.call(this);

		this._barVisibleSeriesCnt = 0;
		this._lineVisibleSeriesCnt = 0;

		this._getVisibleSeries();

		this.on_apply_stacktype();

		this._makeVisibleStackGroupingArray();
		var seriesset = this._visibleSeriesset;
		var series;
		var stacktype;
		var pointshape;

		for (var i = 0; i < seriesset.length; i++) {
			series = seriesset[i];
			if (series) {
				stacktype = series._stacktype == "none" ? this.stacktype : series._stacktype;
				pointshape = series.pointshape;

				if (stacktype == "percent") {
					this._setStackPercent(series);
				}

				if ((pointshape == "square") || (pointshape == "diamond") || (pointshape == "triangle") || (pointshape == "cross")) {
					if (series._pointshapeObj[pointshape]) {
						series._pointshape = series._pointshapeObj[pointshape];
					}
				}
			}
		}

		if (stacktype == "percent") {
			for (i = 0; i < this._stackGroupingObjList.length; i++) {
				var stackobject = this._stackGroupingObjList[i];
				if (stackobject && stackobject._stackPercentBases && stackobject._stackPercentSums) {
					stackobject._stackPercentBases = {
					};
					stackobject._stackPercentSums = this._getSumsStackPercent(stackobject._list);
				}
			}
		}
	};
	_pBasicChart._checkStackEliminateDuplicate = function (arr) {
		var i, len = arr.length, out = [], obj = {
		};

		for (i = 0; i < len; i++) {
			obj[arr[i]] = 0;
		}
		for (i in obj) {
			out.push(i);
		}
		return out;
	};
	_pBasicChart._getVisibleStackGroupObject = function (s) {
		var stackgroupobject;
		var stackgroupid;
		if (this._stackGroupingArray && s) {
			s._stacktype = s._stacktype == "none" ? this.stacktype : s._stacktype;
			if (s._stacktype == "none") {
				stackgroupid = "+nonestack+" + s.id;
			}
			else if (s.stackbargroup !== undefined && s.stackbargroup !== null && s.stackbargroup !== "") {
				stackgroupid = s.stackbargroup;
			}
			else {
				stackgroupid = "+nullstackgroup+";
			}
			var i = 0, j = 0, key;
			for (key in this._stackGroupingArray) {
				if (key == stackgroupid) {
					for (j = 0; j < this._stackGroupingArray[stackgroupid]._list.length; j++) {
						if (this._stackGroupingArray[stackgroupid]._list[j] == s) {
							stackgroupobject = this._stackGroupingArray[stackgroupid];
							return stackgroupobject;
						}
					}
				}
			}
		}
		return stackgroupobject;
	};
	_pBasicChart._getVisibleStackGroupindexs = function (s) {
		var barindex = [];
		var xindex = -1;
		var yindex = -1;
		var stackgroupid;
		if (this._stackGroupingArray && s) {
			s._stacktype = s._stacktype == "none" ? this.stacktype : s._stacktype;
			if (s._stacktype == "none") {
				stackgroupid = "+nonestack+" + s.id;
			}
			else if (s.stackbargroup !== undefined && s.stackbargroup !== null && s.stackbargroup !== "") {
				stackgroupid = s.stackbargroup;
			}
			else {
				stackgroupid = "+nullstackgroup+";
			}
			var i = 0, j = 0, key;
			for (key in this._stackGroupingArray) {
				if (key == stackgroupid) {
					xindex = this._stackGroupingArray[stackgroupid]._orderindex;
					for (j = 0; j < this._stackGroupingArray[stackgroupid]._list.length; j++) {
						if (this._stackGroupingArray[stackgroupid]._list[j] == s) {
							yindex = j;
							break;
						}
					}
					barindex[0] = xindex;
					barindex[1] = yindex;
					return barindex;
				}
				i++;
			}
		}
	};

	_pBasicChart._makeVisibleStackGroupingArray = function () {
		this._stackGroupingArray = {
		};
		this._stackGroupingObjList = [];
		var seriesset = this._visibleSeriesset;
		var nonstackid = "+nonestack+";
		var nullstackgroupid = "+nullstackgroup+";
		var orderindex = 0;
		var s;
		var i = 0;
		for (i = 0; i < seriesset.length; i++) {
			s = seriesset[i];

			if (s) {
				s._stacktype = s._stacktype == "none" ? this.stacktype : s._stacktype;
				if (s._stacktype == "none") {
					var stackid = nonstackid + s.id;
					if (stackid in this._stackGroupingArray) {
						this._stackGroupingArray[stackid]._list.push(s);
					}
					else {
						this._stackGroupingArray[stackid] = {
						};
						this._stackGroupingArray[stackid]._list = [];
						this._stackGroupingArray[stackid]._orderindex = orderindex;
						orderindex++;

						this._stackGroupingArray[stackid]._list.push(s);
						this._stackGroupingObjList.push(this._stackGroupingArray[stackid]);
					}
				}
				else if (s.stackbargroup !== undefined && s.stackbargroup !== null && s.stackbargroup !== "") {
					if (s.stackbargroup in this._stackGroupingArray) {
						this._stackGroupingArray[s.stackbargroup]._list.push(s);
					}
					else {
						this._stackGroupingArray[s.stackbargroup] = {
						};
						this._stackGroupingArray[s.stackbargroup]._list = [];
						this._stackGroupingArray[s.stackbargroup]._orderindex = orderindex;
						orderindex++;
						this._stackGroupingArray[s.stackbargroup]._stackPercentBases = {
						};
						this._stackGroupingArray[s.stackbargroup]._stackPercentSums = {
						};
						this._stackGroupingArray[s.stackbargroup]._list.push(s);
						this._stackGroupingObjList.push(this._stackGroupingArray[s.stackbargroup]);
					}
				}
				else {
					if (nullstackgroupid in this._stackGroupingArray) {
						this._stackGroupingArray[nullstackgroupid]._list.push(s);
					}
					else {
						this._stackGroupingArray[nullstackgroupid] = {
						};
						this._stackGroupingArray[nullstackgroupid]._list = [];
						this._stackGroupingArray[nullstackgroupid]._orderindex = orderindex;
						orderindex++;
						this._stackGroupingArray[nullstackgroupid]._stackPercentBases = {
						};
						this._stackGroupingArray[nullstackgroupid]._stackPercentSums = {
						};
						this._stackGroupingArray[nullstackgroupid]._list.push(s);
						this._stackGroupingObjList.push(this._stackGroupingArray[nullstackgroupid]);
					}
				}
			}
		}
	};
	_pBasicChart._getVisibleStackGroupingLength = function () {
		var nullstackcount = 0;
		var nonestackcount = 0;
		var stackbargroup = [];
		var seriesset = this._visibleSeriesset;
		var s;
		var i = 0;
		for (i = 0; i < seriesset.length; i++) {
			s = seriesset[i];
			if (s && s.barvisible) {
				s._stacktype = s._stacktype == "none" ? this.stacktype : s._stacktype;
				if (s._stacktype == "none") {
					nonestackcount++;
				}
				else if (s.stackbargroup !== undefined && s.stackbargroup !== null && s.stackbargroup !== "") {
					stackbargroup.push(s.stackbargroup);
				}
				else {
					if (nullstackcount == 0) {
						nullstackcount++;
					}
				}
			}
		}
		if (stackbargroup.length > 1) {
			var result = this._checkStackEliminateDuplicate(stackbargroup);
			stackbargroup = null;
			stackbargroup = result;
		}
		var stackbargrouplength = 0;
		if (stackbargroup) {
			stackbargrouplength = stackbargroup.length;
		}
		return nullstackcount + nonestackcount + stackbargrouplength;
	};
	_pBasicChart._setDatapoint = function () {
		nexacro._AxisChartBase.prototype._setDatapoint.call(this);

		if (this.categoryaxis && this.categoryaxis._isTimeAxis) {
			if (this.categoryaxis._resizeClient) {
				this._reset = true;
			}
			this.categoryaxis.ticks = this.categoryaxis._preGenerateTimeTick();
		}
		var seriesset = this._visibleSeriesset;

		if (this._barVisibleSeriesCnt > 1 && this._bargrouping) {
			var seriesLength = 0, chartBarWidth = this._chartbarsize;

			seriesLength = this._barVisibleSeriesCnt;
			this._barsize = chartBarWidth * (1 / this._getVisibleStackGroupingLength());
		}
		else {
			this._barsize = this._chartbarsize;
		}

		var visibleSeriesCnt = this._visibleSeriesset.length;
		var i = 0;
		var series, stacktype, bargrouping, barvisible = false, pointvisible = false, linevisible = false;
		for (i = 0; i < visibleSeriesCnt; i++) {
			series = seriesset[i], 
				stacktype, 
				bargrouping = this._bargrouping, 
				barvisible = false, 
				pointvisible = false, 
				linevisible = false;

			if (series) {
				stacktype = series._stacktype == "none" ? this.stacktype : series._stacktype;

				barvisible = series.barvisible;
				linevisible = series.linevisible;
				pointvisible = series.pointvisible;
				if (barvisible || linevisible || pointvisible) {
					if (visibleSeriesCnt > 1 && stacktype == "normal") {
						series._setStackDatapoints();
					}
					else if (visibleSeriesCnt > 1 && stacktype == "percent") {
						series._setStackPercentDatapoints();
					}
				}
			}
		}
		for (i = 0; i < visibleSeriesCnt; i++) {
			series = seriesset[i], 
				stacktype, 
				bargrouping = this._bargrouping, 
				barvisible = false, 
				linevisible = false;

			if (series) {
				stacktype = series._stacktype == "none" ? this.stacktype : series._stacktype;

				barvisible = series.barvisible;
				linevisible = series.linevisible;

				if (barvisible) {
					if (bargrouping && this._getVisibleStackGroupingLength() > 1) {
						series._baralign = "left";
						this._setGroupColumnDatapoints(series);
					}
					else {
						series._baralign = "center";
					}
				}
				else {
					series._baralign = "center";
				}
			}
		}
	};

	_pBasicChart._setStackPercent = function (series) {
		var pThis = this, chart = this, data = series._data, keyIdx = 0, valueIdx = 1, stackPercentSums = {
		};
		var stackobject = this._getVisibleStackGroupObject(series);
		stackPercentSums = stackobject._stackPercentSums;

		if (chart.rotateaxis && !chart._isCompositeSeries) {
			keyIdx = 1;
			valueIdx = 0;
		}

		this._stackPercents = [];
		nexacro._GraphicsLibArray.forEach(data, function (d, i) {
			var sum = stackPercentSums[d[keyIdx]];
			if (sum > 0) {
				pThis._stackPercents.push(d[valueIdx] * 100 / sum);
			}
			else {
				pThis._stackPercents.push(0);
			}
		});
	};

	_pBasicChart._getSumsStackPercent = function (stackgroupseries) {
		var series, sums = {
		}, pThis = this;
		series = stackgroupseries;

		nexacro._GraphicsLibArray.forEach(series, function (s, i) {
			var keyIdx = 0, valueIdx = 1, format, isNumber = false;

			if (pThis.rotateaxis && !pThis._isCompositeSeries) {
				keyIdx = 1;
				valueIdx = 0;
			}

			format = s._datapoints.format[keyIdx];
			isNumber = format.number;

			nexacro._GraphicsLibArray.forEach(s._data, function (d, j) {
				var value = 0, key;

				if (d[valueIdx] != null) {
					value = d[valueIdx];
					value = +value;
					if (isNaN(value)) {
						value = 0;
					}
					else if (value == Infinity) {
						value = Number.MAX_VALUE;
					}
					else if (value == -Infinity) {
						value = -Number.MAX_VALUE;
					}
				}

				if (isNumber) {
					key = d[keyIdx];
				}
				else {
					key = j;
				}

				if (sums[key]) {
					sums[key] += value;
				}
				else {
					sums[key] = value;
				}
			});
		});

		return sums;
	};

	_pBasicChart._setGroupColumnDatapoints = function (series) {
		var rotateaxis = this.rotateaxis, barVisibleSeriesset = [], barVisibleCnt = this._getVisibleStackGroupingLength(), datapoints = series._datapoints, shiftedPoints, borderWidthInXabsWidth, pixelInXWidthEquivalent = 1, gridDimSize, minMaxValues, AxeSize, board = this._boardRect, boardWidth = 0, boardHeight = 0, borderWidth = this._boardBorderWidth, borderHeight = this._boardBorderHeight, position, decallage = 0, centerBarShift, isstepline = this._isstepline, pThis = this;


		function findPosition (series) {
			var pos = 0;

			var stackindex = pThis._getVisibleStackGroupindexs(series);
			if (stackindex) {
				pos = stackindex[0];
			}
			return pos + 1;
		}

		function calculCenterBarShift () {
			var width = 0, serieswidth = 0, barwidth = 0, groupbarwidth = 0, series;
			series = barVisibleSeriesset[Math.floor(barVisibleCnt / 2)];
			if (series) {
				serieswidth = series._groupbarwidth;
				if (serieswidth) {
					groupbarwidth = pThis._toGroupBarWidth(serieswidth);
				}

				if (groupbarwidth == 0) {
					barwidth = pThis._barsize;
				}
				else {
					barwidth = groupbarwidth;
				}
				barwidth = pThis._getcheckTimeAxisBarWidth(barwidth);
				if (barVisibleCnt % 2 != 0) {
					width = barwidth / 2;
				}

				return width;
			}
		}

		function isBarAtLeftOfCenter (position) {
			return position <= Math.ceil(barVisibleCnt / 2);
		}

		function sumWidth (s, start, end) {
			var totalWidth = 0, barwidth = 0;

			for (var i = start; i <= end; i++) {
				var seriesbarwidth = s[i]._groupbarwidth, groupbarwidth = 0;

				if (seriesbarwidth) {
					groupbarwidth = pThis._toGroupBarWidth(seriesbarwidth);
				}

				if (groupbarwidth == 0) {
					barwidth = pThis._barsize;
				}
				else {
					barwidth = groupbarwidth;
				}
				barwidth = pThis._getcheckTimeAxisBarWidth(barwidth);
				totalWidth += barwidth + borderWidthInXabsWidth * 2;
			}

			return totalWidth;
		}

		function shiftPoints (datapoints, series, dx) {
			var ps = datapoints.pointsize;
			var points = datapoints.points;
			var j = 0;
			var linetype = series.linetype;
			var stacktype = series._stacktype == "none" ? series._chart.stacktype : series._stacktype;
			if ((linetype == "step" && series.linevisible) || isstepline) {
				ps += 3;
			}

			for (var i = rotateaxis ? 1 : 0; i < points.length; i += ps) {
				points[i] += dx;
				if ((linetype == "step" && series.linevisible) || isstepline) {
					if (datapoints.points.length > i + 3) {
						points[i + 3] = points[i];
					}
				}
				series._data[j][3] = points[i];
				j++;
			}
			return points;
		}

		function getAxeMinMaxValues (datapoints) {
			var minMaxValues = new Array();

			var xmin = Number.POSITIVE_INFINITY, ymin = Number.POSITIVE_INFINITY, xmax = Number.NEGATIVE_INFINITY, ymax = Number.NEGATIVE_INFINITY, points, pointsize, val, f, format;

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

			if (rotateaxis) {
				if (nexacro._GraphicsLib.isNumber(ymin)) {
					minMaxValues[0] = Number(ymin);
				}

				if (nexacro._GraphicsLib.isNumber(ymax)) {
					minMaxValues[1] = Number(ymax);
				}
			}
			else {
				if (nexacro._GraphicsLib.isNumber(xmin)) {
					minMaxValues[0] = Number(xmin);
				}

				if (nexacro._GraphicsLib.isNumber(xmax)) {
					minMaxValues[1] = Number(xmax);
				}
			}
			return minMaxValues;
		}

		function calculBorderAndBarWidth (series) {
			borderWidth = series._barborderwidth ? (series._barborderwidth / 2) : 0;
			borderWidthInXabsWidth = borderWidth * pixelInXWidthEquivalent;
		}
		for (var i = 0; i < pThis._stackGroupingObjList.length; i++) {
			var stackgroup = pThis._stackGroupingObjList[i];
			if (stackgroup) {
				barVisibleSeriesset.push(stackgroup._list[0]);
			}
		}

		if (board) {
			var axis;
			var tickstartgap = 0;
			var tickendgap = 0;
			var tickendspace = 0;
			if (rotateaxis) {
				axis = series._yaxis;
				if (axis) {
					tickstartgap = axis._tickstartgap;
					tickendgap = axis._tickendgap;
					tickendspace = axis._tickendspace;
				}

				boardWidth = board.width - borderWidth;
				boardHeight = board.height - borderHeight - tickstartgap - tickendgap - tickendspace;
			}
			else {
				axis = series._xaxis;
				if (axis) {
					tickstartgap = axis._tickstartgap;
					tickendgap = axis._tickendgap;
					tickendspace = axis._tickendspace;
				}
				boardWidth = board.width - borderWidth - tickstartgap - tickendgap - tickendspace;
				boardHeight = board.height - borderHeight;
			}
		}

		gridDimSize = rotateaxis ? boardHeight : boardWidth;

		minMaxValues = getAxeMinMaxValues(datapoints);
		var min = minMaxValues[0];
		var max = minMaxValues[1];
		if (pThis.categoryaxis._min && pThis.categoryaxis._min > minMaxValues[0]) {
			min = pThis.categoryaxis._min;
		}
		if (pThis.categoryaxis._max && pThis.categoryaxis._max < minMaxValues[1]) {
			max = pThis.categoryaxis._max;
		}

		AxeSize = max - min;
		if (gridDimSize > 0) {
			pixelInXWidthEquivalent = AxeSize / gridDimSize;
		}
		else {
			pixelInXWidthEquivalent = 0;
		}

		calculBorderAndBarWidth(series);

		position = findPosition(series);
		centerBarShift = calculCenterBarShift();

		if (isBarAtLeftOfCenter(position)) {
			decallage = -1 * (sumWidth(barVisibleSeriesset, position - 1, Math.floor(barVisibleCnt / 2) - 1)) - centerBarShift;
		}
		else {
			decallage = sumWidth(barVisibleSeriesset, Math.ceil(barVisibleCnt / 2), position - 2) + centerBarShift - borderWidthInXabsWidth;
		}

		shiftedPoints = shiftPoints(datapoints, series, decallage);
		datapoints.points = shiftedPoints;
	};

	_pBasicChart._toGroupBarWidth = function (barwidth) {
		var groupbarwidth = barwidth * (1 / this._getVisibleStackGroupingLength());
		return groupbarwidth;
	};

	_pBasicChart._getHighlightVisible = function () {
		var seriesset = this.seriesset;
		if (seriesset) {
			var length = seriesset.length, highlightvisible = false;

			for (var i = 0; i < length; i++) {
				var s = seriesset[i];
				if (s) {
					if (s.highlightbarvisible || s.highlightpointvisible || s.highlightlinevisible) {
						highlightvisible = true;
						break;
					}
				}
			}
			return highlightvisible;
		}
	};

	_pBasicChart._getVisibleSeries = function () {
		var length = this.seriesset.length, barvisible = false, linevisible = false, pointvisible = false, visibleSeriesset = [];

		for (var i = 0; i < length; i++) {
			var series = this.seriesset[i];
			if (series) {
				var data = series._data;
				if (data) {
					if (data.length == 0) {
						continue;
					}
				}

				barvisible = series.barvisible;
				linevisible = series.linevisible;
				pointvisible = series.pointvisible;
				if (barvisible || linevisible || pointvisible) {
					if (barvisible) {
						this._barVisibleSeriesCnt++;
					}

					if (linevisible) {
						this._lineVisibleSeriesCnt++;
					}

					visibleSeriesset.push(series);
				}
			}
		}

		this._visibleSeriesset = visibleSeriesset;
	};

	_pBasicChart._deleteSeries = function (series_, index) {
		nexacro._ChartBase.prototype._deleteSeries.call(this, series_, index);
		var serieslength = this.seriesset.length;
		var series = this.seriesset;

		if (this.valueaxes) {
			var valueaxes = this.valueaxes;
			for (var i = valueaxes.length - 1; i > -1; i--) {
				var bused = false;
				var valueaxis = valueaxes[i];
				if (valueaxis) {
					for (var j = 0; j < serieslength; j++) {
						var s = series[j];
						if (s) {
							if (s._yaxis && s._yaxis.id == valueaxis.id) {
								bused = true;
							}
						}
					}
				}
				if (!bused || serieslength == 0) {
					valueaxis._used = false;
					valueaxis.on_apply_visible(false);
					valueaxis.on_apply_boardlinevisible(false);
				}
			}
		}

		if (serieslength == 0) {
			if (this.categoryaxis) {
				this.categoryaxis.on_apply_visible(false);
				this.categoryaxis.on_apply_boardlinevisible(false);
			}

			if (this.hrangebar) {
				this.hrangebar.on_apply_visible(false);
			}
			if (this.vrangebar) {
				this.vrangebar.on_apply_visible(false);
			}
		}
	};


	delete _pBasicChart;
}

if (!nexacro.ChartBasicSeriesControl) {
	nexacro.ChartBasicSeriesControl = function (id, parent, graphicsControl) {
		nexacro._SeriesBase.prototype.constructor.apply(this, arguments);

		this._seriesitems = [];
	};

	var _pChartBasicSeriesControl = nexacro._createPrototype(nexacro._SeriesBase, nexacro.ChartBasicSeriesControl);
	nexacro.ChartBasicSeriesControl.prototype = _pChartBasicSeriesControl;
	_pChartBasicSeriesControl._type_name = "ChartBasicSeriesControl";


	_pChartBasicSeriesControl.barfillstyle = "";
	_pChartBasicSeriesControl.barlinestyle = "";
	_pChartBasicSeriesControl.baropacity = 1;
	_pChartBasicSeriesControl.barsize = undefined;
	_pChartBasicSeriesControl.barvisible = true;
	_pChartBasicSeriesControl.highlightbarfillstyle = "";
	_pChartBasicSeriesControl.highlightbarlinestyle = "";
	_pChartBasicSeriesControl.highlightbaropacity = 1;
	_pChartBasicSeriesControl.highlightbarvisible = false;
	_pChartBasicSeriesControl.highlightlineopacity = 1;
	_pChartBasicSeriesControl.highlightlinestyle = "";
	_pChartBasicSeriesControl.highlightlinevisible = false;
	_pChartBasicSeriesControl.highlightpointfillstyle = "";
	_pChartBasicSeriesControl.highlightpointlinestyle = "";
	_pChartBasicSeriesControl.highlightpointopacity = 1;
	_pChartBasicSeriesControl.highlightpointsize = undefined;
	_pChartBasicSeriesControl.highlightpointvisible = false;
	_pChartBasicSeriesControl.lineareafillstyle = "";
	_pChartBasicSeriesControl.lineareaopacity = 1;
	_pChartBasicSeriesControl.lineareavisible = false;
	_pChartBasicSeriesControl.lineopacity = 1;
	_pChartBasicSeriesControl.linestyle = "";
	_pChartBasicSeriesControl.linetype = "segment";
	_pChartBasicSeriesControl.linevisible = false;
	_pChartBasicSeriesControl.pointfillstyle = "";
	_pChartBasicSeriesControl.pointlinestyle = "";
	_pChartBasicSeriesControl.pointopacity = 1;
	_pChartBasicSeriesControl.pointshape = "circle";
	_pChartBasicSeriesControl.pointsize = undefined;
	_pChartBasicSeriesControl.pointvisible = false;
	_pChartBasicSeriesControl.selectbarfillstyle = "";
	_pChartBasicSeriesControl.selectbarlinestyle = "";
	_pChartBasicSeriesControl.selectbaropacity = 1;
	_pChartBasicSeriesControl.selectlineareafillstyle = "";
	_pChartBasicSeriesControl.selectlineareaopacity = 1;
	_pChartBasicSeriesControl.selectlineopacity = 1;
	_pChartBasicSeriesControl.selectlinestyle = "";
	_pChartBasicSeriesControl.selectpointfillstyle = "";
	_pChartBasicSeriesControl.selectpointlinestyle = "";
	_pChartBasicSeriesControl.selectpointopacity = 1;
	_pChartBasicSeriesControl.stacktype = "none";
	_pChartBasicSeriesControl.valueaxis = "";
	_pChartBasicSeriesControl.stackbargroup = "";
	_pChartBasicSeriesControl.baritemtextposition = "";
	_pChartBasicSeriesControl.pointitemtextposition = "";
	_pChartBasicSeriesControl.lineitemtextposition = "";

	_pChartBasicSeriesControl.baritemtextgap = undefined;
	_pChartBasicSeriesControl.pointitemtextgap = undefined;
	_pChartBasicSeriesControl.lineitemtextgap = undefined;

	_pChartBasicSeriesControl._pointshape = null;
	_pChartBasicSeriesControl._barborderwidth = null;
	_pChartBasicSeriesControl._pointborderwidth = null;
	_pChartBasicSeriesControl._lineborderwidth = null;
	_pChartBasicSeriesControl._linebordercolor = null;
	_pChartBasicSeriesControl._color = null;
	_pChartBasicSeriesControl._xaxis = null;
	_pChartBasicSeriesControl._yaxis = null;
	_pChartBasicSeriesControl._changedSeriesColor = true;

	_pChartBasicSeriesControl._barsize = null;
	_pChartBasicSeriesControl._groupbarwidth = null;
	_pChartBasicSeriesControl._baralign = "center";
	_pChartBasicSeriesControl._barwidth = null;
	_pChartBasicSeriesControl._stacktype = "none";

	_pChartBasicSeriesControl.set_valueaxis = function (val) {
		if (this.valueaxis != val) {
			this._changeContentsProperty("valueaxis", val, this.valueaxis);
			this.valueaxis = val;
			this.on_apply_valueaxis(val);
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_valueaxis = function (valueaxisid) {
		var valueaxis = this.parent.getValueaxisByID(valueaxisid);
		if (valueaxis) {
			valueaxis._used = true;
			valueaxis._afterSetProperties();

			var usedxAxis = false;
			var usedyAxis = false;
			if (this._chart.seriesset) {
				var seriesset = this._chart.seriesset;
				for (var i = seriesset.length - 1; i > -1; i--) {
					if (seriesset[i] && seriesset[i].id != this.id) {
						if ((seriesset[i]._yaxis && this._yaxis && seriesset[i]._yaxis.id == this._yaxis.id) && !usedyAxis) {
							usedyAxis = true;
						}
						if ((seriesset[i]._xaxis && this._xaxis && seriesset[i]._xaxis.id == this._xaxis.id) && !usedxAxis) {
							usedxAxis = true;
						}
					}
				}
			}

			if (this._xaxis && this._xaxis.id != valueaxis.id && !usedxAxis) {
				if (this._xaxis._type != "categoryAxis") {
					this._xaxis._used = false;
					this._xaxis.on_apply_visible(false);
				}
			}
			if (this._yaxis && this._yaxis.id != valueaxis.id && !usedyAxis) {
				if (this._yaxis._type != "categoryAxis") {
					this._yaxis._used = false;
					this._yaxis.on_apply_visible(false);
				}
			}

			if (valueaxis._direction == "x") {
				if (this.categoryaxis) {
					if (this.categoryaxis._direction == "x") {
						this._xaxis = this.categoryaxis;
						this._yaxis = valueaxis;
					}
					else {
						this._xaxis = valueaxis;
						this._yaxis = this.categoryaxis;
					}
				}
				else {
					this._xaxis = valueaxis;
				}
			}
			else {
				if (this.categoryaxis) {
					if (this.categoryaxis._direction == "x") {
						this._xaxis = this.categoryaxis;
						this._yaxis = valueaxis;
					}
					else {
						this._xaxis = valueaxis;
						this._yaxis = this.categoryaxis;
					}
				}
				else {
					this._yaxis = valueaxis;
				}
			}

			this._chart._changedData = true;
		}
	};
	_pChartBasicSeriesControl.set_stackbargroup = function (val) {
		if (this.stackbargroup != val) {
			this._changeContentsProperty("stackbargroup", val, this.stackbargroup);
			this.stackbargroup = val;
			this.on_apply_stackbargroup(val);
		}

		this._chart._reset = true;
		this._chart._draw();
	};
	_pChartBasicSeriesControl.on_apply_stackbargroup = function (stackbargroup) {
		this._chart._changedData = true;
	};
	_pChartBasicSeriesControl.set_barvisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.barvisible != val) {
			this._changeContentsProperty("barvisible", val, this.barvisible);
			this.barvisible = val;
			this.on_apply_barvisible();
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_barvisible = function () {
		if (this._is_initprop) {
			return;
		}

		var barvisible = this.barvisible;
		var selecttype = this.selecttype, bargrouping = this._chart._bargrouping, stacktype = this._stacktype == "none" ? this._chart.stacktype : this._stacktype;

		if (barvisible) {
			if (selecttype || bargrouping || stacktype == "normal" || stacktype == "percent") {
				this._chart._changedData = true;
			}
			else {
				this._chart._changedData = true;
				this._applyPropertySeries("Bar", "barvisible", true);
			}

			if (this.itemtextvisible) {
				this.on_apply_itemtextvisible(true);
			}
		}
		else {
			if (bargrouping || stacktype == "normal" || stacktype == "percent") {
				this._chart._changedData = true;
			}
			else {
				this._chart._changedData = true;
				this._applyPropertySeries("Bar", "barvisible", false);
			}

			if (!this._itemtextvisible) {
				this.on_apply_itemtextvisible(false);
			}
		}

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartBasicSeriesControl.set_pointvisible = function (val) {
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

	_pChartBasicSeriesControl.on_apply_pointvisible = function (pointvisible) {
		var barvisible = this.barvisible;
		if (pointvisible) {
			var selecttype = this.selecttype;
			if (selecttype) {
				this._chart._changedData = true;
			}
			else {
				this._chart._changedData = true;
				this._applyPropertySeries("Point", "pointvisible", true);
			}

			if (!barvisible && this.itemtextvisible) {
				this.on_apply_itemtextvisible(true);
			}
		}
		else {
			this._chart._changedData = true;
			this._applyPropertySeries("Point", "pointvisible", false);

			if (!barvisible && !this._itemtextvisible) {
				this.on_apply_itemtextvisible(false);
			}
		}
	};

	_pChartBasicSeriesControl.set_linevisible = function (val) {
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

	_pChartBasicSeriesControl.on_apply_linevisible = function (linevisible) {
		var barvisible = this.barvisible, pointvisible = this.pointvisible, stacktype = this._stacktype || this._chart.stacktype, linetype;

		if (linevisible) {
			var selecttype = this.selecttype;
			if (selecttype || stacktype == "normal" || stacktype == "percent") {
				this._chart._changedData = true;
			}
			else {
				this._chart._changedData = true;
				this._applyPropertySeries("Line", "linevisible", true);
			}

			if (!barvisible && !pointvisible && this.itemtextvisible) {
				this.on_apply_itemtextvisible(true);
			}
		}
		else {
			if (stacktype == "normal" || stacktype == "percent") {
				this._chart._changedData = true;
			}
			else {
				this._chart._changedData = true;
				this._applyPropertySeries("Line", "linevisible", false);
				if (this.lineareavisible) {
					this._applyPropertySeries("Area", "lineareavisible", false);
				}
			}

			if (!barvisible && !pointvisible && !this._itemtextvisible) {
				this.on_apply_itemtextvisible(false);
			}
		}
	};

	_pChartBasicSeriesControl.set_stacktype = function (val) {
		var stacktype_enum = ["none", "normal", "percent"];
		if (stacktype_enum.indexOf(val) == -1) {
			return;
		}

		if (this.stacktype != val) {
			this._changeContentsProperty("stacktype", val, this.stacktype);
			this.stacktype = val;
			this.on_apply_stacktype();
		}


		this._reset = true;
		this._draw();
	};

	_pChartBasicSeriesControl.on_apply_stacktype = function () {
		this._stacktype = this.stacktype;
		var seriesset = this._chart._visibleSeriesset;
		var ispercent = false;
		var s;
		var i = 0;
		for (i = 0; i < seriesset.length; i++) {
			s = seriesset[i];
			if (s) {
				var stacktype = s.stacktype == "none" ? this._chart.stacktype : s.stacktype;
				if (stacktype == "percent") {
					ispercent = true;
				}
			}
		}
		for (i = 0; i < seriesset.length; i++) {
			s = seriesset[i];
			if (s) {
				s._stacktype = s.stacktype == "none" ? this._chart.stacktype : s.stacktype;
				if (s._stacktype == "percent") {
					ispercent = true;
				}
				if (this.stacktype == "percent" || this._chart.stacktype == "percent" || ispercent) {
					s._stacktype = "percent";
				}
			}
		}
		this._chart._changedData = true;
	};

	_pChartBasicSeriesControl.set_barsize = function (val) {
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

		if (this.barsize != val) {
			this.barsize = val;
			this.on_apply_barsize(lVal);
		}

		this._chart._reset = true;
		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_barsize = function (barsize) {
		if (!nexacro._GraphicsLib.isEmpty(barsize)) {
			this._groupbarwidth = this.barsize * 0.01;
			this._barsize = this.barsize * 0.01;
		}
		else {
			var chartbarsize = this._chart._barsize;
			if (!nexacro._isNull(chartbarsize)) {
				this._groupbarwidth = null;
				this._barsize = chartbarsize;
			}
		}
		this._chart._changedData = true;
	};

	_pChartBasicSeriesControl.set_barlinestyle = function (val) {
		this.barlinestyle = val;
		if (val) {
			if (this._barlinestyle == null || this._barlinestyle.value != val) {
				var oldValue;
				if (this._barlinestyle) {
					oldValue = this._barlinestyle.value;
				}
				this._changeContentsProperty("barlinestyle", val, oldValue);

				var barlinestyle = nexacro.BorderLineObject(val);
				this._barlinestyle = barlinestyle;
				this.on_apply_barlinestyle(barlinestyle);
			}
		}
		else {
			if (this._barlinestyle) {
				this._barlinestyle = null;
				this.on_apply_barlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_barlinestyle = function (barlinestyle) {
		if (barlinestyle) {
			this._barborderwidth = barlinestyle._width;
		}
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "barlinestyle", barlinestyle);
	};

	_pChartBasicSeriesControl.set_barfillstyle = function (val) {
		this.barfillstyle = val;
		if (val) {
			if (this._barfillstyle == null || this._barfillstyle.value != val) {
				var oldValue;
				if (this._barfillstyle) {
					oldValue = this._barfillstyle.value;
				}
				this._changeContentsProperty("barfillstyle", val, oldValue);

				var barfillstyle = nexacro.BackgroundObject(val, this);
				this._barfillstyle = barfillstyle;
				this.on_apply_barfillstyle(barfillstyle);
			}
		}
		else {
			if (this._barfillstyle) {
				this._barfillstyle = null;
				this.on_apply_barfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_barfillstyle = function (barfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "barfillstyle", barfillstyle);

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartBasicSeriesControl.set_baropacity = function (val) {
		this.baropacity = val;
		if (0 === val || val) {
			if (this._baropacity == null || this._baropacity.value != val) {
				var oldValue;
				if (this._baropacity) {
					oldValue = this._baropacity.value;
				}
				this._changeContentsProperty("baropacity", val, oldValue);

				var baropacity = nexacro.OpacityObject(val);
				this._baropacity = baropacity;
				this.on_apply_baropacity(baropacity);
			}
		}
		else {
			if (this._baropacity) {
				this._baropacity = null;
				this.on_apply_baropacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_baropacity = function (baropacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "baropacity", baropacity);
	};

	_pChartBasicSeriesControl.set_highlightbarvisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.highlightbarvisible != val) {
			this._changeContentsProperty("highlightbarvisible", val, this.highlightbarvisible);
			this.highlightbarvisible = val;
			this.on_apply_highlightbarvisible(val);
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_highlightbarvisible = function (highlightbarvisible) {
	};

	_pChartBasicSeriesControl.set_highlightbarlinestyle = function (val) {
		this.highlightbarlinestyle = val;
		if (val) {
			if (this._highlightbarlinestyle == null || this._highlightbarlinestyle.value != val) {
				var oldValue;
				if (this._highlightbarlinestyle) {
					oldValue = this._highlightbarlinestyle.value;
				}
				this._changeContentsProperty("highlightbarlinestyle", val, oldValue);

				var highlightbarlinestyle = nexacro.BorderLineObject(val);
				this._highlightbarlinestyle = highlightbarlinestyle;
				this.on_apply_highlightbarlinestyle(highlightbarlinestyle);
			}
		}
		else {
			if (this._pointlinestyle) {
				this._pointlinestyle = null;
				this.on_apply_highlightbarlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_highlightbarlinestyle = function (highlightbarlinestyle) {
	};

	_pChartBasicSeriesControl.set_highlightbarfillstyle = function (val) {
		this.highlightbarfillstyle = val;
		if (val) {
			if (this._highlightbarfillstyle == null || this._highlightbarfillstyle.value != val) {
				var oldValue;
				if (this._highlightbarfillstyle) {
					oldValue = this._highlightbarfillstyle.value;
				}
				this._changeContentsProperty("highlightbarfillstyle", val, oldValue);

				var highlightbarfillstyle = nexacro.BackgroundObject(val, this);
				this._highlightbarfillstyle = highlightbarfillstyle;
				this.on_apply_highlightbarfillstyle(highlightbarfillstyle);
			}
		}
		else {
			if (this._highlightbarfillstyle) {
				this._highlightbarfillstyle = null;
				this.on_apply_highlightbarfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_highlightbarfillstyle = function (highlightbarfillstyle) {
	};

	_pChartBasicSeriesControl.set_highlightbaropacity = function (val) {
		this.highlightbaropacity = val;
		if (0 === val || val) {
			if (this._highlightbaropacity == null || this._highlightbaropacity.value != val) {
				var oldValue;
				if (this._highlightbaropacity) {
					oldValue = this._highlightbaropacity.value;
				}
				this._changeContentsProperty("highlightbaropacity", val, oldValue);

				var highlightbaropacity = nexacro.OpacityObject(val);
				this._highlightbaropacity = highlightbaropacity;
				this.on_apply_highlightbaropacity(highlightbaropacity);
			}
		}
		else {
			if (this._highlightbaropacity) {
				this._highlightbaropacity = null;
				this.on_apply_highlightbaropacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_highlightbaropacity = function (highlightbaropacity) {
	};

	_pChartBasicSeriesControl.set_selectbarlinestyle = function (val) {
		this.selectbarlinestyle = val;
		if (val) {
			if (this._selectbarlinestyle == null || this._selectbarlinestyle.value != val) {
				var oldValue;
				if (this._selectbarlinestyle) {
					oldValue = this._selectbarlinestyle.value;
				}
				this._changeContentsProperty("selectbarlinestyle", val, oldValue);

				var selectbarlinestyle = nexacro.BorderLineObject(val);
				this._selectbarlinestyle = selectbarlinestyle;
				this.on_apply_selectbarlinestyle(selectbarlinestyle);
			}
		}
		else {
			if (this._selectbarlinestyle) {
				this._selectbarlinestyle = null;
				this.on_apply_selectbarlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_selectbarlinestyle = function (selectbarlinestyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "selectbarlinestyle", selectbarlinestyle, "select");
	};

	_pChartBasicSeriesControl.set_selectbarfillstyle = function (val) {
		this.selectbarfillstyle = val;
		if (val) {
			if (this._selectbarfillstyle == null || this._selectbarfillstyle.value != val) {
				var oldValue;
				if (this._selectbarfillstyle) {
					oldValue = this._selectbarfillstyle.value;
				}
				this._changeContentsProperty("selectbarfillstyle", val, oldValue);

				var selectbarfillstyle = nexacro.BackgroundObject(val, this);
				this._selectbarfillstyle = selectbarfillstyle;
				this.on_apply_selectbarfillstyle(selectbarfillstyle);
			}
		}
		else {
			if (this._selectbarfillstyle) {
				this._selectbarfillstyle = null;
				this.on_apply_selectbarfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_selectbarfillstyle = function (selectbarfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "selectbarfillstyle", selectbarfillstyle, "select");
	};

	_pChartBasicSeriesControl.set_selectbaropacity = function (val) {
		this.selectbaropacity = val;
		if (0 === val || val) {
			if (this._selectbaropacity == null || this._selectbaropacity.value != val) {
				var oldValue;
				if (this._selectbaropacity) {
					oldValue = this._selectbaropacity.value;
				}
				this._changeContentsProperty("selectbaropacity", val, oldValue);

				var selectbaropacity = nexacro.OpacityObject(val);
				this._selectbaropacity = selectbaropacity;
				this.on_apply_selectbaropacity(selectbaropacity);
			}
		}
		else {
			if (this._selectbaropacity) {
				this._selectbaropacity = null;
				this.on_apply_selectbaropacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_selectbaropacity = function (selectbaropacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "selectbaropacity", selectbaropacity, "select");
	};

	_pChartBasicSeriesControl.set_pointlinestyle = function (val) {
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

	_pChartBasicSeriesControl.on_apply_pointlinestyle = function (pointlinestyle) {
		if (pointlinestyle) {
			this._pointborderwidth = pointlinestyle._width;
		}
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "pointlinestyle", pointlinestyle);
	};

	_pChartBasicSeriesControl.set_pointfillstyle = function (val) {
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

	_pChartBasicSeriesControl.on_apply_pointfillstyle = function (pointfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "pointfillstyle", pointfillstyle);

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartBasicSeriesControl.set_pointopacity = function (val) {
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

	_pChartBasicSeriesControl.on_apply_pointopacity = function (pointopacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "pointopacity", pointopacity);
	};

	_pChartBasicSeriesControl.set_pointsize = function (val) {
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

	_pChartBasicSeriesControl.on_apply_pointsize = function () {
		this._chart._changedData = true;
	};

	_pChartBasicSeriesControl.set_pointshape = function (val) {
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

	_pChartBasicSeriesControl.on_apply_pointshape = function () {
		this._chart._changedData = true;
	};

	_pChartBasicSeriesControl.set_highlightpointvisible = function (val) {
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

	_pChartBasicSeriesControl.on_apply_highlightpointvisible = function () {
	};

	_pChartBasicSeriesControl.set_highlightpointsize = function (val) {
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

	_pChartBasicSeriesControl.on_apply_highlightpointsize = function () {
		this._chart._rearrange = true;
		this._chart._recreate = true;
	};

	_pChartBasicSeriesControl.set_highlightpointlinestyle = function (val) {
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

	_pChartBasicSeriesControl.on_apply_highlightpointlinestyle = function (highlightpointlinestyle) {
	};

	_pChartBasicSeriesControl.set_highlightpointfillstyle = function (val) {
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
				this.on_apply_highlightbarfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_highlightpointfillstyle = function (highlightpointfillstyle) {
	};

	_pChartBasicSeriesControl.set_highlightpointopacity = function (val) {
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

	_pChartBasicSeriesControl.on_apply_highlightpointopacity = function (highlightpointopacity) {
	};

	_pChartBasicSeriesControl.set_selectpointlinestyle = function (val) {
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

	_pChartBasicSeriesControl.on_apply_selectpointlinestyle = function (selectpointlinestyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "selectpointlinestyle", selectpointlinestyle, "select");
	};

	_pChartBasicSeriesControl.set_selectpointfillstyle = function (val) {
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

	_pChartBasicSeriesControl.on_apply_selectpointfillstyle = function (selectpointfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "selectpointfillstyle", selectpointfillstyle, "select");
	};

	_pChartBasicSeriesControl.set_selectpointopacity = function (val) {
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

	_pChartBasicSeriesControl.on_apply_selectpointopacity = function (selectpointopacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Point", "selectpointopacity", selectpointopacity, "select");
	};

	_pChartBasicSeriesControl.set_linetype = function (val) {
		var linetype_enum = ["segment", "step", "curve"];
		if (linetype_enum.indexOf(val) == -1) {
			return;
		}

		if (this.linetype != val) {
			this._changeContentsProperty("linetype", val, this.linetype);
			this.linetype = val;
			this.on_apply_linetype();
		}

		this._chart._draw();
	};

	_pChartBasicSeriesControl.on_apply_linetype = function (linetype) {
		this._chart._changedData = true;
	};

	_pChartBasicSeriesControl.set_linestyle = function (val) {
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

	_pChartBasicSeriesControl.on_apply_linestyle = function (linestyle) {
		if (linestyle) {
			this._lineborderwidth = linestyle._width;
			this._linebordercolor = linestyle.color.value;
		}

		this._redrawSeries = false;
		this._applyPropertySeries("Line", "linestyle", linestyle);

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartBasicSeriesControl.set_lineopacity = function (val) {
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

	_pChartBasicSeriesControl.on_apply_lineopacity = function (lineopacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Line", "lineopacity", lineopacity);
	};

	_pChartBasicSeriesControl.set_highlightlinevisible = function (val) {
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

	_pChartBasicSeriesControl.on_apply_highlightlinevisible = function (highlightlinevisible) {
	};

	_pChartBasicSeriesControl.set_highlightlinestyle = function (val) {
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

	_pChartBasicSeriesControl.on_apply_highlightlinestyle = function (highlightlinestyle) {
	};

	_pChartBasicSeriesControl.set_highlightlineopacity = function (val) {
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

	_pChartBasicSeriesControl.on_apply_highlightlineopacity = function (highlightlineopacity) {
	};

	_pChartBasicSeriesControl.set_lineareavisible = function (val) {
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

	_pChartBasicSeriesControl.on_apply_lineareavisible = function () {
		this._chart._changedData = true;
	};

	_pChartBasicSeriesControl.set_lineareafillstyle = function (val) {
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

	_pChartBasicSeriesControl.on_apply_lineareafillstyle = function (lineareafillstyle) {
		if (this.lineareavisible) {
			this._applyPropertySeries("Area", "lineareafillstyle", lineareafillstyle);

			if (this._chart.legend) {
				this._chart._applyLegendItem();
			}
			this._chart._rearrange = true;
			this._chart._recreate = true;
		}
	};

	_pChartBasicSeriesControl.set_lineareaopacity = function (val) {
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

	_pChartBasicSeriesControl.on_apply_lineareaopacity = function (lineareaopacity) {
		this._applyPropertySeries("Area", "lineareaopacity", lineareaopacity);
	};

	_pChartBasicSeriesControl.set_selectlinestyle = function (val) {
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

	_pChartBasicSeriesControl.on_apply_selectlinestyle = function (selectlinestyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Line", "selectlinestyle", selectlinestyle, "select");
	};

	_pChartBasicSeriesControl.set_selectlineareafillstyle = function (val) {
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

	_pChartBasicSeriesControl.on_apply_selectlineareafillstyle = function (selectlineareafillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Area", "selectlineareafillstyle", selectlineareafillstyle, "select");
	};

	_pChartBasicSeriesControl.set_selectlineopacity = function (val) {
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

	_pChartBasicSeriesControl.on_apply_selectlineopacity = function (selectlineopacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Line", "selectlineopacity", selectlineopacity, "select");
	};

	_pChartBasicSeriesControl.set_selectlineareaopacity = function (val) {
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

	_pChartBasicSeriesControl.on_apply_selectlineareaopacity = function (selectlineareaopacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Area", "selectlineareaopacity", selectlineareaopacity, "select");
	};



	_pChartBasicSeriesControl.set_baritemtextposition = function (val) {
		var itemtextposition_enum = ["start", "middle", "end", "outside"];
		if (itemtextposition_enum.indexOf(val) == -1) {
			return;
		}

		if (this.baritemtextposition != val) {
			this._changeContentsProperty("baritemtextposition", val, this.baritemtextposition);
			this.baritemtextposition = val;
			this.on_apply_baritemtextposition();
		}

		this._chart._draw();
	};
	_pChartBasicSeriesControl.on_apply_baritemtextposition = function () {
		this._chart._recreate = true;
		this._chart._rearrange = true;
	};
	_pChartBasicSeriesControl.set_pointitemtextposition = function (val) {
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
	_pChartBasicSeriesControl.on_apply_pointitemtextposition = function () {
		this._chart._recreate = true;
		this._chart._rearrange = true;
	};
	_pChartBasicSeriesControl.set_lineitemtextposition = function (val) {
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
	_pChartBasicSeriesControl.on_apply_lineitemtextposition = function () {
		this._chart._recreate = true;
		this._chart._rearrange = true;
	};
	_pChartBasicSeriesControl.set_baritemtextgap = function (val) {
		if (val !== undefined && val !== null && val !== "") {
			if (isNaN(val)) {
				return;
			}

			val = parseInt(val);
		}
		if (this.baritemtextgap != val) {
			this._changeContentsProperty("baritemtextgap", val, this.baritemtextgap);
			this.baritemtextgap = val;
			this.on_apply_baritemtextgap();
		}
	};
	_pChartBasicSeriesControl.on_apply_baritemtextgap = function () {
		this._chart._rearrange = true;
		this._chart._recreate = true;
	};
	_pChartBasicSeriesControl.set_pointitemtextgap = function (val) {
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
	_pChartBasicSeriesControl.on_apply_pointitemtextgap = function () {
		this._chart._rearrange = true;
		this._chart._recreate = true;
	};
	_pChartBasicSeriesControl.set_lineitemtextgap = function (val) {
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
	_pChartBasicSeriesControl.on_apply_lineitemtextgap = function () {
		this._chart._rearrange = true;
		this._chart._recreate = true;
	};
	_pChartBasicSeriesControl.destroy = function () {
		if (!this._chart) {
			return;
		}

		var seriesGroup = this._chart._graphicsControl.getObjectByID("ChartSeriesGroup");
		var itemLength = this._itemCnt;
		var i = 0;
		var re;
		for (i = 0; i < itemLength; i++) {
			if (seriesGroup) {
				var barvisible = this.barvisible, pointvisible = this.pointvisible, linevisible = this.linevisible, itemID, item;

				if (barvisible) {
					itemID = this._configIndex + " SeriesBarItem_" + i;
					item = seriesGroup.getObjectByID(itemID);
					if (item) {
						re = seriesGroup.removeChild(item);
						if (item._series) {
							if (re._series) {
								if (re._series._seriesitems.length > 0) {
									for (i = 0; i < re._series._seriesitems.length; i++) {
										if (re._series._seriesitems[i]) {
											if (re._series._seriesitems[i]) {
												delete re._series._seriesitems[i];
												re._series._seriesitems[i] = null;
											}

											delete re._series._seriesitems[i];
											re._series._seriesitems[i] = null;
										}
									}
								}
								delete re._series;
								re._series = null;
							}

							delete item._series;
							item._series = null;
						}

						item.destroy();
						re.destroy();
						delete item;
						delete re;
						item = null;
						re = null;
					}
				}

				if (pointvisible) {
					itemID = this._configIndex + " SeriesPointItem_" + i;
					item = seriesGroup.getObjectByID(itemID);
					if (item) {
						re = seriesGroup.removeChild(item);
						item.destroy();
						re.destroy();
						delete item;
						delete re;
						item = null;
						re = null;
					}
				}

				if (linevisible) {
					var lineareavisible = this.lineareavisible, linetype = this.linetype;
					if (lineareavisible) {
						if (linetype == "curve") {
							itemID = this._configIndex + " SeriesCurveAreaItem_0";
						}
						else {
							itemID = this._configIndex + " SeriesAreaItem_0";
						}

						item = seriesGroup.getObjectByID(itemID);
						if (item) {
							re = seriesGroup.removeChild(item);
							item.destroy();
							re.destroy();
							delete item;
							delete re;
							item = null;
							re = null;
						}
					}
					else {
						if (linetype == "curve") {
							itemID = this._configIndex + " SeriesCurveLineItem_0";
						}
						else {
							itemID = this._configIndex + " SeriesLineItem_0";
						}

						item = seriesGroup.getObjectByID(itemID);
						if (item) {
							re = seriesGroup.removeChild(item);
							item.destroy();
							re.destroy();
							delete item;
							delete re;
							item = null;
							re = null;
						}
					}
				}

				if (this.itemtextvisible) {
					itemID = this._configIndex + " SeriesItemText_" + i;
					item = seriesGroup.getObjectByID(itemID);
					if (item) {
						re = seriesGroup.removeChild(item);
						item.destroy();
						delete item;
						delete re;
						item = null;
						re = null;
					}
				}
			}
		}

		if (this._seriesitems.length > 0) {
			for (i = 0; i < this._seriesitems.length; i++) {
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

		delete this.valueaxis;
		delete this._xaxis;
		delete this._yaxis;
		delete this._pointshape;

		this.valueaxis = null;
		this.barvisible = null;
		this.barsize = null;
		this.barlinestyle = null;
		this.barfillstyle = null;
		this.baropacity = null;
		this.stacktype = null;
		this.highlightbarvisible = null;
		this.highlightbarlinestyle = null;
		this.highlightbarfillstyle = null;
		this.highlightbaropacity = null;
		this.selectbarlinestyle = null;
		this.selectbarfillstyle = null;
		this.selectbaropacity = null;

		this.linevisible = null;
		this.linetype = null;
		this.linestyle = null;
		this.lineopacity = null;
		this.lineareavisible = null;
		this.lineareafillstyle = null;
		this.lineareaopacity = null;
		this.highlightlinevisible = null;
		this.highlightlinestyle = null;
		this.highlightlineopacity = null;
		this.selectlinestyle = null;
		this.selectlineareafillstyle = null;
		this.selectlineopacity = null;
		this.selectlineareaopacity = null;

		this.pointvisible = null;
		this.pointshape = null;
		this.pointsize = null;
		this.pointopacity = null;
		this.pointlinestyle = null;
		this.pointfillstyle = null;
		this.highlightpointvisible = null;
		this.highlightpointsize = null;
		this.highlightpointlinestyle = null;
		this.highlightpointfillstyle = null;
		this.highlightpointopacity = null;
		this.selectpointlinestyle = null;
		this.selectpointfillstyle = null;
		this.selectpointopacity = null;
		this.stackbargroup = null;
		this.baritemtextposition = null;
		this.pointitemtextposition = null;
		this.lineitemtextposition = null;

		this.baritemtextgap = null;
		this.pointitemtextgap = null;
		this.lineitemtextgap = null;
		this._pointshape = null;
		this._barborderwidth = null;
		this._pointborderwidth = null;
		this._lineborderwidth = null;
		this._linebordercolor = null;
		this._color = null;
		this._xaxis = null;
		this._yaxis = null;
		this._changedSeriesColor = null;
		this._barsize = null;
		this._groupbarwidth = null;
		this._baralign = null;
		this._barwidth = null;

		this._seriesitems = null;
		this._pointshapeObj = null;
		this._stacktype = null;
		nexacro._SeriesBase.prototype.destroy.call(this);
		return true;
	};

	_pChartBasicSeriesControl._applyPropertySeries = function (type, style, value, select) {
		var item = null, seriesGroup = this._chart._graphicsControl.getObjectByID("ChartSeriesGroup");

		if (seriesGroup) {
			for (var i = 1; i <= this._itemCnt; i++) {
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
						if (style == "selectbarfillstyle" || style == "selectpointfillstyle" || style == "selectlineareafillstyle") {
							item.set_fillstyle(value);
						}
						else if (style == "selectbarlinestyle" || style == "selectpointlinestyle" || style == "selectlinestyle") {
							item.set_strokepen(value);
						}
						else if (style == "selectbaropacity" || style == "selectpointopacity" || style == "selectlineopacity" || style == "selectlineareaopacity") {
							item.set_opacity(value);
						}
						else if (style == "barvisible" || style == "pointvisible" || style == "linevisible" || style == "lineareavisible") {
							item.set_visible(value);
						}
					}
					else {
						if (style == "barfillstyle" || style == "pointfillstyle" || style == "lineareafillstyle") {
							item.set_fillstyle(value);
						}
						else if (style == "barlinestyle" || style == "pointlinestyle" || style == "linestyle") {
							item.set_strokepen(value);
						}
						else if (style == "baropacity" || style == "pointopacity" || style == "lineopacity" || style == "lineareaopacity") {
							item.set_opacity(value);
						}
						else if (style == "barvisible" || style == "pointvisible" || style == "linevisible" || style == "lineareavisible") {
							item.set_visible(value);
						}
					}
				}
			}
		}
	};


	_pChartBasicSeriesControl._draw2 = function (redraw) {
		if (!redraw) {
			return;
		}

		this._itemCnt = 0;
		this._itemtextlist = [];
		if (this.barvisible) {
			this._drawSeriesBars();
		}

		if (this.linevisible) {
			if (this.linetype == "curve") {
				this._drawSeriesCurveLines();
			}
			else {
				this._drawSeriesLines();
			}
		}

		if (this.pointvisible) {
			this._drawSeriesPoints();
		}
	};
	_pChartBasicSeriesControl._draw = function (redraw) {
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
	_pChartBasicSeriesControl._drawnow = function () {
		if (this.barvisible) {
			this._drawSeriesBars();
		}


		if (this.linevisible) {
			if (this.linetype == "curve") {
				this._drawSeriesCurveLines();
			}
			else {
				this._drawSeriesLines();
			}
		}

		if (this.pointvisible) {
			this._drawSeriesPoints();
		}
	};


	_pChartBasicSeriesControl._drawSeriesBars = function () {
		var barlinestyle = this.barlinestyle || "1px solid " + this._color, barfillstyle = this.barfillstyle || this._color, baropacity = this.baropacity, barLeft, barRight, barwidth = this._barsize || this._chart._barsize, datapoints = this._datapoints, points = datapoints.points, ps = datapoints.pointsize, selectedItem = this._selectedItem, selectbarlinestyle = this.selectbarlinestyle || "1px solid " + this._selectcolor, selectbarfillstyle = this.selectbarfillstyle || this._selectcolor, selectbaropacity = this.selectbaropacity || this.baropacity, isselectitem = false, index = 0, x, y, b, effect = this._chart_aniframe_obj, rotateaxis = this._chart.rotateaxis, stacktype = this._stacktype == "none" ? this._chart.stacktype : this._stacktype;

		if (this._chart._getVisibleStackGroupingLength() > 1 && this._chart._bargrouping && this._groupbarwidth != null) {
			this._barsize = this._chart._toGroupBarWidth(this._groupbarwidth);
			barwidth = this._barsize;
		}
		else if (this._chart._getVisibleStackGroupingLength() > 1 && this._chart._bargrouping && this._groupbarwidth == null) {
			barwidth = this._chart._barsize;
		}
		else {
			this.on_apply_barsize(this.barsize);

			barwidth = this._barsize || this._chart._barsize;
		}
		barwidth = this._chart._getcheckTimeAxisBarWidth(barwidth);
		switch (this._baralign) {
			case "left":
				barLeft = 0;
				break;
			case "right":
				barLeft = -barwidth;
				break;
			default:
				barLeft = -barwidth / 2;
		}

		barRight = barLeft + barwidth;



		var linetype = this.linetype;
		if ((linetype == "step" && this.linevisible) || this._chart._isstepline) {
			ps += 3;
		}

		for (var i = 0; i < points.length; i += ps) {
			var length = selectedItem.length;
			if (length > 0) {
				isselectitem = selectedItem[index];
			}
			x = points[i];
			y = points[i + 1];
			b = points[i + 2];
			if (effect && effect.isloadanimation) {
				isselectitem = false;
				if (!rotateaxis) {
					y = this._getanimationdrawvalue(y);
				}
				else {
					x = this._getanimationdrawvalue(x);
				}
				b = this._getanimationdrawvalue(b);
			}
			if (isselectitem) {
				this._drawBar(x, y, b, barLeft, barRight, this._xaxis, this._yaxis, selectbarlinestyle, selectbarfillstyle, selectbaropacity, index);
			}
			else {
				this._drawBar(x, y, b, barLeft, barRight, this._xaxis, this._yaxis, barlinestyle, barfillstyle, baropacity, index);
			}

			index++;
		}
		this._itemCnt = index;
	};

	_pChartBasicSeriesControl._drawSeriesCurveLines = function () {
		var linestyle = this.linestyle || "1px solid " + this._color, linetype = this.linetype, lineopacity = this.lineopacity, lineareavisible = this.lineareavisible, lineareafillstyle = this.lineareafillstyle || this._color, lineareaopacity = this.lineareaopacity, datapoints = this._datapoints, xaxis = this._xaxis, yaxis = this._yaxis, path, area, seriesGroup = this._chart._seriesGroup, index = 0, selectedItem = this._selectedItem, selectlinestyle = this.selectlinestyle || "1px solid " + this._selectcolor, selectlineareafillstyle = this.selectlineareafillstyle || this._selectcolor, selectlineopacity = this.selectlineopacity || this.lineopacity, selectlineareaopacity = this.selectlineareaopacity || this.lineareaopacity, isselectitem = false, effect = this._chart_aniframe_obj, line = [], shiftPointX = 0, startPointX = 0, endPointX, shiftPointY = 0, startPointY = 0, endPointY, rotateaxis = this._chart.rotateaxis, tickstartgap, stacktype = this._stacktype == "none" ? this._chart.stacktype : this._stacktype;

		var cp = [], tension = 0.4, idx, prevx = null, prevy = null, x1, x2, y1, y2, ps = datapoints.pointsize, points = datapoints.points.slice(0), len = points.length, pts = [];
		var skipmoves = [];
		var skipindex = 0;
		var aline = [];
		var bline = [];
		var length = selectedItem.length;
		var i = 0;
		var skipmove = false;
		var checkpoint = null;
		function checkpoints (x1, y1, x2, y2, xaxis, yaxis) {
			if (y1 <= y2 && y1 < yaxis._min) {
				if (y2 < yaxis._min) {
					return null;
				}
				x1 = (yaxis._min - y1) / (y2 - y1) * (x2 - x1) + x1;
				y1 = yaxis._min;
			}
			else if (y2 <= y1 && y2 < yaxis._min) {
				if (y1 < yaxis._min) {
					return null;
				}
				x2 = (yaxis._min - y1) / (y2 - y1) * (x2 - x1) + x1;
				y2 = yaxis._min;
			}

			if (y1 >= y2 && y1 > yaxis._max) {
				if (y2 > yaxis._max) {
					return null;
				}
				x1 = (yaxis._max - y1) / (y2 - y1) * (x2 - x1) + x1;
				y1 = yaxis._max;
			}
			else if (y2 >= y1 && y2 > yaxis._max) {
				if (y1 > yaxis._max) {
					return null;
				}
				x2 = (yaxis._max - y1) / (y2 - y1) * (x2 - x1) + x1;
				y2 = yaxis._max;
			}


			if (x1 <= x2 && x1 < xaxis._min) {
				if (x2 < xaxis._min) {
					return null;
				}
				y1 = (xaxis._min - x1) / (x2 - x1) * (y2 - y1) + y1;
				x1 = xaxis._min;
			}
			else if (x2 <= x1 && x2 < xaxis._min) {
				if (x1 < xaxis._min) {
					return null;
				}
				y2 = (xaxis._min - x1) / (x2 - x1) * (y2 - y1) + y1;
				x2 = xaxis._min;
			}

			if (x1 >= x2 && x1 > xaxis._max) {
				if (x2 > xaxis._max) {
					return null;
				}
				y1 = (xaxis._max - x1) / (x2 - x1) * (y2 - y1) + y1;
				x1 = xaxis._max;
			}
			else if (x2 >= x1 && x2 > xaxis._max) {
				if (x1 > xaxis._max) {
					return null;
				}
				y2 = (xaxis._max - x1) / (x2 - x1) * (y2 - y1) + y1;
				x2 = xaxis._max;
			}
			var points = [];
			points[0] = x1;
			points[1] = y1;
			points[2] = x2;
			points[3] = y2;
			return points;
		}
		function addCurveLine (type, points, cpoints, bskipmove) {
			if (type === void 0 || (type !== 'cubic' && type !== 'quadratic')) {
				type = 'quadratic';
			}

			type = type + 'CurveTo';

			if (line.length == 0) {
				line.push([points[0], points[1], cpoints.concat(points.slice(2)), type]);
			}
			else if (type == "quadraticCurveTo" && points.length == 2) {
				cpoints = cpoints.slice(0, 2).concat(points);

				line.push([points[0], points[1], cpoints, type]);
			}
			else {
				line.push([points[2], points[3], cpoints.concat(points.slice(2)), type]);
			}
		}

		function getControlPoints (x0, y0, x1, y1, x2, y2, tension) {
			var pow = Math.pow, sqrt = Math.sqrt, d01, d12, fa, fb, p1x, p1y, p2x, p2y;

			d01 = sqrt(pow(x1 - x0, 2) + pow(y1 - y0, 2));
			d12 = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));

			fa = tension * d01 / (d01 + d12);
			fb = tension - fa;

			p1x = x1 + fa * (x0 - x2);
			p1y = y1 + fa * (y0 - y2);

			p2x = x1 - fb * (x0 - x2);
			p2y = y1 - fb * (y0 - y2);

			return [p1x, p1y, p2x, p2y];
		}

		for (i = 0; i < length; i++) {
			var isselect = selectedItem[i];
			if (isselect) {
				isselectitem = true;
				break;
			}
		}
		if (effect && effect.isloadanimation) {
			isselectitem = false;
			points = this._getanimationdrawvalue(points);
		}
		if (this._chart._isstepline && linetype != "step") {
			ps += 3;
		}
		for (idx = 0; idx < len; idx += ps) {
			x1 = points[idx - ps], 
				y1 = points[idx - ps + 1], 
				x2 = points[idx], 
				y2 = points[idx + 1];
			skipmove = false;
			if (y1 == null || y2 == null) {
				if (x1 != null || x1 != null) {
					if (lineareavisible) {
						if (y1 == null) {
							y1 = yaxis._min;
						}
						if (y2 == null) {
							y2 = yaxis._min;
						}
					}
					else {
						if (y1 == null) {
							y1 = yaxis._min;
							skipmove = true;
							skipmoves[skipindex - 1] = skipmove;
						}
						if (y2 == null) {
							y2 = yaxis._min;
							skipmove = true;
							skipmoves[skipindex - 1] = skipmove;
						}
					}
				}
			}
			if (!skipmove) {
				skipmoves.push(skipmove);
			}
			skipindex++;

			checkpoint = checkpoints(x1, y1, x2, y2, xaxis, yaxis);
			if (checkpoint == null) {
				continue;
			}
			x1 = checkpoint[0];
			y1 = checkpoint[1];
			x2 = checkpoint[2];
			y2 = checkpoint[3];

			if (this._chart._getVisibleStackGroupingLength() > 1 && this._chart._bargrouping && this._barwidth && this.barvisible) {
				if (!rotateaxis) {
					shiftPointX = this._barwidth / 2;
				}
				else {
					shiftPointY = this._barwidth / 2;
					shiftPointY = -shiftPointY;
				}
			}
			if (x1 != prevx || y1 != prevy) {
				startPointX = xaxis.p2c(x1) + shiftPointX;
				startPointY = yaxis.p2c(y1) + shiftPointY;


				if (!rotateaxis) {
					tickstartgap = xaxis._tickstartgap;
					if (tickstartgap) {
						startPointX += tickstartgap;
					}
				}
				else {
					tickstartgap = yaxis._tickstartgap;
					if (tickstartgap) {
						startPointY += tickstartgap;
					}
				}
				startPointY += yaxis._tickendspace;
				pts.push(startPointX, startPointY);
			}

			prevx = x2;
			prevy = y2;
			if (x2 <= 0 || y2 <= 0) {
				this._chart._isnegativedata = true;
			}

			endPointX = xaxis.p2c(x2) + shiftPointX;
			endPointY = yaxis.p2c(y2) + shiftPointY;

			if (!rotateaxis) {
				tickstartgap = xaxis._tickstartgap;
				if (tickstartgap) {
					endPointX += tickstartgap;
				}
			}
			else {
				tickstartgap = yaxis._tickstartgap;
				if (tickstartgap) {
					endPointY += tickstartgap;
				}
			}
			endPointY += yaxis._tickendspace;
			pts.push(endPointX, endPointY);
		}

		len = pts.length;

		for (idx = 0; idx < len - 2; idx += 2) {
			cp = cp.concat(getControlPoints.apply(this, pts.slice(idx, idx + 6).concat([tension])));
		}

		addCurveLine('quadratic', pts.slice(0, 4), cp.slice(0, 2));


		for (idx = 2; idx < len - 3; idx += 2) {
			addCurveLine('cubic', pts.slice(idx, idx + 4), cp.slice(2 * idx - 2, 2 * idx + 2));
		}

		addCurveLine('quadratic', pts.slice(len - 2, len), [cp[2 * len - 10], cp[2 * len - 9], pts[len - 4], pts[len - 3]]);
		aline = line;
		if (isselectitem) {
			path = this._drawCurveLine(aline, selectlinestyle, selectlineopacity, false, skipmoves);
		}
		else {
			path = this._drawCurveLine(aline, linestyle, lineopacity, false, skipmoves);
		}
		if (lineareavisible && stacktype != "none") {
			pts = [];
			line = [];
			skipmoves = [];
			var reversepoints = [];
			len = points.length;
			prevx = null;
			prevy = null;
			skipindex = 0;
			skipmove = false;
			cp = [];
			for (i = len - 1; i > -1; i -= ps) {
				reversepoints.push(points[i - 2]);
				reversepoints.push(points[i - 1]);
				reversepoints.push(points[i]);
			}
			points = reversepoints;
			for (idx = 0; idx < len; idx += ps) {
				if (!rotateaxis) {
					x1 = points[idx - ps], 
						y1 = points[idx - ps + 2], 
						x2 = points[idx], 
						y2 = points[idx + 2];
				}
				else {
					x1 = points[idx - ps + 2], 
						y1 = points[idx - ps + 1], 
						x2 = points[idx + 2], 
						y2 = points[idx + 1];
				}
				skipmove = false;
				if (y1 == null || y2 == null) {
					if (x1 != null || x1 != null) {
						if (lineareavisible) {
							if (y1 == null) {
								y1 = yaxis._min;
							}
							if (y2 == null) {
								y2 = yaxis._min;
							}
						}
						else {
							if (y1 == null) {
								y1 = yaxis._min;
								skipmove = true;
								skipmoves[skipindex - 1] = skipmove;
							}
							if (y2 == null) {
								y2 = yaxis._min;
								skipmove = true;
								skipmoves[skipindex - 1] = skipmove;
							}
						}
					}
				}
				if (!skipmove) {
					skipmoves.push(skipmove);
				}
				skipindex++;

				checkpoint = checkpoints(x1, y1, x2, y2, xaxis, yaxis);
				if (checkpoint == null) {
					continue;
				}
				x1 = checkpoint[0];
				y1 = checkpoint[1];
				x2 = checkpoint[2];
				y2 = checkpoint[3];

				if (this._chart._getVisibleStackGroupingLength() > 1 && this._chart._bargrouping && this._barwidth && this.barvisible) {
					if (!rotateaxis) {
						shiftPointX = this._barwidth / 2;
					}
					else {
						shiftPointY = this._barwidth / 2;
						shiftPointY = -shiftPointY;
					}
				}
				if (x1 != prevx || y1 != prevy) {
					startPointX = xaxis.p2c(x1) + shiftPointX;
					startPointY = yaxis.p2c(y1) + shiftPointY;


					if (!rotateaxis) {
						tickstartgap = xaxis._tickstartgap;
						if (tickstartgap) {
							startPointX += tickstartgap;
						}
					}
					else {
						tickstartgap = yaxis._tickstartgap;
						if (tickstartgap) {
							startPointY += tickstartgap;
						}
					}
					startPointY += yaxis._tickendspace;
					pts.push(startPointX, startPointY);
				}

				prevx = x2;
				prevy = y2;
				if (x2 <= 0 || y2 <= 0) {
					this._chart._isnegativedata = true;
				}

				endPointX = xaxis.p2c(x2) + shiftPointX;
				endPointY = yaxis.p2c(y2) + shiftPointY;

				if (!rotateaxis) {
					tickstartgap = xaxis._tickstartgap;
					if (tickstartgap) {
						endPointX += tickstartgap;
					}
				}
				else {
					tickstartgap = yaxis._tickstartgap;
					if (tickstartgap) {
						endPointY += tickstartgap;
					}
				}
				endPointY += yaxis._tickendspace;
				pts.push(endPointX, endPointY);
			}

			len = pts.length;

			for (idx = 0; idx < len - 2; idx += 2) {
				cp = cp.concat(getControlPoints.apply(this, pts.slice(idx, idx + 6).concat([tension])));
			}

			addCurveLine('quadratic', pts.slice(0, 4), cp.slice(0, 2));


			for (idx = 2; idx < len - 3; idx += 2) {
				addCurveLine('cubic', pts.slice(idx, idx + 4), cp.slice(2 * idx - 2, 2 * idx + 2));
			}

			addCurveLine('quadratic', pts.slice(len - 2, len), [cp[2 * len - 10], cp[2 * len - 9], pts[len - 4], pts[len - 3]]);

			bline = line;
		}



		if (lineareavisible) {
			if (isselectitem) {
				this._drawCurveArea(aline, bline, selectlineareafillstyle, selectlineareaopacity);
			}
			else {
				this._drawCurveArea(aline, bline, lineareafillstyle, lineareaopacity);
			}
		}

		var itemtextvisible = this.itemtextvisible, barvisible = this.barvisible, pointvisible = this.pointvisible;

		if (!barvisible && !pointvisible && itemtextvisible) {
			if (path) {
				if (effect && effect.isloadanimation) {
				}
				else {
					this._drawLineItemText(datapoints, xaxis, yaxis, path);
				}
			}
		}


		this._chart._isnegativedata = false;
	};

	_pChartBasicSeriesControl._drawSeriesLines = function () {
		var linestyle = this.linestyle || "1px solid " + this._color, linetype = this.linetype, lineopacity = this.lineopacity, lineareavisible = this.lineareavisible, lineareafillstyle = this.lineareafillstyle || this._color, lineareaopacity = this.lineareaopacity, datapoints = this._datapoints, categoryaxis = this._xaxis, valueaxis = this._yaxis, path, area, seriesGroup = this._chart._seriesGroup, selectedItem = this._selectedItem, selectlinestyle = this.selectlinestyle || "1px solid " + this._selectcolor, selectlineareafillstyle = this.selectlineareafillstyle || this._selectcolor, selectlineopacity = this.selectlineopacity || this.lineopacity, selectlineareaopacity = this.selectlineareaopacity || this.lineareaopacity, isselectitem = false, effect = this._chart_aniframe_obj, length = 0;

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
			if (lineareavisible) {
				area = this._drawArea(datapoints, categoryaxis, valueaxis, selectlineareafillstyle, selectlineareaopacity);
			}
			path = this._drawLine(datapoints, 0, 0, categoryaxis, valueaxis, selectlinestyle, selectlineopacity, false);
		}
		else {
			if (lineareavisible) {
				area = this._drawArea(datapoints, categoryaxis, valueaxis, lineareafillstyle, lineareaopacity);
			}
			path = this._drawLine(datapoints, 0, 0, categoryaxis, valueaxis, linestyle, lineopacity, false);
		}

		var itemtextvisible = this.itemtextvisible, barvisible = this.barvisible, pointvisible = this.pointvisible;
		if (!barvisible && !pointvisible && itemtextvisible) {
			if (path) {
				if (effect && effect.isloadanimation) {
				}
				else {
					this._drawLineItemText(datapoints, categoryaxis, valueaxis, path);
				}
			}
		}
	};

	_pChartBasicSeriesControl._drawSeriesPoints = function () {
		var pointlinestyle = this.pointlinestyle || "1px solid " + this._color, pointfillstyle = this.pointfillstyle || this._color, pointopacity = this.pointopacity, index = 0, datapoints = this._datapoints, points = datapoints.points.slice(0), ps = datapoints.pointsize, selectitem, linetype = this.linetype, selectpointlinestyle = this.selectpointlinestyle || "1px solid " + this._selectcolor, selectpointfillstyle = this.selectpointfillstyle || this._selectcolor, selectpointopacity = this.selectpointopacity || this.pointopacity, selectedItem = this._selectedItem, isselectitem = false, effect = this._chart_aniframe_obj, pointsize;

		if ((this.pointsize == "" || this.pointsize == undefined) && this.pointsize !== 0) {
			pointsize = 10;
		}
		else {
			pointsize = this.pointsize;
		}
		if (this._chart._isstepline && linetype == "step") {
			ps += 3;
		}
		if (effect && effect.isloadanimation) {
			points = this._getanimationdrawvalue(points);
		}

		for (var i = 0; i < points.length; i += ps) {
			var curValue = points[i + 1];
			var preValue = points[(i - ps) + 1];
			var nextValue = points[(i + ps) + 1];

			if (points[i] == null || (linetype == "step" && i != 0 && curValue == preValue && curValue != nextValue && nextValue != null) || curValue == null) {
				index++;
				continue;
			}

			var length = selectedItem.length;
			if (length > 0) {
				isselectitem = selectedItem[index];
			}
			if (effect && effect.isloadanimation) {
				isselectitem = false;
			}
			if (isselectitem) {
				this._drawPoint(points[i], points[i + 1], pointsize, this._xaxis, this._yaxis, this.pointshape, this._pointshape, selectpointlinestyle, selectpointfillstyle, selectpointopacity, index);
			}
			else {
				this._drawPoint(points[i], points[i + 1], pointsize, this._xaxis, this._yaxis, this.pointshape, this._pointshape, pointlinestyle, pointfillstyle, pointopacity, index);
			}
			index++;
		}
		this._itemCnt = index;
	};

	_pChartBasicSeriesControl._drawBar = function (x, y, b, barLeft, barRight, axisx, axisy, barlinestyle, barfillstyle, baropacity, index, item) {
		var left, right, bottom, top, tmp, rotateaxis = this._chart.rotateaxis, effect = this._chart_aniframe_obj, tickstartgap;

		if (rotateaxis && !this._chart._isCompositeSeries) {
			left = b;
			right = x;
			top = y + barLeft;
			bottom = y + barRight;

			if (right < left) {
				tmp = right;
				right = left;
				left = tmp;
			}
		}
		else {
			left = x + barLeft;
			right = x + barRight;
			bottom = b;
			top = y;

			if (top < bottom) {
				tmp = top;
				top = bottom;
				bottom = tmp;
			}
		}
		if (right < axisx._min || left > axisx._max || top < axisy._min || bottom > axisy._max) {
			return;
		}

		if (left < axisx._min) {
			left = axisx._min;
		}

		if (right > axisx._max) {
			right = axisx._max;
		}

		if (bottom < axisy._min) {
			bottom = axisy._min;
		}

		if (top > axisy._max) {
			top = axisy._max;
		}

		if (axisx.p2c) {
			left = axisx.p2c(left);
			right = axisx.p2c(right);
		}
		if (axisy.p2c) {
			bottom = axisy.p2c(bottom);
			top = axisy.p2c(top);
		}

		if (!rotateaxis) {
			tickstartgap = axisx._tickstartgap;
			if (tickstartgap) {
				left += tickstartgap;
				right += tickstartgap;
			}
		}
		else {
			tickstartgap = axisy._tickstartgap;
			if (tickstartgap) {
				bottom += tickstartgap;
				top += tickstartgap;
			}
		}
		bottom += axisy._tickendspace;
		top += axisy._tickendspace;
		var rect, chart = this._chart, fillStyle = [], width = 0, height = 0, tooltip = chart.tooltip, evtInfo, seriesId, points = [], seriesGroup = chart._seriesGroup, highlightGroup = chart._highlightGroup;

		width = right - left;
		height = bottom - top;

		if (width < 0) {
			left += width;
			width = Math.abs(width);
		}
		if (height < 0) {
			top += height;
			height = Math.abs(height);
		}

		if (rotateaxis) {
			this._barwidth = height;
		}
		else {
			this._barwidth = width;
		}



		if (item) {
			var highlightitem = item._barHighlight;
			if (!highlightitem) {
				rect = new nexacro.GraphicsRect(left, top, width, height);
				rect.set_strokepen(barlinestyle);
				rect.set_fillstyle(barfillstyle);
				rect.set_opacity(baropacity);

				seriesId = this._configIndex + " SeriesHighlightBarItem";
				rect.set_id(seriesId);
				highlightGroup.addChild(rect);

				item._barHighlight = rect;
				rect._item = item;
				rect.index = item.index;
				rect.value = item.value;
			}
			else {
				rect = highlightitem;
			}
		}
		else {
			if (seriesGroup) {
				seriesId = this._configIndex + " SeriesBarItem_" + index;
				rect = seriesGroup.getObjectByID(seriesId);
				if (!rect) {
					rect = new nexacro.GraphicsRect(left, top, width, height);
					rect.set_id(seriesId);
					seriesGroup.addChild(rect);
				}
				else {
					rect.set_x(left);
					rect.set_width(width);
					rect.set_y(top);
					rect.set_height(height);
				}

				rect.set_strokepen(barlinestyle);
				rect.set_fillstyle(barfillstyle);
				rect.set_opacity(baropacity);





				points[0] = x;
				points[1] = y;
				points[2] = b;

				rect.index = index;
				if (rotateaxis && !this._chart._isCompositeSeries) {
					points[3] = x - b;
					rect.value = x;
				}
				else {
					points[3] = y - b;
					rect.value = y;
				}

				rect._points = points;
			}
		}

		var board = this._chart._boardRect, boardWidth = 0, boardHeight = 0, borderWidth = this._chart._boardBorderWidth, borderHeight = this._chart._boardBorderHeight;

		if (board) {
			boardWidth = board.width - borderWidth;
			boardHeight = board.height - borderHeight;
			rect._clipitems = [];
			rect.setClipPath(new nexacro.Rect(-left, -top, boardWidth, boardHeight));
		}

		rect._series = this;
		this._seriesitems[index] = rect;

		if (rect && !item) {
			var itemtextvisible = this.itemtextvisible;
			if (itemtextvisible) {
				if (effect && effect.isloadanimation) {
				}
				else {
					this._drawBarItemText(left, right, bottom, top, width, height, rect);
				}
			}
		}
	};

	_pChartBasicSeriesControl._drawPoint = function (x, y, radius, axisx, axisy, pointshape, _pointshape, pointlinestyle, pointfillstyle, pointopacity, index, item) {
		var chart = this._chart, point, cx, cy, points = [], evtInfo, seriesId, shiftPointX = 0, shiftPointY = 0, seriesGroup = chart._seriesGroup, rotateaxis = chart.rotateaxis, tmp, highlightGroup = chart._highlightGroup, effect = this._chart_aniframe_obj, banimationclip = false, tickstartgap;

		if (x == null || y == null || x < axisx._min || x > axisx._max || y < axisy._min || y > axisy._max) {
			return;
		}

		if (rotateaxis && !this._chart._isCompositeSeries) {
			tmp = y;
			y = x;
			y = tmp;
		}

		var stacktype = this._stacktype == "none" ? this._chart.stacktype : this._stacktype;
		if (this._chart._getVisibleStackGroupingLength() > 1 && this._chart._bargrouping && this._barwidth && this.barvisible) {
			if (!rotateaxis) {
				shiftPointX = this._barwidth / 2;
			}
			else {
				shiftPointY = this._barwidth / 2;
				shiftPointY = -shiftPointY;
			}

			cx = axisx.p2c(x) + shiftPointX;
			cy = axisy.p2c(y) + shiftPointY;
		}
		else {
			cx = axisx.p2c(x);
			cy = axisy.p2c(y);
		}



		if (!rotateaxis) {
			tickstartgap = axisx._tickstartgap;
			if (tickstartgap) {
				cx += tickstartgap;
			}
		}
		else {
			tickstartgap = axisy._tickstartgap;
			if (tickstartgap) {
				cy += tickstartgap;
			}
		}
		cy += axisy._tickendspace;





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
				if (rotateaxis && !this._chart._isCompositeSeries) {
					point.value = x;
				}
				else {
					point.value = y;
				}

				points[0] = x;
				points[1] = y;

				point.radius = radius;
				point._points = points;
			}
		}

		point.set_strokepen(pointlinestyle);
		point.set_fillstyle(pointfillstyle);
		point.set_opacity(pointopacity);

		var board = this._chart._boardRect, boardWidth = 0, boardHeight = 0, borderWidth = this._chart._boardBorderWidth, borderHeight = this._chart._boardBorderHeight;

		if (board) {
			boardWidth = board.width - borderWidth;
			boardHeight = board.height - borderHeight;
			if (!banimationclip) {
				point._clipitems = [];
				if (pointshape == "diamond" || pointshape == "triangle" || pointshape == "cross") {
					point.setClipPath(new nexacro.Rect(0, 0, boardWidth, boardHeight));
				}
				else {
					point.setClipPath(new nexacro.Rect(-cx, -cy, boardWidth, boardHeight));
				}
			}
		}

		point._series = this;
		this._seriesitems[point.index] = point;

		if (point && !item) {
			var itemtextvisible = this.itemtextvisible, barvisible = this.barvisible;
			if (!barvisible && itemtextvisible && point) {
				if (effect && effect.isloadanimation) {
				}
				else {
					this._drawPointItemText(cx, cy, point);
				}
			}
		}
	};
	_pChartBasicSeriesControl._setLineAreaClip = function (path) {
		var rotateaxis = this._chart.rotateaxis, board = this._chart._boardRect, boardWidth = 0, boardHeight = 0, series = this, borderWidth = this._chart._boardBorderWidth || 1, borderHeight = this._chart._boardBorderHeight || 1;

		if (board) {
			var axis;
			var tickstartgap = 0;
			var tickendgap = 0;
			var tickendspace = 0;
			if (rotateaxis) {
				axis = series._yaxis;
				if (axis) {
					tickstartgap = axis._tickstartgap;
					tickendgap = axis._tickendgap;
					tickendspace = axis._tickendspace;
				}

				boardWidth = board.width - borderWidth;
				boardHeight = board.height - (borderHeight - tickstartgap - tickendgap - tickendspace);
				path._clipitems = [];
				path.setClipPath(new nexacro.Rect(0, tickstartgap, boardWidth, boardHeight + 2));
			}
			else {
				axis = series._xaxis;
				if (axis) {
					tickstartgap = axis._tickstartgap;
					tickendgap = axis._tickendgap;
					tickendspace = axis._tickendspace;
				}
				boardWidth = board.width - (borderWidth + tickstartgap + tickendgap + tickendspace);
				boardHeight = board.height - borderHeight;
				path._clipitems = [];
				path.setClipPath(new nexacro.Rect(tickstartgap, 0, boardWidth + 2, boardHeight));
			}
		}
	};

	_pChartBasicSeriesControl._drawLine = function (datapoints, xoffset, yoffset, axisx, axisy, linestyle, lineopacity, Ishighlight) {
		var points = datapoints.points.slice(0), ps = datapoints.pointsize, prevx = null, prevy = null, path, shiftPointX = 0, startPointX, endPointX, shiftPointY = 0, startPointY, endPointY, ypos = 1, xpos = 0, tickstartgap, rotateaxis = this._chart.rotateaxis, seriesGroup = this._chart._seriesGroup, bCreate = false, effect = this._chart_aniframe_obj, stacktype = this._stacktype == "none" ? this._chart.stacktype : this._stacktype;


		if (Ishighlight) {
			path = new nexacro.GraphicsPaths();
			path.set_id(this._configIndex + " SeriesHighlightLineItem_0");
		}
		else {
			if (effect && effect.isloadanimation) {
				points = this._getanimationdrawvalue(points);
			}

			var seriesid = this._configIndex + " SeriesLineItem_0";
			path = seriesGroup.getObjectByID(seriesid);
			if (!path) {
				bCreate = true;
				path = new nexacro.GraphicsPaths();
				path.set_id(seriesid);
			}
			else {
				path.clear();
			}
		}
		path.set_strokepen(linestyle);
		path.set_opacity(lineopacity);

		if (!nexacro._GraphicsLib.isEmpty(lineopacity)) {
			path.set_opacity(lineopacity);
		}
		if (this._chart._isstepline && this.linetype != "step") {
			ps += 3;
		}
		for (var i = ps; i < points.length; i += ps) {
			var x1, y1, x2, y2;

			if (this._chart._bargrouping && this.linetype == "step") {
				if (i % 6 == 0) {
					x1 = points[i];
					x2 = points[i];
				}
				else {
					x1 = points[i - ps];
					x2 = points[i + ps];
				}
			}
			else {
				x1 = points[i - ps];
				x2 = points[i];
			}

			y1 = points[i - ps + 1];
			y2 = points[i + 1];


			if (y1 == null || y2 == null) {
				if (this.lineareavisible) {
					if (y1 == null) {
						y1 = axisy._min;
					}
					if (y2 == null) {
						y2 = axisy._min;
					}
				}
				else {
					continue;
				}
			}


			if (y1 <= y2 && y1 < axisy._min) {
				if (y2 < axisy._min) {
					continue;
				}
				x1 = (axisy._min - y1) / (y2 - y1) * (x2 - x1) + x1;
				y1 = axisy._min;
			}
			else if (y2 <= y1 && y2 < axisy._min) {
				if (y1 < axisy._min) {
					continue;
				}
				x2 = (axisy._min - y1) / (y2 - y1) * (x2 - x1) + x1;
				y2 = axisy._min;
			}

			if (y1 >= y2 && y1 > axisy._max) {
				if (y2 > axisy._max) {
					continue;
				}
				x1 = (axisy._max - y1) / (y2 - y1) * (x2 - x1) + x1;
				y1 = axisy._max;
			}
			else if (y2 >= y1 && y2 > axisy._max) {
				if (y1 > axisy._max) {
					continue;
				}
				x2 = (axisy._max - y1) / (y2 - y1) * (x2 - x1) + x1;
				y2 = axisy._max;
			}

			if (x1 <= x2 && x1 < axisx._min) {
				if (x2 < axisx._min) {
					continue;
				}
				y1 = (axisx._min - x1) / (x2 - x1) * (y2 - y1) + y1;
				x1 = axisx._min;
			}
			else if (x2 <= x1 && x2 < axisx._min) {
				if (x1 < axisx._min) {
					continue;
				}
				y2 = (axisx._min - x1) / (x2 - x1) * (y2 - y1) + y1;
				x2 = axisx._min;
			}

			if (x1 >= x2 && x1 > axisx._max) {
				if (x2 > axisx._max) {
					continue;
				}
				y1 = (axisx._max - x1) / (x2 - x1) * (y2 - y1) + y1;
				x1 = axisx._max;
			}
			else if (x2 >= x1 && x2 > axisx._max) {
				if (x1 > axisx._max) {
					continue;
				}
				y2 = (axisx._max - x1) / (x2 - x1) * (y2 - y1) + y1;
				x2 = axisx._max;
			}
			if (this._chart._getVisibleStackGroupingLength() > 1 && this._chart._bargrouping && this._barwidth && this.barvisible) {
				if (!rotateaxis) {
					shiftPointX = this._barwidth / 2;
				}
				else {
					shiftPointY = this._barwidth / 2;
					shiftPointY = -shiftPointY;
				}
			}
			if (x1 != prevx || y1 != prevy) {
				startPointX = axisx.p2c(x1) + xoffset + shiftPointX;

				startPointY = axisy.p2c(y1) + yoffset + shiftPointY;


				if (!rotateaxis) {
					tickstartgap = axisx._tickstartgap;
					if (tickstartgap) {
						startPointX += tickstartgap;
					}
				}
				else {
					tickstartgap = axisy._tickstartgap;
					if (tickstartgap) {
						startPointY += tickstartgap;
					}
				}
				startPointY += axisy._tickendspace;

				path.moveTo(startPointX, startPointY);
			}

			prevx = x2;
			prevy = y2;


			endPointX = axisx.p2c(x2) + xoffset + shiftPointX;
			endPointY = axisy.p2c(y2) + yoffset + shiftPointY;


			if (!rotateaxis) {
				tickstartgap = axisx._tickstartgap;
				if (tickstartgap) {
					endPointX += tickstartgap;
				}
			}
			else {
				tickstartgap = axisy._tickstartgap;
				if (tickstartgap) {
					endPointY += tickstartgap;
				}
			}
			endPointY += axisy._tickendspace;
			path.lineTo(endPointX, endPointY);
		}

		if (Ishighlight) {
		}
		else {
			path._series = this;
			path.index = 0;
			path.value = -1;
			path._points = points;
			if (bCreate) {
				this._itemCnt++;
				seriesGroup.addChild(path);
			}
		}
		this._setLineAreaClip(path);
		return path;
	};

	_pChartBasicSeriesControl._drawArea = function (datapoints, axisx, axisy, lineareafillstyle, lineareaopacity) {
		var points = datapoints.points.slice(0), ps = datapoints.pointsize, bottom, i = 0, areaOpen = false, ypos = 1, xpos = 0, segmentStart = 0, segmentEnd = 0, area, tickstartgap, plength = datapoints.pointsize.length, seriesGroup = this._chart._seriesGroup, bCreate = false, effect = this._chart_aniframe_obj, rotateaxis = this._chart.rotateaxis;
		var lineareavisible = this.lineareavisible;

		if (!rotateaxis) {
			bottom = Math.min(Math.max(0, axisy._min), axisy._max);
		}
		else {
			bottom = Math.min(Math.max(0, axisx._min), axisx._max);
		}

		if (effect && effect.isloadanimation) {
			points = this._getanimationdrawvalue(points);
		}
		var seriesid = this._configIndex + " SeriesAreaItem_0";
		area = seriesGroup.getObjectByID(seriesid);
		if (!area) {
			bCreate = true;
			area = new nexacro.GraphicsPaths();
			area.set_id(this._configIndex + " SeriesAreaItem_0");
		}
		else {
			area.clear();
		}
		if (!nexacro._GraphicsLib.isEmpty(lineareaopacity)) {
			area.set_opacity(lineareaopacity);
		}
		if (this._chart._isstepline && this.linetype != "step") {
			ps += 3;
		}
		var stepend = false;
		while (true) {
			if (ps > 0 && i > points.length + ps) {
				break;
			}

			i += ps;

			var x1, y1, x2, y2;
			var nullDataFlag = false;

			if (this._chart._bargrouping && this.linetype == "step") {
				if (i % 6 == 0) {
					x1 = points[i + xpos];
					x2 = points[i + xpos];
				}
				else {
					x1 = points[i - ps + xpos];
					x2 = points[i + ps + xpos];
				}
			}
			else {
				x1 = points[i - ps + xpos];
				x2 = points[i + xpos];
			}

			y1 = points[i - ps + ypos];
			y2 = points[i + ypos];

			if (areaOpen) {
				if (ps > 0 && x1 != null && x2 == null) {
					segmentEnd = i;
					ps = -ps;
					if (!rotateaxis) {
						ypos = 2;
					}
					else {
						xpos = 2;
					}
					stepend = true;
					continue;
				}

				if (ps < 0 && i == segmentStart + ps) {
					area.set_fillstyle(lineareafillstyle);

					areaOpen = false;
					ps = -ps;
					ypos = 1;
					xpos = 0;
					i = segmentStart = segmentEnd + ps;
					continue;
				}
			}


			if (lineareavisible) {
				if (nexacro._isUndefined(y1)) {
					continue;
				}
				else if (y1 == null) {
					y1 = axisy._min;
				}

				if (nexacro._isUndefined(y2)) {
					nullDataFlag = true;
				}
				else if (y2 == null) {
					y2 = axisy._min;
				}
			}
			else {
				if (y1 == null) {
					continue;
				}

				if (y2 == null) {
					nullDataFlag = true;
				}
			}


			if (x1 <= x2 && x1 < axisx._min) {
				if (x2 < axisx._min) {
					continue;
				}
				y1 = (axisx._min - x1) / (x2 - x1) * (y2 - y1) + y1;
				x1 = axisx._min;
			}
			else if (x2 <= x1 && x2 < axisx._min) {
				if (x1 < axisx._min) {
					continue;
				}
				y2 = (axisx._min - x1) / (x2 - x1) * (y2 - y1) + y1;
				x2 = axisx._min;
			}

			if (x1 >= x2 && x1 > axisx._max) {
				if (x2 > axisx._max) {
					continue;
				}
				y1 = (axisx._max - x1) / (x2 - x1) * (y2 - y1) + y1;
				x1 = axisx._max;
			}
			else if (x2 >= x1 && x2 > axisx._max) {
				if (x1 > axisx._max) {
					continue;
				}
				y2 = (axisx._max - x1) / (x2 - x1) * (y2 - y1) + y1;
				x2 = axisx._max;
			}


			var x1Point;
			var y1Point;
			var shiftPointX = 0;
			var shiftPointY = 0;
			var isbargrouping = false;
			var startX1 = 0;
			var startX2 = 0;
			var startY1 = 0;
			var startY2 = 0;
			var stacktype = this._stacktype == "none" ? this._chart.stacktype : this._stacktype;
			if (this._chart._getVisibleStackGroupingLength() > 1 && this._chart._bargrouping && this._barwidth && this.barvisible) {
				if (!rotateaxis) {
					shiftPointX = this._barwidth / 2;
				}
				else {
					shiftPointY = this._barwidth / 2;
					shiftPointY = -shiftPointY;
				}
				x1Point = axisx.p2c(x1) + shiftPointX;
				y1Point = axisy.p2c(points[i - ps + ypos]) + shiftPointY;
				isbargrouping = true;
			}
			else {
				x1Point = axisx.p2c(x1);
				y1Point = axisy.p2c(points[i - ps + ypos]);
			}

			if (!rotateaxis) {
				tickstartgap = axisx._tickstartgap;
				if (tickstartgap) {
					x1Point += tickstartgap;
				}
			}
			else {
				tickstartgap = axisy._tickstartgap;
				if (tickstartgap) {
					y1Point += tickstartgap;
				}
			}
			y1Point += axisy._tickendspace;
			if (!areaOpen) {
				if (!rotateaxis) {
					area.moveTo(x1Point, y1Point);
				}
				else {
					area.moveTo(x1Point, y1Point);
				}
				areaOpen = true;
			}
			if (stepend) {
				stepend = false;
				if (!rotateaxis) {
					startX1 = x1Point;
					startX2 = axisx.p2c(x2) + shiftPointX;
					startY1 = y1Point;
					startY2 = axisy.p2c(y2) + shiftPointY;

					tickstartgap = axisx._tickstartgap;
					if (tickstartgap) {
						startX2 += tickstartgap;
					}
					area.lineTo(startX1, startY1 + axisy._tickendspace);

					area.lineTo(startX2, startY2 + axisy._tickendspace);
				}
				else {
					startX1 = x1Point;
					startX2 = axisx.p2c(x2) + shiftPointX;
					startY1 = y1Point;
					startY2 = axisy.p2c(y2) + shiftPointY;

					tickstartgap = axisy._tickstartgap;
					if (tickstartgap) {
						startY2 += tickstartgap;
					}
					area.lineTo(startX1, startY1 + axisy._tickendspace);

					area.lineTo(startX2, startY2 + axisy._tickendspace);
				}


				continue;
			}
			if (y1 >= axisy._max && y2 >= axisy._max) {
				startX1 = axisx.p2c(x1) + shiftPointX;
				startX2 = axisx.p2c(x2) + shiftPointX;
				startY1 = axisy.p2c(axisy._max) + shiftPointY;
				startY2 = axisy.p2c(axisy._max) + shiftPointY;
				if (!rotateaxis) {
					tickstartgap = axisx._tickstartgap;
					if (tickstartgap) {
						startX1 += tickstartgap;
						startX2 += tickstartgap;
					}
					area.lineTo(startX1, startY1 + axisy._tickendspace);
					area.lineTo(startX2, startY2 + axisy._tickendspace);
				}
				else {
					tickstartgap = axisy._tickstartgap;
					if (tickstartgap) {
						startY1 += tickstartgap;
						startY2 += tickstartgap;
					}
					area.lineTo(startX1, startY1 + axisy._tickendspace);
					area.lineTo(startX2, startY2 + axisy._tickendspace);
				}

				continue;
			}
			else if (y1 <= axisy._min && y2 <= axisy._min) {
				startX1 = axisx.p2c(x1) + shiftPointX;
				startX2 = axisx.p2c(x2) + shiftPointX;
				startY1 = axisy.p2c(axisy._min) + shiftPointY;
				startY2 = axisy.p2c(axisy._min) + shiftPointY;
				if (!rotateaxis) {
					tickstartgap = axisx._tickstartgap;
					if (tickstartgap) {
						startX1 += tickstartgap;
						startX2 += tickstartgap;
					}
					area.lineTo(startX1, startY1 + axisy._tickendspace);
					area.lineTo(startX2, startY2 + axisy._tickendspace);
				}
				else {
					tickstartgap = axisy._tickstartgap;
					if (tickstartgap) {
						startY1 += tickstartgap;
						startY2 += tickstartgap;
					}
					area.lineTo(startX1, startY1 + axisy._tickendspace);
					area.lineTo(startX2, startY2 + axisy._tickendspace);
				}

				continue;
			}

			var x1old = x1, x2old = x2;

			if (y1 <= y2 && y1 < axisy._min && y2 >= axisy._min) {
				x1 = (axisy._min - y1) / (y2 - y1) * (x2 - x1) + x1;
				y1 = axisy._min;
			}
			else if (y2 <= y1 && y2 < axisy._min && y1 >= axisy._min) {
				x2 = (axisy._min - y1) / (y2 - y1) * (x2 - x1) + x1;
				y2 = axisy._min;
			}

			if (y1 >= y2 && y1 > axisy._max && y2 <= axisy._max) {
				x1 = (axisy._max - y1) / (y2 - y1) * (x2 - x1) + x1;
				y1 = axisy._max;
			}
			else if (y2 >= y1 && y2 > axisy._max && y1 <= axisy._max) {
				x2 = (axisy._max - y1) / (y2 - y1) * (x2 - x1) + x1;
				y2 = axisy._max;
			}

			if (x1 != x1old) {
				startX1 = axisx.p2c(x1old) + shiftPointX;
				startY1 = axisy.p2c(y1) + shiftPointY;
				if (!rotateaxis) {
					tickstartgap = axisx._tickstartgap;
					if (tickstartgap) {
						startX1 += tickstartgap;
					}
				}
				else {
					tickstartgap = axisy._tickstartgap;
					if (tickstartgap) {
						startY1 += tickstartgap;
					}
				}

				area.lineTo(startX1, startY1);
			}

			area.lineTo(x1Point, y1Point);


			if (!nullDataFlag) {
				var x2Point;
				var y2Point;
				if (isbargrouping) {
					x2Point = axisx.p2c(x2) + shiftPointX;
					y2Point = axisy.p2c(y2) + shiftPointY;
				}
				else {
					x2Point = axisx.p2c(x2);
					y2Point = axisy.p2c(y2);
				}

				if (!rotateaxis) {
					tickstartgap = axisx._tickstartgap;
					if (tickstartgap) {
						x2Point += tickstartgap;
					}
				}
				else {
					tickstartgap = axisy._tickstartgap;
					if (tickstartgap) {
						y2Point += tickstartgap;
					}
				}
				y2Point += axisy._tickendspace;
				area.lineTo(x2Point, y2Point);
			}

			if (x2 != x2old) {
				if (!nullDataFlag) {
					startX1 = axisx.p2c(x2) + shiftPointX;
					startX2 = axisx.p2c(x2old) + shiftPointX;
					startY1 = axisy.p2c(y2) + shiftPointY;
					startY2 = axisy.p2c(y2) + shiftPointY;

					if (!rotateaxis) {
						tickstartgap = axisx._tickstartgap;
						if (tickstartgap) {
							startX1 += tickstartgap;
							startX2 += tickstartgap;
						}
					}
					else {
						tickstartgap = axisy._tickstartgap;
						if (tickstartgap) {
							startY1 += tickstartgap;
							startY2 += tickstartgap;
						}
					}

					area.lineTo(startX1, startY1);
					area.lineTo(startX2, startY2);
				}
			}
		}

		area._series = this;
		if (bCreate) {
			this._itemCnt++;
			this._chart._seriesGroup.addChild(area);
		}
		area.closePath();
		this._setLineAreaClip(area);
		return area;
	};

	_pChartBasicSeriesControl._drawCurveLine = function (points, linestyle, lineopacity, Ishighlight, skipmoves) {
		var yaxis = this._yaxis;
		var seriesGroup = this._chart._seriesGroup;
		var bCreate = false;
		var path;
		if (Ishighlight) {
			path = new nexacro.GraphicsPaths();
			path.set_id(this._configIndex + " SeriesHighlightCurveLineItem_0");
		}
		else {
			var seriesid = this._configIndex + " SeriesCurveLineItem_0";
			path = seriesGroup.getObjectByID(seriesid);
			if (!path) {
				bCreate = true;
				path = new nexacro.GraphicsPaths();
				path.set_id(seriesid);
			}
			else {
				path.clear();
			}
		}
		path.set_strokepen(linestyle);
		path.set_opacity(lineopacity);
		path.moveTo(points[0][0], points[0][1]);

		var plength = points.length;

		for (var i = 0; i < plength; i++) {
			var x1 = points[i][2][0], y1 = points[i][2][1], cx = points[i][2][2], cy = points[i][2][3], x2 = points[i][2][4], y2 = points[i][2][5];

			var type = points[i][3];
			var skipmove = skipmoves[i];
			if (skipmove == true) {
				if (y2 != null && x2 != null) {
					path.moveTo(x2, y2);
				}
				else {
					path.moveTo(cx, cy);
				}
			}
			else if (type == "quadraticCurveTo") {
				if (i == skipmoves.length && skipmoves[skipmoves.length - 1] == true) {
					continue;
				}

				path.quadraticCurveTo(new nexacro.Point(x1, y1), new nexacro.Point(cx, cy));
			}
			else if (type != "quadraticCurveTo" && i != (plength - 2)) {
				path.cubicCurveTo(x1, y1, cx, cy, x2, y2);
			}
		}

		if (Ishighlight) {
		}
		else {
			path._series = this;
			if (bCreate) {
				this._chart._seriesGroup.addChild(path);
				this._itemCnt++;
			}
		}
		this._setLineAreaClip(path);
		return path;
	};

	_pChartBasicSeriesControl._drawCurveArea = function (points, vpoints, lineareafillstyle, lineareaopacity) {
		var boardRect = this._chart._boardRect, borderHeight = this._chart._boardBorderHeight, boardHeight = 0, boardWidth = 0, zeroBase = 0, xaxis = this._xaxis, yaxis = this._yaxis, rotateaxis = this._chart.rotateaxis, seriesGroup = this._chart._seriesGroup, bCreate = false, i = 0, x1, y1, cx, cy, x2, y2, type, area;

		if (boardRect) {
			boardHeight = boardRect.height - borderHeight;
		}

		var plength = points.length;
		var pvlength = vpoints.length;

		var seriesid = this._configIndex + " SeriesCurveAreaItem_0";
		area = seriesGroup.getObjectByID(seriesid);
		if (!area) {
			bCreate = true;
			area = new nexacro.GraphicsPaths();
			area.set_id(seriesid);
		}
		else {
			area.clear();
		}
		area.set_fillstyle(lineareafillstyle);
		area.set_opacity(lineareaopacity);

		if (plength <= 0) {
			return area;
		}
		area.moveTo(points[0][0], points[0][1]);


		for (i = 0; i < plength; i++) {
			x1 = points[i][2][0], 
				y1 = points[i][2][1], 
				cx = points[i][2][2], 
				cy = points[i][2][3], 
				x2 = points[i][2][4], 
				y2 = points[i][2][5];

			type = points[i][3];
			if (type == "quadraticCurveTo") {
				area.quadraticCurveTo(new nexacro.Point(x1, y1), new nexacro.Point(cx, cy));
			}
			else if (type != "quadraticCurveTo" && i != (plength - 2)) {
				area.cubicCurveTo(x1, y1, cx, cy, x2, y2);
			}
		}

		if (!rotateaxis) {
			if (this._chart._isnegativedata) {
				zeroBase = yaxis.p2c(yaxis._min);
				boardHeight = zeroBase;
				boardHeight += yaxis._tickendspace;
				if (pvlength > 0) {
					boardHeight = vpoints[0][1];
				}
			}
			area.lineTo(points[plength - 1][0], boardHeight);



			for (i = 0; i < pvlength; i++) {
				x1 = vpoints[i][2][0], 
					y1 = vpoints[i][2][1], 
					cx = vpoints[i][2][2], 
					cy = vpoints[i][2][3], 
					x2 = vpoints[i][2][4], 
					y2 = vpoints[i][2][5];

				type = vpoints[i][3];
				if (type == "quadraticCurveTo") {
					area.quadraticCurveTo(new nexacro.Point(x1, y1), new nexacro.Point(cx, cy));
				}
				else if (type != "quadraticCurveTo" && i != (pvlength - 2)) {
					area.cubicCurveTo(x1, y1, cx, cy, x2, y2);
				}
			}
			if (this._chart._isnegativedata) {
				if (pvlength > 0) {
					boardHeight = vpoints[pvlength - 1][1];
				}
			}
			area.lineTo(points[0][0], boardHeight);
		}
		else {
			if (this._chart._isnegativedata) {
				zeroBase = xaxis.p2c(xaxis._min);
				boardWidth = zeroBase;
				if (pvlength > 0) {
					boardWidth = vpoints[0][1];
					if (pvlength > 0) {
						boardWidth = vpoints[0][0];
					}
				}
			}

			area.lineTo(boardWidth, points[plength - 1][1]);

			for (i = 0; i < pvlength; i++) {
				x1 = vpoints[i][2][0], 
					y1 = vpoints[i][2][1], 
					cx = vpoints[i][2][2], 
					cy = vpoints[i][2][3], 
					x2 = vpoints[i][2][4], 
					y2 = vpoints[i][2][5];

				type = vpoints[i][3];
				if (type == "quadraticCurveTo") {
					area.quadraticCurveTo(new nexacro.Point(x1, y1), new nexacro.Point(cx, cy));
				}
				else if (type != "quadraticCurveTo" && i != (pvlength - 2)) {
					area.cubicCurveTo(x1, y1, cx, cy, x2, y2);
				}
			}


			if (this._chart._isnegativedata) {
				if (pvlength > 0) {
					boardWidth = vpoints[pvlength - 1][0];
				}
			}
			area.lineTo(boardWidth, points[0][1]);
		}
		area.closePath();

		area._series = this;
		if (bCreate) {
			this._chart._seriesGroup.addChild(area);
			this._itemCnt++;
		}
		this._setLineAreaClip(area);
		return area;
	};

	_pChartBasicSeriesControl._drawBarItemText = function (left, right, bottom, top, width, height, item) {
		var seriesGroup = this._chart._seriesGroup;
		var itemText = this._createSeriesItemText(item);
		var textRect = null, textWidth = 0, textHeight = 0, textLeft = 0, textTop = 0, borderwidth = this._barborderwidth, rotateaxis = this._chart.rotateaxis, itemtextPosition = this.baritemtextposition, itemtextGap = this.baritemtextgap;
		function positionstart (itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis) {
			var textTop = 0;
			var textLeft = 0;
			textRect = itemText._getRect();
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			if (textRect) {
				textWidth = textRect.width;
				textHeight = textRect.height;
			}
			if (rotateaxis) {
				itemText.set_verticalAlign("middle");
				itemText.set_textAlign("left");
				textTop = top + (height / 2);
				textLeft = left + itemtextGap;
			}
			else {
				itemText.set_verticalAlign("bottom");
				itemText.set_textAlign("center");
				textLeft = left + (width / 2);
				textTop = bottom - itemtextGap;
			}

			itemText.set_x(textLeft);
			itemText.set_y(textTop);
		}
		function positionmiddle (itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis) {
			itemText.set_verticalAlign("middle");
			itemText.set_textAlign("center");
			var textTop = 0;
			var textLeft = 0;
			textRect = itemText._getRect();
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			if (textRect) {
				textWidth = textRect.width;
				textHeight = textRect.height;
			}
			if (rotateaxis) {
				textTop = top + (height / 2);
				textLeft = left + (width / 2) + itemtextGap;
			}
			else {
				textLeft = left + (width / 2);
				textTop = top + (height / 2) - itemtextGap;
			}

			itemText.set_x(textLeft);
			itemText.set_y(textTop);
		}
		function positionend (itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis) {
			var textTop = 0;
			var textLeft = 0;
			textRect = itemText._getRect();
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			if (textRect) {
				textWidth = textRect.width;
				textHeight = textRect.height;
			}
			if (rotateaxis) {
				itemText.set_verticalAlign("middle");
				itemText.set_textAlign("right");
				textTop = top + (height / 2);
				textLeft = right - itemtextGap;
			}
			else {
				itemText.set_verticalAlign("top");
				itemText.set_textAlign("center");
				textLeft = left + (width / 2);
				textTop = top + itemtextGap;
			}

			itemText.set_x(textLeft);
			itemText.set_y(textTop);
		}
		function positionoutside (itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis) {
			var textTop = 0;
			var textLeft = 0;
			textRect = itemText._getRect();
			if (!itemtextGap) {
				itemtextGap = 0;
			}
			if (textRect) {
				textWidth = textRect.width;
				textHeight = textRect.height;
			}
			if (rotateaxis) {
				itemText.set_verticalAlign("middle");
				itemText.set_textAlign("left");
				textTop = top + (height / 2);
				textLeft = right + itemtextGap;
			}
			else {
				itemText.set_verticalAlign("bottom");
				itemText.set_textAlign("center");
				textLeft = left + (width / 2);
				textTop = top - itemtextGap;
			}

			itemText.set_x(textLeft);
			itemText.set_y(textTop);
		}
		if (!nexacro._isNull(itemText)) {
			if (itemtextPosition) {
				switch (itemtextPosition) {
					case "start":
						{

							positionstart(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
						}
						break;
					case "middle":
						{

							positionmiddle(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
						}
						break;
					case "end":
						{

							positionend(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
						}
						break;
					case "outside":
						{

							positionoutside(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
						}
						break;
					default:
						positionmiddle(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
						break;
				}
			}
			else {
				positionmiddle(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
			}

			this._chart._setChangeInBoardAreaPos(itemText);
			seriesGroup.addChild(itemText);
			itemText._series = this;
		}
	};

	_pChartBasicSeriesControl._drawPointItemText = function (cx, cy, item) {
		var seriesGroup = this._chart._seriesGroup;
		var itemText = this._createSeriesItemText(item);
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
			var textRect = null, textWidth = 0, textHeight = 0, textLeft = 0, textTop = 0, radius = item.radius, width = this._pointborderwidth, itemtextPosition = this.pointitemtextposition, itemtextGap = this.pointitemtextgap;


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

	_pChartBasicSeriesControl._drawLineItemText = function (datapoints, axisx, axisy, item) {
		var points = datapoints.points, ps = datapoints.pointsize;
		var itemtextPosition = this.lineitemtextposition, itemtextGap = this.lineitemtextgap;
		var rotateaxis = this._chart.rotateaxis;
		var tickstartgap;
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
		if (this._chart._isstepline && this.linetype != "step") {
			ps += 3;
		}
		for (var i = 0; i < points.length; i += ps) {
			var itemindex = points[i], preitemindex = points[i + ps], value = points[i + 1], point = [], linetype = this.linetype, itemText;

			if (linetype == "step" && itemindex == preitemindex) {
				continue;
			}
			if (!rotateaxis) {
				item.index = itemindex;
				item.value = value;
			}
			else {
				item.index = value;
				item.value = itemindex;
			}
			itemText = this._createSeriesItemText(item);
			if (!nexacro._isNull(itemText)) {
				var textRect = null, textWidth = 0, textHeight = 0, textLeft = 0, textTop = 0, cx = 0, cy = 0, width = this._lineborderwidth, seriesGroup = this._chart._seriesGroup;

				cx = axisx.p2c(itemindex);
				cy = axisy.p2c(value);
				var clipcx = cx;
				var clipcy = cy;
				var shiftPointX = 0;
				var shiftPointY = 0;
				if (this._chart._getVisibleStackGroupingLength() > 1 && this._chart._bargrouping && this._barwidth && this.barvisible) {
					if (!rotateaxis) {
						shiftPointX = this._barwidth / 2;
					}
					else {
						shiftPointY = this._barwidth / 2;
						shiftPointY = -shiftPointY;
					}
				}
				cx = cx + shiftPointX;
				cy = cy + shiftPointY;

				if (!rotateaxis) {
					tickstartgap = axisx._tickstartgap;
					if (tickstartgap) {
						cx += tickstartgap;
					}
				}
				else {
					tickstartgap = axisy._tickstartgap;
					if (tickstartgap) {
						cy += tickstartgap;
					}
				}
				cy += axisy._tickendspace;

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

	_pChartBasicSeriesControl._showBarHighlight = function (item) {
		if (!this.highlightbarvisible) {
			return;
		}

		var barHighlight = item._barHighlight;
		if (!barHighlight) {
			var points = item._points, index = item.index, highlightbarlinestyle = this.highlightbarlinestyle || "1px solid " + this._highlightcolor, highlightbarfillstyle = this.highlightbarfillstyle || this._highlightcolor, highlightbaropacity = this.highlightbaropacity, barLeft, barRight, barwidth = this._barsize || this._chart._barsize, stacktype = this._stacktype == "none" ? this._chart.stacktype : this._stacktype;

			if (this._chart.seriesset.length > 1 && this._chart._bargrouping && this._groupbarwidth != null) {
				this._barsize = this._chart._toGroupBarWidth(this._groupbarwidth);
				barwidth = this._barsize;
			}
			else if (this._chart.seriesset.length > 1 && this._chart._bargrouping && this._groupbarwidth == null) {
				barwidth = this._chart._barsize;
			}
			else {
				this.on_apply_barsize(this.barsize);

				barwidth = this._barsize || this._chart._barsize;
			}
			barwidth = this._chart._getcheckTimeAxisBarWidth(barwidth);
			switch (this._baralign) {
				case "left":
					barLeft = 0;
					break;
				case "right":
					barLeft = -barwidth;
					break;
				default:
					barLeft = -barwidth / 2;
			}

			barRight = barLeft + barwidth;

			this._drawBar(points[0], points[1], points[2], barLeft, barRight, this._xaxis, this._yaxis, highlightbarlinestyle, highlightbarfillstyle, highlightbaropacity, index, item);
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, false);
			this._chart._graphicsControl.draw();
		}
	};

	_pChartBasicSeriesControl._hideBarHighlight = function (item) {
		if (!this.highlightbarvisible) {
			return;
		}

		var barHighlight = item._barHighlight;
		if (barHighlight && !nexacro._GraphicsLib.isEmpty(barHighlight.parent)) {
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, true);
			this._chart._highlightGroup.removeChild(barHighlight);
			delete item._barHighlight;

			this._chart._graphicsControl.draw();
		}
	};

	_pChartBasicSeriesControl._showPointHighlight = function (item) {
		if (!this.highlightpointvisible) {
			return;
		}

		var pointHighlight = item._pointHighlight;
		if (!pointHighlight) {
			var points = item._points, index = item.index, highlightpointlinestyle = this.highlightpointlinestyle || "1px solid " + this._highlightcolor, highlightpointfillstyle = this.highlightpointfillstyle || this._highlightcolor, highlightpointopacity = this.highlightpointopacity, highlightpointsize = this.highlightpointsize, highlightGroup = this._chart._highlightGroup;

			if ((highlightpointsize == "" || highlightpointsize == undefined) && highlightpointsize !== 0) {
				highlightpointsize = 15;
			}

			if (!points) {
				return false;
			}

			this._drawPoint(points[0], points[1], highlightpointsize, this._xaxis, this._yaxis, this.pointshape, this._pointshape, highlightpointlinestyle, highlightpointfillstyle, highlightpointopacity, index, item);
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, false);
			this._chart._graphicsControl.draw();
		}
	};

	_pChartBasicSeriesControl._hidePointHighlight = function (item) {
		if (!this.highlightpointvisible) {
			return;
		}

		var pointHighlight = item._pointHighlight;
		if (pointHighlight && !nexacro._GraphicsLib.isEmpty(pointHighlight.parent)) {
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, true);
			this._chart._highlightGroup.removeChild(pointHighlight);
			delete item._pointHighlight;

			this._chart._graphicsControl.draw();
		}
	};

	_pChartBasicSeriesControl._showLineHighlight = function (item) {
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

	_pChartBasicSeriesControl._hideLineHighlight = function (item) {
		if (!this.highlightlinevisible) {
			return;
		}

		var lineHighlight = item._lineHighlight;
		if (lineHighlight && !nexacro._GraphicsLib.isEmpty(lineHighlight.parent)) {
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, true);
			this._chart._highlightGroup.removeChild(lineHighlight);
			delete item._lineHighlight;

			this._chart._graphicsControl.draw();
		}
	};

	_pChartBasicSeriesControl._drawLineHighlight = function (item) {
		var highlightlinestyle = this.highlightlinestyle || "1px solid " + this._highlightcolor, linetype = this.linetype, highlightlineopacity = this.highlightlineopacity, datapoints = this._datapoints, xaxis = this._xaxis, yaxis = this._yaxis, path, highlightGroup = this._chart._highlightGroup, index = 0, line = [], shiftPointX = 0, shiftPointY = 0, startPointX, startPointY, endPointX, endPointY, rotateaxis = this._chart.rotateaxis, tickstartgap, stacktype = this.stacktype == "none" ? this._chart.stacktype : this.stacktype;
		var categoryaxis;
		var valueaxis;

		function addCurveLine (type, points, cpoints) {
			if (type === void 0 || (type !== 'cubic' && type !== 'quadratic')) {
				type = 'quadratic';
			}

			type = type + 'CurveTo';

			if (line.length == 0) {
				line.push([points[0], points[1], cpoints.concat(points.slice(2)), type]);
			}
			else if (type == "quadraticCurveTo" && points.length == 2) {
				cpoints = cpoints.slice(0, 2).concat(points);
				line.push([points[0], points[1], cpoints, type]);
			}
			else {
				line.push([points[2], points[3], cpoints.concat(points.slice(2)), type]);
			}
		}

		function getControlPoints (x0, y0, x1, y1, x2, y2, tension) {
			var pow = Math.pow, sqrt = Math.sqrt, d01, d12, fa, fb, p1x, p1y, p2x, p2y;

			d01 = sqrt(pow(x1 - x0, 2) + pow(y1 - y0, 2));
			d12 = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));

			fa = tension * d01 / (d01 + d12);
			fb = tension - fa;

			p1x = x1 + fa * (x0 - x2);
			p1y = y1 + fa * (y0 - y2);

			p2x = x1 - fb * (x0 - x2);
			p2y = y1 - fb * (y0 - y2);

			return [p1x, p1y, p2x, p2y];
		}
		if (this.linetype == "curve") {
			var cp = [], tension = 0.4, idx, prevx = null, prevy = null, x1, x2, y1, y2, ps = datapoints.pointsize, points = datapoints.points, len = points.length, pts = [];
			var lineareavisible = this.this.lineareavisible, skipmoves = [], skipindex = 0;



			if (this._chart._isstepline && linetype != "step") {
				ps += 3;
			}
			for (idx = 0; idx < len; idx += ps) {
				x1 = points[idx - ps], 
					y1 = points[idx - ps + 1], 
					x2 = points[idx], 
					y2 = points[idx + 1];
				var skipmove = false;

				if (y1 == null || y2 == null) {
					if (x1 != null || x1 != null) {
						if (lineareavisible) {
							if (y1 == null) {
								y1 = yaxis._min;
							}
							if (y2 == null) {
								y2 = yaxis._min;
							}
						}
						else {
							if (y1 == null) {
								y1 = yaxis._min;
								skipmove = true;
								skipmoves[skipindex - 1] = skipmove;
							}
							if (y2 == null) {
								y2 = yaxis._min;
								skipmove = true;
								skipmoves[skipindex - 1] = skipmove;
							}
						}
					}
				}


				if (!skipmove) {
					skipmoves.push(skipmove);
				}
				skipindex++;

				if (y1 <= y2 && y1 < yaxis._min) {
					if (y2 < yaxis._min) {
						continue;
					}
					x1 = (yaxis._min - y1) / (y2 - y1) * (x2 - x1) + x1;
					y1 = yaxis._min;
				}
				else if (y2 <= y1 && y2 < yaxis._min) {
					if (y1 < yaxis._min) {
						continue;
					}
					x2 = (yaxis._min - y1) / (y2 - y1) * (x2 - x1) + x1;
					y2 = yaxis._min;
				}

				if (y1 >= y2 && y1 > yaxis._max) {
					if (y2 > yaxis._max) {
						continue;
					}
					x1 = (yaxis._max - y1) / (y2 - y1) * (x2 - x1) + x1;
					y1 = yaxis._max;
				}
				else if (y2 >= y1 && y2 > yaxis._max) {
					if (y1 > yaxis._max) {
						continue;
					}
					x2 = (yaxis._max - y1) / (y2 - y1) * (x2 - x1) + x1;
					y2 = yaxis._max;
				}


				if (x1 <= x2 && x1 < xaxis._min) {
					if (x2 < xaxis._min) {
						continue;
					}
					y1 = (xaxis._min - x1) / (x2 - x1) * (y2 - y1) + y1;
					x1 = xaxis._min;
				}
				else if (x2 <= x1 && x2 < xaxis._min) {
					if (x1 < xaxis._min) {
						continue;
					}
					y2 = (xaxis._min - x1) / (x2 - x1) * (y2 - y1) + y1;
					x2 = xaxis._min;
				}

				if (x1 >= x2 && x1 > xaxis._max) {
					if (x2 > xaxis._max) {
						continue;
					}
					y1 = (xaxis._max - x1) / (x2 - x1) * (y2 - y1) + y1;
					x1 = xaxis._max;
				}
				else if (x2 >= x1 && x2 > xaxis._max) {
					if (x1 > xaxis._max) {
						continue;
					}
					y2 = (xaxis._max - x1) / (x2 - x1) * (y2 - y1) + y1;
					x2 = xaxis._max;
				}
				if (this._chart._getVisibleStackGroupingLength() > 1 && this._chart._bargrouping && this._barwidth && this.barvisible) {
					if (!rotateaxis) {
						shiftPointX = this._barwidth / 2;
					}
					else {
						shiftPointY = this._barwidth / 2;
						shiftPointY = -shiftPointY;
					}
				}
				if (x1 != prevx || y1 != prevy) {
					if (this._chart._getVisibleStackGroupingLength() > 1 && this._chart._bargrouping && this._barwidth) {
						startPointX = xaxis.p2c(x1) + shiftPointX;
						startPointY = yaxis.p2c(y1) + shiftPointY;
					}
					else {
						startPointX = xaxis.p2c(x1);
						startPointY = yaxis.p2c(y1);
					}

					if (!rotateaxis) {
						tickstartgap = xaxis._tickstartgap;
						if (tickstartgap) {
							startPointX += tickstartgap;
						}
					}
					else {
						tickstartgap = yaxis._tickstartgap;
						if (tickstartgap) {
							startPointY += tickstartgap;
						}
					}
					pts.push(startPointX, startPointY + yaxis._tickendspace);
				}

				prevx = x2;
				prevy = y2;

				if (x2 <= 0 || y2 <= 0) {
					this._chart._isnegativedata = true;
				}

				if (this._chart._getVisibleStackGroupingLength() > 1 && this._chart._bargrouping && this._barwidth) {
					endPointX = xaxis.p2c(x2) + shiftPointX;
					endPointY = yaxis.p2c(y2) + shiftPointY;
				}
				else {
					endPointX = xaxis.p2c(x2);
					endPointY = yaxis.p2c(y2);
				}

				if (!rotateaxis) {
					tickstartgap = xaxis._tickstartgap;
					if (tickstartgap) {
						endPointX += tickstartgap;
					}
				}
				else {
					tickstartgap = yaxis._tickstartgap;
					if (tickstartgap) {
						endPointY += tickstartgap;
					}
				}
				pts.push(endPointX, endPointY + yaxis._tickendspace);
			}

			len = pts.length;

			for (idx = 0; idx < len - 2; idx += 2) {
				cp = cp.concat(getControlPoints.apply(this, pts.slice(idx, idx + 6).concat([tension])));
			}


			addCurveLine('quadratic', pts.slice(0, 4), cp.slice(0, 2));

			for (idx = 2; idx < len - 3; idx += 2) {
				addCurveLine('cubic', pts.slice(idx, idx + 4), cp.slice(2 * idx - 2, 2 * idx + 2));
			}

			addCurveLine('quadratic', pts.slice(len - 2, len), [cp[2 * len - 10], cp[2 * len - 9], pts[len - 4], pts[len - 3]]);
			path = this._drawCurveLine(line, highlightlinestyle, highlightlineopacity, true, skipmoves);



			highlightGroup.addChild(path);

			item._lineHighlight = path;
			path._item = item;
			path._series = this;
		}
		else {
			highlightlinestyle = this.highlightlinestyle || "1px solid " + this._highlightcolor, 
				linetype = this.linetype, 
				highlightlineopacity = this.highlightlineopacity, 
				datapoints = this._datapoints, 
				categoryaxis = this._xaxis, 
				valueaxis = this._yaxis, 
				path, 
				highlightGroup = this._chart._highlightGroup;

			path = this._drawLine(datapoints, 0, 0, categoryaxis, valueaxis, highlightlinestyle, highlightlineopacity, true);
			highlightGroup.addChild(path);

			item._lineHighlight = path;
			path._item = item;
			path._series = this;
		}
	};

	_pChartBasicSeriesControl._findMatchingSeries = function (stacktype) {
		var res = null, allseries, preSeriesStackType;
		var stackobject = this._chart._getVisibleStackGroupObject(this);
		allseries = stackobject._list;
		for (var i = 0; i < allseries.length; ++i) {
			if (this == allseries[i]) {
				break;
			}

			res = allseries[i];
		}
		return res;
	};

	_pChartBasicSeriesControl._setStackDatapoints = function () {
		var datapoints = this._datapoints, stacktype, other;

		stacktype = this._stacktype == "none" ? this._chart.stacktype : this._stacktype;
		other = this._findMatchingSeries(stacktype);

		if (!other) {
			return;
		}

		var ps = datapoints.pointsize, points = datapoints.points, otherps = other._datapoints.pointsize, otherpoints = other._datapoints.points, newpoints = [], px, py, intery, qx, qy, bottom, withlines = this.linevisible, rotateaxis = this._chart.rotateaxis, withbottom = ps > 2 && (rotateaxis ? datapoints.format[2].x : datapoints.format[2].y), withsteps = (withlines && this.linetype == "step") || this._chart._isstepline, fromgap = true, keyOffset = rotateaxis ? 1 : 0, accumulateOffset = rotateaxis ? 0 : 1, i = 0, j = 0, l, m;

		while (true) {
			if (i >= points.length) {
				break;
			}

			l = newpoints.length;

			if (points[i] == null) {
				for (m = 0; m < ps; ++m) {
					newpoints.push(points[i + m]);
				}
				i += ps;
			}
			else if (j >= otherpoints.length) {
				for (m = 0; m < ps; ++m) {
					newpoints.push(points[i + m]);
				}
				i += ps;
			}
			else if (otherpoints[j] == null) {
				for (m = 0; m < ps; ++m) {
					newpoints.push(null);
				}
				fromgap = true;
				j += otherps;
			}
			else {
				px = points[i + keyOffset];
				py = points[i + accumulateOffset];
				qx = otherpoints[j + keyOffset];
				qy = otherpoints[j + accumulateOffset];
				bottom = 0;

				if (px == qx) {
					for (m = 0; m < ps; ++m) {
						newpoints.push(points[i + m]);
					}

					newpoints[l + accumulateOffset] += qy;
					bottom = qy;

					i += ps;
					j += otherps;
				}
				else if (px > qx) {
					if (withlines && i > 0 && points[i - ps] != null) {
						intery = py + (points[i - ps + accumulateOffset] - py) * (qx - px) / (points[i - ps + keyOffset] - px);
						newpoints.push(qx);
						newpoints.push(intery + qy);
						for (m = 2; m < ps; ++m) {
							newpoints.push(points[i + m]);
						}
						bottom = qy;
					}

					j += otherps;
				}
				else {
					if (fromgap && withlines) {
						i += ps;
						continue;
					}

					for (m = 0; m < ps; ++m) {
						newpoints.push(points[i + m]);
					}

					if (withlines && j > 0 && otherpoints[j - otherps] != null) {
						bottom = qy + (otherpoints[j - otherps + accumulateOffset] - qy) * (px - qx) / (otherpoints[j - otherps + keyOffset] - qx);
					}

					newpoints[l + accumulateOffset] += bottom;

					i += ps;
				}

				fromgap = false;

				if (l != newpoints.length && withbottom) {
					newpoints[l + 2] += bottom;
				}
			}

			if (withsteps && l != newpoints.length && l > 0 && newpoints[l] != null && newpoints[l] != newpoints[l - ps] && newpoints[l + 1] != newpoints[l - ps + 1]) {
				for (m = 0; m < ps; ++m) {
					newpoints[l + ps + m] = newpoints[l + m];
				}
				newpoints[l + 1] = newpoints[l - ps + 1];
			}
		}
		datapoints.points = newpoints;
	};

	_pChartBasicSeriesControl._setStackPercentDatapoints = function () {
		var chart = this._chart, newPoints = [], keyIdx = 0, withlines = this.linevisible, withsteps = (withlines && this.linetype == "step") || this._chart._isstepline, valueIdx = 1;

		if (chart.rotateaxis && !this._chart._isCompositeSeries) {
			keyIdx = 1;
			valueIdx = 0;
		}

		var datapoints = this._datapoints, stackPercentSums = {
		}, stackPercentBases = {
		}, pIdx = 0, vIdx = 0, dVal = 0;
		var ps = datapoints.pointsize;
		var stackobject = chart._getVisibleStackGroupObject(this);
		stackPercentSums = stackobject._stackPercentSums;
		stackPercentBases = stackobject._stackPercentBases;

		if (withsteps) {
			ps += 3;
		}

		for (var i = 0; i < datapoints.points.length; i += ps) {
			pIdx = i + keyIdx;
			vIdx = i + valueIdx;
			dVal = datapoints.points[pIdx];

			if (!stackPercentBases[dVal]) {
				stackPercentBases[dVal] = 0;
			}

			newPoints[pIdx] = dVal;
			newPoints[vIdx] = datapoints.points[vIdx] + stackPercentBases[dVal];
			newPoints[i + 2] = stackPercentBases[dVal];
			stackPercentBases[dVal] += datapoints.points[vIdx];

			if (stackPercentSums[newPoints[pIdx]] > 0) {
				var val1 = newPoints[vIdx] * 100 / stackPercentSums[newPoints[pIdx]];
				var val2 = newPoints[i + 2] * 100 / stackPercentSums[newPoints[pIdx]];
				newPoints[vIdx] = val1;
				newPoints[i + 2] = val2;
				if (withsteps && datapoints.points.length > (vIdx + 3) && datapoints.points.length > (i + 2 + 3)) {
					newPoints[pIdx + 3] = dVal + 1;
					newPoints[vIdx + 3] = val1;
					newPoints[i + 2 + 3] = val2;
				}
			}
			else {
				newPoints[vIdx] = 0;
				newPoints[i + 2] = 0;
				if (withsteps && datapoints.points.length > (vIdx + 3) && datapoints.points.length > (i + 2 + 3)) {
					newPoints[pIdx + 3] = dVal + 1;
					newPoints[vIdx + 3] = 0;
					newPoints[i + 2 + 3] = 0;
				}
			}
		}

		datapoints.points = newPoints;
	};

	_pChartBasicSeriesControl._setColor = function (colorset) {
		this._color = colorset;
		this._changedSeriesColor = true;

		var changedColorset = this._chart._changedColorset;
		if (changedColorset) {
			var barvisible = this.barvisible, pointvisible = this.pointvisible, linevisible = this.linevisible, lineareavisible = this.lineareavisible, barlinestyle, barfillstyle, linestyle, lineareafillstyle, pointlinestyle, pointfillstyle;
			var width, style, color;
			if (barvisible) {
				if (this._barlinestyle) {
					width = this._barlinestyle.width;
					style = this._barlinestyle.style;
					color = this._barlinestyle.color;

					barlinestyle = width + " " + style + " " + color;
					this.set_barlinestyle(barlinestyle);
				}
				else {
					barlinestyle = "1px solid " + colorset;
					this._applyPropertySeries("Bar", "barlinestyle", barlinestyle);
				}

				if (this._barfillstyle) {
					barfillstyle = this._barfillstyle;
					this.set_barfillstyle(barfillstyle);
				}
				else {
					barfillstyle = colorset;
					this._applyPropertySeries("Bar", "barfillstyle", barfillstyle);
				}
			}

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

	_pChartBasicSeriesControl._afterSetProperties = function () {
		var legend = this._chart.legend;
		if (legend) {
			this._chart._applyLegendItem();
		}
	};

	delete _pChartBasicSeriesControl;
}
