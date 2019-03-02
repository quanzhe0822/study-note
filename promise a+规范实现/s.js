function Promise(excutor) {
    var self = this;

    self.status = 'pending';
    self.data = null;
    self.onResolvedCallback = [];
    self.onRejectedCallback = [];

    function resolve(v) {
        if (v instanceof Promise) {
            return v.then(resolve, reject);
        }
        setTimeout(function () {
            if (self.status === 'pending') {
                self.status = 'resovled';
                self.data = v;
                self.onResolvedCallback.map(fn => fn(v))
            }
        })
    }

    function reject(e) {
        if (self.status === 'pending') {
            self.stataus = 'rejected';
            self.data = e;
            self.onRejectedCallback.map(fn => fn(e));
        }
    }

    try {
        excutor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    var then;
    var thenCalledOrThrow = false;

    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise!'))
    }

    if (x instanceof Promise) {
        if (x.status === 'pending') {
            x.then(function (v) {
                resolvePromise(promise2, v, resolve, reject)
            }, reject);
        } else {
            x.then(resolve, reject)
        }
        return;
    }
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
        try {
            then = x.then;
            if (typeof then === 'function') {
                then.call(x, function rs(y) {
                    if (thenCalledOrThrow) return;
                    thenCalledOrThrow = true;
                    return resolvePromise(promise2, y, resolve, reject)
                }, function rj(r) {
                    if (thenCalledOrThrow) return;
                    thenCalledOrThrow = true;
                    return reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(e)
        }
    } else {
        resolve(x)
    }
}

Promise.prototype.then = function (onResolved, onRejected) {
    var self = this;
    var promise2;

    onResolved = typeof onResolved === 'function' ? onResolved : function (v) {
        return v
    };
    onRejected = typeof onRejected === 'function' ? onRejected : function (e) {
        throw e
    };

    if (self.status === 'resolved') {
        return promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    var x = onResolved(self.data);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    if (self.status === 'rejected') {
        return promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    var x = onRejected(self.data);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    if (self.status === 'pending') {
        return promise2 = new Promise(function (resolve, reject) {
            self.onResolvedCallback.push(function (v) {
                try {
                    var x = onResolved(self.data);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            });
            self.onRejectedCallback.push(function (v) {
                try {
                    var x = onRejected(self.data);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            });
        })
    }
}
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}

Promise.deferred = Promise.defer = function () {
    var dfd = {}
    dfd.promise = new Promise(function (resolve, reject) {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}