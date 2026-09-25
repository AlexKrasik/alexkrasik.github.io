const ScrambleText = {
    charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;:?*()_+@#$%^&[]{}",
    _elementToTexts: new WeakMap(),
    _elements: new Set(),

    create(el) {
        if (this._elementToTexts.has(el)) return this._elementToTexts.get(el);

        const texts = new Map();
        const nodes = this.getTextNodes(el);
        const maxLength = Array.from(nodes).reduce((max, node) => Math.max(max, node.length), nodes[0] || 0)
        const elementOptions = {texts: texts, maxLength: maxLength, lastRender: 0};
        nodes.forEach(node => texts.set(node, node.nodeValue));
        this._elementToTexts.set(el, elementOptions);
        this._elements.add(el);

        return elementOptions;
    },
    destroy(el = null, restore = true) {
        if (el) {
            if (restore) ScrambleText.decrypt(el, 0);
            this._elementToTexts.delete(el);
            this._elements.delete(el);
        } else {
            [...this._elements].forEach((el) => this.destroy(el, restore));
        }
    },
    encrypt(el, duration = 0) {
        const state = this.create(el);
        state.gen = Date.now();
        this.animate(el, true, 0, duration, performance.now(), state.gen);
    },
    decrypt(el, duration = 0) {
        const state = this.create(el);
        state.gen = Date.now();
        this.animate(el, false, 0, duration, performance.now(), state.gen);
    },
    animate(el, isEncrypt = false, index = 0, duration = 0, lastRender = performance.now(), gen = null) {
        const state = this._elementToTexts.get(el);
        if (!state) return; //element not registered

        if (state.gen !== gen) return; //different animation starts
        if (index >= state.maxLength) { // animation is over
            const finishEvent = new CustomEvent(isEncrypt ? "encrypted" : "decrypted", {detail: {duration: duration}});
            el.dispatchEvent(finishEvent);
            return;
        }

        const delta = performance.now() - lastRender;
        const msPerChar = duration / state.maxLength;
        const charCount = duration ? Math.floor(delta / msPerChar) : state.maxLength;
        if (charCount > 0) lastRender = performance.now() - delta % msPerChar; // return "change" from delta time

        for (let i = 0; i < charCount; i++) {
            state.texts.forEach((text, node) => {
                const pos = this.getRandomPos(index + i, text.length);
                const newStr = [...node.nodeValue];
                if (isEncrypt) newStr[pos] = newStr[pos] === " " ? " " : this.getRandomChar();
                else newStr[pos] = text[pos];
                node.nodeValue = newStr.join("");
            });
        }
        if (duration !== 0) requestAnimationFrame(() => this.animate(el, isEncrypt, index + charCount, duration, lastRender, gen));
    },
    getTextNodes(el) {
        const result = new Set();

        const textWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, (node) => {
            return node.nodeValue.trim().length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        });

        let node;
        while ((node = textWalker.nextNode())) {
            result.add(node);
        }

        return result;
    },
    getRandomChar() {
        return this.charset[Math.floor(Math.random() * this.charset.length)];
    },
    getRandomPos(index, length) {
        if (length <= 1) return 0;

        let step = Math.floor(length / 2) || 1;
        while (gcd(step, length) !== 1) step = step <= 1 ? length - 1 : step - 1;
        return (index * step) % length;

        function gcd(x, y) { // greatest common divider
            while (y) [x, y] = [y, x % y];
            return x;
        }
    }
}
export {ScrambleText};
