'use strict'
var extendStatics = function(t, e) {
	return (extendStatics =
		Object.setPrototypeOf ||
		({ __proto__: [] } instanceof Array &&
			function(t, e) {
				t.__proto__ = e
			}) ||
		function(t, e) {
			for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
		})(t, e)
}
function __extends(t, e) {
	function n() {
		this.constructor = t
	}
	extendStatics(t, e),
		(t.prototype =
			null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()))
}
var __assign = function() {
	return (__assign =
		Object.assign ||
		function(t) {
			for (var e, n = 1, i = arguments.length; n < i; n++)
				for (var s in (e = arguments[n]))
					Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s])
			return t
		}).apply(this, arguments)
}
function __rest(t, e) {
	var n = {}
	for (var i in t)
		Object.prototype.hasOwnProperty.call(t, i) &&
			e.indexOf(i) < 0 &&
			(n[i] = t[i])
	if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
		var s = 0
		for (i = Object.getOwnPropertySymbols(t); s < i.length; s++)
			e.indexOf(i[s]) < 0 && (n[i[s]] = t[i[s]])
	}
	return n
}
var undef = void 0,
	envInfoCreate = function() {
		return {
			user: {
				user_id: undef,
				web_id: undef,
				user_unique_id: undef,
				ssid: undef,
				user_type: undef,
			},
			header: {
				app_id: undef,
				app_name: undef,
				os_name: undef,
				os_version: undef,
				device_model: undef,
				ab_client: undef,
				ab_version: undef,
				ab_sdk_version: undef,
				traffic_type: undef,
				utm_source: undef,
				utm_medium: undef,
				utm_campaign: undef,
				_sdk_version: undef,
				_sdk_name: undef,
				headers: {
					platform: undef,
					sdk_version: undef,
					browser: undef,
					browser_version: undef,
					region: undef,
					province: undef,
					city: undef,
					language: undef,
					timezone: undef,
					tz_offset: undef,
					resolution: undef,
					screen_height: undef,
					screen_width: undef,
					referrer: undef,
					referrer_host: undef,
					custom: {},
				},
			},
		}
	},
	envInfoMerge = function(t, e) {
		Object.keys(e).forEach(function(n) {
			if ('evtParams' === n)
				t.evtParams = __assign({}, t.evtParams || {}, e.evtParams || {})
			else if ('_staging_flag' === n)
				t.evtParams = __assign({}, t.evtParams || {}, {
					_staging_flag: e._staging_flag,
				})
			else {
				var i = e[n]
				'os_version' === n && (i = '' + i)
				var s = t.user,
					o = t.header,
					r = o.headers,
					a = r.custom
				s.hasOwnProperty(n)
					? 'user_type' === n
						? (s[n] = Number(i))
						: 'user_id' === n
						? ((s[n] = String(i)), (s.user_unique_id = String(i)))
						: (s[n] = String(i))
					: o.hasOwnProperty(n)
					? (o[n] = i)
					: r.hasOwnProperty(n)
					? (r[n] = i)
					: (a[n] = i)
			}
		})
	},
	TEA_CACHE_PREFIX = '__tea_cache_',
	REPORT_PREFIXS = {},
	WEBID_URL = '',
	SSID_URL = '',
	REPORT_URL = ''
;(REPORT_PREFIXS = {
	cn: 'https://mcs.ctobsnssdk.com',
	va: 'https://mcs.itobsnssdk.com',
	sg: 'https://mcs.tobsnssdk.com',
}),
	(WEBID_URL = '/v2/user/webid'),
	(SSID_URL = '/v2/user/ssid'),
	(REPORT_URL = '/v2/event/list')
