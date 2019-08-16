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

if (!nexacro._ChartBase) {
	nexacro.ChartClickEventInfo = function (obj, id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, seriesindex, itemindex, value) {
		nexacro.ClickEventInfo.call(this, obj, id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

		this.fromobject = obj;
		this.fromreferenceobject = from_refer_comp;
		this.seriesindex = seriesindex;
		this.itemindex = itemindex;
		this.value = value;
	};

	var _pChartClickEventInfo = nexacro._createPrototype(nexacro.ClickEventInfo, nexacro.ChartClickEventInfo);
	nexacro.ChartClickEventInfo.prototype = _pChartClickEventInfo;
	_pChartClickEventInfo._type_name = "ChartClickEventInfo";
	delete _pChartClickEventInfo;

	nexacro.ChartMouseEventInfo = function (obj, id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, seriesindex, itemindex, value) {
		nexacro.MouseEventInfo.call(this, obj, id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

		this.fromobject = obj;
		this.fromreferenceobject = from_refer_comp;
		this.seriesindex = seriesindex;
		this.itemindex = itemindex;
		this.value = value;
	};

	var _pChatMouseEventInfo = nexacro._createPrototype(nexacro.MouseEventInfo, nexacro.ChartMouseEventInfo);
	nexacro.ChartMouseEventInfo.prototype = _pChatMouseEventInfo;
	_pChatMouseEventInfo._type_name = "ChartMouseEventInfo";
	delete _pChatMouseEventInfo;

	nexacro.ChartDragEventInfo = function (obj, id, dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, seriesindex, itemindex, value) {
		nexacro.DragEventInfo.call(this, obj, id, dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, null, null, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

		this.fromobject = obj;
		this.fromreferenceobject = from_refer_comp;
		this.seriesindex = seriesindex;
		this.itemindex = itemindex;
		this.value = value;
	};

	var _pChartDragEventInfo = nexacro._createPrototype(nexacro.DragEventInfo, nexacro.ChartDragEventInfo);
	nexacro.ChartDragEventInfo.prototype = _pChartDragEventInfo;
	_pChartDragEventInfo._type_name = "ChartDragEventInfo";
	delete _pChartDragEventInfo;

	nexacro.ChartRangeZoomEventInfo = function (obj, id, from_comp, from_refer_comp, startaxisvalue, endaxisvalue, startaxisvalue2, endaxisvalue2) {
		this.id = this.eventid = id || "onrangezoomed";
		this.fromobject = obj;
		this.fromreferenceobject = from_refer_comp;
		this.startaxisvalue = startaxisvalue;
		this.endaxisvalue = endaxisvalue;
		this.startaxisvalue2 = startaxisvalue2;
		this.endaxisvalue2 = endaxisvalue2;
	};

	var _pChartRangeZoomEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ChartRangeZoomEventInfo);
	nexacro.ChartRangeZoomEventInfo.prototype = _pChartRangeZoomEventInfo;
	_pChartRangeZoomEventInfo._type_name = "ChartRangeZoomEventInfo";
	delete _pChartRangeZoomEventInfo;
	nexacro._ChartBase = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this._colorCategory = nexacro._ChartColorset.getColorCategory();

		this._maskstringtypeobj = new nexacro._EditMaskTypeString();
		this._masknumbertypeobj = new nexacro._EditMaskTypeNumber();
		this._maskdatetypeobj = new nexacro._EditMaskTypeDate();
		this._is_locale_control = true;
		this.seriesset = [];

		this._landmarktext;
	};

	var _pChartBase = nexacro._createPrototype(nexacro.Component, nexacro._ChartBase);
	nexacro._ChartBase.prototype = _pChartBase;
	_pChartBase._type_name = "ChartBase";


	_pChartBase.board = null;
	_pChartBase.title = null;
	_pChartBase.legend = null;
	_pChartBase.seriesset = null;
	_pChartBase.tooltip = null;


	_pChartBase.binddataset = "";
	_pChartBase.boardspacing = "";
	_pChartBase.colorset = "";
	_pChartBase.contents = null;
	_pChartBase.legendspacing = "";
	_pChartBase.locale = "";
	_pChartBase.titlespacing = "";


	_pChartBase._createdOrder = ["board", "categoryaxis", "seriesset", "valueaxes", "title", "indicator", "legend", "crosshair", "hrangebar", "vrangebar", "selection", "tooltip"
	];

	_pChartBase._locale = "";
	_pChartBase._dataMap = null;
	_pChartBase._binddataset = null;
	_pChartBase._colorset = "color10";
	_pChartBase._highlightcolorset = null;
	_pChartBase._selectcolorset = null;

	_pChartBase._colorCategory = null;
	_pChartBase._graphicsControl = null;

	_pChartBase._seriesGroup = null;
	_pChartBase._highlightGroup = null;

	_pChartBase._boardRect = null;
	_pChartBase._boardRectLeft = 0;
	_pChartBase._boardRectTop = 0;
	_pChartBase._nullspacing = {
		"left" : 0, 
		"right" : 0, 
		"top" : 0, 
		"bottom" : 0
	};
	_pChartBase._titlespacing = null;

	_pChartBase._legendspacing = null;
	_pChartBase._boardspacing = null;

	_pChartBase._changedData = false;
	_pChartBase._loadanimation = false;
	_pChartBase._runanimation = false;
	_pChartBase._changedColorset = false;
	_pChartBase._recreate = true;


	_pChartBase._boardBorderSize = {
		"left" : 0, 
		"top" : 0, 
		"right" : 0, 
		"bottom" : 0
	};
	_pChartBase._boardBorderWidth = 0;
	_pChartBase._boardBorderHeight = 0;

	_pChartBase._reset = false;
	_pChartBase._overSeriesItem = null;
	_pChartBase._isApplyContents = false;
	_pChartBase._rearrange = true;
	_pChartBase._firstredraw = false;
	_pChartBase._rowposition = 0;

	_pChartBase._chartxtickspace = 0;
	_pChartBase._chartytickspace = 0;
	_pChartBase._prelbuttondownrefobj = null;
	_pChartBase._aniframe_mouse_move_action = null;
	_pChartBase._aniframe_mouse_leave_action = null;
	_pChartBase.tooltiptext = "";
	_pChartBase.enableanimation = false;
	_pChartBase._isanimationloading = false;
	_pChartBase.duration = 1000;
	_pChartBase._duration = 1000;
	_pChartBase._ani_exception = false;
	_pChartBase.framelate = "normal";


	_pChartBase._event_list = {
		"onclick" : 1, 
		"ondblclick" : 1, 
		"onkillfocus" : 1, 
		"onsetfocus" : 1, 
		"onlbuttondown" : 1, 
		"onlbuttonup" : 1, 
		"onrbuttondown" : 1, 
		"onrbuttonup" : 1, 
		"onmouseenter" : 1, 
		"onmouseleave" : 1, 
		"onmousemove" : 1, 
		"ondrag" : 1, 
		"ondragenter" : 1, 
		"ondragleave" : 1, 
		"ondragmove" : 1, 
		"ondrop" : 1, 
		"onmove" : 1, 
		"onsize" : 1, 
		"onmouseup" : 1, 
		"onmousedown" : 1, 
		"oncontextmenu" : 1, 
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"onseriesclick" : 1, 
		"onaxisclick" : 1, 
		"onlegendclick" : 1, 
		"ontitleclick" : 1, 
		"onboardclick" : 1, 
		"onhrangebarclick" : 1, 
		"onvrangebarclick" : 1, 
		"oncrosshairclick" : 1, 
		"onselectionclick" : 1, 
		"onrangezoomed" : 1
	};



	_pChartBase.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (!this._graphicsControl) {
				this._graphicsControl = new nexacro.GraphicsControl("GraphicsControl", 0, 0, control_elem.client_width, control_elem.client_height, null, null, null, null, null, null, this);
			}
			this._graphicsControl.createComponent();
		}
	};

	_pChartBase.on_created_contents = function (win) {
		this._setEventHandlerToGraphicsControl();
		this._graphicsControl.on_created(win);



		this.on_apply_colorset(this._colorset);
		var control_elem = this.getElement();

		if (this._arrange_info == null) {
			if (control_elem && this._is_created_contents && (control_elem.client_width > 0 && control_elem.client_height > 0)) {
				this.on_apply_contents();
				this._changedData = true;
				this._draw();
			}
			else {
				this._firstredraw = true;
			}
		}
		else {
			if (control_elem && this._is_created_contents && (control_elem.client_width > 0 && control_elem.client_height > 0)) {
				this._graphicsControl.resize(control_elem.client_width, control_elem.client_height);

				this.on_apply_contents();
				this._changedData = true;
				this._draw();
			}
			else {
				this._firstredraw = true;
			}
		}
	};

	_pChartBase.on_create_contents_command = function () {
		this.on_apply_colorset(this._colorset);

		return "";
	};

	_pChartBase.on_attach_contents_handle = _pChartBase.on_created_contents;

	_pChartBase.on_destroy_contents = function () {
		this._destroySubControl();

		if (this.tooltip) {
			this.tooltip.destroy();
			this.tooltip = null;
		}

		this._removeDatasetEventHandlers(this._binddataset);

		this._colorCategory = null;
		this._maskstringtypeobj = null;
		this._masknumbertypeobj = null;
		this._maskdatetypeobj = null;
		this._is_locale_control = null;

		this.contents = null;
		this.locale = null;
		this.colorset = null;
		this.binddataset = null;
		this.titlespacing = null;
		this.legendspacing = null;
		this.boardspacing = null;
		this._createdOrder = null;

		this._duration = null;
		this.duration = null;
		this._isanimationloading = null;
		this.enableanimation = null;
		this.framelate = null;
		this._ani_exception = null;

		this._locale = null;
		this._dataMap = null;
		this._binddataset = null;
		this._colorset = null;
		this._highlightcolor = null;
		this._selectcolor = null;
		this._colorCategory = null;

		this._seriesGroup = null;
		this._highlightGroup = null;

		this._boardRect = null;
		this._boardRectLeft = null;
		this._boardRectTop = null;
		this._nullspacing = null;
		this._titlespacing = null;

		this._legendspacing = null;
		this._boardspacing = null;

		this._changedData = null;
		this._loadanimation = null;
		this._runanimation = null;
		this._changedColorset = null;
		this._recreate = null;

		this._boardBorderSize = null;
		this._boardBorderWidth = null;
		this._boardBorderHeight = null;

		this._overSeriesItem = null;
		this._resize = null;
		this._isApplyContents = null;
		this.useFirerangezoom = null;
		this.useDragrangezoom = null;
		this.id = null;
		this.parent = null;
		this._itemtextlist = null;
		this._firstredraw = null;

		this._chartxtickspace = null;
		this._chartytickspace = null;
		this._prelbuttondownrefobj = null;
		if (this._aniframe_mouse_move_action) {
			this._aniframe_mouse_move_action.destroy();
		}
		this._aniframe_mouse_move_action = null;

		if (this._aniframe_mouse_leave_action) {
			this._aniframe_mouse_leave_action.destroy();
		}
		this._aniframe_mouse_leave_action = null;

		if (this._graphicsControl) {
			delete this._landmarktext;
			this._landmarktext = null;

			this._graphicsControl.destroy();

			delete this._graphicsControl.parent;
			this._graphicsControl.parent = null;

			delete this._graphicsControl;
			this._graphicsControl = null;
		}
	};

	_pChartBase.on_change_containerPos = function (left, top) {
	};

	_pChartBase.on_change_containerRect = function (width, height) {
		var control_elem = this.getElement();
		if (control_elem && this._is_created_contents) {
			if (this._firstredraw) {
				this._firstredraw = false;
				this._graphicsControl.resize(control_elem.client_width, control_elem.client_height);

				this.on_apply_contents();
				this._changedData = true;

				this._draw();
				return;
			}
			if (this._graphicsControl) {
				this._graphicsControl.resize(control_elem.client_width, control_elem.client_height);
				this._graphicsControl.draw();
				this._changedData = true;
				this._ani_exception = true;
				this._draw();
			}
		}
	};



	_pChartBase.setBindDataset = function (obj) {
		if (obj instanceof nexacro.Dataset) {
			if (this._binddataset) {
				this._removeDatasetEventHandlers(this._binddataset);
			}

			if (!obj) {
				this._binddataset = null;
				this.binddataset = "";
			}
			else {
				this._binddataset = obj;
				this.binddataset = obj.id;
			}
			this.on_apply_binddataset();
		}
	};

	_pChartBase.getBindDataset = function () {
		return this._binddataset;
	};

	_pChartBase.set_binddataset = function (str) {
		if (str && typeof str != "string") {
			this.setBindDataset(str);
			if (this._changedData) {
				this._loadanimation = true;
			}
			this._draw();
			if (this._binddataset) {
				return this._binddataset.id;
			}
			else {
				return this.binddataset;
			}
		}
		if (str != this.binddataset || this.binddataset && !this._binddataset) {
			if (this._binddataset) {
				this._removeDatasetEventHandlers(this._binddataset);
			}

			if (!str) {
				this._binddataset = null;
				this.binddataset = "";
			}
			else {
				str = str.replace("@", "");
				this._binddataset = this._findDataset(str);
				this.binddataset = str;
			}
			this.on_apply_binddataset();
			if (this._changedData) {
				this._loadanimation = true;
			}
		}

		this._draw();

		return this.binddataset;
	};

	_pChartBase._checkcategorycolumn = function () {
	};

	_pChartBase.on_apply_binddataset = function () {
		var dsObj = this._binddataset;

		if (this._dataMap) {
			this._dataMap.clear();
			this._dataMap = null;
		}

		if (dsObj) {
			this._checkcategorycolumn();
			this._dataMap = new nexacro._DatasetMap(false);
			this._dataMap.buildDataWithDataset(dsObj, this._getBindableValue("categorycolumn"), this._createObjectItem, this);
			this._setDatasetEventHandlers(dsObj);
		}

		this._changedData = true;
	};

	_pChartBase.set_contents = function (val) {
		this._setContents(val);
		this._changedData = true;
		this._reset = true;
		this._draw();
	};

	_pChartBase._deleteContentsProp = function (prop, idx) {
		if (this._isApplyContents) {
			return;
		}

		if (this.contents && this.contents[prop]) {
			var contents = this.contents;
			if (nexacro._isArray(contents[prop])) {
				delete contents[prop][idx];
				contents[prop].splice(idx, 1);
			}
			else {
				delete contents[prop];
			}
		}
	};

	_pChartBase._setContents = function (contents) {
		this.contents = contents;
		this.on_apply_contents();
	};

	_pChartBase.on_apply_contents = function () {
		if (this._control_element) {
			this._isApplyContents = true;
			this._destroySubControl();
			this._createSubControl(this.contents);
			this._isApplyContents = false;
		}
	};

	_pChartBase.set_locale = function (val) {
		if (val != this.locale) {
			this.locale = val;
			this._locale = val;
			this.on_apply_locale(val);
		}

		this._draw();
	};

	_pChartBase.on_apply_locale = function (val) {
		var charttype = this._type_name;

		nexacro._GraphicsLibArray.forEach(this.seriesset, function (series, index) {
			if (series) {
				series.on_apply_locale();
			}
		}, this);

		if (charttype == "BasicChart" || charttype == "BubbleChart" || charttype == "GaugeChart") {
			nexacro._GraphicsLibArray.forEach(this._axes, function (axis, index) {
				if (axis) {
					axis._locale = val;
					axis.on_apply_locale();
				}
			}, this);
		}
		else if (charttype == "RadarChart") {
			var categoryaxis = this.categoryaxis;
			var valueaxes = this.valueaxes;
			if (categoryaxis) {
				categoryaxis._locale = val;
				categoryaxis.on_apply_locale();
			}
			if (valueaxes) {
				nexacro._GraphicsLibArray.forEach(this.valueaxes, function (axis, index) {
					if (axis) {
						axis._locale = val;
						axis.on_apply_locale();
					}
				}, this);
			}
		}
	};

	_pChartBase.set_colorset = function (val) {
		if (nexacro._GraphicsLib.isEmpty(val)) {
			val = "color10";
		}

		if (this.colorset != val) {
			this.colorset = val;
			this.on_apply_colorset(val);
		}

		this._draw();
	};

	_pChartBase.on_apply_colorset = function (colorset) {
		var index = nexacro._GraphicsLibArray.indexOf(this._colorCategory, colorset);
		var index1 = nexacro._GraphicsLibArray.indexOf(this._colorCategory, "colorRed10");
		var index2 = nexacro._GraphicsLibArray.indexOf(this._colorCategory, "colorPurple10");

		if (index == -1 || index1 == -1 || index2 == -1) {
			return false;
		}

		this._colorset = nexacro._ChartColorset[this._colorCategory[index]];
		this._highlightcolorset = nexacro._ChartColorset[this._colorCategory[index1]];
		this._selectcolorset = nexacro._ChartColorset[this._colorCategory[index2]];

		this._changedColorset = true;
	};

	_pChartBase.set_title = function () {
	};

	_pChartBase.set_titlespacing = function (val) {
		this.titlespacing = val;
		if (val) {
			if (this._titlespacing == null || this._titlespacing.val != val) {
				var titlespacing = nexacro.PaddingObject(val);
				this._titlespacing = titlespacing;
				this.on_apply_titlespacing();
			}
		}
		else {
			if (this._titlespacing) {
				this._titlespacing = null;
				this.on_apply_titlespacing();
			}
		}

		this._draw();
	};

	_pChartBase.on_apply_titlespacing = function () {
		if (this.title) {
			this._rearrange = true;
			this._changedData = true;
		}
	};

	_pChartBase.set_legend = function () {
	};

	_pChartBase.set_legendspacing = function (val) {
		this.legendspacing = val;
		if (val) {
			if (this._legendspacing == null || this._legendspacing.value != val) {
				var legendspacing = nexacro.PaddingObject(val);
				this._legendspacing = legendspacing;
				this.on_apply_legendspacing();
			}
		}
		else {
			if (this._legendspacing) {
				this._legendspacing = this._nullspacing;
				this.on_apply_legendspacing();
			}
		}

		this._draw();
	};

	_pChartBase.on_apply_legendspacing = function () {
		if (this.legend) {
			this._rearrange = true;
			this._changedData = true;
		}
	};

	_pChartBase.set_board = function () {
	};

	_pChartBase.set_boardspacing = function (val) {
		this.boardspacing = val;
		if (val) {
			if (this._boardspacing == null || this._boardspacing.value != val) {
				var boardspacing = nexacro.PaddingObject(val);
				this._boardspacing = boardspacing;
				this.on_apply_boardspacing();
			}
		}
		else {
			if (this._boardspacing) {
				this._boardspacing = this._nullspacing;
				this.on_apply_boardspacing();
			}
		}

		this._draw();
	};

	_pChartBase.on_apply_boardspacing = function () {
		if (this.board) {
			this._rearrange = true;
			this._changedData = true;
		}
	};

	_pChartBase.set_tooltip = function () {
	};

	_pChartBase.set_seriesset = function () {
	};

	_pChartBase.set_enableredraw = function (v) {
		if (v != null && this.enableredraw != v) {
			v = nexacro._toBoolean(v);
			this.enableredraw = v;

			if (this.enableredraw) {
				this._draw();
			}
		}
		return v;
	};
	_pChartBase.set_duration = function (v) {
		var duration = nexacro._toInt(v);

		if (this.duration != duration) {
			this.duration = duration;
		}
	};

	_pChartBase.on_apply_duration = function (duration) {
		if (!this._isanimationloading) {
			this._duration = duration;
		}
	};
	_pChartBase.set_enableanimation = function (v) {
		if (v != null && this.enableanimation != v) {
			v = nexacro._toBoolean(v);
			this.enableanimation = v;

			if (this.enableanimation) {
				this._changedData = true;
				this._loadanimation = true;
				this._draw();
			}
			else {
				if (this._isanimationloading) {
					this._changedData = true;
					this._draw();
				}
			}
		}
		return v;
	};

	_pChartBase.runAnimation = function () {
		if (!this._isanimationloading) {
			this._loadanimation = true;
			this._runanimation = true;
			this._changedData = true;
			this._draw();
		}



		return;
	};

	_pChartBase.clearContents = function () {
		this._drawing = true;
		this._destroySubControl();
		this._drawing = false;

		this.contents = null;
		this._draw();
	};

	_pChartBase.updateContents = function (contents) {
		if (!contents) {
			return false;
		}

		var capitalize = nexacro._GraphicsLibString.capitalize;
		var capNm;
		var value;
		var setter;
		var re = false;
		var subControl;

		if (!this._control_element) {
			return;
		}

		this.contents = this._mergeContents(true, this.contents, contents);

		this._createBoard();

		nexacro._GraphicsLibArray.forEach(this._createdOrder, function (name, index) {
			if (!contents.hasOwnProperty(name)) {
				return;
			}

			value = contents[name];
			if (!value) {
				return;
			}

			capNm = capitalize(name);

			if (nexacro._GraphicsLib.isObject(value)) {
				subControl = this[name];
				if (subControl) {
					this._drawing = true;
					this._setProperties(value, subControl);
					this._drawing = false;
					re = true;
				}
				else {
					setter = "_create" + capNm;
					if (this[setter]) {
						if (value.id) {
							subControl = this[setter](value);
						}
						else {
							subControl = this[setter](value, "Chart" + capNm);
						}

						if (subControl) {
							this._drawing = true;
							this._setProperties(value, subControl);
							this._drawing = false;
							re = true;
						}
					}
				}
			}
			else if (Array.isArray(value)) {
				var valueaxes = this.valueaxes, seriesset = this.seriesset, valueaxis, series, i = 0, object;

				nexacro._GraphicsLibArray.forEach(value, function (o, idx) {
					if (name == "valueaxes") {
						for (i = 0; i < valueaxes.length; i++) {
							valueaxis = valueaxes[i];
							if (valueaxis) {
								if (valueaxis.id == o.id) {
									object = valueaxis;
									break;
								}
							}
						}
					}
					else if (name == "seriesset") {
						for (i = 0; i < seriesset.length; i++) {
							series = seriesset[i];
							if (series) {
								if (series.id == o.id) {
									object = series;
									break;
								}
							}
						}
					}

					if (object) {
						if (name == "valueaxes") {
							this.setValueaxis(object.id, o);
						}
						else if (name == "seriesset") {
							this.setSeries(object.id, o);
						}
						re = true;
					}
					else {
						if (name == "seriesset") {
							capNm = "Series";
						}
						else if (name == "valueaxes") {
							capNm = "Valueaxis";
						}
						setter = "_append" + capNm;

						if (this[setter]) {
							if (o.id) {
								subControl = this[setter](o);
							}
							else {
								subControl = this[setter](o, "Chart" + capNm + idx);
							}
						}

						if (subControl) {
							this._drawing = true;
							this._setProperties(o, subControl);
							this._drawing = false;
							re = true;
						}
					}

					object = null;
				}, this);

				if (capNm == "Series") {
					this._drawing = true;
					this._setSeries();
					this._drawing = false;
				}
			}
		}, this);

		this._changedData = true;
		this._changedColorset = true;
		this._draw();
	};

	_pChartBase.getSeriesByID = function (id) {
		var index = nexacro._GraphicsLibArray.indexOfProp(this.seriesset, "id", id);
		if (index > -1) {
			return this.seriesset[index];
		}
		return null;
	};
	_pChartBase._clearMouseActionSeriesItem = function () {
		if (this._overSeriesItem) {
			var tooltip = this.tooltip, highlightvisible = this._getHighlightVisible(), series = this._overSeriesItem._series, seriesItemType = this._overSeriesItem._type, chartName;
			var overitemid = this._overSeriesItem.id;
			var oversearchbar = false;
			var oversearchpoint = false;
			var oversearchline = false;
			var oversearcharea = false;
			var oversearchgauge = false;
			var oversearchetc = false;
			var item = null;

			if (overitemid.search("LineItem") >= 0) {
				oversearchline = true;
			}
			else if (overitemid.search("PointItem") >= 0) {
				oversearchpoint = true;
			}
			else if (overitemid.search("BarItem") >= 0) {
				oversearchbar = true;
			}
			else if (overitemid.search("AreaItem") >= 0) {
				oversearcharea = true;
			}
			else if (overitemid.search("GaugeItem") >= 0) {
				oversearchgauge = true;
			}
			else {
				oversearchetc = true;
			}


			if (tooltip && tooltip.visible && !oversearchline && !oversearcharea) {
				tooltip._hideTooltip(this._overSeriesItem);
			}


			if (seriesItemType) {
				if (seriesItemType == "Rect" && oversearchbar) {
					if (series.barvisible && series.highlightbarvisible) {
						series._hideBarHighlight(this._overSeriesItem);
					}
				}
				else if (oversearchpoint || oversearchline || oversearcharea || oversearchetc || oversearchgauge) {
					chartName = this._type_name;
					if (chartName == "BasicChart") {
						if (oversearchpoint) {
							series._hidePointHighlight(this._overSeriesItem);
						}
						else if (oversearchline) {
							series._hideLineHighlight(this._overSeriesItem);
						}
					}
					else if (chartName == "BubbleChart") {
						if (seriesItemType == "Ellipse" || seriesItemType == "Paths" || seriesItemType == "Path") {
							if (series.visible && series.highlightvisible) {
								series._hideHighlight(this._overSeriesItem);
							}
						}
					}
					else if (chartName == "RadarChart") {
						if (oversearchpoint) {
							series._hidePointHighlight(this._overSeriesItem);
						}
						else if (oversearchline) {
							series._hideLineHighlight(this._overSeriesItem);
						}
						else if (oversearcharea) {
							series._hideLineAreaHighlight(this._overSeriesItem);
						}
					}
					else if (chartName == "GaugeChart") {
						if (oversearchgauge) {
							series._hideHighlight(this._overSeriesItem);
						}
						if (series.visible && series.highlightbarvisible) {
							series._hideHighlight(this._overSeriesItem);
						}
					}
					else {
						if (seriesItemType == "Ellipse" || seriesItemType == "Paths" || seriesItemType == "Path") {
							if (series.visible && series.highlightvisible) {
								series._hideHighlight(this._overSeriesItem);
							}
						}
					}
				}
			}
			this._overSeriesItem = null;
		}
	};
	_pChartBase.deleteSeries = function (val) {
		var re = false, index = 0;

		if (typeof (val) == "string") {
			var series = this.getSeriesByID(val);
			if (series) {
				index = nexacro._GraphicsLibArray.indexOf(this.seriesset, series);
				if (index > -1) {
					this._deleteSeries(series, index);
					re = true;
				}
			}
		}

		if (re) {
			if (this.seriesset.length == 0) {
				if (this.tooltip) {
					this.tooltip._clearTooltip();
				}
				this._clearMouseActionSeriesItem();
				this._itemtextlist = null;
				this._seriesGroup.clear();
				this._highlightGroup.clear();
				if (this._type_name == "GaugeChart") {
					if (this.indicator) {
						this.indicator.destroy();
						this.indicator = null;
					}
				}
			}
			this._changedData = true;
			this._changedColorset = true;
		}

		this._draw();

		return re;
	};

	_pChartBase.deleteAllSeries = function () {
		var seriesLength = this.seriesset.length;
		if (this.tooltip) {
			this.tooltip._clearTooltip();
		}
		this._clearMouseActionSeriesItem();
		if (this.seriesset) {
			while (this.seriesset.length > 0) {
				this._deleteSeries(this.seriesset[0], 0);
			}

			if (this._seriesGroup) {
				this._itemtextlist = null;
				this._highlightGroup.clear();
				this._seriesGroup.clear();
			}
			this._changedData = true;
		}

		this._draw();

		return seriesLength;
	};

	_pChartBase.showBoard = function () {
		if (this.board) {
			this.board.set_visible(true);
		}
		this._draw();
	};

	_pChartBase.hideBoard = function () {
		if (this.board) {
			this.board.set_visible(false);
		}
		this._draw();
	};

	_pChartBase.showLegend = function () {
		if (this.legend) {
			this.legend.set_visible(true);
		}
		this._changedData = true;
		this._draw();
	};

	_pChartBase.hideLegend = function () {
		if (this.legend) {
			this.legend.set_visible(false);
		}
		this._changedData = true;
		this._draw();
	};

	_pChartBase.showTitle = function () {
		if (this.title) {
			this.title.set_visible(true);
		}
		this._changedData = true;
		this._draw();
	};

	_pChartBase.hideTitle = function () {
		if (this.title) {
			this.title.set_visible(false);
		}
		this._changedData = true;
		this._draw();
	};

	_pChartBase.showTooltip = function () {
		if (this.tooltip) {
			this.tooltip.set_visible(true);
		}
		this._draw();
	};

	_pChartBase.hideTooltip = function () {
		if (this.tooltip) {
			this.tooltip.set_visible(false);
		}

		this._draw();
	};
	_pChartBase.getHittestRefComponent = function (canvasX, canvasY) {
		var targets, index = undefined, value = undefined, itemindex = undefined, itemobject = undefined, evt, len = 0, refobject = {
			"object" : null, 
			"eventid" : "onclick", 
			"index" : undefined, 
			"value" : undefined, 
			"itemindex" : undefined, 
			"itemobject" : undefined
		};

		targets = this._graphicsControl._getGraphicsObjectAll(canvasX, canvasY);

		if (targets && (len = targets.length)) {
			var s, i, itemType, seriesitem;

			for (i = 0; i < len; i++) {
				if (targets[i]["_series"]) {
					if (targets[i]["_legend"]) {
						refobject.object = targets[i]["_legend"];
						refobject.eventid = "onlegendclick";
						if (this._type_name == "BasicChart" || this._type_name == "BubbleChart" || this._type_name == "RadarChart") {
							index = nexacro._GraphicsLibArray.indexOfProp(this.seriesset, "id", targets[i]["_series"].id);
						}
						else if (this._type_name == "PieChart") {
							s = targets[i]._series;
							itemindex = this._GetSeriesItemIndex(s.name);
							index = 0;
						}
						else if (this._type_name == "GaugeChart") {
							if (this.gaugetype == "circular") {
								s = targets[i]._series;
								itemindex = this._GetSeriesItemIndex(s.name);
								index = 0;
							}
							else {
								index = nexacro._GraphicsLibArray.indexOfProp(this.seriesset, "id", targets[i]["_series"].id);
							}
						}
					}
					else {
						var targetObj = targets[i];
						refobject.object = targets[i]["_series"];
						refobject.eventid = "onseriesclick";
						var overitemid = targets[i].id;
						if (this._type_name == "BasicChart" || this._type_name == "BubbleChart" || this._type_name == "RadarChart") {
							if (overitemid.search("SeriesItemText_") >= 0) {
								if (this._type_name == "BasicChart") {
									s = targets[i]["_series"];
									if ((!s.linevisible && !s.pointvisible && !s.barvisible)) {
										continue;
									}
								}
								else if (this._type_name == "RadarChart") {
									s = targets[i]["_series"];
									if ((!s.linevisible && !s.pointvisible)) {
										continue;
									}
								}
							}
							index = nexacro._GraphicsLibArray.indexOfProp(this.seriesset, "id", targets[i]["_series"].id);
						}
						else if (this._type_name == "PieChart") {
							if (overitemid.search("SeriesItemText_") >= 0 || overitemid.search("SeriesPieItemLine_") >= 0) {
								itemindex = targetObj.index;
							}
							else {
								itemindex = this._GetSeriesItemIndexFromSlice(targets[i]);
							}

							index = 0;
						}
						else if (this._type_name == "GaugeChart") {
							if (this.gaugetype == "circular") {
								if (overitemid.search("SeriesItemText_") >= 0) {
									itemindex = targetObj.index;
								}
								else {
									itemindex = this._GetSeriesItemIndexFromSlice(targets[i]);
								}

								index = 0;
							}
							else {
								if (overitemid.search("SeriesItemText_") >= 0) {
									s = targets[i]["_series"];
									if (!s.visible) {
										continue;
									}
								}
								index = nexacro._GraphicsLibArray.indexOfProp(this.seriesset, "id", targets[i]["_series"].id);
							}
						}

						if (this._type_name == "BasicChart" || this._type_name == "BubbleChart" || this._type_name == "RadarChart") {
							if (overitemid.search("LineItem") >= 0 || overitemid.search("AreaItem") >= 0) {
								value = undefined;
								itemindex = undefined;
							}
							else {
								if (this._type_name == "BubbleChart") {
									value = targetObj._points;
								}
								else {
									value = targetObj.value;
								}
								itemindex = targetObj.index;
							}
						}

						else if (this._type_name == "PieChart") {
							if (overitemid.search("SeriesItemText_") >= 0 || overitemid.search("SeriesPieItemLine_") >= 0) {
								value = targetObj.value;
							}
							else {
								seriesitem = this._GetSeriesItemFromIndex(itemindex);
								value = seriesitem.value;
							}
						}
						else if (this._type_name == "GaugeChart") {
							if (this.gaugetype == "circular") {
								if (overitemid.search("SeriesItemText_") >= 0) {
									value = targetObj.value;
								}
								else {
									seriesitem = this._GetSeriesItemFromIndex(itemindex);
									value = seriesitem.value;
								}
							}
							else {
								value = targetObj.value;
								itemindex = targetObj.index;
							}
						}
					}
					break;
				}
				else if (targets[i]["_axis"]) {
					refobject.object = targets[i]["_axis"];
					refobject.eventid = "onaxisclick";
					if (targets[i]["_axis"]._type == "categoryAxis") {
						itemindex = 0;
					}
					else {
						if (this._type_name == "RadarChart") {
							itemindex = 1;
						}
						else {
							itemindex = nexacro._GraphicsLibArray.indexOfProp(this.valueaxes, "id", targets[i]["_axis"].id);
						}
					}
					break;
				}
				else if (targets[i]["_legend"]) {
					refobject.object = targets[i]["_legend"];
					refobject.eventid = "onlegendclick";
					break;
				}
				else if (targets[i]["_title"]) {
					refobject.object = targets[i]["_title"];
					refobject.eventid = "ontitleclick";
					break;
				}
				else if (targets[i]["_board"]) {
					refobject.object = targets[i]["_board"];
					refobject.eventid = "onboardclick";
					break;
				}
				else if (targets[i]["_rangebar"]) {
					refobject.object = targets[i]["_rangebar"];
					if (refobject.object._isvscroll) {
						refobject.eventid = "onvrangebarclick";
					}
					else {
						refobject.eventid = "onhrangebarclick";
					}
					break;
				}
				else if (targets[i]["_selection"]) {
					continue;
				}
				else if (targets[i]["_crosshair"]) {
					continue;
				}
			}
		}
		refobject.index = index;
		refobject.value = value;
		refobject.itemindex = itemindex;
		refobject.itemobject = itemobject;
		return refobject;
	};




	_pChartBase.on_notify_dataset_onload = function (obj, e) {
		if (e) {
			switch (e.reason) {
				case nexacro.NormalDataset.REASON_LOAD:
				case nexacro.NormalDataset.REASON_RESET:
					{

						if (this.enableanimation) {
							this._loadanimation = true;
						}

						this.on_apply_binddataset();
						if (this._changedData) {
							this._draw();
						}


					}
					break;
				case nexacro.NormalDataset.REASON_LOADCONTENT:
					if (this.enableanimation) {
						this._loadanimation = true;
					}
					break;
			}
		}
	};
	_pChartBase._OverrideActionMouseMoveTouchMove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret;
		if (from_refer_comp && from_refer_comp._type_name == "GraphicsControl") {
			if (this._dragRangebar) {
				ret = this._dragRangebar.moved(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
				if (ret == "drag") {
				}
				else {
					this._dragRangebar = null;
				}
			}
			if (this._dragSelection) {
				ret = this._dragSelection.moved(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
				if (ret == "drag") {
				}
				else {
					this._dragSelection = null;
				}
			}
			var targets = from_refer_comp._getGraphicsObjectAll(canvasX, canvasY), len = 0, i = 0, target, realCursor, curobj, cursorVal;

			if (targets && (len = targets.length)) {
				for (i = len - 1; i > -1; i--) {
					if (targets[i]["_cursor"]) {
						target = targets[i];
						break;
					}
				}
			}
			if (ret != "drag") {
				if (target && target._cursor) {
					var rangebar = target._owner;
					if (rangebar && rangebar._type_name == "ChartRangebarControl") {
						if (rangebar._isvscroll) {
							cursorVal = rangebar._setCursorY(target, canvasY);
						}
						else {
							cursorVal = rangebar._setCursorX(target, canvasX);
						}
					}
				}

				if (cursorVal) {
					realCursor = this.getElement().cursor;
					if (realCursor) {
						if (cursorVal.value != realCursor._value) {
							this.getElement().setElementCursor(cursorVal);
						}
					}
					else {
						curobj = nexacro.CursorObject("default");
						this.getElement().setElementCursor(curobj);
					}
				}
				else {
					var compCursor = this._cursor;
					realCursor = this.getElement().cursor;
					if (!compCursor) {
						curobj = nexacro.CursorObject("default");
						this.getElement().setElementCursor(curobj);
					}

					if (compCursor && realCursor) {
						if (compCursor != realCursor._value) {
							this.getElement().setElementCursor(compCursor);
						}
					}
				}
			}

			var tooltip = this.tooltip, highlightvisible = this._getHighlightVisible();

			if ((tooltip && tooltip.visible) || highlightvisible) {
				var evt, seriesItem;

				targets = this._graphicsControl._getGraphicsObjectAll(canvasX, canvasY);

				var searchbar = false;
				var searchpoint = false;
				var searchline = false;
				var searcharea = false;
				var searchgauge = false;
				var _seriesbaritem, _seriespointitem, _serieslineitem, _seriesareaitem, _seriesgaugeitem, _firstseriesitem;
				if (targets && (len = targets.length)) {
					var s, itemType;

					for (i = len - 1; i > -1; i--) {
						if (targets[i]["_series"]) {
							s = targets[i]._series;
							itemType = targets[i]._type;
							var itemid = targets[i].id;
							if (s.linevisible && itemid.search("LineItem") >= 0 && !searchline) {
								_serieslineitem = targets[i];
								searchline = true;
							}
							else if (s.pointvisible && itemid.search("PointItem") >= 0 && !searchpoint) {
								_seriespointitem = targets[i];
								searchpoint = true;
							}
							else if (s.barvisible && itemid.search("BarItem") >= 0 && !searchbar) {
								_seriesbaritem = targets[i];
								searchbar = true;
							}
							else if (s.lineareavisible && itemid.search("AreaItem") >= 0 && !searcharea) {
								_seriesareaitem = targets[i];
								searcharea = true;
							}
							else if (s.visible && itemid.search("GaugeItem") >= 0 && !searchgauge) {
								_seriesgaugeitem = targets[i];
								searchgauge = true;
							}
							else if (!_firstseriesitem) {
								_firstseriesitem = targets[i];
							}
						}
					}
					if (searchpoint) {
						seriesItem = _seriespointitem;
						searchline = false;
						searchbar = false;
						searcharea = false;
						searchgauge = false;
					}
					else if (searchline) {
						seriesItem = _serieslineitem;
						searchpoint = false;
						searchbar = false;
						searcharea = false;
						searchgauge = false;
					}
					else if (searchbar) {
						seriesItem = _seriesbaritem;
						searchline = false;
						searchpoint = false;
						searcharea = false;
						searchgauge = false;
					}
					else if (searcharea) {
						seriesItem = _seriesareaitem;
						searchline = false;
						searchpoint = false;
						searchbar = false;
						searchgauge = false;
					}
					else if (searchgauge) {
						seriesItem = _seriesgaugeitem;
						searchline = false;
						searchpoint = false;
						searchbar = false;
						searcharea = false;
					}
					else {
						seriesItem = _firstseriesitem;
						searchline = false;
						searchpoint = false;
						searchbar = false;
						searcharea = false;
						searchgauge = false;
					}
				}

				if (seriesItem != this._overSeriesItem) {
					var seriesItemType, series, index, value;
					var chartName = null;
					this._clearMouseActionSeriesItem();

					if (seriesItem) {
						series = seriesItem._series;

						if (tooltip && tooltip.visible && !searchline && !searcharea) {
							tooltip._showTooltip(seriesItem, canvasX, canvasY);
						}

						seriesItemType = seriesItem._type;
						if (seriesItemType) {
							if (seriesItemType == "Rect" && searchbar) {
								if (series.barvisible && series.highlightbarvisible) {
									series._showBarHighlight(seriesItem);
								}

								index = seriesItem.index;
								value = seriesItem.value;
							}
							else if (searchpoint || searchline || searcharea || searchgauge || _firstseriesitem) {
								chartName = this._type_name;
								if (chartName == "BasicChart") {
									if (searchpoint && series.pointvisible && series.highlightpointvisible) {
										series._showPointHighlight(seriesItem);
									}
									else if (searchline && series.linevisible && series.highlightlinevisible) {
										series._showLineHighlight(seriesItem);
									}
								}
								else if (chartName == "BubbleChart") {
									if (seriesItemType == "Ellipse" || seriesItemType == "Paths" || seriesItemType == "Path") {
										if (series.visible && series.highlightvisible) {
											series._showHighlight(seriesItem);
										}
									}
								}
								else if (chartName == "RadarChart") {
									if (searchpoint && series.pointvisible && series.highlightpointvisible) {
										series._showPointHighlight(seriesItem);
									}
									else if (searchline && series.linevisible && series.highlightlinevisible) {
										series._showLineHighlight(seriesItem);
									}
									else if (searcharea && series.lineareavisible && series.highlightlineareavisible) {
										series._showLineAreaHighlight(seriesItem);
									}
								}
								else if (chartName == "GaugeChart") {
									if (series.visible && series.highlightbarvisible) {
										series._showHighlight(seriesItem);
									}
								}
								else {
									if (seriesItemType == "Ellipse" || seriesItemType == "Paths" || seriesItemType == "Path") {
										if (series.visible && series.highlightvisible) {
											series._showHighlight(seriesItem);
										}
									}
								}

								index = seriesItem.index;
								value = seriesItem.value;
							}
						}
					}

					this._overSeriesItem = seriesItem;
				}
				else {
					if (tooltip && tooltip.visible && !searchline && !searcharea) {
						tooltip._moveTooltip(seriesItem, canvasX, canvasY, this._boardRect);
					}
				}
			}
			var crosshair = this.crosshair;
			if (crosshair && crosshair.visible) {
				crosshair._showCrosshair(this._boardRect, canvasX, canvasY);
			}
		}
	};
	_pChartBase._OverrdieAnimateActionMouseMoveTouchMove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var PosArgument = {
			"button" : button, 
			"alt_key" : alt_key, 
			"ctrl_key" : ctrl_key, 
			"shift_key" : shift_key, 
			"screenX" : screenX, 
			"screenY" : screenY, 
			"canvasX" : canvasX, 
			"canvasY" : canvasY, 
			"clientX" : clientX, 
			"clientY" : clientY, 
			"from_comp" : from_comp, 
			"from_refer_comp" : from_refer_comp
		};

		if (!this._aniframe_mouse_move_action) {
			var pThis = this;
			this._move_pos_queue = [];
			this._aniframe_mouse_move_action = new nexacro.AnimationFrame(this, function () {
				pThis._adjustChartMoveAction_callback();
			});
		}
		var cnt = this._move_pos_queue.push(PosArgument);
		if (cnt == 1) {
			this._aniframe_mouse_move_action.start();
		}
	};
	_pChartBase._adjustChartMoveAction_callback = function () {
		var pos = this._move_pos_queue.pop();
		if (this._move_pos_queue.length > 2) {
			this._aniframe_mouse_move_action.start();
		}
		else {
			this._aniframe_mouse_move_action.stop();
		}
		this._move_pos_queue = [];
		if (pos) {
			this._OverrideActionMouseMoveTouchMove(pos.button, pos.alt_key, pos.ctrl_key, pos.shift_key, pos.screenX, pos.screenY, pos.canvasX, pos.canvasY, pos.clientX, pos.clientY, pos.from_comp, pos.from_refer_comp);
		}
	};
	_pChartBase._adjustChartMoveAction_callback_end = function () {
	};
	_pChartBase.on_fire_user_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		this._OverrdieAnimateActionMouseMoveTouchMove(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

		if (this.onmousemove && this.onmousemove._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartMouseEventInfo(this, "onmousemove", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);

			return this.onmousemove._fireUserEvent(this, evt);
		}

		return false;
	};

	_pChartBase.on_fire_user_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		if (this._aniframe_mouse_move_action) {
			this._aniframe_mouse_move_action.start();
			this._move_pos_queue = [];
		}
		if (this.tooltip) {
			this.tooltip._clearTooltip();
		}
		this._clearMouseActionSeriesItem();
		if (this.onmouseenter && this.onmouseenter._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartMouseEventInfo(this, "onmouseenter", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onmouseenter._fireUserEvent(this, evt);
		}
		return false;
	};

	_pChartBase.on_fire_user_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		if (this._aniframe_mouse_move_action) {
			this._aniframe_mouse_move_action.stop();
			this._move_pos_queue = [];
		}
		if (this.tooltip) {
			this.tooltip._clearTooltip();
		}
		this._clearMouseActionSeriesItem();
		if (this._dragRangebar) {
			this._changedData = true;
			this._ani_exception = true;
			this._draw();
		}



		if (this.onmouseleave && this.onmouseleave._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartMouseEventInfo(this, "onmouseleave", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onmouseleave._fireUserEvent(this, evt);
		}
		return false;
	};
	_pChartBase._adjustChartLeaveAction_callback = function () {
		var pos = this._leave_pos_queue.pop();
		if (this._leave_pos_queue.length == 1) {
			this._aniframe_mouse_leave_action.start();
		}
		else {
			this._aniframe_mouse_leave_action.stop();
		}
		this._leave_pos_queue = [];
		if (this.tooltip) {
			this.tooltip._clearTooltip();
		}
		this._clearMouseActionSeriesItem();
		if (this._dragRangebar) {
			this._changedData = true;
			this._ani_exception = true;
			this._draw();
		}
	};
	_pChartBase._OverrideActionLbuttonDownTouchStart = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (from_refer_comp && from_refer_comp._type_name == "GraphicsControl") {
			var targets = from_refer_comp._getGraphicsObjectAll(canvasX, canvasY), len = 0, target;


			if (targets && (len = targets.length)) {
				for (var i = len - 1; i > -1; i--) {
					if (targets[i]["_dragAction"]) {
						target = targets[i];
						break;
					}
				}
			}
			if (target && target._dragAction) {
				this._dragRangebar = target._owner._dragObject(target, clientX, clientY);
				if (this.selection && this.selection.visible) {
					this.selection._clearSelection();
				}
			}
			else {
				if (this.selection && this.selection.visible) {
					var skip = false;
					if (canvasX < this._boardRect.left || canvasX > this._boardRect.right) {
						skip = true;
					}
					if (canvasX < this._boardRect.left || canvasX > this._boardRect.right) {
						skip = true;
					}
					if (!skip) {
						this._dragSelection = this.selection._dragselectionObject(this.selection, clientX, clientY, canvasX, canvasY);
					}
				}
			}
		}
	};
	_pChartBase._OverrideActionLbuttonUpTouchEnd = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var returnfirerangezoom = [];
		returnfirerangezoom[0] = false;
		returnfirerangezoom[1] = false;
		if (from_refer_comp && from_refer_comp._type_name == "GraphicsControl") {
			if (this._dragRangebar) {
				this._dragRangebar.ended(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
				this._dragRangebar = null;
				return returnfirerangezoom;
			}
			if (this._dragSelection) {
				var ret = this._dragSelection.ended(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
				if (!this.useDragrangezoom && this.selection._rangezoomdraw == true) {
					if (this.onrangezoomed && this.onrangezoomed._has_handlers) {
						var charttype = this._type_name;
						var startaxisvalue;
						var endaxisvalue;
						var startaxisvalue2;
						var endaxisvalue2;
						var from, length = 0, to;
						if (charttype == "BasicChart") {
							startaxisvalue = new Array();
							endaxisvalue = new Array();
							startaxisvalue2 = undefined;
							endaxisvalue2 = undefined;
							if (this.selection._xaxis._type == "categoryAxis") {
								var xindex = nexacro.round(this.selection._xstartdata);
								from = this.selection._xaxis._ticks[0];
								if (this.selection._type.indexOf("x") != -1 && this.rangezoom.indexOf("x") != -1) {
									if (from) {
										startaxisvalue.push(from.label);
									}
									else {
										startaxisvalue.push(xindex);
									}
								}
								if (this.selection._type.indexOf("y") != -1 && this.rangezoom.indexOf("y") != -1) {
									startaxisvalue.push(nexacro.round(this.selection._ystartdata));
								}

								xindex = nexacro.round(this.selection._xenddata);
								length = this.selection._xaxis._ticks.length;
								to = this.selection._xaxis._ticks[length - 1];
								if (this.selection._type.indexOf("x") != -1 && this.rangezoom.indexOf("x") != -1) {
									if (to) {
										endaxisvalue.push(to.label);
									}
									else {
										endaxisvalue.push(xindex);
									}
								}
								if (this.selection._type.indexOf("y") != -1 && this.rangezoom.indexOf("y") != -1) {
									endaxisvalue.push(nexacro.round(this.selection._yenddata));
								}
							}
							else if (this.selection._yaxis._type == "categoryAxis") {
								var yindex = nexacro.round(this.selection._ystartdata);
								from = this.selection._yaxis._ticks[0];
								if (this.selection._type.indexOf("y") != -1 && this.rangezoom.indexOf("y") != -1) {
									if (from) {
										startaxisvalue.push(from.label);
									}
									else {
										startaxisvalue.push(yindex);
									}
								}
								if (this.selection._type.indexOf("x") != -1 && this.rangezoom.indexOf("x") != -1) {
									startaxisvalue.push(nexacro.round(this.selection._xstartdata));
								}

								yindex = nexacro.round(this.selection._yenddata);
								length = this.selection._yaxis._ticks.length;
								to = this.selection._yaxis._ticks[length - 1];
								if (this.selection._type.indexOf("y") != -1 && this.rangezoom.indexOf("y") != -1) {
									if (to) {
										endaxisvalue.push(to.label);
									}
									else {
										endaxisvalue.push(yindex);
									}
								}
								if (this.selection._type.indexOf("x") != -1 && this.rangezoom.indexOf("x") != -1) {
									endaxisvalue.push(nexacro.round(this.selection._xenddata));
								}
							}
						}
						else if (charttype == "BubbleChart") {
							startaxisvalue = new Array();
							endaxisvalue = new Array();
							startaxisvalue2 = new Array();
							endaxisvalue2 = new Array();

							if (this.selection._type.indexOf("x") != -1 && this.rangezoom.indexOf("x") != -1) {
								startaxisvalue.push(this.selection._xstartdata);
								endaxisvalue.push(this.selection._xenddata);
							}
							if (this.selection._type.indexOf("y") != -1 && this.rangezoom.indexOf("y") != -1) {
								startaxisvalue2.push(this.selection._ystartdata);
								endaxisvalue2.push(this.selection._yenddata);
							}
						}
						var evt = new nexacro.ChartRangeZoomEventInfo(this, "onrangezoomed", from_comp, from_refer_comp, startaxisvalue, endaxisvalue, startaxisvalue2, endaxisvalue2);
						this.selection._rangezoomdraw = false;
						this._dragSelection = null;
						returnfirerangezoom[1] = this.onrangezoomed._fireUserEvent(this, evt);
						returnfirerangezoom[0] = true;
					}

					this.useFirerangezoom = true;
				}
				this.selection._rangezoomdraw = false;
				this._dragSelection = null;
			}
		}
		return returnfirerangezoom;
	};
	_pChartBase.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		this._OverrideActionLbuttonDownTouchStart(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

		var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
		this._prelbuttondownrefobj = ref_subcontrol.object;
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartMouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onlbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pChartBase.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		var retfire = this._OverrideActionLbuttonUpTouchEnd(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		if (this.useFirerangezoom) {
			return retfire[1];
		}
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartMouseEventInfo(this, "onlbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onlbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pChartBase.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartMouseEventInfo(this, "onrbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onrbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pChartBase.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		if (this.onrbuttondown && this.onrbuttondown._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartMouseEventInfo(this, "onrbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.value);
			return this.onrbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};
	_pChartBase.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (this._isanimationloading) {
			return false;
		}
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartMouseEventInfo(this, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onmouseup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pChartBase.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartMouseEventInfo(this, "onmousedown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onmousedown._fireUserEvent(this, evt);
		}
		return false;
	};
	_pChartBase.useDragrangezoom = false;
	_pChartBase.useFirerangezoom = false;
	_pChartBase.on_fire_user_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		if (this.ondrag && this.ondrag._has_handlers) {
			var dragData = this._getDragData();
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = refer_comp;
			}
			var evt = new nexacro.ChartDragEventInfo(this, "ondrag", dragData, null, "text", null, this, self_refer_comp, from_comp, ref_subcontrol.object, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			var ret = this.ondrag._fireUserEvent(this, evt);
			if (ret == true) {
				this.useDragrangezoom = true;
			}
			else {
				this.useDragrangezoom = false;
			}
			return [ret, this, self_refer_comp, dragData, evt.userdata];
		}
		this.useDragrangezoom = false;
		return [false];
	};

	_pChartBase.on_fire_user_ondrop = function (src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		if (this.ondrop && this.ondrop._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartDragEventInfo(this, "ondrop", dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, ref_subcontrol.object, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.ondrop._fireUserEvent(this, evt);
		}
		return false;
	};

	_pChartBase.on_fire_user_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		if (this.ondragenter && this.ondragenter._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartDragEventInfo(this, "ondragenter", dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, ref_subcontrol.object, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.ondragenter._fireUserEvent(this, evt);
		}
		return false;
	};

	_pChartBase.on_fire_user_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragleave && this.ondragleave._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartDragEventInfo(this, "ondragleave", dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, ref_subcontrol.object, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.ondragleave._fireUserEvent(this, evt);
		}
		return false;
	};

	_pChartBase.on_fire_user_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		if (this.ondragmove && this.ondragmove._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.ChartDragEventInfo(this, "ondragmove", dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, ref_subcontrol.object, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.ondragmove._fireUserEvent(this, evt);
		}
		return false;
	};
	_pChartBase.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		var button = null;
		var alt_key = null;
		var ctrl_key = null;
		var shift_key = null;
		var screenX = null;
		var screenY = null;
		var canvasX = null;
		var canvasY = null;
		var clientX = null;
		var clientY = null;
		if (touchinfos && touchinfos.length > 0) {
			screenX = touchinfos[0].screenx;
			screenY = touchinfos[0].screeny;
			canvasX = touchinfos[0].canvasx;
			canvasY = touchinfos[0].canvasy;
			clientX = touchinfos[0].clientx;
			clientY = touchinfos[0].clienty;



			this._OverrideActionLbuttonDownTouchStart(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		}
		if (this.ontouchstart && this.ontouchstart._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.TouchEventInfo(this, "ontouchstart", touchinfos, changedtouchinfos, from_comp, ref_subcontrol.object);
			return this.ontouchstart._fireUserEvent(this, evt);
		}
		return false;
	};
	_pChartBase.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		var button = null;
		var alt_key = null;
		var ctrl_key = null;
		var shift_key = null;
		var screenX = null;
		var screenY = null;
		var canvasX = null;
		var canvasY = null;
		var clientX = null;
		var clientY = null;
		if (touchinfos && touchinfos.length > 0) {
			screenX = touchinfos[0].screenx;
			screenY = touchinfos[0].screeny;
			canvasX = touchinfos[0].canvasx;
			canvasY = touchinfos[0].canvasy;
			clientX = touchinfos[0].clientx;
			clientY = touchinfos[0].clienty;

			var retfire = this._OverrideActionLbuttonUpTouchEnd(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			if (this.useFirerangezoom) {
				return retfire[1];
			}
		}

		if (this.ontouchend && this.ontouchend._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.TouchEventInfo(this, "ontouchend", touchinfos, changedtouchinfos, from_comp, ref_subcontrol.object);
			return this.ontouchend._fireUserEvent(this, evt);
		}
		return false;
	};
	_pChartBase.on_fire_user_ontouchmove = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this._isanimationloading) {
			return false;
		}
		var button = null;
		var alt_key = null;
		var ctrl_key = null;
		var shift_key = null;
		var screenX = null;
		var screenY = null;
		var canvasX = null;
		var canvasY = null;
		var clientX = null;
		var clientY = null;
		if (touchinfos && touchinfos.length > 0) {
			screenX = touchinfos[0].screenx;
			screenY = touchinfos[0].screeny;
			canvasX = touchinfos[0].canvasx;
			canvasY = touchinfos[0].canvasy;
			clientX = touchinfos[0].clientx;
			clientY = touchinfos[0].clienty;
			this._OverrdieAnimateActionMouseMoveTouchMove(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		}

		if (this.ontouchmove && this.ontouchmove._has_handlers) {
			var ref_subcontrol = this.getHittestRefComponent(canvasX, canvasY);
			if (ref_subcontrol.object == null) {
				ref_subcontrol.object = from_refer_comp;
			}
			var evt = new nexacro.TouchEventInfo(this, "ontouchmove", touchinfos, changedtouchinfos, from_comp, ref_subcontrol.object);
			return this.ontouchmove._fireUserEvent(this, evt);
		}
		return false;
	};


	_pChartBase.on_notify_graphicsControl_onclick = function (obj, e) {
		if (this._isanimationloading) {
			return false;
		}
		if (this.useFirerangezoom) {
			this.useFirerangezoom = false;
			return false;
		}
		var targets, evt, len = 0, legendItem;
		if (e.fromobject.id && e.fromreferenceobject.id == "GraphicsControl") {
			var legend = this.legend;
			if (legend) {
				var useiteminvisible = legend.useiteminvisible, visible = legend.visible;

				if (visible && useiteminvisible) {
					targets = this._graphicsControl._getGraphicsObjectAll(e.canvasx, e.canvasy);
					if (targets && (len = targets.length)) {
						var s;
						var itemType;

						for (var i = len - 1; i > -1; i--) {
							if (targets[i]["_series"]) {
								var id = targets[i].id;
								if (id.search("ChartLegendItemMarker") >= 0) {
									s = targets[i]._series;
									var charttype = this._type_name;
									if (charttype == "PieChart") {
										if (s.visible) {
											this._hideSeriesItem(s.name);
										}
										else {
											this._showSeriesItem(s.name);
										}
										break;
									}
									else {
										if (s.visible) {
											this.hideSeries(s.id);
										}
										else {
											this.showSeries(s.id);
										}
										break;
									}
								}
							}
						}
					}
				}
			}
		}
		var ref_subcontrol = this.getHittestRefComponent(e.canvasx, e.canvasy);
		var ischartclick = false;
		if (ref_subcontrol.object != this._prelbuttondownrefobj) {
			return false;
		}
		if (ref_subcontrol.object == null) {
			ischartclick = true;
			ref_subcontrol.object = e.fromreferenceobject;
		}
		this._prelbuttondownrefobj = null;

		if (this.onseriesclick && this.onseriesclick._has_handlers && ref_subcontrol.eventid == "onseriesclick") {
			evt = new nexacro.ChartClickEventInfo(this, ref_subcontrol.eventid, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onseriesclick._fireUserEvent(this, evt);
		}
		if (this.onaxisclick && this.onaxisclick._has_handlers && ref_subcontrol.eventid == "onaxisclick") {
			evt = new nexacro.ChartClickEventInfo(this, ref_subcontrol.eventid, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onaxisclick._fireUserEvent(this, evt);
		}
		if (this.onlegendclick && this.onlegendclick._has_handlers && ref_subcontrol.eventid == "onlegendclick") {
			evt = new nexacro.ChartClickEventInfo(this, ref_subcontrol.eventid, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onlegendclick._fireUserEvent(this, evt);
		}
		if (this.ontitleclick && this.ontitleclick._has_handlers && ref_subcontrol.eventid == "ontitleclick") {
			evt = new nexacro.ChartClickEventInfo(this, ref_subcontrol.eventid, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.ontitleclick._fireUserEvent(this, evt);
		}
		if (this.onvrangebarclick && this.onvrangebarclick._has_handlers && ref_subcontrol.eventid == "onvrangebarclick") {
			evt = new nexacro.ChartClickEventInfo(this, ref_subcontrol.eventid, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onvrangebarclick._fireUserEvent(this, evt);
		}
		if (this.onhrangebarclick && this.onhrangebarclick._has_handlers && ref_subcontrol.eventid == "onhrangebarclick") {
			evt = new nexacro.ChartClickEventInfo(this, ref_subcontrol.eventid, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onhrangebarclick._fireUserEvent(this, evt);
		}
		if (this.onboardclick && this.onboardclick._has_handlers && ref_subcontrol.eventid == "onboardclick") {
			evt = new nexacro.ChartClickEventInfo(this, ref_subcontrol.eventid, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, ref_subcontrol.object, ref_subcontrol.index, ref_subcontrol.itemindex, ref_subcontrol.value);
			return this.onboardclick._fireUserEvent(this, evt);
		}
		if (this.onclick && this.onclick._has_handlers && ischartclick) {
			evt = new nexacro.ChartClickEventInfo(this, e.id, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, undefined, undefined, undefined);
			return this.onclick._fireUserEvent(this, evt);
		}

		return false;
	};

	_pChartBase.on_notify_graphicsControl_ondblclick = function (obj, e) {
		if (this._isanimationloading) {
			return false;
		}
		if (this.ondblclick && this.ondblclick._has_handlers) {
			var evt = new nexacro.ChartClickEventInfo(this, e.id, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, undefined, undefined, undefined);
			return this.ondblclick._fireUserEvent(this, evt);
		}
		return false;
	};

	_pChartBase._draw = function () {
		if (!this._isEnableRedraw() || this._drawing || !this._control_element) {
			return;
		}


		this._drawing = true;

		if (this._changedData) {
			this._rearrange = true;
			this._recreate = true;
		}

		if (this._rearrange || this._recreate) {
			if (this.contents != null) {
				this._setSeriesGroup();
			}
		}

		if (this._changedData || this._changedColorset) {
			this._setSeries();

			if (this.legend) {
				this._drawing = false;
				this._applyLegendItem();
				this._drawing = true;
			}
		}

		this._measure();
		this._arrange();

		this._graphicsControl.draw();
		var crosshair = this.crosshair;
		if (crosshair && crosshair.visible && (this._rearrange || this._recreate)) {
			crosshair._calcCrosshair(this._boardRect);
		}
		this._changedData = false;
		this._ani_exception = false;
		this._loadanimation = false;
		this._runanimation = false;
		this._changedColorset = false;
		this._recreate = false;
		this._rearrange = false;
		this._drawing = false;
	};
	_pChartBase._arrangerangezoomselection = function () {
	};
	_pChartBase._measure = function () {
		var clientWidth = this._getClientWidth();
		var clientHeight = this._getClientHeight();
		var rearrange = this._rearrange, changedData = this._changedData;

		if (!this._boardRect) {
			this._boardRect = new nexacro.Rect(0, 0, clientWidth, clientHeight);
		}

		if (rearrange || changedData) {
			this._boardRect.set(0, 0, clientWidth, clientHeight);

			if (this.title) {
				this.title._measure(clientWidth, clientHeight);
			}

			if (this.legend) {
				var legendspacing = this._legendspacing;
				if (legendspacing) {
					clientWidth = clientWidth - (legendspacing.left + legendspacing.right);
				}
				this.legend._measure(clientWidth);
			}
		}
	};

	_pChartBase._arrange = function () {
		if (this._rearrange) {
			this._arrangeTitle();
			this._arrangeLegend();
			this._setBoardBorderSize();
		}
	};

	_pChartBase._setEventHandlerToGraphicsControl = function () {
		var graphicsControl = this._graphicsControl;
		if (graphicsControl) {
			graphicsControl._setEventHandler("onclick", this.on_notify_graphicsControl_onclick, this);
			graphicsControl._setEventHandler("ondblclick", this.on_notify_graphicsControl_ondblclick, this);
		}
	};

	_pChartBase._setDatasetEventHandlers = function (ds) {
		ds._setEventHandler("onload", this.on_notify_dataset_onload, this);

		var length = 0, uHandler;

		ds.setEventHandler("oncolumnchanged", this._onColumnChangedHandler, this);
		uHandler = ds.oncolumnchanged._user_handlers;
		length = uHandler.length;
		if (length > 1) {
			nexacro._GraphicsLibArray.move(uHandler, length - 1, 0);
		}

		length = 0;
		uHandler = null;

		ds.setEventHandler("onrowsetchanged", this._onRowSetChangedHandler, this);
		uHandler = ds.onrowsetchanged._user_handlers;
		length = uHandler.length;
		if (length > 1) {
			nexacro._GraphicsLibArray.move(uHandler, length - 1, 0);
		}

		length = 0;
		uHandler = null;

		ds.setEventHandler("onrowposchanged", this._onRowPosChangedHandler, this);
		uHandler = ds.onrowposchanged._user_handlers;
		length = uHandler.length;
		if (length > 1) {
			nexacro._GraphicsLibArray.move(uHandler, length - 1, 0);
		}
	};

	_pChartBase._removeDatasetEventHandlers = function (ds) {
		if (ds) {
			ds._removeEventHandler("onload", this.on_notify_dataset_onload, this);
			ds.removeEventHandler("oncolumnchanged", this._onColumnChangedHandler, this);
			ds.removeEventHandler("onrowsetchanged", this._onRowSetChangedHandler, this);
			ds.removeEventHandler("onrowposchanged", this._onRowPosChangedHandler, this);
		}
	};

	_pChartBase._onColumnChangedHandler = function (obj, e) {
		var dsMap = this._dataMap;
		if (dsMap) {
			var row = e.row;
			var columnid = e.columnid;
			var value = e.newvalue || 0;
			var data = dsMap.getAt(row);
			var count = dsMap._btree.getCount();
			if (!data && row >= count) {
				return;
			}
			if (data) {
				if (columnid == this._getBindableValue("categorycolumn")) {
					dsMap.changeKey(data, value, row, this._createObjectItem, this);
					data[columnid] = value;
				}
				else {
					data[columnid] = value;
				}
				dsMap.setAt(row, data);
				this._changedData = true;
				this._recreate = true;
				this._rearrange = true;
				this._reset = true;
				this._draw();
			}
		}
	};

	_pChartBase._onRowSetChangedHandler = function (obj, e) {
		var dsMap = this._dataMap;
		if (dsMap) {
			var row = e.row;
			var count = e.count;
			var dsArray;
			var cnt = 0;
			var categorydata = this._getBindableValue("categorycolumn");

			dsArray = dsMap.toArray();
			if (dsArray.length > 0) {
				cnt = dsArray.length;
			}

			switch (e.reason) {
				case 12:
					var i = row + count - 1, data;

					for (; i >= row; i--) {
						data = this._createObjectItem(obj, i);
						if (this._type_name == "BubbleChart") {
							dsMap.insert(row, categorydata, data, cnt);
							cnt++;
						}
						else {
							dsMap.insert(row, obj.getColumn(i, categorydata), data);
						}
					}
					break;
				case 20:
					dsMap.removeAt(row);
					break;
				case 32:
					dsMap.moveRow(count - 1, row);
					break;
				case 33:
					if (this._prevRowForExchangeRow == null) {
						this._prevRowForExchangeRow = row;
					}
					else {
						dsMap.exchangeRow(this._prevRowForExchangeRow, row);
						this._prevRowForExchangeRow = null;
					}
					break;
				case 10:
				case 11:
				case 13:
				case 30:
				case 31:
				case 34:
				case 41:
					dsMap.clear();
					dsMap.buildDataWithDataset(obj, categorydata, this._createObjectItem, this);
					break;
				case 22:
				case 23:
				case 24:
					dsMap.clear();
			}

			this._changedData = true;
			this._reset = true;
			this._draw();
		}
	};

	_pChartBase._onRowPosChangedHandler = function (obj, e) {
		var dsMap = this._dataMap;
		if (dsMap) {
			this._rowposition = e.newrow;

			if (this._graphicsControl._is_created) {
				this._changedData = true;
				this._reset = true;
				this._draw();
			}
		}
	};

	_pChartBase._createObjectItem = function (ds, row, key) {
		var name, value, data = {
		};

		for (var i = 0, collen = ds.getColCount(); i < collen; i++) {
			name = ds.getColID(i);
			if (name == key) {
				continue;
			}
			value = ds.getColumn(row, name);
			if (nexacro._GraphicsLib.isEmpty(value)) {
				value = null;
			}
			data[name] = value;
		}
		return data;
	};

	_pChartBase._destroySubControl = function () {
		if (this.board) {
			this.board.destroy();
			this.board = null;
		}

		if (this.title) {
			this.title.destroy();
			this.title = null;
		}

		if (this.legend) {
			this.legend.destroy();
			this.legend = null;
		}
		if (this.tooltip) {
			this.tooltip.destroy();
			this.tooltip = null;
		}
		var seriesset = this.seriesset;
		if (seriesset) {
			while (this.seriesset.length > 0) {
				this._deleteSeries(this.seriesset[0], 0);
			}
		}
		if (this._seriesGroup) {
			this._seriesGroup.destroy();
			this._seriesGroup = null;
			this._itemtextlist = null;
		}

		if (this._highlightGroup) {
			this._highlightGroup.destroy();
			this._highlightGroup = null;
		}
	};

	_pChartBase._appendSeries = function (contents) {
		var series, id, seriesContents = {
		}, seriesLen = -1;

		if (!this._isApplyContents && nexacro._GraphicsLib.isEmpty(contents)) {
			return seriesLen;
		}

		if (typeof (contents) == "object") {
			id = contents.id;
		}

		if (!id) {
			seriesLen = this.seriesset.length + 1;
			id = "Series" + seriesLen;
			contents.id = id;
		}

		if (!this._isApplyContents) {
			seriesContents = contents;
			this.contents.seriesset.push(seriesContents);
		}

		series = this._createSeries(id);
		if (series) {
			series._chart = this;
			seriesLen = this.seriesset.length;
			series._configIndex = seriesLen;
			this.seriesset.push(series);
			seriesLen = this.seriesset.length;

			this._drawing = true;
			this._setProperties(seriesContents, series);
			this._drawing = false;

			this._changedColorset = true;
		}

		return series;
	};

	_pChartBase._deleteSeries = function (series, index) {
		series._destroy(false);

		this._deleteContentsProp("seriesset", index);
		nexacro._GraphicsLibArray.removeAt(this.seriesset, index);

		var legend = this.legend;
		if (legend) {
			this._applyLegendItem();
		}

		nexacro._GraphicsLibArray.forEach(this.seriesset, function (obj, idx) {
			obj._configIndex = idx;
		}, this);
	};

	_pChartBase._createSubControl = function (contents) {
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

			if ((charttype == "RadarChart" || charttype == "BasicChart") && capNm == "Categoryaxis") {
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

		if ((charttype == "RadarChart" || charttype == "BasicChart") && !createdCategoryaxis) {
			var axis = this._createCategoryaxis();
			axis._afterSetProperties();
		}
	};

	_pChartBase._createBoard = function (o, id) {
		if (!this.board) {
			this.board = new nexacro.ChartBoardControl(id || "ChartBoardControl", this, this._graphicsControl);

			if (!this._seriesGroup) {
				this._seriesGroup = new nexacro.GraphicsGroup();
				this._seriesGroup.set_id("ChartSeriesGroup");
				this._graphicsControl.addChild(this._seriesGroup);
			}

			if (!this._highlightGroup) {
				this._highlightGroup = new nexacro.GraphicsGroup();
				this._highlightGroup.set_id("ChartHighlightGroup");
				this._graphicsControl.addChild(this._highlightGroup);
			}
		}
		return this.board;
	};

	_pChartBase._createTitle = function (o, id) {
		if (!this.title) {
			this.title = new nexacro.ChartTitleControl(id, this, this._graphicsControl);
		}

		return this.title;
	};

	_pChartBase._createLegend = function (o, id) {
		if (!this.legend) {
			this.legend = new nexacro.ChartLegendControl(id, this, this._graphicsControl);
		}

		this.legend._setData(this.seriesset);
		return this.legend;
	};

	_pChartBase._createTooltip = function (o, id) {
		if (!this.tooltip) {
			this.tooltip = new nexacro.ChartTooltipControl(id, this, this._graphicsControl);
		}

		return this.tooltip;
	};

	_pChartBase._mergeContents = function () {
		var target = arguments[0] || {
		}, isDeep = false, idx = 1, length = arguments.length, obj, prop, targetVal, objVal, objValIsArray, clone, pThis = this;

		if (typeof target === "boolean") {
			isDeep = target;
			target = arguments[1] || {
			};
			idx = 2;
		}

		if (typeof target !== "object" && !nexacro._GraphicsLib.isFunction(target)) {
			target = {
			};
		}

		for (; idx < length; idx++) {
			if ((obj = arguments[idx]) != null) {
				for (prop in obj) {
					targetVal = target[prop];
					objVal = obj[prop];

					if (target === objVal) {
						continue;
					}

					if (isDeep && objVal && (nexacro._GraphicsLib.isObject(objVal) || (objValIsArray = nexacro._GraphicsLib.isArray(objVal)))) {
						if (objValIsArray) {
							objValIsArray = false;
							clone = targetVal && nexacro._GraphicsLib.isArray(targetVal) ? targetVal : [];
						}
						else {
							clone = targetVal && nexacro._GraphicsLib.isObject(targetVal) ? targetVal : {
							};
						}

						target[prop] = pThis._mergeContents(isDeep, clone, objVal);
					}
					else if (objVal !== undefined) {
						target[prop] = objVal;
					}
				}
			}
		}

		return target;
	};

	_pChartBase._arrangeTitle = function () {
		var title = this.title;
		if (title && title.visible) {
			var boardRect = this._boardRect, clientWidth = this._getClientWidth(), clientHeight = this._getClientHeight(), titleValign, titlespacing = this._titlespacing || this._nullspacing, titleRect, titleHeight = 0, titleWidth = 0, titleLeft = 0, titleTop = 0, halign = title._halign || "center", valign = title._valign || "top", position = title._position || "top", titlerotate = title._titlerotate, xSize = 0;

			if (title._titleRect) {
				titleRect = title._getRect();
				titleHeight = titlespacing.top + titleRect.height + titlespacing.bottom;
				titleWidth = titlespacing.left + titleRect.width + titlespacing.right;

				if (position == "top") {
					titleTop = boardRect.top + titlespacing.top;
					boardRect.set_top(boardRect.top + titleHeight);
					boardRect.set_height(boardRect.height - titleHeight);
				}
				else if (position == "bottom") {
					titleTop = boardRect.bottom - titlespacing.bottom;
					boardRect.set_height(boardRect.height - titleHeight);
				}
				else if (position == "left") {
					titleLeft = titlespacing.left;
					boardRect.set_left(titleWidth);
					boardRect.set_width(boardRect.width - titleWidth);
				}
				else if (position == "right") {
					titleLeft = boardRect.right - titlespacing.right - titleRect.width;
					boardRect.set_width(boardRect.width - titleWidth);
				}

				if (position == "top" || position == "bottom") {
					xSize = clientWidth;
					if (halign == "center") {
						titleLeft = xSize / 2;
						titleLeft += titlespacing.left;
						titleLeft -= titlespacing.right;
					}
					else if (halign == "left") {
						titleLeft = titlespacing.left;
					}
					else if (halign == "right") {
						titleLeft = xSize;
						titleLeft -= titlespacing.right;
					}
				}
				else if (position == "left" || position == "right") {
					xSize = clientHeight - titleRect.height;
					if (valign == "center") {
						titleTop = xSize / 2;
						titleTop += titlespacing.top;
						titleTop -= titlespacing.bottom;
					}
					else if (valign == "top") {
						titleTop += titlespacing.top;
					}
					else if (valign == "bottom") {
						titleTop = clientHeight;
						titleTop -= titlespacing.bottom;
					}
				}
			}

			title._arrange(titleLeft, titleTop);
		}
	};

	_pChartBase._arrangeLegend = function () {
		var legend = this.legend;
		if (legend && legend.visible) {
			var boardRect = this._boardRect, clientWidth = this._getClientWidth(), clientHeight = this._getClientHeight(), legendRect, legendWidth = 0, legendHeight = 0, legendspacing = this._legendspacing || this._nullspacing, position = legend._position, halign = legend._halign, valign = legend._valign, legendLeft = 0, legendTop = 0, xSize = 0;

			legendRect = legend._getRect();
			legendWidth = legendspacing.left + legendRect.width + legendspacing.right;
			legendHeight = legendspacing.top + legendRect.height + legendspacing.bottom;

			if ((typeof legend.left == "number" && legend.left > -1)
				 && typeof legend.top == "number" && legend.top > -1) {
				legendLeft = legend.left;
				legendLeft += legendspacing.left;

				legendTop = legend.top;
				legendTop += legendspacing.top;
			}
			else {
				if (position == "top") {
					legendTop = boardRect.top + legendspacing.top;
					boardRect.set_top(boardRect.top + legendHeight);
					boardRect.set_height(boardRect.height - legendHeight);
				}
				else if (position == "bottom") {
					legendTop = boardRect.bottom - legendspacing.bottom - legendRect.height;
					boardRect.set_height(boardRect.height - legendHeight);
				}
				else if (position == "left") {
					legendLeft = legendspacing.left;
					boardRect.set_left(legendWidth);
					boardRect.set_width(boardRect.width - legendWidth);
				}
				else if (position == "right") {
					legendLeft = boardRect.right - legendspacing.right - legendRect.width;
					boardRect.set_width(boardRect.width - legendWidth);
				}

				if (position == "top" || position == "bottom") {
					xSize = clientWidth - legendRect.width;
					if (halign == "center") {
						legendLeft = xSize / 2;
						legendLeft += legendspacing.left;
						legendLeft -= legendspacing.right;
					}
					else if (halign == "left") {
						legendLeft = legendspacing.left;
					}
					else if (halign == "right") {
						legendLeft = xSize;
						legendLeft -= legendspacing.right;
					}
				}
				else if (position == "left" || position == "right") {
					var title = this.title;
					var titleValign = title ? title._valign : "top";

					xSize = clientHeight - legendRect.height;
					if (valign == "center") {
						legendTop = xSize / 2;
						legendTop += legendspacing.top;
						legendTop -= legendspacing.bottom;
					}
					else if (valign == "top") {
						if (title && (titleValign == "top" || titleValign == "middle")) {
							legendTop = boardRect.top;
						}
						legendTop += legendspacing.top;
					}
					else if (valign == "bottom") {
						legendTop = xSize;
						legendTop -= legendspacing.bottom;

						if (title && titleValign == "bottom") {
							legendTop = boardRect.bottom + legendRect.height + legendspacing.bottom;
						}
					}
				}
			}
			legend._arrange(legendLeft, legendTop);
		}
	};

	_pChartBase._arrangeBoard = function () {
		var board = this.board;
		if (board) {
			var boardRect = this._boardRect, border = board._border, boardLeft = boardRect.left, boardTop = boardRect.top, borderWidth = boardRect.width, borderHeight = boardRect.height, boardspacing = this._boardspacing || this._nullspacing;


			if (border) {
				boardLeft += border.left._width || 0;
				boardTop += border.top._width || 0;

				borderWidth -= border._getBorderWidth();
				borderHeight -= border._getBorderHeight();
			}

			boardLeft += boardspacing.left;
			boardTop += boardspacing.top;


			borderWidth -= boardspacing.left + boardspacing.right;
			borderHeight -= boardspacing.top + boardspacing.bottom;

			this._boardRectLeft = boardLeft;
			this._boardRectTop = boardTop;

			this._boardWidth = borderWidth;
			this._boardHeight = borderHeight;


			this._centerLeft = this._boardWidth / 2 + this._boardRectLeft;
			this._centerTop = this._boardHeight / 2 + this._boardRectTop;

			board._arrange(boardLeft, boardTop, borderWidth, borderHeight);
		}
	};

	_pChartBase._arrangeSeries = function () {
		var seriesset = this.seriesset;
		var useanimation = false;
		var starttimestamp = null;
		var loadanimation = false;
		var i = 0, effect, series;
		if (seriesset) {
			var seriesLength = seriesset.length, rearrange = this._rearrange, recreate = this._recreate;
			if (rearrange || recreate) {
				if (this.contents != null) {
					this._setSeriesGroup();
				}
			}
			if (seriesLength > 0) {
				if (!nexacro._isNull(this._seriesGroup)) {
					if (rearrange) {
						this._seriesGroup.setTransform("translate(" + this._boardRectLeft + "," + this._boardRectTop + ")");
						this._highlightGroup.setTransform("translate(" + this._boardRectLeft + "," + this._boardRectTop + ")");
					}
				}
			}

			if ((this._runanimation || (this.enableanimation && (rearrange || recreate))) && !this._ani_exception
				 && !nexacro.isDesignMode && !this._iscontents_editor) {
				if (this._loadanimation == true) {
					useanimation = true;
					starttimestamp = +new Date();
				}
			}
			for (i = 0; i < seriesLength; i++) {
				series = seriesset[i];
				if (series) {
					var redrawSeries = series._redrawSeries;
					if (rearrange || recreate) {
						redrawSeries = true;
					}
					if (useanimation && series._chart_aniframe_obj) {
						effect = series._chart_aniframe_obj;
						effect.enableanimation = useanimation;


						effect.starttime = starttimestamp;
					}
					series._draw(redrawSeries);
				}
			}
			for (i = 0; i < seriesLength; i++) {
				series = seriesset[i];
				if (series) {
					effect = series._chart_aniframe_obj;
					if (effect.isloadanimation) {
						loadanimation = true;
					}
				}
			}
			if (loadanimation) {
				if (!this._isanimationloading) {
					this._isanimationloading = true;
				}
			}
		}
	};

	_pChartBase._applyLegendItem = function () {
		if (this._drawing) {
			return;
		}

		var legend = this.legend;
		if (legend) {
			if (this.seriesset.length > 0) {
				var group = legend._group;
				if (legend.visible && !group.visible) {
					legend.on_apply_visible(legend.visible);
				}
			}
			else {
				legend.on_apply_visible(false);
			}

			legend._setData(this.seriesset);
			legend.on_apply_itemtext("[%titletext]");
			legend.on_apply_markerfillstyle(legend._markerfillstyle);
			legend.on_apply_markerlinestyle(legend._markerlinestyle);
			legend.on_apply_itemtextfont(legend._itemtextfont);
			legend.on_apply_itemtextcolor(legend._itemtextcolor);
		}
	};

	_pChartBase._setProperties = function (conts, subControl) {
		var setter;

		subControl._is_initprop = true;
		nexacro._GraphicsLibObject.Each(conts, function (name, val, object) {
			setter = "set_" + name;
			if (this[setter]) {
				this[setter](val);
			}
		}, subControl);
		subControl._is_initprop = false;

		if (subControl._afterSetProperties) {
			subControl._afterSetProperties();
		}
	};

	_pChartBase._setSeriesGroup = function () {
		if (!this.board) {
			this.board = new nexacro.ChartBoardControl("ChartBoardControl", this, this._graphicsControl);
		}
		if (this._seriesGroup) {
			this._seriesGroup.clear();
		}
		else if (!this._seriesGroup) {
			this._seriesGroup = new nexacro.GraphicsGroup();
			this._seriesGroup.set_id("ChartSeriesGroup");
			this._graphicsControl.addChild(this._seriesGroup);

			this._seriesGroup.clear();
		}

		if (this._highlightGroup) {
			this._highlightGroup.clear();
		}
		else if (!this._highlightGroup) {
			this._highlightGroup = new nexacro.GraphicsGroup();
			this._highlightGroup.set_id("ChartHighlightGroup");
			this._graphicsControl.addChild(this._highlightGroup);

			this._highlightGroup.clear();
		}
	};

	_pChartBase._setBoardBorderSize = function () {
		var board = this.board;
		if (board) {
			var border = board._border, boardBorderLeftWidth = 0, boardBorderTopWidth = 0, boardBorderRightWidth = 0, boardBorderBottomWidth = 0, boardspacing = this._boardspacing || this._nullspacing;

			if (border) {
				boardBorderLeftWidth = border.left._width || 0;
				boardBorderTopWidth = border.top._width || 0;
				boardBorderRightWidth = border.right._width || 0;
				boardBorderBottomWidth = border.bottom._width || 0;

				this._boardBorderSize = {
					"left" : boardBorderLeftWidth, 
					"top" : boardBorderTopWidth, 
					"right" : boardBorderRightWidth, 
					"bottom" : boardBorderBottomWidth
				};
			}

			this._boardBorderWidth = boardBorderLeftWidth + boardBorderRightWidth + boardspacing.left + boardspacing.right;
			this._boardBorderHeight = boardBorderTopWidth + boardBorderBottomWidth + boardspacing.top + boardspacing.bottom;
		}
	};

	_pChartBase._getBindableValue = function (prop) {
		var val;
		if (prop) {
			val = this[prop];
			if (val) {
				var type = typeof val;
				if (!(type == "number" || type == "string")) {
					if (val._bindtype == 1) {
						return val._bindexpr;
					}
					else {
						return val._value;
					}
				}
			}
		}

		return val;
	};

	delete _pChartBase;
}
_pChartBase._chageGroupObject = function (from, to, id, reverse) {
	var fromgroup, togroup, item;
	if (reverse) {
		fromgroup = to;
		togroup = from;
	}
	else {
		fromgroup = from;
		togroup = to;
	}
	for (var i = 0; i < id.length; i++) {
		item = fromgroup.getObjectByID(id[i]);
		if (item) {
			fromgroup.removeChild(item);
			togroup.addChild(item);
			item._painted = 0;
			item._drawflags = 0;
		}
		else {
			item = togroup.getObjectByID(id[i]);
			if (item) {
				togroup.removeChild(item);
				togroup.addChild(item);
				item._painted = 0;
				item._drawflags = 0;
			}
		}
	}
};
_pChartBase._setChangeInBoardAreaPos = function (item) {
	if (item && item._type_name == "GraphicsText") {
		var labelBoundRect = item.getGlobalBoundRect(), gridrect = this.board._gridRect, textW = labelBoundRect.width, textH = labelBoundRect.height, itemLeft = labelBoundRect.left, itemTop = labelBoundRect.top;

		var pos = item.getCenter();
		var cx = pos.x;
		var cy = pos.y;
		var _txtWidthHalf = (item._txtSize[0] || textW) / 2;
		var _txtHeightHalf = (item._txtSize[1] || textH) / 2;
		if (itemLeft <= gridrect.x) {
			if (cx - (_txtWidthHalf) < 0) {
				item.set_x(item.x + (Math.abs(cx - _txtWidthHalf)) + 1);
			}
		}
		else if ((itemLeft + textW) >= gridrect.width) {
			var rectwidth = gridrect.width;
			if (cx + (_txtWidthHalf) > rectwidth) {
				item.set_x(item.x - ((cx + _txtWidthHalf) - rectwidth) - 1);
			}
		}
		if (itemTop <= gridrect.y) {
			if (cy - (_txtHeightHalf) < 0) {
				item.set_y(item.y + (Math.abs(cy - _txtHeightHalf)));
			}
		}
		else if ((itemTop + textH) >= gridrect.height) {
			var rectheight = gridrect.height;
			if (cy + (_txtHeightHalf) > rectheight) {
				item.set_y(item.y - ((cy + _txtHeightHalf) - rectheight));
			}
		}
	}
};
if (!nexacro._AxisChartBase) {
	nexacro._AxisChartBase = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._ChartBase.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this.valueaxes = [];
		this._axes = [];
		this._xaxes = [];
		this._yaxes = [];
	};

	var _pAxisChartBase = nexacro._createPrototype(nexacro._ChartBase, nexacro._AxisChartBase);
	nexacro._AxisChartBase.prototype = _pAxisChartBase;
	_pAxisChartBase._type_name = "AxisChartBase";


	_pAxisChartBase.hrangebar = null;
	_pAxisChartBase.vrangebar = null;
	_pAxisChartBase.valueaxes = null;
	_pAxisChartBase.crosshair = null;
	_pAxisChartBase.selection = null;

	_pAxisChartBase.hrangebarspacing = "";
	_pAxisChartBase.vrangebarspacing = "";
	_pAxisChartBase.rangezoom = "none";

	_pAxisChartBase._hrangebarspacing = null;
	_pAxisChartBase._vrangebarspacing = null;
	_pAxisChartBase._axes = null;
	_pAxisChartBase._xaxes = null;
	_pAxisChartBase._yaxes = null;
	_pAxisChartBase._isstepline = false;

	_pAxisChartBase.on_destroy_contents = function () {
		if (this.valueaxes.length) {
			this.deleteAllValueaxis();
		}

		if (this.hrangebar) {
			this.hrangebar.destroy();
			this.hrangebar = null;
		}
		if (this.vrangebar) {
			this.vrangebar.destroy();
			this.vrangebar = null;
		}
		if (this.crosshair) {
			this.crosshair.destroy();
			this.crosshair = null;
		}
		if (this.selection) {
			this.selection.destroy();
			this.selection = null;
		}
		if (this._hrangebarspacing) {
			this._hrangebarspacing = null;
		}

		if (this._vrangebarspacing) {
			this._vrangebarspacing = null;
		}

		this.vrangebarspacing = null;
		this.hrangebarspacing = null;
		this.rangezoom = null;
		this.valueaxes = null;
		this._axes = null;
		this._xaxes = null;
		this._yaxes = null;
		this._isstepline = null;
		nexacro._ChartBase.prototype.on_destroy_contents.call(this);
	};



	_pAxisChartBase.set_hrangebar = function () {
	};
	_pAxisChartBase.set_vrangebar = function () {
	};
	_pAxisChartBase.set_crosshair = function () {
	};
	_pAxisChartBase.set_selection = function () {
	};

	_pAxisChartBase.set_rangezoom = function (val) {
		var rangezoom_enum = ["none", "x", "y", "xy"];
		if (rangezoom_enum.indexOf(val) == -1) {
			return;
		}

		if (this.rangezoom != val) {
			this.rangezoom = val;
			this.on_apply_rangezoom();
		}
		this._draw();
	};

	_pAxisChartBase.on_apply_rangezoom = function () {
		this._rearrange = true;
	};

	_pAxisChartBase.set_hrangebarspacing = function (val) {
		this.hrangebarspacing = val;
		if (val) {
			if (this._hrangebarspacing == null || this._hrangebarspacing.value != val) {
				var hrangebarspacing = nexacro.PaddingObject(val);
				this._hrangebarspacing = hrangebarspacing;
				this.on_apply_hrangebarspacing();
			}
		}
		else {
			if (this._hrangebarspacing) {
				this._hrangebarspacing = this._nullspacing;
				this.on_apply_hrangebarspacing();
			}
		}

		this._draw();
	};

	_pAxisChartBase.on_apply_hrangebarspacing = function () {
		if (this.hrangebar) {
			this._rearrange = true;
			this._changedData = true;
		}
	};

	_pAxisChartBase.set_vrangebarspacing = function (val) {
		this.vrangebarspacing = val;
		if (val) {
			if (this._vrangebarspacing == null || this._vrangebarspacing.value != val) {
				var vrangebarspacing = nexacro.PaddingObject(val);
				this._vrangebarspacing = vrangebarspacing;
				this.on_apply_vrangebarspacing();
			}
		}
		else {
			if (this._vrangebarspacing) {
				this._vrangebarspacing = this._nullspacing;
				this.on_apply_vrangebarspacing();
			}
		}

		this._draw();
	};

	_pAxisChartBase.on_apply_vrangebarspacing = function () {
		if (this.vrangebar) {
			this._rearrange = true;
			this._changedData = true;
		}
	};

	_pAxisChartBase.set_valueaxes = function () {
	};

	_pAxisChartBase.getValueaxisByID = function (id) {
		var index = nexacro._GraphicsLibArray.indexOfProp(this.valueaxes, "id", id);
		if (index > -1) {
			return this.valueaxes[index];
		}
		return null;
	};

	_pAxisChartBase.setValueaxis = function (id, contents) {
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

	_pAxisChartBase.deleteValueaxis = function (val) {
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

	_pAxisChartBase.deleteAllValueaxis = function () {
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

	_pAxisChartBase.showValueaxis = function (id) {
		var axis = this.getValueaxisByID(id);
		if (axis) {
			axis.set_visible(true);
		}
		this._draw();
	};

	_pAxisChartBase.hideValueaxis = function (id) {
		var axis = this.getValueaxisByID(id);
		if (axis) {
			axis.set_visible(false);
		}
		this._draw();
	};

	_pAxisChartBase.showHRangebar = function () {
		if (this.hrangebar) {
			this.hrangebar.set_visible(true);
		}
		this._draw();
	};

	_pAxisChartBase.hideHRangebar = function () {
		if (this.hrangebar) {
			this.hrangebar.set_visible(false);
		}
		this._draw();
	};

	_pAxisChartBase.showVRangebar = function () {
		if (this.vrangebar) {
			this.vrangebar.set_visible(true);
		}
		this._draw();
	};

	_pAxisChartBase.hideVRangebar = function () {
		if (this.vrangebar) {
			this.vrangebar.set_visible(false);
		}
		this._draw();
	};

	_pAxisChartBase.showCrosshair = function () {
		if (this.crosshair) {
			this.crosshair.set_visible(true);
		}
		this._draw();
	};

	_pAxisChartBase.hideCrosshair = function () {
		if (this.crosshair) {
			this.crosshair.set_visible(false);
		}
		this._draw();
	};
	_pAxisChartBase.showSelection = function () {
		if (this.selection) {
			this.selection.set_visible(true);
		}
		this._draw();
	};

	_pAxisChartBase.hideSelection = function () {
		if (this.selection) {
			this.selection.set_visible(false);
		}
		this._draw();
	};



	_pAxisChartBase._createSeriesset = function (o, id) {
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

	_pAxisChartBase.setSeries = function (id, contents) {
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

	_pAxisChartBase._measure = function () {
		nexacro._ChartBase.prototype._measure.call(this);

		if (this._recreate) {
			this._initAxes();
			this._setDatapointFormat();
			this._setDatapoint();
			this._setDataMinMax();
			this._resetAxes();
		}

		this._setAxes();
	};
	_pAxisChartBase._arrangerangezoomselection = function () {
		nexacro._ChartBase.prototype._arrangerangezoomselection.call(this);

		if (this.selection && this.selection._rangezoomdraw) {
			if (this.selection._type.indexOf("x") != -1 && this.rangezoom.indexOf("x") != -1) {
				if (this.hrangebar && this.hrangebar._group.visible) {
					this.hrangebar._startdata = Math.min(this.selection._xstartdata, this.selection._xenddata);
					this.hrangebar._enddata = Math.max(this.selection._xstartdata, this.selection._xenddata);
				}
				else {
					this.selection._xaxis._scrollMin = this.selection._xaxis._min = Math.min(this.selection._xstartdata, this.selection._xenddata);
					this.selection._xaxis._scrollMax = this.selection._xaxis._max = Math.max(this.selection._xstartdata, this.selection._xenddata);
				}
			}
			if (this.selection._type.indexOf("y") != -1 && this.rangezoom.indexOf("y") != -1) {
				if (this.vrangebar && this.vrangebar._group.visible) {
					this.vrangebar._startdata = Math.min(this.selection._ystartdata, this.selection._yenddata);
					this.vrangebar._enddata = Math.max(this.selection._ystartdata, this.selection._yenddata);
				}
				else {
					this.selection._yaxis._scrollMin = this.selection._yaxis._min = Math.min(this.selection._ystartdata, this.selection._yenddata);
					this.selection._yaxis._scrollMax = this.selection._yaxis._max = Math.max(this.selection._ystartdata, this.selection._yenddata);
				}
			}
		}
	};
	_pAxisChartBase._arrange = function () {
		nexacro._ChartBase.prototype._arrange.call(this);


		if (this._rearrange) {
			this._arrangeAxesRect();
			this._arrangeRangebarBoardRect();
		}

		this._arrangeAxes();

		if (this._rearrange) {
			this._arrangeBoard();
		}

		this._arrangeHrangeTrackbar();
		this._arrangeVrangeTrackbar();
		this._arrangeSeries();
	};

	_pAxisChartBase._setSeries = function () {
		var colorset = this._colorset;
		var highlightcolorset = this._highlightcolorset;
		var selectcolorset = this._selectcolorset;
		var colorcnt = 0;

		nexacro._GraphicsLibArray.forEach(this.seriesset, function (obj, index) {
			if (obj) {
				if (this._changedData) {
					obj._setData();
				}

				if (nexacro._isNull(obj._data)) {
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
			}
		}, this);
	};

	_pAxisChartBase._appendValueaxis = function (contents) {
		var axis, id, axisContents = {
		}, valueaxesLeng = -1, charttype = this._type_name, seriesset = this.seriesset, s1, s2, linevisible1 = false, location, i = 0, linevisible2 = false;

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

		if (charttype == "BasicChart") {
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
		}

		axis = new nexacro.ChartAxisControl(id, this, this._graphicsControl);
		axis._type = "valueAxis";

		if (charttype == "BasicChart") {
			location = contents.opposite ? "right" : "left";
		}
		else {
			if (this.valueaxes.length == 0) {
				location = contents.opposite || "bottom";
				axis._location = location;
			}

			if (this.valueaxes.length == 1) {
				location = contents.opposite || "left";
				axis._location = location;
			}
		}

		if (charttype == "BasicChart" && !this._isCompositeSeries && this.rotateaxis && this._rotateaxisY) {
			location = "bottom";
		}

		if (charttype == "BubbleChart") {
			if (seriesset) {
				var valueaxes = this.valueaxes;
				for (i = seriesset.length - 1; i > -1; i--) {
					var series = seriesset[i];
					if (series) {
						if (!series._xaxis) {
							var valueaxis = valueaxes[0];
							if (valueaxis) {
								valueaxis._direction = "x";
								series.on_apply_valueaxis(valueaxis.id);
								break;
							}
						}

						if (!series._yaxis) {
							var value2axis = valueaxes[1];
							if (value2axis) {
								value2axis._direction = "y";
								series.on_apply_value2axis(value2axis.id);
								break;
							}
						}
					}
				}
			}
		}

		if (axis) {
			this._drawing = true;
			this._setProperties(axisContents, axis);
			this._drawing = false;

			axis.on_apply_opposite(contents.opposite);

			this.valueaxes.push(axis);
			this._axes.push(axis);

			if (location == "top" || location == "bottom") {
				this._xaxes.push(axis);
			}
			else {
				this._yaxes.push(axis);
			}
		}

		if (axis) {
			valueaxesLeng = this.valueaxes.length - 1;
		}

		return axis;
	};

	_pAxisChartBase._initAxes = function () {
		nexacro._GraphicsLibArray.Each(this._axes, function (axis, i) {
			if (axis) {
				axis._initData();
			}
		});
	};

	_pAxisChartBase._resetAxes = function () {
		nexacro._GraphicsLibArray.Each(this._axes, function (axis, i) {
			if (axis) {
				axis._resetData();
			}
		});
	};
	_pAxisChartBase._createVrangebar = function (o, id) {
		var charttype = this._type_name;

		if (!this.vrangebar) {
			this.vrangebar = new nexacro.ChartRangebarControl(id, this, this._graphicsControl, true);
		}

		return this.vrangebar;
	};
	_pAxisChartBase._createHrangebar = function (o, id) {
		var charttype = this._type_name;

		if (!this.hrangebar) {
			this.hrangebar = new nexacro.ChartRangebarControl(id, this, this._graphicsControl, false);
		}

		return this.hrangebar;
	};
	_pAxisChartBase._createCrosshair = function (o, id) {
		if (!this.crosshair) {
			this.crosshair = new nexacro.ChartCrosshairControl(id, this, this._graphicsControl);
		}

		return this.crosshair;
	};
	_pAxisChartBase._createSelection = function (o, id) {
		if (!this.selection) {
			this.selection = new nexacro.ChartSelectionControl(id, this, this._graphicsControl);
		}

		return this.selection;
	};
	_pAxisChartBase._setDatapointFormat = function () {
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
	};

	_pAxisChartBase._setDatapoint = function () {
		var seriesset = this.seriesset, s, categoryaxis, valueaxis, ps, sdata, pointshape, xaxis, yaxis;

		for (var i = 0; i < seriesset.length; i++) {
			s = seriesset[i];
			if (s) {
				if (s.linetype == "step") {
					this._isstepline = true;
				}
			}
		}
		for (i = 0; i < seriesset.length; i++) {
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

				var stacktype = s._stacktype == "none" ? this.stacktype : s._stacktype, bargrouping = this._bargrouping;
				pointshape = s.pointshape;

				if ((stacktype == "normal" || stacktype == "percent" || bargrouping) && this.seriesset.length > 1) {
					if (s.barvisible || s.linevisible || (s.linevisible && s.lineareavisible)) {
						this._setSeriesDatapoints(s);
					}
					else {
						if (!s.lineareavisible && s.pointvisible) {
							this._setSeriesDatapoints(s);
						}
						else {
							continue;
						}
					}
				}
				else {
					this._setSeriesDatapoints(s);
				}

				xaxis = s._xaxis;
				yaxis = s._yaxis;

				var charttype = this._type_name;
				if (charttype == "BasicChart") {
					if (s.barvisible || s.pointvisible || s.linevisible) {
						xaxis._used = true;
						yaxis._used = true;
					}
				}
				else {
					if (s.visible) {
						xaxis._used = true;
						yaxis._used = true;
					}
				}

				if (xaxis._type == "categoryAxis") {
					if (!xaxis._isTimeAxis) {
						xaxis.ticks = xaxis._categoriesTickGenerator;
					}

					xaxis._setCategoriesData(s._datapoints);
				}
				else if (yaxis._type == "categoryAxis") {
					if (!yaxis._isTimeAxis) {
						yaxis.ticks = yaxis._categoriesTickGenerator;
					}

					yaxis._setCategoriesData(s._datapoints);
				}

				if ((pointshape == "square") || (pointshape == "diamond") || (pointshape == "triangle") || (pointshape == "cross")) {
					if (s._pointshapeObj[pointshape]) {
						seriesset[i]._pointshape = s._pointshapeObj[pointshape];
					}
				}
			}
		}
	};

	_pAxisChartBase._initSeriesDatapoints = function (series) {
		series._datapoints = {
			points : []
		};
	};

	_pAxisChartBase._setSeriesDatapointsFormat = function (series) {
		var format = series._datapoints.format, isXCategory = false, isYCategory = false;

		if (!series._xaxis || !series._yaxis) {
			return false;
		}

		if (series._xaxis._type == "categoryAxis" && !series._xaxis._isTimeAxis) {
			isXCategory = true;
		}
		if (series._yaxis._type == "categoryAxis" && !series._yaxis._isTimeAxis) {
			isYCategory = true;
		}

		if (!format) {
			format = [];
			format.push({
				x : true, 
				category : isXCategory, 
				required : true
			});
			format.push({
				y : true, 
				category : isYCategory, 
				required : true
			});

			if (series.barvisible || series.linevisible || (series.linevisible && series.lineareavisible)) {
				format.push({
					y : true, 
					category : isYCategory, 
					required : false, 
					defaultValue : 0
				});

				if (this.rotateaxis && !this._isCompositeSeries) {
					delete format[format.length - 1].y;
					format[format.length - 1].x = true;
				}
			}

			series._datapoints.format = format;
		}
	};

	_pAxisChartBase._setSeriesDatapoints = function (series) {
		var datapoints, format, pointsize, points, insertSteps, data, p, val, f, xaxis = series._xaxis, yaxis = series._yaxis;

		datapoints = series._datapoints;
		format = datapoints.format;
		datapoints.pointsize = format.length;
		pointsize = datapoints.pointsize;
		points = datapoints.points;
		insertSteps = (series.linevisible && series.linetype == "step") || this._isstepline;
		data = series._data;
		var i, j, k;
		for (i = j = 0; i < data.length; i++, j += pointsize) {
			p = data[i];

			var nullify = p == null;
			if (!nullify) {
				for (k = 0; k < pointsize; k++) {
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

						if (val == null) {
							if (f.required) {
								nullify = true;
							}
							if (f.defaultValue != null) {
								val = f.defaultValue;
							}
						}
					}

					points[j + k] = val;
				}
			}

			if (nullify) {
				for (k = 0; k < pointsize; k++) {
					val = points[j + k];
					if (val != null) {
						f = format[k];

						if (f.x) {
							if (xaxis && xaxis._updateMinMax) {
							}
						}
						if (f.y) {
							if (yaxis && yaxis._updateMinMax) {
							}
						}
					}
					else {
						points[j + k] = null;
					}
				}
			}
			{

				if (insertSteps && j > 0 && points[j - pointsize] != points[j]) {
					for (k = 0; k < pointsize; k++) {
						points[j + pointsize + k] = points[j + k];
					}

					points[j + 1] = points[j - pointsize + 1];
					j += pointsize;
				}
			}
		}
	};

	_pAxisChartBase._setDataMinMax = function () {
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
	_pAxisChartBase._getcheckTimeAxisBarWidth = function (barwidth) {
		var _resizeBar = barwidth;
		if (this.categoryaxis && this.categoryaxis._isTimeAxis && this.categoryaxis._delta) {
			_resizeBar = barwidth * this.categoryaxis._delta;
		}
		return _resizeBar;
	};
	_pAxisChartBase._setSeriesDataMinMax = function (series) {
		var datapoints = series._datapoints, xaxis = series._xaxis, yaxis = series._yaxis, xmin = Number.POSITIVE_INFINITY, ymin = Number.POSITIVE_INFINITY, xmax = Number.NEGATIVE_INFINITY, ymax = Number.NEGATIVE_INFINITY, points, pointsize, val, f, format;

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
		if (xaxis._tickmin) {
			xmin = xaxis._tickmin;
		}
		if (xaxis._tickmax) {
			xmax = xaxis._tickmax;
		}
		if (yaxis._tickmin) {
			ymin = yaxis._tickmin;
		}
		if (yaxis._tickmax) {
			ymax = yaxis._tickmax;
		}
		if (series.barvisible) {
			var delta, barwidth = series._barsize || this._barsize, stacktype = series._stacktype == "none" ? this.stacktype : series._stacktype;

			if (this.seriesset.length > 1 && this._bargrouping && series._groupbarwidth != null) {
				series._barsize = this._toGroupBarWidth(series._groupbarwidth);
				barwidth = series._barsize;
			}
			else if (this.seriesset.length > 1 && this._bargrouping && series._groupbarwidth == null) {
				barwidth = this._barsize;
			}
			else {
				series.on_apply_barsize(series.barsize);

				barwidth = series._barsize || this._barsize;
			}
			barwidth = this._getcheckTimeAxisBarWidth(barwidth);
			switch (series._baralign) {
				case "left":
					delta = 0;
					break;
				case "right":
					delta = -barwidth;
					break;
				default:
					delta = -barwidth / 2;
			}

			if (this.rotateaxis && !this._isCompositeSeries) {
				ymin += delta;
				ymax += delta + barwidth;
			}
			else {
				xmin += delta;
				xmax += delta + barwidth;
			}
		}

		if (xaxis && xaxis._updateMinMax) {
			xaxis._updateMinMax(xmin, xmax);
		}
		if (yaxis && yaxis._updateMinMax) {
			yaxis._updateMinMax(ymin, ymax);
		}
	};

	_pAxisChartBase._setAxes = function () {
		if (this._axes) {
			var hrangebar = this.hrangebar;
			var vrangebar = this.vrangebar;
			var clientWidth = this._getClientWidth();
			var clientHeight = this._getClientHeight();
			var changedData = this._changedData;
			var categoryaxis;

			nexacro._GraphicsLibArray.Each(this._axes, function (axis, i) {
				if (!axis._used) {
					if (axis._title) {
						axis._group.removeChild(axis._title);
						axis._title.destroy();
						delete axis._title;
						axis._title = null;
					}
					return;
				}

				if (changedData) {
					var charttype = this._type_name;

					this._arrangerangezoomselection();

					if (hrangebar && hrangebar._group.visible && !hrangebar._axes && axis._direction == "x") {
						if (charttype == "BasicChart" && this.categoryaxis && this.categoryaxis._direction == "x") {
							categoryaxis = this.categoryaxis;
							hrangebar._setRange(categoryaxis);
						}
						else {
							hrangebar._setRange(axis);
						}
					}
					if (vrangebar && vrangebar._group.visible && !vrangebar._axes && axis._direction == "y") {
						if (charttype == "BasicChart" && this.categoryaxis && this.categoryaxis._direction == "y") {
							categoryaxis = this.categoryaxis;
							vrangebar._setRange(categoryaxis);
						}
						else {
							vrangebar._setRange(axis);
						}
					}
					axis._changedTicks = true;
				}

				axis._setData(clientWidth, clientHeight);

				if (this._rearrange) {
					axis._measureAxisRect();
				}
			}, this);
			if (this._reset == true) {
				this._reset = false;
			}
		}
	};

	_pAxisChartBase._arrangeAxesRect = function () {
		var axes = this._axes;
		if (axes) {
			var boardRect = this._boardRect, axis, axisRect, axisRectLeft = 0, axisRectTop = 0, gap = 0;

			for (var i = axes.length - 1; i >= 0; --i) {
				axis = axes[i];
				if (axis) {
					if (!axis._used) {
						axis.on_apply_visible(false);
						axis.on_apply_boardlinevisible(false);
						continue;
					}

					axisRect = axis._axisRect._getRect(false, true);
					gap = axis.gap || 0;

					if (axis._direction == "x") {
						if (axis._location == "top") {
							axisRectTop = boardRect.top;
							boardRect.set_top(boardRect.top + axisRect.height + gap);
							boardRect.set_height(boardRect.height - gap - axisRect.height);
						}
						else {
							boardRect.set_top(boardRect.top);
							boardRect.set_height(boardRect.height - gap - axisRect.height);
							axisRectTop = boardRect.bottom + gap;
						}

						axis._axisRect.set_y(axisRectTop);
					}
					else {
						if (axis._location == "left") {
							axisRectLeft = boardRect.left;
							boardRect.set_left(boardRect.left + axisRect.width + gap);
							boardRect.set_width(boardRect.width - gap - axisRect.width);
						}
						else {
							boardRect.set_left(boardRect.left);
							boardRect.set_width(boardRect.width - gap - axisRect.width);
							axisRectLeft = boardRect.left + boardRect.width + gap;
						}
						axis._axisRect.set_x(axisRectLeft);
					}
				}
			}
		}
	};

	_pAxisChartBase._arrangeHrangebar = function () {
		var hrangebar = this.hrangebar;
		if (hrangebar && hrangebar._group.visible) {
			var boardRect = this._boardRect, hrangebarspacing = this._hrangebarspacing || this._nullspacing, hrangebarRect, hrangebarRectHeight = 0, hrangebarWidth = 0, hrangebarHeight = 0, hrangebarLeft = 0, hrangebarTop = 0, boardBorderSize = this._boardBorderSize, boardBorderWidth = this._boardBorderWidth, boardspacing = this._boardspacing || this._nullspacing;


			hrangebarRect = hrangebar._getRect();
			if (hrangebarRect && hrangebarRect.height > 0) {
				hrangebarRectHeight = hrangebarRect.height;
				hrangebarHeight = hrangebarspacing.top + hrangebarRectHeight + hrangebarspacing.bottom;
			}
			hrangebarLeft = boardRect.left + boardspacing.left + boardBorderSize.left;

			var axisPos;
			var charttype = this._type_name;

			if (charttype == "BasicChart" && this.categoryaxis && this.categoryaxis._direction == "x") {
				axisPos = this.categoryaxis._location;
			}
			else {
				if (hrangebar._axis) {
					axisPos = hrangebar._axis._location;
				}
				else if (this._xaxes.length > 0) {
					axisPos = this._xaxes[0]._location;
				}
			}

			if (axisPos == "bottom") {
				hrangebarTop = boardRect.top + hrangebarspacing.top;
				boardRect.set_top(boardRect.top + hrangebarHeight);
				boardRect.set_height(boardRect.height - hrangebarHeight);
			}
			else if (axisPos == "top") {
				hrangebarTop = boardRect.bottom - hrangebarspacing.bottom - hrangebarRectHeight;
				boardRect.set_height(boardRect.height - hrangebarHeight);
			}


			var linestyle = hrangebar._linestyle, borderWidth = 0;
			if (linestyle) {
				borderWidth = linestyle._getBorderLeftWidth();
			}
			else {
				borderWidth = 1;
			}
			hrangebar._setRangebarRectWidth(boardRect.width - borderWidth - boardBorderWidth);
			hrangebar._arrange(hrangebarLeft, hrangebarTop);
		}
	};

	_pAxisChartBase._arrangeHrangeTrackbar = function () {
		var hrangebar = this.hrangebar;
		if (hrangebar && hrangebar._group.visible) {
			if (this._rearrange || hrangebar._rearrange) {
				hrangebar._arrangeTrackbar();
			}
		}
	};
	_pAxisChartBase._arrangeVrangebar = function () {
		var vrangebar = this.vrangebar;
		if (vrangebar && vrangebar._group.visible) {
			var boardRect = this._boardRect, vrangebarspacing = this._vrangebarspacing || this._nullspacing, vrangebarRect, vrangebarRectHeight = 0, vrangebarRectWidth = 0, vrangebarWidth = 0, vrangebarHeight = 0, vrangebarLeft = 0, vrangebarTop = 0, boardBorderSize = this._boardBorderSize, boardBorderWidth = this._boardBorderWidth, boardspacing = this._boardspacing || this._nullspacing;

			vrangebarRect = vrangebar._getRect();
			if (vrangebarRect && vrangebarRect.width > 0) {
				vrangebarRectWidth = vrangebarRect.width;
				vrangebarWidth = vrangebarspacing.left + vrangebarRectWidth + vrangebarspacing.right;
			}
			vrangebarTop = boardRect.top + vrangebarspacing.top;

			var axisPos;
			var charttype = this._type_name;


			if (charttype == "BasicChart" && this.categoryaxis && this.categoryaxis._direction == "y") {
				axisPos = this.categoryaxis._location;
			}
			else {
				if (vrangebar._axis) {
					axisPos = vrangebar._axis._location;
				}
				else if (this._yaxes.length > 0) {
					axisPos = this._yaxes[0]._location;
				}
			}


			if (axisPos == "right") {
				vrangebarLeft = boardRect.left + boardspacing.left;
				boardRect.set_left(boardRect.left + vrangebarWidth);
				boardRect.set_width(boardRect.width - vrangebarWidth);
			}
			else if (axisPos == "left") {
				vrangebarLeft = boardRect.right - vrangebarspacing.right - vrangebarRectWidth;
				boardRect.set_width(boardRect.width - vrangebarWidth);
			}

			var linestyle = vrangebar._linestyle, borderWidth = 0;
			if (linestyle) {
				borderWidth = linestyle._getBorderTopWidth();
			}
			else {
				borderWidth = 1;
			}
			vrangebar._setRangebarRectHeight(boardRect.height - borderWidth - boardBorderWidth);
			vrangebar._arrange(vrangebarLeft, vrangebarTop);
		}
	};

	_pAxisChartBase._arrangeRangebarBoardRect = function () {
		var vrangebar = this.vrangebar;
		var hrangebar = this.hrangebar;
		var boardRect = this._boardRect, vrangebarspacing = this._vrangebarspacing || this._nullspacing, hrangebarspacing = this._hrangebarspacing || this._nullspacing, boardBorderSize = this._boardBorderSize, boardBorderWidth = this._boardBorderWidth, boardspacing = this._boardspacing || this._nullspacing, hrangebarRect, hrangebarRectHeight = 0, hrangebarWidth = 0, hrangebarHeight = 0, hrangebarLeft = 0, hrangebarTop = 0, vrangebarRect, vrangebarRectHeight = 0, vrangebarRectWidth = 0, vrangebarWidth = 0, vrangebarHeight = 0, vrangebarLeft = 0, vrangebarTop = 0;
		var linestyle, borderWidth = 0, axisPos, charttype = this._type_name;

		if (hrangebar && hrangebar._group.visible) {
			hrangebarRect = hrangebar._getRect();
			if (hrangebarRect && hrangebarRect.height > 0) {
				hrangebarRectHeight = hrangebarRect.height;
				hrangebarHeight = hrangebarspacing.top + hrangebarRectHeight + hrangebarspacing.bottom;
			}
			hrangebarLeft = boardRect.left + boardspacing.left + boardBorderSize.left;

			if (charttype == "BasicChart" && this.categoryaxis && this.categoryaxis._direction == "x") {
				axisPos = this.categoryaxis._location;
			}
			else {
				if (hrangebar._axis) {
					axisPos = hrangebar._axis._location;
				}
				else if (this._xaxes.length > 0) {
					axisPos = this._xaxes[0]._location;
				}
			}

			if (axisPos == "bottom") {
				hrangebarTop = boardRect.top + hrangebarspacing.top;
				boardRect.set_top(boardRect.top + hrangebarHeight);
				boardRect.set_height(boardRect.height - hrangebarHeight);
			}
			else if (axisPos == "top") {
				hrangebarTop = boardRect.bottom - hrangebarspacing.bottom - hrangebarRectHeight;
				boardRect.set_height(boardRect.height - hrangebarHeight);
			}
		}
		if (vrangebar && vrangebar._group.visible) {
			vrangebarRect = vrangebar._getRect();
			if (vrangebarRect && vrangebarRect.width > 0) {
				vrangebarRectWidth = vrangebarRect.width;
				vrangebarWidth = vrangebarspacing.left + vrangebarRectWidth + vrangebarspacing.right;
			}
			vrangebarTop = boardRect.top + boardBorderSize.top + boardspacing.top;


			if (charttype == "BasicChart" && this.categoryaxis && this.categoryaxis._direction == "y") {
				axisPos = this.categoryaxis._location;
			}
			else {
				if (vrangebar._axis) {
					axisPos = vrangebar._axis._location;
				}
				else if (this._yaxes.length > 0) {
					axisPos = this._yaxes[0]._location;
				}
			}


			if (axisPos == "right") {
				vrangebarLeft = boardRect.left + boardspacing.left;
				boardRect.set_left(boardRect.left + vrangebarWidth);
				boardRect.set_width(boardRect.width - vrangebarWidth);
			}
			else if (axisPos == "left") {
				vrangebarLeft = boardRect.right - vrangebarspacing.right - vrangebarRectWidth;
				boardRect.set_width(boardRect.width - vrangebarWidth);
			}
		}
		hrangebarLeft = boardRect.left + boardspacing.left + boardBorderSize.left;
		vrangebarTop = boardRect.top + boardBorderSize.top + boardspacing.top;
		if (hrangebar && hrangebar._group.visible) {
			linestyle = hrangebar._linestyle, 
				borderWidth = 0;
			if (linestyle) {
				borderWidth = linestyle._getBorderLeftWidth();
			}
			else {
				borderWidth = 1;
			}
			hrangebar._setRangebarRectWidth(boardRect.width - borderWidth - boardBorderWidth);
			hrangebar._arrange(hrangebarLeft, hrangebarTop);
		}
		if (vrangebar && vrangebar._group.visible) {
			linestyle = vrangebar._linestyle, 
				borderWidth = 0;
			if (linestyle) {
				borderWidth = linestyle._getBorderTopWidth();
			}
			else {
				borderWidth = 1;
			}
			vrangebar._setRangebarRectHeight(boardRect.height - borderWidth - boardBorderWidth);
			vrangebar._arrange(vrangebarLeft, vrangebarTop);
		}
	};
	_pAxisChartBase._arrangeVrangeTrackbar = function () {
		var vrangebar = this.vrangebar;
		if (vrangebar && vrangebar._group.visible) {
			if (this._rearrange || vrangebar._rearrange) {
				vrangebar._arrangeTrackbar();
			}
		}
	};
	_pAxisChartBase._arrangeAxes = function () {
		var axes = this._axes, axis, boardRect = this._boardRect, boardBorderSize = this._boardBorderSize, boardBorderWidth = this._boardBorderWidth, boardBorderHeight = this._boardBorderHeight, boardspacing = this._boardspacing || this._nullspacing, left = 0, top = 0, width = 0, height = 0, hrangebar = this.hrangebar, vrangebar = this.vrangebar, rearrange = this._rearrange, charttype = this._type_name, categoryaxis, applyTickgapToHRangebar = false, applyTickgapToVRangebar = false;

		for (var i = 0; i < axes.length; i++) {
			axis = axes[i];
			var tickendspace = 0;
			if (axis) {
				tickendspace = axis._tickendspace;
			}

			if (charttype == "BasicChart") {
				var rotateaxis = this.rotateaxis;
				var boardWidth = boardRect.width - boardBorderWidth;
				var tickstartgap;
				var tickendgap;

				categoryaxis = this.categoryaxis;
				if (categoryaxis) {
					tickstartgap = categoryaxis.tickstartgap;
					tickendgap = categoryaxis.tickendgap;

					if (tickstartgap && typeof tickstartgap == "string") {
						if (tickstartgap.indexOf("%") >= 0) {
							tickstartgap = this._convToPixel(tickstartgap, boardWidth);
						}
						else {
							tickstartgap = parseInt(tickstartgap);
						}
					}
					categoryaxis._tickstartgap = tickstartgap || 10;

					if (tickendgap && typeof tickendgap == "string") {
						if (tickendgap.indexOf("%") >= 0) {
							tickendgap = this._convToPixel(tickendgap, boardWidth);
						}
						else {
							tickendgap = parseInt(tickendgap);
						}
					}
					categoryaxis._tickendgap = tickendgap || 10;
				}

				if (!rotateaxis) {
					left = boardRect.left + boardBorderSize.left + boardspacing.left + axis._tickstartgap;
					width = boardRect.width - boardBorderWidth - axis._tickstartgap - axis._tickendgap;

					top = boardRect.top + boardBorderSize.top + boardspacing.top;
					height = boardRect.height - boardBorderHeight;
					applyTickgapToHRangebar = true;
				}
				else {
					left = boardRect.left + boardBorderSize.left + boardspacing.left;
					width = boardRect.width - boardBorderWidth;

					top = boardRect.top + boardBorderSize.top + boardspacing.top + axis._tickstartgap;
					height = boardRect.height - boardBorderHeight - axis._tickstartgap - axis._tickendgap;
					applyTickgapToVRangebar = true;
				}
			}
			else {
				left = boardRect.left + boardBorderSize.left + boardspacing.left;
				top = boardRect.top + boardBorderSize.top + boardspacing.top;
				width = boardRect.width - boardBorderWidth;

				height = boardRect.height - boardBorderHeight;
			}

			if (hrangebar && hrangebar._group.visible && categoryaxis && categoryaxis._direction == "x") {
				hrangebar._setTransformationHelpers(boardRect.width - boardBorderWidth, categoryaxis);
				if (applyTickgapToHRangebar) {
					width = boardRect.width - boardBorderWidth - categoryaxis._tickstartgap - categoryaxis._tickendgap - categoryaxis._tickendspace;
				}
			}
			else if (hrangebar && hrangebar._group.visible && hrangebar._axis) {
				hrangebar._setTransformationHelpers(boardRect.width - boardBorderWidth, hrangebar._axis);
			}
			if (vrangebar && vrangebar._group.visible && categoryaxis && categoryaxis._direction == "y") {
				vrangebar._setTransformationHelpers(boardRect.height - boardBorderHeight, categoryaxis);
				if (applyTickgapToVRangebar) {
					height = boardRect.height - boardBorderHeight - categoryaxis._tickstartgap - categoryaxis._tickendgap - categoryaxis._tickendspace;
				}
			}
			else if (vrangebar && vrangebar._group.visible && vrangebar._axis) {
				vrangebar._setTransformationHelpers(boardRect.height - boardBorderHeight, vrangebar._axis);
			}
			if (!axis._used) {
				continue;
			}

			if (rearrange) {
				if (axis._direction == "x") {
					if (categoryaxis && applyTickgapToHRangebar && hrangebar && hrangebar._group.visible) {
						tickendspace = 0;
					}

					left = left;
					width = width - tickendspace;
					axis._axisRect.set_x(left);
					axis._axisRect.set_width(width);
				}
				else {
					top = top + tickendspace;
					if (categoryaxis && applyTickgapToVRangebar && vrangebar && vrangebar._group.visible) {
						tickendspace = 0;
					}
					height = height - tickendspace;
					axis._axisRect.set_y(top);
					axis._axisRect.set_height(height);
				}

				axis._setTransformationHelpers(width, height);
			}

			if (rearrange || axis._rearrange || axis._rearrangeTitle) {
				axis._arrange(left, top, width, height);
			}
		}
	};

	_pAxisChartBase._destroySubControl = function () {
		nexacro._ChartBase.prototype._destroySubControl.call(this);

		var valueaxes = this.valueaxes;
		if (valueaxes && valueaxes.length > 0) {
			this.deleteAllValueaxis();
		}

		if (this.hrangebar) {
			this.hrangebar.destroy();
			this.hrangebar = null;
		}
		if (this.vrangebar) {
			this.vrangebar.destroy();
			this.vrangebar = null;
		}
		if (this.crosshair) {
			this.crosshair.destroy();
			this.crosshair = null;
		}
		if (this.selection) {
			this.selection.destroy();
			this.selection = null;
		}
	};

	_pAxisChartBase._deleteAxis = function (axis, isCategory, index) {
		var pThis = this, yIdx = -1, axisId = axis.id, charttype = this._type_name;

		if (this._axes.length > 0) {
			nexacro._GraphicsLibArray.remove(this._axes, axis);
		}

		var location = axis._location;
		if (location == "left" || location == "right") {
			if (this._yaxes.length > 0) {
				nexacro._GraphicsLibArray.remove(this._yaxes, axis);
			}
		}
		else if (location == "bottom" || location == "top") {
			if (this._xaxes.length > 0) {
				nexacro._GraphicsLibArray.remove(this._xaxes, axis);
			}
		}

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

		if (this.valueaxes.length == 0) {
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

		if (this.seriesset) {
			var seriesset = this.seriesset;
			for (var i = seriesset.length - 1; i > -1; i--) {
				if (seriesset[i]) {
					if (charttype == "BasicChart") {
						if (seriesset[i]._yaxis && seriesset[i]._yaxis.id == axis.id) {
							seriesset[i]._yaxis._destroy(false);
							seriesset[i]._yaxis = null;
						}
					}
					else {
						if (axis._direction == "x") {
							if (seriesset[i]._xaxis && seriesset[i]._xaxis.id == axis.id) {
								seriesset[i]._xaxis._destroy(false);
								seriesset[i]._xaxis = null;
							}
						}
						else {
							if (seriesset[i]._yaxis && seriesset[i]._yaxis.id == axis.id) {
								seriesset[i]._yaxis._destroy(false);
								seriesset[i]._yaxis = null;
							}
						}
						this._changedData = true;
					}
				}
			}
		}
	};


	delete _pAxisChartBase;
}

if (!nexacro.ChartAxisControl) {
	nexacro.ChartAxisControl = function (id, parent, graphicsControl) {
		this.id = id;
		this.parent = parent;
		this._graphicsControl = graphicsControl;

		this._ticks = [];
		this._categories = {
		};

		this._create();
	};

	var _pChartAxisControl = nexacro.ChartAxisControl.prototype = nexacro._createPrototype(nexacro.Object, nexacro.ChartAxisControl);
	_pChartAxisControl._type_name = "ChartAxisControl";


	_pChartAxisControl.autotickscale = undefined;
	_pChartAxisControl.tickstartgap = undefined;
	_pChartAxisControl.ticksendgap = undefined;
	_pChartAxisControl.axislineopacity = 1;
	_pChartAxisControl.axislinestyle = "";
	_pChartAxisControl.boardlineopacity = 1;
	_pChartAxisControl.boardlinestyle = "";
	_pChartAxisControl.boardlinevisible = false;
	_pChartAxisControl.gap = undefined;
	_pChartAxisControl.labelgap = undefined;
	_pChartAxisControl.labelmask = "";
	_pChartAxisControl.labelrotate = "";
	_pChartAxisControl.labeltextcolor = "";
	_pChartAxisControl.labeltextfont = "";
	_pChartAxisControl.labeltextwidth = undefined;
	_pChartAxisControl.labeltype = "normal";
	_pChartAxisControl.locale = "";
	_pChartAxisControl.opposite = false;
	_pChartAxisControl.tickinterval = undefined;
	_pChartAxisControl.ticklineopacity = 1;
	_pChartAxisControl.ticklinestyle = "";
	_pChartAxisControl.tickmax = undefined;
	_pChartAxisControl.tickmin = undefined;
	_pChartAxisControl.ticks = undefined;
	_pChartAxisControl.ticksize = undefined;
	_pChartAxisControl.titlegap = undefined;
	_pChartAxisControl.titletext = "";
	_pChartAxisControl.titletextalign = "middle";
	_pChartAxisControl.titletextcolor = "";
	_pChartAxisControl.titletextfont = "";
	_pChartAxisControl.titlerotate = undefined;
	_pChartAxisControl.visible = true;

	_pChartAxisControl.datetickunit = "";

	_pChartAxisControl.axistype = "normal";

	_pChartAxisControl._datetickunit = null;
	_pChartAxisControl._tickmax = null;
	_pChartAxisControl._tickmin = null;


	_pChartAxisControl._group = null;
	_pChartAxisControl._boardLineGroup = null;
	_pChartAxisControl._axisRect = null;
	_pChartAxisControl._tickGroup = null;
	_pChartAxisControl._labelGroup = null;

	_pChartAxisControl._type = "valueAxis";
	_pChartAxisControl._used = false;
	_pChartAxisControl._location = "";
	_pChartAxisControl._direction = "";
	_pChartAxisControl._datamin = Number.POSITIVE_INFINITY;
	_pChartAxisControl._datamax = Number.NEGATIVE_INFINITY;
	_pChartAxisControl._min = null;
	_pChartAxisControl._max = null;
	_pChartAxisControl._delta = null;
	_pChartAxisControl._tickinterval = "";
	_pChartAxisControl._labelgap = 0;
	_pChartAxisControl._labelWidth = 0;
	_pChartAxisControl._labelHeight = 0;
	_pChartAxisControl._labeltextfont = null;
	_pChartAxisControl._labeltextcolor = null;
	_pChartAxisControl._title = null;
	_pChartAxisControl._titleHeight = 0;
	_pChartAxisControl._titleWidth = 0;
	_pChartAxisControl._tickendspace = 0;
	_pChartAxisControl._titletextfont = null;
	_pChartAxisControl._titletextcolor = null;
	_pChartAxisControl._titlerotate = -90;
	_pChartAxisControl._boardlinestyle = "";
	_pChartAxisControl._axislinestyle = "";
	_pChartAxisControl._axisLine;
	_pChartAxisControl._axislineopacity = null;
	_pChartAxisControl._ticklinestyle = "";
	_pChartAxisControl._ticklineopacity = null;
	_pChartAxisControl._scale;
	_pChartAxisControl._changedTicks = false;
	_pChartAxisControl._changedTickStyle = false;
	_pChartAxisControl._changedBoardLineStyle = false;
	_pChartAxisControl._changedTickLabelStyle = false;
	_pChartAxisControl._changedTickLabelRotate = false;
	_pChartAxisControl._rearrange = false;
	_pChartAxisControl._rearrangeTitle = true;
	_pChartAxisControl._tickLabelTextAlign = null;
	_pChartAxisControl._tickLabelVerticalAlign = null;
	_pChartAxisControl._scrollMin = null;
	_pChartAxisControl._scrollMax = null;
	_pChartAxisControl._isTimeAxis = false;
	_pChartAxisControl._tickstartgap = null;
	_pChartAxisControl._tickendgap = null;

	_pChartAxisControl._timeUnitSize = {
		"second" : 1000, 
		"minute" : 60 * 1000, 
		"hour" : 60 * 60 * 1000, 
		"day" : 24 * 60 * 60 * 1000, 
		"month" : 30 * 24 * 60 * 60 * 1000, 
		"year" : 365.2425 * 24 * 60 * 60 * 1000
	};

	_pChartAxisControl._specMonths = [[1, "second"], [2, "second"], [5, "second"], [10, "second"], [30, "second"], [1, "minute"], [2, "minute"], [5, "minute"], [10, "minute"], [30, "minute"], [1, "hour"], [2, "hour"], [4, "hour"], [8, "hour"], [12, "hour"], [1, "day"], [2, "day"], [3, "day"], [0.25, "month"], [0.5, "month"], [1, "month"], [2, "month"], [3, "month"], [6, "month"], [1, "year"]
	];

	_pChartAxisControl.set_visible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.visible !== val) {
			this._changeContentsProperty("visible", val, this.visible);
			this.visible = val;
			this.on_apply_visible(val);
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_visible = function (visible) {
		if (this._group) {
			this._group.set_visible(visible);
			this.parent._rearrange = true;
		}
	};

	_pChartAxisControl.set_axistype = function (val) {
		var axistype_enum = ["default", "datetime"];
		if (axistype_enum.indexOf(val) == -1) {
			return;
		}

		if (this.axistype != val) {
			this.axistype = val;
			this.on_apply_axistype();
		}

		this.parent._draw();
	};
	_pChartAxisControl.on_apply_axistype = function () {
		if (this.axistype == "datetime") {
			if (this.parent._isTimeData) {
				this._isTimeAxis = true;
				this.on_apply_tickmax();
				this.on_apply_tickmin();
				this.on_apply_datetickunit();
			}
		}
		this._changedData = true;
	};
	_pChartAxisControl.set_locale = function (val) {
		if (val != this.locale) {
			this._changeContentsProperty("locale", val, this.locale);
			this.locale = val;
			this._locale = val;
			this.on_apply_locale();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_locale = function () {
		this.parent._changedData = true;
	};

	_pChartAxisControl.set_opposite = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.opposite != val) {
			this._changeContentsProperty("opposite", val, this.opposite);
			this.opposite = val;
			this.on_apply_opposite(val);
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_opposite = function (opposite) {
		if (this._is_initprop) {
			return;
		}

		if (opposite) {
			opposite = nexacro._toBoolean(opposite);
		}

		var rotateaxis = this.parent.rotateaxis, charttype = this.parent._type_name, type = this._type;

		if (charttype == "BasicChart") {
			if (rotateaxis) {
				if (opposite) {
					if (type == "categoryAxis") {
						this._location = "right";
					}
					else {
						this._location = "top";
					}
				}
				else {
					if (type == "categoryAxis") {
						this._location = "left";
					}
					else {
						this._location = "bottom";
					}
				}
			}
			else {
				if (opposite) {
					if (type == "categoryAxis") {
						this._location = "top";
					}
					else {
						this._location = "right";
					}
				}
				else {
					if (type == "categoryAxis") {
						this._location = "bottom";
					}
					else {
						this._location = "left";
					}
				}
			}
		}
		else {
			if (opposite) {
				if (this._direction) {
					if (this._direction == "x") {
						this._location = "top";
					}
					else {
						this._location = "right";
					}
				}
			}
			else {
				if (this._direction) {
					if (this._direction == "x") {
						this._location = "bottom";
					}
					else {
						this._location = "left";
					}
				}
			}
		}

		var direction;

		if (this._location == "left" || this._location == "right") {
			direction = "y";
		}
		else {
			direction = "x";
		}

		this._direction = direction;
		this.parent._rearrange = true;
		this.parent._changedData = true;
		this._getTickLabelAlign(this.labelrotate);
	};

	_pChartAxisControl.set_datetickunit = function (val) {
		val = nexacro._toString(val);


		if (this.datetickunit != val) {
			this._changeContentsProperty("datetickunit", val, this.datetickunit);
			this.datetickunit = val;
			this.on_apply_datetickunit();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_datetickunit = function () {
		if (this._type == "categoryAxis") {
			var istimeaxis = this._isTimeAxis;
			if (istimeaxis) {
				this._datetickunit = this.datetickunit;
			}
		}
		else {
			this._datetickunit = this.datetickunit;
		}
		this._changedTicks = true;
		this._rearrange = true;
		this.parent._changedData = true;
	};

	_pChartAxisControl.set_tickinterval = function (val) {
		if (val !== undefined) {
			if (isNaN(val)) {
				return;
			}
		}

		if (val !== "" && val != null) {
			val = parseFloat(val);

			if (this.tickinterval !== val) {
				this._changeContentsProperty("tickinterval", val, this.tickinterval);
				this.tickinterval = val;
				this.on_apply_tickinterval();
			}
		}
		else {
			if (this.tickinterval) {
				this.tickinterval = undefined;
				this.on_apply_tickinterval();
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_tickinterval = function () {
		this._changedTicks = true;
		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_ticks = function (val) {
		if (this._type == "categoryAxis") {
			return;
		}
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}
		}

		if (val !== "" && val != null) {
			val = parseInt(val);
			if (this.ticks !== val) {
				this._changeContentsProperty("ticks", val, this.ticks);
				this.ticks = val;
				this.on_apply_ticks();
			}
		}
		else {
			if (this.ticks) {
				this.ticks = undefined;
				this.on_apply_ticks();
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_ticks = function () {
		this._changedTicks = true;
		this._rearrange = true;
	};

	_pChartAxisControl.set_autotickscale = function (val) {
		if (this._type == "categoryAxis") {
			return;
		}

		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}
		else {
			this.autotickscale = undefined;
			this.on_apply_autotickscale();
		}

		if (this.autotickscale !== val) {
			this._changeContentsProperty("autotickscale", val, this.autotickscale);
			this.autotickscale = val;
			this.on_apply_autotickscale();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_autotickscale = function () {
		this._changedTicks = true;
		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_tickstartgap = function (val) {
		if (this._type == "valueAxis") {
			return;
		}
		var isNegativeValue = false;
		if (val !== undefined) {
			if (typeof val == "string") {
				if (val.indexOf("-") >= 0) {
					isNegativeValue = true;
				}
			}
			else {
				if (val < 0) {
					isNegativeValue = true;
				}
			}
		}

		if (isNegativeValue) {
			return;
		}

		if (this.tickstartgap !== val) {
			this._changeContentsProperty("tickstartgap", val, this.tickstartgap);
			this.tickstartgap = val;
			this.on_apply_tickstartgap();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_tickstartgap = function () {
		this._changedTicks = true;
		this.parent._rearrange = true;
	};


	_pChartAxisControl.set_tickendgap = function (val) {
		if (this._type == "valueAxis") {
			return;
		}

		if (val !== undefined) {
			var isNegativeValue = false;
			if (typeof val == "string") {
				if (val.indexOf("-") >= 0) {
					isNegativeValue = true;
				}
			}
			else {
				if (val < 0) {
					isNegativeValue = true;
				}
			}

			if (isNegativeValue) {
				return;
			}
		}

		if (this.tickendgap !== val) {
			this._changeContentsProperty("tickendgap", val, this.tickendgap);
			this.tickendgap = val;
			this.on_apply_tickendgap();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_tickendgap = function () {
		this._changedTicks = true;
		this.parent._rearrange = true;
	};
	_pChartAxisControl.isDatetimeaxis = function () {
		if (this._type == "categoryAxis" && this.axistype == "datetime") {
			return true;
		}
		return false;
	};
	_pChartAxisControl.set_tickmin = function (val) {
		if (val !== undefined) {
			if (!this.isDatetimeaxis() && isNaN(val)) {
				return;
			}
		}

		if (val !== "" && val != null) {
			if (this.tickmin !== val) {
				this._changeContentsProperty("tickmin", val, this.tickmin);
				this.tickmin = val;
				this.on_apply_tickmin();
			}
		}
		else {
			if (this.tickmin) {
				this.tickmin = undefined;
				this.on_apply_tickmin();
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_tickmin = function () {
		if (this.tickmin == undefined || this.tickmin == null) {
			this._tickmin = null;
		}
		else {
			var new_obj = null;

			if (this.isDatetimeaxis()) {
				var val = this.tickmin;
				if (val instanceof nexacro.Date) {
					val = val.getTime();
				}
				else if (val instanceof Date) {
					val = val.getTime();
				}
				else {
					if (typeof val == "string") {
						new_obj = new nexacro.Date(val);
						val = new_obj.getTime();
					}
					else if (typeof val == "number" && val > 0) {
						val = new Date(val);
						new_obj = new nexacro.Date();
						new_obj.setTime(val.getTime());
						val = new_obj.getTime();
					}
				}
				if (val !== undefined) {
					if (isNaN(val)) {
						return;
					}
				}
				if (val !== "" && val != null) {
					this._tickmin = val;
				}
			}
			else {
				this._tickmin = parseFloat(this.tickmin);
			}
		}
		this._changedTicks = true;
		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_tickmax = function (val) {
		if (val !== undefined) {
			if (!this.isDatetimeaxis() && isNaN(val)) {
				return;
			}
		}

		if (val !== "" && val != null) {
			if (this.tickmax !== val) {
				this._changeContentsProperty("tickmax", val, this.tickmax);
				this.tickmax = val;
				this.on_apply_tickmax();
			}
		}
		else {
			if (this.tickmax) {
				this.tickmax = undefined;
				this.on_apply_tickmax();
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_tickmax = function () {
		if (this.tickmax == undefined || this.tickmax == null) {
			this._tickmax = null;
		}
		else {
			if (this.isDatetimeaxis()) {
				var val = this.tickmax;
				var new_obj = null;
				if (val instanceof nexacro.Date) {
					val = val.getTime();
				}
				else if (val instanceof Date) {
					val = val.getTime();
				}
				else {
					if (typeof val == "string") {
						new_obj = new nexacro.Date(val);
						val = new_obj.getTime();
					}
					else if (typeof val == "number" && val > 0) {
						val = new Date(val);
						new_obj = new nexacro.Date();
						new_obj.setTime(val.getTime());
						val = new_obj.getTime();
					}
				}
				if (val !== undefined) {
					if (isNaN(val)) {
						return;
					}
				}
				if (val !== "" && val != null) {
					this._tickmax = val;
				}
			}
			else {
				this._tickmax = parseFloat(this.tickmax);
			}
		}
		this._changedTicks = true;
		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_gap = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}

		if (this.gap != val) {
			this._changeContentsProperty("gap", val, this.gap);
			this.gap = val;
			this.on_apply_gap();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_gap = function () {
		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_boardlinevisible = function (val) {
		if (val === undefined || val === null) {
			val = false;
		}

		val = nexacro._toBoolean(val);
		if (this.boardlinevisible !== val) {
			this._changeContentsProperty("boardlinevisible", val, this.boardlinevisible);
			this.boardlinevisible = val;
			this.on_apply_boardlinevisible(val);
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_boardlinevisible = function (boardlinevisible) {
		if (this._is_initprop) {
			return;
		}

		this._boardLineGroup.set_visible(boardlinevisible);
	};

	_pChartAxisControl.set_boardlinestyle = function (val) {
		this.boardlinestyle = val;
		if (val) {
			if (this._boardlinestyle == null || !this._boardlinestyle._single || this._boardlinestyle.value != val) {
				var oldValue;
				if (this._boardlinestyle) {
					oldValue = this._boardlinestyle.value;
				}
				this._changeContentsProperty("boardlinestyle", val, oldValue);
				var boardlinestyle = nexacro.BorderObject(val);
				this._boardlinestyle = boardlinestyle;
				this.on_apply_boardlinestyle();
			}
		}
		else {
			if (this._boardlinestyle) {
				this._boardlinestyle = null;
				this.on_apply_boardlinestyle();
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_boardlinestyle = function () {
		this._changedBoardLineStyle = true;
	};

	_pChartAxisControl.set_boardlineopacity = function (val) {
		this.boardlineopacity = val;
		if (0 === val || val) {
			if (this._boardlineopacity == null || this._boardlineopacity.value != val) {
				var oldValue;
				if (this._boardlineopacity) {
					oldValue = this._boardlineopacity.value;
				}
				this._changeContentsProperty("boardlineopacity", val, oldValue);

				var boardlineopacity = nexacro.OpacityObject(val);
				this._boardlineopacity = boardlineopacity;
				this.on_apply_boardlineopacity();
			}
		}
		else {
			if (this._boardlineopacity) {
				this._boardlineopacity = null;
				this.on_apply_boardlineopacity();
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_boardlineopacity = function () {
		this._changedBoardLineStyle = true;
	};

	_pChartAxisControl.set_axislinestyle = function (val) {
		this.axislinestyle = val;
		var oldwidth = 0;
		var newwidth = 0;
		if (val) {
			if (this._axislinestyle == null || !this._axislinestyle._single || this._axislinestyle.value != val) {
				var oldValue;
				if (this._axislinestyle) {
					oldValue = this._axislinestyle.value;
					oldwidth = this._axislinestyle ? this._axislinestyle._getBorderLeftWidth() : 1;
				}
				this._changeContentsProperty("axislinestyle", val, oldValue);

				var axislinestyle = nexacro.BorderObject(val);
				this._axislinestyle = axislinestyle;
				newwidth = this._axislinestyle ? this._axislinestyle._getBorderLeftWidth() : 1;
				this.on_apply_axislinestyle(axislinestyle);
			}
		}
		else {
			if (this._axislinestyle) {
				this._axislinestyle = null;
				this.on_apply_axislinestyle(null);
			}
		}
		if (newwidth != oldwidth) {
			this.parent._rearrange = true;
		}
		this.parent._draw();
	};

	_pChartAxisControl.on_apply_axislinestyle = function (axislinestyle) {
		if (this._is_initprop) {
			return;
		}

		this._createAxisLine();
		if (this._axisLine) {
			this._axisLine.set_strokepen(axislinestyle ? axislinestyle.value || axislinestyle : "1px solid #717a8380");
		}
	};

	_pChartAxisControl.set_axislineopacity = function (val) {
		this.axislineopacity = val;
		if (0 === val || val) {
			if (this._axislineopacity == null || this._axislineopacity.value != val) {
				var oldValue;
				if (this._axislineopacity) {
					oldValue = this._axislineopacity.value;
				}
				this._changeContentsProperty("axislineopacity", val, oldValue);

				var axislineopacity = nexacro.OpacityObject(val);
				this._axislineopacity = axislineopacity;
				this.on_apply_axislineopacity(axislineopacity);
			}
		}
		else {
			if (this._axislineopacity) {
				this._axislineopacity = null;
				this.on_apply_axislineopacity(null);
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_axislineopacity = function (axislineopacity) {
		this._createAxisLine();
		if (this._axisLine) {
			this._axisLine.set_opacity(axislineopacity ? axislineopacity._sysvalue : "");
		}
	};

	_pChartAxisControl.set_ticksize = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}

			if (val != "") {
				val = parseInt(val);
			}
		}

		if (this.ticksize !== val) {
			this._changeContentsProperty("ticksize", val, this.ticksize);
			this.ticksize = val;
			this.on_apply_ticksize();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_ticksize = function () {
		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_ticklinestyle = function (val) {
		this.ticklinestyle = val;
		if (val) {
			if (this._ticklinestyle == null || !this._ticklinestyle._single || this._ticklinestyle.value != val) {
				var oldValue;
				if (this._ticklinestyle) {
					oldValue = this._ticklinestyle.value;
				}
				this._changeContentsProperty("ticklinestyle", val, oldValue);

				var ticklinestyle = nexacro.BorderObject(val);
				this._ticklinestyle = ticklinestyle;
				this.on_apply_ticklinestyle();
			}
		}
		else {
			if (this._ticklinestyle) {
				this._ticklinestyle = null;
				this.on_apply_ticklinestyle();
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_ticklinestyle = function () {
		if (this._is_initprop) {
			return;
		}
		this._changedTickStyle = true;
	};

	_pChartAxisControl.set_ticklineopacity = function (val) {
		this.ticklineopacity = val;
		if (0 === val || val) {
			if (this._ticklineopacity == null || this._ticklineopacity.value != val) {
				var oldValue;
				if (this._ticklineopacity) {
					oldValue = this._ticklineopacity.value;
				}
				this._changeContentsProperty("ticklineopacity", val, oldValue);

				var ticklineopacity = nexacro.OpacityObject(val);
				this._ticklineopacity = ticklineopacity;
				this.on_apply_ticklineopacity();
			}
		}
		else {
			if (this._ticklineopacity) {
				this._ticklineopacity = null;
				this.on_apply_ticklineopacity();
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_ticklineopacity = function () {
		this._changedTickStyle = true;
	};

	_pChartAxisControl.set_labeltype = function (v) {
		if (this.labeltype != v) {
			this._changeContentsProperty("labeltype", v, this.labeltype);
			this.labeltype = v;
			this.on_apply_labeltype();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_labeltype = function () {
		this._changedTicks = true;
		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_labelmask = function (val) {
		var labelmask = nexacro._toString(val);
		if (labelmask != this.labelmask) {
			this._changeContentsProperty("labelmask", val, this.labelmask);
			this.labelmask = labelmask;
			this.on_apply_labelmask();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_labelmask = function () {
		this._changedTicks = true;
		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_labeltextfont = function (val) {
		this.labeltextfont = val;
		if (val) {
			if (this._labeltextfont == null || this._labeltextfont.value != val) {
				var oldValue;
				if (this._labeltextfont) {
					oldValue = this._labeltextfont.value;
				}
				this._changeContentsProperty("labeltextfont", val, oldValue);

				var labeltextfont = nexacro.FontObject(val);
				this._labeltextfont = labeltextfont;
				this.on_apply_labeltextfont();
			}
		}
		else {
			if (this._labeltextfont) {
				this._labeltextfont = null;
				this.on_apply_labeltextfont();
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_labeltextfont = function () {
		if (this._is_initprop) {
			return;
		}

		this._changedTicks = true;
		if (this.parent) {
			this.parent._rearrange = true;
		}
	};

	_pChartAxisControl.set_labeltextcolor = function (val) {
		this.labeltextcolor = val;
		if (val) {
			if (this._labeltextcolor == null || this._labeltextcolor.value != val) {
				var oldValue;
				if (this._labeltextcolor) {
					oldValue = this._labeltextcolor.value;
				}
				this._changeContentsProperty("labeltextcolor", val, oldValue);

				var labeltextcolor = nexacro.ColorObject(val);
				this._labeltextcolor = labeltextcolor;
				this.on_apply_labeltextcolor();
			}
		}
		else {
			if (this._labeltextcolor) {
				this._labeltextcolor = null;
				this.on_apply_labeltextcolor();
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_labeltextcolor = function () {
		if (this._is_initprop) {
			return;
		}

		this._changedTickLabelStyle = true;
	};

	_pChartAxisControl.set_labelrotate = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val)) {
				return;
			}
			if (val > 90 || val < -90) {
				val = 0;
			}
		}

		if (this.labelrotate != val) {
			this._changeContentsProperty("labelrotate ", val, this.labelrotate);

			this.labelrotate = val;
			this.on_apply_labelrotate(val);
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_labelrotate = function (val) {
		this._changedTickLabelRotate = true;
		this._getTickLabelAlign(val);
		this.parent._rearrange = true;
		this.parent._changedData = true;
	};

	_pChartAxisControl.set_labeltextwidth = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val)) {
				return;
			}
		}

		if (this.labeltextwidth !== val) {
			this._changeContentsProperty("labeltextwidth", val, this.labeltextwidth);
			this.labeltextwidth = val;
			this.on_apply_labeltextwidth();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_labeltextwidth = function () {
		this._changedTicks = true;
		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_labelgap = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}

		if (this.labelgap != val) {
			this._changeContentsProperty("labelgap", val, this.labelgap);
			this.labelgap = val;
			this._labelgap = val;
			this.on_apply_labelgap();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_labelgap = function () {
		this._changedTicks = true;
		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_titletext = function (val) {
		if (this.titletext != val) {
			this._changeContentsProperty("titletext", val, this.titletext);
			this.titletext = val;
			this.on_apply_titletext(val);
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_titletext = function (titletext) {
		if (this._is_initprop) {
			return;
		}

		if (titletext) {
			this._createTitle();
		}
		else {
			this._titleHeight = 0;
			this._titleWidth = 0;
		}

		if (titletext) {
			this._title.set_text(titletext);
			this.parent._rearrange = true;
		}
	};

	_pChartAxisControl.set_titletextfont = function (val) {
		this.titletextfont = val;
		if (val) {
			if (this._titletextfont == null || this._titletextfont.value != val) {
				var oldValue;
				if (this._titletextfont) {
					oldValue = this._titletextfont.value;
				}
				this._changeContentsProperty("titletextfont", val, oldValue);

				var titletextfont = nexacro.FontObject(val);
				this._titletextfont = titletextfont;
				this.on_apply_titletextfont(titletextfont);
			}
		}
		else {
			if (this._titletextfont) {
				this._titletextfont = null;
				this.on_apply_titletextfont(null);
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_titletextfont = function (titletextfont) {
		if (this._is_initprop) {
			return;
		}

		this._createTitle();
		this._title.set_font(titletextfont ? titletextfont.value || titletextfont : "12pt Verdana");

		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_titletextcolor = function (val) {
		this.titletextcolor = val;
		if (val) {
			if (this._titletextcolor == null || this._titletextcolor.value != val) {
				var oldValue;
				if (this._titletextcolor) {
					oldValue = this._titletextcolor.value;
				}
				this._changeContentsProperty("titletextcolor", val, oldValue);

				var titletextcolor = nexacro.ColorObject(val);
				this._titletextcolor = titletextcolor;
				this.on_apply_titletextcolor(titletextcolor);
			}
		}
		else {
			if (this._titletextcolor) {
				this._titletextcolor = null;
				this.on_apply_titletextcolor(null);
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_titletextcolor = function (titletextcolor) {
		if (this._is_initprop) {
			return;
		}

		this._createTitle();
		this._title.set_color(titletextcolor ? titletextcolor.value || titletextcolor : "#000000");
	};

	_pChartAxisControl.set_titletextalign = function (val) {
		var titletextalign_enum = ["low", "middle", "high"];
		if (titletextalign_enum.indexOf(val) == -1) {
			return;
		}

		if (this.titletextalign != val) {
			this._changeContentsProperty("titletextalign", val, this.titletextalign);
			this.titletextalign = val;
			this.on_apply_titletextalign();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_titletextalign = function () {
		this._rearrangeTitle = true;
	};

	_pChartAxisControl.set_titlerotate = function (val) {
		if (val !== undefined) {
			if (isNaN(val)) {
				return;
			}

			if (val !== "" && val != null) {
				val = parseInt(val);
			}
		}

		if (this.titlerotate !== val) {
			this._changeContentsProperty("titlerotate", val, this.titlerotate);
			if (val !== undefined) {
				if (val === "" && val !== 0) {
					val = -90;
				}

				if (val == -90 || val == 0 || val == 90) {
					this.titlerotate = val;
					this.on_apply_titlerotate(this.titlerotate);
				}
			}
			else {
				this.titlerotate = val;
				this.on_apply_titlerotate(this.titlerotate);
			}
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_titlerotate = function (titlerotate) {
		if (this._direction == "y") {
			if (titlerotate == -90 || titlerotate == 0 || titlerotate == 90) {
				this._titlerotate = titlerotate;
			}
		}
		this._rearrangeTitle = true;
		this.parent._rearrange = true;
	};

	_pChartAxisControl.set_titlegap = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}

		if (this.titlegap !== val) {
			this._changeContentsProperty("titlegap", val, this.titlegap);
			this.titlegap = val;
			this.on_apply_titlegap();
		}

		this.parent._draw();
	};

	_pChartAxisControl.on_apply_titlegap = function () {
		this.parent._rearrange = true;
	};


	_pChartAxisControl.destroy = function () {
		this._destroy(true);
	};

	_pChartAxisControl._destroy = function (parent_clear) {
		if (parent_clear) {
			var axisId = this.id;
			if (this.parent) {
				if (this.parent._axes) {
					nexacro._GraphicsLibArray.remove(this.parent._axes, this);
				}

				var axisType = this._type;

				if (axisType == "valueAxis") {
					if (this.parent.valueaxes) {
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
				else {
					this.parent.categoryaxis = null;
					this.parent._deleteContentsProp("categoryaxis");
				}

				var location = this._location;
				if (location == "left" || location == "right") {
					if (this.parent._yaxes) {
						nexacro._GraphicsLibArray.remove(this.parent._yaxes, this);
					}
				}
				else if (location == "bottom" || location == "top") {
					if (this.parent._xaxes) {
						nexacro._GraphicsLibArray.remove(this.parent._xaxes, this);
					}
				}
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


	_pChartAxisControl._create = function () {
		this._group = new nexacro.GraphicsGroup();
		this._group.set_id(this.id + "_ChartAxisGroup");
		this._graphicsControl.addChild(this._group);

		this._tickGroup = new nexacro.GraphicsGroup();
		this._tickGroup.set_id("ChartAxisTickGroup");
		this._group.addChild(this._tickGroup);

		this._labelGroup = new nexacro.GraphicsGroup();
		this._labelGroup.set_id("ChartAxisLabelGroup");
		this._group.addChild(this._labelGroup);

		this._axisRect = new nexacro.GraphicsRect(0, 0, 0, 0);
		this._axisRect.set_id("ChartAxisRect");
		this._group.addChild(this._axisRect);
		this._axisRect._axis = this;


		this._boardLineGroup = new nexacro.GraphicsGroup();
		this._boardLineGroup.set_id(this.id + "_ChartAxisBoardLineGroup");
		if (this.parent.board) {
			this._graphicsControl.insertChild(this._boardLineGroup, this.parent._seriesGroup);
		}
	};

	_pChartAxisControl._initData = function () {
		this._datamin = Number.POSITIVE_INFINITY;
		this._datamax = Number.NEGATIVE_INFINITY;
		this._used = false;
	};

	_pChartAxisControl._resetData = function () {
		if (this._datamin == Number.POSITIVE_INFINITY) {
			this._datamin = null;
		}
		if (this._datamax == Number.NEGATIVE_INFINITY) {
			this._datamax = null;
		}
	};

	_pChartAxisControl._updateMinMax = function (tickmin, tickmax) {
		if (this._datamin == null) {
			this._datamin = Number.POSITIVE_INFINITY;
		}
		if (this._datamax == null) {
			this._datamax = Number.NEGATIVE_INFINITY;
		}
		if (tickmin < this._datamin && tickmin != -Number.MAX_VALUE) {
			this._datamin = tickmin;
		}
		if (tickmax > this._datamax && tickmax != Number.MAX_VALUE) {
			this._datamax = tickmax;
		}
	};

	_pChartAxisControl._categoriesTickGenerator = function (axis, istotal) {
		var res = [];
		var min, max;
		if (istotal) {
			min = axis._datamin;
			max = axis._datamax;
		}
		else {
			min = axis._min;
			max = axis._max;
		}
		for (var label in axis._categories) {
			var v = axis._categories[label];

			if (v >= min && v <= max) {
				res.push([v, label]);
			}
		}

		res.sort(function (a, b) {
			return a[0] - b[0];
		});
		return res;
	};

	_pChartAxisControl._setCategoriesData = function (datapoints) {
		var points = datapoints.points, ps = datapoints.pointsize, format = datapoints.format, formatColumn = this._direction, categories, index = this._getNextIndex(categories), idx, value;

		categories = this._categories = {
		};

		if (points.length == 0) {
			return;
		}



		for (var i = 0; i < points.length; i += ps) {
			for (var m = 0; m < ps; m++) {
				var val = points[i + m];
				idx = m;

				if (val == null || !format[m][formatColumn]) {
					continue;
				}

				if (!(val in categories)) {
					if (this._isTimeAxis) {
						categories[index] = val;
						points[i + m] = categories[index];
						index++;
					}
					else {
						categories[val] = index;
						points[i + m] = categories[val];
						index++;
					}
				}
				else {
					if (this._isTimeAxis) {
						points[i + m] = val;
					}
					else {
						points[i + m] = categories[val];
					}
				}
			}
		}
	};

	_pChartAxisControl._getNextIndex = function (categories) {
		var index = -1;
		for (var v in categories) {
			if (categories[v] > index) {
				index = categories[v];
			}
		}
		return index + 1;
	};

	_pChartAxisControl._setRange = function () {
		var tickmin, tickmax, dMin, dMax, delta;

		tickmin = +(this._tickmin != null ? this._tickmin : this._datamin);
		tickmax = +(this._tickmax != null ? this._tickmax : this._datamax);

		if (this._scrollMin || this._scrollMax) {
			tickmin = this._scrollMin;
			tickmax = this._scrollMax;

			this._scrollMin = null;
			this._scrollMax = null;
		}

		delta = tickmax - tickmin;
		if (delta == 0.0) {
			var widen = tickmax == 0 ? 1 : 0.01;
			if (this._tickmin == null) {
				tickmin -= widen;
			}

			if (this._tickmax == null || this._tickmin != null) {
				tickmax += widen;
			}
		}
		else {
			var tickscale = this.autotickscale ? this.autotickscale * 0.01 : 0;
			if (tickscale != null) {
				if (this._tickmin == null) {
					tickmin -= delta * tickscale;
					if (tickmin < 0 && this._datamin != null && this._datamin >= 0) {
						tickmin = 0;
					}
				}

				if (this._tickmax == null) {
					tickmax += delta * tickscale;
					if (tickmax > 0 && this._datamax != null && this._datamax <= 0) {
						tickmax = 0;
					}
				}
			}
		}

		this._min = tickmin;
		this._max = tickmax;
	};

	_pChartAxisControl._arrange = function (left, top, width, height) {
		if (this.parent._rearrange) {
			this._arrangeTickGroup(width, height);
			this._boardLineGroup.setTransform("translate(" + left + "," + top + ")");
			this._arrangeLabelGroup();
			this._arrangeTitle();
		}
		else if (this._rearrange) {
			this._arrangeTickGroup(width, height);
			this._boardLineGroup.setTransform("translate(" + left + "," + top + ")");
			this._arrangeLabelGroup();
		}
		else if (this._rearrangeTitle) {
			this._arrangeTitle();
		}

		this._rearrangeTitle = false;
		this._rearrange = false;
	};
	_pChartAxisControl._preGenerateTimeTick = function () {
		var res = [];
		var min, max, ticks = [], spec, d, v, width = this.parent._getClientWidth(), height = this.parent._getClientHeight();

		if (width <= 0 || height <= 0) {
			this._resizeClient = true;
			return;
		}
		else {
			if (this._resizeClient) {
				this._resizeClient = false;
			}
		}

		for (var label in this._categories) {
			if (min == undefined) {
				min = this._categories[label];
			}
			if (max == undefined) {
				max = this._categories[label];
			}
			v = this._categories[label];
			if (v > max) {
				max = v;
			}
			if (v < min) {
				min = v;
			}
		}
		if (this._tickmin) {
			min = this._tickmin;
		}
		if (this._tickmax) {
			max = this._tickmax;
		}

		var tickscount = 0;
		tickscount = 0.3 * Math.sqrt(this._direction == "x" ? width : height);
		var delta = (max - min) / tickscount, dec = -Math.floor(Math.log(delta) / Math.LN10), maxDec, magn = Math.pow(10, -dec), norm = delta / magn, tickinterval;
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
		if (this._type == "categoryAxis") {
			var istimeaxis = this._isTimeAxis;
			if (!istimeaxis) {
				tickintervalchk = null;
			}
		}

		this._tickinterval = tickintervalchk || tickinterval;


		d = new Date(min);
		spec = this._specMonths;

		for (var i = 0; i < spec.length - 1; ++i) {
			if (this._delta < (spec[i][0] * this._timeUnitSize[spec[i][1]] + spec[i + 1][0] * this._timeUnitSize[spec[i + 1][1]]) / 2) {
				break;
			}
		}

		var size = spec[i][0];
		var unit = spec[i][1];

		if (unit == "year" || this._datetickunit == "year") {
			magn = Math.pow(10, Math.floor(Math.log(this._delta / this._timeUnitSize.year) / Math.LN10));
			norm = (this._delta / this._timeUnitSize.year) / magn;

			if (norm < 1.5) {
				size = 1;
			}
			else if (norm < 3) {
				size = 2;
			}
			else if (norm < 7.5) {
				size = 5;
			}
			else {
				size = 10;
			}
			size *= magn;

			if (size < 1) {
				size = 1;
			}
		}

		var timeticksize = [];
		var tickunit;
		if (this.tickinterval && this._datetickunit) {
			tickunit = this._datetickunit;
			if (this._datetickunit == "quarter") {
				tickunit = "month";
			}


			timeticksize = [this.tickinterval, tickunit];
		}
		else if (this._datetickunit) {
			tickunit = this._datetickunit;
			if (this._datetickunit == "quarter") {
				tickunit = "month";
				size = 3;
			}
			size = this._checklimitdatetickunitsize(unit, tickunit, size);
			timeticksize = [size, tickunit];
		}
		else {
			timeticksize = [size, unit];
		}

		var tickSize = timeticksize[0];
		unit = timeticksize[1];
		var step = tickSize * this._timeUnitSize[unit];

		if (unit == "second") {
			d.setSeconds(this._floorInBase(d.getSeconds(), tickSize));
		}
		else if (unit == "minute") {
			d.setMinutes(this._floorInBase(d.getMinutes(), tickSize));
		}
		else if (unit == "hour") {
			d.setHours(this._floorInBase(d.getHours(), tickSize));
		}
		else if (unit == "month") {
			d.setMonth(this._floorInBase(d.getMonth(), tickSize));
		}
		else if (unit == "year") {
			d.setFullYear(this._floorInBase(d.getFullYear(), tickSize));
		}

		d.setMilliseconds(0);

		if (step >= this._timeUnitSize.minute) {
			d.setSeconds(0);
		}
		if (step >= this._timeUnitSize.hour) {
			d.setMinutes(0);
		}
		if (step >= this._timeUnitSize.day) {
			d.setHours(0);
		}
		if (step >= this._timeUnitSize.day * 4) {
			d.setDate(1);
		}
		if (step >= this._timeUnitSize.month * 2) {
			d.setMonth(this._floorInBase(d.getMonth(), 3));
		}
		if (step >= this._timeUnitSize.quarter * 2) {
			d.setMonth(this._floorInBase(d.getMonth(), 6));
		}
		if (step >= this._timeUnitSize.year) {
			d.setMonth(0);
		}

		var carry = 0;
		v = Number.NaN;
		var prev;

		do {
			prev = v;
			v = d.getTime();
			ticks.push(v);

			if (unit == "month") {
				if (tickSize < 1) {
					d.setDate(1);
					var start = d.getTime();
					d.setMonth(d.getMonth() + 1);
					var end = d.getTime();
					d.setTime(v + carry * this._timeUnitSize.hour + (end - start) * tickSize);
					carry = d.getHours();
					d.setHours(0);
				}
				else {
					d.setMonth(d.getMonth() + tickSize);
				}
			}
			else if (unit == "year") {
				d.setFullYear(d.getFullYear() + tickSize);
			}
			else {
				d.setTime(v + step);
			}
		} while (v < max && v != prev);


		this._delta = (max - min) / ticks.length;
		return ticks;
	};
	_pChartAxisControl._setupTickGeneration = function (width, height) {
		var ticks;
		if (typeof this.ticks == "number" && this.ticks > 0) {
			ticks = this.ticks;
		}
		else {
			if (this._isTimeAxis && this.ticks && this.ticks.length > 0) {
				ticks = this.ticks.length;
				return;
			}
			else {
				ticks = 0.3 * Math.sqrt(this._direction == "x" ? width : height);
			}
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
		if (this._type == "categoryAxis") {
			var istimeaxis = this._isTimeAxis;
			if (!istimeaxis) {
				tickintervalchk = null;
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

				if ((axis._datamin == null && axis._datamax == null) && (axis._tickmin == null || axis._tickmax == null)) {
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

	_pChartAxisControl._setTicks = function (istotal) {
		var ticks = this.ticks, tickGen = [];

		if (this._type == "categoryAxis") {
			this.on_apply_axistype();
		}
		var istimeaxis = this._isTimeAxis;

		if (ticks == null || (typeof ticks == "number" && ticks > 0)) {
			if (istimeaxis) {
				if (this._generateTimeTick) {
					tickGen = this._generateTimeTick(istotal);
				}
			}
			else {
				if (this._tickGenerator) {
					tickGen = this._tickGenerator(this, istotal);
				}
			}
		}
		else if (ticks) {
			if (nexacro._GraphicsLib.isFunction(ticks)) {
				tickGen = ticks(this, istotal);
			}
			else {
				tickGen = ticks;
			}
		}


		this._ticks = [];
		var v, date, labeltype = this.labeltype, labelmask = this.labelmask, locale = this.locale;

		for (var i = 0; i < tickGen.length; i++) {
			var label = null;
			var t = tickGen[i];

			if (typeof t == "object") {
				v = +t[0];
				if (t.length > 1) {
					label = t[1];
				}
			}
			else {
				v = +t;
				label = v;
			}

			if (istimeaxis) {
				date = new nexacro.Date();
				date.setTime(label);
				label = date;
			}
			label = nexacro._getChartDisplaytText(i, label, locale, labeltype, labelmask, this.parent, this);



			if (!isNaN(v)) {
				this._ticks.push({
					v : v, 
					label : label, 
					index : i
				});
			}
		}
	};

	_pChartAxisControl._generateTimeTick = function (istotal) {
		if (istotal) {
		}
		var ticks = [], spec, d, min;

		if (this._tickmin) {
			min = this._min;
		}
		else {
			min = this._datamin;
		}

		d = new Date(min);
		spec = this._specMonths;

		for (var i = 0; i < spec.length - 1; ++i) {
			if (this._delta < (spec[i][0] * this._timeUnitSize[spec[i][1]] + spec[i + 1][0] * this._timeUnitSize[spec[i + 1][1]]) / 2) {
				break;
			}
		}

		var size = spec[i][0];
		var unit = spec[i][1];

		if (unit == "year" || this._datetickunit == "year") {
			var magn = Math.pow(10, Math.floor(Math.log(this._delta / this._timeUnitSize.year) / Math.LN10));
			var norm = (this._delta / this._timeUnitSize.year) / magn;

			if (norm < 1.5) {
				size = 1;
			}
			else if (norm < 3) {
				size = 2;
			}
			else if (norm < 7.5) {
				size = 5;
			}
			else {
				size = 10;
			}
			size *= magn;

			if (size < 1) {
				size = 1;
			}
		}

		var timeticksize = [];
		var tickunit;
		if (this.tickinterval && this._datetickunit) {
			tickunit = this._datetickunit;
			if (this._datetickunit == "quarter") {
				tickunit = "month";
			}


			timeticksize = [this.tickinterval, tickunit];
		}
		else if (this._datetickunit) {
			tickunit = this._datetickunit;
			if (this._datetickunit == "quarter") {
				tickunit = "month";
				size = 3;
			}
			size = this._checklimitdatetickunitsize(unit, tickunit, size);
			timeticksize = [size, tickunit];
		}
		else {
			timeticksize = [size, unit];
		}

		var tickSize = timeticksize[0];
		unit = timeticksize[1];
		var step = tickSize * this._timeUnitSize[unit];

		if (unit == "second") {
			d.setSeconds(this._floorInBase(d.getSeconds(), tickSize));
		}
		else if (unit == "minute") {
			d.setMinutes(this._floorInBase(d.getMinutes(), tickSize));
		}
		else if (unit == "hour") {
			d.setHours(this._floorInBase(d.getHours(), tickSize));
		}
		else if (unit == "month") {
			d.setMonth(this._floorInBase(d.getMonth(), tickSize));
		}
		else if (unit == "year") {
			d.setFullYear(this._floorInBase(d.getFullYear(), tickSize));
		}

		d.setMilliseconds(0);

		if (step >= this._timeUnitSize.minute) {
			d.setSeconds(0);
		}
		if (step >= this._timeUnitSize.hour) {
			d.setMinutes(0);
		}
		if (step >= this._timeUnitSize.day) {
			d.setHours(0);
		}
		if (step >= this._timeUnitSize.day * 4) {
			d.setDate(1);
		}
		if (step >= this._timeUnitSize.month * 2) {
			d.setMonth(this._floorInBase(d.getMonth(), 3));
		}
		if (step >= this._timeUnitSize.quarter * 2) {
			d.setMonth(this._floorInBase(d.getMonth(), 6));
		}
		if (step >= this._timeUnitSize.year) {
			d.setMonth(0);
		}

		var carry = 0;
		var v = Number.NaN;
		var prev;

		do {
			prev = v;
			v = d.getTime();
			ticks.push(v);

			if (unit == "month") {
				if (tickSize < 1) {
					d.setDate(1);
					var start = d.getTime();
					d.setMonth(d.getMonth() + 1);
					var end = d.getTime();
					d.setTime(v + carry * this._timeUnitSize.hour + (end - start) * tickSize);
					carry = d.getHours();
					d.setHours(0);
				}
				else {
					d.setMonth(d.getMonth() + tickSize);
				}
			}
			else if (unit == "year") {
				d.setFullYear(d.getFullYear() + tickSize);
			}
			else {
				d.setTime(v + step);
			}
		} while (v < this._max && v != prev);

		return ticks;
	};
	_pChartAxisControl._checklimitdatetickunitsize = function (makeunit, setunit, size) {
		var tickgap = {
			"year" : 0, 
			"month" : 1, 
			"day" : 2, 
			"hour" : 3, 
			"minute" : 4, 
			"second" : 5
		};
		var limitcorrection = [1, 6, 3, 12, 30, 30];
		var newsize = size;
		if (tickgap[setunit] > tickgap[makeunit]) {
			if (tickgap[setunit] - tickgap[makeunit] >= 2) {
				var val = size;
				for (var i = tickgap[makeunit] + 1; i <= tickgap[setunit]; i++) {
					val = val * limitcorrection[i];
				}
				newsize = val;
			}
		}
		return newsize;
	};
	_pChartAxisControl._floorInBase = function (n, base) {
		return base * Math.floor(n / base);
	};

	_pChartAxisControl._setMinMaxTicks = function () {
		var ticks = this._ticks, autotickscale = this.autotickscale ? this.autotickscale * 0.01 : 0;

		if (autotickscale && ticks.length > 0) {
			if (this._tickmin == null) {
				this._min = Math.min(this._min, ticks[0].v);
			}

			if (this._tickmax == null && ticks.length > 1) {
				this._max = Math.max(this._max, ticks[ticks.length - 1].v);
			}
		}
	};

	_pChartAxisControl._setTransformationHelpers = function (width, height) {
		var s, m, tickmin = this._min, tickmax = this._max;

		if (this._direction == "x") {
			s = this._scale = width / Math.abs(tickmax - tickmin);
			m = Math.min(tickmax, tickmin);
		}
		else {
			s = this._scale = height / Math.abs(tickmax - tickmin);
			s = -s;
			m = Math.max(tickmax, tickmin);
		}

		this.p2c = function (p) {
			return (p - m) * s;
		};

		this.c2p = function (c) {
			return m + c / s;
		};
	};

	_pChartAxisControl._createAxisLine = function () {
		if (!this._axisLine) {
			this._axisLine = new nexacro.GraphicsLine();
			this._axisLine.set_id("ChartAxisLine");
			this._group.addChild(this._axisLine);
			this._axisLine._axis = this;
		}
	};

	_pChartAxisControl._setPixedLabelHeight = function (clientWidth, clientHeight) {
		var changedTicks = this._changedTicks, ticklinestyle = this._ticklinestyle, boardlinestyle = this._boardlinestyle, boardlinevisible = this.boardlinevisible, ticklineWidth = 0, maxlabelheight = 0, maxlabelwidth = 0;

		var virtual_tickGroup = new nexacro.GraphicsGroup();
		var virtual_boardLineGroup = new nexacro.GraphicsGroup();
		var virtual_labelGroup = new nexacro.GraphicsGroup();


		this._setTicks(true);


		virtual_tickGroup.clear();
		virtual_boardLineGroup.clear();
		virtual_labelGroup.clear();

		var ticks = this._ticks, tick, value, tickLine, ticklineopacity = this._ticklineopacity, boardlineopacity = this._boardlineopacity, align, tickLabel, labeltextfont = this.labeltextfont ? this.labeltextfont.value || this.labeltextfont : "12pt Verdana", labeltextcolor = this.labeltextcolor ? this.labeltextcolor.value || this.labeltextcolor : "#000000", labelrotate = this.labelrotate, textAlign = this._tickLabelTextAlign, verticalAlign = this._tickLabelVerticalAlign, labelmaxwidth = this.labeltextwidth, tickboardLine;

		this._getTickLabelAlign(labelrotate);
		textAlign = this._tickLabelTextAlign;
		verticalAlign = this._tickLabelVerticalAlign;

		for (var i = 0; i < ticks.length; i++) {
			tick = ticks[i];

			value = tick.v;
			if (nexacro._GraphicsLib.isEmpty(tick.label) || value < this._datamin || value > this._datamax) {
				continue;
			}

			tickLine = new nexacro.GraphicsLine();
			tickLine.set_id("ChartAxisLineTick" + i);
			virtual_tickGroup.addChild(tickLine);
			tick.lineElement = tickLine;

			tickLine.set_strokepen(ticklinestyle ? ticklinestyle.value || ticklinestyle : "1px solid #717a8380");
			tickLine.set_opacity(ticklineopacity ? ticklineopacity._sysvalue : 1);

			tickboardLine = new nexacro.GraphicsLine();
			tickboardLine.set_id("ChartAxisTickBoardLine" + i);
			virtual_boardLineGroup.addChild(tickboardLine);
			tick.boardlineElement = tickboardLine;

			tickboardLine.set_strokepen(boardlinestyle ? boardlinestyle.value || boardlinestyle : "1px solid #717a8380");
			tickboardLine.set_opacity(boardlineopacity ? boardlineopacity._sysvalue : 1);

			tickLabel = new nexacro.GraphicsText();
			tickLabel.set_id("ChartAxisLabel_" + i);
			virtual_labelGroup.addChild(tickLabel);

			tickLabel.set_text(tick.label);

			tick.labelElement = tickLabel;

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

			var info = virtual_labelGroup.getGlobalBoundRect(false, true);

			maxlabelheight = Math.max(maxlabelheight, info.height);
			maxlabelwidth = Math.max(maxlabelwidth, info.width);
		}

		virtual_tickGroup.clear();
		virtual_boardLineGroup.clear();
		virtual_labelGroup.clear();

		delete virtual_tickGroup;
		delete virtual_boardLineGroup;
		delete virtual_labelGroup;

		var returnsize = [];
		returnsize[0] = maxlabelwidth;
		returnsize[1] = maxlabelheight;
		return returnsize;
	};

	_pChartAxisControl._setData = function (clientWidth, clientHeight) {
		var changedTicks = this._changedTicks, ticklinestyle = this._ticklinestyle, boardlinestyle = this._boardlinestyle, boardlinevisible = this.boardlinevisible, ticklineWidth = 0, pixedlabelheight = 0, pixedlabelwidth = 0;

		if (changedTicks || this._changedTickLabelRotate) {
			this._setRange();
			this._setupTickGeneration(clientWidth, clientHeight);
			this._setMinMaxTicks();
			var returnsize = this._setPixedLabelHeight(clientWidth, clientHeight);
			pixedlabelheight = returnsize[1];
			pixedlabelwidth = returnsize[0];

			this._setTicks();

			this._tickGroup.clear();
			this._boardLineGroup.clear();
			this._labelGroup.clear();
		}

		var ticks = this._ticks, tick, value, tickLine, ticklineopacity = this._ticklineopacity, boardlineopacity = this._boardlineopacity, align, tickLabel, labeltextfont = this.labeltextfont ? this.labeltextfont.value || this.labeltextfont : "12pt Verdana", labeltextcolor = this.labeltextcolor ? this.labeltextcolor.value || this.labeltextcolor : "#000000", labelrotate = this.labelrotate, textAlign = this._tickLabelTextAlign, verticalAlign = this._tickLabelVerticalAlign, labelmaxwidth = this.labeltextwidth, tickboardLine;


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
					tickLine = new nexacro.GraphicsLine();
					tickLine.set_id("ChartAxisLineTick" + i);
					this._tickGroup.addChild(tickLine);
					tick.lineElement = tickLine;
					tickLine._axis = this;

					tickLine.set_strokepen(ticklinestyle ? ticklinestyle.value || ticklinestyle : "1px solid #717a8380");
					tickLine.set_opacity(ticklineopacity ? ticklineopacity._sysvalue : 1);

					tickboardLine = new nexacro.GraphicsLine();
					tickboardLine.set_id("ChartAxisTickBoardLine" + i);
					this._boardLineGroup.addChild(tickboardLine);
					tick.boardlineElement = tickboardLine;
					tickboardLine._axis = this;

					tickboardLine.set_strokepen(boardlinestyle ? boardlinestyle.value || boardlinestyle : "1px solid #717a8380");
					tickboardLine.set_opacity(boardlineopacity ? boardlineopacity._sysvalue : 1);
				}
				else {
					if (this._changedTickStyle) {
						tickLine = tick.lineElement;
						if (tickLine) {
							tickLine.set_strokepen(ticklinestyle ? ticklinestyle.value || ticklinestyle : "1px solid #717a8380");
							tickLine.set_opacity(ticklineopacity ? ticklineopacity._sysvalue : 1);
						}
					}

					if (this._changedBoardLineStyle) {
						tickboardLine = tick.boardlineElement;
						if (tickboardLine) {
							tickboardLine.set_strokepen(boardlinestyle ? boardlinestyle.value || boardlinestyle : "1px solid #717a8380");
							tickboardLine.set_opacity(boardlineopacity ? boardlineopacity._sysvalue : 1);
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

		this._changedTicks = false;
		this._changedTickStyle = false;
		this._changedBoardLineStyle = false;
		this._changedTickLabelStyle = false;
		this._changedTickLabelRotate = false;

		var info = this._labelGroup.getGlobalBoundRect(false, true);



		if (changedTicks || this._changedTickLabelRotate) {
			this._labelHeight = pixedlabelheight;
			this._labelWidth = pixedlabelwidth;
		}
		else {
			this._labelHeight = info.height;
			this._labelWidth = info.width;
		}
		if (this._direction == "x") {
			this._tickendspace = this._labelWidth / 2;
			if (this.parent._chartxtickspace < this._tickendspace) {
				this.parent._chartxtickspace = this._tickendspace;
			}
		}
		else {
			this._tickendspace = this._labelHeight / 2;
			if (this.parent._chartytickspace < this._tickendspace) {
				this.parent._chartytickspace = this._tickendspace;
			}
		}


		this._tickendspace = 0;
	};

	_pChartAxisControl._getTickLabelAlign = function (labelrotate) {
		var location = this._location, textAlign, verticalAlign;

		labelrotate = labelrotate || 0;

		if (this._direction == "x") {
			if (location == "bottom") {
				verticalAlign = "top";
				if (labelrotate > 0) {
					textAlign = "left";
					if (labelrotate == 90) {
						verticalAlign = "middle";
					}
				}
				else if (labelrotate < 0) {
					textAlign = "right";
					if (labelrotate == -90) {
						verticalAlign = "middle";
					}
				}
				else {
					textAlign = "center";
				}
			}
			else if (location == "top") {
				verticalAlign = "bottom";
				if (labelrotate > 0) {
					textAlign = "right";
					if (labelrotate == 90) {
						verticalAlign = "middle";
					}
				}
				else if (labelrotate < 0) {
					textAlign = "left";
					if (labelrotate == -90) {
						verticalAlign = "middle";
					}
				}
				else {
					textAlign = "center";
					verticalAlign = "top";
				}
			}
		}
		else {
			verticalAlign = "middle";
			if (location == "right") {
				textAlign = "left";
				if (labelrotate == 90) {
					textAlign = "center";
					verticalAlign = "bottom";
				}
				else if (labelrotate == -90) {
					textAlign = "center";
					verticalAlign = "top";
				}
			}
			else if (location == "left") {
				textAlign = "right";
				if (labelrotate == 0) {
					textAlign = "left";
				}
				else if (labelrotate == 90) {
					textAlign = "center";
					verticalAlign = "top";
				}
				else if (labelrotate == -90) {
					textAlign = "center";
					verticalAlign = "bottom";
				}
			}
		}

		this._tickLabelTextAlign = textAlign;
		this._tickLabelVerticalAlign = verticalAlign;
	};

	_pChartAxisControl._createTitle = function () {
		if (!this._title) {
			this._title = new nexacro.GraphicsText(0, 0);
			this._title.set_id("ChartAxisTitle");
			this._title.set_textAlign("center");
			this._title.set_verticalAlign("top");
			this._group.addChild(this._title);
			this._title._axis = this;
		}
	};

	_pChartAxisControl._arrangeTickGroup = function (width, height) {
		var axisLine = this._axisLine, direction = this._direction, location = this._location, axislinestyle = this._axislinestyle, axislinewidth = 0, x = 0, y = 0, axisRectWidth = 0, axisRectHeight = 0, tickendspace = this._tickendspace, axisRect = this._axisRect.getGlobalBoundRect(false, true);

		if (axisLine) {
			axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 0;
			axislinewidth *= 0.5;
		}

		var tickstartgap = 0;
		var tickendgap = 0;
		var charttype = this.parent._type_name;
		var type = this._type;
		if (charttype == "BasicChart") {
			var categoryaxis = this.parent.categoryaxis;
			if (categoryaxis) {
				tickstartgap = categoryaxis._tickstartgap;
				tickendgap = categoryaxis._tickendgap;
			}
		}

		if (direction == "x") {
			if (type == "categoryAxis") {
				x = axisRect.left - tickstartgap;
				axisRectWidth = axisRect.width + tickstartgap + tickendgap + tickendspace;
			}
			else {
				x = axisRect.left;
				axisRectWidth = axisRect.width + tickendspace;
			}

			if (location == "top") {
				y = axisRect.bottom - axislinewidth;
			}
			else {
				y = axisRect.top + axislinewidth;
			}

			if (axisLine) {
				axisLine.set_x1(x);
				axisLine.set_y1(y);
				axisLine.set_x2(x + axisRectWidth);
				axisLine.set_y2(y);
			}
		}
		else {
			if (type == "categoryAxis") {
				y = axisRect.top - tickstartgap - tickendspace;
				axisRectHeight = axisRect.height + tickstartgap + tickendgap + tickendspace;
			}
			else {
				y = axisRect.top - tickendspace;
				if (charttype == "BasicChart") {
					tickendspace = 0;
				}
				axisRectHeight = axisRect.height + tickendspace;
			}

			if (location == "left") {
				x = axisRect.right - axislinewidth;
			}
			else {
				x = axisRect.left + axislinewidth;
			}

			if (axisLine) {
				axisLine.set_x1(x);
				axisLine.set_y1(y);
				axisLine.set_x2(x);
				axisLine.set_y2(y + axisRectHeight);
			}
		}

		var ticks = this._ticks, tick, value, ticksize, tickXoff = 0, tickYoff = 0, tickmin = this._min, tickmax = this._max, tickboardLine, vc = 0;

		if ((this.ticksize == "" || this.ticksize == undefined) && this.ticksize !== 0) {
			ticksize = 10;
		}
		else {
			ticksize = this.ticksize;
		}

		if (ticksize > 0) {
			if (location == "top") {
				tickYoff = -ticksize;
				y -= axislinewidth;
			}
			else if (location == "bottom") {
				tickYoff = ticksize;
				y += axislinewidth;
			}
			else if (location == "left") {
				tickXoff = -ticksize;
				x -= axislinewidth;
			}
			else if (location == "right") {
				tickXoff = ticksize;
				x += axislinewidth;
			}
		}
		var xtickendspace = this.parent._xaxes[0]._tickendspace;
		var ytickendspace = this.parent._yaxes[0]._tickendspace;
		var tickgap = 0;
		for (var i = 0; i < ticks.length; i++) {
			tick = ticks[i].lineElement;
			tickboardLine = ticks[i].boardlineElement;
			value = ticks[i].v;

			if (isNaN(value) || value < tickmin || value > tickmax) {
				continue;
			}

			vc = this.p2c(value);
			if (this._direction == "x") {
				x = vc + axisRect.left;
			}
			else {
				y = vc + axisRect.top;
			}

			ticks[i]._point = {
				"x1" : x, 
				"y1" : y, 
				"x2" : x + tickXoff, 
				"y2" : y + tickYoff
			};
			if (tick) {
				tick.set_x1(x);
				tick.set_y1(y);
				tick.set_x2(x + tickXoff);
				tick.set_y2(y + tickYoff);
			}

			if (tickboardLine) {
				if (direction == "x") {
					tickboardLine.set_x1(vc);
					tickboardLine.set_y1(0);
					tickboardLine.set_x2(vc);
					if (charttype == "BasicChart") {
						ytickendspace = 0;
					}
					if (type == "categoryAxis") {
						tickboardLine.set_y2(height + ytickendspace);
					}
					else {
						tickgap = 0;
						if (this.parent.vrangebar && this.parent.vrangebar._group.visible) {
							tickgap = tickstartgap + tickendgap;
						}
						tickboardLine.set_y2(height + tickgap + ytickendspace);
					}
				}
				else {
					tickboardLine.set_x1(0);
					tickboardLine.set_y1(vc);
					if (type == "categoryAxis") {
						tickboardLine.set_x2(width + xtickendspace);
					}
					else {
						tickgap = 0;
						if (this.parent.hrangebar && this.parent.hrangebar._group.visible) {
							tickgap = tickstartgap + tickendgap;
						}
						tickboardLine.set_x2(width + tickgap + xtickendspace);
					}
					tickboardLine.set_y2(vc);
				}
			}
		}
	};

	_pChartAxisControl._arrangeLabelGroup = function () {
		var ticks = this._ticks, tick, labelEle, dX = 0, textW = 0, textH = 0, x = 0, y = 0, value, labelrotate = this.labelrotate, location = this._location, labelgap = +this._labelgap, labelBoundRect, axislinestyle = this._axislinestyle, axislinewidth = 0, ticksize, _ticksize, tickGroupSize = 0, ticklinestyle = this._ticklinestyle, ticklinewidth = 0, pos, axisRect = this._axisRect.getGlobalBoundRect(false, true);

		axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 1;
		ticklinewidth = ticklinestyle ? ticklinestyle._getBorderLeftWidth() : 1;

		if ((this.ticksize == "" || this.ticksize == undefined) && this.ticksize !== 0) {
			_ticksize = 10;
		}
		else {
			_ticksize = this.ticksize;
		}
		ticksize = +_ticksize;

		if (ticklinewidth < 1) {
			ticksize = 0;
		}

		tickGroupSize = axislinewidth + ticksize;
		ticklinewidth *= 0.5;

		for (var i = 0; i < ticks.length; i++) {
			tick = ticks[i];

			labelEle = tick.labelElement;
			value = tick.v;
			dX = 0;

			if (nexacro._GraphicsLib.isEmpty(tick.label) || nexacro._GraphicsLib.isEmpty(labelEle) || value < this._min || value > this._max) {
				continue;
			}

			labelBoundRect = labelEle.getGlobalBoundRect();
			textW = labelBoundRect.width;
			textH = labelBoundRect.height;

			if (this._direction == "x") {
				x = tick._point.x1;
				labelEle.set_x(x);
				pos = labelEle.getCenter();
				var cx = pos.x;

				var _txtWidthHalf = (labelEle._txtSize[0] || textW) / 2;
				if (x == axisRect.left) {
					if (cx - (_txtWidthHalf) < 0) {
						labelEle.set_x(axisRect.left + (Math.abs(cx - _txtWidthHalf)));
					}
				}
				else if (x == axisRect.right) {
					var rectwidth = this.parent._getClientWidth();
					if (cx + (_txtWidthHalf) > rectwidth) {
						labelEle.set_x(axisRect.right - ((cx + _txtWidthHalf) - rectwidth));
					}
				}
				if (location == "bottom") {
					y = axisRect.top + tickGroupSize + labelgap;
				}
				else {
					y = axisRect.top + axisRect.height - tickGroupSize - labelgap;
					if (labelrotate == 0) {
						y = y - textH;
					}
				}

				labelEle.set_textAlign(this._tickLabelTextAlign);
				labelEle.set_verticalAlign(this._tickLabelVerticalAlign);
				labelEle.set_y(y);
			}
			else {
				y = tick._point.y1;
				labelEle.set_y(y);
				pos = labelEle.getCenter();
				var cy = pos.y;
				var _txtHeightHalf = (labelEle._txtSize[1] || textH) / 2;

				if (y == axisRect.top) {
					if (cy - _txtHeightHalf < 0) {
						labelEle.set_y(axisRect.top + Math.abs(cy - _txtHeightHalf));
					}
				}
				else if (y == axisRect.bottom) {
					var rectheight = this.parent._getClientHeight();
					if (cy + _txtHeightHalf > rectheight) {
						labelEle.set_y(axisRect.bottom - ((cy + _txtHeightHalf) - rectheight));
					}
				}
				if (location == "right") {
					x = axisRect.left + tickGroupSize + labelgap;
				}
				else {
					x = axisRect.left + axisRect.width - tickGroupSize - labelgap;
					if (labelrotate == 0) {
						x = x - textW;
					}
				}

				labelEle.set_textAlign(this._tickLabelTextAlign);
				labelEle.set_verticalAlign(this._tickLabelVerticalAlign);
				labelEle.set_x(x);
			}
		}
	};

	_pChartAxisControl._arrangeTitle = function () {
		var title = this._title;
		if (!title) {
			return;
		}

		var titletextalign = this.titletextalign, ticks = this._ticks, axislinestyle = this._axislinestyle, axislinewidth = 0, ticksize = 0, _ticksize = 0, ticklinestyle = this._ticklinestyle, ticklineWidth = 0, labelgap = this._labelgap || 0, labelWidth = this._labelWidth, labelHeight = this._labelHeight, titleWidth = this._titleWidth, titleHeight = this._titleHeight, titlegap = this.titlegap || 0, location = this._location, titlerotate = this._titlerotate, labelGroupRect = this._labelGroup.getGlobalBoundRect(false, true), axisRect = this._axisRect.getGlobalBoundRect(false, true), x = 0, y = 0;

		axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 1;
		ticklineWidth = ticklinestyle ? ticklinestyle._getBorderWidth() : 1;

		if (ticklineWidth > 0) {
			if ((this.ticksize == "" || this.ticksize == undefined) && this.ticksize !== 0) {
				_ticksize = 10;
			}
			else {
				_ticksize = this.ticksize;
			}
			ticksize = +_ticksize;
		}

		if ((this.ticksize == "" || this.ticksize == undefined) && this.ticksize !== 0) {
			_ticksize = 10;
		}
		else {
			_ticksize = this.ticksize;
		}

		if (labelWidth == 0 || labelHeight == 0) {
			labelgap = 0;
		}

		if (this._direction == "x") {
			if (location == "bottom") {
				y = axisRect.top + axislinewidth + ticksize + labelgap + labelHeight + titlegap;
			}
			else {
				y = axisRect.bottom - axislinewidth - ticksize - labelgap - labelHeight - titleHeight - titlegap;
			}

			if (titletextalign == "low") {
				x = axisRect.left + (titleWidth * 0.5);
			}
			else if (titletextalign == "high") {
				x = axisRect.right - (titleWidth * 0.5);
			}
			else {
				x = (axisRect.width * 0.5) + axisRect.left;
			}

			title.setTransform("translate(" + x + "," + y + ")");
		}
		else {
			y = (axisRect.height + axisRect.top) * 0.5 + (axisRect.top * 0.5) - (titleHeight * 0.5);

			if (titlerotate == -90 || titlerotate == 90) {
				titleWidth = this._titleHeight;
				titleHeight = this._titleWidth;
			}

			if (location == "left") {
				if (titlerotate == -90) {
					x = axisRect.right - axislinewidth - ticksize - labelgap - labelWidth - titlegap - titleWidth;
				}
				else if (titlerotate == 90) {
					x = axisRect.right - axislinewidth - ticksize - labelgap - labelWidth - titlegap;
				}
				else {
					x = axisRect.right - axislinewidth - ticksize - labelgap - (titleWidth * 0.5) - labelWidth - titlegap;
				}
			}
			else {
				if (titlerotate == -90) {
					x = axisRect.left + axislinewidth + ticksize + labelgap + labelWidth + titlegap;
				}
				else if (titlerotate == 90) {
					x = axisRect.left + axislinewidth + ticksize + labelgap + labelWidth + titleWidth + titlegap;
				}
				else {
					x = axisRect.left + axislinewidth + ticksize + labelgap + labelWidth + (titleWidth * 0.5) + titlegap;
				}
			}

			if (titlerotate == -90 || titlerotate == 90) {
				if (titletextalign == "high") {
					y = axisRect.top + (titleHeight * 0.5);
				}
				else if (titletextalign == "low") {
					y = axisRect.top + axisRect.height - (titleHeight * 0.5);
				}

				title.setTransform("translate(" + x + "," + y + "),rotate(" + titlerotate + ")");
			}
			else {
				if (titletextalign == "high") {
					y = axisRect.top;
				}
				else if (titletextalign == "low") {
					y = axisRect.top + axisRect.height - titleHeight;
				}

				title.setTransform("translate(" + x + "," + y + ")");
			}
		}
	};

	_pChartAxisControl._measureAxisRect = function () {
		if (!this.visible) {
			this._axisRect.set_width(0);
			this._axisRect.set_height(0);
			return;
		}

		var axislinestyle = this._axislinestyle, axislinewidth = 0, size = 0, ticks = this._ticks, ticksize, ticklinestyle = this._ticklinestyle, ticklineWidth = 0, labelgap = this._labelgap, labelWidth = this._labelWidth, labelHeight = this._labelHeight, titlegap = this.titlegap || 0, titlerotate = this._titlerotate;

		if ((this.ticksize == "" || this.ticksize == undefined) && this.ticksize !== 0) {
			ticksize = 10;
		}
		else {
			ticksize = this.ticksize;
		}

		axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 1;
		size += axislinewidth;
		ticklineWidth = ticklinestyle ? ticklinestyle._getBorderWidth() : 1;

		if (ticklineWidth > 0) {
			if (!isNaN(+ticksize)) {
				size += +ticksize;
			}
		}

		if (labelWidth == 0 || labelHeight == 0) {
			labelgap = 0;
		}

		if (!isNaN(+labelgap)) {
			size += +labelgap;
		}

		this._getTitleSize();
		var titleWidth = this._titleWidth;
		var titleHeight = this._titleHeight;

		if (titleWidth == 0 || titleHeight == 0) {
			titlegap = 0;
		}
		if (!isNaN(+titlegap)) {
			size += +titlegap;
		}

		if (this._direction == "x") {
			size += labelHeight;
			size += titleHeight;
			this._axisRect.set_height(size);
		}
		else {
			size += labelWidth;
			if (titlerotate == -90 || titlerotate == 90) {
				size += titleHeight;
			}
			else {
				size += titleWidth;
			}
			this._axisRect.set_width(size);
		}
	};

	_pChartAxisControl._getTitleSize = function () {
		if (this._title) {
			var titleBound = this._title._getRect();
			this._titleHeight = titleBound.height;
			this._titleWidth = titleBound.width;
		}
		else {
			this._titleHeight = 0;
			this._titleWidth = 0;
		}
	};

	_pChartAxisControl._changeContentsProperty = function (nm, newVal, oldVal) {
		var contents = this.parent.contents, idx = -1, valueaxes = this.parent.valueaxes, type = this._type;

		if (type == "categoryAxis") {
			if (contents && contents.categoryaxis) {
				contents.categoryaxis[nm] = newVal;
			}
		}
		else {
			idx = nexacro._GraphicsLibArray.indexOf(valueaxes, this);
			if (contents && contents.valueaxes[idx]) {
				contents.valueaxes[idx][nm] = newVal;
			}
		}
	};

	_pChartAxisControl._afterSetProperties = function () {
		this.on_apply_boardlinevisible(this.boardlinevisible);
		this.on_apply_axislinestyle(this._axislinestyle);
		this.on_apply_ticklinestyle(this._ticklinestyle);
		this.on_apply_labeltextfont(this._labeltextfont);
		this.on_apply_labeltextcolor(this._labeltextcolor);
		this.on_apply_titletext(this.titletext);
		this.on_apply_titletextfont(this._titletextfont);
		this.on_apply_titletextcolor(this._titletextcolor);

		this.on_apply_axistype();
	};

	delete _pChartAxisControl;
}

if (!nexacro.ChartRangebarControl) {
	nexacro.ChartRangebarControl = function (id, parent, graphicsControl, isvscroll) {
		this.id = id;
		this.parent = parent;
		this._graphicsControl = graphicsControl;
		this._isvscroll = isvscroll;
		this._createGroup();
	};

	var _pChartRangebarControl = nexacro.ChartRangebarControl.prototype = nexacro._createPrototype(nexacro.Object, nexacro.ChartRangebarControl);
	_pChartRangebarControl._type_name = "ChartRangebarControl";


	_pChartRangebarControl._group = null;
	_pChartRangebarControl._rangebarRect = null;
	_pChartRangebarControl._trackbarRect = null;
	_pChartRangebarControl._decImage = null;
	_pChartRangebarControl._incImage = null;


	_pChartRangebarControl.background = "";
	_pChartRangebarControl.trackbargripdecimage = "";
	_pChartRangebarControl.trackbargripdecimageheight = undefined;
	_pChartRangebarControl.trackbargripdecimagewidth = undefined;
	_pChartRangebarControl.trackbargripimageposition = "middle";
	_pChartRangebarControl.trackbargripincimage = "";
	_pChartRangebarControl.trackbargripincimageheight = undefined;
	_pChartRangebarControl.trackbargripincimagewidth = undefined;
	_pChartRangebarControl.trackbargripsize = undefined;
	_pChartRangebarControl.linestyle = "";
	_pChartRangebarControl.radius = "";
	_pChartRangebarControl.size = undefined;
	_pChartRangebarControl.trackbarfillstyle = "";
	_pChartRangebarControl.trackbarlinestyle = "";
	_pChartRangebarControl.trackbarminsize = undefined;
	_pChartRangebarControl.trackbarpadding = "";
	_pChartRangebarControl.trackbarradius = "";
	_pChartRangebarControl.visible = true;

	_pChartRangebarControl.startdata = undefined;
	_pChartRangebarControl.enddata = undefined;


	_pChartRangebarControl._axis = null;
	_pChartRangebarControl._trackbarRectBounds = null;
	_pChartRangebarControl._incImageWidth = 0;
	_pChartRangebarControl._decImageWidth = 0;
	_pChartRangebarControl._incImageHeight = 0;
	_pChartRangebarControl._decImageHeight = 0;
	_pChartRangebarControl._rearrange = true;

	_pChartRangebarControl._background = null;
	_pChartRangebarControl._linestyle = null;
	_pChartRangebarControl._radius = null;
	_pChartRangebarControl._trackbarfillstyle = null;
	_pChartRangebarControl._trackbarlinestyle = null;
	_pChartRangebarControl._trackbarradius = null;
	_pChartRangebarControl._trackbarresizing = true;
	_pChartRangebarControl._trackbarstart = -1;
	_pChartRangebarControl._trackbarend = -1;
	_pChartRangebarControl._isvscroll = false;

	_pChartRangebarControl.destroy = function () {
		var itemID = this._group.id;

		var item = this._graphicsControl.getObjectByID(itemID);
		if (item) {
			this._graphicsControl.removeChild(item);
		}
		this._group.destroy();

		this._group = null;
		this._rangebarRect = null;
		this._trackbarRect = null;
		this._decImage = null;
		this._incImage = null;

		this._background = null;
		this._linestyle = null;
		this._trackbarfillstyle = null;
		this._trackbarlinestyle = null;
		this._trackbarradius = null;

		if (this.parent) {
			if (this.parent.hrangebar && !this._isvscroll) {
				this.parent._deleteContentsProp("hrangebar");
				this.parent.hrangebar = null;
			}
			if (this.parent.vrangebar && this._isvscroll) {
				this.parent._deleteContentsProp("vrangebar");
				this.parent.vrangebar = null;
			}
			this.parent._changedData = true;
			this.parent = null;
		}

		nexacro.Object.prototype.destroy.call(this);

		return true;
	};

	_pChartRangebarControl.set_visible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.visible !== val) {
			this._changeContentsProperty("visible", val, this.visible);
			this.visible = val;
			this.on_apply_visible(val);
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_visible = function (visible) {
		this._group.set_visible(visible);
		this.parent._changedData = true;
	};

	_pChartRangebarControl.set_startdata = function (val) {
		if (val !== undefined) {
			if (isNaN(val)) {
				return;
			}
		}

		if (val !== "" && val != null) {
			var istimeaxis = this._isTimeAxis;
			if (istimeaxis) {
				val = eval(val);
			}
			else {
				val = parseFloat(val);
			}

			if (this.startdata !== val) {
				this._changeContentsProperty("startdata", val, this.startdata);
				this.startdata = val;
				this.on_apply_startdata();
			}
		}
		else {
			if (this.startdata) {
				this.startdata = undefined;
				this.on_apply_startdata();
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_startdata = function () {
		this.parent._changedData = true;
	};

	_pChartRangebarControl.set_enddata = function (val) {
		if (val !== undefined) {
			if (isNaN(val)) {
				return;
			}
		}

		if (val !== "" && val != null) {
			var istimeaxis = this._isTimeAxis;
			if (istimeaxis) {
				val = eval(val);
			}
			else {
				val = parseFloat(val);
			}

			if (this.enddata !== val) {
				this._changeContentsProperty("enddata", val, this.enddata);
				this.enddata = val;
				this.on_apply_enddata();
			}
		}
		else {
			if (this.enddata) {
				this.enddata = undefined;
				this.on_apply_enddata();
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_enddata = function () {
		this.parent._changedData = true;
	};

	_pChartRangebarControl.set_size = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}

			if (val != "") {
				val = parseInt(val);
			}
		}

		if (this.size !== val) {
			this._changeContentsProperty("size", val, this.size);
			this.size = val;
			this.on_apply_size(val);
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_size = function (size) {
		if ((size == "" || size == null) && size !== 0) {
			size = 15;
		}
		if (this._isvscroll) {
			this._rangebarRect.set_width(size);
		}
		else {
			this._rangebarRect.set_height(size);
		}
		this.parent._changedData = true;
	};

	_pChartRangebarControl.set_background = function (val) {
		this.background = val;
		if (val) {
			if (this._background == null || this._background.value != val) {
				var oldValue;
				if (this._background) {
					oldValue = this._background.value;
				}
				this._changeContentsProperty("background", val, oldValue);

				var background = nexacro.BackgroundObject(val, this);
				this._background = background;
				this.on_apply_background(background);
			}
		}
		else {
			if (this._background) {
				this._background = null;
				this.on_apply_background(null);
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_background = function (background) {
		this._rangebarRect.set_fillstyle(background ? background.value : "");
	};

	_pChartRangebarControl.set_linestyle = function (val) {
		this.linestyle = val;
		if (val) {
			if (this._linestyle == null || !this._linestyle._single || this._linestyle.value != val) {
				var oldValue;
				if (this._linestyle) {
					oldValue = this._linestyle.value;
				}
				this._changeContentsProperty("linestyle", val, oldValue);

				var linestyle = nexacro.BorderObject(val);
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

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_linestyle = function (linestyle) {
		this._rangebarRect.set_strokepen(linestyle ? linestyle.value || linestyle : "1px solid #717a8380");
		this.parent._changedData = true;
	};

	_pChartRangebarControl.set_radius = function (val) {
		this.radius = val;
		if (val) {
			if (this._radius == null || this._radius.value != val) {
				var oldValue;
				if (this._radius) {
					oldValue = this._radius.value;
				}
				this._changeContentsProperty("radius", val, oldValue);

				var radius = nexacro.PaddingObject(val);
				this._radius = radius;
				this.on_apply_radius(radius);
			}
		}
		else {
			if (this._radius) {
				this._radius = null;
				this.on_apply_radius(null);
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_radius = function (radius) {
		this._rangebarRect.set_radiusx(radius ? radius.top : "");
		this._rangebarRect.set_radiusy(radius ? radius.right : "");
	};

	_pChartRangebarControl.set_trackbarfillstyle = function (val) {
		this.trackbarfillstyle = val;
		if (val) {
			if (this._trackbarfillstyle == null || this._trackbarfillstyle.value != val) {
				var oldValue;
				if (this._trackbarfillstyle) {
					oldValue = this._trackbarfillstyle.value;
				}
				this._changeContentsProperty("trackbarfillstyle", val, oldValue);

				var trackbarfillstyle = nexacro.BackgroundObject(val, this);
				this._trackbarfillstyle = trackbarfillstyle;
				this.on_apply_trackbarfillstyle(trackbarfillstyle);
			}
		}
		else {
			if (this._trackbarfillstyle) {
				this._trackbarfillstyle = null;
				this.on_apply_trackbarfillstyle(null);
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_trackbarfillstyle = function (trackbarfillstyle) {
		this._trackbarRect.set_fillstyle(trackbarfillstyle ? trackbarfillstyle.value : "");
	};

	_pChartRangebarControl.set_trackbarlinestyle = function (val) {
		this.trackbarlinestyle = val;
		if (val) {
			if (this._trackbarlinestyle == null || !this._trackbarlinestyle._single || this._trackbarlinestyle.value != val) {
				var oldValue;
				if (this._trackbarlinestyle) {
					oldValue = this._trackbarlinestyle.value;
				}
				this._changeContentsProperty("trackbarlinestyle", val, oldValue);

				var trackbarlinestyle = nexacro.BorderObject(val);
				this._trackbarlinestyle = trackbarlinestyle;
				this.on_apply_trackbarlinestyle(trackbarlinestyle);
			}
		}
		else {
			if (this._trackbarlinestyle) {
				this._trackbarlinestyle = null;
				this.on_apply_trackbarlinestyle(null);
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_trackbarlinestyle = function (trackbarlinestyle) {
		this._trackbarRect.set_strokepen(trackbarlinestyle ? trackbarlinestyle.value || trackbarlinestyle : "1px solid #717a8380");
		this.parent._changedData = true;
	};

	_pChartRangebarControl.set_trackbarradius = function (val) {
		this.trackbarradius = val;
		if (val) {
			if (this._trackbarradius == null || this._trackbarradius.value != val) {
				var oldValue;
				if (this._trackbarradius) {
					oldValue = this._trackbarradius.value;
				}
				this._changeContentsProperty("trackbarradius", val, oldValue);

				var trackbarradius = nexacro.PaddingObject(val);
				this._trackbarradius = trackbarradius;
				this.on_apply_trackbarradius(trackbarradius);
			}
		}
		else {
			if (this._trackbarradius) {
				this._trackbarradius = null;
				this.on_apply_trackbarradius(null);
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_trackbarradius = function (trackbarradius) {
		this._trackbarRect.set_radiusx(trackbarradius ? trackbarradius.left : "");
		this._trackbarRect.set_radiusy(trackbarradius ? trackbarradius.top : "");
	};

	_pChartRangebarControl.set_trackbarminsize = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}

		if (this.trackbarminsize != val) {
			if (val !== undefined) {
				if (val < 10) {
					return;
				}
				var boundW = this.parent._getClientWidth();
				var boundH = this.parent._getClientHeight();
				if (this.parent._boardRect) {
					boundW = this.parent._boardRect.width - this.parent._boardBorderWidth;
					boundH = this.parent._boardRect.height - this.parent._boardBorderWidth;
				}
				if (this._isvscroll && boundH !== undefined && !isNaN(boundH = +boundH) && boundH > 0) {
					if (val >= boundH) {
						return;
					}
				}
				else if (boundW !== undefined && !isNaN(boundW = +boundW) && boundW > 0) {
					if (val >= boundW) {
						return;
					}
				}
			}
			this._changeContentsProperty("trackbarminsize", val, this.trackbarminsize);
			this.trackbarminsize = val;
		}

		this.parent._draw();
	};

	_pChartRangebarControl.set_trackbarpadding = function (val) {
		this.trackbarpadding = val;
		if (val) {
			if (this._trackbarpadding == null || this._trackbarpadding.value != val) {
				var oldValue;
				if (this._trackbarpadding) {
					oldValue = this._trackbarpadding.value;
				}
				this._changeContentsProperty("trackbarpadding", val, oldValue);

				var trackbarpadding = nexacro.PaddingObject(val);
				this._trackbarpadding = trackbarpadding;
				this.on_apply_trackbarpadding();
			}
		}
		else {
			if (this._trackbarpadding) {
				this._trackbarpadding = null;
				this.on_apply_trackbarpadding();
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_trackbarpadding = function () {
		this._rearrange = true;
	};

	_pChartRangebarControl.set_trackbargripsize = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}

			if (val != "") {
				val = parseInt(val);
			}
		}

		if (this.trackbargripsize !== val) {
			this._changeContentsProperty("trackbargripsize", val, this.trackbargripsize);
			this.trackbargripsize = val;
		}

		this.parent._draw();
	};
	_pChartRangebarControl.onloadedtrackbargripimgs = function () {
		if (this._incImage) {
			if (this._incImage.imagewidth > 0 && !this.trackbargripincimagewidth) {
				this.on_apply_trackbargripincimagewidth(this._incImage.imagewidth);
			}

			if (this._incImage.imageheight > 0 && !this.trackbargripincimageheight) {
				this.on_apply_trackbargripincimageheight(this._incImage.imageheight);
			}
		}
		if (this._decImage) {
			if (this._decImage.imagewidth > 0 && !this.trackbargripdecimagewidth) {
				this.on_apply_trackbargripdecimagewidth(this._decImage.imagewidth);
			}
			if (this._decImage.imageheight > 0 && !this.trackbargripdecimageheight) {
				this.on_apply_trackbargripdecimageheight(this._decImage.imageheight);
			}
		}
		this.parent._rearrange = true;
		this.parent._draw();
	};
	_pChartRangebarControl.set_trackbargripdecimage = function (val) {
		if (this.trackbargripdecimage != val) {
			this._changeContentsProperty("trackbargripdecimage", val, this.trackbargripdecimage);
			this.trackbargripdecimage = val;
			this._decImage._redrawparent = this;
			this._decImage._redrawcallback = this.onloadedtrackbargripimgs;
			this.on_apply_trackbargripdecimage(val);

			if (this._decImage) {
				if (this._decImage.width > 0) {
					this.on_apply_trackbargripdecimagewidth(this._decImage.width);
				}
				if (this._decImage.height > 0) {
					this.on_apply_trackbargripdecimageheight(this._decImage.height);
				}
			}
		}
	};


	_pChartRangebarControl.set_trackbargripincimage = function (val) {
		if (this.trackbargripincimage != val) {
			this._changeContentsProperty("trackbargripincimage", val, this.trackbargripincimage);
			this.trackbargripincimage = val;
			this._incImage._redrawparent = this;
			this._incImage._redrawcallback = this.onloadedtrackbargripimgs;
			this.on_apply_trackbargripincimage(val);

			if (this._incImage) {
				if (this._incImage.width > 0) {
					this.on_apply_trackbargripincimagewidth(this._incImage.width);
				}
				if (this._incImage.height > 0) {
					this.on_apply_trackbargripincimageheight(this._incImage.height);
				}
			}
		}
	};
	_pChartRangebarControl.on_apply_trackbargripdecimage = function (trackbargripdecimage) {
		this._decImage.set_src(trackbargripdecimage);
	};

	_pChartRangebarControl.set_trackbargripdecimagewidth = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}
		}

		if (val !== "" && val != null) {
			val = parseInt(val);

			if (this.trackbargripdecimagewidth !== val) {
				this._changeContentsProperty("trackbargripdecimagewidth", val, this.trackbargripdecimagewidth);
				this.trackbargripdecimagewidth = val;
				this.on_apply_trackbargripdecimagewidth(val);
			}
		}
		else {
			if (this.trackbargripdecimagewidth) {
				this.trackbargripdecimagewidth = undefined;
				this.on_apply_trackbargripdecimagewidth(val);
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_trackbargripdecimagewidth = function (trackbargripdecimagewidth) {
		this._decImage.set_width(trackbargripdecimagewidth);
		this._rearrange = true;
	};

	_pChartRangebarControl.set_trackbargripdecimageheight = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}
		}

		if (val !== "" && val != null) {
			val = parseInt(val);

			if (this.trackbargripdecimageheight !== val) {
				this._changeContentsProperty("trackbargripdecimageheight", val, this.trackbargripdecimageheight);
				this.trackbargripdecimageheight = val;
				this.on_apply_trackbargripdecimageheight(val);
			}
		}
		else {
			if (this.trackbargripdecimageheight) {
				this.trackbargripdecimageheight = undefined;
				this.on_apply_trackbargripdecimageheight(val);
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_trackbargripdecimageheight = function (trackbargripdecimageheight) {
		this._decImage.set_height(trackbargripdecimageheight);
		this._rearrange = true;
	};


	_pChartRangebarControl.on_apply_trackbargripincimage = function (trackbargripincimage) {
		this._incImage.set_src(trackbargripincimage);
	};

	_pChartRangebarControl.set_trackbargripincimagewidth = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}
		}

		if (val !== "" && val != null) {
			val = parseInt(val);

			if (this.trackbargripincimagewidth !== val) {
				this._changeContentsProperty("trackbargripincimagewidth ", val, this.trackbargripincimagewidth);
				this.trackbargripincimagewidth = val;
				this.on_apply_trackbargripincimagewidth(val);
			}
		}
		else {
			if (this.trackbargripincimagewidth) {
				this.trackbargripincimagewidth = undefined;
				this.on_apply_trackbargripincimagewidth(val);
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_trackbargripincimagewidth = function (trackbargripincimagewidth) {
		this._incImage.set_width(trackbargripincimagewidth);
		this._rearrange = true;
	};

	_pChartRangebarControl.set_trackbargripincimageheight = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}
		}

		if (val !== "" && val != null) {
			val = parseInt(val);

			if (this.trackbargripincimageheight !== val) {
				this._changeContentsProperty("trackbargripincimageheight  ", val, this.trackbargripincimageheight);
				this.trackbargripincimageheight = val;
				this.on_apply_trackbargripincimageheight(val);
			}
		}
		else {
			if (this.trackbargripincimageheight) {
				this.trackbargripincimageheight = undefined;
				this.on_apply_trackbargripincimageheight(val);
			}
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_trackbargripincimageheight = function (trackbargripincimageheight) {
		this._incImage.set_height(trackbargripincimageheight);
		this._rearrange = true;
	};

	_pChartRangebarControl.set_trackbargripimageposition = function (val) {
		var trackbargripimageposition_enum = ["upside", "middle", "downside"];
		if (trackbargripimageposition_enum.indexOf(val) == -1) {
			return;
		}

		if (this.trackbargripimageposition != val) {
			this._changeContentsProperty("trackbargripimageposition", val, this.trackbargripimageposition);
			this.trackbargripimageposition = val;
			this.on_apply_trackbargripimageposition();
		}

		this.parent._draw();
	};

	_pChartRangebarControl.on_apply_trackbargripimageposition = function () {
		this._rearrange = true;
	};

	_pChartRangebarControl._createGroup = function () {
		this._group = new nexacro.GraphicsGroup();
		var checkid;
		if (this._isvscroll) {
			this._group.set_id("ChartVRangebarGroup");
			checkid = this._group.id;
		}
		else {
			this._group.set_id("ChartHRangebarGroup");
			checkid = this._group.id;
		}
		if (this._graphicsControl) {
			var item = this._graphicsControl.getObjectByID(checkid);
			if (item) {
				this._graphicsControl.removeChild(item);
				if (item) {
					item.destroy();
				}
			}
		}
		this._graphicsControl.addChild(this._group);

		this._createRangebarRect();
		this._createTrackbarRect();
		this._createDecImage();
		this._createIncImage();
	};

	_pChartRangebarControl._createRangebarRect = function () {
		this._rangebarRect = new nexacro.GraphicsRect(0, 0, 0, 0);
		this._rangebarRect.set_id("ChartRangebarRect");
		this._group.addChild(this._rangebarRect);
		this._rangebarRect._rangebar = this;
	};

	_pChartRangebarControl._createTrackbarRect = function () {
		this._trackbarRect = new nexacro.GraphicsRect(0, 0, 0, 0);
		this._trackbarRect.set_id("ChartTrackbarRect");
		this._trackbarRect._dragAction = true;
		this._trackbarRect._owner = this;
		this._group.addChild(this._trackbarRect);
		this._trackbarRect._rangebar = this;

		this._applyCursor(this._trackbarRect, "default");
	};

	_pChartRangebarControl._createDecImage = function () {
		this._decImage = new nexacro.GraphicsImage(0, 0);
		this._decImage.set_id("ChartChangeRangeDecImage");
		this._decImage._dragAction = true;
		this._decImage._owner = this;
		this._group.addChild(this._decImage);
		this._decImage._rangebar = this;
		if (this._isvscroll) {
			this._applyCursor(this._decImage, "n-resize");
		}
		else {
			this._applyCursor(this._decImage, "w-resize");
		}
	};

	_pChartRangebarControl._createIncImage = function () {
		this._incImage = new nexacro.GraphicsImage(0, 0);
		this._incImage.set_id("ChartChangeRangeIncImage");
		this._incImage._dragAction = true;
		this._incImage._owner = this;
		this._group.addChild(this._incImage);
		this._incImage._rangebar = this;
		if (this._isvscroll) {
			this._applyCursor(this._incImage, "s-resize");
		}
		else {
			this._applyCursor(this._incImage, "e-resize");
		}
	};

	_pChartRangebarControl._arrangeTrackbar = function () {
		var incImage = this._incImage, decImage = this._decImage, incImageSize, decImageSize, incImageWidth = 0, decImageWidth = 0, incImageHeight = 0, decImageHeight = 0;

		if (incImage) {
			incImageSize = incImage.getSize();
			incImageWidth = incImageSize ? incImageSize.width : 0;
			incImageHeight = incImageSize ? incImageSize.height : 0;
			this._incImageWidth = incImageWidth;
			this._incImageHeight = incImageHeight;
		}
		if (decImage) {
			decImageSize = decImage.getSize();
			decImageWidth = decImageSize ? decImageSize.width : 0;
			decImageHeight = decImageSize ? decImageSize.height : 0;
			this._decImageWidth = decImageWidth;
			this._decImageHeight = decImageHeight;
		}

		var p1 = 0, p2 = 0, trackbarpadding = this._trackbarpadding, padding = 0, paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0, linestyle = this._linestyle, trackbarlinestyle = this._trackbarlinestyle, start = 0, end = 0, trackbarSize = 0, borderwidth = 0, borderwidthHalf = 0, trackbarBorderwidth = 0, trackbarBorderwidthHalf = 0, left = 0, top = 0, val, imgValign, sCenter, sBound, decImgTop, incImgTop, size;

		if (trackbarpadding) {
			paddingLeft = trackbarpadding.left;
			paddingRight = trackbarpadding.right;
			paddingTop = trackbarpadding.top;
			paddingBottom = trackbarpadding.bottom;
		}

		if ((this.size == "" || this.size == undefined) && this.size !== 0) {
			size = 15;
		}
		else {
			size = this.size;
		}

		if (linestyle) {
			borderwidth = linestyle._getBorderLeftWidth();
		}
		else {
			borderwidth = 1;
		}
		borderwidthHalf = borderwidth * 0.5;

		if (trackbarlinestyle) {
			trackbarBorderwidth = trackbarlinestyle._getBorderLeftWidth();
		}
		else {
			trackbarBorderwidth = 1;
		}
		trackbarBorderwidthHalf = trackbarBorderwidth * 0.5;

		if (this._isvscroll) {
			if (this._axis) {
				var datamin = this._axis._tickmin || this._axis._datamin;
				var datamax = this._axis._tickmax || this._axis._datamax;
				if (this._trackbarresizing) {
					if (this._trackbarstart >= 0) {
						p1 = this._trackbarstart;
						val = this.c2pScroll(this._trackbarstart);
						this._axis._max = datamax - (val - datamin);
						this._enddata = this._axis._max;
					}
					else {
						this._axis._max = this._enddata;

						if (this._enddata >= datamax) {
							p1 = this.p2cScroll(datamin);
						}
						else {
							p1 = this.p2cScroll(datamax - (this._enddata - datamin));
						}
					}
					if (this._trackbarend >= 0) {
						p2 = this._trackbarend;

						val = this.c2pScroll(this._trackbarend);
						this._axis._min = datamax - val + datamin;
						this._startdata = this._axis._min;
					}
					else {
						this._axis._min = this._startdata;

						if (this._startdata <= datamin) {
							p2 = this.p2cScroll(datamax);
						}
						else {
							p2 = this.p2cScroll(datamax - (this._startdata - datamin));
						}
					}
				}
				else {
					p1 = this._trackbarstart;
					p2 = this._trackbarend;

					this._startdata = this.c2pScroll(this._trackbarstart);
					this._enddata = this.c2pScroll(this._trackbarend);

					this._axis._min = this._startdata;
					this._axis._max = this._enddata;

					this._axis._max = datamax - (this._startdata - datamin);
					this._axis._min = datamax - this._enddata + datamin;
					this._enddata = this._axis._max;
					this._startdata = this._axis._min;
				}
			}
			else {
				p1 = 0;
				p2 = 0;
			}
		}
		else {
			if (this._axis) {
				if (this._trackbarresizing) {
					if (this._trackbarstart >= 0) {
						this._startdata = this.c2pScroll(this._trackbarstart);
						this._axis._min = this._startdata;
						p1 = this._trackbarstart;
					}
					else {
						this._axis._min = this._startdata;
						p1 = this.p2cScroll(this._startdata);
					}
					if (this._trackbarend >= 0) {
						this._enddata = this.c2pScroll(this._trackbarend);
						this._axis._max = this._enddata;
						p2 = this._trackbarend;
					}
					else {
						this._axis._max = this._enddata;
						p2 = this.p2cScroll(this._enddata);
					}
				}
				else {
					p1 = this._trackbarstart;
					p2 = this._trackbarend;

					this._startdata = this.c2pScroll(this._trackbarstart);
					this._enddata = this.c2pScroll(this._trackbarend);

					this._axis._min = this._startdata;
					this._axis._max = this._enddata;
				}
			}
			else {
				p1 = 0;
				p2 = 0;
			}
		}


		if (this._isvscroll) {
			start = Math.min(p1, p2) + borderwidthHalf + trackbarBorderwidthHalf + paddingTop + decImageHeight;
			end = Math.max(p1, p2) - borderwidth - borderwidthHalf - trackbarBorderwidthHalf - paddingBottom - incImageHeight;


			if (this._trackbarresizing) {
				trackbarSize = end - start;
			}
			else {
				if (this._trackbarRect) {
					trackbarSize = this._trackbarRect.height;
				}
			}
			padding = borderwidth + trackbarBorderwidth + paddingLeft + paddingRight;
			top = start;
			left = paddingLeft + borderwidthHalf + trackbarBorderwidthHalf;

			if (this._trackbarRect) {
				this._trackbarRect.setTransform("translate(" + left + "," + top + ")");
				this._trackbarRect.set_width(size - padding);
				this._trackbarRect.set_height(trackbarSize);
			}

			if ((decImage && decImageSize) || (incImage && incImageSize)) {
				imgValign = this.trackbargripimageposition;
				sCenter = this._trackbarRect.getCenter();
				sBound = this._trackbarRect._getRect(true, true);



				decImgTop = 0, incImgTop = 0;
				var decImgLeft = 0, incImgLeft = 0;
				if (imgValign == "upside") {
					decImgLeft = incImgLeft = left - trackbarBorderwidthHalf;
				}
				else if (imgValign == "downside") {
					decImgLeft = sBound.right - decImageWidth + borderwidthHalf + trackbarBorderwidthHalf + paddingLeft;
					incImgLeft = sBound.right - incImageWidth + borderwidthHalf + trackbarBorderwidthHalf + paddingLeft;
				}
				else {
					incImgLeft = left + (sBound.width - incImageWidth) / 2 - trackbarBorderwidthHalf;
					decImgLeft = left + (sBound.width - decImageWidth) / 2 - trackbarBorderwidthHalf;
				}

				if (decImage) {
					if (imgValign == "middle") {
						decImage.set_x(decImgLeft);
					}
					else {
						decImage.set_x(decImgLeft);
					}
				}
				if (incImage) {
					if (imgValign == "middle") {
						incImage.set_x(incImgLeft);
					}
					else {
						incImage.set_x(incImgLeft);
					}
				}

				if (decImage) {
					decImage.setTransform("translate(0,0)");
					decImage.set_y(top - decImageHeight - trackbarBorderwidthHalf);
				}

				if (incImage) {
					incImage.setTransform("translate(0,0)");
					incImage.set_y(top + trackbarSize + trackbarBorderwidthHalf);
				}
			}
		}
		else {
			start = Math.min(p1, p2) + borderwidthHalf + trackbarBorderwidthHalf + paddingLeft + decImageWidth;
			end = Math.max(p1, p2) - borderwidth - borderwidthHalf - trackbarBorderwidthHalf - paddingRight - incImageWidth;


			if (this._trackbarresizing) {
				trackbarSize = end - start;
			}
			else {
				if (this._trackbarRect) {
					trackbarSize = this._trackbarRect.width;
				}
			}
			padding = borderwidth + trackbarBorderwidth + paddingTop + paddingBottom;
			left = start;
			top = paddingTop + borderwidthHalf + trackbarBorderwidthHalf;

			if (this._trackbarRect) {
				this._trackbarRect.setTransform("translate(" + left + "," + top + ")");
				this._trackbarRect.set_width(trackbarSize);
				this._trackbarRect.set_height(size - padding);
			}

			if ((decImage && decImageSize) || (incImage && incImageSize)) {
				imgValign = this.trackbargripimageposition;
				sCenter = this._trackbarRect.getCenter();
				sBound = this._trackbarRect._getRect(true, true);

				if (decImage) {
					decImage.setTransform("translate(0,0)");
					decImage.set_x(left - decImageWidth - trackbarBorderwidthHalf);
				}

				if (incImage) {
					incImage.setTransform("translate(0,0)");
					incImage.set_x(left + trackbarSize + trackbarBorderwidthHalf);
				}

				decImgTop = 0;
				incImgTop = 0;
				if (imgValign == "upside") {
					decImgTop = incImgTop = top - trackbarBorderwidthHalf;
				}
				else if (imgValign == "downside") {
					decImgTop = sBound.bottom - decImageHeight + borderwidthHalf + trackbarBorderwidthHalf + paddingTop;
					incImgTop = sBound.bottom - incImageHeight + borderwidthHalf + trackbarBorderwidthHalf + paddingTop;
				}
				else {
					incImgTop = top + (sBound.height - incImageHeight) / 2 - trackbarBorderwidthHalf;
					decImgTop = top + (sBound.height - decImageHeight) / 2 - trackbarBorderwidthHalf;
				}

				if (decImage) {
					if (imgValign == "middle") {
						decImage.set_y(decImgTop);
					}
					else {
						decImage.set_y(decImgTop);
					}
				}
				if (incImage) {
					if (imgValign == "middle") {
						incImage.set_y(incImgTop);
					}
					else {
						incImage.set_y(incImgTop);
					}
				}
			}
		}
	};

	_pChartRangebarControl._arrange = function (left, top) {
		var linestyle = this._linestyle, borderWidth = 0, borderWidthHalf = 0;

		if (linestyle) {
			borderWidth = linestyle._getBorderLeftWidth();
		}
		else {
			borderWidth = 1;
		}
		borderWidthHalf = borderWidth * 0.5;
		left += borderWidthHalf;
		top += borderWidthHalf;

		this._group.setTransform("translate(" + left + "," + top + ")");
		this._rearrange = false;
	};

	_pChartRangebarControl._applyCursor = function (obj, val) {
		var oldobj, newobj;
		var oldval = obj.cursor;

		if (oldval != val) {
			obj.cursor = val;
			oldobj = obj.cursor;

			if (val) {
				if (oldobj == null || oldobj.value != val) {
					newobj = nexacro.CursorObject(val);
					obj._cursor = newobj;
				}
			}
			else {
				if (oldobj) {
					obj.cursor = null;
				}
			}
		}
	};

	_pChartRangebarControl._dragObject = function (obj, x, y) {
		var pThis = this, chart = this.parent, trackbarRect = this._trackbarRect, origin = [x, y], prevXY = [x, y], dragged = 0, offset = [0, 0], distance = [0, 0];

		return {
			moved : function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
				var ret;
				distance[0] = clientX - origin[0];
				distance[1] = clientY - origin[1];
				offset[0] = clientX - prevXY[0];
				offset[1] = clientY - prevXY[1];
				prevXY[0] = clientX;
				prevXY[1] = clientY;
				var bounds;
				if (!dragged && (dragged |= distance[0] | distance[1])) {
					bounds = trackbarRect.getGlobalBoundRect();
					pThis._trackbarRectBounds = bounds;
					ret = "drag";
				}
				else if (dragged) {
					var start = 0, end = 0, startdata = pThis._startdata, enddata = pThis._enddata, axis = pThis._axis, cursor = obj._cursor, linestyle = pThis._linestyle, borderwidth = 0, trackbarpadding = pThis._trackbarpadding, paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0, canvasLeft = 0, canvasTop = 0, trackbarborderwidth = 0, trackbarlinestyle = pThis._trackbarlinestyle, trackbarminsize = pThis.trackbarminsize || 50, trackbargripsize = pThis.trackbargripsize || 10, boundW = 0, boundH = 0, datamin = pThis._axis._tickmin || pThis._axis._datamin, datamax = pThis._axis._tickmax || pThis._axis._datamax, datastart = pThis.p2cScroll(datamin), startpadding, endpadding, dataend = pThis.p2cScroll(datamax);

					canvasLeft = canvasX - chart._boardRect.left;
					canvasTop = canvasY - chart._boardRect.top;
					boundW = chart._boardRect.width - chart._boardBorderWidth;
					boundH = chart._boardRect.height - chart._boardBorderWidth;
					if (pThis._isvscroll) {
						if (trackbarminsize >= boundH) {
							trackbarminsize = 50;
						}
					}
					else {
						if (trackbarminsize >= boundW) {
							trackbarminsize = 50;
						}
					}
					if (trackbarpadding) {
						paddingLeft = trackbarpadding.left;
						paddingRight = trackbarpadding.right;
						paddingTop = trackbarpadding.top;
						paddingBottom = trackbarpadding.bottom;
					}

					if (linestyle) {
						borderwidth = linestyle._getBorderLeftWidth();
					}
					else {
						borderwidth = 1;
					}

					if (trackbarlinestyle) {
						trackbarborderwidth = trackbarlinestyle._getBorderLeftWidth();
					}
					else {
						trackbarborderwidth = 1;
					}

					start = pThis.p2cScroll(startdata);
					end = pThis.p2cScroll(enddata);
					var tempstart = start;
					var tempend = end;
					if (cursor == "w-resize") {
						start = canvasLeft - borderwidth - paddingLeft - trackbarborderwidth;
						if (canvasLeft < borderwidth + paddingLeft + trackbarborderwidth) {
							start = 0;
						}
						if (canvasLeft > end - (trackbarminsize + trackbargripsize * 2) - borderwidth - paddingRight) {
							start = end - (trackbarminsize + trackbargripsize * 2) - (borderwidth * 2) - paddingLeft - paddingRight;
						}
						if (start == tempstart && end != boundW) {
							ret = "drag";
							return ret;
						}
						pThis._trackbarstart = start;
					}
					else if (cursor == "e-resize") {
						end = canvasLeft + borderwidth + paddingRight + trackbarborderwidth;
						if (canvasLeft > boundW - borderwidth - paddingRight - trackbarborderwidth) {
							end = boundW;
						}
						if (canvasLeft < start + (trackbarminsize + trackbargripsize * 2) + borderwidth + paddingLeft) {
							end = start + (trackbarminsize + trackbargripsize * 2) + (borderwidth * 2) + paddingLeft + paddingRight;
						}
						if (end == tempend && start != 0) {
							ret = "drag";
							return ret;
						}
						pThis._trackbarend = end;
					}
					else if (cursor == "n-resize") {
						end = (dataend - start);
						start = canvasTop - borderwidth - paddingTop - trackbarborderwidth;


						if (canvasTop < borderwidth + paddingTop + trackbarborderwidth) {
							start = 0;
						}
						if (canvasTop > end - (trackbarminsize + trackbargripsize * 2) - borderwidth - paddingBottom) {
							start = end - (trackbarminsize + trackbargripsize * 2) - (borderwidth * 2) - paddingTop - paddingBottom;
						}
						if (start == tempstart && end != boundH) {
							ret = "drag";
							return ret;
						}


						pThis._trackbarstart = start;
					}
					else if (cursor == "s-resize") {
						start = (dataend - (end));
						end = canvasTop + borderwidth + paddingBottom + trackbarborderwidth;
						if (canvasTop > boundH - borderwidth - paddingBottom - trackbarborderwidth) {
							end = boundH;
						}
						if (canvasTop < start + (trackbarminsize + trackbargripsize * 2) + borderwidth + paddingBottom) {
							end = start + (trackbarminsize + trackbargripsize * 2) + (borderwidth * 2) + paddingTop + paddingBottom;
						}
						if (end == tempend && start != 0) {
							ret = "drag";
							return ret;
						}

						pThis._trackbarend = end;
					}
					else if (cursor == "default") {
						if (pThis._isvscroll) {
							bounds = pThis._trackbarRectBounds;
							var startY = bounds.top, startHeight = pThis._trackbarRect.height + trackbarborderwidth, distanceY = distance[1], incImageH = pThis._incImageHeight || 0, decImageH = pThis._decImageHeight || 0;

							startY -= chart._boardRect.top;
							start = startY + distanceY;
							end = startHeight + startY + distanceY;

							startpadding = borderwidth + paddingTop;
							endpadding = borderwidth + paddingBottom;

							start -= startpadding + decImageH;
							end += endpadding + incImageH;

							if (start < 0) {
								end -= start;
								start = 0;
								if (end > boundH) {
									end = boundH;
								}
							}
							else if (end > boundH) {
								start = boundH - (end - start);
								if (start < 0) {
									end = boundH;
									start = 0;
								}
								else {
									end = boundH;
								}
							}

							pThis._trackbarstart = start;
							pThis._trackbarend = end;


							pThis._trackbarresizing = false;
						}
						else {
							bounds = pThis._trackbarRectBounds;
							var startX = bounds.left, startWidth = pThis._trackbarRect.width + trackbarborderwidth, distanceX = distance[0], incImageW = pThis._incImageWidth || 0, decImageW = pThis._decImageWidth || 0;


							startX -= chart._boardRect.left;
							start = startX + distanceX;
							end = startWidth + startX + distanceX;

							startpadding = borderwidth + paddingLeft;
							endpadding = borderwidth + paddingRight;

							start -= startpadding + decImageW;
							end += endpadding + incImageW;

							if (start < 0) {
								end -= start;
								start = 0;
								if (end > boundW) {
									end = boundW;
								}
							}
							else if (end > boundW) {
								start = boundW - (end - start);
								if (start < 0) {
									end = boundW;
									start = 0;
								}
								else {
									end = boundW;
								}
							}

							pThis._trackbarstart = start;
							pThis._trackbarend = end;


							pThis._trackbarresizing = false;
						}
					}
					ret = "drag";

					chart._changedData = true;
					chart._ani_exception = true;
					chart._draw();
					pThis._trackbarresizing = true;
					pThis._trackbarstart = -1;
					pThis._trackbarend = -1;
				}
				return ret;
			}, 
			ended : function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
			}
		};
	};

	_pChartRangebarControl._afterSetProperties = function () {
		this.on_apply_size(this.size);
		this.on_apply_linestyle(this._linestyle);
		this.on_apply_trackbarlinestyle(this._trackbarlinestyle);
	};

	_pChartRangebarControl._setRangebarRectWidth = function (width) {
		if (this._rangebarRect) {
			this._rangebarRect.set_width(width);
		}
	};
	_pChartRangebarControl._setRangebarRectHeight = function (height) {
		if (this._rangebarRect) {
			this._rangebarRect.set_height(height);
		}
	};
	_pChartRangebarControl._setRange = function (axis) {
		this._axis = axis;
		if (this.parent._reset == true) {
			this._startdata = this.startdata;
			this._enddata = this.enddata;

			if (axis._type == "categoryAxis" && axis._categories) {
				if (this.startdata && axis._categories[this.startdata]) {
					this._startdata = axis._categories[this.startdata];
				}

				if (this.enddata && axis._categories[this.enddata]) {
					this._enddata = axis._categories[this.enddata];
				}
			}
		}
		var tickmin = axis._tickmin;
		var tickmax = axis._tickmax;

		var scrollMin = 0, scrollMax = 0;

		if (tickmin) {
			scrollMin = tickmin;
		}
		else {
			scrollMin = axis._datamin;
		}

		if (tickmax) {
			scrollMax = tickmax;
		}
		else {
			scrollMax = axis._datamax;
		}

		var rs = this._startdata || scrollMin;
		var re = this._enddata || scrollMax;

		axis._scrollMin = this._startdata = rs;
		axis._scrollMax = this._enddata = re;
	};

	_pChartRangebarControl._setTransformationHelpers = function (width, axis) {
		var tickmin = axis._tickmin;
		var tickmax = axis._tickmax;
		var scrollMin = 0, scrollMax = 0;

		if (tickmin) {
			scrollMin = tickmin;
		}
		else {
			scrollMin = axis._datamin;
		}

		if (tickmax) {
			scrollMax = tickmax;
		}
		else {
			scrollMax = axis._datamax;
		}

		var s = width / Math.abs(scrollMax - scrollMin);
		var m = Math.min(scrollMax, scrollMin);


		var startdata = this._startdata || scrollMin;
		var enddata = this._enddata || scrollMax;
		axis._min = this._startdata = startdata;
		axis._max = this._enddata = enddata;




		this.p2cScroll = function (p) {
			return (p - m) * s;
		};

		this.c2pScroll = function (c) {
			return m + c / s;
		};
	};

	_pChartRangebarControl._getRect = function () {
		if (this._rangebarRect) {
			return this._rangebarRect._getRect(true, true);
		}
		return;
	};

	_pChartRangebarControl._setCursorX = function (obj, canvasX) {
		var id = obj.id;
		if (id == "ChartTrackbarRect") {
			var oBounds = obj.getGlobalBoundRect(), trackbargripsize = this.trackbargripsize || 10, incImageW = 0, decImageW = 0;

			incImageW = this._incImageWidth || 0;
			decImageW = this._decImageWidth || 0;


			{

				var leftGap = canvasX - oBounds.left;
				var rightGap = (oBounds.left + oBounds.width) - canvasX;

				if (leftGap < trackbargripsize && decImageW == 0) {
					this._applyCursor(obj, "w-resize");
				}
				else if (rightGap < trackbargripsize && incImageW == 0) {
					this._applyCursor(obj, "e-resize");
				}
				else {
					this._applyCursor(obj, "default");
				}
			}
		}
		else if (id == "ChartChangeRangeIncImage") {
			this._applyCursor(obj, "e-resize");
		}
		else if (id == "ChartChangeRangeDecImage") {
			this._applyCursor(obj, "w-resize");
		}


		return obj._cursor;
	};

	_pChartRangebarControl._setCursorY = function (obj, canvasY) {
		var id = obj.id;
		if (id == "ChartTrackbarRect") {
			var oBounds = obj.getGlobalBoundRect(), trackbargripsize = this.trackbargripsize || 10, incImageH = 0, decImageH = 0;

			incImageH = this._incImageHeight || 0;
			decImageH = this._decImageHeight || 0;


			{

				var topGap = canvasY - oBounds.top;
				var bottomGap = (oBounds.top + oBounds.height) - canvasY;

				if (topGap < trackbargripsize && decImageH == 0) {
					this._applyCursor(obj, "n-resize");
				}
				else if (bottomGap < trackbargripsize && incImageH == 0) {
					this._applyCursor(obj, "s-resize");
				}
				else {
					this._applyCursor(obj, "default");
				}
			}
		}
		else if (id == "ChartChangeRangeDecImage") {
			this._applyCursor(obj, "n-resize");
		}
		else if (id == "ChartChangeRangeincImage") {
			this._applyCursor(obj, "s-resize");
		}


		return obj._cursor;
	};

	_pChartRangebarControl._changeContentsProperty = function (nm, newVal, oldVal) {
		var contents = this.parent.contents;
		if (this._isvscroll) {
			if (contents && contents.vrangebar) {
				contents.vrangebar[nm] = newVal;
			}
		}
		else {
			if (contents && contents.hrangebar) {
				contents.hrangebar[nm] = newVal;
			}
		}
	};

	delete _pChartRangebarControl;
}

if (!nexacro.ChartSelectionControl) {
	nexacro.ChartSelectionControl = function (id, parent, graphicsControl) {
		this.id = id;
		this.parent = parent;
		this._graphicsControl = graphicsControl;

		this._create();
		this._createSelection();
	};

	var _pChartSelection = nexacro.ChartSelectionControl.prototype = nexacro._createPrototype(nexacro.Object, nexacro.ChartSelectionControl);
	_pChartSelection._type_name = "ChartSelectionControl";


	_pChartSelection.type = "";
	_pChartSelection.linestyle = "";
	_pChartSelection.background = "";
	_pChartSelection.opacity = "";
	_pChartSelection.visible = true;


	_pChartSelection._group = null;
	_pChartSelection._selectionRect = null;
	_pChartSelection._linestyle = null;
	_pChartSelection._background = null;
	_pChartSelection._opacity = null;
	_pChartSelection._minsize = 10;
	_pChartSelection._xstartdata = null;
	_pChartSelection._xenddata = null;
	_pChartSelection._ystartdata = null;
	_pChartSelection._yenddata = null;
	_pChartSelection._xaxis = null;
	_pChartSelection._yaxis = null;
	_pChartSelection._rangezoomdraw = false;
	_pChartSelection._selectionRectBounds = null;
	_pChartSelection._type = "xy";
	_pChartSelection._info = {
		first : 
			{
			x : -1, 
			y : -1
		}, 
		second : 
			{
			x : -1, 
			y : -1
		}, 
		show : false, 
		active : false
	};


	_pChartSelection.set_type = function (val) {
		if (this.type !== val && (val == "x" || val == "y" || val == "xy")) {
			this.type = val;
			this.on_apply_type();
		}
	};

	_pChartSelection.on_apply_type = function () {
		this._type = this.type;
		this._createSelection();
	};
	_pChartSelection.set_visible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.visible != val) {
			this._changeContentsProperty("visible", val, this.visible);

			this.visible = val;
			this.on_apply_visible(val);
		}

		this.parent._draw();
	};
	_pChartSelection.on_apply_visible = function (visible) {
		this._group.set_visible(visible);
	};
	_pChartSelection.set_linestyle = function (val) {
		this.linestyle = val;
		if (val) {
			if (this._linestyle == null || !this._linestyle._single || this._linestyle.value != val) {
				var oldValue;
				if (this._linestyle) {
					oldValue = this._linestyle.value;
				}
				this._changeContentsProperty("linestyle", val, oldValue);

				var linestyle = nexacro.BorderObject(val);
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

		this.parent._draw();
	};

	_pChartSelection.on_apply_linestyle = function (linestyle) {
		this._createSelection();



		this._selectionRect.set_strokepen(linestyle ? linestyle.value || linestyle : "1px solid #717a8380");
	};

	_pChartSelection.set_background = function (val) {
		this.background = val;
		if (val) {
			if (this._background == null || this._background.value != val) {
				var background = nexacro.BackgroundObject(val, this);
				this._background = background;
				this.on_apply_background(background);
			}
		}
		else {
			if (this._background) {
				this._background = null;
				this.on_apply_background(null);
			}
		}
		this.parent._draw();
	};

	_pChartSelection.on_apply_background = function (background) {
		this._createSelection();

		this._selectionRect.set_fillstyle(background ? background.value : "");
	};

	_pChartSelection.set_opacity = function (val) {
		this.opacity = val;
		if (0 === val || val) {
			if (this._opacity == null || this._opacity.value != val) {
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
	};

	_pChartSelection.on_apply_opacity = function (opacity) {
		this._createSelection();

		this._selectionRect.set_opacity(opacity ? opacity._sysvalue : 1);
	};


	_pChartSelection.destroy = function () {
		this._clear();
		var itemID = this._group.id;

		var item = this._graphicsControl.getObjectByID(itemID);
		if (item) {
			this._graphicsControl.removeChild(item);
		}
		this._group.destroy();
		this._group = null;
		this._selectionRect = null;
		this._linestyle = null;
		this._background = null;
		this._opacity = null;
		this._minsize = null;
		this._info = null;
		this._xstartdata = null;
		this._xenddata = null;
		this._ystartdata = null;
		this._yenddata = null;
		this._xaxis = null;
		this._yaxis = null;
		this._rangezoomdraw = false;
		this._type = null;
		if (this.parent) {
			if (this.parent.selection) {
				this.parent._deleteContentsProp("selection");
				this.parent.selection = null;
			}

			this.parent._changedData = true;
			this.parent = null;
		}

		nexacro.Object.prototype.destroy.call(this);
	};

	_pChartSelection._clearSelection = function (isPrevented) {
		var info = this._info, evt;

		if (info.show) {
			info.show = false;
			this._drawSelection();

			return true;
		}
		else {
			return false;
		}
	};

	_pChartSelection.deleteSelection = function () {
		var bfire = this._clearSelection();
		if (bfire) {
			this.parent._changedData = true;
			this.parent._reset = true;
			if (this._xaxis) {
				this._xaxis._scrollMin = null;
				this._xaxis._scrollMax = null;
			}
			if (this._yaxis) {
				this._yaxis._scrollMin = null;
				this._yaxis._scrollMax = null;
			}
			this.parent._draw();

			if (this.parent.onrangezoomed && this.parent.onrangezoomed._has_handlers) {
				var evt = new nexacro.ChartRangeZoomEventInfo(this.parent, "onrangezoomed", this.parent, this.parent._graphicsControl, undefined, undefined, undefined, undefined);
				this.parent.onrangezoomed._fireUserEvent(this.parent, evt);
			}
		}
		return bfire;
	};


	_pChartSelection._create = function () {
		this._group = new nexacro.GraphicsGroup();
		this._group.set_id("ChartSelectionGroup");
		this._graphicsControl.addChild(this._group);
	};

	_pChartSelection._clear = function () {
		if (!this._selectionRect) {
			this._group.removeChild(this._selectionRect);
			delete this._selectionRect;
			this._selectionRect = null;
		}
	};

	_pChartSelection._createSelection = function () {
		if (!this._selectionRect) {
			this._selectionRect = new nexacro.GraphicsRect(-1, -1, 1, 1);
			this._selectionRect.set_id("ChartSelectionRect");
			this._group.addChild(this._selectionRect);
			this._selectionRect._selection = this;
			this._info = {
				first : 
					{
					x : -1, 
					y : -1
				}, 
				second : 
					{
					x : -1, 
					y : -1
				}, 
				show : false, 
				active : false
			};
		}
	};

	_pChartSelection._dragselectionObject = function (obj, x, y, canvasX, canvasY) {
		var pThis = this, chart = this.parent, selectionRect = this._selectionRect, origin = [x, y], prevXY = [x, y], dragged = 0, offset = [0, 0], distance = [0, 0], i = 0;
		var boardRect = null;
		if (chart) {
			boardRect = chart._boardRect;
		}

		var yaxes = chart._yaxes;
		for (i = 0; i < yaxes.length; i++) {
			if (yaxes[i]._used) {
				pThis._yaxis = yaxes[i];
				break;
			}
		}

		var xaxes = chart._xaxes;
		for (i = 0; i < xaxes.length; i++) {
			if (xaxes[i]._used) {
				pThis._xaxis = xaxes[i];
				break;
			}
		}


		pThis._xstartdata = pThis._xaxis._min;
		pThis._xenddata = pThis._xaxis._max;
		pThis._ystartdata = pThis._yaxis._min;
		pThis._yenddata = pThis._yaxis._max;






		this._clearSelection();
		this._setSelectionPos(this._info.first, boardRect, canvasX, canvasY);

		return {
			moved : function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
				var ret;
				distance[0] = clientX - origin[0];
				distance[1] = clientY - origin[1];
				offset[0] = clientX - prevXY[0];
				offset[1] = clientY - prevXY[1];
				prevXY[0] = clientX;
				prevXY[1] = clientY;

				if (!dragged && (dragged |= distance[0] | distance[1])) {
					var bounds = selectionRect.getGlobalBoundRect();
					pThis._selectionRectBounds = bounds;
					ret = "drag";
				}
				else if (dragged) {
				}
				pThis._updateSelection(boardRect, canvasX, canvasY);
				ret = "drag";
				return ret;
			}, 
			ended : function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
				var ret, tickgap;


				ret = pThis._updateSelection(boardRect, canvasX, canvasY);
				if (ret == true) {
					if (pThis._type.indexOf("x") != -1) {
						if (!pThis._xaxis) {
							return ret;
						}
						tickgap = 0;
						if (pThis._xaxis._type == "categoryAxis") {
							tickgap += pThis._xaxis._tickstartgap;
						}
						if (pThis._checkMinsizeSelection()) {
							pThis._xstartdata = pThis._extractRange(pThis._xaxis, pThis._info.first.x - boardRect.left - tickgap);
							pThis._xenddata = pThis._extractRange(pThis._xaxis, pThis._info.second.x - boardRect.left - tickgap);
						}
					}
					if (pThis._type.indexOf("y") != -1) {
						if (!pThis._yaxis) {
							return ret;
						}
						tickgap = pThis._yaxis._tickendspace;
						if (pThis._yaxis._type == "categoryAxis") {
							tickgap += pThis._yaxis._tickendgap;
						}
						if (pThis._checkMinsizeSelection()) {
							pThis._ystartdata = pThis._extractRange(pThis._yaxis, pThis._info.first.y - boardRect.top - tickgap);
							pThis._yenddata = pThis._extractRange(pThis._yaxis, pThis._info.second.y - boardRect.top - tickgap);
						}
					}

					if (chart.rangezoom.indexOf("x") != -1 || chart.rangezoom.indexOf("y") != -1) {
						pThis._rangezoomdraw = true;
						pThis._drawSelection(boardRect, true);
						chart._changedData = true;
						chart._rearrange = true;
						chart._ani_exception = true;
						chart._draw();
					}
				}

				return ret;
			}
		};
	};
	_pChartSelection._extractRange = function (axis, pos) {
		if (pos < 0) {
			pos = 0;
		}
		if (!axis) {
			return null;
		}
		var ticks = axis._ticks, size, axisvalue = null;
		if (ticks) {
			axisvalue = (axis.c2p(pos));
			if (axisvalue < axis._min) {
				axisvalue = axis._min;
			}
			if (axisvalue > axis._max) {
				axisvalue = axis._max;
			}
		}
		return axisvalue;
	};
	_pChartSelection._setSelectionPos = function (pos, gridRectBound, canvasX, canvasY) {
		var type = this._type, left, top, right, bottom, info = this._info;


		right = gridRectBound.right;
		bottom = gridRectBound.bottom;
		left = gridRectBound.left;
		top = gridRectBound.top;

		pos.x = canvasX < 0 ? 0 : (canvasX > right ? right : canvasX);
		pos.y = canvasY < 0 ? 0 : (canvasY > bottom ? bottom : canvasY);

		pos.x = pos.x < 0 ? 0 : (pos.x < left ? left : pos.x);
		pos.y = pos.y < 0 ? 0 : (pos.y < top ? top : pos.y);


		if (type == "x") {
			pos.y = pos == info.first ? gridRectBound.top : bottom;
		}
		if (type == "y") {
			pos.x = pos == info.first ? gridRectBound.left : right;
		}
	};

	_pChartSelection._updateSelection = function (gridRectBound, canvasX, canvasY) {
		if (canvasX == null || canvasY == null) {
			return false;
		}

		this._setSelectionPos(this._info.second, gridRectBound, canvasX, canvasY);

		if (this._checkMinsizeSelection()) {
			this._info.show = true;
			this._drawSelection(gridRectBound);
			return true;
		}
		else {
			this._clearSelection(true);
		}
		return false;
	};

	_pChartSelection._checkMinsizeSelection = function () {
		var minSize = this._minsize, info = this._info;
		var type = this._type;
		if (type == "xy") {
			return Math.abs(info.second.x - info.first.x) >= minSize && 
				Math.abs(info.second.y - info.first.y) >= minSize;
		}
		else if (type == "x") {
			return Math.abs(info.second.x - info.first.x) >= minSize;
		}
		else if (type == "y") {
			return Math.abs(info.second.y - info.first.y) >= minSize;
		}
		else {
			return false;
		}
	};

	_pChartSelection._drawSelection = function (gridRectBound, all) {
		var type = this._type;
		if (!type) {
			return;
		}

		var info = this._info, selectionRect = this._selectionRect;

		if (info.show && this._checkMinsizeSelection()) {
			if (selectionRect) {
				var x = Math.min(info.first.x, info.second.x) + 0.5, y = Math.min(info.first.y, info.second.y) + 0.5, w = Math.abs(info.second.x - info.first.x) - 1, h = Math.abs(info.second.y - info.first.y) - 1;
				selectionRect.set_x(x);
				selectionRect.set_y(y);
				selectionRect.set_width(w);
				selectionRect.set_height(h);
				selectionRect.set_visible(true);

				if (all) {
					selectionRect.set_x(gridRectBound.left + 0.5);
					selectionRect.set_y(gridRectBound.top + 0.5);
					selectionRect.set_width(gridRectBound.width - 1);
					selectionRect.set_height(gridRectBound.height - 1);
					selectionRect.set_visible(true);
				}
				this.parent._graphicsControl.draw();
			}
		}
		else {
			if (selectionRect) {
				selectionRect.set_x(0);
				selectionRect.set_y(0);
				selectionRect.set_width(0);
				selectionRect.set_height(0);
				selectionRect.set_visible(false);

				this.parent._graphicsControl.draw();
			}
		}
	};

	_pChartSelection._onselected = function () {
		if (this._checkMinsizeSelection()) {
			this._fireSelectedEvent();
		}
	};

	_pChartSelection._getSelection = function () {
		if (!this._checkMinsizeSelection()) {
			return null;
		}

		var info = this._info;
		if (!info.show) {
			return null;
		}

		var r = {
		}, id, c1 = info.first, c2 = info.second;

		nexacro._GraphicsLibArray.Each(this.parent._axes, function (axis, i) {
			if (axis) {
				var p1, p2, from, to, rfrom, rto, fromObj, toObj;

				p1 = axis.c2p(c1[axis._direction]);
				p2 = axis.c2p(c2[axis._direction]);

				from = Math.min(p1, p2);
				to = Math.max(p1, p2);

				if (axis._type == "categoryAxis") {
					axis._selectionFrom = from;
					axis._selectionTo = to;
					from = rfrom = nexacro.round(from);
					to = rto = nexacro.round(to);
					fromObj = axis._ticks[rfrom];
					toObj = axis._ticks[rto];

					if (fromObj && fromObj.label) {
						from = fromObj.label;
					}
					if (toObj && toObj.label) {
						to = toObj.label;
					}
				}

				id = axis.id;
				r[id] = {
					axisobject : axis, 
					from : from, 
					to : to
				};
			}
		});

		return r;
	};

	_pChartSelection._fireSelectedEvent = function () {
		var zoom = this.zoom, ranges;

		ranges = this._getSelection();

		if (zoom) {
			var parent = this.parent, axis, from, to, sMin, sMax, type = this._type;



			if (type.indexOf("x") > -1) {
				nexacro._GraphicsLibObject.Each(ranges, function (axisname, object) {
					axis = object.axisobject;
					if (axis._direction == "x") {
						from = object.from;
						to = object.to;
						if (axis._type == "categoryAxis") {
							from = axis._selectionFrom;
							to = axis._selectionTo;
						}

						if (from < axis._datamin) {
							sMin = axis._datamin;
						}
						else {
							sMin = from;
						}

						if (to > axis._datamax) {
							sMax = axis._datamax;
						}
						else {
							sMax = to;
						}

						axis._selectionMin = sMin;
						axis._selectionMax = sMax;


						if (axis._type == "categoryAxis") {
							axis._selectionFrom = null;
							axis._selectionTo = null;
						}


						return false;
					}
				});
			}

			if (type.indexOf("y") > -1) {
				nexacro._GraphicsLibObject.Each(ranges, function (axisname, object) {
					axis = object.axisobject;
					if (axis._direction == "y") {
						from = object.from;
						to = object.to;
						if (axis._type == "categoryAxis") {
							from = axis._selectionFrom;
							to = axis._selectionTo;
						}

						axis._selectionMin = from;
						axis._selectionMax = to;

						if (axis._type == "categoryAxis") {
							axis._selectionFrom = null;
							axis._selectionTo = null;
						}
					}
				});
			}

			this._clearSelection();

			parent.draw();
		}
	};

	_pChartSelection._setActive = function (val) {
		this._info.active = !!val;
	};
	_pChartSelection._changeContentsProperty = function (nm, newVal, oldVal) {
		var contents = this.parent.contents;
		if (contents && contents.selection) {
			contents.selection[nm] = newVal;
		}
	};

	delete _pChartSelection;
}

if (!nexacro.ChartCrosshairControl) {
	nexacro.ChartCrosshairControl = function (id, parent, graphicsControl) {
		this.id = id;
		this.parent = parent;
		this._graphicsControl = graphicsControl;

		this._create();
		this._createXlineRect();
		this._createXlineText();
		this._createYlineRect();
		this._createYlineText();

		this._xlinerect.set_visible(true);
		this._xlinetext.set_visible(true);
		this._ylinerect.set_visible(true);
		this._ylinetext.set_visible(true);

		this._createCrosshairX();
		this._createCrosshairY();
		this._crosshairY.set_visible(true);
		this._crosshairX.set_visible(true);
	};

	var _pChartCrosshair = nexacro.ChartCrosshairControl.prototype = nexacro._createPrototype(nexacro.Object, nexacro.ChartCrosshairControl);
	_pChartCrosshair._type_name = "ChartCrosshairControl";


	_pChartCrosshair.type = "";
	_pChartCrosshair.xlinestyle = "";
	_pChartCrosshair.xlineopacity = "";
	_pChartCrosshair.ylinestyle = "";
	_pChartCrosshair.ylineopacity = "";
	_pChartCrosshair.tooltiptype = "";
	_pChartCrosshair.xlinetooltippadding = "";
	_pChartCrosshair.ylinetooltippadding = "";
	_pChartCrosshair.xlinetooltipgap = undefined;
	_pChartCrosshair.ylinetooltipgap = undefined;
	_pChartCrosshair.xlinetooltipborderradius = "";
	_pChartCrosshair.ylinetooltipborderradius = "";
	_pChartCrosshair.xlinetooltipfillstyle = "";
	_pChartCrosshair.xlinetooltipopacity = "";
	_pChartCrosshair.ylinetooltipfillstyle = "";
	_pChartCrosshair.ylinetooltipopacity = "";
	_pChartCrosshair.xlinetooltiplinestyle = "";
	_pChartCrosshair.ylinetooltiplinestyle = "";
	_pChartCrosshair.xlinetooltiptextcolor = "";
	_pChartCrosshair.ylinetooltiptextcolor = "";
	_pChartCrosshair.visible = true;
	_pChartCrosshair.rotatecrosshairline = false;

	_pChartCrosshair._group = null;
	_pChartCrosshair._crosshairX = null;
	_pChartCrosshair._crosshairY = null;
	_pChartCrosshair._xlinerect = null;
	_pChartCrosshair._xlinetext = null;
	_pChartCrosshair._ylinerect = null;
	_pChartCrosshair._ylinetext = null;

	_pChartCrosshair._xlinestyle = null;
	_pChartCrosshair._ylinestyle = null;
	_pChartCrosshair._xlineopacity = null;
	_pChartCrosshair._ylineopacity = null;

	_pChartCrosshair._xlinetooltipfillstyle = null;
	_pChartCrosshair._ylinetooltipfillstyle = null;
	_pChartCrosshair._xlinetooltipopacity = null;
	_pChartCrosshair._ylinetooltipopacity = null;
	_pChartCrosshair._xlinetooltiplinestyle = null;
	_pChartCrosshair._ylinetooltiplinestyle = null;
	_pChartCrosshair._xlinetooltipborderradius = null;
	_pChartCrosshair._ylinetooltipborderradius = null;

	_pChartCrosshair._xlinetooltiptextcolor = null;
	_pChartCrosshair._ylinetooltiptextcolor = null;

	_pChartCrosshair._xlinetooltippadding = null;
	_pChartCrosshair._ylinetooltippadding = null;


	_pChartCrosshair._show = false;
	_pChartCrosshair._type = "xy";
	_pChartCrosshair._tooltiptype = "xy";

	_pChartCrosshair.set_type = function (val) {
		if (this.type !== val && (val == "x" || val == "y" || val == "xy")) {
			this.type = val;
			this.on_apply_type(val);
		}
	};

	_pChartCrosshair.on_apply_type = function (type) {
		this._type = type;
		if (type == "x") {
			this._createCrosshairX();
			if (this._crosshairY) {
				this._crosshairY.set_visible(false);
			}
		}
		else if (type == "y") {
			this._createCrosshairY();
			if (this._crosshairX) {
				this._crosshairX.set_visible(false);
			}
		}
		else if (type == "xy") {
			this._createCrosshairX();
			this._createCrosshairY();
			this._crosshairY.set_visible(true);
			this._crosshairX.set_visible(true);
		}
	};


	_pChartCrosshair.set_visible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.visible != val) {
			this._changeContentsProperty("visible", val, this.visible);

			this.visible = val;
			this.on_apply_visible(val);
		}

		this.parent._draw();
	};

	_pChartCrosshair.on_apply_visible = function (visible) {
		this._group.set_visible(visible);
	};
	_pChartCrosshair.set_rotatecrosshairline = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.rotatecrosshairline != val) {
			this._changeContentsProperty("rotatecrosshairline", val, this.rotatecrosshairline);

			this.rotatecrosshairline = val;
			this.on_apply_rotatecrosshairline(val);
			if (this.visible) {
				var type = this._type, tooltiptype = this._tooltiptype;
				var canvasX = -1, canvasY = -1;

				if (type.indexOf("x") != -1 && this._crosshairX && this._crosshairX.preCanvasY && this._crosshairX.preCanvasX) {
					canvasX = this._crosshairX.preCanvasX;
					canvasY = this._crosshairX.preCanvasY;
				}
				else if (type.indexOf("y") != -1 && this._crosshairY && this._crosshairY.preCanvasY && this._crosshairY.preCanvasX) {
					canvasX = this._crosshairY.preCanvasX;
					canvasY = this._crosshairY.preCanvasY;
				}
				else if (this._xlinerect && this._xlinetext && tooltiptype.indexOf("x") != -1 && this._xlinetext.preCanvasY && this._xlinetext.preCanvasX) {
					canvasX = this._xlinetext.preCanvasX;
					canvasY = this._xlinetext.preCanvasY;
				}
				else if (this._ylinerect && this._ylinetext && tooltiptype.indexOf("y") != -1 && this._ylinetext.preCanvasY && this._ylinetext.preCanvasX) {
					canvasX = this._ylinetext.preCanvasX;
					canvasY = this._ylinetext.preCanvasY;
				}
				this._showCrosshair(this.parent._boardRect, canvasX, canvasY);
			}
		}

		this.parent._draw();
	};

	_pChartCrosshair.on_apply_rotatecrosshairline = function (visible) {
	};

	_pChartCrosshair.set_xlinestyle = function (val) {
		this.xlinestyle = val;
		if (val) {
			if (this._xlinestyle == null || !this._xlinestyle._single || this._xlinestyle.value != val) {
				var xlinestyle = nexacro.BorderObject(val);
				this._xlinestyle = xlinestyle;
				this.on_apply_xlinestyle(xlinestyle);
			}
		}
		else {
			if (this._xlinestyle) {
				this._xlinestyle = null;
				this.on_apply_xlinestyle(null);
			}
		}
	};

	_pChartCrosshair.on_apply_xlinestyle = function (xlinestyle) {
		this._createCrosshairX();


		this._crosshairX.set_strokepen(xlinestyle ? xlinestyle.value : "1px solid #717a8380");
	};

	_pChartCrosshair.set_xlineopacity = function (val) {
		this.xlineopacity = val;
		if (0 === val || val) {
			if (this._xlineopacity == null || this._xlineopacity.value != val) {
				var xlineopacity = nexacro.OpacityObject(val);
				this._xlineopacity = xlineopacity;
				this.on_apply_xlineopacity(xlineopacity);
			}
		}
		else {
			if (this._xlineopacity) {
				this._xlineopacity = null;
				this.on_apply_xlineopacity(null);
			}
		}
	};

	_pChartCrosshair.on_apply_xlineopacity = function (xlineopacity) {
		this._createCrosshairX();


		this._crosshairX.set_opacity(xlineopacity ? xlineopacity._sysvalue : "1");
	};

	_pChartCrosshair.set_ylinestyle = function (val) {
		this.ylinestyle = val;
		if (val) {
			if (this._ylinestyle == null || !this._ylinestyle._single || this._ylinestyle.value != val) {
				var ylinestyle = nexacro.BorderObject(val);
				this._ylinestyle = ylinestyle;
				this.on_apply_ylinestyle(ylinestyle);
			}
		}
		else {
			if (this._ylinestyle) {
				this._ylinestyle = null;
				this.on_apply_ylinestyle(null);
			}
		}
	};

	_pChartCrosshair.on_apply_ylinestyle = function (ylinestyle) {
		this._createCrosshairY();


		this._crosshairY.set_strokepen(ylinestyle ? ylinestyle.value : "1px solid #717a8380");
	};

	_pChartCrosshair.set_ylineopacity = function (val) {
		this.ylineopacity = val;
		if (0 === val || val) {
			if (this._ylineopacity == null || this._ylineopacity.value != val) {
				var ylineopacity = nexacro.OpacityObject(val);
				this._ylineopacity = ylineopacity;
				this.on_apply_ylineopacity(ylineopacity);
			}
		}
		else {
			if (this._ylineopacity) {
				this._ylineopacity = null;
				this.on_apply_ylineopacity(null);
			}
		}
	};

	_pChartCrosshair.on_apply_ylineopacity = function (ylineopacity) {
		this._createCrosshairY();


		this._crosshairY.set_opacity(ylineopacity ? ylineopacity._sysvalue : "1");
	};

	_pChartCrosshair.set_tooltiptype = function (val) {
		if (this.tooltiptype !== val && (val == "x" || val == "y" || val == "xy")) {
			this.tooltiptype = val;
			this.on_apply_tooltiptype(val);
		}
	};

	_pChartCrosshair.on_apply_tooltiptype = function (tooltiptype) {
		this._tooltiptype = tooltiptype;
		if (tooltiptype == "x") {
			this._createXlineRect();
			this._createXlineText();

			this._xlinerect.set_visible(true);
			this._xlinetext.set_visible(true);
			if (this._ylinerect) {
				this._ylinerect.set_visible(false);
			}
			if (this._ylinetext) {
				this._ylinetext.set_visible(false);
			}
		}
		else if (tooltiptype == "y") {
			this._createYlineRect();
			this._createYlineText();

			this._ylinerect.set_visible(true);
			this._ylinetext.set_visible(true);
			if (this._xlinerect) {
				this._xlinerect.set_visible(false);
			}
			if (this._xlinetext) {
				this._xlinetext.set_visible(false);
			}
		}
		else if (tooltiptype == "xy") {
			this._createXlineRect();
			this._createXlineText();
			this._createYlineRect();
			this._createYlineText();

			this._xlinerect.set_visible(true);
			this._xlinetext.set_visible(true);
			this._ylinerect.set_visible(true);
			this._ylinetext.set_visible(true);
		}
	};

	_pChartCrosshair.set_xlinetooltippadding = function (val) {
		this.xlinetooltippadding = val;
		if (val) {
			if (this._xlinetooltippadding == null || this._xlinetooltippadding.value != val) {
				var oldValue;
				if (this._xlinetooltippadding) {
					oldValue = this._xlinetooltippadding.value;
				}
				this._changeContentsProperty("xlinetooltippadding", val, oldValue);

				var xlinetooltippadding = nexacro.PaddingObject(val);
				this._xlinetooltippadding = xlinetooltippadding;
				this.on_apply_xlinetooltippadding();
			}
		}
		else {
			if (this._xlinetooltippadding) {
				this._xlinetooltippadding = null;
				this.on_apply_xlinetooltippadding();
			}
		}
	};
	_pChartCrosshair.on_apply_xlinetooltippadding = function (val) {
	};
	_pChartCrosshair.set_ylinetooltippadding = function (val) {
		this.ylinetooltippadding = val;
		if (val) {
			if (this._ylinetooltippadding == null || this._ylinetooltippadding.value != val) {
				var oldValue;
				if (this._ylinetooltippadding) {
					oldValue = this._ylinetooltippadding.value;
				}
				this._changeContentsProperty("ylinetooltippadding", val, oldValue);

				var ylinetooltippadding = nexacro.PaddingObject(val);
				this._ylinetooltippadding = ylinetooltippadding;
				this.on_apply_ylinetooltippadding();
			}
		}
		else {
			if (this._ylinetooltippadding) {
				this._ylinetooltippadding = null;
				this.on_apply_trackbarpadding();
			}
		}
	};
	_pChartCrosshair.on_apply_ylinetooltippadding = function (val) {
	};
	_pChartCrosshair.set_xlinetooltipgap = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}

			if (val != "") {
				val = parseInt(val);
			}
		}

		if (this.xlinetooltipgap !== val) {
			this._changeContentsProperty("xlinetooltipgap", val, this.xlinetooltipgap);
			this.xlinetooltipgap = val;
		}
	};

	_pChartCrosshair.set_ylinetooltipgap = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}

			if (val != "") {
				val = parseInt(val);
			}
		}

		if (this.ylinetooltipgap !== val) {
			this._changeContentsProperty("ylinetooltipgap", val, this.ylinetooltipgap);
			this.ylinetooltipgap = val;
		}
	};

	_pChartCrosshair.set_xlinetooltipborderradius = function (val) {
		this.xlinetooltipborderradius = val;
		if (val) {
			if (this._xlinetooltipborderradius == null || this._xlinetooltipborderradius.value != val) {
				var xlinetooltipborderradius = nexacro.PaddingObject(val);
				this._xlinetooltipborderradius = xlinetooltipborderradius;
				this.on_apply_xlinetooltipborderradius(xlinetooltipborderradius);
			}
		}
		else {
			if (this._xlinetooltipborderradius) {
				this._xlinetooltipborderradius = null;
				this.on_apply_xlinetooltipborderradius(null);
			}
		}
	};

	_pChartCrosshair.on_apply_xlinetooltipborderradius = function (xlinetooltipborderradius) {
		this._createXlineRect();

		this._xlinerect.set_radiusx(xlinetooltipborderradius ? xlinetooltipborderradius.top : "");
		this._xlinerect.set_radiusy(xlinetooltipborderradius ? xlinetooltipborderradius.right : "");
	};

	_pChartCrosshair.set_ylinetooltipborderradius = function (val) {
		this.ylinetooltipborderradius = val;
		if (val) {
			if (this._ylinetooltipborderradius == null || this._ylinetooltipborderradius.value != val) {
				var ylinetooltipborderradius = nexacro.PaddingObject(val);
				this._ylinetooltipborderradius = ylinetooltipborderradius;
				this.on_apply_ylinetooltipborderradius(ylinetooltipborderradius);
			}
		}
		else {
			if (this._ylinetooltipborderradius) {
				this._ylinetooltipborderradius = null;
				this.on_apply_ylinetooltipborderradius(null);
			}
		}
	};

	_pChartCrosshair.on_apply_ylinetooltipborderradius = function (ylinetooltipborderradius) {
		this._createYlineRect();

		this._ylinerect.set_radiusx(ylinetooltipborderradius ? ylinetooltipborderradius.top : "");
		this._ylinerect.set_radiusy(ylinetooltipborderradius ? ylinetooltipborderradius.right : "");
	};

	_pChartCrosshair.set_xlinetooltipfillstyle = function (val) {
		this.xlinetooltipfillstyle = val;
		if (val) {
			if (this._xlinetooltipfillstyle == null || this._xlinetooltipfillstyle.value != val) {
				var xlinetooltipfillstyle = nexacro.BackgroundObject(val, this);
				this._xlinetooltipfillstyle = xlinetooltipfillstyle;
				this.on_apply_xlinetooltipfillstyle(xlinetooltipfillstyle);
			}
		}
		else {
			if (this._xlinetooltipfillstyle) {
				this._xlinetooltipfillstyle = null;
				this.on_apply_xlinetooltipfillstyle(null);
			}
		}
	};

	_pChartCrosshair.on_apply_xlinetooltipfillstyle = function (xlinetooltipfillstyle) {
		this._createXlineRect();

		this._xlinerect.set_fillstyle(xlinetooltipfillstyle ? xlinetooltipfillstyle.value : "");
	};

	_pChartCrosshair.set_xlinetooltipopacity = function (val) {
		this.xlinetooltipopacity = val;
		if (0 === val || val) {
			if (this._xlinetooltipopacity == null || this._xlinetooltipopacity.value != val) {
				var xlinetooltipopacity = nexacro.OpacityObject(val);
				this._xlinetooltipopacity = xlinetooltipopacity;
				this.on_apply_xlinetooltipopacity(xlinetooltipopacity);
			}
		}
		else {
			if (this._xlinetooltipopacity) {
				this._xlinetooltipopacity = null;
				this.on_apply_xlinetooltipopacity(null);
			}
		}
	};

	_pChartCrosshair.on_apply_xlinetooltipopacity = function (xlinetooltipopacity) {
		this._createXlineRect();

		this._xlinerect.set_opacity(xlinetooltipopacity ? xlinetooltipopacity._sysvalue : "1");
		this._xlinetext.set_opacity(xlinetooltipopacity ? xlinetooltipopacity._sysvalue : "1");
	};

	_pChartCrosshair.set_ylinetooltipfillstyle = function (val) {
		this.ylinetooltipfillstyle = val;
		if (val) {
			if (this._ylinetooltipfillstyle == null || this._ylinetooltipfillstyle.value != val) {
				var ylinetooltipfillstyle = nexacro.BackgroundObject(val, this);
				this._ylinetooltipfillstyle = ylinetooltipfillstyle;
				this.on_apply_ylinetooltipfillstyle(ylinetooltipfillstyle);
			}
		}
		else {
			if (this._ylinetooltipfillstyle) {
				this._ylinetooltipfillstyle = null;
				this.on_apply_ylinetooltipfillstyle(null);
			}
		}
	};

	_pChartCrosshair.on_apply_ylinetooltipfillstyle = function (ylinetooltipfillstyle) {
		this._createYlineRect();

		this._ylinerect.set_fillstyle(ylinetooltipfillstyle ? ylinetooltipfillstyle.value : "");
	};

	_pChartCrosshair.set_ylinetooltipopacity = function (val) {
		this.ylinetooltipopacity = val;
		if (0 === val || val) {
			if (this._ylinetooltipopacity == null || this._ylinetooltipopacity.value != val) {
				var ylinetooltipopacity = nexacro.OpacityObject(val);
				this._ylinetooltipopacity = ylinetooltipopacity;
				this.on_apply_ylinetooltipopacity(ylinetooltipopacity);
			}
		}
		else {
			if (this._ylinetooltipopacity) {
				this._ylinetooltipopacity = null;
				this.on_apply_ylinetooltipopacity(null);
			}
		}
	};

	_pChartCrosshair.on_apply_ylinetooltipopacity = function (ylinetooltipopacity) {
		this._createYlineRect();

		this._ylinerect.set_opacity(ylinetooltipopacity ? ylinetooltipopacity._sysvalue : "1");
		this._ylinetext.set_opacity(ylinetooltipopacity ? ylinetooltipopacity._sysvalue : "1");
	};

	_pChartCrosshair.set_xlinetooltiplinestyle = function (val) {
		this.xlinetooltiplinestyle = val;
		if (val) {
			if (this._xlinetooltiplinestyle == null || !this._xlinetooltiplinestyle._single || this._xlinetooltiplinestyle.value != val) {
				var xlinetooltiplinestyle = nexacro.BorderObject(val);
				this._xlinetooltiplinestyle = xlinetooltiplinestyle;
				this.on_apply_xlinetooltiplinestyle(xlinetooltiplinestyle);
			}
		}
		else {
			if (this._xlinetooltiplinestyle) {
				this._xlinetooltiplinestyle = null;
				this.on_apply_xlinetooltiplinestyle(null);
			}
		}
	};

	_pChartCrosshair.on_apply_xlinetooltiplinestyle = function (xlinetooltiplinestyle) {
		this._createXlineRect();


		this._xlinerect.set_strokepen(xlinetooltiplinestyle ? xlinetooltiplinestyle.value : "");
	};

	_pChartCrosshair.set_ylinetooltiplinestyle = function (val) {
		this.ylinetooltiplinestyle = val;
		if (val) {
			if (this._ylinetooltiplinestyle == null || !this._ylinetooltiplinestyle._single || this._ylinetooltiplinestyle.value != val) {
				var ylinetooltiplinestyle = nexacro.BorderObject(val);
				this._ylinetooltiplinestyle = ylinetooltiplinestyle;
				this.on_apply_ylinetooltiplinestyle(ylinetooltiplinestyle);
			}
		}
		else {
			if (this._ylinetooltiplinestyle) {
				this._ylinetooltiplinestyle = null;
				this.on_apply_ylinetooltiplinestyle(null);
			}
		}
	};

	_pChartCrosshair.on_apply_ylinetooltiplinestyle = function (ylinetooltiplinestyle) {
		this._createYlineRect();


		this._ylinerect.set_strokepen(ylinetooltiplinestyle ? ylinetooltiplinestyle.value : "");
	};

	_pChartCrosshair.set_xlinetooltiptextcolor = function (val) {
		this.xlinetooltiptextcolor = val;
		if (val) {
			if (this._xlinetooltiptextcolor == null || this._xlinetooltiptextcolor.value != val) {
				var xlinetooltiptextcolor = nexacro.ColorObject(val);
				this._xlinetooltiptextcolor = xlinetooltiptextcolor;
				this.on_apply_xlinetooltiptextcolor(xlinetooltiptextcolor);
			}
		}
		else {
			if (this._xlinetooltiptextcolor) {
				this._xlinetooltiptextcolor = null;
				this.on_apply_xlinetooltiptextcolor(null);
			}
		}
	};

	_pChartCrosshair.on_apply_xlinetooltiptextcolor = function (xlinetooltiptextcolor) {
		this._createXlineText();


		this._xlinetext.set_color(xlinetooltiptextcolor ? xlinetooltiptextcolor.value : "#000000");
	};

	_pChartCrosshair.set_ylinetooltiptextcolor = function (val) {
		this.ylinetooltiptextcolor = val;
		if (val) {
			if (this._ylinetooltiptextcolor == null || this._ylinetooltiptextcolor.value != val) {
				var ylinetooltiptextcolor = nexacro.ColorObject(val);
				this._ylinetooltiptextcolor = ylinetooltiptextcolor;
				this.on_apply_ylinetooltiptextcolor(ylinetooltiptextcolor);
			}
		}
		else {
			if (this._ylinetooltiptextcolor) {
				this._ylinetooltiptextcolor = null;
				this.on_apply_ylinetooltiptextcolor(null);
			}
		}
	};

	_pChartCrosshair.on_apply_ylinetooltiptextcolor = function (ylinetooltipcolor) {
		this._createYlineText();


		this._ylinetext.set_color(ylinetooltipcolor ? ylinetooltipcolor.value : "#000000");
	};

	_pChartCrosshair.destroy = function () {
		var itemID = this._group.id;

		var item = this._graphicsControl.getObjectByID(itemID);
		if (item) {
			this._graphicsControl.removeChild(item);
		}
		this._group.destroy();

		this._group = null;
		this._crosshairX = null;
		this._crosshairY = null;
		this._xlinerect = null;
		this._xlinetext = null;
		this._ylinerect = null;
		this._ylinetext = null;

		this._xlinestyle = null;
		this._ylinestyle = null;
		this._xlineopacity = null;
		this._ylineopacity = null;

		this._xlinetooltipfillstyle = null;
		this._ylinetooltipfillstyle = null;
		this._xlinetooltipopacity = null;
		this._ylinetooltipopacity = null;
		this._xlinetooltiplinestyle = null;
		this._ylinetooltiplinestyle = null;
		this._xlinetooltipborderradius = null;
		this._ylinetooltipborderradius = null;

		this._xlinetooltiptextcolor = null;
		this._ylinetooltiptextcolor = null;

		this._xlinetooltippadding = null;
		this._ylinetooltippadding = null;
		this._type = null;
		this._tooltiptype = null;

		this._show = false;



		if (this.parent) {
			if (this.parent.crosshair) {
				this.parent._deleteContentsProp("crosshair");
				this.parent.crosshair = null;
			}

			this.parent._changedData = true;
			this.parent = null;
		}

		nexacro.Object.prototype.destroy.call(this);
	};


	_pChartCrosshair._create = function () {
		this._group = new nexacro.GraphicsGroup();
		this._group.set_id("ChartCrosshairGroup");
		this._graphicsControl.addChild(this._group);
	};

	_pChartCrosshair._createCrosshairX = function () {
		if (!this._crosshairX) {
			this._crosshairX = new nexacro.GraphicsLine();
			this._crosshairX.set_id("ChartCrosshairX");
			this._group.addChild(this._crosshairX);
			this._crosshairX._crosshair = this;
		}
	};

	_pChartCrosshair._createCrosshairY = function () {
		if (!this._crosshairY) {
			this._crosshairY = new nexacro.GraphicsLine();
			this._crosshairY.set_id("ChartCrosshairY");
			this._group.addChild(this._crosshairY);
			this._crosshairY._crosshair = this;
		}
	};

	_pChartCrosshair._createXlineRect = function () {
		if (!this._xlinerect) {
			this._xlinerect = new nexacro.GraphicsRect();
			this._xlinerect.set_id("ChartCrosshairXRect");
			this._group.addChild(this._xlinerect);
			this._xlinerect._crosshair = this;
		}
	};

	_pChartCrosshair._createYlineRect = function () {
		if (!this._ylinerect) {
			this._ylinerect = new nexacro.GraphicsRect();
			this._ylinerect.set_id("ChartCrosshairYRect");
			this._group.addChild(this._ylinerect);
			this._ylinerect._crosshair = this;
		}
	};

	_pChartCrosshair._createXlineText = function () {
		if (!this._xlinetext) {
			this._xlinetext = new nexacro.GraphicsText();
			this._xlinetext.set_id("ChartCrosshairXText");
			this._xlinetext.set_verticalAlign("middle");
			this._xlinetext.set_textAlign("center");
			this._xlinetext.set_font("0pt");
			this._group.addChild(this._xlinetext);
			this._xlinetext._crosshair = this;
		}
	};

	_pChartCrosshair._createYlineText = function () {
		if (!this._ylinetext) {
			this._ylinetext = new nexacro.GraphicsText();
			this._ylinetext.set_id("ChartCrosshairYText");
			this._ylinetext.set_textAlign("center");
			this._ylinetext.set_verticalAlign("middle");
			this._ylinetext.set_font("0pt");
			this._group.addChild(this._ylinetext);
			this._ylinetext._crosshair = this;
		}
	};

	_pChartCrosshair._setLineText = function (axis, pos, lineRect, lineText) {
		if (!axis) {
			return;
		}

		var ticks = axis._ticks, size, sizeW = 0, sizeH = 0;

		if (ticks) {
			var position = axis._location, wlinedatapadding = 0, hlinedatapadding = 0, label;

			if (position == "left" || position == "right") {
				if (this._xlinetooltippadding) {
					wlinedatapadding = this._xlinetooltippadding.left + this._xlinetooltippadding.right;
					hlinedatapadding = this._xlinetooltippadding.top + this._xlinetooltippadding.bottom;
				}
			}
			else {
				if (this._ylinetooltippadding) {
					wlinedatapadding = this._ylinetooltippadding.left + this._ylinetooltippadding.right;
					hlinedatapadding = this._ylinetooltippadding.top + this._ylinetooltippadding.bottom;
				}
			}

			if (axis._type == "categoryAxis") {
				var idx = nexacro.round(axis.c2p(pos));
				var tick = ticks[idx];
				if (tick) {
					label = tick.label;
				}
			}
			else {
				label = nexacro.round(axis.c2p(pos));
			}

			lineText.set_text(label);
			lineText.set_font(axis.labeltextfont);

			size = lineText._getRect();
			sizeW = size.width;
			sizeH = size.height;
			lineRect.set_width(sizeW + wlinedatapadding);
			lineRect.set_height(sizeH + hlinedatapadding);
		}

		return [sizeW, sizeH];
	};

	_pChartCrosshair._calcCrosshair = function (_gridRectBound) {
		var preCanvasX = null;
		var preCanvasY = null;
		if (this._crosshairX && this._type.indexOf("x") != -1 && this._crosshairX.preCanvasX && this._crosshairX.preCanvasY) {
			preCanvasX = this._crosshairX.preCanvasX;
			preCanvasY = this._crosshairX.preCanvasY;
			this._crosshairX.preCanvasX = null;
			this._crosshairX.preCanvasY = null;
		}
		if (this._crosshairY && this._type.indexOf("y") != -1 && this._crosshairY.preCanvasX && this._crosshairY.preCanvasY) {
			preCanvasX = this._crosshairY.preCanvasX;
			preCanvasY = this._crosshairY.preCanvasY;
			this._crosshairY.preCanvasX = null;
			this._crosshairY.preCanvasY = null;
		}
		if (preCanvasX && preCanvasY) {
			if (preCanvasX < _gridRectBound.left) {
				preCanvasX = _gridRectBound.left;
			}
			else if (preCanvasX > _gridRectBound.right) {
				preCanvasX = _gridRectBound.right;
			}
			if (preCanvasY < _gridRectBound.top) {
				preCanvasY = _gridRectBound.top;
			}
			else if (preCanvasY > _gridRectBound.bottom) {
				preCanvasY = _gridRectBound.bottom;
			}
			this._showCrosshair(_gridRectBound, preCanvasX, preCanvasY);
		}
	};
	_pChartCrosshair._showCrosshair = function (_gridRectBound, canvasX, canvasY) {
		var gridRectBound = _gridRectBound;
		if (!this._show) {
			this.on_apply_xlinestyle(this._xlinestyle);
			this.on_apply_xlineopacity(this._xlineopacity);
			this.on_apply_ylinestyle(this._ylinestyle);
			this.on_apply_ylineopacity(this._ylineopacity);

			this.on_apply_xlinetooltipborderradius(this._xlinetooltipborderradius);
			this.on_apply_ylinetooltipborderradius(this._ylinetooltipborderradius);
			this.on_apply_xlinetooltipfillstyle(this._xlinetooltipfillstyle);
			this.on_apply_xlinetooltipopacity(this._xlinetooltipopacity);
			this.on_apply_ylinetooltipfillstyle(this._ylinetooltipfillstyle);
			this.on_apply_ylinetooltipopacity(this._ylinetooltipopacity);
			this.on_apply_xlinetooltiplinestyle(this._xlinetooltiplinestyle);
			this.on_apply_ylinetooltiplinestyle(this._ylinetooltiplinestyle);
			this.on_apply_xlinetooltiptextcolor(this._xlinetooltiptextcolor);
			this.on_apply_ylinetooltiptextcolor(this._ylinetooltiptextcolor);
		}

		var type = this._type, tooltiptype = this._tooltiptype, crosshairX = this._crosshairX, crosshairY = this._crosshairY, xlinerect = this._xlinerect, ylinerect = this._ylinerect, xlinetext = this._xlinetext, ylinetext = this._ylinetext, axis, size, sizeW = 0, sizeH = 0, position, rectX = 0, rectY = 0, textX = 0, textY = 0, xlinetooltipgap = this.xlinetooltipgap || 0, ylinetooltipgap = this.ylinetooltipgap || 0;


		var xlinetooltippaddingTop = 0, xlinetooltippaddingLeft = 0, xlinetooltippaddingRight = 0, xlinetooltippaddingBottom = 0, ylinetooltippaddingTop = 0, ylinetooltippaddingLeft = 0, ylinetooltippaddingRight = 0, ylinetooltippaddingBottom = 0;

		if (this._xlinetooltippadding) {
			xlinetooltippaddingTop = this._xlinetooltippadding.top;
			xlinetooltippaddingLeft = this._xlinetooltippadding.left;
			xlinetooltippaddingRight = this._xlinetooltippadding.right;
			xlinetooltippaddingBottom = this._xlinetooltippadding.bottom;
		}
		if (this._ylinetooltippadding) {
			ylinetooltippaddingTop = this._ylinetooltippadding.top;
			ylinetooltippaddingLeft = this._ylinetooltippadding.left;
			ylinetooltippaddingRight = this._ylinetooltippadding.right;
			ylinetooltippaddingBottom = this._ylinetooltippadding.bottom;
		}
		if (this.rotatecrosshairline) {
			crosshairX = this._crosshairY;
			crosshairY = this._crosshairX;
			xlinerect = this._ylinerect;
			ylinerect = this._xlinerect;
			xlinetext = this._ylinetext;
			ylinetext = this._xlinetext;
			if (this._xlinetooltippadding) {
				ylinetooltippaddingTop = this._xlinetooltippadding.top;
				ylinetooltippaddingLeft = this._xlinetooltippadding.left;
				ylinetooltippaddingRight = this._xlinetooltippadding.right;
				ylinetooltippaddingBottom = this._xlinetooltippadding.bottom;
			}
			if (this._ylinetooltippadding) {
				xlinetooltippaddingTop = this._ylinetooltippadding.top;
				xlinetooltippaddingLeft = this._ylinetooltippadding.left;
				xlinetooltippaddingRight = this._ylinetooltippadding.right;
				xlinetooltippaddingBottom = this._ylinetooltippadding.bottom;
			}
		}


		if (!this.visible) {
			return false;
		}
		if (canvasX < gridRectBound.left || canvasX > gridRectBound.right) {
			return false;
		}
		if (canvasY < gridRectBound.top || canvasY > gridRectBound.bottom) {
			return false;
		}






		var axisLine;
		var axislinestyle;
		var axislinewidth = 0;
		var tickgap = 0;
		var axisrect;
		if (xlinetext && xlinerect && tooltiptype.indexOf("x") != -1) {
			var yaxes = this.parent._yaxes;
			axis = yaxes[0];
			if (!axis) {
				return false;
			}
			axisLine = axis._axisLine;
			axislinestyle = axis._axislinestyle;
			axislinewidth = 0;
			if (axisLine) {
				axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 0;
			}
			var xlinetooltiplinestyle = this._xlinetooltiplinestyle;
			var xlinetooltiplinewidth = 0;

			xlinetooltiplinewidth = xlinetooltiplinestyle ? xlinetooltiplinestyle._getBorderLeftWidth() : 0;
			xlinetooltiplinewidth *= 0.5;

			tickgap = axis._tickendspace;
			if (axis._type == "categoryAxis") {
				tickgap += axis._tickendgap;
			}

			size = this._setLineText(axis, canvasY - gridRectBound.top - tickgap, xlinerect, xlinetext);
			sizeW = size[0];
			sizeH = size[1];

			if (sizeW > 0 && sizeH > 0 && xlinetext.text != "") {
				position = axis._location;
				axisrect = axis._axisRect._bounds;

				if (position == "right") {
					textX = axisrect.left + (xlinetooltippaddingLeft) + xlinetooltipgap + axislinewidth + xlinetooltiplinewidth;
					rectX = axisrect.left + xlinetooltipgap + axislinewidth + xlinetooltiplinewidth;
				}
				else {
					textX = axisrect.right - sizeW - (xlinetooltippaddingRight) - xlinetooltipgap - axislinewidth - xlinetooltiplinewidth;
					rectX = axisrect.right - sizeW - (xlinetooltippaddingLeft + xlinetooltippaddingRight) - xlinetooltipgap - axislinewidth - xlinetooltiplinewidth;
				}

				rectY = canvasY - (sizeH + xlinetooltippaddingTop + xlinetooltippaddingBottom) * 0.5;
				textY = rectY + (sizeH * 0.5) + xlinetooltippaddingTop;

				xlinetext.set_x(textX + (sizeW * 0.5));
				xlinetext.set_y(textY);
				xlinetext.set_visible(true);
				xlinerect.set_x(rectX);
				xlinerect.set_y(rectY);
				xlinerect.set_visible(true);
			}
			else {
				xlinetext.set_visible(false);
				xlinerect.set_visible(false);
			}
			xlinetext.preCanvasX = canvasX;
			xlinetext.preCanvasY = canvasY;
		}
		if (crosshairX && type.indexOf("x") != -1 && (!crosshairX.preCanvasY || crosshairX.preCanvasY != canvasY)) {
			crosshairX.set_x1(gridRectBound.left);
			crosshairX.set_y1(canvasY);
			crosshairX.set_x2(gridRectBound.right);
			crosshairX.set_y2(canvasY);
			crosshairX.set_visible(true);
			crosshairX.preCanvasY = canvasY;
			crosshairX.preCanvasX = canvasX;
		}


		if (ylinetext && ylinetext && tooltiptype.indexOf("y") != -1) {
			var xaxes = this.parent._xaxes;
			axis = xaxes[0];
			if (!axis) {
				return false;
			}

			axisLine = axis._axisLine;
			axislinestyle = axis._axislinestyle;
			axislinewidth = 0;
			if (axisLine) {
				axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 0;
			}
			var ylinetooltiplinestyle = this._ylinetooltiplinestyle;
			var ylinetooltiplinewidth = 0;

			ylinetooltiplinewidth = ylinetooltiplinestyle ? ylinetooltiplinestyle._getBorderLeftWidth() : 0;
			ylinetooltiplinewidth *= 0.5;

			tickgap = 0;
			if (axis._type == "categoryAxis") {
				tickgap += axis._tickstartgap;
			}

			size = this._setLineText(axis, canvasX - gridRectBound.left - tickgap, ylinerect, ylinetext);
			sizeW = size[0];
			sizeH = size[1];
			axisrect = axis._axisRect._bounds;
			if (sizeW > 0 && sizeH > 0 && ylinetext.text != "") {
				position = axis._location;
				rectX = canvasX - ((sizeW + ylinetooltippaddingLeft + ylinetooltippaddingRight) * 0.5);
				textX = rectX + (sizeW * 0.5) + xlinetooltippaddingLeft;

				if (position == "top") {
					rectY = axisrect.bottom - sizeH - (ylinetooltippaddingTop + ylinetooltippaddingBottom) - ylinetooltipgap - axislinewidth - ylinetooltiplinewidth;
					textY = rectY + (sizeH * 0.5) + ylinetooltippaddingTop;
				}
				else {
					rectY = axisrect.top + ylinetooltipgap + axislinewidth + ylinetooltiplinewidth;
					textY = rectY + (sizeH * 0.5) + ylinetooltippaddingTop;
				}

				ylinetext.set_x(textX);
				ylinetext.set_y(textY);

				ylinetext.set_visible(true);
				ylinerect.set_x(rectX);
				ylinerect.set_y(rectY);
				ylinerect.set_visible(true);
			}
			else {
				ylinetext.set_visible(false);
				ylinerect.set_visible(false);
			}
			ylinetext.preCanvasX = canvasX;
			ylinetext.preCanvasY = canvasY;
		}
		if (crosshairY && type.indexOf("y") != -1 && (!crosshairY.preCanvasX || crosshairY.preCanvasX != canvasX)) {
			crosshairY.set_x1(canvasX);
			crosshairY.set_y1(gridRectBound.top);
			crosshairY.set_x2(canvasX);
			crosshairY.set_y2(gridRectBound.bottom);
			crosshairY.set_visible(true);
			crosshairY.preCanvasX = canvasX;
			crosshairY.preCanvasY = canvasY;
		}
		this.parent._graphicsControl.draw();

		this._show = true;
	};

	_pChartCrosshair._hideCrosshair = function () {
		if (!this._show) {
			return;
		}

		if (this._crosshairX) {
			this._crosshairX.set_visible(false);
		}

		if (this._crosshairY) {
			this._crosshairY.set_visible(false);
		}

		if (this._xlinerect) {
			this._xlinerect.set_visible(false);
		}

		if (this._ylinerect) {
			this._ylinerect.set_visible(false);
		}

		if (this._xlinetext) {
			this._xlinetext.set_visible(false);
		}

		if (this._ylinetext) {
			this._ylinetext.set_visible(false);
		}

		this._show = false;
		this.parent._graphicsControl.draw();
	};
	_pChartCrosshair._moveCrosshair = function (gridRectBound, canvasX, canvasY) {
	};
	_pChartCrosshair._changeContentsProperty = function (nm, newVal, oldVal) {
		var contents = this.parent.contents;
		if (contents && contents.crosshair) {
			contents.crosshair[nm] = newVal;
		}
	};
	delete _pChartCrosshair;
}

if (!nexacro._SeriesBase) {
	nexacro._SeriesBase = function (id, parent, graphicsControl) {
		this.id = id || "";
		this.parent = parent || null;
		this._graphicsControl = graphicsControl || this.parent._graphicsControl;

		this._data = [];
		this._datapoints = {
			points : []
		};

		this._selectedItem = [];

		this.itemtext = new nexacro.BindableValue("");
		this.tooltiptext = new nexacro.BindableValue(undefined);
		this.selectcolumn = new nexacro.BindableValue("");
		this.valuecolumn = new nexacro.BindableValue("");

		this._chart_aniframe_obj = {
			requestaniframe : null, 
			enableanimation : false, 
			starttime : null, 
			duration : 1000, 
			isloadanimation : false, 
			drawflag : false, 
			_timeseginfo : 
				{
				frame_seg : 0
			}, 
			_drawinfo : 
				{
				percent : null, 
				value : null, 
				angle : null, 
				isnegativecalc : false
			}, 
			animationeffects : 
				{
				framelate : 24, 
				direction : "auto", 
				itemoffset : 0, 
				easing : "linear", 
				effect : "default", 
				styleeffect : {
				}
					
			}
		};
	};

	var _pSeriesBase = nexacro._createPrototype(nexacro.Object, nexacro._SeriesBase);
	nexacro._SeriesBase.prototype = _pSeriesBase;
	_pSeriesBase._type_name = "SeriesBase";


	_pSeriesBase.itemtext = "";
	_pSeriesBase.itemtextcolor = "";
	_pSeriesBase.itemtextfont = "";
	_pSeriesBase.itemtextmask = "";
	_pSeriesBase.itemtexttype = "normal";
	_pSeriesBase.itemtextvisible = false;
	_pSeriesBase.itemtextwidth = undefined;
	_pSeriesBase.locale = "";
	_pSeriesBase.selecttype = "unselect";
	_pSeriesBase.titletext = "";
	_pSeriesBase.tooltiptext = undefined;
	_pSeriesBase.tooltiptextmask = "";
	_pSeriesBase.tooltiptexttype = "normal";


	_pSeriesBase._seriesGroup = null;
	_pSeriesBase._color = null;
	_pSeriesBase._itemCnt = 0;
	_pSeriesBase._redrawSeries = false;
	_pSeriesBase._itemtext = null;
	_pSeriesBase._itemtextObj = null;
	_pSeriesBase._itemtextvisible = false;
	_pSeriesBase._itemtextfont = null;
	_pSeriesBase._itemtextcolor = null;
	_pSeriesBase._invalidvaluecolumn = false;
	_pSeriesBase._invalidselectcolumn = false;
	_pSeriesBase._itemtextlist = [];
	_pSeriesBase._chart_aniframe_obj = null;

	_pSeriesBase._pointshapeObj = {
		square : function (x, y, radius, point) {
			var size = radius * Math.sqrt(Math.PI) / 2;
			if (point) {
				point.set_x(x - size);
				point.set_y(y - size);
				point.set_width(size + size);
				point.set_height(size + size);
				return point;
			}
			else {
				var rect = new nexacro.GraphicsRect(x - size, y - size, size + size, size + size);
				return rect;
			}
		}, 

		diamond : function (x, y, radius, point) {
			var size = radius * Math.sqrt(Math.PI / 2);
			if (point) {
				point.removeSegments(0);
				point.moveTo(x - size, y);
				point.lineTo(x, y - size);
				point.lineTo(x + size, y);
				point.lineTo(x, y + size);
				point.closePath();
				return point;
			}
			else {
				var path = new nexacro.GraphicsPath();
				path.moveTo(x - size, y);
				path.lineTo(x, y - size);
				path.lineTo(x + size, y);
				path.lineTo(x, y + size);
				path.closePath();
				return path;
			}
		}, 

		triangle : function (x, y, radius, point) {
			var size = radius * Math.sqrt(2 * Math.PI / Math.sin(Math.PI / 3));
			var height = size * Math.sin(Math.PI / 3);
			if (point) {
				point.removeSegments(0);
				point.moveTo(x - size / 2, y + height / 2);
				point.lineTo(x + size / 2, y + height / 2);
				point.lineTo(x, y - height / 2);
				point.closePath();
				return point;
			}
			else {
				var path = new nexacro.GraphicsPath();
				path.moveTo(x - size / 2, y + height / 2);
				path.lineTo(x + size / 2, y + height / 2);
				path.lineTo(x, y - height / 2);
				path.closePath();
				return path;
			}
		}, 

		cross : function (x, y, radius, point) {
			var size = radius * Math.sqrt(Math.PI) / 2;
			if (point) {
				point.clear();
				point.moveTo(x - size, y - size);
				point.lineTo(x + size, y + size);
				point.moveTo(x - size, y + size);
				point.lineTo(x + size, y - size);
				return point;
			}
			else {
				var paths = new nexacro.GraphicsPaths();
				paths.moveTo(x - size, y - size);
				paths.lineTo(x + size, y + size);
				paths.moveTo(x - size, y + size);
				paths.lineTo(x + size, y - size);
				return paths;
			}
		}
	};

	_pSeriesBase.set_locale = function (val) {
		if (val != this.locale) {
			this._changeContentsProperty("locale", val, this.locale);
			this.locale = val;
			this._locale = val;
			this.on_apply_locale();
		}

		this._chart._draw();
	};

	_pSeriesBase.on_apply_locale = function () {
		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && this._itemCnt > 0) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesItemText_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					var itemtext = this.itemtext, itemtexttype = this.itemtexttype, itemtextmask = this.itemtextmask, locale = this.locale;

					this._itemtext = nexacro._getChartDisplaytText(i, itemtext, locale, itemtexttype, itemtextmask, chart, this);
					if (this._itemtext) {
						item.set_text(this._itemtext);
					}
				}
			}

			this._chart._changedData = true;
		}
	};

	_pSeriesBase.set_valuecolumn = function (v) {
		if (this.valuecolumn._value != v) {
			this._changeContentsProperty("valuecolumn", v, this.valuecolumn);
			this.valuecolumn._set(v);
			this.on_apply_valuecolumn();
		}
		if (this._chart._changedData == true) {
			this._chart._reset = true;
			this._chart._draw();
		}
		else {
			this._chart._draw();
		}
	};

	_pSeriesBase.on_apply_valuecolumn = function () {
		var valuecolumn = this.valuecolumn;
		var bindtype = valuecolumn._bindtype;
		if (bindtype == 0) {
			this._invalidvaluecolumn = true;
		}
		else {
			valuecolumn = this._getBindableValue("valuecolumn");
			var binddataset = this._chart._binddataset;
			if (binddataset) {
				var coltype = binddataset._getColumnType(valuecolumn);
				if (!coltype) {
					this._invalidvaluecolumn = true;
				}
				else {
					this._invalidvaluecolumn = false;
				}
			}
		}
		this._chart._changedData = true;
	};

	_pSeriesBase.set_titletext = function (val) {
		var titletext = nexacro._toString(val);
		if (titletext != this.titletext) {
			this._changeContentsProperty("titletext", val, this.titletext);
			this.titletext = titletext;
			this.on_apply_titletext(titletext);
		}

		this._chart._draw();
	};

	_pSeriesBase.on_apply_titletext = function () {
		var legend = this._chart.legend;
		if (legend) {
			this._chart._applyLegendItem();
		}
	};

	_pSeriesBase.set_tooltiptext = function (v) {
		if (this.tooltiptext != v) {
			this._changeContentsProperty("tooltiptext", v, this.tooltiptext);
			this.tooltiptext._set(v);
		}

		this._chart._draw();
	};

	_pSeriesBase.set_tooltiptexttype = function (v) {
		if (this.tooltiptexttype != v) {
			this._changeContentsProperty("tooltiptexttype", v, this.tooltiptexttype);
			this.tooltiptexttype = v;
		}

		this._chart._draw();
	};

	_pSeriesBase.set_tooltiptextmask = function (val) {
		var tooltiptextmask = nexacro._toString(val);
		if (tooltiptextmask != this.tooltiptextmask) {
			this._changeContentsProperty("tooltiptextmask", val, this.tooltiptextmask);
			this.tooltiptextmask = tooltiptextmask;
		}

		this._chart._draw();
	};

	_pSeriesBase.set_itemtextvisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.itemtextvisible != val) {
			this._changeContentsProperty("itemtextvisible", val, this.itemtextvisible);
			this._itemtextvisible = this.itemtextvisible;
			this.itemtextvisible = val;
			this.on_apply_itemtextvisible(val);
		}

		this._chart._draw();
	};

	_pSeriesBase.on_apply_itemtextvisible = function (itemtextvisible) {
		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && !nexacro._isNull(items)) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesItemText_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					item.set_visible(itemtextvisible);
				}
				else {
					if (itemtextvisible) {
						this._chart._rearrange = true;
						this._chart._recreate = true;
					}
				}
			}
		}
	};

	_pSeriesBase.set_itemtext = function (v) {
		if (this.itemtext != v) {
			this._changeContentsProperty("itemtext", v, this.itemtext);
			this.itemtext._set(v);
			this.on_apply_itemtext();
		}

		this._chart._draw();
	};

	_pSeriesBase.on_apply_itemtext = function () {
		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && this._itemCnt > 0) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesItemText_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					var itemtext = this.itemtext, itemtexttype = this.itemtexttype, itemtextmask = this.itemtextmask, locale = this.locale;

					this._itemtext = nexacro._getChartDisplaytText(i, itemtext, locale, itemtexttype, itemtextmask, chart, this);
					if (!nexacro._isNull(this._itemtext)) {
						item.set_text(this._itemtext);
					}
				}
			}
		}
	};

	_pSeriesBase.set_itemtexttype = function (v) {
		if (this.itemtexttype != v) {
			this._changeContentsProperty("itemtexttype", v, this.itemtexttype);
			this.itemtexttype = v;
			this.on_apply_itemtexttype();
		}

		this._chart._draw();
	};

	_pSeriesBase.on_apply_itemtexttype = function () {
		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && this._itemCnt > 0) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesItemText_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					var itemtext = this.itemtext, itemtexttype = this.itemtexttype, itemtextmask = this.itemtextmask, locale = this.locale;

					this._itemtext = nexacro._getChartDisplaytText(i, itemtext, locale, itemtexttype, itemtextmask, chart, this);
					if (!nexacro._isNull(this._itemtext)) {
						item.set_text(this._itemtext);
					}
				}
			}
			this._chart._rearrange = true;
			this._chart._recreate = true;
		}
	};

	_pSeriesBase.set_itemtextmask = function (val) {
		var itemtextmask = nexacro._toString(val);
		if (itemtextmask != this.itemtextmask) {
			this._changeContentsProperty("itemtextmask", val, this.itemtextmask);
			this.itemtextmask = itemtextmask;
			this.on_apply_itemtextmask(itemtextmask);
		}

		this._chart._draw();
	};

	_pSeriesBase.on_apply_itemtextmask = function () {
		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && this._itemCnt > 0) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesItemText_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					var itemtext = this.itemtext, itemtexttype = this.itemtexttype, itemtextmask = this.itemtextmask, locale = this.locale;

					this._itemtext = nexacro._getChartDisplaytText(i, itemtext, locale, itemtexttype, itemtextmask, chart, this);
					if (!nexacro._isNull(this._itemtext)) {
						item.set_text(this._itemtext);
					}
				}
			}
			this._chart._rearrange = true;
			this._chart._recreate = true;
		}
	};

	_pSeriesBase.set_itemtextwidth = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val)) {
				return;
			}
		}

		if (this.itemtextwidth !== val) {
			this._changeContentsProperty("itemtextwidth", val, this.itemtextwidth);
			this.itemtextwidth = val;
			this.on_apply_itemtextwidth(val);
		}

		this._chart._draw();
	};

	_pSeriesBase.on_apply_itemtextwidth = function (itemtextwidth) {
		this._chart._changedData = true;
	};

	_pSeriesBase.set_itemtextfont = function (val) {
		this.itemtextfont = val;
		if (val) {
			if (this._itemtextfont == null || this._itemtextfont.value != val) {
				var oldValue;
				if (this._itemtextfont) {
					oldValue = this._itemtextfont.value;
				}
				this._changeContentsProperty("itemtextfont", val, oldValue);

				var itemtextfont = nexacro.FontObject(val);
				this._itemtextfont = itemtextfont;
				this.on_apply_itemtextfont(itemtextfont);
			}
		}
		else {
			if (this._itemtextfont) {
				this._itemtextfont = null;
				this.on_apply_itemtextfont(null);
			}
		}

		this._chart._draw();
	};

	_pSeriesBase.on_apply_itemtextfont = function (itemtextfont) {
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
					item.set_font(itemtextfont ? itemtextfont.value || itemtextfont : "12pt Verdana");
				}
			}
		}
	};

	_pSeriesBase.set_itemtextcolor = function (val) {
		this.itemtextcolor = val;
		if (val) {
			if (this._itemtextcolor == null || this._itemtextcolor.value != val) {
				var oldValue;
				if (this._itemtextcolor) {
					oldValue = this._itemtextcolor.value;
				}
				this._changeContentsProperty("itemtextcolor", val, oldValue);

				var itemtextcolor = nexacro.ColorObject(val);
				this._itemtextcolor = itemtextcolor;
				this.on_apply_itemtextcolor(itemtextcolor);
			}
		}
		else {
			if (this._itemtextcolor) {
				this._itemtextcolor = null;
				this.on_apply_itemtextcolor(null);
			}
		}

		this._chart._draw();
	};

	_pSeriesBase.on_apply_itemtextcolor = function (itemtextcolor) {
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
					item.set_color(itemtextcolor ? itemtextcolor.value || itemtextcolor : "#000000");
				}
			}
		}
	};

	_pSeriesBase.set_selecttype = function (val) {
		var selecttype_enum = ["unselect", "select", "bind"];
		if (selecttype_enum.indexOf(val) == -1) {
			return;
		}

		if (this.selecttype != val) {
			this._changeContentsProperty("selecttype", val, this.selecttype);
			this.selecttype = val;
			this.on_apply_selecttype(val);
		}

		this._chart._draw();
	};

	_pSeriesBase.on_apply_selecttype = function (selecttype) {
		if (selecttype == "select" || selecttype == "unselect") {
			var selectcolumn = this._getBindableValue("selectcolumn");
			var length = this._data.length;
			for (var i = 0; i < length; i++) {
				this._selectItem(i, selecttype, selectcolumn, this._selectedItem, this);
			}
		}
		else {
			this._chart._changedData = true;
			this._chart._changedColorset = true;
		}
		this._chart._rearrange = true;
		this._chart._recreate = true;
	};

	_pSeriesBase.set_selectcolumn = function (v) {
		if (this.selectcolumn._value != v) {
			this._changeContentsProperty("selectcolumn", v, this.selectcolumn);

			this.selectcolumn._set(v);
			this.on_apply_selectcolumn();
		}

		this._chart._draw();
	};

	_pSeriesBase.on_apply_selectcolumn = function () {
		var selecttype = this.selecttype;
		var selectcolumn;
		var length = 0;
		var binddataset;
		if (selecttype == "select" || selecttype == "unselect") {
			selectcolumn = this._getBindableValue("selectcolumn");
			length = this._data.length;
			for (var i = 0; i < length; i++) {
				this._selectItem(i, selecttype, selectcolumn, this._selectedItem, this);
			}
		}
		else {
			selectcolumn = this.selectcolumn;
			var bindtype = selectcolumn._bindtype;
			if (bindtype == 0) {
				this._invalidselectcolumn = true;
			}
			else {
				selectcolumn = this._getBindableValue("selectcolumn");
				binddataset = this._chart._binddataset;
				if (binddataset) {
					var coltype = binddataset._getColumnType(selectcolumn);
					if (!coltype) {
						this._invalidselectcolumn = true;
					}
					else {
						this._invalidselectcolumn = false;
					}
				}
			}
		}

		this._chart._changedData = true;
		this._chart._changedColorset = true;
	};

	_pSeriesBase.getSelectItem = function (index) {
		var selectedItem = this._selectedItem, length = this._selectedItem.length, bSelect;

		if (length <= 0) {
			return;
		}

		bSelect = selectedItem[index];
		return bSelect;
	};

	_pSeriesBase.setSelectItem = function (index, bSelect_) {
		var re = false, itemcnt = this._itemCnt - 1;

		if (nexacro._GraphicsLib.isEmpty(index) || index < -1 || index > itemcnt || nexacro._GraphicsLib.isEmpty(bSelect_)) {
			return false;
		}

		var bSelect = nexacro._toBoolean(bSelect_);
		var selectcolumn = this._getBindableValue("selectcolumn");

		if (index != -1) {
			re = this._selectItem(index, "bind", bSelect, this._selectedItem, this);
		}
		else {
			var length = this._data.length;
			for (var i = 0; i < length; i++) {
				if (bSelect) {
					this._selectedItem[i] = true;
				}
				else {
					this._selectedItem[i] = false;
				}
				re = true;
			}
		}
		this._chart._rearrange = true;
		this._chart._recreate = true;

		this._chart._draw();

		return re;
	};

	_pSeriesBase.destroy = function () {
		this._destroy(true);
	};

	_pSeriesBase._destroy = function (parent_clear) {
		if (parent_clear) {
			if (this._chart) {
				if (this._chart.seriesset) {
					var seriesId = this.id;
					var index = -1;

					nexacro._GraphicsLibArray.forEach(this._chart.seriesset, function (series, i) {
						if (series) {
							if (series.id == seriesId) {
								series._chart._deleteContentsProp("seriesset", i);
								index = i;
							}
						}
					});
					nexacro._GraphicsLibArray.removeAt(this._chart.seriesset, index);
				}
			}
		}
		if (this._chart_aniframe_obj) {
			if (this._chart_aniframe_obj.requestaniframe) {
				this._chart_aniframe_obj.requestaniframe.destroy();
			}
			this._chart_aniframe_obj = null;
		}
		this.id = null;
		this.locale = null;
		this.valuecolumn = null;
		this.titletext = null;
		this.tooltiptext = null;
		this.itemtextvisible = null;
		this.itemtext = null;
		this.itemtexttype = null;
		this.itemtextmask = null;
		this.tooltiptexttype = null;
		this.tooltiptextmask = null;
		this.itemtextwidth = null;
		this.itemtextfont = null;
		this.itemtextcolor = null;
		this.selecttype = null;
		this.selectcolumn = null;

		this._color = null;
		this._itemCnt = null;
		this._data = null;
		this._redrawSeries = null;
		this._datapoints = null;
		this._selectedItem = null;
		this._dataMap = null;

		this._itemtext = null;
		this._itemtextObj = null;
		this._itemtextvisible = null;

		this.parent = null;
		this._graphicsControl = null;
		this._chart = null;

		nexacro.Object.prototype.destroy.call(this);
	};

	_pSeriesBase._createSeriesItemText = function (item) {
		var index = item.index, itemtext = this.itemtext, itemtexttype = this.itemtexttype, itemtextmask = this.itemtextmask, itemtextfont = this.itemtextfont, itemtextcolor = this.itemtextcolor, itemtextwidth = this.itemtextwidth, locale = this.locale, chart = this._chart, charttype = chart._type_name, text, itemtextvalue;


		itemtextvalue = itemtext._value;
		if (itemtext && itemtextvalue == "") {
			itemtext = this.valuecolumn;
		}

		if (itemtext) {
			text = nexacro._getChartDisplaytText(index, itemtext, locale, itemtexttype, itemtextmask, chart, this);
		}

		if (!nexacro._isNull(text)) {
			this._itemtext = text;
			this._itemtextObj = new nexacro.GraphicsText(0, 0);

			var itemId = this._configIndex + " SeriesItemText_" + index;
			this._itemtextObj.set_id(itemId);
			this._itemtextObj.set_text(this._itemtext);
			if (charttype == "RadarChart") {
				this._itemtextObj.set_font(itemtextfont ? itemtextfont.value || itemtextfont : "8pt Verdana");
			}
			else {
				this._itemtextObj.set_font(itemtextfont ? itemtextfont.value || itemtextfont : "12pt Verdana");
			}
			this._itemtextObj.set_color(itemtextcolor ? itemtextcolor.value || itemtextcolor : "#000000");
			this._itemtextObj.index = item.index;
			this._itemtextObj.value = item.value;
			if (itemtextwidth > 0) {
				this._itemtextObj.set_width(itemtextwidth);
				this._itemtextObj.set_wordWrap(true);
			}
			else {
				this._itemtextObj.set_wordWrap(false);
			}
			this._itemtextlist.push(itemId);

			return this._itemtextObj;
		}
	};

	_pSeriesBase._setData = function () {
		var chart = this._chart;
		if (chart) {
			var obj;
			var data = [];
			var pThis = this;
			var selectedindex = 0;
			var invaliddata = false;
			var charttype = chart._type_name;
			var selecttype = this.selecttype;
			var categorycolumn = chart._getBindableValue("categorycolumn");
			var valuecolumn = this._getBindableValue("valuecolumn");
			var value2column = this._getBindableValue("value2column");
			var value3column = this._getBindableValue("value3column");
			var selectcolumn = this._getBindableValue("selectcolumn");
			var rotateaxis = chart.rotateaxis;
			var binddataset = chart._binddataset;
			var coltype;
			var invalidcategorycolumn = chart._invalidcategorycolumn;
			var invalidvaluecolumn = this._invalidvaluecolumn;
			var invalidselectcolumn = this._invalidselectcolumn;
			var invalidvalue2column = this._invalidvalue2column;
			var invalidvalue3column = this._invalidvalue3column;

			if (binddataset) {
				if (charttype == "RadarChart" || charttype == "BasicChart" || charttype == "PieChart" || charttype == "GaugeChart") {
					if (!categorycolumn) {
						invaliddata = true;
					}
					else {
						coltype = binddataset._getColumnType(categorycolumn);
						if (!coltype || invalidcategorycolumn) {
							invaliddata = true;
						}
					}
				}

				if (valuecolumn) {
					coltype = binddataset._getColumnType(valuecolumn);
					if (!coltype || invalidvaluecolumn) {
						invaliddata = true;
					}
				}

				if (value2column) {
					coltype = binddataset._getColumnType(value2column);
					if (!coltype || invalidvalue2column) {
						invaliddata = true;
					}
				}

				if (value3column) {
					coltype = binddataset._getColumnType(value3column);
					if (!coltype || invalidvalue3column) {
						invaliddata = true;
					}
				}

				if (selectcolumn) {
					coltype = binddataset._getColumnType(selectcolumn);
					if (!coltype || invalidselectcolumn) {
						selectcolumn = null;
					}
				}

				if (invaliddata) {
					this._data = [];
					this._chart._changedData = true;
					return false;
				}
			}

			var dataMap = chart._dataMap;
			if (dataMap) {
				if (valuecolumn && !value2column && !value3column) {
					dataMap.forEach(function (key) {
						if (nexacro._isString(key)) {
							obj = dataMap.getByKey(key);
							if (obj["key"]) {
								var categorydata = obj[categorycolumn];
								if (typeof categorydata == "object" && categorydata instanceof nexacro.Date) {
									if (chart.categoryaxis && chart.categoryaxis.axistype == "datetime") {
										categorydata = categorydata.date.getTime();
										if (!chart._isTimeData) {
											chart._isTimeData = true;
											chart.categoryaxis.on_apply_axistype();
										}
									}
								}
								if (rotateaxis && !chart._isCompositeSeries) {
									data.push([obj[valuecolumn], categorydata]);
								}
								else {
									data.push([categorydata, obj[valuecolumn]]);
								}
							}

							if (selecttype) {
								pThis._selectItem(selectedindex, selecttype, selectcolumn, pThis._selectedItem, obj);
							}
							selectedindex++;
						}
					}, this);
				}
				if (valuecolumn && value2column) {
					dataMap.forEach(function (key) {
						if (nexacro._isString(key)) {
							obj = dataMap.getByKey(key);
							if (obj) {
								var xdata = obj[valuecolumn];
								var ydata = obj[value2column];
								var valuedata;
								if (value3column) {
									valuedata = obj[value3column];
								}

								if (valuedata) {
									data.push([xdata, ydata, valuedata]);
								}
								else {
									data.push([xdata, ydata]);
								}

								if (selecttype) {
									pThis._selectItem(selectedindex, selecttype, selectcolumn, pThis._selectedItem, obj);
								}
							}
							selectedindex++;
						}
					}, this);
				}
			}

			this._data = data;
			this._chart._dataMap = dataMap;
		}
	};

	_pSeriesBase._setDefault = function (color, highlightcolor, selectcolor) {
		if (color) {
			this._chart._drawing = true;
			this._setColor(color);
			this._chart._drawing = false;
		}

		if (highlightcolor) {
			this._highlightcolor = highlightcolor;
		}

		if (selectcolor) {
			this._selectcolor = selectcolor;
		}
	};

	_pSeriesBase._selectItem = function (index, selectType, selectColumn, selectedItem, obj) {
		var re = true;
		if (nexacro._GraphicsLib.isEmpty(index)) {
			return false;
		}

		if (selectType == "unselect") {
			selectedItem[index] = false;
		}
		else if (selectType == "select") {
			selectedItem[index] = true;
		}
		else {
			if (nexacro._GraphicsLib.isEmpty(selectColumn) || nexacro._GraphicsLib.isEmpty(obj)) {
				re = false;
			}

			if (!nexacro._GraphicsLib.isBoolean(selectColumn)) {
				selectedItem[index] = nexacro._toBoolean(obj[selectColumn]);
			}
			else {
				this._selectedItem[index] = selectColumn;
			}
		}

		return re;
	};

	_pSeriesBase._changeContentsProperty = function (nm, newVal, oldVal) {
		var contents = this._chart.contents, idx = this._configIndex;

		if (contents && contents.seriesset[idx]) {
			contents.seriesset[idx][nm] = newVal;
		}
	};

	_pSeriesBase._getBindableValue = function (prop) {
		var val;
		if (prop) {
			val = this[prop];
			if (val) {
				var type = typeof val;
				if (!(type == "number" || type == "string")) {
					if (val._bindtype == 1) {
						return val._bindexpr;
					}
					else {
						return val._value;
					}
				}
			}
		}

		return val;
	};
	_pSeriesBase._draw = function (redraw) {
		if (this._chart_aniframe_obj) {
			var effect = this._chart_aniframe_obj;
			if (effect && effect.enableanimation == true) {
				if (!effect.requestaniframe) {
					var pThis = this;
					effect.requestaniframe = new nexacro.AnimationFrame(this._chart, function () {
						pThis._draw_animation_series_callback();
					});
				}
			}
		}
	};

	_pSeriesBase._draw_animation_series_callback = function () {
		var chart = this._chart;

		var effect = this._chart_aniframe_obj;
		var seriesset = chart.seriesset;
		var serieslength = seriesset ? seriesset.length : 0;
		var graphicsdraw = 0;

		if (effect) {
			effect.isloadanimation = true;
		}
		var curtimestamp = +new Date();
		var time = curtimestamp - effect.starttime;
		var frame_interval = 1000 / effect.animationeffects.framelate;
		var seg = Math.floor((time) / frame_interval);
		var bdraw = false;

		if (time >= effect.duration) {
			effect._drawinfo.percent = 100;

			this._drawnow();

			this._end_animation_series_callback();
			bdraw = true;
		}
		else {
			if (seg > effect._timeseginfo.frame_seg) {
				effect._timeseginfo.frame_seg = seg;
				effect._drawinfo.percent = seg / (effect.duration / frame_interval) * 100;

				bdraw = true;
			}
			if (effect.isloadanimation) {
				this._start_animate();
			}
		}
		if (bdraw) {
			effect.drawflag = true;
		}


		var i = 0;
		var series;
		for (i = 0; i < serieslength; i++) {
			series = seriesset[i];
			effect = series._chart_aniframe_obj;
			if (effect.drawflag == true) {
				graphicsdraw++;
			}
		}
		if (graphicsdraw == serieslength) {
			for (i = 0; i < serieslength; i++) {
				series = seriesset[i];
				effect = series._chart_aniframe_obj;
				effect.drawflag = false;

				if (effect.isloadanimation) {
					series._drawnow();
				}
			}
			chart._graphicsControl.draw();
		}
	};
	_pSeriesBase._end_animation_series_callback = function () {
		var effect = this._chart_aniframe_obj;

		var chart = this._chart;
		var seriesset = chart.seriesset;
		var serieslength = seriesset ? seriesset.length : 0;
		var endanimation = 0;
		var befo = chart._isanimationloading;
		if (effect) {
			this._pause_animate();
		}
		this._drawnow();

		for (var i = 0; i < serieslength; i++) {
			var series = seriesset[i];
			effect = series._chart_aniframe_obj;
			if (!effect.isloadanimation) {
				endanimation++;
			}
		}
		if (endanimation == serieslength) {
			chart._isanimationloading = false;
			if (befo != chart._isanimationloading) {
				chart._graphicsControl.draw();
				var curtimestamp = +new Date();
				var time = curtimestamp - effect.starttime;
			}
		}
	};
	_pSeriesBase._getanimationdrawscale = function (obj, is_w, is_h, pos) {
		var type_name = this._chart._type_name;

		var effect = this._chart_aniframe_obj;
		var chart = this._chart;
		var scalew = 1;
		var scaleh = 1;
		if (effect && effect._drawinfo.percent != null) {
			if (obj) {
				var scale = effect._drawinfo.percent / 100;
				obj._matrix.reset();
				if (is_w) {
					scalew = scale;
				}
				if (is_h) {
					scaleh = scale;
				}
				if (pos) {
					var rect = obj._getRect();
					var pt, x = rect.x, y = rect.y, width = rect.width, height = rect.height;

					switch (pos) {
						case "top":
						case "left":
							{

								pt = new nexacro.Point(x, y);
							}
							break;
						case "bottom":
							{

								pt = new nexacro.Point(x, y + height);
							}
							break;
						case "right":
							{

								pt = new nexacro.Point(x + width, y);
							}
							break;
					}
					obj.scale(scalew, scaleh, pt);
				}
				else {
					obj.scale(scalew, scaleh);
				}
			}
		}
	};
	_pSeriesBase._getanimationdrawclip = function (cx, cy, obj, pointshape) {
		var type_name = this._chart._type_name;

		var effect = this._chart_aniframe_obj;
		var chart = this._chart;
		if (effect && effect._drawinfo.percent != null) {
			var boardRect = chart._boardRect;

			var left = boardRect.left;
			var top = boardRect.top;
			var width = boardRect.width;
			var height = boardRect.height;
			var borderWidth = this._chart._boardBorderWidth, borderHeight = this._chart._boardBorderHeight;


			width = width - borderWidth;
			height = height - borderHeight;
			if (obj) {
				var percentwidth = (width / 100) * effect._drawinfo.percent;
				obj._clipitems = [];
				if (pointshape == "diamond" || pointshape == "triangle" || pointshape == "cross") {
					obj.setClipPath(new nexacro.Rect(0, 0, percentwidth, height));
				}
				else {
					obj.setClipPath(new nexacro.Rect(-cx, -cy, percentwidth, height));
				}
			}
		}
	};
	_pSeriesBase._getanimationdrawvalue = function (value) {
		var type_name = this._chart._type_name;
		var retval = value;
		var effect = this._chart_aniframe_obj;
		var rotateaxis = this._chart.rotateaxis;
		var gap = 0, min = 0, calcval = 0, ps = 0, i = 0;
		if (!nexacro._GraphicsLib.isArray(value)) {
			switch (type_name) {
				case "BasicChart":
					{

						if (effect && effect._drawinfo.percent != null) {
							min = 0;
							if (!rotateaxis) {
								min = this._yaxis._min;
							}
							else {
								min = this._xaxis._min;
							}
							if (min < 0) {
								min = 0;
							}
							if (value != null) {
								calcval = value - min;
								retval = ((calcval / 100) * effect._drawinfo.percent) + min;
							}
						}
					}
					break;
				case "BubbleChart":
					{

						if (effect && effect._drawinfo.percent != null) {
							if (value != null) {
								retval = ((value / 100) * effect._drawinfo.percent);
							}
						}
					}
					break;
				case "PieChart":
					{

						if (effect && effect._drawinfo.percent != null) {
							var rEndAngle = this._endangle || 6.28319;
							var rStartAngle = this._startangle || 0;
							var prStartAngle;
							var halfangle = rEndAngle / 2;
							if (halfangle + rStartAngle > 6.28319) {
								prStartAngle = (halfangle + rStartAngle) - 6.28319;
							}
							else {
								prStartAngle = (halfangle + rStartAngle);
							}


							if (prStartAngle > rStartAngle) {
								gap = prStartAngle - rStartAngle;
								prStartAngle = prStartAngle - (gap / 100) * effect._drawinfo.percent;
							}
							else {
								gap = rStartAngle - prStartAngle;
								prStartAngle = prStartAngle + (gap / 100) * effect._drawinfo.percent;
							}
							var retArr = [];
							retArr[0] = prStartAngle;
							retArr[1] = (rEndAngle / 100) * effect._drawinfo.percent;
							return retArr;
						}
					}
					break;
				case "RadarChart":
					{
					}
					break;
				case "GaugeChart":
					{

						if (effect && effect._drawinfo.percent != null) {
							min = this.axis._min;

							if (min < 0) {
								min = 0;
							}
							if (value != null) {
								calcval = value - min;
								retval = ((calcval / 100) * effect._drawinfo.percent) + min;
							}
						}
					}
					break;
				default:
					break;
			}
		}
		else {
			switch (type_name) {
				case "BasicChart":
					{

						if (effect && effect._drawinfo.percent != null) {
							ps = this._datapoints.pointsize;
							min = 0;
							for (i = 0; i < retval.length; i += ps) {
								if (!rotateaxis) {
									min = this._yaxis._min;

									if (retval[i + 1] != null) {
										calcval = retval[i + 1] - min;
										if (calcval < 0) {
											calcval = 0;
										}
										retval[i + 1] = min + ((calcval / 100) * effect._drawinfo.percent);
									}
									if (retval[i + 2] != null && ps >= 3) {
										calcval = retval[i + 2] - min;
										if (calcval < 0) {
											calcval = 0;
										}
										retval[i + 2] = min + ((calcval / 100) * effect._drawinfo.percent);
									}
								}
								else {
									min = this._xaxis._min;
									if (retval[i] != null) {
										calcval = retval[i] - min;
										if (calcval < 0) {
											calcval = 0;
										}
										retval[i] = min + ((calcval / 100) * effect._drawinfo.percent);
									}
									if (retval[i + 2] != null && ps >= 3) {
										calcval = retval[i + 2] - min;
										if (calcval < 0) {
											calcval = 0;
										}
										retval[i + 2] = min + ((calcval / 100) * effect._drawinfo.percent);
									}
								}
							}
						}
					}
					break;
				case "BubbleChart":
					{
					}
					break;
				case "PieChart":
					{
					}
					break;
				case "RadarChart":
					{

						if (effect && effect._drawinfo.percent != null) {
							min = this._chart.valueaxes[0]._min;

							ps = this._datapoints.pointsize;
							for (i = 0; i < retval.length; i += ps) {
								calcval = retval[i + 1] - min;
								if (calcval < 0) {
									calcval = 0;
								}
								var ret = ((calcval / 100) * effect._drawinfo.percent);
								ret = ret + min;
								if (retval[i + 1] != null) {
									retval[i + 1] = ret;
								}
							}
						}
					}
					break;
				default:
					break;
			}
		}
		return retval;
	};
	_pSeriesBase._drawnow = function () {
	};
	_pSeriesBase._pause_animate = function () {
		var effect = this._chart_aniframe_obj;
		if (effect.requestaniframe) {
			effect.requestaniframe.stop();
		}
		effect.isloadanimation = false;
		effect.enableanimation = false;
		effect._timeseginfo.frame_seg = 0;
		effect._drawinfo.percent = null;
		effect._drawinfo.value = null;
		effect._drawinfo.angle = null;
		effect._drawinfo.isnegativecalc = false;
	};
	_pSeriesBase._start_animate = function () {
		var chart = this._chart;
		var effect = this._chart_aniframe_obj;
		if (effect.requestaniframe) {
			this._chart.on_apply_duration(this._chart.duration);
			effect.duration = this._chart._duration;

			effect.requestaniframe.start();
		}
		effect.isloadanimation = true;
	};

	delete _pSeriesBase;
}

if (!nexacro.ChartBoardControl) {
	nexacro.ChartBoardControl = function (id, parent, graphicsControl) {
		this.id = id;
		this.parent = parent;
		this._graphicsControl = graphicsControl;

		this._createGroup();
	};

	var _pChartBoardControl = nexacro.ChartBoardControl.prototype = nexacro._createPrototype(nexacro.Object, nexacro.ChartBoardControl);
	_pChartBoardControl._type_name = "ChartBoardControl";


	_pChartBoardControl._group = null;
	_pChartBoardControl._gridRect = null;
	_pChartBoardControl._gridLeftLine = null;
	_pChartBoardControl._gridRightLine = null;
	_pChartBoardControl._gridTopLine = null;
	_pChartBoardControl._gridBottomLine = null;


	_pChartBoardControl.background = "";
	_pChartBoardControl.border = "";
	_pChartBoardControl.opacity = 1;
	_pChartBoardControl.visible = true;

	_pChartBoardControl.text = "";
	_pChartBoardControl.textcolor = "";
	_pChartBoardControl.textfont = "";
	_pChartBoardControl.textwidth = undefined;


	_pChartBoardControl._background = null;
	_pChartBoardControl._border = null;
	_pChartBoardControl._opacity = null;

	_pChartBoardControl._textfont = null;
	_pChartBoardControl._textcolor = null;
	_pChartBoardControl._gridCenterText = null;

	_pChartBoardControl.destroy = function () {
		this._group.destroy();

		this._group = null;
		this._gridRect = null;
		this._gridLeftLine = null;
		this._gridRightLine = null;
		this._gridTopLine = null;
		this._gridBottomLine = null;
		this._graphicsControl = null;

		this._background = null;
		this._border = null;
		this._opacity = null;

		if (this.parent) {
			if (this.parent.board) {
				this.parent._deleteContentsProp("board");
				this.parent.board = null;
			}
			this.parent._changedData = true;
			this.parent = null;
		}

		nexacro.Object.prototype.destroy.call(this);

		return true;
	};

	_pChartBoardControl.set_visible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.visible != val) {
			this._changeContentsProperty("visible", val, this.visible);

			this.visible = val;
			this.on_apply_visible(val);
		}

		this.parent._draw();
	};

	_pChartBoardControl.on_apply_visible = function (visible) {
		if (visible) {
			this.on_apply_border(this._border);
			this.on_apply_background(this._background);
			this.on_apply_text(this.text);
		}
		else {
			this.on_apply_border(null);
			this.on_apply_background(null);
			this.on_apply_text("");
		}
	};

	_pChartBoardControl.set_border = function (val) {
		this.border = val;
		if (val) {
			if (this._border == null || !this._border._single || this._border.value != val) {
				var oldValue;
				if (this._border) {
					oldValue = this._border.value;
				}
				this._changeContentsProperty("border", val, oldValue);

				var border = nexacro.BorderObject(val);
				this._border = border;
				this.on_apply_border(border);
			}
		}
		else {
			if (this._border) {
				this._border = null;
				this.on_apply_border(null);
			}
		}

		this.parent._draw();
	};

	_pChartBoardControl.on_apply_border = function (border) {
		if (!this.visible) {
			border = null;
		}

		this._gridLeftLine.set_strokepen(border ? border.left.value : "");
		this._gridRightLine.set_strokepen(border ? border.right.value : "");
		this._gridTopLine.set_strokepen(border ? border.top.value : "");
		this._gridBottomLine.set_strokepen(border ? border.bottom.value : "");

		this.parent._rearrange = true;
	};

	_pChartBoardControl.set_background = function (val) {
		this.background = val;
		if (val) {
			if (this._background == null || this._background.value != val) {
				var oldValue;
				if (this._background) {
					oldValue = this._background.value;
				}
				this._changeContentsProperty("background", val, oldValue);

				var backgroud = nexacro.BackgroundObject(val, this);
				this._background = backgroud;
				this.on_apply_background(backgroud);
			}
		}
		else {
			if (this._background) {
				this._background = null;
				this.on_apply_background(null);
			}
		}

		this.parent._draw();
	};

	_pChartBoardControl.on_apply_background = function (background) {
		if (!this.visible) {
			background = null;
		}

		this._gridRect.set_fillstyle(background ? background.value : "");
	};

	_pChartBoardControl.set_opacity = function (val) {
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

		this.parent._draw();
	};

	_pChartBoardControl.on_apply_opacity = function (opacity) {
		this._gridRect.set_opacity(opacity ? opacity._sysvalue : "");
	};

	_pChartBoardControl.set_text = function (val) {
		var text = nexacro._toString(val);
		if (text) {
			if (this.text == null || this.text != text) {
				this._changeContentsProperty("text", val, this.text);
				this.text = text;
				this.on_apply_text(text);
			}
		}
		else {
			if (this.text) {
				this.text = "";
				this.on_apply_text("");
			}
		}

		this.parent._draw();
	};

	_pChartBoardControl.on_apply_text = function (text) {
		var group = this._group;
		if (group) {
			if (!this._gridCenterText) {
				this._createCenterText();
			}

			this._gridCenterText.set_text(text);

			this.on_apply_textfont(this._textfont);
			this.on_apply_textcolor(this._textcolor);
		}

		this.parent._rearrange = true;
	};

	_pChartBoardControl.set_textfont = function (val) {
		this.textfont = val;
		if (val) {
			if (this._textfont == null || this._textfont.value != val) {
				var oldValue;
				if (this._textfont) {
					oldValue = this._textfont.value;
				}
				this._changeContentsProperty("textfont", val, oldValue);

				var textfont = nexacro.FontObject(val);
				this._textfont = textfont;
				this.on_apply_textfont(textfont);
			}
		}
		else {
			if (this._textfont) {
				this._textfont = null;
				this.on_apply_textfont(null);
			}
		}

		this.parent._draw();
	};

	_pChartBoardControl.on_apply_textfont = function (textfont) {
		if (this._is_initprop) {
			return;
		}

		var gridCenterText = this._gridCenterText;
		if (gridCenterText) {
			gridCenterText.set_font(textfont ? textfont.value || textfont : "12pt Verdana");
			this.parent._rearrange = true;
		}
	};

	_pChartBoardControl.set_textcolor = function (val) {
		this.textcolor = val;

		if (val) {
			if (this._textcolor == null || this._textcolor.value != val) {
				var oldValue;
				if (this._textcolor) {
					oldValue = this._textcolor.value;
				}
				this._changeContentsProperty("textcolor", val, oldValue);

				var textcolor = nexacro.ColorObject(val);
				this._textcolor = textcolor;
				this.on_apply_textcolor(textcolor);
			}
		}
		else {
			if (this._textcolor) {
				this._textcolor = null;
				this.on_apply_textcolor(null);
			}
		}

		this.parent._draw();
	};

	_pChartBoardControl.on_apply_textcolor = function (textcolor) {
		if (this._is_initprop) {
			return;
		}

		var gridCenterText = this._gridCenterText;
		if (gridCenterText) {
			gridCenterText.set_color(textcolor ? textcolor.value || textcolor : "#000000");
		}
	};

	_pChartBoardControl.set_textwidth = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val)) {
				return;
			}
		}

		if (this.textwidth !== val) {
			this._changeContentsProperty("textwidth", val, this.textwidth);
			this.textwidth = val;
			this.on_apply_textwidth(val);
		}

		this.parent._draw();
	};

	_pChartBoardControl.on_apply_textwidth = function (textwidth) {
		var group = this._group;
		if (group) {
			var gridCenterText = this._gridCenterText;
			if (gridCenterText) {
				if (textwidth > 0) {
					gridCenterText.set_wordWrap(true);
					gridCenterText.set_width(textwidth);
				}
				else {
					gridCenterText.set_wordWrap(false);
				}

				this.parent._rearrange = true;
			}
		}
	};

	_pChartBoardControl._createGroup = function () {
		this._group = new nexacro.GraphicsGroup();
		this._group.set_id("ChartBoardGroup");
		this._graphicsControl.addChild(this._group);

		this._createGridRect();
		this._createGridLine();
	};

	_pChartBoardControl._createGridRect = function () {
		this._gridRect = new nexacro.GraphicsRect(0, 0, 0, 0);
		this._gridRect.set_id("ChartBoardRect");
		this._group.addChild(this._gridRect);
		this._gridRect._board = this;
	};

	_pChartBoardControl._createGridLine = function () {
		this._gridLeftLine = new nexacro.GraphicsLine();
		this._gridLeftLine.set_id("ChartBoardLeftLine");
		this._group.addChild(this._gridLeftLine);
		this._gridLeftLine._board = this;
		this._gridRightLine = new nexacro.GraphicsLine();
		this._gridRightLine.set_id("ChartBoardRightLine");
		this._group.addChild(this._gridRightLine);
		this._gridRightLine._board = this;
		this._gridTopLine = new nexacro.GraphicsLine();
		this._gridTopLine.set_id("ChartBoardTopLine");
		this._group.addChild(this._gridTopLine);
		this._gridTopLine._board = this;
		this._gridBottomLine = new nexacro.GraphicsLine();
		this._gridBottomLine.set_id("ChartBoardBottomLine");
		this._group.addChild(this._gridBottomLine);
		this._gridBottomLine._board = this;
	};

	_pChartBoardControl._createCenterText = function () {
		if (!this._gridCenterText) {
			if (this._group) {
				this._gridCenterText = new nexacro.GraphicsText(0, 0);
				this._gridCenterText.set_id("ChartBoardCenterText");
				this._group.addChild(this._gridCenterText);
				this._gridCenterText._board = this;
			}
		}
	};

	_pChartBoardControl._arrange = function (left, top, width, height) {
		var border = this._border;
		if (border) {
			var topWidth = border.top._width || 0, rightWidth = border.right._width || 0, bottomWidth = border.bottom._width || 0, leftWidth = border.left._width || 0;

			var gridLeftLine = this._gridLeftLine;
			if (gridLeftLine) {
				gridLeftLine.set_x1(0 - leftWidth / 2);
				gridLeftLine.set_y1(0 - topWidth);
				gridLeftLine.set_x2(0 - leftWidth / 2);
				gridLeftLine.set_y2(height + bottomWidth);
			}

			var gridRightLine = this._gridRightLine;
			if (gridRightLine) {
				gridRightLine.set_x1(width + rightWidth / 2);
				gridRightLine.set_y1(0 - topWidth);
				gridRightLine.set_x2(width + rightWidth / 2);
				gridRightLine.set_y2(height + bottomWidth);
			}

			var gridTopLine = this._gridTopLine;
			if (gridTopLine) {
				gridTopLine.set_x1(0 - leftWidth);
				gridTopLine.set_y1(0 - topWidth / 2);
				gridTopLine.set_x2(width + rightWidth);
				gridTopLine.set_y2(0 - topWidth / 2);
			}

			var gridBottomLine = this._gridBottomLine;
			if (gridBottomLine) {
				gridBottomLine.set_x1(0 - leftWidth);
				gridBottomLine.set_y1(height + bottomWidth / 2);
				gridBottomLine.set_x2(width + rightWidth);
				gridBottomLine.set_y2(height + bottomWidth / 2);
			}
		}

		var gridCenterText = this._gridCenterText;
		if (gridCenterText) {
			var boardRect = this.parent._boardRect;
			var boardWidth = 0;
			var boardHeight = 0;
			var borderWidth = 0;
			var borderHeight = 0;
			var centerX = 0;
			var centerY = 0;
			var txtSize;
			var txtWidth = 0;
			var txtHeight = 0;
			var text = gridCenterText.text;
			var textwidth = this.textwidth;

			if (text) {
				if (boardRect) {
					borderWidth = this.parent._boardBorderWidth;
					borderHeight = this.parent._boardBorderHeight;

					boardWidth = boardRect.width - borderWidth;
					boardHeight = boardRect.height - borderHeight;

					centerX = boardWidth / 2;
					centerY = boardHeight / 2;
				}


				txtSize = gridCenterText._getRect();
				if (txtSize) {
					txtWidth = txtSize.width;
					txtHeight = txtSize.height;

					gridCenterText._clipitems = [];
				}


				if (gridCenterText._clipitems.length > 0) {
					gridCenterText._clipitems = "";
				}
				if (textwidth) {
					if (txtWidth > boardWidth) {
						gridCenterText.set_x(0);
						gridCenterText.set_textAlign("left");

						if (txtHeight > boardHeight) {
							gridCenterText.set_y(0);
							gridCenterText.set_verticalAlign("top");

							gridCenterText.setClipPath(new nexacro.Rect(0, 0, boardWidth, boardHeight));
						}
						else {
							gridCenterText.set_y(centerY);
							gridCenterText.set_verticalAlign("middle");

							gridCenterText.setClipPath(new nexacro.Rect(0, -centerY, boardWidth, boardHeight));
						}
					}
					else {
						gridCenterText.set_x(centerX);
						gridCenterText.set_textAlign("center");

						if (txtHeight > boardHeight) {
							gridCenterText.set_y(0);
							gridCenterText.set_verticalAlign("top");

							gridCenterText.setClipPath(new nexacro.Rect(-centerX, 0, boardWidth, boardHeight));
						}
						else {
							gridCenterText.set_y(centerY);
							gridCenterText.set_verticalAlign("middle");
						}
					}
				}

				else {
					if (txtWidth > boardWidth) {
						gridCenterText.set_x(0);
						gridCenterText.set_textAlign("left");

						gridCenterText.set_y(centerY);
						gridCenterText.set_verticalAlign("middle");

						gridCenterText.setClipPath(new nexacro.Rect(0, -centerY, boardWidth, boardHeight));
					}
					else {
						gridCenterText.set_x(centerX);
						gridCenterText.set_textAlign("center");

						if (txtHeight > boardHeight) {
							gridCenterText.set_y(0);
							gridCenterText.set_verticalAlign("top");

							gridCenterText.setClipPath(new nexacro.Rect(-centerX, 0, boardWidth, boardHeight));
						}
						else {
							gridCenterText.set_y(centerY);
							gridCenterText.set_verticalAlign("middle");
						}
					}
				}
			}
		}

		var gridRect = this._gridRect;
		if (gridRect) {
			gridRect.set_width(width);
			gridRect.set_height(height);
		}

		this._group.setTransform("translate(" + left + "," + top + ")");
	};

	_pChartBoardControl._getRect = function () {
		if (this._group) {
			return this._group._getRect(false, true);
		}
		return;
	};

	_pChartBoardControl._changeContentsProperty = function (nm, newVal, oldVal) {
		var contents = this.parent.contents;
		if (contents && contents.board) {
			contents.board[nm] = newVal;
		}
	};

	_pChartBoardControl._afterSetProperties = function () {
		this.on_apply_textfont(this._textfont);
		this.on_apply_textcolor(this._textcolor);
	};

	delete _pChartBoardControl;
}

if (!nexacro.ChartTitleControl) {
	nexacro.ChartTitleControl = function (id, parent, graphicsControl) {
		this.id = id || "";
		this.parent = parent || null;
		this._graphicsControl = graphicsControl || this.parent._graphicsControl;

		this._createGroup();
	};

	var _pChartTitleControl = nexacro.ChartTitleControl.prototype = nexacro._createPrototype(nexacro.Object, nexacro.ChartTitleControl);
	_pChartTitleControl._type_name = "ChartTitleControl";


	_pChartTitleControl._titleGroup = null;
	_pChartTitleControl._titleRect = null;
	_pChartTitleControl._titleText = null;
	_pChartTitleControl._subTitleText = null;


	_pChartTitleControl.align = "center middle";
	_pChartTitleControl.background = "";
	_pChartTitleControl.gap = undefined;
	_pChartTitleControl.linestyle = "";
	_pChartTitleControl.opacity = 1;
	_pChartTitleControl.padding = "";
	_pChartTitleControl.subtext = "";
	_pChartTitleControl.subtextalign = "center";
	_pChartTitleControl.subtextcolor = "";
	_pChartTitleControl.subtextfont = "";
	_pChartTitleControl.subtextwidth = undefined;
	_pChartTitleControl.text = "";
	_pChartTitleControl.textalign = "center";
	_pChartTitleControl.textcolor = "";
	_pChartTitleControl.textfont = "";
	_pChartTitleControl.textwidth = undefined;
	_pChartTitleControl.visible = true;


	_pChartTitleControl._titleLeft = 0;
	_pChartTitleControl._titleTop = 0;
	_pChartTitleControl._titleWidth = 0;
	_pChartTitleControl._titleHeight = 0;

	_pChartTitleControl._textLeft = 0;
	_pChartTitleControl._textTop = 0;
	_pChartTitleControl._titleTextWidth = 0;
	_pChartTitleControl._titleTextHeight = 0;

	_pChartTitleControl._subTextLeft = 0;
	_pChartTitleControl._subTextTop = 0;
	_pChartTitleControl._subTextWidth = 0;
	_pChartTitleControl._subTextHeight = 0;

	_pChartTitleControl._borderWidth = 0;
	_pChartTitleControl._borderHalfWidth = 0;
	_pChartTitleControl._maxTitleTextWidth = 0;

	_pChartTitleControl._align = null;
	_pChartTitleControl._halign = null;
	_pChartTitleControl._valign = null;
	_pChartTitleControl._position = null;
	_pChartTitleControl._titlerotate = -90;
	_pChartTitleControl._background = null;
	_pChartTitleControl._gap = 0;
	_pChartTitleControl._linestyle = null;
	_pChartTitleControl._opacity = null;
	_pChartTitleControl._padding = null;
	_pChartTitleControl._subtextcolor = null;
	_pChartTitleControl._subtextfont = null;
	_pChartTitleControl._textcolor = null;
	_pChartTitleControl._textfont = null;

	_pChartTitleControl.destroy = function () {
		this._titleGroup.destroy();

		this._titleGroup = null;
		this._titleRect = null;
		this._titleText = null;
		this._subTitleText = null;
		this._graphicsControl = null;

		this._align = null;
		this._halign = null;
		this._valign = null;
		this._position = null;
		this._titlerotate = -90;
		this._background = null;
		this._linestyle = null;
		this._opacity = null;
		this._padding = null;
		this._subtextcolor = null;
		this._subtextfont = null;
		this._textcolor = null;
		this._textfont = null;

		if (this.parent) {
			if (this.parent.title) {
				this.parent._deleteContentsProp("title");
				this.parent.title = null;
			}
			this.parent._rearrange = true;
			this.parent._recreate = true;
			this.parent._changedData = true;

			this.parent = null;
		}

		nexacro.Object.prototype.destroy.call(this);

		return true;
	};

	_pChartTitleControl.set_visible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.visible != val) {
			this._changeContentsProperty("visible", val, this.visible);

			this.visible = val;
			this.on_apply_visible(val);
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_visible = function (visible) {
		var titleGroup = this._titleGroup;
		if (titleGroup) {
			titleGroup.set_visible(visible);
		}

		this.parent._recreate = true;
		this.parent._rearrange = true;
	};

	_pChartTitleControl.set_text = function (val) {
		var text = nexacro._toString(val);
		if (text) {
			if (this.text == null || this.text != text) {
				this._changeContentsProperty("text", val, this.text);
				this.text = text;
				this.on_apply_text(text);
			}
		}
		else {
			if (this.text) {
				this.text = "";
				this.on_apply_text("");
			}
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_text = function (text) {
		var titleText = this._titleText;
		if (titleText) {
			titleText.set_text(text);
		}

		this.parent._recreate = true;
		this.parent._rearrange = true;
	};

	_pChartTitleControl.set_subtext = function (val) {
		var subtext = nexacro._toString(val);
		if (subtext) {
			if (this.subtext == null || this.subtext != subtext) {
				this._changeContentsProperty("subtext", val, this.subtext);
				this.subtext = subtext;
				this.on_apply_subtext(subtext);
			}
		}
		else {
			if (this.subtext) {
				this.subtext = "";
				this.on_apply_subtext("");
			}
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_subtext = function (subtext) {
		var subTitleText = this._subTitleText;
		if (subTitleText) {
			subTitleText.set_text(subtext);
		}

		this.parent._recreate = true;
		this.parent._rearrange = true;
	};

	_pChartTitleControl.set_background = function (val) {
		this.background = val;
		if (val) {
			if (this._background == null || this._background.value != val) {
				var oldValue;
				if (this._background) {
					oldValue = this._background.value;
				}
				this._changeContentsProperty("background", val, oldValue);

				var background = nexacro.BackgroundObject(val, this);
				this._background = background;
				this.on_apply_background(background);
			}
		}
		else {
			if (this._background) {
				this._background = null;
				this.on_apply_background(null);
			}
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_background = function (background) {
		var titleRect = this._titleRect;
		if (titleRect) {
			titleRect.set_fillstyle(background);
		}
	};

	_pChartTitleControl.set_opacity = function (val) {
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

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_opacity = function (opacity) {
		opacity = opacity ? opacity._sysvalue : "";
		var titleRect = this._titleRect;
		if (titleRect) {
			titleRect.set_opacity(opacity);
		}
	};

	_pChartTitleControl.set_textfont = function (val) {
		this.textfont = val;
		if (val) {
			if (this._textfont == null || this._textfont.value != val) {
				var oldValue;
				if (this._textfont) {
					oldValue = this._textfont.value;
				}
				this._changeContentsProperty("textfont", val, oldValue);

				var textfont = nexacro.FontObject(val);
				this._textfont = textfont;
				this.on_apply_textfont(textfont);
			}
		}
		else {
			if (this._textfont) {
				this._textfont = null;
				this.on_apply_textfont(null);
			}
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_textfont = function (textfont) {
		if (this._is_initprop) {
			return;
		}

		var titleText = this._titleText;
		if (titleText) {
			titleText.set_font(textfont ? textfont.value || textfont : "20pt Verdana");
		}

		this.parent._recreate = true;
		this.parent._rearrange = true;
	};

	_pChartTitleControl.set_textcolor = function (val) {
		this.textcolor = val;

		if (val) {
			if (this._textcolor == null || this._textcolor.value != val) {
				var oldValue;
				if (this._textcolor) {
					oldValue = this._textcolor.value;
				}
				this._changeContentsProperty("textcolor", val, oldValue);

				var textcolor = nexacro.ColorObject(val);
				this._textcolor = textcolor;
				this.on_apply_textcolor(textcolor);
			}
		}
		else {
			if (this._textcolor) {
				this._textcolor = null;
				this.on_apply_textcolor(null);
			}
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_textcolor = function (textcolor) {
		if (this._is_initprop) {
			return;
		}

		var titleText = this._titleText;
		if (titleText) {
			titleText.set_color(textcolor ? textcolor.value || textcolor : "#000000");
		}
	};

	_pChartTitleControl.set_align = function (val) {
		var align_enum = ["topleft", "topcenter", "topright", "lefttop", "leftcenter", "leftbottom", "righttop", "rightcenter", "rightbottom", "bottomleft", "bottomcenter", "bottomright"];

		if (align_enum.indexOf(val) == -1) {
			return;
		}

		if (this.align != val) {
			this.align = val;

			this.on_apply_align(val);
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_align = function (align) {
		if (this._is_initprop) {
			return;
		}



		if (align) {
			if (align.indexOf("top") == 0) {
				this._position = "top";

				if (align == "topleft") {
					this._halign = "left";
					this._valign = "top";
				}
				else if (align == "topcenter") {
					this._halign = "center";
					this._valign = "top";
				}
				else if (align == "topright") {
					this._halign = "right";
					this._valign = "top";
				}
			}
			else if (align.indexOf("left") == 0) {
				this._position = "left";

				if (align == "lefttop") {
					this._halign = "left";
					this._valign = "top";
				}
				else if (align == "leftcenter") {
					this._halign = "left";
					this._valign = "center";
				}
				else if (align == "leftbottom") {
					this._halign = "left";
					this._valign = "bottom";
				}
			}
			else if (align.indexOf("right") == 0) {
				this._position = "right";

				if (align == "righttop") {
					this._halign = "right";
					this._valign = "top";
				}
				else if (align == "rightcenter") {
					this._halign = "right";
					this._valign = "center";
				}
				else if (align == "rightbottom") {
					this._halign = "right";
					this._valign = "bottom";
				}
			}
			else if (align.indexOf("bottom") == 0) {
				this._position = "bottom";

				if (align == "bottomleft") {
					this._halign = "left";
					this._valign = "bottom";
				}
				else if (align == "bottomcenter") {
					this._halign = "center";
					this._valign = "bottom";
				}
				else if (align == "bottomright") {
					this._halign = "right";
					this._valign = "bottom";
				}
			}
		}
		this.parent._rearrange = true;
		this.parent._changedData = true;
	};

	_pChartTitleControl.set_textwidth = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val)) {
				return;
			}
		}

		if (this.textwidth != val) {
			this._changeContentsProperty("textwidth", val, this.textwidth);
			this.textwidth = val;
			this.on_apply_textwidth(val);
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_textwidth = function (textwidth) {
		var titleText = this._titleText;
		if (titleText) {
			if (textwidth > 0) {
				titleText.set_width(textwidth);
				titleText.set_wordWrap(true);
			}
			else {
				titleText.set_wordWrap(false);
			}
		}

		this.parent._recreate = true;
		this.parent._rearrange = true;
	};

	_pChartTitleControl.set_linestyle = function (val) {
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

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_linestyle = function (linestyle) {
		var titleRect = this._titleRect;
		if (titleRect) {
			titleRect.set_strokepen(linestyle ? linestyle.value || linestyle : "0px solid #717a8380");
		}

		this.parent._recreate = true;
		this.parent._rearrange = true;
	};

	_pChartTitleControl.set_textalign = function (val) {
		var textalign_enum = ["left", "center", "right"];
		if (textalign_enum.indexOf(val) == -1) {
			return;
		}

		if (this.textalign != val) {
			this._changeContentsProperty("textalign", val, this.textalign);
			this.textalign = val;
			this.on_apply_textalign();
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_textalign = function () {
		this.parent._rearrange = true;
	};

	_pChartTitleControl.set_padding = function (val) {
		this.padding = val;
		if (val) {
			if (this._padding == null || this._padding.value != val) {
				var oldValue;
				if (this._padding) {
					oldValue = this._padding.value;
				}
				this._changeContentsProperty("padding", val, oldValue);

				var padding = nexacro.PaddingObject(val);
				this._padding = padding;
			}
		}
		else {
			if (this._padding) {
				this._padding = null;
			}
		}

		this.parent._recreate = true;
		this.parent._rearrange = true;

		this.parent._draw();
	};

	_pChartTitleControl.set_subtextfont = function (val) {
		this.subtextfont = val;
		if (val) {
			if (this._subtextfont == null || this._subtextfont.value != val) {
				var oldValue;
				if (this._subtextfont) {
					oldValue = this._subtextfont.value;
				}
				this._changeContentsProperty("subtextfont", val, oldValue);

				var subtextfont = nexacro.FontObject(val);
				this._subtextfont = subtextfont;
				this.on_apply_subtextfont(subtextfont);
			}
		}
		else {
			if (this._subtextfont) {
				this._subtextfont = null;
				this.on_apply_subtextfont(null);
			}
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_subtextfont = function (textfont) {
		if (this._is_initprop) {
			return;
		}

		var subText = this._subTitleText;
		if (subText) {
			subText.set_font(textfont ? textfont.value || textfont : "12pt Verdana");
		}

		this.parent._recreate = true;
		this.parent._rearrange = true;
	};

	_pChartTitleControl.set_subtextcolor = function (val) {
		this.subtextcolor = val;

		if (val) {
			if (this._subtextcolor == null || this._subtextcolor.value != val) {
				var oldValue;
				if (this._subtextcolor) {
					oldValue = this._subtextcolor.value;
				}
				this._changeContentsProperty("subtextcolor", val, oldValue);

				var subtextcolor = nexacro.ColorObject(val);
				this._subtextcolor = subtextcolor;
				this.on_apply_subtextcolor(subtextcolor);
			}
		}
		else {
			if (this._subtextcolor) {
				this._subtextcolor = null;
				this.on_apply_subtextcolor(null);
			}
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_subtextcolor = function (textcolor) {
		if (this._is_initprop) {
			return;
		}

		var subText = this._subTitleText;
		if (subText) {
			subText.set_color(textcolor ? textcolor.value || textcolor : "#000000");
		}
	};

	_pChartTitleControl.set_subtextalign = function (val) {
		var subtextalign_enum = ["left", "center", "right"];
		if (subtextalign_enum.indexOf(val) == -1) {
			return;
		}

		if (this.subtextalign != val) {
			this._changeContentsProperty("subtextalign", val, this.subtextalign);
			this.subtextalign = val;
			this.on_apply_subtextalign();
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_subtextalign = function () {
		this.parent._rearrange = true;
	};

	_pChartTitleControl.set_gap = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}

		if (this.gap != val) {
			this._changeContentsProperty("gap", val, this.gap);
			this.gap = val;
			this.on_apply_gap(val);
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_gap = function (gap) {
		this._gap = (this.text && this.subtext) ? gap : 0;

		this.parent._recreate = true;
		this.parent._rearrange = true;
	};

	_pChartTitleControl.set_subtextwidth = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val)) {
				return;
			}
		}

		if (this.subtextwidth != val) {
			this._changeContentsProperty("subtextwidth", val, this.subtextwidth);
			this.subtextwidth = val;
			this.on_apply_subtextwidth(val);
		}

		this.parent._draw();
	};

	_pChartTitleControl.on_apply_subtextwidth = function (subtextwidth) {
		var subTitleText = this._subTitleText;
		if (subTitleText) {
			if (subtextwidth > 0) {
				subTitleText.set_width(subtextwidth);
				subTitleText.set_wordWrap(true);
			}
			else {
				subTitleText.set_wordWrap(false);
			}
		}

		this.parent._recreate = true;
		this.parent._rearrange = true;
	};

	_pChartTitleControl._createGroup = function () {
		this._titleGroup = new nexacro.GraphicsGroup();
		this._titleGroup.set_id("ChartTitleGroup");
		this._graphicsControl.addChild(this._titleGroup);

		this._titleRect = new nexacro.GraphicsRect(0, 0, 0, 0);
		this._titleRect.set_id("ChartTitleRect");
		this._titleGroup.addChild(this._titleRect);
		this._titleRect._title = this;
		this._createTitleText();
		this._createSubTitleText();
	};

	_pChartTitleControl._createTitleText = function () {
		this._titleText = new nexacro.GraphicsText(0, 0);
		this._titleText.set_id("ChartTitleText");
		this._titleGroup.addChild(this._titleText);
		this._titleText._title = this;
	};

	_pChartTitleControl._createSubTitleText = function () {
		this._subTitleText = new nexacro.GraphicsText(0, 0);
		this._subTitleText.set_id("ChartTitleSubText");
		this._titleGroup.addChild(this._subTitleText);
		this._subTitleText._title = this;
	};

	_pChartTitleControl._measure = function (width, height) {
		var txtRect, subtxtRect, titleRect = this._titleRect, paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0, padding = this._padding, textLeft = 0, textTop = 0, subTextLeft = 0, subTextTop = 0, rectLeft = 0, rectTop = 0, linestyle = this._linestyle, textalign = this.textalign, subtextalign = this.subtextalign, position = this._position || "top";

		if (padding) {
			paddingLeft = padding.left;
			paddingRight = padding.right;
			paddingTop = padding.top;
			paddingBottom = padding.bottom;
		}

		if (linestyle) {
			this._borderWidth = this._linestyle._width;
		}
		else {
			this._borderWidth = 1;
		}
		this._borderHalfWidth = this._borderWidth / 2;

		if (this._titleText) {
			txtRect = this._titleText._getRect();
			if (txtRect) {
				this._titleTextWidth = txtRect.width;
				this._titleTextHeight = txtRect.height;
			}
		}

		if (this._subTitleText) {
			subtxtRect = this._subTitleText._getRect();
			if (subtxtRect) {
				this._subTextWidth = subtxtRect.width;
				this._subTextHeight = subtxtRect.height;
			}
		}

		if (this._titleTextWidth > this._subTextWidth) {
			this._maxTitleTextWidth = this._titleTextWidth;
		}
		else {
			this._maxTitleTextWidth = this._subTextWidth;
		}

		if (this._maxTitleTextWidth > width) {
			this._titleWidth = width - (this._borderWidth * 2);
		}
		else {
			this._titleWidth = this._maxTitleTextWidth + this._borderWidth + paddingLeft + paddingRight;
		}

		this._titleWidth += this._borderWidth;

		this._titleHeight = this._titleTextHeight + this._subTextHeight + this._borderWidth + paddingBottom + paddingTop;

		if (this._titleText && this.text && this._subTitleText && this.subtext) {
			this._titleHeight += this._gap;
		}

		if (titleRect) {
			if (position == "left" || position == "right") {
				titleRect.set_width(this._titleHeight);
				titleRect.set_height(this._titleWidth);
			}
			else {
				titleRect.set_width(this._titleWidth);
				titleRect.set_height(this._titleHeight);
			}
		}
	};

	_pChartTitleControl._arrange = function (left, top) {
		var halign = this._halign || "center", valign = this._valign || "top", paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0, padding = this._padding, textLeft = 0, textTop = 0, subTextLeft = 0, subTextTop = 0, textalign = this.textalign, subtextalign = this.subtextalign, chartWidth = this.parent._getClientWidth(), chartHeight = this.parent._getClientHeight(), x = 0, y = 0, titleWidth = this._titleWidth, titleHeight = this._titleHeight, titleTextWidth = this._titleTextWidth, titleTextHeight = this._titleTextHeight, subTextWidth = this._subTextWidth, subTextHeight = this._subTextHeight, titlerotate = this._titlerotate, textWidth = 0, textHeight = 0, clipRectWidth = 0, clipRectHeight = 0, position = this._position || "top";
		if (position == "left" || position == "right") {
			titleWidth = this._titleHeight, 
				titleHeight = this._titleWidth, 
				titleTextWidth = this._titleTextHeight, 
				titleTextHeight = this._titleTextWidth, 
				subTextWidth = this._subTextHeight, 
				subTextHeight = this._subTextWidth;
		}


		if (padding) {
			paddingLeft = padding.left;
			paddingRight = padding.right;
			paddingTop = padding.top;
			paddingBottom = padding.bottom;
		}

		if (this._titleRect) {
			if (this._maxTitleTextWidth > chartWidth) {
				left += this._borderHalfWidth;
			}
			else {
				if (halign == "center") {
					left = (chartWidth - titleWidth - this._borderWidth) / 2;
					left += this._borderHalfWidth;
				}
				else if (halign == "right") {
					left = chartWidth - titleWidth - this._borderWidth;
					left += this._borderHalfWidth;
				}
				else if (halign == "left") {
					left += this._borderHalfWidth;
				}
			}

			if (valign == "bottom") {
				var bTmp = titleHeight + this._borderWidth + paddingBottom + paddingTop;
				top = top - bTmp;
			}

			top += this._borderHalfWidth;

			this._rectLeft = left;
			this._rectTop = top;
		}


		if (this._titleText && titleTextWidth > 0) {
			textWidth = titleTextWidth - (this._borderWidth * 2);
			textHeight = titleTextHeight - (this._borderWidth * 2);
			if (position == "top" || position == "bottom") {
				if (titleTextWidth < subTextWidth) {
					if (textWidth > chartWidth) {
						textLeft += paddingLeft + this._borderHalfWidth;
					}
					else {
						if (textalign == "center") {
							textLeft = (titleWidth - titleTextWidth) / 2;
						}
						else if (textalign == "right") {
							textLeft = titleWidth - titleTextWidth - this._borderWidth;
						}
						else if (textalign == "left") {
							textLeft += this._borderWidth;
						}

						if (textalign == "left") {
							textLeft += paddingLeft;
						}

						if (textalign == "right") {
							textLeft -= paddingRight;
						}
					}
				}
				else {
					if (textWidth > chartWidth) {
						textLeft += this._borderHalfWidth;
						textLeft += paddingLeft;
					}
					else {
						textLeft = (titleWidth - titleTextWidth) / 2;
						textLeft += (paddingLeft / 2);
						textLeft -= (paddingRight / 2);
					}
				}

				textTop = titleTextHeight + paddingTop + this._borderHalfWidth;
			}
			else if (position == "left" || position == "right") {
				if (titleTextHeight < subTextHeight) {
					if (textHeight > chartHeight) {
						textTop += paddingTop + this._borderHalfWidth;
					}
					else {
						if (textalign == "center") {
							textTop = (titleHeight - titleTextHeight) / 2;
						}
						else if (textalign == "right") {
							textTop = titleHeight - titleTextHeight - this._borderWidth;
						}
						else if (textalign == "left") {
							textTop += this._borderWidth;
						}

						if (textalign == "left") {
							textTop += paddingTop;
						}

						if (textalign == "right") {
							textTop -= paddingBottom;
						}
					}
				}
				else {
					if (textHeight > chartHeight) {
						textTop += this._borderHalfWidth;
						textTop += paddingTop;
					}
					else {
						textTop = (titleHeight - titleTextHeight) / 2;
						textTop += (paddingTop / 2);
						textTop -= (paddingBottom / 2);
					}
				}

				textLeft = titleTextWidth + paddingLeft + this._borderHalfWidth;
			}


			this._textLeft = textLeft;
			this._textTop = textTop;

			if (this._titleText._clipitems.length > 0) {
				this._titleText._clipitems = "";
			}

			if (textWidth > chartWidth) {
				clipRectWidth = titleWidth - this._borderWidth - paddingLeft;
				clipRectHeight = titleHeight + (this._borderWidth * 2);

				this._titleText.setClipPath(new nexacro.Rect(0, -titleHeight, clipRectWidth, clipRectHeight));
			}
		}

		if (this._subTitleText && subTextWidth > 0) {
			textWidth = subTextWidth - (this._borderWidth * 2);
			textHeight = subTextHeight - (this._borderWidth * 2);
			if (position == "top" || position == "bottom") {
				if (subTextWidth < titleTextWidth) {
					if (textWidth > chartWidth) {
						subTextLeft += paddingLeft;
					}
					else {
						if (subtextalign == "center") {
							subTextLeft = (titleWidth - subTextWidth) / 2;
						}
						else if (subtextalign == "right") {
							subTextLeft = titleWidth - subTextWidth - this._borderWidth;
						}
						else if (subtextalign == "left") {
							subTextLeft += this._borderWidth;
						}

						if (subtextalign == "left") {
							subTextLeft += paddingLeft;
						}

						if (subtextalign == "right") {
							subTextLeft -= paddingRight;
						}
					}
				}
				else {
					if (this._subTextWidth > chartWidth) {
						subTextLeft += this._borderHalfWidth;
						subTextLeft += paddingLeft;
					}
					else {
						subTextLeft = (titleWidth - subTextWidth) / 2;
						subTextLeft += (paddingLeft / 2);
						subTextLeft -= (paddingRight / 2);
					}
				}
				subTextTop = subTextHeight + paddingTop;
			}
			else if (position == "left" || position == "right") {
				if (subTextHeight < titleTextHeight) {
					if (textHeight > chartHeight) {
						subTextTop += paddingTop;
					}
					else {
						if (subtextalign == "center") {
							subTextTop = (titleHeight - subTextHeight) / 2;
						}
						else if (subtextalign == "right") {
							subTextTop = titleHeight - subTextHeight - this._borderWidth;
						}
						else if (subtextalign == "left") {
							subTextTop += this._borderWidth;
						}

						if (subtextalign == "left") {
							subTextTop += paddingTop;
						}

						if (subtextalign == "right") {
							subTextTop -= paddingBottom;
						}
					}
				}
				else {
					if (this._subTextHeight > chartHeight) {
						subTextTop += this._borderHalfWidth;
						subTextTop += paddingTop;
					}
					else {
						subTextTop = (titleHeight - subTextHeight) / 2;
						subTextTop += (paddingTop / 2);
						subTextTop -= (paddingBottom / 2);
					}
				}
				subTextLeft = subTextWidth + paddingLeft;
			}


			this._subTextLeft = subTextLeft;
			this._subTextTop = subTextTop;

			if (this._subTitleText._clipitems.length > 0) {
				this._subTitleText._clipitems = "";
			}

			if (textWidth > chartWidth) {
				clipRectWidth = titleWidth - this._borderWidth - paddingLeft;
				clipRectHeight = titleHeight + (this._borderWidth * 2);

				this._subTitleText.setClipPath(new nexacro.Rect(0, -titleHeight, clipRectWidth, clipRectHeight));
			}
		}

		if (this._titleText) {
			if (position == "left") {
				x = this._textLeft;
				y = this._textTop + titleTextHeight;

				titlerotate = -90;
				this._titleText.setTransform("translate(" + x + "," + y + "),rotate(" + titlerotate + ")");
			}
			else if (position == "right") {
				if (this._subTitleText) {
					x = this._textLeft - titleTextWidth + subTextWidth;
				}
				else {
					x = this._textLeft - titleTextWidth;
				}
				y = this._textTop;

				titlerotate = 90;
				this._titleText.setTransform("translate(" + x + "," + y + "),rotate(" + titlerotate + ")");
			}
			else {
				this._titleText.setTransform("translate(" + this._textLeft + "," + this._textTop + ")");
			}
		}

		if (this._subTitleText) {
			if (position == "top" || position == "bottom") {
				this._subTextTop = this._subTextTop + titleTextHeight;
			}

			if (this._titleText && this.text) {
				if (position == "top" || position == "bottom") {
					this._subTextTop += this._gap;
				}
				else if (position == "left") {
					this._subTextLeft += this._gap;
				}
				else if (position == "right") {
					this._subTextLeft -= this._gap;
				}
			}
			if (position == "left") {
				x = (this._subTextLeft + titleTextWidth);
				y = this._subTextTop + subTextHeight;

				titlerotate = -90;
				this._subTitleText.setTransform("translate(" + x + "," + y + "),rotate(" + titlerotate + ")");
			}
			else if (position == "right") {
				x = (this._subTextLeft - subTextWidth);
				y = this._subTextTop;
				titlerotate = 90;
				this._subTitleText.setTransform("translate(" + x + "," + y + "),rotate(" + titlerotate + ")");
			}
			else {
				this._subTitleText.setTransform("translate(" + this._subTextLeft + "," + this._subTextTop + ")");
			}
		}

		if (this._titleGroup) {
			this._titleGroup.setTransform("translate(" + this._rectLeft + "," + this._rectTop + ")");
		}
	};

	_pChartTitleControl._afterSetProperties = function () {
		this.on_apply_linestyle(this._linestyle);

		this.on_apply_align(this.align);
		this.on_apply_textfont(this._textfont);
		this.on_apply_textcolor(this._textcolor);
		this.on_apply_subtextcolor(this._subtextcolor);
		this.on_apply_subtextfont(this._subtextfont);
	};

	_pChartTitleControl._getRect = function () {
		if (this._titleRect) {
			return this._titleRect._getRect(true, true);
		}
		return;
	};

	_pChartTitleControl._changeContentsProperty = function (nm, newVal, oldVal) {
		var contents = this.parent.contents;
		if (contents && contents.title) {
			contents.title[nm] = newVal;
		}
	};

	delete _pChartTitleControl;
}

if (!nexacro.ChartLegendControl) {
	nexacro.ChartLegendControl = function (id, parent, graphicsControl) {
		this.id = id;
		this.parent = parent;
		this._graphicsControl = graphicsControl;

		this._items = [];

		this._createGroup();
	};

	var _pChartLegendControl = nexacro.ChartLegendControl.prototype = nexacro._createPrototype(nexacro.Object, nexacro.ChartLegendControl);
	_pChartLegendControl._type_name = "ChartLegendControl";


	_pChartLegendControl._group = null;
	_pChartLegendControl._backgroundRect = null;


	_pChartLegendControl.align = "bottomcenter";
	_pChartLegendControl.background = "";
	_pChartLegendControl.itemautofit = false;
	_pChartLegendControl.itemcolumncount = undefined;
	_pChartLegendControl.verticalitemgap = undefined;
	_pChartLegendControl.horizontalitemgap = undefined;
	_pChartLegendControl.iteminvisiblecolor = "";
	_pChartLegendControl.itemtextcolor = "";
	_pChartLegendControl.itemtextfont = "";
	_pChartLegendControl.itemtextwidth = undefined;
	_pChartLegendControl.left = undefined;
	_pChartLegendControl.linestyle = "";
	_pChartLegendControl.markerfillstyle = "";
	_pChartLegendControl.markerlinestyle = "";
	_pChartLegendControl.markersize = undefined;
	_pChartLegendControl.markertextgap = undefined;
	_pChartLegendControl.markertype = "square";
	_pChartLegendControl.opacity = 1;
	_pChartLegendControl.padding = "";
	_pChartLegendControl.top = undefined;
	_pChartLegendControl.useiteminvisible = true;
	_pChartLegendControl.visible = true;


	_pChartLegendControl._data = null;
	_pChartLegendControl._labelHeight = null;
	_pChartLegendControl._position = null;

	_pChartLegendControl._align = null;
	_pChartLegendControl._halign = null;
	_pChartLegendControl._valign = null;
	_pChartLegendControl._background = null;
	_pChartLegendControl._itemtextcolor = null;
	_pChartLegendControl._itemtextfont = null;
	_pChartLegendControl._linestyle = null;
	_pChartLegendControl._markerfillstyle = null;
	_pChartLegendControl._markerlinestyle = null;
	_pChartLegendControl._opacity = null;
	_pChartLegendControl._padding = null;

	_pChartLegendControl.destroy = function () {
		this._group.destroy();

		this._group = null;
		this._backgroundRect = null;

		this._items = null;
		this._data = null;

		this._align = null;
		this._halign = null;
		this._valign = null;
		this._background = null;
		this._itemtextcolor = null;
		this._itemtextfont = null;
		this._linestyle = null;
		this._markerfillstyle = null;
		this._markerlinestyle = null;
		this._opacity = null;
		this._padding = null;

		if (this.parent) {
			if (this.parent.legend) {
				this.parent._deleteContentsProp("legend");
				this.parent.legend = null;
			}
			this.parent._changedData = true;
			this.parent = null;
		}

		nexacro.Object.prototype.destroy.call(this);

		return true;
	};

	_pChartLegendControl.set_visible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.visible !== val) {
			this._changeContentsProperty("visible", val, this.visible);
			this.visible = val;
			this.on_apply_visible(val);
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_visible = function (visible) {
		this._group.set_visible(visible);
		this.parent._changedData = true;
	};

	_pChartLegendControl.set_align = function (val) {
		var align_enum = ["topleft", "topcenter", "topright", "lefttop", "leftcenter", "leftbottom", "righttop", "rightcenter", "rightbottom", "bottomleft", "bottomcenter", "bottomright"];

		if (align_enum.indexOf(val) == -1) {
			return;
		}

		if (this.align != val) {
			this.align = val;
			this.on_apply_align(val);
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_align = function (align) {
		if (this._is_initprop) {
			return;
		}

		if (align) {
			if (align.indexOf("top") == 0) {
				this._position = "top";

				if (align == "topleft") {
					this._halign = "left";
					this._valign = "top";
				}
				else if (align == "topcenter") {
					this._halign = "center";
					this._valign = "top";
				}
				else if (align == "topright") {
					this._halign = "right";
					this._valign = "top";
				}
			}
			else if (align.indexOf("left") == 0) {
				this._position = "left";

				if (align == "lefttop") {
					this._halign = "left";
					this._valign = "top";
				}
				else if (align == "leftcenter") {
					this._halign = "left";
					this._valign = "center";
				}
				else if (align == "leftbottom") {
					this._halign = "left";
					this._valign = "bottom";
				}
			}
			else if (align.indexOf("right") == 0) {
				this._position = "right";

				if (align == "righttop") {
					this._halign = "right";
					this._valign = "top";
				}
				else if (align == "rightcenter") {
					this._halign = "right";
					this._valign = "center";
				}
				else if (align == "rightbottom") {
					this._halign = "right";
					this._valign = "bottom";
				}
			}
			else if (align.indexOf("bottom") == 0) {
				this._position = "bottom";

				if (align == "bottomleft") {
					this._halign = "left";
					this._valign = "bottom";
				}
				else if (align == "bottomcenter") {
					this._halign = "center";
					this._valign = "bottom";
				}
				else if (align == "bottomright") {
					this._halign = "right";
					this._valign = "bottom";
				}
			}
		}
		this.parent._rearrange = true;
		this.parent._changedData = true;
	};

	_pChartLegendControl.set_left = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}

			if (val !== "" && val != null) {
				val = parseInt(val);

				if (this.left !== val) {
					this._changeContentsProperty("left", val, this.left);
					this.left = val;
					this.on_apply_left();
				}
			}
		}
		else {
			if (this.left) {
				this.left = undefined;
				this.on_apply_left();
			}
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_left = function () {
		this.parent._rearrange = true;
	};

	_pChartLegendControl.set_top = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}

			if (val !== "" && val != null) {
				val = parseInt(val);

				if (this.top !== val) {
					this._changeContentsProperty("top", val, this.top);
					this.top = val;
					this.on_apply_top();
				}
			}
		}
		else {
			if (this.top) {
				this.top = undefined;
				this.on_apply_top();
			}
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_top = function () {
		this.parent._rearrange = true;
	};

	_pChartLegendControl.set_background = function (val) {
		this.background = val;
		if (val) {
			if (this._background == null || this._background.value != val) {
				var oldValue;
				if (this._background) {
					oldValue = this._background.value;
				}
				this._changeContentsProperty("background", val, oldValue);

				var background = nexacro.BackgroundObject(val, this);
				this._background = background;
				this.on_apply_background(background);
			}
		}
		else {
			if (this._background) {
				this._background = null;
				this.on_apply_background(null);
			}
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_background = function (background) {
		var backgroundRect = this._backgroundRect;
		if (backgroundRect) {
			backgroundRect.set_fillstyle(background ? background.value : "");
		}
	};

	_pChartLegendControl.set_linestyle = function (val) {
		this.linestyle = val;
		if (val) {
			if (this._linestyle == null || !this._linestyle._single || this._linestyle.value != val) {
				var oldValue;
				if (this._linestyle) {
					oldValue = this._linestyle.value;
				}
				this._changeContentsProperty("linestyle", val, oldValue);

				var linestyle = nexacro.BorderObject(val);
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

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_linestyle = function (linestyle) {
		if (this._is_initprop) {
			return;
		}

		var backgroundRect = this._backgroundRect;
		if (backgroundRect) {
			backgroundRect.set_strokepen(linestyle ? linestyle.value || linestyle : "0px solid #717a8380");
			this.parent._rearrange = true;
		}
	};

	_pChartLegendControl.set_opacity = function (val) {
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

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_opacity = function (opacity) {
		opacity = opacity ? opacity._sysvalue : "";
		var backgroundRect = this._backgroundRect;
		if (backgroundRect) {
			backgroundRect.set_opacity(opacity);
		}
	};

	_pChartLegendControl.set_itemautofit = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.itemautofit != val) {
			this._changeContentsProperty("itemautofit", val, this.itemautofit);
			this.itemautofit = val;
			this.on_apply_itemautofit();
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_itemautofit = function () {
		this.parent._rearrange = true;
	};

	_pChartLegendControl.set_itemcolumncount = function (val) {
		if (val !== undefined) {
			if (isNaN(val)) {
				return;
			}
			if (val != "") {
				val = parseInt(val);
			}
		}



		if (this.itemcolumncount != val) {
			this._changeContentsProperty("itemcolumncount", val, this.itemcolumncount);
			this.itemcolumncount = val;
			this.on_apply_itemcolumncount();
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_itemcolumncount = function () {
		this.parent._rearrange = true;
	};

	_pChartLegendControl.set_padding = function (val) {
		this.padding = val;
		if (val) {
			if (this._padding == null || this._padding.value != val) {
				var oldValue;
				if (this._padding) {
					oldValue = this._padding.value;
				}
				this._changeContentsProperty("padding", val, oldValue);

				var padding = nexacro.PaddingObject(val);
				this._padding = padding;
				this.on_apply_padding();
			}
		}
		else {
			if (this._padding) {
				this._padding = null;
				this.on_apply_padding();
			}
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_padding = function () {
		this.parent._rearrange = true;
	};

	_pChartLegendControl.set_verticalitemgap = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}

		if (this.verticalitemgap != val) {
			this._changeContentsProperty("verticalitemgap", val, this.itemgap);
			this.verticalitemgap = val;
			this.on_apply_verticalitemgap();
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_verticalitemgap = function () {
		if (this._is_initprop) {
			return;
		}

		this.parent._rearrange = true;
	};
	_pChartLegendControl.set_horizontalitemgap = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}

		if (this.itemgap != val) {
			this._changeContentsProperty("horizontalitemgap", val, this.itemgap);
			this.horizontalitemgap = val;
			this.on_apply_horizontalitemgap();
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_horizontalitemgap = function () {
		if (this._is_initprop) {
			return;
		}

		this.parent._rearrange = true;
	};

	_pChartLegendControl.set_markertextgap = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val) || val < 0) {
				return;
			}
		}

		if (this.markertextgap != val) {
			this._changeContentsProperty("markertextgap", val, this.markertextgap);
			this.markertextgap = val;
			this.on_apply_markertextgap();
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_markertextgap = function () {
		this.parent._rearrange = true;
	};

	_pChartLegendControl.set_markertype = function (val) {
		var markertype_enum = ["circle", "square"];
		if (markertype_enum.indexOf(val) == -1) {
			return;
		}

		if (this.markertype != val) {
			this._changeContentsProperty("markertype", val, this.markertype);
			this.markertype = val;
			this.on_apply_markertype(val);
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_markertype = function (markertype_) {
		var legendData = this._data;
		var dataLen = legendData.length;
		var itemGroup, marker, oldMarker;
		var markertype = markertype_;
		var markersize = this.markersize || 15;
		var series;

		for (var i = 0; i < dataLen; i++) {
			itemGroup = this._items[i];
			oldMarker = itemGroup.getFirstChild();
			if (oldMarker) {
				marker = this._createMarker(markertype, markersize);
				marker.set_id("ChartLegendItemMarker" + i);
				marker._series = legendData[i];

				itemGroup._overrideChild(marker, oldMarker);
				oldMarker = null;

				series = legendData[i];
				series._legendMarker = marker;
			}
		}

		this._afterSetProperties();
		this.parent._rearrange = true;
	};

	_pChartLegendControl.set_markersize = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}

			if (val != "") {
				val = parseInt(val);
			}
		}

		if (this.markersize !== val) {
			this._changeContentsProperty("markersize", val, this.markersize);
			this.markersize = val;
			this.on_apply_markersize(val);
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_markersize = function (markersize) {
		if (this._is_initprop) {
			return;
		}

		var items = this._items, itemsLen = items.length;

		if ((this.markersize == "" || this.markersize == undefined) && this.markersize !== 0) {
			markersize = 15;
		}
		else {
			markersize = this.markersize;
		}

		for (var i = 0; i < itemsLen; i++) {
			var marker = items[i].getFirstChild();
			var markertype = this.markertype;
			if (marker) {
				if (markertype == "circle") {
					marker.set_cx(markersize * 0.5);
					marker.set_cy(markersize * 0.5);
					marker.set_width(markersize);
					marker.set_height(markersize);
				}
				else {
					marker.set_x(0);
					marker.set_y(0);
					marker.set_width(markersize);
					marker.set_height(markersize);
				}
			}
		}
		this.parent._rearrange = true;
	};

	_pChartLegendControl.set_markerfillstyle = function (val) {
		this.markerfillstyle = val;
		if (val) {
			if (this._markerfillstyle == null || this._markerfillstyle.value != val) {
				var oldValue;
				if (this._markerfillstyle) {
					oldValue = this._markerfillstyle.value;
				}
				this._changeContentsProperty("markerfillstyle", val, oldValue);

				var markerfillstyle = nexacro.BackgroundObject(val, this);
				this._markerfillstyle = markerfillstyle;
				this.on_apply_markerfillstyle(markerfillstyle);
			}
		}
		else {
			if (this._markerfillstyle) {
				this._markerfillstyle = null;
				this.on_apply_markerfillstyle(null);
			}
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_markerfillstyle = function (markerfillstyle) {
		if (this._is_initprop) {
			return;
		}

		var items = this._items, itemsLen = items.length, data, seriesVisible = true, itemGroup, marker, fillstyle, iteminvisiblecolor = this.iteminvisiblecolor || "#000000";

		for (var i = 0; i < itemsLen; i++) {
			itemGroup = items[i];
			marker = itemGroup.getFirstChild();
			if (marker) {
				data = itemGroup._data;
				seriesVisible = data.visible;
				if (seriesVisible) {
					if (!markerfillstyle) {
						fillstyle = data.color;
					}
					else {
						fillstyle = markerfillstyle;
					}
				}
				else {
					fillstyle = iteminvisiblecolor;
				}

				marker.set_fillstyle(fillstyle ? fillstyle.value || fillstyle : "");
			}
		}
	};

	_pChartLegendControl.set_markerlinestyle = function (val) {
		this.markerlinestyle = val;
		if (val) {
			if (this._markerlinestyle == null || !this._markerlinestyle._single || this._markerlinestyle.value != val) {
				var oldValue;
				if (this._markerlinestyle) {
					oldValue = this._markerlinestyle.value;
				}
				this._changeContentsProperty("markerlinestyle", val, oldValue);

				var markerlinestyle = nexacro.BorderObject(val);
				this._markerlinestyle = markerlinestyle;
				this.on_apply_markerlinestyle(markerlinestyle);
			}
		}
		else {
			if (this._markerlinestyle) {
				this._markerlinestyle = null;
				this.on_apply_markerlinestyle(null);
			}
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_markerlinestyle = function (markerlinestyle) {
		var items = this._items, itemsLen = items.length, itemGroup;

		for (var i = 0; i < itemsLen; i++) {
			itemGroup = items[i];
			var marker = itemGroup.getFirstChild();
			if (marker) {
				marker.set_strokepen(markerlinestyle ? markerlinestyle.value : "");
			}
		}

		this.parent._rearrange = true;
	};

	_pChartLegendControl.on_apply_itemtext = function (itemtext) {
		var items = this._items, itemsLen = items.length, data, label, itemGroup, title;

		for (var i = 0; i < itemsLen; i++) {
			itemGroup = items[i];
			label = itemGroup.getLastChild();
			if (label) {
				data = itemGroup._data;
				title = itemtext.replace("[%titletext]", data.name);
				if (title) {
					label.set_text(title);
					label.set_textAlign("left");
					label.set_verticalAlign("middle");
				}
			}
		}
	};

	_pChartLegendControl.set_itemtextfont = function (val) {
		this.itemtextfont = val;
		if (val) {
			if (this._itemtextfont == null || this._itemtextfont.value != val) {
				var oldValue;
				if (this._itemtextfont) {
					oldValue = this._itemtextfont.value;
				}
				this._changeContentsProperty("itemtextfont", val, oldValue);

				var itemtextfont = nexacro.FontObject(val);
				this._itemtextfont = itemtextfont;
				this.on_apply_itemtextfont(itemtextfont);
			}
		}
		else {
			if (this._itemtextfont) {
				this._itemtextfont = null;
				this.on_apply_itemtextfont(null);
			}
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_itemtextfont = function (itemtextfont) {
		if (this._is_initprop) {
			return;
		}

		var items = this._items, itemsLen = items.length, label, itemGroup;

		for (var i = 0; i < itemsLen; i++) {
			itemGroup = items[i];
			label = itemGroup.getLastChild();
			if (label) {
				label.set_font(itemtextfont ? itemtextfont.value || itemtextfont : "12pt Verdana");
			}
		}
		this.parent._rearrange = true;
	};

	_pChartLegendControl.set_itemtextcolor = function (val) {
		this.itemtextcolor = val;
		if (val) {
			if (this._itemtextcolor == null || this._itemtextcolor.value != val) {
				var oldValue;
				if (this._itemtextcolor) {
					oldValue = this._itemtextcolor.value;
				}
				this._changeContentsProperty("itemtextcolor", val, oldValue);

				var itemtextcolor = nexacro.ColorObject(val);
				this._itemtextcolor = itemtextcolor;
				this.on_apply_itemtextcolor(itemtextcolor);
			}
		}
		else {
			if (this._itemtextcolor) {
				this._itemtextcolor = null;
				this.on_apply_itemtextcolor(null);
			}
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_itemtextcolor = function (itemtextcolor) {
		if (this._is_initprop) {
			return;
		}

		var items = this._items, itemsLen = items.length, label, data, seriesVisible = true, iteminvisiblecolor = this._iteminvisiblecolor, itemGroup, textcolor;

		for (var i = 0; i < itemsLen; i++) {
			itemGroup = items[i];
			label = itemGroup.getLastChild();

			if (label) {
				data = itemGroup._data;
				seriesVisible = data.visible;
				if (seriesVisible) {
					label.set_color(itemtextcolor ? itemtextcolor.value : "#000000");
				}
				else {
					label.set_color(iteminvisiblecolor ? iteminvisiblecolor.value : "#000000");
				}
			}
		}
	};

	_pChartLegendControl.set_itemtextwidth = function (val) {
		if (val !== undefined) {
			if (isNaN(val = +val)) {
				return;
			}
		}

		if (this.itemtextwidth !== val) {
			this._changeContentsProperty("itemtextwidth", val, this.itemtextwidth);
			this.itemtextwidth = val;
			this.on_apply_itemtextwidth(val);
		}

		this.parent._draw();
	};

	_pChartLegendControl.on_apply_itemtextwidth = function (itemtextwidth) {
		var items = this._items, itemsLen = items.length, label, itemGroup;

		for (var i = 0; i < itemsLen; i++) {
			itemGroup = items[i];
			label = itemGroup.getLastChild();
			if (label) {
				if (itemtextwidth > 0) {
					label.set_width(itemtextwidth);
					label.set_wordWrap(true);
				}
				else {
					label.set_wordWrap(false);
				}
			}
		}
		this.parent._rearrange = true;
	};

	_pChartLegendControl.set_useiteminvisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.useiteminvisible !== val) {
			this._changeContentsProperty("useiteminvisible", val, this.useiteminvisible);
			this.useiteminvisible = val;
		}

		this.parent._draw();
	};

	_pChartLegendControl.set_iteminvisiblecolor = function (val) {
		this.iteminvisiblecolor = val;
		if (val) {
			if (this._iteminvisiblecolor == null || this._iteminvisiblecolor.value != val) {
				var oldValue;
				if (this._iteminvisiblecolor) {
					oldValue = this._iteminvisiblecolor.value;
				}
				this._changeContentsProperty("iteminvisiblecolor", val, oldValue);

				var iteminvisiblecolor = nexacro.ColorObject(val);
				this._iteminvisiblecolor = iteminvisiblecolor;
			}
		}
		else {
			if (this._iteminvisiblecolor) {
				this._iteminvisiblecolor = null;
			}
		}

		this.parent._draw();
	};

	_pChartLegendControl._createGroup = function () {
		this._group = new nexacro.GraphicsGroup();
		this._group.set_id("ChartLegendGroup");
		this._graphicsControl.addChild(this._group);

		this._backgroundRect = new nexacro.GraphicsRect(0, 0, 0, 0);
		this._backgroundRect.set_id("ChartLegendBackgroundRect");
		this._group.addChild(this._backgroundRect);
		this._backgroundRect._legend = this;
		this._itemsGroup = new nexacro.GraphicsGroup();
		this._itemsGroup.set_id("ChartLegendItemsGroup");
		this._group.addChild(this._itemsGroup);
	};

	_pChartLegendControl._setData = function (seriesset) {
		this._clearItems();
		if (nexacro._GraphicsLib.isEmpty(seriesset)) {
			this._data = [];
			return;
		}

		var charttype = this.parent._type_name, i = 0, length = 0, seriesitem, ldata, data = [];

		if (charttype == "BasicChart" || charttype == "BubbleChart" || charttype == "RadarChart" || charttype == "GaugeChart") {
			length = seriesset.length;
			for (i = 0; i < length; i++) {
				var series = seriesset[i], sdata = series._data, visible = false, fillstyle;
				ldata = {
				};

				if (charttype == "BasicChart" || charttype == "RadarChart") {
					if (series.pointvisible) {
						visible = true;
						fillstyle = series.pointfillstyle ? series.pointfillstyle : series._color;
					}

					if (series.linevisible) {
						visible = true;
						if (series.lineareavisible) {
							fillstyle = series.lineareafillstyle ? series.lineareafillstyle : series._color;
						}
						else {
							fillstyle = series._linebordercolor ? series._linebordercolor : series._color;
						}
					}

					if (series.barvisible) {
						visible = true;
						fillstyle = series.barfillstyle ? series.barfillstyle : series._color;
					}
				}
				else if (charttype == "GaugeChart") {
					if (series.visible) {
						visible = true;
						fillstyle = series.barfillstyle ? series.barfillstyle : series._color;
					}
				}
				else {
					if (series.visible) {
						visible = true;
						fillstyle = series.fillstyle ? series.fillstyle : series._color;
					}
				}

				ldata.name = series.titletext || series.id;
				ldata.id = series.id;
				ldata.visible = visible;
				ldata.title = series.titletext;
				ldata.color = fillstyle;

				data.push(ldata);
			}
		}
		else {
			length = seriesset[0]._seriesitems.length, 
				seriesitem = seriesset[0]._seriesitems;
			for (i = 0; i < length; i++) {
				var item = seriesitem[i];
				ldata = {
				};

				if (seriesset[0].visible) {
					ldata.name = item.category;
					ldata.value = item.value;
					ldata.visible = item._isShow;
					ldata.title = seriesset[0].titletext;
					ldata.color = item.color;

					data.push(ldata);
				}
			}
		}
		this._data = data;
		this._createItems();
	};

	_pChartLegendControl._clearItems = function () {
		var itemsGroup = this._itemsGroup;
		if (itemsGroup) {
			itemsGroup.clear();
		}
		this._items = [];
	};

	_pChartLegendControl._createItems = function () {
		var legendData = this._data, dataLen = legendData.length, series, itemGroup, marker, markertype = this.markertype, markersize = this.markersize || 15, label;

		for (var i = 0; i < dataLen; i++) {
			series = legendData[i];

			itemGroup = new nexacro.GraphicsGroup();
			itemGroup.set_id("ChartLegendItemGroup" + i);
			itemGroup._data = series;
			this._itemsGroup.addChild(itemGroup);

			marker = this._createMarker(markertype, markersize);
			marker.set_id("ChartLegendItemMarker" + i);
			series._legendMarker = marker;
			marker._series = series;
			itemGroup.addChild(marker);
			marker._legend = this;
			label = new nexacro.GraphicsText(0, 0);
			label.set_id("ChartLegendItemLabel" + i);
			itemGroup.addChild(label);
			label._legend = this;
			label._series = series;
			series._legendLabel = label;

			this._items[i] = itemGroup;
		}
	};

	_pChartLegendControl._createMarker = function (markertype, markersize) {
		var marker;
		if (markertype == "circle") {
			marker = new nexacro.GraphicsEllipse(markersize * 0.5, markersize * 0.5, markersize, markersize);
		}
		else {
			marker = new nexacro.GraphicsRect(0, 0, markersize, markersize);
		}

		return marker;
	};

	_pChartLegendControl._measure = function (clientWidth) {
		var maxsize = [0, 0], maxH = 0, maxW = 0;

		maxsize = this._getMaxSize();
		if (maxsize) {
			maxW = maxsize[0];
			maxH = maxsize[1];
		}

		var items = this._items, left = 0, itemGroup, rect, verticalitemgap = this.verticalitemgap || 0, horizontalitemgap = this.horizontalitemgap || 0, padding = this._padding, paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0, hGap = 0, vGap = 0, itemcolumncount, halign = this._halign, index = 0, linestyle = this._linestyle, borderLeftWidth = 0, borderWidth = 0;

		if ((this.itemcolumncount == "" || this.itemcolumncount == undefined) && this.itemcolumncount !== 0) {
			itemcolumncount = undefined;
		}
		else {
			if (this.itemcolumncount <= 0) {
				itemcolumncount = 1;
			}
			else {
				itemcolumncount = this.itemcolumncount;
			}
		}

		if (padding) {
			paddingLeft = padding.left;
			paddingRight = padding.right;
			paddingTop = padding.top;
			paddingBottom = padding.bottom;
		}

		hGap = paddingLeft;
		vGap = paddingTop;

		if (linestyle) {
			borderWidth = linestyle._getBorderWidth();
			borderLeftWidth = linestyle._getBorderLeftWidth();
		}
		else {
			borderWidth = 2;
			borderLeftWidth = 1;
		}

		for (var i = 0; i < items.length; i++) {
			left = 0;
			itemGroup = items[i];
			rect = itemGroup._getRect(false, true);

			if (this.itemautofit) {
				left = paddingLeft + index * (maxW + horizontalitemgap);
			}
			else {
				left = hGap;
				hGap = hGap + rect.width + horizontalitemgap;
			}

			if (!itemcolumncount || itemcolumncount === 0) {
				if (halign == "left" || halign == "right") {
					itemcolumncount = 1;
				}
				else {
					itemcolumncount = undefined;
				}
			}

			if ((left + rect.width + paddingLeft + paddingRight + borderWidth > clientWidth && i > 0 && index !== 0) || (!isNaN(itemcolumncount) && index >= itemcolumncount)) {
				index = 0;
				left = paddingLeft;
				hGap = left + rect.width + horizontalitemgap;
				vGap = vGap + maxH + verticalitemgap;
			}

			itemGroup.setTransform("translate(" + left + "," + vGap + ")");
			index++;
		}

		var itemGrpRect, itemGrpWidth = 0, itemGrpHeight = 0, backgroundRect = this._backgroundRect;

		itemGrpRect = this._itemsGroup._getRect(false, true);
		itemGrpWidth = itemGrpRect.width;
		itemGrpHeight = itemGrpRect.height;
		if (itemGrpHeight < 0) {
			itemGrpHeight = 0;
		}

		backgroundRect.set_width(itemGrpWidth + borderLeftWidth + paddingLeft + paddingRight);
		backgroundRect.set_height(itemGrpHeight + borderLeftWidth + paddingTop + paddingBottom);
	};

	_pChartLegendControl._arrange = function (left, top) {
		var linestyle = this._linestyle, borderWidthHalf = 0, markerlinestyle = this._markerlinestyle, markerlineWidthHalf = 0, itemsGroupLeft = 0, itemsGroupTop = 0, labelHeight = this._labelHeight, markersize = this.markersize || 15;

		if (linestyle) {
			borderWidthHalf = linestyle._getBorderLeftWidth() * 0.5;
		}
		else {
			borderWidthHalf = 0.5;
		}
		left += borderWidthHalf;
		top += borderWidthHalf;
		itemsGroupLeft += borderWidthHalf;

		if (markerlinestyle) {
			markerlineWidthHalf = markerlinestyle._getBorderLeftWidth() * 0.5;
		}
		else {
			markerlineWidthHalf = 0.5;
		}
		itemsGroupLeft = markerlineWidthHalf;
		itemsGroupTop = markerlineWidthHalf;

		if (labelHeight > markersize) {
			itemsGroupTop += (labelHeight * 0.5) - (markersize * 0.5) + borderWidthHalf;
		}
		else {
			itemsGroupTop += borderWidthHalf;
		}

		this._itemsGroup.setTransform("translate(" + itemsGroupLeft + "," + itemsGroupTop + ")");
		this._group.setTransform("translate(" + left + "," + top + ")");
	};

	_pChartLegendControl._afterSetProperties = function () {
		this.on_apply_linestyle(this._linestyle);
		this.on_apply_markersize(this.markersize);
		this.on_apply_markerfillstyle(this._markerfillstyle);
		this.on_apply_markerlinestyle(this._markerlinestyle);
		this.on_apply_align(this.align);
		this.on_apply_itemtext("[%titletext]");
		this.on_apply_itemtextfont(this._itemtextfont);
		this.on_apply_itemtextcolor(this._itemtextcolor);
		this.on_apply_verticalitemgap();
		this.on_apply_horizontalitemgap();
	};

	_pChartLegendControl._getRect = function () {
		if (this._backgroundRect) {
			return this._backgroundRect._getRect(true, true);
		}
		return;
	};

	_pChartLegendControl._getMaxSize = function () {
		var items = this._items, itemGroup, marker, label, rect, mRect, lRect, markertextgap = this.markertextgap || 0, labelX = 0, labelY = 0, markerWidth = 0, itemGroupWidth = 0, itemGroupHeight = 0, maxH = 0, maxW = 0, markerlinestyle = this._markerlinestyle, markerlineWidthHalf = 0;

		if (markerlinestyle) {
			markerlineWidthHalf = markerlinestyle._getBorderLeftWidth() * 0.5;
		}

		for (var i = 0; i < items.length; i++) {
			itemGroup = items[i];
			marker = itemGroup.getFirstChild();
			label = itemGroup.getLastChild();

			labelX = markertextgap;
			if (marker) {
				mRect = marker._getRect(true, true);
				markerWidth = mRect.width;
				if (markerWidth > 0) {
					labelX = labelX + markerWidth;
				}
				labelY = mRect.height * 0.5 - markerlineWidthHalf;
			}
			if (label) {
				lRect = label._getRect();
				this._labelHeight = lRect.height;

				label.set_x(labelX);
				label.set_y(labelY);
			}

			rect = itemGroup._getRect(false, true);
			itemGroupWidth = rect.width;
			itemGroupHeight = rect.height;

			if (itemGroupWidth > maxW) {
				maxW = itemGroupWidth;
			}
			if (itemGroupHeight > maxH) {
				maxH = itemGroupHeight;
			}
		}

		return [maxW, maxH];
	};

	_pChartLegendControl._changeContentsProperty = function (nm, newVal, oldVal) {
		var contents = this.parent.contents;
		if (contents && contents.legend) {
			contents.legend[nm] = newVal;
		}
	};

	delete _pChartLegendControl;
}

if (!nexacro.ChartTooltipControl) {
	nexacro.ChartTooltipControl = function (id, parent, graphicsControl) {
		this.id = id;
		this.parent = parent;
		this._graphicsControl = graphicsControl;

		this._createGroup();
	};

	var _pChartTooltipControl = nexacro.ChartTooltipControl.prototype = nexacro._createPrototype(nexacro.Object, nexacro.ChartTooltipControl);
	_pChartTooltipControl._type_name = "ChartTooltipControl";


	_pChartTooltipControl._group = null;
	_pChartTooltipControl._tooltipPath = null;
	_pChartTooltipControl._tooltipText = null;


	_pChartTooltipControl.background = "";
	_pChartTooltipControl.hookheight = undefined;
	_pChartTooltipControl.hookwidth = undefined;
	_pChartTooltipControl.linestyle = "";
	_pChartTooltipControl.opacity = 1;
	_pChartTooltipControl.padding = "";
	_pChartTooltipControl.textcolor = "";
	_pChartTooltipControl.textfont = "";
	_pChartTooltipControl.visible = true;


	_pChartTooltipControl._offsetx = 0;
	_pChartTooltipControl._offsety = 2;

	_pChartTooltipControl._background = null;
	_pChartTooltipControl._linestyle = null;
	_pChartTooltipControl._opacity = null;
	_pChartTooltipControl._textcolor = null;
	_pChartTooltipControl._textfont = null;

	_pChartTooltipControl.set_visible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.visible !== val) {
			this._changeContentsProperty("visible", val, this.visible);
			this.visible = val;
			this.on_apply_visible(val);
		}
	};

	_pChartTooltipControl.on_apply_visible = function (visible) {
		this._group.set_visible(visible);
	};

	_pChartTooltipControl.set_textfont = function (val) {
		if (this.textfont != val) {
			this._changeContentsProperty("textfont", val, this.textfont);
			this.textfont = val;
			this.on_apply_textfont(val);
		}
	};

	_pChartTooltipControl.on_apply_textfont = function (textfont) {
		if (this._is_initprop) {
			return;
		}

		this._createTooltip();
		this._tooltipText.set_font(textfont ? textfont.value || textfont : "12pt Verdana");
	};

	_pChartTooltipControl.set_textcolor = function (val) {
		this.textcolor = val;
		if (val) {
			if (this._textcolor == null || this._textcolor.value != val) {
				var oldValue;
				if (this._textcolor) {
					oldValue = this._textcolor.value;
				}
				this._changeContentsProperty("textcolor", val, oldValue);

				var textcolor = nexacro.ColorObject(val);
				this._textcolor = textcolor;
				this.on_apply_textcolor(textcolor);
			}
		}
		else {
			if (this._textcolor) {
				this._textcolor = null;
				this.on_apply_textcolor(null);
			}
		}
	};

	_pChartTooltipControl.on_apply_textcolor = function (textcolor) {
		if (this._is_initprop) {
			return;
		}

		this._createTooltip();
		this._tooltipText.set_color(textcolor ? textcolor.value || textcolor : "#000000");
	};

	_pChartTooltipControl.set_padding = function (val) {
		this.padding = val;
		if (val) {
			if (this._padding == null || this._padding.value != val) {
				var oldValue;
				if (this._padding) {
					oldValue = this._padding.value;
				}
				this._changeContentsProperty("padding", val, oldValue);

				var padding = nexacro.PaddingObject(val);
				this._padding = padding;
			}
		}
		else {
			if (this._padding) {
				this._padding = null;
			}
		}
	};

	_pChartTooltipControl.set_linestyle = function (val) {
		this.linestyle = val;
		if (val) {
			if (this._linestyle == null || !this._linestyle._single || this._linestyle.value != val) {
				var oldValue;
				if (this._linestyle) {
					oldValue = this._linestyle.value;
				}
				this._changeContentsProperty("linestyle", val, oldValue);

				var linestyle = nexacro.BorderObject(val);
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
	};

	_pChartTooltipControl.on_apply_linestyle = function (linestyle) {
		if (this._is_initprop) {
			return;
		}

		this._createTooltip();
		this._tooltipPath.set_strokepen(linestyle ? linestyle.value || linestyle : "1px solid #717a8380");
	};

	_pChartTooltipControl.set_background = function (val) {
		this.background = val;
		if (val) {
			if (this._background == null || this._background.value != val) {
				var oldValue;
				if (this._background) {
					oldValue = this._background.value;
				}
				this._changeContentsProperty("background", val, oldValue);

				var background = nexacro.BackgroundObject(val, this);
				this._background = background;
				this.on_apply_background(background);
			}
		}
		else {
			if (this._background) {
				this._background = null;
				this.on_apply_background(null);
			}
		}
	};

	_pChartTooltipControl.on_apply_background = function (background) {
		if (this._is_initprop) {
			return;
		}

		this._createTooltip();
		this._tooltipPath.set_fillstyle(background ? background.value || background : "yellow");
	};

	_pChartTooltipControl.set_opacity = function (val) {
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
	};

	_pChartTooltipControl.on_apply_opacity = function (opacity) {
		this._createTooltip();
		this._tooltipPath.set_opacity(opacity ? opacity._sysvalue : 1);
	};

	_pChartTooltipControl.set_hookwidth = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}
			if (val != "") {
				val = parseInt(val);
			}
		}



		if (this.hookwidth != val) {
			this._changeContentsProperty("hookwidth", val, this.hookwidth);
			this.hookwidth = val;
		}
	};

	_pChartTooltipControl.set_hookheight = function (val) {
		if (val !== undefined) {
			if (isNaN(val) || val < 0) {
				return;
			}
			if (val != "") {
				val = parseInt(val);
			}
		}



		if (this.hookheight != val) {
			this._changeContentsProperty("hookheight", val, this.hookheight);
			this.hookheight = val;
		}
	};

	_pChartTooltipControl.destroy = function () {
		this._group.destroy();
		this._group = null;

		this.id = null;
		this.visible = null;
		this.text = null;
		this.textfont = null;
		this.textcolor = null;
		this.padding = null;
		this.linestyle = null;
		this.background = null;
		this.opacity = null;
		this.hookwidth = null;
		this.hookheight = null;
		this.texttype = null;
		this.textmask = null;
		this._padding = null;
		this._tooltipPath = null;
		this._tooltipText = null;
		this._linestyle = null;
		this._background = null;
		this._opacity = null;
		this._textfont = null;
		this._textcolor = null;
		this._offsetx = null;
		this._offsety = null;

		if (this.parent) {
			if (this.parent.tooltip) {
				this.parent._deleteContentsProp("tooltip");
				this.parent.tooltip = null;
			}
			this.parent = null;
		}

		nexacro.Object.prototype.destroy.call(this);

		return true;
	};

	_pChartTooltipControl._createGroup = function () {
		this._group = new nexacro.GraphicsGroup();
		this._group.set_id("ChartTooltipGroup");
		this._graphicsControl.addChild(this._group);
	};

	_pChartTooltipControl._clear = function () {
		if (this._tooltipText) {
			this._group.removeChild(this._tooltipText);
			delete this._tooltipText;
			this._tooltipText = null;
		}

		if (this._tooltipPath) {
			this._group.removeChild(this._tooltipPath);
			delete this._tooltipPath;
			this._tooltipPath = null;
		}
	};

	_pChartTooltipControl._createTooltip = function () {
		if (!this._tooltipPath) {
			this._tooltipPath = new nexacro.GraphicsPath();
			this._tooltipPath.set_id("ChartTooltipPath");
			this._group.addChild(this._tooltipPath);
		}

		if (!this._tooltipText) {
			this._tooltipText = new nexacro.GraphicsText();
			this._tooltipText.set_id("ChartTooltipText");
			this._tooltipText.set_font("0pt arial");
			this._tooltipText.set_textAlign("center");
			this._tooltipText.set_verticalAlign("middle");
			this._tooltipText.set_x(-1000);
			this._tooltipText.set_y(-1000);
			this._group.addChild(this._tooltipText);
		}
	};

	_pChartTooltipControl._showTooltip = function (obj, canvasX, canvasY) {
		if (!obj || !this.visible) {
			return;
		}
		var overitemid = obj.id;
		var s;
		if (overitemid.search("SeriesItemText_") >= 0) {
			if (obj._series) {
				if (this.parent._type_name == "BasicChart") {
					s = obj._series;
					if ((!s.linevisible && !s.pointvisible && !s.barvisible)) {
						return;
					}
				}
				if (this.parent._type_name == "RadarChart") {
					s = obj._series;
					if ((!s.linevisible && !s.pointvisible)) {
						return;
					}
				}
			}
		}


		this.on_apply_linestyle(this._linestyle);
		this.on_apply_background(this._background);
		this.on_apply_opacity(this._opacity);
		this.on_apply_textfont(this.textfont);
		this.on_apply_textcolor(this._textcolor);
		if (this._tooltipPath && this._tooltipText && obj._tooltipShow) {
			return;
		}
		this._lasttooltip = obj;
		var charttype = this.parent._type_name, text;

		if (charttype == "BasicChart" || charttype == "BubbleChart" || charttype == "RadarChart" || charttype == "GaugeChart") {
			text = this._getTooltipText(obj);
		}
		else if (charttype == "PieChart") {
			text = this._getPieTooltipText(obj);
		}

		if (!text) {
			return;
		}

		var tooltipPath = this._tooltipPath, tooltipText = this._tooltipText, txtRect = {
		}, txtWidth = 0, txtHeight = 0, paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0, padding = this._padding, linestyle = this._linestyle, borderwidth = 0, tooltipWidth = 0, tooltipHeight = 0, hookwidth, hookheight, posX = 0, posY = 0, offsetx = this._offsetx, offsety = this._offsety, posRight = 0, posExtLeft = 0, posExtRight = 0, shiftXW = 0, shiftXE = 0, left = 0, top = 0, sX = 0, sT = 0;

		if ((this.hookwidth == "" || this.hookwidth == undefined) && this.hookwidth !== 0) {
			hookwidth = 5;
		}
		else {
			hookwidth = this.hookwidth;
		}

		if ((this.hookheight == "" || this.hookheight == undefined) && this.hookheight !== 0) {
			hookheight = 5;
		}
		else {
			hookheight = this.hookheight;
		}
		if (padding) {
			paddingLeft = padding.left;
			paddingRight = padding.right;
			paddingTop = padding.top;
			paddingBottom = padding.bottom;
		}
		else {
			paddingLeft = 5;
			paddingRight = 10;
			paddingTop = 5;
			paddingBottom = 10;
		}

		tooltipText.set_text(text);
		txtRect = tooltipText._getRect();
		txtWidth = txtRect.width;
		txtHeight = txtRect.height;

		borderwidth = linestyle ? linestyle._getBorderLeftWidth() : 1;
		tooltipWidth = txtWidth + paddingLeft + paddingRight + borderwidth;
		tooltipHeight = txtHeight + paddingTop + paddingBottom + borderwidth;
		posX = canvasX;
		posY = canvasY;

		posX -= offsetx;
		posY -= offsety;

		posY -= (tooltipHeight / 2);
		posY -= hookheight;

		posExtLeft = (tooltipWidth / 2) + (borderwidth / 2);
		posExtRight = posX + posExtLeft;
		posRight = this.parent._getClientWidth();

		if (posExtLeft > canvasX) {
			shiftXW = posExtLeft - canvasX;
			posX += shiftXW;
		}
		else if (posExtRight > posRight) {
			shiftXE = posExtRight - posRight;
			posX -= shiftXE;
		}

		tooltipText.set_x(posX + paddingLeft - ((paddingLeft + paddingRight) / 2));
		tooltipText.set_y(posY - borderwidth + paddingTop - ((paddingTop + paddingBottom) / 2));



		left = posX - (tooltipWidth / 2);
		top = posY - (tooltipHeight / 2) - borderwidth;

		sX = left;
		sT = top;
		tooltipPath.moveTo(left, top);

		left += tooltipWidth;
		tooltipPath.lineTo(left, top);

		top += tooltipHeight;
		tooltipPath.lineTo(left, top);

		left -= tooltipWidth / 2;
		left += hookwidth / 2;

		if (shiftXW > 0) {
			if (sT < 0) {
				left += shiftXW;
			}
			else {
				left = canvasX + (hookwidth / 2);
			}

			if (left - hookwidth - borderwidth < 0) {
				left = hookwidth + borderwidth;
			}
		}
		else if (shiftXE > 0) {
			if (sT < 0) {
				left -= shiftXE;
			}
			else {
				left += shiftXE;
			}

			if (left + hookwidth + borderwidth > posRight) {
				left = posRight - borderwidth;
			}
		}

		tooltipPath.lineTo(left, top);

		left -= (hookwidth / 2);
		top += hookheight;
		tooltipPath.lineTo(left, top);

		left -= (hookwidth / 2);
		top -= hookheight;
		tooltipPath.lineTo(left, top);

		tooltipPath.lineTo(sX, top);

		tooltipPath.closePath();

		if (tooltipHeight + hookheight + (borderwidth * 2) + offsety > canvasY) {
			tooltipPath.rotate(180);
			tooltipPath.translate(0, tooltipHeight + hookheight + (borderwidth * 2) + (offsety * 2));

			var pathBounds = tooltipPath._center;
			tooltipText.set_x(pathBounds.x + paddingLeft - ((paddingLeft + paddingRight) / 2));
			tooltipText.set_y(pathBounds.y + (hookheight / 2) + paddingTop - ((paddingTop + paddingBottom) / 2));
			tooltipPath._hookDirection = "top";
		}
		else {
			tooltipPath._hookDirection = "bottom";
		}

		obj._tooltipShow = true;

		this.parent._graphicsControl.draw();
	};

	_pChartTooltipControl._moveTooltip = function (obj, canvasX, canvasY, boardRect) {
		if (!obj || !this.visible) {
			return;
		}
		var overitemid = obj.id;
		var s;
		if (overitemid.search("SeriesItemText_") >= 0) {
			if (obj._series) {
				if (this.parent._type_name == "BasicChart") {
					s = obj._series;
					if ((!s.linevisible && !s.pointvisible && !s.barvisible)) {
						return;
					}
				}
				if (this.parent._type_name == "RadarChart") {
					s = obj._series;
					if ((!s.linevisible && !s.pointvisible)) {
						return;
					}
				}
			}
		}
		if (!this._tooltipPath || !this._tooltipText) {
			this._clear();
			obj._tooltipShow = false;
			obj._preCanvasX = undefined;
			obj._preCanvasY = undefined;
			return;
		}

		if (obj._tooltipShow) {
			var preCanvasX = 0, preCanvasY = 0, offX = 0, offY = 0, tooltipPath = this._tooltipPath, tooltipText = this._tooltipText, txtRect = {
			}, txtWidth = 0, txtHeight = 0, paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0, padding = this._padding, linestyle = this._linestyle, borderwidth = 0, tooltipWidth = 0, tooltipHeight = 0, posRight = 0, posExtLeft = 0, posExtRight = 0, shiftXW = 0, shiftXE = 0, left = 0, top = 0, bound, hookheight = this.hookheight, hookwidth = this.hookwidth, tooltipOffsetY = this._offsety, tooltipOffsetX = this._offsetx;

			preCanvasX = obj._preCanvasX || canvasX;
			preCanvasY = obj._preCanvasY || canvasY;

			offX = canvasX - preCanvasX;
			offY = canvasY - preCanvasY;
			obj._preCanvasX = canvasX;
			obj._preCanvasY = canvasY;



			if ((this.hookheight == "" || this.hookheight == undefined) && this.hookheight !== 0) {
				hookheight = 5;
			}
			else {
				hookheight = this.hookheight;
			}
			if ((this.hookwidth == "" || this.hookwidth == undefined) && this.hookwidth !== 0) {
				hookwidth = 5;
			}
			else {
				hookwidth = this.hookwidth;
			}
			if (padding) {
				paddingLeft = padding.left;
				paddingRight = padding.right;
				paddingTop = padding.top;
				paddingBottom = padding.bottom;
			}
			else {
				paddingLeft = 5;
				paddingRight = 10;
				paddingTop = 5;
				paddingBottom = 10;
			}

			bound = tooltipPath._bounds;
			if (!bound) {
				return;
			}
			if (offX < 0 && bound.left < 0 && (Math.abs(bound.left) > boardRect.left)) {
				return;
			}
			else if (bound.width > this.parent._getClientWidth()) {
				return;
			}

			txtRect = tooltipText._getRect();
			txtWidth = txtRect.width;
			txtHeight = txtRect.height;
			borderwidth = linestyle ? linestyle._getBorderLeftWidth() : 1;

			tooltipWidth = txtWidth + paddingLeft + paddingRight + borderwidth;
			tooltipHeight = txtHeight + paddingTop + paddingBottom + borderwidth;

			var posX = canvasX;
			var posY = canvasY;
			posX -= tooltipOffsetX;
			posY -= tooltipOffsetY;

			posY -= (tooltipHeight / 2);
			posY -= hookheight;
			posExtLeft = (tooltipWidth / 2) + (borderwidth / 2);
			posExtRight = posX + posExtLeft;
			posRight = this.parent._getClientWidth();

			if (posExtLeft > posX) {
				return;
			}
			else if (posExtRight > posRight) {
				return;
			}

			if (tooltipPath) {
				tooltipPath.translate(offX, offY);
			}
			if (tooltipText) {
				tooltipText.translate(offX, offY);
			}

			if (tooltipPath._hookDirection == "bottom" && (bound.height + tooltipOffsetY > canvasY)) {
				var pathBounds = tooltipPath._center;
				tooltipPath.rotate(180);
				tooltipPath.translate(0, bound.height + (tooltipOffsetY * 2));
				tooltipText.translate(0, bound.height + (tooltipOffsetY * 2) + hookheight);
				tooltipPath._hookDirection = "top";
			}
			else if (tooltipPath._hookDirection == "top" && (bound.height + tooltipOffsetY < canvasY)) {
				tooltipPath.rotate(180);
				tooltipPath.translate(0, -(bound.height + (tooltipOffsetY * 2)));
				tooltipText.translate(0, -(bound.height + (tooltipOffsetY * 2) + hookheight));
				tooltipPath._hookDirection = "bottom";
			}

			this.parent._graphicsControl.draw();
		}
	};

	_pChartTooltipControl._hideTooltip = function (obj, canvasX, canvasY) {
		if (!this.visible) {
			return;
		}

		if (!this._tooltipPath || !this._tooltipText) {
			this._clear();
			obj._tooltipShow = false;
			obj._preCanvasX = undefined;
			obj._preCanvasY = undefined;
			return;
		}

		if (obj && !obj._tooltipShow) {
			return;
		}

		if (this._tooltipPath || this._tooltipText) {
			this._clear();

			obj._tooltipShow = false;
			obj._preCanvasX = undefined;
			obj._preCanvasY = undefined;
			this.parent._graphicsControl.draw();
		}
	};

	_pChartTooltipControl._clearTooltip = function (noDraw) {
		if (this._lasttooltip) {
			this._lasttooltip._tooltipShow = false;
			this._lasttooltip._preCanvasX = undefined;
			this._lasttooltip._preCanvasY = undefined;
			this._lasttooltip = null;

			this._clear();
			if (!noDraw) {
				this.parent._graphicsControl.draw();
			}
		}
	};
	_pChartTooltipControl._afterSetProperties = function () {
		this.on_apply_linestyle(this._linestyle);
		this.on_apply_background(this._background);
		this.on_apply_textfont(this._textfont);
		this.on_apply_textcolor(this._textcolor);
	};

	_pChartTooltipControl._getTooltipText = function (item) {
		var series, index, tooltiptext, tooltiptexttype, tooltiptextmask, chart = this.parent, charttype = chart._type_name, locale, textvalue;

		if (item) {
			index = item.index;
			series = item._series;
		}

		if (series) {
			tooltiptext = series.tooltiptext;
			tooltiptexttype = series.tooltiptexttype;
			tooltiptextmask = series.tooltiptextmask;
			locale = series.locale;
		}

		if (tooltiptext) {
			textvalue = tooltiptext._value;
			if (textvalue == undefined || textvalue == null) {
				if (series.itemtext && series.itemtext != "") {
					tooltiptext = series.itemtext;
				}
				else {
					tooltiptext = series.valuecolumn;
				}
			}
			else if (textvalue == "") {
				tooltiptext = undefined;
			}
		}
		tooltiptext = nexacro._getChartDisplaytText(index, tooltiptext, locale, tooltiptexttype, tooltiptextmask, chart, this);

		return tooltiptext;
	};

	_pChartTooltipControl._getPieTooltipText = function (item) {
		var seriesitem, series, index, valuedata, tooltiptext, tooltiptexttype, tooltiptextmask, chart = this.parent, locale, textvalue;

		if (item) {
			series = item._series;
			seriesitem = item._seriesItem;
		}

		if (seriesitem) {
			index = seriesitem.index;
			valuedata = seriesitem.value;
		}

		if (series) {
			tooltiptext = series.tooltiptext;
			tooltiptexttype = series.tooltiptexttype;
			tooltiptextmask = series.tooltiptextmask;
			locale = series.locale;
		}

		if (tooltiptext) {
			textvalue = tooltiptext._value;
			if (textvalue == undefined || textvalue == null) {
				if (series.itemtext && series.itemtext != "") {
					tooltiptext = series.itemtext;
				}
				else {
					tooltiptext = valuedata;
				}
			}
			else if (textvalue == "") {
				tooltiptext = undefined;
			}
		}
		tooltiptext = nexacro._getChartDisplaytText(index, tooltiptext, locale, tooltiptexttype, tooltiptextmask, chart, this);

		return tooltiptext;
	};

	_pChartTooltipControl._changeContentsProperty = function (nm, newVal, oldVal) {
		var contents = this.parent.contents;
		if (contents && contents.tooltip) {
			contents.tooltip[nm] = newVal;
		}
	};

	delete _pChartTooltipControl;
}

if (!nexacro._getChartDisplaytText) {
	nexacro._getChartDisplaytText = function (idx, text, locale, type, mask, chart, targetcontrol) {
		var displaytext;


		if (type == "normal") {
			var t = text;
			if (t instanceof nexacro.BindableValue && t._bindtype == 1) {
				var dataset = chart._binddataset;
				if (!dataset) {
					return "text";
				}
				var colid = t._bindexpr;
				var coltype = dataset._getColumnType(colid);

				displaytext = this._getChartAttrValue(text, idx, mask, chart);
				switch (coltype) {
					case 1:
						return this._getChartDisplayText_text(displaytext, idx, mask, chart);
					case 2:
					case 3:
					case 4:
						return this._getChartDisplayText_number(displaytext, idx, locale, mask, chart);
					default:
						{

							if (targetcontrol && targetcontrol._type_name == "ChartCategoryAxisControl" && chart.categoryaxis && chart.categoryaxis._isTimeAxis == true) {
								return this._getChartDisplayText_datetime2(displaytext, idx, locale, mask, chart);
							}
							else {
								return this._getChartDisplayText_text(displaytext, idx, mask, chart);
							}
						}
				}
			}
			else {
				displaytext = this._getChartAttrValue(text, idx, mask, chart);
				if (mask && mask.length) {
					if (targetcontrol && targetcontrol._type_name == "ChartCategoryAxisControl" && chart.categoryaxis && chart.categoryaxis._isTimeAxis == true) {
						return this._getChartDisplayText_datetime2(displaytext, idx, locale, mask, chart);
					}
					else {
						return this._getChartDisplayText_text(displaytext, idx, mask, chart);
					}
				}
				else {
					return displaytext;
				}
			}
		}
		else {
			displaytext = this._getChartAttrValue(text, idx, mask, chart);
			if (targetcontrol && targetcontrol._type_name == "ChartCategoryAxisControl" && chart.categoryaxis && chart.categoryaxis._isTimeAxis == true) {
				return this._getChartDisplayText_datetime2(displaytext, idx, locale, mask, chart);
			}

			if (type == "text") {
				return this._getChartDisplayText_text(displaytext, idx, mask, chart);
			}
			else if (type == "number") {
				return this._getChartDisplayText_number(displaytext, idx, locale, mask, chart);
			}
			else if (type == "currency") {
				return this._getChartDisplayText_currency(displaytext, idx, locale, mask, chart);
			}
		}

		return displaytext;
	};

	nexacro._getChartAttrValue = function (attr, rowidx, mask, chart) {
		if (attr == undefined) {
			return undefined;
		}

		if (attr._bindtype == undefined) {
			return attr;
		}
		else if (attr._bindtype == 0) {
			return attr._value;
		}
		else {
			var dataset = chart._binddataset;

			if (dataset == null) {
				return undefined;
			}

			if (attr._bindtype == 1) {
				return dataset.getColumn(rowidx, attr._bindexpr);
			}
			else {
				var bindexpr = attr._bindexpr;
				var val = attr._value;
				var s = val.toLowerCase().indexOf("bind:");
				if (s >= 0) {
					bindexpr = bindexpr.substring(s, bindexpr.length);
					bindexpr = dataset.getColumn(rowidx, bindexpr);
				}

				var exprfn;

				if (exprfn == null) {
					exprfn = dataset._createExprFunc(bindexpr);
				}

				if ((typeof exprfn) == "function") {
					return exprfn.call(chart, rowidx, rowidx, chart, dataset, dataset._viewRecords, dataset._viewRecords[rowidx], []);
				}

				return bindexpr;
			}
		}
		return undefined;
	};
	nexacro._getChartDisplayText_datetime2 = function (value, rowidx, locale, mask, chart) {
		if (value != null) {
			value = value.toString();
		}
		var maskobj = chart._maskdatetypeobj;
		if (mask && mask.length) {
			maskobj.setLocale(locale);
			maskobj.setDateMask(mask);
			maskobj.setEditMask(mask);
			value = maskobj.applyMask(value);
		}
		else {
			return this._getChartDisplayText_text(value, rowidx, mask, chart);
		}
		return value;
	};
	nexacro._getChartDisplayText_text = function (value, rowidx, mask, chart) {
		if (value != null) {
			value = value.toString();
		}

		var maskobj = chart._maskstringtypeobj;

		if (mask && mask.length) {
			maskobj.maskchar = "";
			maskobj.setMask(mask);
			value = maskobj.applyMask(value);
		}

		return value;
	};

	nexacro._getChartDisplayText_number = function (value, rowidx, locale_, mask, chart) {
		var locale = this._getChartLocale(rowidx, locale_, mask, chart);
		var maskobj = chart._masknumbertypeobj;

		if (!mask || mask === ".") {
			maskobj.setUseGrouping(true);
		}
		maskobj.setLimitType("decimal");
		maskobj.setLocale(locale);
		maskobj.setMask(mask);
		value = maskobj.applyMask(value);

		return value;
	};

	nexacro._getChartDisplayText_currency = function (value, rowidx, locale_, mask, chart) {
		var locale = this._getChartLocale(rowidx, locale_, "", chart);

		if (!isNaN(value)) {
			var nexanum = new nexacro.Number(value);
			value = nexanum.toLocaleCurrencyString(locale);
		}

		return value;
	};

	nexacro._getChartDisplayText_date = function (value, rowidx, locale_, mask_, chart, colType) {
		var dataset = chart._binddataset;

		if (dataset && dataset.getRowCount() <= rowidx) {
			return "";
		}

		var v = value;
		var date = undefined;
		var null_test = 0;
		var nullmask = false;
		var is_date_empty = false;
		var mask = this._getChartAttrValue(mask_, rowidx);

		v = (v) ? v : "";

		if (v.constructor == Date) {
			date = v;
		}
		else {
			var strVal = v.toString();

			for (var i = 0; i < strVal.length; i++) {
				if (strVal.charAt(i) != " ") {
					null_test = 1;
					break;
				}
			}

			if (null_test == 1) {
				if (colType == undefined) {
					if (!mask && strVal.length <= 6) {
						colType = 0;
					}
					else if (!mask && strVal.length <= 8) {
						colType = 2;
					}
					else {
						colType = 1;
					}
				}

				if (colType == 1) {
					v._timecheck = true;
				}

				date = this.__parseDate(strVal, colType, rowidx, mask);
			}
			else {
				if (colType == 1) {
					v._timecheck = true;
				}

				else {
					return "";
				}
			}
		}

		if (date == null) {
			is_date_empty = true;
			date = new nexacro.Date();
			date.setFullYear(0);
			date.setMonth(0);
			date.setDate(1);
		}

		var dateStr;
		var locale = this._getChartLocale(rowidx, locale_, mask, chart);
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var format = "";

		if (mask == "SHORTDATE" || mask == "LONGDATE") {
			locale_info = nexacro.Locale.getLocaleInfo(locale);
			format = "";

			if (mask == "SHORTDATE") {
				format = locale_info.shortdate_format;
			}
			else {
				format = locale_info.longdate_format;
			}

			if (format == "") {
				format = nexacro.Locale._default_shortdate_format;
			}

			var b_ltr_mark = (!chart._isRtl() && locale_info.direction == "rtl") ? true : false;

			dateStr = date.getLocaleFormatString(locale, format, b_ltr_mark);
		}
		else {
			var yyyy = date.getFullYear();
			if (yyyy == 0) {
				yyyy = "0000";
			}

			var MM = date.getMonth() + 1;
			MM = (MM < 10 ? "0" : "") + MM;

			var dddd = locale_info.weekday_names_long[date.getDay()];
			var ddd = locale_info.weekday_names_short[date.getDay()];
			var dd = date.getDate();

			dd = (dd < 10 ? "0" : "") + dd;

			var yy = date.getYear() % 100;
			var M = +MM;
			var d = +dd;

			var hour = date.getHours();
			hour = (hour < 10 ? "0" : "") + hour;
			var h = +hour;

			var minute = date.getMinutes();
			minute = (minute < 10 ? "0" : "") + minute;
			var mn = +minute;

			var second = date.getSeconds();
			second = (second < 10 ? "0" : "") + second;

			var s = +second;

			if (is_date_empty) {
				hour = h = "00";
				minute = mn = "00";
				second = s = "00";
			}

			format = mask;

			if (format == null || format.length == 0 || !format.match(/[yMdHhms]/)) {
				format = "yyyy-MM-dd";
			}

			if (nullmask) {
				var maskchar1 = this.maskchar;
				var maskchar2 = maskchar1 + maskchar1;
				var maskchar3 = maskchar2 + maskchar1;
				var maskchar4 = maskchar3 + maskchar1;

				dateStr = format.replace("yyyy", maskchar4);
				dateStr = dateStr.replace("MM", maskchar2);
				dateStr = dateStr.replace("ddd", "week");
				dateStr = dateStr.replace("dd", maskchar2);
				dateStr = dateStr.replace("yy", maskchar2);
				dateStr = dateStr.replace("M", maskchar1);
				dateStr = dateStr.replace("d", maskchar1);
				dateStr = dateStr.replace("tt", maskchar2);
				dateStr = dateStr.replace("HH", maskchar2);
				dateStr = dateStr.replace("hh", maskchar2);
				dateStr = dateStr.replace("H", maskchar1);
				dateStr = dateStr.replace("h", maskchar1);
				dateStr = dateStr.replace("mm", maskchar2);
				dateStr = dateStr.replace("m", maskchar1);
				dateStr = dateStr.replace("ss", maskchar2);
				dateStr = dateStr.replace("s", maskchar1);
				dateStr = dateStr.replace("weekL", maskchar4);
				dateStr = dateStr.replace("week", maskchar3);
			}
			else {
				dateStr = format.replace("yyyy", yyyy);
				dateStr = dateStr.replace("MM", MM);
				dateStr = dateStr.replace("dddd", "weekL");
				dateStr = dateStr.replace("ddd", "week");
				dateStr = dateStr.replace("dd", dd);
				dateStr = dateStr.replace("yy", yy);
				dateStr = dateStr.replace("M", M);
				dateStr = dateStr.replace("d", d);

				var hh = hour;
				var tt = "오전";
				if (hour > 12 && hour < 25) {
					hh = hour < 22 ? "0" + (hour - 12) : hour - 12;
					tt = "오후";
				}

				dateStr = dateStr.replace("tt", tt);
				dateStr = dateStr.replace("HH", hour);
				dateStr = dateStr.replace("hh", hh);
				dateStr = dateStr.replace("H", h);
				dateStr = dateStr.replace("h", h);
				dateStr = dateStr.replace("mm", minute);
				dateStr = dateStr.replace("m", mn);
				dateStr = dateStr.replace("ss", second);
				dateStr = dateStr.replace("s", s);
				dateStr = dateStr.replace("week", ddd);
			}
		}

		return dateStr;
	};

	nexacro._getChartDisplayText_date2 = function (value, rowidx, locale, mask, chart) {
		return this._getChartDisplayText_date(value, rowidx, locale, mask, chart, 2);
	};

	nexacro._getChartDisplayText_datetime = function (value, rowidx, locale, mask, chart) {
		return this._getChartDisplayText_date(value, rowidx, locale, mask, chart, 1);
	};

	nexacro._getChartDisplayText_time = function (value, rowidx, locale, mask, chart) {
		return this._getChartDisplayText_date(value, rowidx, locale, mask, chart, 0);
	};

	nexacro._getChartLocale = function (rowidx, locale_, mask, chart) {
		var locale = this._getChartAttrValue(locale_, rowidx, mask, chart);
		if (!locale) {
			locale = chart._getLocale();
		}

		return locale;
	};

	nexacro.__parseDate = function (v, dFlag, rowidx, mask) {
		var regexp;
		switch (dFlag) {
			case 0:
				regexp = /(\d{6})/;
				break;
			case 1:
				regexp = /(\d{14})/;
				break;
			default:
				regexp = /(\d{8})/;
				break;
		}



		var date = new nexacro.Date();
		var year;
		var month;
		var day;
		var hour;
		var min;
		var sec;
		if (dFlag > 0) {
			year = +v.substring(0, 4);
			month = +v.substring(4, 6);
			day = +v.substring(6, 8);


			if (month < 1 || month > 12) {
				return undefined;
			}
			if (day < 1) {
				return undefined;
			}

			if (dFlag == 1) {
				hour = +v.substring(8, 10);
				min = +v.substring(10, 12);
				sec = +v.substring(12, 14);
			}
			else {
				hour = 0;
				min = 0;
				sec = 0;
			}
		}
		else {
			year = 1900;
			month = 1;
			day = 1;
			hour = +v.substring(0, 2);
			min = +v.substring(2, 4);
			sec = +v.substring(4, 6);
		}
		date.setHours(hour, min, sec);
		date.setFullYear(year, month - 1, day);
		return date;
	};
}

if (!nexacro._getBeforeKey) {
	nexacro._getCharCodeArr = function (key) {
		if (!key || !key.length) {
			return false;
		}
		var c, result = [];
		for (var i = 0, len = key.length; i < len; i++) {
			c = key.charCodeAt(i);
			result[i] = c;
		}
		if (result[result.length - 1] == 48) {
			return false;
		}
		return result;
	};

	nexacro._getBeforeKey = function (curKey, isRetChrArr) {
		var charCodeArr;
		if (!nexacro._GraphicsLib.isArray(curKey)) {
			if (!(charCodeArr = this._getCharCodeArr(curKey))) {
			}
		}
		else {
			charCodeArr = curKey.slice(0);
		}
		var at = charCodeArr.length - 1;
		var c = charCodeArr[at], min = 48, max = 122;
		if (c > min + 1) {
			--c;
			if (c == 96) {
				c = 57;
			}
			charCodeArr[at] = c;
			if (isRetChrArr) {
				return charCodeArr;
			}
			return String.fromCharCode.apply(null, charCodeArr);
		}
		while (at > 0) {
			charCodeArr[at] = max;
			--at;
			c = charCodeArr[at];
			if (c > min) {
				--c;
				if (c == 96) {
					c = 57;
				}
				charCodeArr[at] = c;
				if (isRetChrArr) {
					return charCodeArr;
				}
				return String.fromCharCode.apply(null, charCodeArr);
			}
		}
		for (var i = 0, len = charCodeArr.length; i < len; i++) {
			charCodeArr[i] = min;
		}
		this._expand(charCodeArr, max);
		if (isRetChrArr) {
			return charCodeArr;
		}
		return String.fromCharCode.apply(null, charCodeArr);
	};

	nexacro._getAfterKey = function (curKey, isRetChrArr) {
		var charCodeArr;
		if (!nexacro._GraphicsLib.isArray(curKey)) {
			if (!(charCodeArr = this._getCharCodeArr(curKey))) {
			}
		}
		else {
			charCodeArr = curKey.slice(0);
		}
		var at = charCodeArr.length - 1;
		var min = 48, minCharToUse = min + 1, max = 122;
		var c;
		while (at >= 0) {
			c = charCodeArr[at];
			if (c < max) {
				c = c + 1;
				if (c == 58) {
					c = 97;
				}
				charCodeArr[at] = c;
				if (isRetChrArr) {
					return charCodeArr;
				}
				return String.fromCharCode.apply(null, charCodeArr);
			}

			charCodeArr[at] = minCharToUse;
			minCharToUse = min;
			--at;
		}
		for (var i = 0, len = charCodeArr.length; i < len; i++) {
			charCodeArr[i] = max;
		}
		this._expand(charCodeArr, min);
		if (isRetChrArr) {
			return charCodeArr;
		}
		return String.fromCharCode.apply(null, charCodeArr);
	};

	nexacro._getBetweenKey = function (aKey, bKey) {
		var aCharCodeArr = this._getCharCodeArr(aKey), bCharCodeArr, newKey;
		if (!aCharCodeArr) {
			bCharCodeArr = this._getCharCodeArr(bKey);
			if (!bCharCodeArr) {
			}
			return this._getBeforeKey(bCharCodeArr);
		}

		bCharCodeArr = this._getCharCodeArr(bKey);
		if (!bCharCodeArr) {
			return this._getAfterKey(aCharCodeArr);
		}

		if (aKey >= bKey) {
		}

		var minLen = Math.min(aCharCodeArr.length, bCharCodeArr.length);

		var at = 0;
		while (at < minLen && aCharCodeArr[at] == bCharCodeArr[at]) {
			++at;
		}

		var newCharCodeArr, midVal, rangeCharIndex = this._rangeCharIndex;
		if (at < minLen && parseInt(bCharCodeArr[at] - aCharCodeArr[at]) >= 2) {
			newCharCodeArr = aCharCodeArr;
			midVal = parseInt((rangeCharIndex[aCharCodeArr[at]] + rangeCharIndex[bCharCodeArr[at]] + 1) / 2);
			var avgCharCode = rangeCharIndex[midVal];
			newCharCodeArr[at] = avgCharCode;
			newCharCodeArr.length = at + 1;
			return String.fromCharCode.apply(null, newCharCodeArr);
		}

		if (aCharCodeArr.length > bCharCodeArr.length) {
			newKey = this._getAfterKey(aCharCodeArr);
			if (newKey < bKey) {
				return newKey;
			}
		}

		if (bCharCodeArr.length > aCharCodeArr.length) {
			newKey = this._getBeforeKey(bCharCodeArr);
			if (newKey > aKey) {
				return newKey;
			}
		}

		var min = 48, c;
		newCharCodeArr = aCharCodeArr.slice(0);
		while (newCharCodeArr.length < bCharCodeArr.length) {
			c = bCharCodeArr[newCharCodeArr.length];
			if (c > min + 1) {
				midVal = parseInt((rangeCharIndex[c] + 1) / 2);
				c = rangeCharIndex[midVal];
				newCharCodeArr[newCharCodeArr.length] = c;
				return String.fromCharCode.apply(null, newCharCodeArr);
			}
			newCharCodeArr[newCharCodeArr.length] = min;
		}
		var max = 122;
		while (newCharCodeArr.length < aCharCodeArr.length) {
			c = aCharCodeArr[newCharCodeArr.length];
			if (c < max - 1) {
				midVal = parseInt((35 + rangeCharIndex[c] + 1) / 2);
				c = rangeCharIndex[midVal];
				newCharCodeArr[newCharCodeArr.length] = c;
				return String.fromCharCode.apply(null, newCharCodeArr);
			}
			newCharCodeArr[newCharCodeArr.length] = max;
		}

		this._expand(newCharCodeArr, 105);
		return String.fromCharCode.apply(null, newCharCodeArr);
	};

	nexacro._expand = function (charcodeArr, c) {
		var expandBy = 3, arrLen = charcodeArr.length;
		for (var i = 0, len = expandBy - 1; i < len; ++i) {
			charcodeArr[arrLen] = c;
			arrLen++;
		}
		if (c == 48) {
			++c;
		}
		charcodeArr[charcodeArr.length] = c;
	};
}

if (!nexacro._DatasetMap) {
	nexacro._DatasetMap = function (allowDuplicates) {
		this._allowDuplicates = allowDuplicates;
		this.clear();
	};

	var _pDatasetMap = nexacro._createPrototype(nexacro.Object, nexacro._DatasetMap);
	nexacro._DatasetMap.prototype = _pDatasetMap;

	_pDatasetMap.clear = function () {
		this.keyMap = {
		};
		if (this._btree) {
			this._btree.clear();
		}
		else {
			this._btree = new nexacro._BTree("insertOrder");
		}
	};

	_pDatasetMap.forEach = function (f) {
		var _self = this;
		this._btree.forEach(function (val) {
			f.call(_self, val.key, val.value);
		});
	};

	_pDatasetMap.toArray = function (start, len) {
		return this._btree.getValues(start, len);
	};

	_pDatasetMap.containsKey = function (key) {
		return key in this.keyMap;
	};

	_pDatasetMap.findRowByKey = function (key) {
		var data = this.keyMap[key];
		if (data) {
			if (this._allowDuplicates) {
				if (nexacro._GraphicsLib.isArray(data) && data._dataArray === true) {
					data = data[0];
				}
			}
			return this._btree.getIndex(data);
		}
		return -1;
	};

	_pDatasetMap.insert = function (row, key, data, cnt) {
		if (!key && cnt) {
			key = "key:" + (cnt + 1);
		}

		if (!this._allowDuplicates && this.containsKey(key)) {
			return false;
		}
		var btree = this._btree;
		if (row < 0 || row >= btree.getCount()) {
			return this.add(key, data);
		}
		data.key = key;
		btree.insertBefore(row, data);
		var map = this.keyMap;
		if (this._allowDuplicates && this.containsKey(key)) {
			var dataArr = map[key];
			if (nexacro._GraphicsLib.isArray(dataArr) && dataArr._dataArray === true) {
				dataArr.push(data);
			}
			else {
				dataArr = [dataArr, data];
				dataArr._dataArray = true;
				map[key] = dataArr;
			}
		}
		else {
			map[key] = data;
		}
		return true;
	};

	_pDatasetMap.add = function (key, data) {
		if (!this._allowDuplicates && this.containsKey(key)) {
			return false;
		}
		data.key = key;
		this._btree.add(data);
		var map = this.keyMap;
		if (this._allowDuplicates && this.containsKey(key)) {
			var dataArr = map[key];
			if (nexacro._GraphicsLib.isArray(dataArr) && dataArr._dataArray === true) {
				dataArr.push(data);
			}
			else {
				dataArr = [dataArr, data];
				dataArr._dataArray = true;
				map[key] = dataArr;
			}
		}
		else {
			map[key] = data;
		}
		return true;
	};

	_pDatasetMap.removeAt = function (row) {
		var btree = this._btree, map = this.keyMap;
		var data = btree.getAt(row, true);
		if (data) {
			var refRoot = {
				root : btree.root
			};
			btree._nodeRemove(data[1], data[2], refRoot);
			btree.root = refRoot.root;
			var key = data[0].key;
			if (this._allowDuplicates && this.containsKey(key)) {
				var dataArr = map[key];
				if (nexacro._GraphicsLib.isArray(dataArr) && dataArr._dataArray === true) {
					var idx = nexacro._GraphicsLibArray.indexOf(dataArr, data, 0, true);
					if (idx > -1) {
						dataArr.splice(idx, 1);
						if (!dataArr.length) {
							delete map[key];
						}
					}
				}
				else {
					delete map[key];
				}
			}
			else {
				delete map[key];
			}
			return true;
		}
		return false;
	};

	_pDatasetMap.removeAtKey = function (key) {
		if (!this._allowDuplicates && !this.containsKey(key)) {
			return false;
		}
		var btree = this._btree, map = this.keyMap, data = map[key];

		if (data) {
			if (this._allowDuplicates && this.containsKey(key)) {
				var dataArr = map[key];
				if (nexacro._GraphicsLib.isArray(dataArr) && dataArr._dataArray === true) {
					for (var i = 0, len = dataArr.length; i < len; i++) {
						btree.remove(dataArr[i]);
					}
					delete map[key];
				}
				else {
					btree.remove(data);
					delete map[key];
				}
			}
			else {
				btree.remove(data);
				delete map[key];
			}
			return true;
		}
	};

	_pDatasetMap.buildDataWithDataset = function (ds, keyColumnId, createDataFunc, scope) {
		this.clear();
		var key, data, btree = this._btree, keyvals = this.keyMap;
		for (var i = 0, len = ds.rowcount; i < len; i++) {
			if (!nexacro._GraphicsLib.isEmpty(keyColumnId)) {
				key = ds.getColumn(i, keyColumnId) + "";
			}
			else {
				key = "key:" + (i + 1);
			}
			data = createDataFunc.call(scope, ds, i, key);
			data.key = key;
			keyvals[key] = data;
			btree.add(data);
		}
	};

	_pDatasetMap.changeKey = function (data, key, row, createDataFunc, scope) {
		var oldKey = data.key, remove = false, dataArr, map = this.keyMap;

		if (this._allowDuplicates && this.containsKey(oldKey)) {
			dataArr = map[oldKey];
			if (nexacro._GraphicsLib.isArray(dataArr) && dataArr._dataArray === true) {
				var idx = nexacro._GraphicsLibArray.indexOf(dataArr, data, 0, true);
				if (idx > -1) {
					dataArr.splice(idx, 1);
					if (!dataArr.length) {
						delete map[oldKey];
						remove = true;
					}
				}
			}
			else {
				delete map[oldKey];
				remove = true;
			}
		}
		else {
			delete map[oldKey];
			remove = true;
		}
		data.key = key;
		if (this._allowDuplicates && this.containsKey(key)) {
			dataArr = map[key];
			if (nexacro._GraphicsLib.isArray(dataArr) && dataArr._dataArray === true) {
				dataArr.push(data);
			}
			else {
				dataArr = [dataArr, data];
				dataArr._dataArray = true;
				map[key] = dataArr;
			}
		}
		else {
			map[key] = data;
		}
	};

	_pDatasetMap.getAt = function (row) {
		if (row < 0 || row >= this._btree.getCount()) {
			return null;
		}
		return this._btree.getAt(row);
	};

	_pDatasetMap.setAt = function (row, data) {
		if (row < 0 || row >= this._btree.getCount()) {
			return false;
		}
		this._btree.setAt(row, data);
		return true;
	};
	_pDatasetMap.getByKey = function (key) {
		var data = this.keyMap[key];
		if (data) {
			if (this._allowDuplicates) {
				if (nexacro._GraphicsLib.isArray(data) && data._dataArray === true) {
					data = data[0];
				}
			}
		}
		return data;
	};

	_pDatasetMap.exchangeRow = function (row1, row2) {
		var btree = this._btree;
		if (row1 < 0 || row1 >= btree.getCount()) {
			return false;
		}
		if (row2 < 0 || row2 >= btree.getCount()) {
			return false;
		}

		var dataAtRow1 = btree.getAt(row1, true);
		var dataAtRow2 = btree.getAt(row2, true);

		var rowKey1 = dataAtRow1[0].rowKey;
		var rowKey2 = dataAtRow2[0].rowKey;

		dataAtRow1[0].rowKey = rowKey2;
		dataAtRow2[0].rowKey = rowKey1;
		dataAtRow1[1].keys[dataAtRow1[2]] = dataAtRow2[0];
		dataAtRow2[1].keys[dataAtRow2[2]] = dataAtRow1[0];
		btree._ensureParentKey(dataAtRow1[1], dataAtRow1[2]);
		btree._ensureParentKey(dataAtRow2[1], dataAtRow2[2]);
		return true;
	};

	_pDatasetMap.moveRow = function (oldRow, newRow) {
		var btree = this._btree;
		if (oldRow < 0 || oldRow >= btree.getCount()) {
			return false;
		}

		var oldDataAtRow = btree.getAt(oldRow, true);
		if (oldDataAtRow) {
			var refRoot = {
				root : btree.root
			};
			btree._nodeRemove(oldDataAtRow[1], oldDataAtRow[2], refRoot);
			btree.root = refRoot.root;
			var map = this.keyMap;
			var key = oldDataAtRow[0].key;
			if (this._allowDuplicates && this.containsKey(key)) {
				var dataArr = map[key];
				if (nexacro._GraphicsLib.isArray(dataArr) && dataArr._dataArray === true) {
					var idx = nexacro._GraphicsLibArray.indexOf(dataArr, oldDataAtRow, 0, true);
					if (idx > -1) {
						dataArr.splice(idx, 1);
						if (!dataArr.length) {
							delete map[key];
						}
					}
				}
				else {
					delete map[key];
				}
			}
			else {
				delete map[key];
			}
			return this.insert(newRow, oldDataAtRow[0].key, oldDataAtRow[0]);
		}
		return false;
	};

	delete _pDatasetMap;
}

if (!nexacro._BTree) {
	nexacro._BTree = function (compare, capacity) {
		if (nexacro._GraphicsLib.isFunction(compare)) {
			this.compare = compare;
		}
		else {
			if (compare == "insertOrder") {
				this._insertedKey = true;
				this.compare = this._defaultInsertOrderCompare;
			}
			else {
				this.compare = this._defaultCompare;
			}
		}
		this._capacity = capacity == null ? 128 : capacity;
		this.first = this._makeNode(true);
		if (this._insertedKey) {
			this.last = this.first;
		}
		this.root = this.first;
	};

	var _pBTree = nexacro._createPrototype(nexacro.Object, nexacro._BTree);
	nexacro._BTree.prototype = _pBTree;

	_pBTree._defaultInsertOrderCompare = function (a, b) {
		if (a.rowKey > b.rowKey) {
			return 1;
		}
		if (a.rowKey < b.rowKey) {
			return -1;
		}
		return 0;
	};

	_pBTree._defaultCompare = function (a, b) {
		if (a == b) {
			return 0;
		}
		if (a == null || a < b) {
			return -1;
		}
		if (b == null || a > b) {
			return 1;
		}
	};

	_pBTree.setAllowDuplicates = function (val) {
		this.allowDuplicates = val;
	};

	_pBTree._makeNode = function (leaf) {
		var node = {
			"keys" : [], 
			"nodes" : null, 
			"nodeCount" : 0, 
			"totalCount" : 0, 
			"parent" : null, 
			"next" : null, 
			"prev" : null
		};
		if (!leaf) {
			node.nodes = [];
		}
		return node;
	};

	_pBTree.getValues = function (startIdx, len) {
		if (startIdx == null) {
			startIdx = 0;
		}
		if (len == null) {
			len = this.getCount();
		}
		len = startIdx + len;
		var res = [];
		var leaf = this.first, idx = 0, keys, resIdx = 0, rootIdx = 0;
		while (leaf) {
			if (rootIdx + leaf.nodeCount < startIdx) {
				rootIdx += leaf.nodeCount - 1;
				continue;
			}
			else if (rootIdx + leaf.nodeCount > len) {
				break;
			}
			else {
				keys = leaf.keys;
				for (var i = 0, keysLen = keys.length; i < keysLen; i++) {
					if (startIdx <= rootIdx && rootIdx < len) {
						res[resIdx] = keys[i];
						resIdx++;
					}
					rootIdx++;
				}
			}
			leaf = leaf.next;
		}
		return res;
	};

	_pBTree.forEach = function (f) {
		var node = this.first;
		for (; node; node = node.next) {
			var keys = node.keys;
			for (var i = 0, len = keys.length; i < len; i++) {
				f.call(this, keys[i]);
			}
		}
	};

	_pBTree.getCount = function () {
		return this.root.totalCount;
	};

	_pBTree.getIndex = function (value) {
		var refVal = {
			"leaf" : null, 
			"pos" : null
		};
		var found = this._nodeFind(this.root, value, this.compare, 0, refVal);
		if (found) {
			var idx = this._getRootIndex(refVal.leaf, refVal.pos);
			return idx;
		}
		return -1;
	};

	_pBTree.getAt = function (index, isLeafInfo) {
		if (index < 0 || index >= this.getCount()) {
			return;
		}
		var idx = {
			"index" : index
		};
		var leaf = this._nodeLeafAt(this.root, idx);
		if (isLeafInfo) {
			return [leaf.keys[idx.index], leaf, idx.index];
		}
		return leaf.keys[idx.index];
	};

	_pBTree.setAt = function (index, value) {
		if (index < 0 || index >= this.getCount()) {
		}
		var idx = {
			"index" : index
		};
		var leaf = this._nodeLeafAt(this.root, idx);
		leaf.keys[idx.index] = value;
	};

	_pBTree.contain = function (value) {
		var refVal = {
			"leaf" : null, 
			"pos" : null
		};
		return this._nodeFind(this.root, value, this.compare, 0, refVal);
	};

	_pBTree.insertBefore = function (index, value) {
		if (this._insertedKey) {
			var idx;
			if (index < 0 || this.getCount() <= index) {
				return this.add(value);
			}
			else {
				idx = {
					"index" : index
				};
				var leaf = this._nodeLeafAt(this.root, idx);
				var refRoot = {
					root : this.root
				}, keys, pos = idx.index;
				if (index == 0) {
					value.rowKey = nexacro._getBeforeKey(leaf.keys[pos].rowKey);
				}
				else {
					var prevValue;
					if (pos == 0) {
						keys = leaf.prev.keys;
						prevValue = keys[keys.length - 1];
					}
					else {
						keys = leaf.keys;
						prevValue = keys[pos - 1];
					}
					value.rowKey = nexacro._getBetweenKey(prevValue.rowKey, leaf.keys[pos].rowKey);
				}
				this._nodeInsert(value, leaf, pos, refRoot);
				this.root = refRoot.root;
				return true;
			}
		}
		return false;
	};

	_pBTree.add = function (value) {
		var refRoot;
		if (this._insertedKey) {
			var leaf = this.last, pos = leaf.keys.length;
			if (this.getCount() == 0) {
				value.rowKey = "1";
			}
			else {
				value.rowKey = nexacro._getAfterKey(leaf.keys[pos - 1].rowKey);
			}
			refRoot = {
				root : this.root
			};
			this._nodeInsert(value, leaf, pos, refRoot);
			this.root = refRoot.root;
		}
		else {
			var refVal = {
				"leaf" : null, 
				"pos" : null
			};
			var found = this._nodeFind(this.root, value, this.compare, 0, refVal);
			if (found && !this.allowDuplicates) {
			}
			refRoot = {
				root : this.root
			};
			this._nodeInsert(value, refVal.leaf, refVal.pos, refRoot);
			this.root = refRoot.root;
		}
		return true;
	};

	_pBTree.clear = function () {
		this._nodeClear(this.first);
		this.root = this.first;
		if (this._insertedKey) {
			this.last = this.first;
		}
	};

	_pBTree.remove = function (value) {
		var refVal = {
			"leaf" : null, 
			"pos" : null
		};
		if (!this._nodeFind(this.root, value, this.compare, 0, refVal)) {
			return false;
		}
		var refRoot = {
			root : this.root
		};
		this._nodeRemove(refVal.leaf, refVal.pos, refRoot);
		this.root = refRoot.root;
		return true;
	};

	_pBTree.removeAt = function (index) {
		if (index < 0 || index >= this.getCount()) {
		}
		var idx = {
			"index" : index
		};
		var leaf = this._nodeLeafAt(this.root, idx);
		var refRoot = {
			root : this.root
		};
		this._nodeRemove(leaf, idx.index, refRoot);
		this.root = refRoot.root;
	};

	_pBTree._nodeLeafAt = function (r, refpos) {
		var nodeidx = 0, node, pos = refpos.index;
		var dir = pos > r.totalCount / 2 ? -1 : 1;
		if (dir < 0) {
			if (r.nodes == null) {
				refpos.index = pos;
				return r;
			}
			nodeidx = r.nodes.length - 1;
			pos = r.totalCount - pos;
		}

		while (true) {
			if (r.nodes == null) {
				refpos.index = pos;
				return r;
			}
			node = r.nodes[nodeidx];
			if (dir > 0) {
				if (pos < node.totalCount) {
					r = node;
					if (r.nodes == null) {
						refpos.index = pos;
						return r;
					}
					dir = pos > r.totalCount / 2 ? -1 : 1;
					if (dir < 0) {
						nodeidx = r.nodes.length - 1;
						pos = r.totalCount - pos;
					}
					else {
						nodeidx = 0;
					}
				}
				else {
					pos -= node.totalCount;
					++nodeidx;
				}
			}
			else {
				if (pos < node.totalCount) {
					pos = node.totalCount - pos;
					r = node;
					if (r.nodes == null) {
						refpos.index = pos;
						return r;
					}
					dir = pos > r.totalCount / 2 ? -1 : 1;
					if (dir < 0) {
						nodeidx = r.nodes.length - 1;
						pos = r.totalCount - pos;
					}
					else {
						nodeidx = 0;
					}
				}
				else {
					pos += node.totalCount;
					--nodeidx;
				}
			}
		}
	};

	_pBTree._nodeFind = function (r, key, keycompare, duplicatesBias, refVal) {
		var arrayUtil = nexacro._GraphicsLibArray, tmpRefval = {
		}, rowseq = 0;
		var pos = arrayUtil.binarySearch(r.keys, 0, r.nodeCount, key, keycompare), prevR = r, prevPos = pos;
		while (r.nodes != null) {
			if (pos >= 0) {
				if (duplicatesBias != 0) {
					tmpRefval.node = r;
					tmpRefval.pos = pos;
					this._moveToDuplicatesBoundary(key, keycompare, duplicatesBias, tmpRefval);
					r = tmpRefval.node;
					pos = tmpRefval.pos;
				}
				r = r.nodes[pos];
			}
			else {
				pos = ~pos;
				if (pos > 0) {
					--pos;
				}
				r = r.nodes[pos];
			}
			if (r == null) {
				r = prevR;
				pos = prevPos;
				break;
			}
			prevR = r;
			prevPos = pos;
			pos = arrayUtil.binarySearch(r.keys, 0, r.nodeCount, key, keycompare);
		}
		var leaf = r;
		refVal.leaf = r;
		if (pos < 0) {
			pos = ~pos;
			refVal.pos = pos;
			return false;
		}

		refVal.pos = pos;
		if (duplicatesBias != 0) {
			tmpRefval.node = leaf;
			tmpRefval.pos = pos;
			this._moveToDuplicatesBoundary(key, keycompare, duplicatesBias, tmpRefval);
			refVal.leaf = tmpRefval.node = tmpRefval.node;
			refVal.pos = tmpRefval.pos;
		}
		return true;
	};

	_pBTree._nodeInsert = function (key, leaf, pos, refRoot) {
		if (this._ensureSpace(leaf, refRoot) && pos > leaf.nodeCount) {
			pos -= leaf.nodeCount;
			leaf = leaf.next;
		}
		leaf.keys.splice(pos, 0, key);
		++leaf.nodeCount;

		this._ensureParentKey(leaf, pos);

		for (var node = leaf; node != null; node = node.parent) {
			++node.totalCount;
		}
	};

	_pBTree._nodeRemove = function (leaf, pos, refRoot) {
		for (var node = leaf; node != null; node = node.parent) {
			--node.totalCount;
		}
		--leaf.nodeCount;
		leaf.keys.splice(pos, 1);


		if (leaf.nodeCount > 0) {
			this._ensureParentKey(leaf, pos);
		}

		this._merge(leaf, refRoot);

		return true;
	};

	_pBTree._nodeClear = function (firstNode) {
		firstNode.keys = [];
		firstNode.nodeCount = 0;
		firstNode.totalCount = 0;
		firstNode.parent = null;
		firstNode.next = null;
	};

	_pBTree._arrayClear = function (arr, start, len) {
		var end = start + len, arrLen = arr.length, isLastClear = end == arrLen;
		for (var i = start; i < end; i++) {
			arr[i] = null;
		}
		if (isLastClear) {
			arr.length = start;
		}
	};

	_pBTree._arrayIndexOf = function (arr, item, from, len) {
		for (; from < len; from++) {
			if (arr[from] == item) {
				return from;
			}
		}
		return -1;
	};

	_pBTree._getRootIndex = function (leaf, pos) {
		var node = leaf;
		var rootIndex = pos, nodePos;
		var p;
		while (p = node.parent) {
			nodePos = this._arrayIndexOf(p.nodes, node, 0, p.nodeCount);
			for (var i = 0; i < nodePos; ++i) {
				rootIndex += node.parent.nodes[i].totalCount;
			}
			node = node.parent;
		}
		return rootIndex;
	};

	_pBTree._moveToDuplicatesBoundary = function (key, keycompare, duplicatesBias, refVal) {
		var pos = refVal.pos, node = refVal.node;
		if (duplicatesBias < 0) {
			while (pos > 0 && 0 == keycompare(node.keys[pos - 1], key)) {
				--pos;
			}

			if (pos == 0 && node.prev != null) {
				var prev = node.prev;
				var prevPos = prev.nodeCount;
				while (prevPos > 0 && 0 == keycompare(prev.keys[prevPos - 1], key)) {
					--prevPos;
				}
				if (prevPos < prev.nodeCount) {
					node = prev;
					pos = prevPos;
				}
			}
		}
		else {
			while (pos < node.nodeCount - 1 && 0 == keycompare(node.keys[pos + 1], key)) {
				++pos;
			}
		}
		refVal.pos = pos;
		refVal.node = node;
	};

	_pBTree._ensureSpace = function (node, refRoot) {
		if (node.nodeCount < this._capacity) {
			return false;
		}

		this._ensureParent(node, refRoot);
		this._ensureSpace(node.parent, refRoot);

		var sibling = this._makeNode(node.nodes == null);
		sibling.next = node.next;
		sibling.prev = node;
		sibling.parent = node.parent;

		if (node.next != null) {
			node.next.prev = sibling;
		}
		node.next = sibling;

		var pos = this._arrayIndexOf(node.parent.nodes, node, 0, node.parent.nodeCount);
		var siblingPos = pos + 1;

		node.parent.keys.splice(siblingPos, 0, node.parent.keys[siblingPos]);
		node.parent.nodes.splice(siblingPos, 0, null);

		++node.parent.nodeCount;
		node.parent.nodes[siblingPos] = sibling;

		var half = node.nodeCount / 2;
		var halfCount = node.nodeCount - half;
		this._move(node, half, sibling, 0, halfCount);
		return true;
	};

	_pBTree._movecopy = function (source, sourceIndex, sourceTotal, target, targetIndex, targetTotal, count) {
		var arrayUtil = nexacro._GraphicsLibArray;
		arrayUtil.arrayCopy(target, targetIndex, target, targetIndex + count, targetTotal - targetIndex);
		arrayUtil.arrayCopy(source, sourceIndex, target, targetIndex, count);
		arrayUtil.arrayCopy(source, sourceIndex + count, source, sourceIndex, sourceTotal - sourceIndex - count);
		this._arrayClear(source, sourceTotal - count, count);
	};

	_pBTree._move = function (source, sourceIndex, target, targetIndex, moveCount) {
		this._movecopy(source.keys, sourceIndex, source.nodeCount, target.keys, targetIndex, target.nodeCount, moveCount);

		var totalMoveCount;
		if (source.nodes == null) {
			totalMoveCount = moveCount;
			if (this._insertedKey) {
				if (target.nodes == null && target.next == null) {
					this.last = target;
				}
			}
		}
		else {
			this._movecopy(source.nodes, sourceIndex, source.nodeCount, target.nodes, targetIndex, target.nodeCount, moveCount);
			totalMoveCount = 0;
			for (var i = 0; i < moveCount; ++i) {
				var child = target.nodes[targetIndex + i];
				child.parent = target;
				totalMoveCount += child.totalCount;
			}
		}
		source.nodeCount -= moveCount;
		target.nodeCount += moveCount;

		var sn = source;
		var tn = target;
		while (sn != null && sn != tn) {
			sn.totalCount -= totalMoveCount;
			tn.totalCount += totalMoveCount;
			sn = sn.parent;
			tn = tn.parent;
		}
		this._ensureParentKey(source, sourceIndex);
		this._ensureParentKey(target, targetIndex);
	};

	_pBTree._ensureParent = function (node, refRoot) {
		if (node.parent != null) {
			return;
		}

		var parent = this._makeNode(false);
		parent.totalCount = node.totalCount;
		parent.nodeCount = 1;
		parent.keys[0] = node.keys[0];
		parent.nodes[0] = node;

		node.parent = parent;
		refRoot.root = parent;
	};

	_pBTree._ensureParentKey = function (node, pos) {
		while (pos == 0 && node.parent != null) {
			pos = this._arrayIndexOf(node.parent.nodes, node, 0, node.parent.nodeCount);
			node.parent.keys[pos] = node.keys[0];
			node = node.parent;
		}
	};

	_pBTree._merge = function (node, refRoot) {
		if (node.nodeCount == 0) {
			if (node.parent == null) {
				if (this._insertedKey) {
					this.last = this.first;
				}
				return;
			}

			var pos = this._arrayIndexOf(node.parent.nodes, node, 0, node.parent.nodeCount);
			--node.parent.nodeCount;
			var arrayUtil = nexacro._GraphicsLibArray;
			arrayUtil.arrayCopy(node.parent.keys, pos + 1, node.parent.keys, pos, node.parent.nodeCount - pos);
			arrayUtil.arrayCopy(node.parent.nodes, pos + 1, node.parent.nodes, pos, node.parent.nodeCount - pos);
			node.parent.keys.length = node.parent.nodeCount;
			node.parent.nodes.length = node.parent.nodeCount;

			if (node.parent.nodeCount > 0) {
				this._ensureParentKey(node.parent, pos);
			}

			node.prev.next = node.next;
			if (node.next != null) {
				node.next.prev = node.prev;
			}
			this._merge(node.parent, refRoot);
			return;
		}

		if (node.next == null) {
			if (node.parent == null && node.nodeCount == 1 && node.nodes != null) {
				refRoot.root = node.nodes[0];
				refRoot.root.parent = null;
			}
			if (this._insertedKey && node.nodes == null) {
				this.last = node;
			}
			return;
		}

		if (node.nodeCount >= this._capacity / 2) {
			return;
		}

		var count = node.next.nodeCount;
		if ((node.nodeCount + count) > this._capacity) {
			count = count - parseInt((node.nodeCount + count) / 2);
		}
		this._move(node.next, 0, node, node.nodeCount, count);
		this._merge(node.next, refRoot);
	};

	delete _pBTree;
}

if (!nexacro._ChartColorset) {
	nexacro._ChartColorset = {
	};

	nexacro._ChartColorset.colorCategory = ["color10", "color12", "color20", "color20b", "color20c", "colorMix5", "colorMix10", "colorMix12", "colorMix15", "colorMix20", "colorMix30", "colorMix40", "colorMix50", "colorBlue5", "colorBlue10", "colorPurple5", "colorPurple10", "colorRed5", "colorRed10", "colorGreen5", "colorGreen10"
	];

	nexacro._ChartColorset.color10 = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
	];

	nexacro._ChartColorset.color12 = ["#1abd9c", "#1a9dbc", "#1a70bd", "#1a1ebd", "#5508a3", "#c01aa1", "#d71e33", "#e4531f", "#e4881f", "#dacb00", "#bcd71e", "#43c41b"
	];

	nexacro._ChartColorset.color20 = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"
	];

	nexacro._ChartColorset.color20b = ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
	];

	nexacro._ChartColorset.color20c = ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"
	];

	nexacro._ChartColorset.colorMix5 = ["#1abd9d", "#1a71bd", "#c2251b", "#c38e1d", "#21c34d"
	];

	nexacro._ChartColorset.colorMix10 = ["#1abd9c", "#1a85be", "#1a67bf", "#1a4cbf", "#641ac0", "#9a1ac0", "#c2251b", "#c2541b", "#c2911d", "#21c34d"
	];

	nexacro._ChartColorset.colorMix12 = ["#1abd9c", "#1a9dbc", "#1a70bd", "#1a1ebd", "#5508a3", "#c01aa1", "#d71e33", "#e4531f", "#e4881f", "#dacb00", "#bcd71e", "#43c41b"
	];

	nexacro._ChartColorset.colorMix15 = ["#1abd9c", "#1a92be", "#1a75bf", "#1a59bf", "#1a3cbf", "#4a1abf", "#621ac0", "#7e1ac0", "#9a1ac0", "#c2261b", "#c2471b", "#c2611b", "#c2951b", "#8ac21b", "#1bc366"
	];

	nexacro._ChartColorset.colorMix20 = ["#1abd9c", "#1a9bbe", "#1a8abe", "#1a6dbf", "#1a4dbf", "#1a2cbf", "#231abf", "#361abf", "#4a1abf", "#5c1ac0", "#741ac0", "#881ac0", "#a21bc0", "#b21bc0", "#c2371b", "#c2741b", "#c2981b", "#a9c21b", "#61c31b", "#1bc366"
	];

	nexacro._ChartColorset.colorMix30 = ["#1abd9c", "#1aa6be", "#1a93be", "#1a85be", "#1a73bf", "#1a67bf", "#1a55bf", "#1a3fbf", "#1a28bf", "#1e1abf", "#2d1abf", "#3a1abf", "#451abf", "#531abf", "#601ac0", "#6e1ac0", "#7f1ac0", "#8d1ac0", "#9c1ac0", "#ac1bbf", "#bf1b8e", "#c22a1b", "#c2591b", "#c27c1b", "#c29e1b", "#bdc11b", "#9ac21b", "#74c31b", "#4ac31b", "#1bc366"
	];

	nexacro._ChartColorset.colorMix40 = ["#1abd9c", "#1ab0bd", "#1a9cbe", "#1a92be", "#1a8abe", "#1a7bbe", "#1a6ebf", "#1a67bf", "#1a59bf", "#1a4abf", "#1a32bf", "#1a22bf", "#1d1abf", "#261abf", "#341abf", "#3c1abf", "#441abf", "#4e1abf", "#561abf", "#641ac0", "#6c1ac0", "#781ac0", "#871ac0", "#911ac0", "#9a1ac0", "#a51bc0", "#b21bc0", "#c11b8d", "#c2251b", "#c2401b", "#c2661b", "#c27d1b", "#c2961b", "#c1b51b", "#a8c21b", "#91c21b", "#79c31b", "#4fc31b", "#34c31b", "#1bc366"
	];

	nexacro._ChartColorset.colorMix50 = ["#1abd9c", "#1ab2bd", "#1aa7be", "#1a9bbe", "#1a92be", "#1a8abe", "#1a7fbe", "#1a75bf", "#1a6ebf", "#1a67bf", "#1a59bf", "#1a4cbf", "#1a3ebf", "#1a30bf", "#1a22bf", "#1d1abf", "#251abf", "#2d1abf", "#341abf", "#3c1abf", "#441abf", "#4c1abf", "#541abf", "#5c1ac0", "#641ac0", "#6c1ac0", "#751ac0", "#7f1ac0", "#881ac0", "#911ac0", "#9a1ac0", "#a41bc0", "#ad1bc0", "#b91bc0", "#c11b8d", "#c2251b", "#c23d1b", "#c2541b", "#c26b1b", "#c27f1b", "#c2961b", "#c2ae1b", "#c0c21b", "#a8c21b", "#91c21b", "#7ac31b", "#63c31b", "#4bc31b", "#34c31b", "#1bc366"
	];

	nexacro._ChartColorset.colorBlue5 = ["#1a3ebf", "#1a59bf", "#1a7fbe", "#1aa7be", "#1abd9c"
	];

	nexacro._ChartColorset.colorBlue10 = ["#1a22bf", "#1a3ebf", "#1a4cbf", "#1a59bf", "#1a6ebf", "#1a7fbe", "#1a92be", "#1aa7be", "#1ab2bd", "#1abd9c"
	];

	nexacro._ChartColorset.colorPurple5 = ["#451abf", "#5d1abf", "#771abf", "#a01abf", "#bf1b8e"
	];

	nexacro._ChartColorset.colorPurple10 = ["#451abf", "#511abf", "#5d1abf", "#6a1abf", "#771abf", "#851abf", "#931abf", "#931abf", "#b11bbf", "#bf1b8e"
	];

	nexacro._ChartColorset.colorRed5 = ["#d21515", "#de360f", "#eb5d08", "#f27803", "#f79a00"
	];

	nexacro._ChartColorset.colorRed10 = ["#d21515", "#da2a11", "#de360f", "#e2420d", "#e84a07", "#eb5d08", "#ef6b05", "#f27803", "#f58702", "#f79a00"
	];

	nexacro._ChartColorset.colorGreen5 = ["#1bc366", "#4bcc0b", "#6dce08", "#93d004", "#bcd200"
	];

	nexacro._ChartColorset.colorGreen10 = ["#1bc366", "#27ca0f", "#38cb0d", "#49cc0b", "#5bcd09", "#6dce08", "#80cf06", "#93d004", "#a7d102", "#bcd200"
	];

	nexacro._ChartColorset.getColorCategory = function () {
		return nexacro._ChartColorset.colorCategory;
	};
}

