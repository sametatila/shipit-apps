import { describe, it, expect } from "vitest";
import { sanitizeHtml, sanitizeObject } from "../sanitize";

describe("sanitizeHtml", () => {
  it("should escape HTML angle brackets", () => {
    expect(sanitizeHtml("<script>alert('xss')</script>")).toBe(
      "&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;"
    );
  });

  it("should escape ampersands", () => {
    expect(sanitizeHtml("foo & bar")).toBe("foo &amp; bar");
  });

  it("should escape double quotes", () => {
    expect(sanitizeHtml('hello "world"')).toBe("hello &quot;world&quot;");
  });

  it("should escape single quotes", () => {
    expect(sanitizeHtml("it's")).toBe("it&#x27;s");
  });

  it("should leave normal text unchanged", () => {
    expect(sanitizeHtml("Hello World 123")).toBe("Hello World 123");
  });

  it("should handle empty string", () => {
    expect(sanitizeHtml("")).toBe("");
  });
});

describe("sanitizeObject", () => {
  it("should sanitize all string values in an object", () => {
    const input = { name: "<b>John</b>", age: 25, email: "john@test.com" };
    const result = sanitizeObject(input);
    expect(result.name).toBe("&lt;b&gt;John&lt;/b&gt;");
    expect(result.age).toBe(25);
    expect(result.email).toBe("john@test.com");
  });

  it("should handle object with no string values", () => {
    const input = { count: 5, active: true };
    const result = sanitizeObject(input);
    expect(result).toEqual({ count: 5, active: true });
  });

  it("should not modify the original object", () => {
    const input = { name: "<script>" };
    const result = sanitizeObject(input);
    expect(input.name).toBe("<script>");
    expect(result.name).toBe("&lt;script&gt;");
  });
});
