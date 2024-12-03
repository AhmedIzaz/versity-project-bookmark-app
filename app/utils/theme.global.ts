import { ThemeConfig } from 'antd'

export const global_theme: ThemeConfig = {
	hashed: false,
	token: {
		colorPrimary: '#00338D',
		fontFamily: 'recta-condensed',
	},
	components: {
		Layout: {
			lightSiderBg: '#00338D',
		},
		Button: {
			borderRadius: 5,
			primaryShadow: '',
		},
		Table: {
			headerColor: '#495460',
			headerBg: '#F7FAFF',
			borderColor: '#D4D9E2',
		},
		Form: {
			borderRadius: 5,
			itemMarginBottom: 10,
			labelFontSize: 16,
			labelColor: '#535353',
			verticalLabelPadding: '0 0 2px',
		},
		Tabs: {
			horizontalMargin: '0px',
			fontSize: 20,
			horizontalItemPadding: '10px 32px',
			horizontalItemGutter: 0,
			inkBarColor: '#00338D',
			lineWidthBold: 5,
			colorBorderSecondary: '#B4BECD',
			colorText: '#235d9c',
			fontFamily: 'recta-condensed',
		},
		Divider: {
			colorSplit: '#CAD2DF',
			lineWidth: 2,
		},
		Input: {
			borderRadius: 8,
			colorBgContainer: '#FCFCFD',
			colorBorder: '#ababab',
			hoverBorderColor: '#b4b4b4',
			activeBorderColor: '#5d5d5d',
			activeShadow: '',
			colorTextPlaceholder: 'rgba(0,0,0,0.5)',
		},
		Select: {
			selectorBg: '#FCFCFD',
			colorBorder: '#ababab',
			colorPrimaryHover: '#b4b4b4',
			controlOutlineWidth: 0,
			colorTextPlaceholder: 'rgba(0,0,0,0.5)',
		},
		DatePicker: {
			colorBorder: '#EAEAEB',
			colorPrimaryHover: '#b4b4b4',
			controlOutlineWidth: 0,
			colorBgContainer: '#FCFCFD',
			hoverBorderColor: '#b4b4b4',
			activeBorderColor: '#5d5d5d',
		},
		ColorPicker: {
			fontFamily: 'Ubuntu, sans-serif',
		},
		Radio: {
			colorBgContainer: '#00338D',
			colorPrimary: '#ffffff',
			colorPrimaryHover: '#ffffff',
		},
	},
}