var Action,
	PROFILE_PREFIXS = {
		cn: 'https://dpprofile.snssdk.com',
		sg: 'https://sgali-dpprofile.byteoversea.com',
		va: 'https://vaali-dpprofile.byteoversea.com',
	},
	DEFAULT_DOMAIN = 1,
	REPORT_CHANNEL = 'cn',
	REPORT_INTERVAL = 5e3,
	MAX_BATCH_EVENT = 5,
	MAX_STORAGE_NUM = -1,
	AUTO_REPORT = !1,
	AUTO_PROFILE = !1,
	PROFILE_CHANNEL = 'cn',
	DISABLE_STORAGE = !1,
	ENABLE_AB_TEST = !1,
	CHANNEL_DOMAIN = '',
	Sdk = (function() {
		function t() {
			;(this._pluginInstances = []),
				(this._listeners = {}),
				(this._pluginInstances = []),
				(this._keyPrefix = TEA_CACHE_PREFIX),
				(this._inited = !1),
				(this._sended = !1),
				(this._tokenOK = !1),
				(this._options = {
					report_domain: DEFAULT_DOMAIN,
					report_channel: REPORT_CHANNEL,
					report_interval: REPORT_INTERVAL,
					max_batch_event: MAX_BATCH_EVENT,
					max_storage_num: MAX_STORAGE_NUM,
					auto_report: AUTO_REPORT,
					auto_profile: AUTO_PROFILE,
					profile_channel: PROFILE_CHANNEL,
					disable_storage: DISABLE_STORAGE,
					enable_ab_test: ENABLE_AB_TEST,
					channel_domain: CHANNEL_DOMAIN,
				}),
				(this._envInfo = envInfoCreate()),
				(this._ready = !1),
				(this._extraData = {}),
				(this.storage = new (this._get('storage'))()),
				(this.logger = new (this._get('logger'))()),
				(this.request = this._get('request')),
				this._initPlugin(),
				this._process()
		}
		return (
			(t.use = function(e, n) {
				void 0 === n && (n = { type: 'plugin' })
				var i = n.name,
					s = n.type
				if ('plugin' === s)
					if (i) {
						for (var o = !1, r = 0, a = t.plugins.length; r < a; r++) {
							var u = t.plugins[r]
							u.name && u.name === i && ((o = !0), (t.plugins[r].plugin = e))
						}
						o || t.plugins.push({ name: i, plugin: e })
					} else t.plugins.push({ plugin: e })
				else 'adapter' === s && (t.adapters[i] = e(t, n))
			}),
			(t.prototype._initPlugin = function() {
				var e = this
				try {
					t.plugins.reduce(function(t, n) {
						var i = n.plugin
						return t.push(new i(e)), t
					}, this._pluginInstances)
				} catch (t) {}
			}),
			(t.prototype._on = function(t, e) {
				t &&
					e &&
					'function' == typeof e &&
					(this._listeners[t] || (this._listeners[t] = []),
					this._listeners[t].push(e))
			}),
			(t.prototype._once = function(t, e) {
				var n = this
				if (t && e && 'function' == typeof e) {
					var i = function(s, o) {
						e(s, o), n._off(t, i)
					}
					this._on(t, i)
				}
			}),
			(t.prototype._emit = function(t, e) {
				var n = this
				'report' !== t &&
					(void 0 === e
						? this.logger.info('触发' + t)
						: this.logger.info('触发' + t + '：', e))
				var i = this._listeners[t]
				if (i && i.length)
					try {
						i.slice().forEach(function(t) {
							return t(n, e)
						})
					} catch (t) {}
			}),
			(t.prototype._off = function(t, e) {
				t &&
					this._listeners[t] &&
					this._listeners.length &&
					(e
						? this._listeners[t].splice(this._listeners[t].indexOf(e), 1)
						: (this._listeners[t] = []))
			}),
			(t.prototype._get = function(e) {
				return t.adapters[e]
			}),
			Object.defineProperty(t.prototype, 'appId', {
				get: function() {
					return this._appId
				},
				set: function(t) {
					if ('number' != typeof t) throw new Error('app_id must be a number')
					this._appId = t
				},
				enumerable: !0,
				configurable: !0,
			}),
			(t.prototype._mergeEnv = function(t) {
				envInfoMerge(this._envInfo, t)
			}),
			(t.prototype._setExtraData = function(t, e) {
				this._extraData[t] = e
			}),
			(t.prototype._getExtraData = function(t) {
				return (
					void 0 === t && (t = ''), t ? this._extraData[t] : this._extraData
				)
			}),
			(t.prototype.destroy = function() {
				this._pluginInstances.forEach(function(t) {
					return t.destroy()
				})
			}),
			(t.prototype._process = function() {
				var t = this
				this._emit('instantiation'),
					this._once('init', function() {
						t._mergeEnv({ app_id: t.appId }),
							t._options.auto_report && t._emit('auto-report'),
							t._options.enable_ab_test && t._emit('ab-test')
						var e = function() {
							t._sended
								? t._emit('start-report')
								: t._once('send', function() {
										t._emit('start-report')
								  })
						}
						t._emit('device'),
							t._emit('fetch-token'),
							t._once('fetch-token-complete', function(n, i) {
								i
									? (t._emit('token-status', !0), e())
									: (t._emit('fetch-webid'),
									  t._once('fetch-webid-complete', function(n, i) {
											if (i) {
												var s = t._envInfo.user,
													o = s.user_unique_id,
													r = s.web_id
												o
													? t._emit('fetch-ssid', {
															user_unique_id: o,
															web_id: r,
													  })
													: ((t._envInfo.user.user_unique_id = r),
													  t._emit('token-status', !0),
													  e())
											}
									  }))
							}),
							t._on('config', function(e, n) {
								var i = n.user_unique_id,
									s = __rest(n, ['user_unique_id'])
								if ((t._mergeEnv(s), void 0 !== i)) {
									i = '' + i
									var o = t._envInfo.user
									o.web_id && o.user_unique_id !== i
										? ((o.user_unique_id = i),
										  t._emit('token-status', !1),
										  t._emit('stop-report'),
										  t._emit('fetch-ssid', {
												user_unique_id: i,
												web_id: o.web_id,
										  }))
										: o.web_id || (o.user_unique_id = i)
								}
							}),
							t._on('fetch-ssid-complete', function(n, i) {
								2 === i.status && (t._emit('token-status', !0), e())
							})
					})
			}),
			(t.adapters = {}),
			(t.plugins = []),
			t
		)
	})(),
	Hook = (function(t) {
		function e() {
			var e = t.call(this) || this
			return (e._hooks = {}), e
		}
		return (
			__extends(e, t),
			(e.prototype.on = function(t, e) {
				t &&
					e &&
					'function' == typeof e &&
					(this._hooks[t] || (this._hooks[t] = []), this._hooks[t].push(e))
			}),
			(e.prototype.once = function(t, e) {
				var n = this
				if (t && e && 'function' == typeof e) {
					var i = function(s) {
						e(s), n.off(t, i)
					}
					this.on(t, i)
				}
			}),
			(e.prototype.off = function(t, e) {
				t &&
					this._hooks[t] &&
					this._hooks[t].length &&
					(e
						? this._hooks[t].splice(this._hooks[t].indexOf(e), 1)
						: (this._hooks[t] = []))
			}),
			(e.prototype.emit = function(t, e) {
				t &&
					this._hooks[t] &&
					this._hooks[t].length &&
					this._hooks[t].slice().forEach(function(t) {
						try {
							t(e)
						} catch (t) {}
					})
			}),
			e
		)
	})(Sdk),
	PluginBase = (function() {
		function t(t) {
			;(this.sdk = t), this.apply()
		}
		return (
			(t.prototype.getUrl = function(t) {
				var e = this.sdk._options,
					n = e.channel_domain,
					i = ''
				if (n) i = n
				else {
					var s = e.report_channel
					Object.keys(REPORT_PREFIXS).includes(s) || (s = REPORT_CHANNEL),
						(i = REPORT_PREFIXS[s])
				}
				switch (t) {
					case 'report':
						return '' + i + REPORT_URL
					case 'webid':
						return '' + i + WEBID_URL
					case 'ssid':
						return '' + i + SSID_URL
				}
			}),
			(t.prototype.destroy = function() {
				this.sdk = null
			}),
			t
		)
	})(),
	default_1 = (function(t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this
		}
		return (
			__extends(e, t),
			(e.prototype.apply = function() {
				var t = this
				;(this.maxExpire = 7344e6),
					(this.minUpdateTime = 432e7),
					this.sdk._on('fetch-token', function(e) {
						t.fetchCacheToken(function(e) {
							return setTimeout(function() {
								return t.sdk._emit('fetch-token-complete', e)
							})
						})
					}),
					this.sdk._on('fetch-webid', function(e) {
						t.requestWebid(function(e) {
							return t.sdk._emit('fetch-webid-complete', e)
						})
					}),
					this.sdk._on('fetch-ssid', function(e, n) {
						t.requestSsid(n, function(e) {
							return t.sdk._emit('fetch-ssid-complete', e)
						})
					}),
					this.sdk._on('token-status', function(e, n) {
						if (((t.sdk._tokenOK = !!n), t.sdk._tokenOK)) {
							var i = t.sdk._envInfo.user
							t.sdk._emit('token-ok', __assign({}, i))
						}
					})
			}),
			(e.prototype.fetchCacheToken = function(t) {
				var e = this.sdk.storage,
					n = this.getKey(),
					i = e.get(n)
				i ? this._hasCacheToken(t, i) : t(!1)
			}),
			(e.prototype._hasCacheToken = function(t, e) {
				var n = this,
					i = e
				if ('string' == typeof i)
					try {
						i = JSON.parse(i)
					} catch (t) {}
				var s = i.user_unique_id,
					o = i.web_id,
					r = i.ssid,
					a = i.timestamp
				if (o && s && a) {
					var u = +new Date() - parseFloat(a)
					if (u >= this.maxExpire) t(!1)
					else {
						var p = function() {
							n.sdk.emit('fetch-token', __assign({}, i))
							var e = n.sdk._envInfo.user
							;(e.user_unique_id = s), (e.web_id = o), (e.ssid = r), t(!0)
						}
						u >= this.minUpdateTime
							? this._updateWebid(o, function(e) {
									e ? p() : t(!1)
							  })
							: p()
					}
				} else t(!1)
			}),
			(e.prototype.requestWebid = function(t) {
				var e = this,
					n = this.sdk.appId
				this.sdk.request({
					url: this.getUrl('webid'),
					method: 'POST',
					data: {
						app_id: n,
						url: '-',
						user_agent: '-',
						referer: '-',
						user_unique_id: '',
					},
					header: { 'Content-Type': 'application/json; charset=utf-8' },
					success: function(n) {
						var i = n.data
						0 !== i.e ? t(!1) : e._hasWebid(t, i)
					},
					fail: function() {
						t(!1)
					},
				})
			}),
			(e.prototype._hasWebid = function(t, e) {
				var n = e.web_id,
					i = e.ssid,
					s = this.sdk._envInfo.user
				;(s.web_id = n),
					(s.ssid = i),
					this.sdk.storage.set(
						this.getKey(),
						__assign({}, s, { user_unique_id: n, timestamp: +new Date() }),
					),
					t(!0)
			}),
			(e.prototype._updateWebid = function(t, e) {
				var n = this,
					i = this.sdk.appId
				this.sdk.request({
					url: this.getUrl('webid') + '/' + t + '/update',
					method: 'POST',
					data: {
						app_id: i,
						url: '-',
						user_agent: '-',
						referer: '-',
						user_unique_id: '',
					},
					header: { 'Content-Type': 'application/json; charset=utf-8' },
					success: function(t) {
						0 !== t.data.e ? e(!1) : n._hasUpdateWebid(e)
					},
					fail: function() {
						e(!1)
					},
				})
			}),
			(e.prototype._hasUpdateWebid = function(t) {
				var e = this.sdk.storage,
					n = this.getKey(),
					i = e.get(n)
				e.set(n, __assign({}, i, { timestamp: +new Date() })), t(!0)
			}),
			(e.prototype.requestSsid = function(t, e) {
				var n = this,
					i = this.sdk.appId,
					s = this.sdk._envInfo.user,
					o = function(n) {
						return e({ status: n, info: t })
					}
				this.sdk.request({
					url: this.getUrl('ssid'),
					method: 'POST',
					data: {
						app_id: i,
						web_id: t.web_id,
						user_unique_id: '' + t.user_unique_id,
					},
					header: { 'Content-Type': 'application/json; charset=utf-8' },
					success: function(e) {
						if (t.user_unique_id === s.user_unique_id) {
							var i = e.data
							0 !== i.e ? o(1) : n._hasSsid(o, t, i)
						} else o(0)
					},
					fail: function() {
						t.user_unique_id === s.user_unique_id ? o(1) : o(0)
					},
				})
			}),
			(e.prototype._hasSsid = function(t, e, n) {
				var i = this.sdk.storage,
					s = this.sdk._envInfo.user,
					o = n.ssid
				;(s.web_id = e.web_id), (s.ssid = o)
				var r = this.getKey(),
					a = (i.get(r) || {}).timestamp,
					u = void 0 === a ? +new Date() : a
				i.set(r, __assign({}, s, { timestamp: u })), t(2)
			}),
			(e.prototype.getKey = function() {
				var t = this.sdk,
					e = t.appId
				return t._keyPrefix + 'tokens_' + e
			}),
			e
		)
	})(PluginBase),
	default_1$1 = (function(t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this
		}
		return (
			__extends(e, t),
			(e.prototype.apply = function() {
				var t = this
				;(this.cache = []),
					(this.time = 100),
					(this.delaying = 0),
					this.sdk._once('init', function(e) {
						t._transformOldKey()
					}),
					this.sdk._on('event', function(e, n) {
						t.event(n)
					})
			}),
			(e.prototype._transformOldKey = function() {
				var t = this.sdk.storage,
					e = this.getKey(!0)
				try {
					var n = t.get(e)
					if (n) {
						var i = this.getKey(),
							s = t.get(i)
						t.set(i, n.concat(s)), t.remove(e)
					}
				} catch (t) {
				} finally {
					t.remove(e)
				}
			}),
			(e.prototype.event = function(t) {
				var e = this
				this.cache.push(t),
					this.delaying > 0 && clearTimeout(this.delaying),
					(this.delaying = setTimeout(function() {
						var t = e.cache.slice()
						;(e.cache = []), (e.delaying = 0), e.sync(t)
					}, this.time))
			}),
			(e.prototype.sync = function(t) {
				var e = this.sdk,
					n = e._ready,
					i = e.storage,
					s = e._options.max_batch_event,
					o = this.getKey(),
					r = i.get(o),
					a = (r || []).concat(t)
				i.set(o, a),
					n &&
						s &&
						a.length >= s &&
						(this.sdk._emit('interval-report'), this.sdk._emit('report'))
			}),
			(e.prototype.getKey = function(t) {
				void 0 === t && (t = !1)
				var e = this.sdk,
					n = e.appId,
					i = e._keyPrefix
				return t ? i + 'events' : i + 'events_' + n
			}),
			e
		)
	})(PluginBase),
	default_1$2 = (function(t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this
		}
		return (
			__extends(e, t),
			(e.prototype.apply = function() {
				var t = this
				;(this.extOptions = {}),
					(this.reporting = !1),
					(this.time = 3e3),
					(this.splitNumber = 3),
					(this.splitTime = 2e3),
					(this.intervalIng = 0),
					this.sdk._once('report-option', function(e, n) {
						t.extOptions = n
					}),
					this.sdk._once('init', function(e) {
						t._reissue()
					}),
					this.sdk._on('start-report', function(e) {
						;(t.sdk._ready = !0), t.interval(), t.report()
					}),
					this.sdk._on('report', function(e, n) {
						t.report(n)
					}),
					this.sdk._on('immediate-report', function(e, n) {
						t.immediateReport(n)
					}),
					this.sdk._on('stop-report', function() {
						;(t.sdk._ready = !1), t.stop()
					}),
					this.sdk._on('interval-report', function() {
						t.interval()
					})
			}),
			(e.prototype._reissue = function() {
				try {
					var t = this.sdk.storage,
						e = this.getKey('reports'),
						n = t.get(e)
					n && this._reissueProcess(n)
				} catch (t) {}
			}),
			(e.prototype._reissueProcess = function(t) {
				var e = this,
					n = Object.keys(t),
					i = function() {
						if (n.length) {
							for (var s = [], o = 0; o < e.splitNumber; o++)
								n.length && s.push(n.shift())
							s.length &&
								s.forEach(function(n) {
									e.post(t[n], n)
								}),
								setTimeout(i, e.splitTime)
						}
					}
				i()
			}),
			(e.prototype.interval = function() {
				var t = this,
					e = this.sdk._options.report_interval
				this.stop(),
					(this.intervalIng = setTimeout(function() {
						t.sdk._emit('report'), (t.intervalIng = 0), t.interval()
					}, e))
			}),
			(e.prototype.stop = function() {
				this.intervalIng > 0 && clearTimeout(this.intervalIng),
					(this.intervalIng = 0)
			}),
			(e.prototype.report = function(t) {
				var e = this.sdk.storage,
					n = this.getKey('events'),
					i = e.get(n)
				if (i && i.length) {
					e.remove(n)
					var s = this.sdk._options.max_storage_num
					if (s > 0) {
						var o = this.getKey('reports'),
							r = e.get(o),
							a = Object.keys(r)
						if (a.length >= s) {
							var u = a.sort(function(t, e) {
								var n = t.split('.')[0],
									i = e.split('.')[0]
								return parseFloat(n) - parseFloat(i)
							})
							u && u[0] && this.removeReport(u[0])
						}
					}
					var p = this.mergeEvent(i)
					this.post(p)
				}
			}),
			(e.prototype.immediateReport = function(t) {
				var e = this.mergeEvent([t]),
					n = this.getRandom()
				this.doPost(e, n, function(t) {})
			}),
			(e.prototype.mergeEvent = function(t) {
				var e = this.sdk._envInfo,
					n = e.user,
					i = e.header,
					s = e.evtParams,
					o = t.map(function(t) {
						return (
							s &&
								Object.keys(s).forEach(function(e) {
									void 0 === t.params[e] && (t.params[e] = s[e])
								}),
							(t.params = JSON.stringify(t.params)),
							t
						)
					}),
					r = JSON.parse(JSON.stringify({ events: o, user: n, header: i }))
				return (
					r.header.headers &&
						(r.header.headers = JSON.stringify(r.header.headers)),
					[r]
				)
			}),
			(e.prototype.post = function(t, e) {
				var n,
					i = this,
					s = ''
				if (e) s = e
				else {
					var o = this.sdk.storage,
						r = this.getKey('reports'),
						a = o.get(r)
					;(s = this.getRandom()),
						o.set(r, __assign({}, a, (((n = {})[s] = t), n)))
				}
				this.doPost(t, s, function(t) {
					;(2 !== t && 1 !== t) || i.removeReport(s)
				})
			}),
			(e.prototype.doPost = function(t, e, n) {
				var i = this.extOptions,
					s = i.dataType,
					o = i.header,
					r = i.method
				this.sdk.request({
					url: this.getUrl('report') + '?tea_sdk_random=' + e,
					method: r || 'POST',
					dataType: s,
					data: t,
					header: __assign(
						{ 'Content-Type': 'application/json; charset=utf-8' },
						o || {},
					),
					success: function(t) {
						0 !== t.data.e ? n(1) : n(2)
					},
					fail: function() {
						n(0)
					},
				})
			}),
			(e.prototype.getKey = function(t) {
				var e = this.sdk,
					n = e.appId
				return '' + e._keyPrefix + t + '_' + n
			}),
			(e.prototype.getRandom = function() {
				return +new Date() + '.' + Math.floor(1e5 * Math.random())
			}),
			(e.prototype.removeReport = function(t) {
				try {
					var e = this.sdk.storage,
						n = this.getKey('reports'),
						i = e.get(n)
					i &&
						i[t] &&
						(i = Object.keys(i).reduce(function(e, n) {
							return n !== t && (e[n] = i[n]), e
						}, {})),
						e.set(n, i)
				} catch (t) {}
			}),
			(e.prototype.destroy = function() {
				this.stop(), t.prototype.destroy.call(this)
			}),
			e
		)
	})(PluginBase)
