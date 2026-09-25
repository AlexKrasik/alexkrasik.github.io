import {nextTick, onBeforeUnmount, onMounted, onUnmounted, unref} from "vue";
import {ScrambleText} from "@/assets/scramble";

export function useScramble(elRef, options) {
    const {encryptDuration = 250, decryptDuration = 250, selector = null} = options;
    onMounted(() => {
        prepare();
    });
    onBeforeUnmount(() => {
        const targetEl = unref(elRef);
        const encryptElements = selector ? targetEl?.querySelectorAll(selector) : [targetEl];
        encryptElements?.forEach((el) => {
            el.removeEventListener("encrypted", onEncryptEnd);
            ScrambleText.destroy(el);
        });
    });

    function prepare() {
        const targetEl = unref(elRef);
        const encryptElements = selector ? targetEl.querySelectorAll(selector) : [targetEl];
        encryptElements.forEach((el) => {
            ScrambleText.encrypt(el);
            ScrambleText.encrypt(el, encryptDuration);
            el.addEventListener("encrypted", onEncryptEnd);
        })

        document.addEventListener("localeChange", async (e) => {
            ScrambleText.destroy();
            await nextTick();
            encryptElements.forEach((el) => {
                ScrambleText.encrypt(el);
                ScrambleText.encrypt(el, encryptDuration);
                el.removeEventListener("encrypted", onEncryptEnd);
                el.addEventListener("encrypted", onEncryptEnd, {once: true});
            });
        });
    }

    function onEncryptEnd(e) {
        if (e.detail.duration) ScrambleText.decrypt(e.target, decryptDuration);
    }

    return {prepare};
}
