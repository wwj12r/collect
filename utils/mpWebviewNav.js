/** 撒米屋天空色，与 H5 背景融合（web-view 竖屏无法去掉原生导航栏） */
export const FAMILY_NAV_BG = '#C5E8F7'
export const DEFAULT_NAV_BG = '#FFFFFF'

/** 弱化 web-view 原生导航栏：清空标题、背景与 H5 同色 */
export function syncMpNavBar(webSrc) {
	// #ifdef MP-WEIXIN
	let bg = DEFAULT_NAV_BG
	try {
		if (webSrc) {
			const u = new URL(webSrc)
			if (/\/family/i.test(u.pathname)) bg = FAMILY_NAV_BG
		}
	} catch (_) {}
	uni.setNavigationBarTitle({ title: '' })
	uni.setNavigationBarColor({
		frontColor: '#000000',
		backgroundColor: bg,
		animation: { duration: 0, timingFunc: 'linear' },
	})
	try {
		if (typeof wx !== 'undefined' && wx.hideHomeButton) wx.hideHomeButton()
	} catch (_) {}
	// #endif
}