!(function(t) {
	;(t.Normal = 'synchronize'), (t.Once = 'setOnce')
})(Action || (Action = {}))
var FetchStatus,
	CallbackType,
	default_1$3 = (function(t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this
		}
		return (
			__extends(e, t),
			(e.prototype.apply = function() {
				var t = this
				;(this.autoId = 0),
					(this.lastId = 0),
					(this.lastOnceId = 0),
					(this.duration = 1e4),
					(this.data = null),
					(this.autoStatus = !1),
					this.sdk._once('init', function(e) {
						var n,
							i = t.sdk._options,
							s = i.auto_profile,
							o = i.profile_channel
						;(t.channel = o),
							(t.urls =
								(((n = {})[Action.Normal] = t.getProfileUrl(Action.Normal)),
								(n[Action.Once] = t.getProfileUrl(Action.Once)),
								n)),
							(t.autoStatus = !!s),
							t.autoStatus &&
								t.sdk._once('start-report', function() {
									t.start()
								})
					}),
					this.sdk._on('profile-info', function(e, n) {
						t.sdk._mergeEnv(n)
					}),
					this.sdk._on('profile', function(e, n) {
						t.autoStatus && t.setProfile(n)
					}),
					this.sdk._on('profile-once', function(e, n) {
						t.autoStatus && t.setOnceProfile(n)
					})
			}),
			(e.prototype.getProfileUrl = function(t) {
				return (
					PROFILE_PREFIXS[this.channel] +
					'/service/api/v3/userprofile/' +
					this.sdk.appId +
					'/' +
					t
				)
			}),
			(e.prototype.getData = function(t) {
				void 0 === t && (t = {})
				var e = JSON.parse(JSON.stringify(this.sdk._envInfo)),
					n = e.user,
					i = e.header,
					s = i.headers,
					o = i.otherHeader,
					r = s.custom,
					a = __rest(s, ['custom'])
				return {
					user: {
						web_id: n.web_id,
						ssid: n.ssid,
						user_unique_id: n.user_unique_id,
					},
					header: __assign({}, o || {}, a || {}),
					profile: __assign({}, r || {}, t || {}),
				}
			}),
			(e.prototype.start = function() {
				var t = this
				this.autoId > 0 ||
					(this.upPre(Action.Normal),
					(this.autoId = setInterval(function() {
						t.upPre(Action.Normal)
					}, this.duration)))
			}),
			(e.prototype.stop = function() {
				this.autoId > 0 && clearInterval(this.autoId)
			}),
			(e.prototype.setProfile = function(t) {
				var e = +new Date()
				;(!this.lastId || e - this.lastId >= this.duration) &&
					(this.sdk._mergeEnv(t),
					this.upPre(Action.Normal, t),
					(this.lastId = e))
			}),
			(e.prototype.setOnceProfile = function(t) {
				var e = +new Date()
				;(!this.lastOnceId || e - this.lastOnceId >= this.duration) &&
					(this.sdk._mergeEnv(t),
					this.upPre(Action.Once, t),
					(this.lastOnceId = e))
			}),
			(e.prototype.upPre = function(t, e) {
				void 0 === e && (e = {})
				var n = this.getData(e)
				;(this.data && JSON.stringify(this.data) === JSON.stringify(n)) ||
					(this.up(this.urls[t], n), (this.data = n))
			}),
			(e.prototype.up = function(t, e) {
				this.profile(t, e)
			}),
			(e.prototype.profile = function(t, e, n) {
				void 0 === n && (n = function(t) {}),
					this.sdk.request({
						url: t,
						method: 'POST',
						data: e,
						header: { 'Content-Type': 'application/json; charset=utf-8' },
						success: function(t) {
							0 !== t.data.e ? n(1) : n(2)
						},
						fail: function() {
							n(0)
						},
					})
			}),
			(e.prototype.destroy = function() {
				this.stop(), t.prototype.destroy.call(this)
			}),
			e
		)
	})(PluginBase),
	DOMAINS = {
		cn: 'https://toblog.ctobsnssdk.com',
		va: 'https://toblog.itobsnssdk.com',
		sg: 'https://toblog.tobsnssdk.com',
	},
	API = '/service/2/abtest_config/',
	STORAGE_DATA_KEY = '__tea_sdk_ab_version',
	STORAGE_DATA_EXPRIRE_TIME = 2592e6
