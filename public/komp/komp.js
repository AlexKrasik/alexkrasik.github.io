//#region src/Komp.ts
var e = class e {element=  null;
	bindings = /* @__PURE__ */ new Map();
	_props = null;
	constructor(t = {}, n = "body") {
		this.props = new Proxy(t, e.propsHandlerFactory(this.bindings)), this.prepareHTML(n), this.registerEventListeners(), this.bindInputs();
	}
	prepareHTML(t) {
		let n = document.createElement("template");
		if (n.innerHTML = this.html.trim(), n.content.childNodes.length > 1) {
			let e = document.createElement("div");
			e.innerHTML = n.innerHTML, this.element = e;
		} else this.element = n.content.childNodes.length < 1 ? document.createElement("div") : n.content.firstElementChild;
		this.element.innerHTML = this.element.innerHTML.replaceAll(/\{\{\s*(.*?)\s*}}/g, (e, t) => `<propholder>${t}</propholder>`), this.element.querySelectorAll("propholder").forEach((t) => {
			let n = t.textContent, r = this.getValueByPath(n), i = document.createTextNode(`${r}`);
			e.ensureBinding(this.bindings, n).nodes.add(i), t.after(i), t.remove();
		}), this.element.querySelectorAll("[k-bind]").forEach((t) => {
			let n = t.getAttribute("k-bind") || "";
			t.value = this.getValueByPath(n), e.ensureBinding(this.bindings, n).inputs.add(t);
		}), (document.querySelector(t) || document.body).append(this.element);
	}
	registerEventListeners() {
		this.element && [
			"click",
			"input",
			"change",
			"keydown",
			"keyup"
		].forEach((e) => {
			let t = `[k-on\\:${e}]`;
			(this.element?.querySelectorAll(t))?.forEach((t) => {
				let n = t.getAttribute(`k-on:${e}`);
				if (t.removeAttribute(`k-on:${e}`), !n) return;
				let r = this[n];
				typeof r == "function" && t.addEventListener(e, (e) => r.call(this, e));
			});
		});
	}
	bindInputs() {
		(this.element?.querySelectorAll("[k-bind]"))?.forEach((e) => {
			let t = e.getAttribute("k-bind") || "", n = e instanceof HTMLSelectElement, r = e instanceof HTMLInputElement && (e.type === "checkbox" || e.type === "radio");
			n && r ? e.addEventListener("change", () => {
				let n = r ? e.checked : e.value;
				this.setValueByPath(t, n);
			}) : e.addEventListener("input", () => {
				let n = e.value;
				this.setValueByPath(t, n);
			}), e.removeAttribute("k-bind");
		});
	}
	static ensureBinding(e, t) {
		return e.has(t) || e.set(t, {
			nodes: /* @__PURE__ */ new Set(),
			inputs: /* @__PURE__ */ new Set(),
			proxy: null
		}), e.get(t);
	}
	static propsHandlerFactory(t, n = []) {
		return {
			get(r, i, a) {
				let o = [...n, i].join("."), s = Reflect.get(r, i, a);
				if (typeof s == "object") {
					let r = e.ensureBinding(t, o);
					return r.proxy ||= new Proxy(s, e.propsHandlerFactory(t, [...n, i])), r.proxy;
				}
				return s;
			},
			set(r, i, a, o) {
				let s = [...n, i].join(".");
				if (Array.isArray(o[i]) || Array.isArray(a)) return console.warn(`Array can't be assigned to prop ${s}`), !0;
				if (typeof a != "object" && typeof o[i] == "object") return console.warn(`Can't assign ${typeof a} ("${a}") to object prop(${s})`), !0;
				if (typeof o[i] == "object" && typeof a == "object") {
					for (let e of Object.keys(a)) o[i][e] = a[e];
					return !0;
				}
				Reflect.set(r, i, a, o);
				let c = e.ensureBinding(t, s);
				return c.nodes.forEach((e) => {
					e.textContent = a;
				}), c.inputs.forEach((e) => {
					e instanceof HTMLInputElement && (e.type === "checkbox" || e.type === "radio") && (e.checked = !!a), e.value = a;
				}), !0;
			}
		};
	}
	setValueByPath(e, t) {
		let n = e.split("."), r = n.pop(), i = n.reduce((e, t) => e?.[t], this.props);
		i[r] = t;
	}
	getValueByPath(e) {
		return e.split(".").reduce((e, t) => e?.[t], this.props) ?? "";
	}
	get props() {
		return this._props;
	}
	set props(e) {
		this._props ? console.warn("Reassign props is prohibited") : this._props = e;
	}
	get html() {
		return "";
	}
};
//#endregion
export { e as default };
