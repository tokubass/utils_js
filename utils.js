var __marge, __async_call, __slice, __bind, __uncurry_this, __add_event, __remove_event;

__marge = function(destination, source) {
  var key, value;
  for (key in source) {
    value = source[key];
    if (source.hasOwnProperty(key) === true) destination[key] = source[key];
  }
  return destination;
};

__slice = Array.prototype.slice;

__bind = Function.prototype.bind || function(_obj){
    var _this, _args;
    _this = this;
    _args = __slice.call(arguments, 1);
    return function(){
	var _arg;
	_arg = __slice.call(arguments);
	return _this.apply(_obj, _args.concat(_arg));
    };
};

__uncurry_this = __bind.call(__bind, Function.prototype.call);

__async_call = function(){
    var _slice, _bind, _apply;
    _slice = __uncurry_this(__slice);
    _bind = __uncurry_this(__bind);
    _apply = __uncurry_this(Function.prototype.apply);

    return typeof setImmediate === "function"? function(){
	var _args;
	_args = _slice(arguments);
	setImmediate( _apply( _bind, null, _args));
    }: typeof MessageChannel === "function"? function(){
	var ch, queue;
	ch = new MessageChannel();
	queue = [];
	ch.port1.onmessage = function(){ queue.shift()(); };
	return function(){
	    var _args;
	    _args = _slice(arguments);
	    queue.push(_apply(_bind, null, _args));
	    ch.port2.postMessage(0);
	};
    }(): function(){
	var _args;
	_args = _slice(arguments);
	setTimeout(_apply(_bind, null, _args), 0);
  };
}();

__add_event = function(obj, type, func){
    if(typeof obj.addEventListener !== "undefined"){
	obj.addEventListener(type, func, false);
    }else if(typeof obj.attachEvent !== "undefined"){
	obj.attachEvent("on" + type, func);
    }
};

__remove_event = function(obj, type, func){
    if(obj.removeEventListener){
	obj.removeEventListener(type, func, false);
    }else if(obj.detachEvent){
	obj.detachEvent("on" + type, func);
    }
}