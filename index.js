var Destroyed_Notice = 'The listener has been destroyed.';
/**
 * 监听滑动到页面底部
 *
 * @class PullToRequest
 * @param config {Object}
 *      @param [config.buffer] {Number} 距离底部多少距离开始促发回调,默认`50`
 *      @param [config.once] {Boolean} 是否只监听一次,默认`false`
 * @param callback {Function} 回调函数
 * @constructor
 */
function pullToRequest(callback) {
    this.config = {
        buffer: 50,
        once: false
    }

    this.listener = function() {
        if (this.check()) {
            if (this.config.once) {
                this.destroy();
            }

            callback && callback.apply(this);
        }
    }.bind(this);

    this.resume();
}

/**
 * 判断是否应该促发事件
 * @method check
 * @returns {boolean}
 * @private
 */
pullToRequest.prototype.check = function() {
    var height = document.documentElement.scrollHeight,
        top = window.pageYOffset,
        offset = window.innerHeight;

    return (height - top - offset) <= this.config.buffer;
}

/**
 * 恢复监听
 * @method resume
 * @chainable
 */
pullToRequest.prototype.resume = function() {
    if (!this.listener) {
        console.warn(Destroyed_Notice)
    } else {
        window.addEventListener('scroll', this.listener);
    }
    return this;
}

/**
 * 暂停监听
 * @method pause
 * @chainable
 */
pullToRequest.prototype.pause = function() {
    if (!this.listener) {
        console.warn(Destroyed_Notice)
    } else {
        window.removeEventListener('scroll', this.listener);
    }
    return this;
}

/**
 * 销毁
 * @method destroy
 */
pullToRequest.prototype.destroy = function() {
    this.pause(this.listener);
    this.listener = null;

}

module.exports = pullToRequest;
