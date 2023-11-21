module.exports = isEmpty = (value) => {
  // Null or Undefined check
  if (typeof value === "undefined" || value === null) return true;

  // String check
  if (typeof value === "string") return value.trim() === "";

  // Array check
  if (Array.isArray(value)) return value.length === 0;

  // Object check
  var isObject =
    typeof value === "object" &&
    Object.prototype.toString.call(value) === "[object Object]";

  if (isObject) {
    for (var obj in value) {
      if (value.hasOwnProperty(obj)) return false;
    }
    return true;
  }

  // Other types are not-empty
  return false;
};
