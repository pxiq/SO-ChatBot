//execute arbitrary js code in a relatively safe environment
bot.eval = (function () {
// http://tinkerbin.com/fKL7iwCQ
var worker_code = atob( 'dmFyIGdsb2JhbCA9IHRoaXM7CgovKm1vc3QgZXh0cmEgZnVuY3Rpb25zIGNvdWxkIGJlIHBvc3NpYmx5IHVuc2FmZSovCnZhciB3aGl0ZXkgPSB7Cgknc2VsZicgICAgICAgICAgICAgICA6IDEsCgknb25tZXNzYWdlJyAgICAgICAgICA6IDEsCgkncG9zdE1lc3NhZ2UnICAgICAgICA6IDEsCgknZ2xvYmFsJyAgICAgICAgICAgICA6IDEsCgknd2hpdGV5JyAgICAgICAgICAgICA6IDEsIC8qbG9vayBtb20sIEknbSBhIHdoaXRlbGlzdCwgY29udGFpbmluZyBpdHNlbGYhKi8KCSdldmFsJyAgICAgICAgICAgICAgIDogMSwKCSdBcnJheScgICAgICAgICAgICAgIDogMSwKCSdCb29sZWFuJyAgICAgICAgICAgIDogMSwKCSdEYXRlJyAgICAgICAgICAgICAgIDogMSwKCSdGdW5jdGlvbicgICAgICAgICAgIDogMSwKCSdOdW1iZXInICAgICAgICAgICAgIDogMSwKCSdPYmplY3QnICAgICAgICAgICAgIDogMSwKCSdSZWdFeHAnICAgICAgICAgICAgIDogMSwKCSdTdHJpbmcnICAgICAgICAgICAgIDogMSwKCSdFcnJvcicgICAgICAgICAgICAgIDogMSwKCSdFdmFsRXJyb3InICAgICAgICAgIDogMSwKCSdSYW5nZUVycm9yJyAgICAgICAgIDogMSwKCSdSZWZlcmVuY2VFcnJvcicgICAgIDogMSwKCSdTeW50YXhFcnJvcicgICAgICAgIDogMSwKCSdUeXBlRXJyb3InICAgICAgICAgIDogMSwKCSdVUklFcnJvcicgICAgICAgICAgIDogMSwKCSdkZWNvZGVVUkknICAgICAgICAgIDogMSwKCSdkZWNvZGVVUklDb21wb25lbnQnIDogMSwKCSdlbmNvZGVVUkknICAgICAgICAgIDogMSwKCSdlbmNvZGVVUklDb21wb25lbnQnIDogMSwKCSdpc0Zpbml0ZScgICAgICAgICAgIDogMSwKCSdpc05hTicgICAgICAgICAgICAgIDogMSwKCSdwYXJzZUZsb2F0JyAgICAgICAgIDogMSwKCSdwYXJzZUludCcgICAgICAgICAgIDogMSwKCSdJbmZpbml0eScgICAgICAgICAgIDogMSwKCSdKU09OJyAgICAgICAgICAgICAgIDogMSwKCSdNYXRoJyAgICAgICAgICAgICAgIDogMSwKCSdOYU4nICAgICAgICAgICAgICAgIDogMSwKCSd1bmRlZmluZWQnICAgICAgICAgIDogMQp9OwoKWyBnbG9iYWwsIGdsb2JhbC5fX3Byb3RvX18gXS5mb3JFYWNoKGZ1bmN0aW9uICggb2JqICkgewoJT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoIG9iaiApLmZvckVhY2goZnVuY3Rpb24oIHByb3AgKSB7CgoJCWlmKCAhd2hpdGV5Lmhhc093blByb3BlcnR5KCBwcm9wICkgKSB7CgkJCU9iamVjdC5kZWZpbmVQcm9wZXJ0eSggb2JqLCBwcm9wLCB7CgkJCQlnZXQgOiBmdW5jdGlvbigpIHsKCQkJCQl0aHJvdyAnU2VjdXJpdHkgRXhjZXB0aW9uOiBDYW5ub3QgYWNjZXNzICcgKyBwcm9wOwoJCQkJCXJldHVybiAxOwoJCQkJfSwKCgkJCQljb25maWd1cmFibGUgOiBmYWxzZQoJCQl9KTsKCQl9Cgl9KTsgLyplbmQgd2hpbGUqLwp9KTsKCgpPYmplY3QuZGVmaW5lUHJvcGVydHkoIEFycmF5LnByb3RvdHlwZSwgJ2pvaW4nLCB7Cgl3cml0YWJsZTogZmFsc2UsCgljb25maWd1cmFibGU6IGZhbHNlLAoJZW51bXJhYmxlOiBmYWxzZSwKCgl2YWx1ZTogKGZ1bmN0aW9uICggb2xkICkgewoJCXJldHVybiBmdW5jdGlvbiAoIGFyZyApIHsKCQkJaWYgKCB0aGlzLmxlbmd0aCA+IDUwMCB8fCAoYXJnICYmIGFyZy5sZW5ndGggPiA1MDApICkgewoJCQkJdGhyb3cgJ0V4Y2VwdGlvbjogdG9vIG1hbnkgaXRlbXMnOwoJCQl9CgoJCQlyZXR1cm4gb2xkLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTsKCQl9OwoJfSggQXJyYXkucHJvdG90eXBlLmpvaW4gKSkKCn0pOwoKCihmdW5jdGlvbigpewoJInVzZSBzdHJpY3QiOwoKCXZhciBjb25zb2xlID0gewoJCV9pdGVtcyA6IFtdLAoJCWxvZyA6IGZ1bmN0aW9uKCkgewoJCQljb25zb2xlLl9pdGVtcy5wdXNoLmFwcGx5KCBjb25zb2xlLl9pdGVtcywgYXJndW1lbnRzICk7CgkJfQoJfTsKCglmdW5jdGlvbiBleGVjICggY29kZSApIHsKCQl2YXIgcmVzdWx0OwoJCXRyeSB7CgkJCXJlc3VsdCA9IGV2YWwoICcidXNlIHN0cmljdCI7XG4nICsgY29kZSApOwoJCX0KCQljYXRjaCAoIGUgKSB7CgkJCXJlc3VsdCA9IGUudG9TdHJpbmcoKTsKCQl9CgoJCXJldHVybiByZXN1bHQ7Cgl9CgoJc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoIGV2ZW50ICkgewoJCXZhciBqc29uU3RyaW5naWZ5ID0gSlNPTi5zdHJpbmdpZnksIC8qYmFja3VwKi8KCQkJcmVzdWx0ID0gZXhlYyggZXZlbnQuZGF0YS5jb2RlICk7CgkJCQoJCS8qSlNPTi5zdHJpbmdpZnkgZG9lcyBub3QgbGlrZSBmdW5jdGlvbnMsIGVycm9ycyBvciB1bmRlZmluZWQqLwoJCXZhciBzdHJpbmdpZnkgPSBmdW5jdGlvbiAoIGlucHV0ICkgewoJCQl2YXIgdHlwZSA9ICgge30gKS50b1N0cmluZy5jYWxsKCBpbnB1dCApLnNsaWNlKCA4LCAtMSApLAoJCQkJb3V0cHV0OwoKCQkJaWYgKCB0eXBlID09PSAnRnVuY3Rpb24nIHx8IHR5cGUgPT09ICdFcnJvcicgKSB7CgkJCQlvdXRwdXQgPSBpbnB1dC50b1N0cmluZygpOwoJCQl9CgkJCWVsc2UgaWYgKCB0eXBlID09PSAnQXJyYXknICkgewoJCQkJb3V0cHV0ID0gW107CgkJCQlpbnB1dC5mb3JFYWNoKGZ1bmN0aW9uICggaXRlbSwgaWR4ICkgewoJCQkJCW91dHB1dFsgaWR4IF0gPSBzdHJpbmdpZnkoIGl0ZW0gKTsKCQkJCX0pOwoJCQl9CgkJCWVsc2UgaWYgKCB0eXBlID09PSAnT2JqZWN0JyApIHsKCQkJCW91dHB1dCA9IHt9OwoJCQkJT2JqZWN0LmtleXMoIGlucHV0ICkuZm9yRWFjaChmdW5jdGlvbiAoIGtleSApIHsKCQkJCQlvdXRwdXRbIGtleSBdID0gc3RyaW5naWZ5KCBpbnB1dFtrZXldICk7CgkJCQl9KTsKCQkJfQoJCQllbHNlIGlmICggaW5wdXQgPT09IHVuZGVmaW5lZCApIHsKCQkJCW91dHB1dCA9ICd1bmRlZmluZWQnOwoJCQl9CgkJCWVsc2UgewoJCQkJb3V0cHV0ID0gaW5wdXQ7CgkJCX0KCgkJCXJldHVybiBqc29uU3RyaW5naWZ5KCBvdXRwdXQgKTsKCQl9OwoKCQlwb3N0TWVzc2FnZSh7CgkJCWFuc3dlciA6IHN0cmluZ2lmeSggcmVzdWx0ICksCgkJCWxvZyAgICA6IHN0cmluZ2lmeSggY29uc29sZS5faXRlbXMgKSwKCQl9KTsKCX07Cgp9KSgpOwo=' );
var blob = new Blob( [worker_code], { type : 'application/javascript' } ),
	code_url = window.URL.createObjectURL( blob );

return function ( msg ) {
	var timeout,
		worker = new Worker( code_url );

	worker.onmessage = function ( evt ) {
		finish( dressUpAnswer(evt.data) );
	};

	worker.onerror = function ( error ) {
		finish( error.toString() );
	};

	worker.postMessage({
		code : msg.content.substr( 1 )
	});

	timeout = window.setTimeout(function() {
		finish( 'Maximum execution time exceeded' );
	}, 50 );

	function finish ( result ) {
		clearTimeout( timeout );
		worker.terminate();
		msg.directreply( result );
	}

	function dressUpAnswer ( answerObj ) {
		console.log( answerObj, 'eval answerObj' );
		var answer = answerObj.answer,
			log = JSON.parse( answerObj.log ),
			result;

		result = snipAndCodify( answer );

		if ( log && log.length ) {
			result += ' Logged: ' + snipAndCodify( log.join() ) + '';
		}

		return result;
	}
	function snipAndCodify ( str ) {
		var ret;

		if ( str.length > 400 ) {
			ret = '(snip) `' +  str.slice(0, 400) + '`';
		}
		else {
			ret = '`' + str +'`';
		}

		return ret;
	}
};
}());