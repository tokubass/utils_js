if( typeof document.getElementsByClassName === "undefined"){
    document.getElementsByClassName = function(class_name){
	var  class_selectors, _element, _elements, i, _len;
	class_selectors = [];
	_elements = document.getElementsByTagName("*");
	_len = _elements.length;
	if(_len > 0){
	    for( i = 0; i < _len; i++){
		_element = _elements[i];
		if(_element.getAttribute("className") === class_name){
		    class_selectors.push( _element);
		}
	    }
	}
	return class_selectors;
    };
}

if ( typeof window.console === "undefined") {
    window.console = {};
    window.console.log = function(str){
        return str;
    };
}