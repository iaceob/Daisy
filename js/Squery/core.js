/**
 * Created by canknow on 2015/6/30.
 */

(function( window, undefined ) {

    //首先定义了jExtend函数。
    function Squery( selector, context ) {
        return new Squery.fn.init( selector, context );
    }

    //定义jExtend的原型。
    Squery.fn = Squery.prototype = {

        //因为重写了jExtend的原型所以把constructor从新指向jExtend
        constructor: Squery,

        // Start with an empty selector
        selector: "",

        // The default length of a Squery object is 0
        length: 0,
        setArray: function( arr ) {
            this.length = 0;
            [].push.apply( this, arr );
            return this;
        },
        toArray: function() {
            return [].slice.call(this);
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function( elems ) {
            // Build a new Squery matched element set
            var result = Squery.merge( this.constructor(), elems );
            // Add the old object onto the stack (as a reference)
            result.prevObject = this;
            // Return the newly-formed element set
            return result;
        },

        // Execute a callback for every element in the matched set.
        each: function( callback ) {
            return Squery.each( this, callback );
        },
        first: function() {
            return this.equal( 0 );
        },
        last: function() {
            return this.equal( -1 );
        },
        equal: function( i ) {
            var len = this.length,
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
        },
        back: function() {
            return this.prevObject || this.constructor(null);
        }
    };

    Squery.extend = Squery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},// 常见用法 Squery.extend( obj1, obj2 )，此时，target为arguments[0]
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {// 如果第一个参数为true，即 Squery.extend( true, obj1, obj2 ); 的情况
            deep = target;// 此时target是true
            target = arguments[1] || {};// target改为 obj1
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !Squery.isFunction(target) ) { // 处理奇怪的情况，比如 Squery.extend( 'hello' , {nick: 'casper})~~
            target = {};
        }

        // extend Squery itself if only one argument is passed
        if ( length === i ) {// 处理这种情况 Squery.extend(obj)，或 Squery.fn.extend( obj )
            target = this;// Squery.extend时，this指的是jExtend；Squery.fn.extend时，this指的是jExtend.fn
            --i;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) { // 比如 Squery.extend( obj1, obj2, obj3, ojb4 )，options则为 obj2、obj3...
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {// 防止自引用，不赘述
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    // 如果是深拷贝，且被拷贝的属性值本身是个对象
                    if ( deep && copy && ( Squery.isPlainObject(copy) || (copyIsArray = Squery.isArray(copy)) ) ) {
                        if ( copyIsArray ) { // 被拷贝的属性值是个数组
                            copyIsArray = false;
                            clone = src && Squery.isArray(src) ? src : [];

                        }
                        else {
                            clone = src && Squery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = Squery.extend( deep, clone, copy );// 递归~

                        // Don't bring in undefined values
                    }
                    else if ( copy !== undefined ) {// 浅拷贝，且属性值不为undefined
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    Squery.extend({
        error: function(msg) {
            throw new Error(msg);
        },
        each: function( obj, callback ) {
            var i = 0,
                length = obj.length,
                isArray = isArraylike( obj );

            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            }
            else {
                for ( i in obj ) {
                    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            }
            return obj;
        },

        // Support: Android<4.1, PhantomJS<2
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function( first, second ) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for ( ; j < len; j++ ) {
                first[ i++ ] = second[ j ];
            }
            first.length = i;
            return first;
        },
        isFunction: function( obj ) {
            return Squery.type(obj) === "function";
        },
        isArray: Array.isArray,
        isWindow: function( obj ) {
            return obj != null && obj === obj.window;
        },
        isNumeric: function( obj ) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            // adding 1 corrects loss of precision from parseFloat (#15100)
            return !Squery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
        },
        isPlainObject: function( obj ) {
            // Not plain objects:
            // - Any object or value whose internal [[Class]] property is not "[object Object]"
            // - DOM nodes
            // - window
            if ( Squery.type( obj ) !== "object" || obj.nodeType || Squery.isWindow( obj ) ) {
                return false;
            }

            if ( obj.constructor &&!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
                return false;
            }

            // If the function hasn't returned already, we're confident that
            // |obj| is a plain object, created by {} or constructed with new Object
            return true;
        },
        isEmptyObject: function( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        },
        type: function( obj ) {

            if ( obj == null ) {
                return obj + "";
            }
            // Support: Android<4.0 (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ? {}[ obj.toString ] || "object" : typeof obj;
        }

    });

    Squery.param = function(obj) {
        var prefix, s = [];
        for ( prefix in obj ) {
            s[ s.length ] = encodeURIComponent( prefix ) + "=" + encodeURIComponent( obj[ prefix ]);
        }
        return s.join( "&" );
    }

    Squery.fn = Squery.prototype;

    window.Squery = window.$ = Squery;
})( window);