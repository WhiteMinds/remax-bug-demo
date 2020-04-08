/**
 * DataRangers 小程序 SDK 文档地址
 * https://datarangers.com.cn/help/doc?lid=1097&did=10944
 */
import $$TEA from './rangers'

export function initTea() {
	$$TEA.init({
		app_id: 123456,
		auto_report: true,
		report_channel: 'cn',
		report_interval: 1e3,
	})
	$$TEA.send()
}

export function reportTea(name: string, args?: any) {
	$$TEA.event(name, args)
}