!(function(t) {
	;(t[(t.No = 0)] = 'No'),
		(t[(t.Ing = 1)] = 'Ing'),
		(t[(t.Complete = 2)] = 'Complete')
})(FetchStatus || (FetchStatus = {})),
	(function(t) {
		;(t[(t.Var = 0)] = 'Var'), (t[(t.All = 1)] = 'All')
	})(CallbackType || (CallbackType = {}))
var output = function(t) {
		console.log(t)
	},
	default_1$4 = (function(t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this
		}
		return (
			__extends(e, t),
			(e.prototype.apply = function() {
				var t = this
				this.sdk._once('ab-test', function() {
					var e = t.sdk,
						n = e.appId,
						i = e._options.report_channel,
						s = e._envInfo
					;(t.appId = n),
						(t.domain = DOMAINS[i]),
						(t.fetchStatus = FetchStatus.No),
						(t.callbacks = []),
						(t.data = null),
						(t.versions = []),
						t.sdk._once('start-report', function() {
							var e = s.user,
								n = s.header,
								i = n.headers,
								o = __rest(n, ['headers'])
							;(t.user = __assign({}, e)), t._fetch(__assign({}, o, i))
						}),
						t._check(),
						t.sdk._once('ab-var', function(e, n) {
							var i = n.name,
								s = n.defaultValue,
								o = n.callback
							t.getVar(i, s, o)
						}),
						t.sdk._once('ab-allvars', function(e, n) {
							t.getAllVars(n)
						})
				})
			}),
			(e.prototype.getAllVars = function(t) {
				if ('function' != typeof t) return output('回调函数必须为一个函数')
				var e = { callback: t, type: CallbackType.All }
				this.fetchStatus === FetchStatus.Complete
					? this._getAllVars(e)
					: this.callbacks.push(e)
			}),
			(e.prototype.getVar = function(t, e, n) {
				if (!t) return output('变量名不能为空')
				if (void 0 === e) return output('变量没有默认值')
				if ('function' != typeof n) return output('回调函数必须为一个函数')
				var i = {
					name: t,
					defaultValue: e,
					callback: n,
					type: CallbackType.Var,
				}
				this.fetchStatus === FetchStatus.Complete
					? (this._getVar(i), this._updateVersions())
					: this.callbacks.push(i)
			}),
			(e.prototype._check = function() {
				var t = this,
					e = this._checkExpiration(this.appId)
				if (e) {
					var n = e.ab_version,
						i = e.data
					n &&
						n.length &&
						((this.versions = n),
						(this.data = i),
						setTimeout(function() {
							t._configVersions()
						}))
				}
			}),
			(e.prototype._fetchComplete = function(t) {
				var e = this
				if (t) {
					this._setDataCache(this.appId, t), (this.data = t)
					var n = []
					Object.keys(t).forEach(function(e) {
						var i = t[e].vid
						i && n.push(i)
					}),
						(this.versions = this.versions.filter(function(t) {
							return n.includes(t)
						}))
				}
				this.callbacks.forEach(function(t) {
					return e[t.type === CallbackType.Var ? '_getVar' : '_getAllVars'](t)
				}),
					(this.callbacks = []),
					this._updateVersions()
			}),
			(e.prototype._getAllVars = function(t) {
				;(0, t.callback)(this.data ? JSON.parse(JSON.stringify(this.data)) : {})
			}),
			(e.prototype._getVar = function(t) {
				var e = t.name,
					n = t.defaultValue,
					i = t.callback,
					s = this.data
				if (s)
					if ('object' == typeof s[e] && void 0 !== s[e].val) {
						i(s[e].val)
						var o = s[e].vid
						this.versions.includes(o) || this.versions.push(o)
					} else i(n)
				else i(n)
			}),
			(e.prototype._updateVersions = function() {
				this._setVersionCache(this.appId, this.versions), this._configVersions()
			}),
			(e.prototype._configVersions = function() {
				var t = this.versions.join(',')
				t && this.sdk._mergeEnv({ ab_sdk_version: t })
			}),
			(e.prototype._url = function() {
				return '' + this.domain + API
			}),
			(e.prototype._fetch = function(t, e) {
				var n = this,
					i = void 0 === e ? {} : e,
					s = i.success,
					o = void 0 === s ? function() {} : s,
					r = i.fail,
					a = void 0 === r ? function() {} : r
				this.fetchStatus = FetchStatus.Ing
				var u = this._url()
				this.sdk.request({
					url: u,
					data: {
						header: __assign({ aid: this.appId }, this.user || {}, t || {}),
					},
					method: 'POST',
					header: { 'Content-Type': 'application/json; charset=utf-8' },
					success: function(t) {
						void 0 === t && (t = {}), (n.fetchStatus = FetchStatus.Complete)
						var e = (t || {}).data,
							i = (void 0 === e ? {} : e).data,
							s = void 0 === i ? {} : i
						s ? (n._fetchComplete(s), o(s)) : (n._fetchComplete(null), a())
					},
					fail: function() {
						;(n.fetchStatus = FetchStatus.Complete), a(), n._fetchComplete(null)
					},
				})
			}),
			(e.prototype._getStorageKey = function(t) {
				return STORAGE_DATA_KEY + '_' + t
			}),
			(e.prototype._getCache = function(t) {
				var e = this.sdk.storage,
					n = { ab_version: [], data: null, timestamp: +new Date() }
				try {
					n = e.get(this._getStorageKey(t)) || n
				} catch (t) {}
				return n
			}),
			(e.prototype._setCache = function(t, e) {
				var n = this.sdk.storage
				try {
					var i = this._getCache(t)
					n.set(this._getStorageKey(t), __assign({}, i, e))
				} catch (t) {}
			}),
			(e.prototype._setVersionCache = function(t, e) {
				this._setCache(t, { ab_version: e, timestamp: +new Date() })
			}),
			(e.prototype._setDataCache = function(t, e) {
				this._setCache(t, { data: e })
			}),
			(e.prototype._checkExpiration = function(t) {
				var e = this.sdk.storage,
					n = this._getCache(t),
					i = n.timestamp
				if (+new Date() - i >= STORAGE_DATA_EXPRIRE_TIME) {
					try {
						e.remove(STORAGE_DATA_KEY)
					} catch (t) {}
					return null
				}
				return n
			}),
			e
		)
	})(PluginBase),
	TeaSdk = (function(t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this
		}
		return (
			__extends(e, t),
			(e.prototype.getConfig = function() {
				return JSON.parse(JSON.stringify(this._envInfo))
			}),
			(e.prototype.init = function(t) {
				if (!this._inited) {
					if (((this._inited = !0), 'object' == typeof t)) {
						if (
							((this.appId = t.app_id),
							void 0 === t.report_channel && void 0 !== t.report_domain)
						) {
							var e = t.report_domain
							;(e = parseInt(String(e), 10)),
								[1, 2].includes(e) || (e = 1),
								(t.report_channel = 1 === e ? 'cn' : 'sg')
						}
						void 0 !== t.channel && (t.report_channel = t.channel),
							(this._options = __assign({}, this._options, t))
					} else this.appId = t
					this._emit('init')
				}
			}),
			(e.prototype.config = function(t) {
				this._inited &&
					((t = __assign({}, t)),
					this._emit('before-config', t),
					void 0 !== t.log && (this.logger.setEnable(t.log), delete t.log),
					this._emit('config', t))
			}),
			(e.prototype.send = function() {
				this._inited && ((this._sended = !0), this._emit('send'))
			}),
			(e.prototype.event = function(t, e, n) {
				void 0 === e && (e = {}), void 0 === n && (n = !1)
				var i = {
						event: t,
						params: e || {},
						session_id: this._getExtraData('session_id'),
						local_time_ms: +new Date(),
					},
					s = this._options.disable_storage
				n || s ? this._emit('immediate-report', i) : this._emit('event', i)
			}),
			(e.prototype.setProfile = function(t) {
				this._emit('profile', t)
			}),
			(e.prototype.setOnceProfile = function(t) {
				this._emit('profile-once', t)
			}),
			(e.prototype.getVar = function(t, e, n) {
				this._emit('ab-var', { name: t, defaultValue: e, callback: n })
			}),
			(e.prototype.getAllVars = function(t) {
				this._emit('ab-allvars', t)
			}),
			(e.prototype.getToken = function(t) {
				var e = this,
					n = function() {
						var n = e._envInfo.user
						return t(__assign({}, n))
					}
				this._tokenOK
					? n()
					: this._once('token-ok', function() {
							n()
					  })
			}),
			e
		)
	})(Hook)
