webpackHotUpdate(0,{

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Submission = function (_Component) {
	  _inherits(Submission, _Component);

	  function Submission(props) {
	    _classCallCheck(this, Submission);

	    var _this = _possibleConstructorReturn(this, (Submission.__proto__ || Object.getPrototypeOf(Submission)).call(this, props));

	    _this.state = {
	      loaded: false
	    };
	    return _this;
	  }

	  _createClass(Submission, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.setState({ loaded: true });
	      console.log("inside did mount");
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        null,
	        _react2.default.createElement(
	          "h1",
	          null,
	          "8Hello from Submit Challenge Page!!! Google Client"
	        ),
	        _react2.default.createElement(
	          "span",
	          { id: "signinButton", "class": "pre-sign-in" },
	          this.state.loaded ? _react2.default.createElement("span", {
	            className: "g-signin",
	            "data-callback": "signinCallback",
	            "data-clientid": "909357984704-5rs2lm82uopdd1d94l8v34thi31mnc2e.apps.googleusercontent.com",
	            "data-cookiepolicy": "single_host_origin",
	            "data-scope": "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube" }) : null
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "post-sign-in" },
	          _react2.default.createElement(
	            "div",
	            null,
	            _react2.default.createElement("img", { id: "channel-thumbnail" }),
	            _react2.default.createElement("span", { id: "channel-name" })
	          ),
	          _react2.default.createElement(
	            "div",
	            null,
	            _react2.default.createElement(
	              "label",
	              { "for": "title" },
	              "Title:"
	            ),
	            _react2.default.createElement("input", { id: "title", type: "text", value: "Default Title" })
	          ),
	          _react2.default.createElement(
	            "div",
	            null,
	            _react2.default.createElement(
	              "label",
	              { "for": "description" },
	              "Description:"
	            ),
	            _react2.default.createElement(
	              "textarea",
	              { id: "description" },
	              "Default description"
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            null,
	            _react2.default.createElement(
	              "label",
	              { "for": "privacy-status" },
	              "Privacy Status:"
	            ),
	            _react2.default.createElement(
	              "select",
	              { id: "privacy-status" },
	              _react2.default.createElement(
	                "option",
	                null,
	                "public"
	              ),
	              _react2.default.createElement(
	                "option",
	                null,
	                "unlisted"
	              ),
	              _react2.default.createElement(
	                "option",
	                null,
	                "private"
	              )
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            null,
	            _react2.default.createElement("input", { input: true, type: "file", id: "file", className: "button", accept: "video/*" }),
	            _react2.default.createElement(
	              "button",
	              { id: "button" },
	              "Upload Video"
	            ),
	            _react2.default.createElement(
	              "div",
	              { className: "during-upload" },
	              _react2.default.createElement(
	                "p",
	                null,
	                _react2.default.createElement("span", { id: "percent-transferred" }),
	                "% done (",
	                _react2.default.createElement("span", { id: "bytes-transferred" }),
	                "/",
	                _react2.default.createElement("span", { id: "total-bytes" }),
	                " bytes)"
	              ),
	              _react2.default.createElement("progress", { id: "upload-progress", max: "1", value: "0" })
	            ),
	            _react2.default.createElement(
	              "div",
	              { className: "post-upload" },
	              _react2.default.createElement(
	                "p",
	                null,
	                "Uploaded video with id ",
	                _react2.default.createElement("span", { id: "video-id" }),
	                ". Polling for status..."
	              ),
	              _react2.default.createElement("ul", { id: "post-upload-status" }),
	              _react2.default.createElement("div", { id: "player" })
	            ),
	            _react2.default.createElement(
	              "p",
	              { id: "disclaimer" },
	              "By uploading a video, you certify that you own all rights to the content or that you are authorized by the owner to make the content publicly available on YouTube, and that it otherwise complies with the YouTube Terms of Service located at ",
	              _react2.default.createElement(
	                "a",
	                { href: "http://www.youtube.com/t/terms", target: "_blank" },
	                "http://www.youtube.com/t/terms"
	              )
	            )
	          )
	        ),
	        this.googleClient()
	      );
	    }
	  }]);

	  return Submission;
	}(_react.Component);

	exports.default = Submission;

/***/ }

})