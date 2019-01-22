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

if (nexacro._ChartBase && !nexacro._ChartBaseloaded) {
	nexacro._ChartBaseloaded = true;
	var _pChartBase = nexacro._ChartBase.prototype;

	_pChartBase.createCssDesignContents = function () {
	};

	_pChartBase.destroyCssDesignContents = function () {
	};

	_pChartBase.afterSetProperty = function () {
		this._draw();
	};

	_pChartBase.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (!this._cell_elem) {
				var cell_elem = this._cell_elem = new nexacro.TextBoxElement(control_elem);
				cell_elem.setElementVerticalAlign("middle");
				cell_elem.setElementTextAlign("center");
				cell_elem.setElementText(this.id);
			}

			if (!this._graphicsControl) {
				this._graphicsControl = new nexacro.GraphicsControl("GraphicsControl", 0, 0, control_elem.client_width, control_elem.client_height, null, null, null, null, null, null, this);
			}
			this._graphicsControl.createComponent();
		}
	};

	_pChartBase.on_created_contents = function (win) {
		if (this._cell_elem) {
			this._cell_elem.create(win);
		}

		this._setEventHandlerToGraphicsControl();
		this._graphicsControl.on_created(win);




		this.on_apply_colorset(this._colorset);
		this.on_apply_contents();

		this._draw();
	};

	_pChartBase.on_change_containerRect = function (width, height) {
		var control_elem = this.getElement();
		if (control_elem && this._is_created_contents) {
			var cell_elem = this._cell_elem;
			if (!this.contents) {
				cell_elem.setElementSize(width, height);
				cell_elem.setElementText(this.id);
			}
			else {
				cell_elem.setElementText("");
			}

			if (this._graphicsControl) {
				this._graphicsControl.resize(control_elem.client_width, control_elem.client_height);
				this._changedData = true;

				this._draw();
			}
		}
	};

	_pChartBase.set_binddataset = function (str) {
		if (str && typeof str != "string") {
			this.setBindDataset(str);
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

			if (this._type_name == "BasicChart" || this._type_name == "PieChart" || this._type_name == "RadarChart" || this._type_name == "GaugeChart") {
				if (this._binddataset && this._binddataset.getColCount() > 0) {
					if (!this._getBindableValue("categorycolumn")) {
						this.set_categorycolumn("bind:" + this._binddataset.getColID(0));
					}
				}
				else {
					this.categorycolumn._set("");
				}
			}
		}
		if (this.contents != null) {
			this._draw();
		}
		else {
			this._calcbinddraw = true;
		}
		return this.binddataset;
	};

	_pChartBase.on_apply_contents = function () {
		if (this._control_element) {
			var cell_elem = this._cell_elem;
			if (!this.contents) {
				cell_elem.setElementText(this.id);
			}
			else {
				cell_elem.setElementText("");
			}


			this._isApplyContents = true;
			this._destroySubControl();
			this._createSubControl(this.contents);
			this._isApplyContents = false;
		}
	};

	_pChartBase._setContents = function (contents) {
		var redraw = false;
		this.enableredraw = false;
		if (this.contents != null) {
			redraw = true;
		}
		this.contents = contents;
		this.on_apply_contents();
		this._changedData = true;
		this.enableredraw = true;

		if (redraw == true) {
			this._draw();
		}
		else if (this._calcbinddraw == true) {
			this._calcbinddraw == false;
			this._draw();
		}
	};

	delete _pChartBase;
}
