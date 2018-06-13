"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Forest = require("./Forest");

var _Forest2 = _interopRequireDefault(_Forest);

var _Options = require("./Options");

var _Options2 = _interopRequireDefault(_Options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;
class RelForestOptions extends globalType.Model {
  constructor(name = "RelForestOptions") {
    super();
    if (FileSystem._sig_server) {
      let opt = new _Options2.default();
      let ptr = new Ptr(opt);
      this.add_attr({
        options: ptr,
        zoneForest: new Ptr(new _Forest2.default(ptr))
      });
    }
  }
}

exports.default = RelForestOptions;
spinalCore.register_models([RelForestOptions]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWxGb3Jlc3RPcHRpb25zLmpzIl0sIm5hbWVzIjpbInNwaW5hbENvcmUiLCJyZXF1aXJlIiwiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlJlbEZvcmVzdE9wdGlvbnMiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkZpbGVTeXN0ZW0iLCJfc2lnX3NlcnZlciIsIm9wdCIsIk9wdGlvbnMiLCJwdHIiLCJQdHIiLCJhZGRfYXR0ciIsIm9wdGlvbnMiLCJ6b25lRm9yZXN0IiwiRm9yZXN0IiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFIQSxNQUFNQSxhQUFhQyxRQUFRLHlCQUFSLENBQW5CO0FBQ0EsTUFBTUMsYUFBYSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7QUFJZSxNQUFNRSxnQkFBTixTQUErQkgsV0FBV0ksS0FBMUMsQ0FBZ0Q7QUFDN0RDLGNBQVlDLE9BQU8sa0JBQW5CLEVBQXVDO0FBQ3JDO0FBQ0EsUUFBSUMsV0FBV0MsV0FBZixFQUE0QjtBQUMxQixVQUFJQyxNQUFNLElBQUlDLGlCQUFKLEVBQVY7QUFDQSxVQUFJQyxNQUFNLElBQUlDLEdBQUosQ0FBUUgsR0FBUixDQUFWO0FBQ0EsV0FBS0ksUUFBTCxDQUFjO0FBQ1pDLGlCQUFTSCxHQURHO0FBRVpJLG9CQUFZLElBQUlILEdBQUosQ0FBUSxJQUFJSSxnQkFBSixDQUFXTCxHQUFYLENBQVI7QUFGQSxPQUFkO0FBSUQ7QUFDRjtBQVg0RDs7a0JBQTFDUixnQjtBQWNyQkwsV0FBV21CLGVBQVgsQ0FBMkIsQ0FBQ2QsZ0JBQUQsQ0FBM0IiLCJmaWxlIjoiUmVsRm9yZXN0T3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNwaW5hbENvcmUgPSByZXF1aXJlKFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIik7XG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcbmltcG9ydCBGb3Jlc3QgZnJvbSBcIi4vRm9yZXN0XCJcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWxGb3Jlc3RPcHRpb25zIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUgPSBcIlJlbEZvcmVzdE9wdGlvbnNcIikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKEZpbGVTeXN0ZW0uX3NpZ19zZXJ2ZXIpIHtcbiAgICAgIGxldCBvcHQgPSBuZXcgT3B0aW9ucztcbiAgICAgIGxldCBwdHIgPSBuZXcgUHRyKG9wdCk7XG4gICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgb3B0aW9uczogcHRyLFxuICAgICAgICB6b25lRm9yZXN0OiBuZXcgUHRyKG5ldyBGb3Jlc3QocHRyKSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbUmVsRm9yZXN0T3B0aW9uc10pIl19