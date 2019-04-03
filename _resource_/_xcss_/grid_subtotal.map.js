(function()
{
	return function()
	{
		nexacro._setCSSMaps(
		{
			"cell" :
			{
				"class" :
				{
					"subtotal" :
					{
						"parent" :
						{
							"row" :
							{
								"parent" :
								{
									"body" :
									{
										"parent" :
										{
											"Grid" :
											{
												"self" :
												{
													"enabled" :
													{
														"font" : nexacro.FontObject("normal bold  8pt \"Arial\"")
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		{
			"includeStatusMap" : true
		}
		);

		var imgcache = nexacro._getImageCacheMaps();
		
	};
}
)();
