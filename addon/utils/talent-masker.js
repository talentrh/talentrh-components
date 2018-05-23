export default {
  applyMask(inputElement, mask) {
    VMasker(inputElement).maskPattern(mask);
  },

  phoneMask(inputElement, mask) {
    let inputHandler = this._getInputPhoneHandler();
    this.applyMask(inputElement, mask[0]);
    inputElement.addEventListener('input', inputHandler.bind(undefined, mask, 14), false);
  },

  phoneWithoutDDDMask(inputElement, mask) {
    let inputHandler = this._getInputPhoneHandler();
    this.applyMask(inputElement, mask[0]);
    inputElement.addEventListener('input', inputHandler.bind(undefined, mask, 10), false);
  },

  format(text, mask) {
    return VMasker.toPattern(text, mask);
  },

  _getInputPhoneHandler() {
    return function(masks, max, event) {
    	let c = event.target;
    	let v = c.value.replace(/\D/g, '');
    	let m = c.value.length > max ? 1 : 0;
    	VMasker(c).unMask();
    	VMasker(c).maskPattern(masks[m]);
    	c.value = VMasker.toPattern(v, masks[m]);
    }
  }
}