TeaSdk.use(default_1, { name: 'token', type: 'plugin' }),
	TeaSdk.use(default_1$1, { name: 'event', type: 'plugin' }),
	TeaSdk.use(default_1$2, { name: 'report', type: 'plugin' }),
	TeaSdk.use(default_1$3, { name: 'profile', type: 'plugin' }),
	TeaSdk.use(default_1$4, { name: 'ab', type: 'plugin' })
var enterTime,
	default_1$5 = (function(t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this
		}
		return (
			__extends(e, t),
			(e.prototype.apply = function() {
				var t = this
				this.sdk._on('device', function(t) {
					wx &&
						(wx.getSystemInfo &&
							wx.getSystemInfo({
								success: function(e) {
									var n = {
										platform: 'miniProduct',
										brand: e.brand,
										device_model: e.model,
										pixelRatio: e.pixelRatio,
										resolution: e.screenWidth + 'x' + e.screenHeight,
										screen_width: e.screenWidth,
										screen_height: e.screenHeight,
										windowWidth: e.windowWidth,
										windowHeight: e.windowHeight,
										wx_version: e.version,
										os_version: e.system,
										os_name: e.platform,
										SDKVersion: e.SDKVersion,
										fontSizeSetting: e.fontSizeSetting,
										language: e.language,
									}
									t._mergeEnv(n)
									var i = {
										mp_platform: 0,
										mp_platform_app_version: e.version,
										mp_platform_basic_version: e.SDKVersion,
									}
									t._mergeEnv(i)
								},
							}),
						wx.getNetworkType &&
							wx.getNetworkType({
								success: function(e) {
									var n = { networkType: e.networkType }
									t._mergeEnv(n)
								},
							}))
				}),
					this.sdk._on('init', function(e) {
						t.sdk._emit('report-option', {
							dataType: 'json',
							header: { 'content-type': 'application/json' },
						})
					})
			}),
			e
		)
	})(PluginBase),
	mpLaunch = function(t, e) {
		t('mp_launch', __assign({}, e))
	},
	mpEnter = function(t, e) {
		;(enterTime = +new Date()), t('mp_enter', __assign({}, e))
	},
	mpExit = function(t, e) {
		void 0 === e && (e = {})
		var n = getCurrentPages(),
			i = n[n.length - 1].route,
			s = void 0 === enterTime ? 0 : +new Date() - enterTime
		t('mp_exit', __assign({ duration: s, page_path: i }, e)),
			(enterTime = void 0)
	},
	purchase = function(t, e) {
		t('purchase', __assign({}, e))
	},
	quest = function(t, e) {
		t('quest', __assign({}, e))
	},
	updateLevel = function(t, e) {
		t('update_level', __assign({}, e))
	},
	createGameRole = function(t, e) {
		t('create_gamerole', __assign({}, e))
	},
	checkout = function(t, e) {
		t('check_out', __assign({}, e))
	},
	addToFavourite = function(t, e) {
		t('add_to_favourite', __assign({}, e))
	},
	predefined = Object.freeze({
		mpLaunch: mpLaunch,
		mpEnter: mpEnter,
		mpExit: mpExit,
		purchase: purchase,
		quest: quest,
		updateLevel: updateLevel,
		createGameRole: createGameRole,
		checkout: checkout,
		addToFavourite: addToFavourite,
	}),
	default_1$6 = (function(t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this
		}
		return (
			__extends(e, t),
			(e.prototype.apply = function() {
				this.sdk._on('instantiation', function(t) {
					Object.keys(predefined).forEach(function(e) {
						t[e] = predefined[e].bind(null, t.event.bind(t))
					})
				})
			}),
			e
		)
	})(PluginBase),
	storage = function(t, e) {
		return (function() {
			function t() {}
			return (
				(t.prototype.get = function(t) {
					try {
						return wx.getStorageSync(t)
					} catch (t) {}
				}),
				(t.prototype.set = function(t, e) {
					try {
						return wx.setStorageSync(t, e), !0
					} catch (t) {}
					return !1
				}),
				(t.prototype.remove = function(t) {
					try {
						wx.removeStorageSync(t)
					} catch (t) {}
				}),
				t
			)
		})()
	},
	request = function(t, e) {
		return function(t) {
			return wx.request(__assign({}, t, { dataType: t.dataType || 'json' }))
		}
	},
	Logger = (function() {
		function t(t) {
			;(this.enable = !0), (this.console = t)
		}
		return (
			(t.prototype.setEnable = function(t) {
				this.enable = t
			}),
			(t.prototype.info = function() {
				for (var t, e = [], n = 0; n < arguments.length; n++)
					e[n] = arguments[n]
				this.enable && (t = this.console).log.apply(t, e)
			}),
			(t.prototype.warn = function() {
				for (var t, e = [], n = 0; n < arguments.length; n++)
					e[n] = arguments[n]
				this.enable && (t = this.console).warn.apply(t, e)
			}),
			(t.prototype.error = function() {
				for (var t, e = [], n = 0; n < arguments.length; n++)
					e[n] = arguments[n]
				this.enable && (t = this.console).error.apply(t, e)
			}),
			t
		)
	})(),
	logger = function(t, e) {
		return (function(t) {
			function e() {
				return t.call(this, console) || this
			}
			return __extends(e, t), e
		})(Logger)
	},
	makeUuid = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(t) {
			var e = (16 * Math.random()) | 0
			return ('x' === t ? e : (3 & e) | 8).toString(16)
		})
	},
	default_1$7 = (function(t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this
		}
		return (
			__extends(e, t),
			(e.prototype.apply = function() {
				var t = this.sdk
				t._once('auto-report', function() {
					var e = makeUuid()
					t._setExtraData('session_id', e)
					var n = function(e) {
							t._tokenOK ? e() : t._once('token-ok', e)
						},
						i = {
							onShow: function(i) {
								;(e = makeUuid()),
									t._setExtraData('session_id', e),
									t._setExtraData('session_start', +new Date())
								var s = i.query,
									o = s.from_uid,
									r = s.share_depth
								t._setExtraData('from_uid', o),
									t._mergeEnv({ rangers_mp_from_uid: o || '0' }),
									t._setExtraData('share_depth', Number(r) || 0),
									t._setExtraData('session_depth', 0)
								var a = i.scene
								a && t._setExtraData('scene', a),
									n(function() {
										return (function(n) {
											var i = n.referrerInfo,
												s = __rest(n, ['referrerInfo']),
												o = s.query,
												r = __rest(s, ['query']),
												a = __assign({}, o, i)
											t.event(
												'app_launch',
												__assign(
													{ session_id: e },
													r,
													Object.keys(a).reduce(function(t, e) {
														return (t['query_' + e] = a[e]), t
													}, {}),
												),
												!0,
											)
										})(i)
									})
							},
							onHide: function() {
								var e = t._getExtraData('session_start'),
									i = Math.ceil((+new Date() - e) / 1e3),
									s = t._getExtraData('session_depth'),
									o = t._getExtraData('scene'),
									r = getCurrentPages(),
									a = r[r.length - 1],
									u = a.route,
									p = a.options
								n(function() {
									t.event(
										'app_terminate',
										__assign(
											{ exit_page: u, session_duration: i, session_depth: s },
											o ? { scene: o } : {},
											Object.keys(p).reduce(function(t, e) {
												return (t['query_' + e] = p[e]), t
											}, {}),
										),
										!0,
									)
								})
							},
							onError: function(e) {
								n(function() {
									t.event('on_error', { on_error: e }, !0)
								})
							},
						}
					;(t.appLaunch = function(t) {
						i.onShow(t)
					}),
						(t.appHide = function() {
							i.onHide()
						}),
						(t.appError = function(t) {
							i.onError(t)
						})
					var s = App
					App = function(t) {
						return (
							Object.keys(i).forEach(function(e) {
								var n = t[e]
								t[e] = function() {
									for (var t = [], s = 0; s < arguments.length; s++)
										t[s] = arguments[s]
									try {
										i[e].apply(this, t)
									} catch (t) {}
									return n && n.apply(this, t)
								}
							}),
							s(t)
						)
					}
					var o = {
						onShow: function() {
							var e = getCurrentPages(),
								i = e[e.length - 1],
								s = i.route,
								o = i.options,
								r = Number(t._getExtraData('session_depth')) || 0
							t._setExtraData('session_depth', r + 1)
							var a = t._getExtraData('scene')
							n(function() {
								t.event(
									'predefine_pageview',
									__assign(
										{ path: s },
										a ? { scene: a } : {},
										Object.keys(o).reduce(function(t, e) {
											return (t['query_' + e] = o[e]), t
										}, {}),
									),
									!0,
								)
							})
						},
						onShareAppMessage: function(e) {
							var i = t._envInfo.user.ssid,
								s = Number(t._getExtraData('share_depth')) + 1
							if (e.path) {
								var o = e.path,
									r = e.title,
									a =
										'from_uid=' +
										i +
										'&share_depth=' +
										s +
										'&from_title=' +
										encodeURIComponent(r),
									u = '',
									p = o.indexOf('#')
								;-1 !== p && ((u = o.substr(p)), (o = o.substr(0, p))),
									-1 !== o.indexOf('?') ? (o += '&' + a) : (o += '?' + a),
									(e.path = o + u)
							}
							return (
								n(function() {
									return (function(e) {
										var n = e.title,
											o = e.path,
											r = void 0 === o ? '' : o
										t.event(
											'on_share',
											{
												title: n,
												path: r,
												page_path: r.split('?')[0],
												query_from_uid: i,
												query_share_depth: s,
											},
											!0,
										)
									})(e)
								}),
								__assign({}, e, { from_uid: i, share_depth: s })
							)
						},
					}
					;(t.predefinePageview = function() {
						o.onShow()
					}),
						(t.shareAppMessage = function(t) {
							return o.onShareAppMessage(t)
						})
					var r = Page
					Page = function(t) {
						return (
							Object.keys(o).forEach(function(e) {
								var n = t[e]
								'onShareAppMessage' === e
									? n &&
									  (t[e] = function() {
											for (var t = [], i = 0; i < arguments.length; i++)
												t[i] = arguments[i]
											var s = n ? n.apply(this, t) : {}
											try {
												var r = o[e].apply(this, [s])
												s.path = r.path
											} catch (t) {}
											return s
									  })
									: (t[e] = function() {
											for (var t = [], i = 0; i < arguments.length; i++)
												t[i] = arguments[i]
											try {
												o[e].apply(this, t)
											} catch (t) {}
											return n && n.apply(this, t)
									  })
							}),
							r(t)
						)
					}
				})
			}),
			e
		)
	})(PluginBase),
	default_1$8 = (function(t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this
		}
		return (
			__extends(e, t),
			(e.prototype.apply = function() {
				this.sdk._on('before-config', function(t, e) {
					void 0 !== e.gender &&
						([1, 2, '1', '2'].includes(e.gender)
							? (e.gender = e.gender < 2 ? 'male' : 'female')
							: delete e.gender)
				})
			}),
			e
		)
	})(PluginBase),
	SDK_VERSION = '1.0.10',
	SDK_NAME = '@dp/tea-sdk-wx',
	default_1$9 = (function(t) {
		function e() {
			return (null !== t && t.apply(this, arguments)) || this
		}
		return (
			__extends(e, t),
			(e.prototype.apply = function() {
				var t = this
				this.sdk._on('instantiation', function() {
					t.sdk._mergeEnv({
						_sdk_version: SDK_VERSION,
						_sdk_name: SDK_NAME.replace('@dp/tea-', '') || 'sdk-wx',
					})
				})
			}),
			e
		)
	})(PluginBase)
TeaSdk.use(default_1$7, { type: 'plugin' }),
	TeaSdk.use(default_1$5, { type: 'plugin' }),
	TeaSdk.use(default_1$6, { type: 'plugin' }),
	TeaSdk.use(default_1$8, { type: 'plugin' }),
	TeaSdk.use(storage, { name: 'storage', type: 'adapter' }),
	TeaSdk.use(request, { name: 'request', type: 'adapter' }),
	TeaSdk.use(logger, { name: 'logger', type: 'adapter' }),
	TeaSdk.use(default_1$9, { type: 'plugin' })
var index = new TeaSdk()
// module.exports = index
export default index
