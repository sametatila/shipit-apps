import { describe, it, expect, beforeEach, vi } from "vitest";
import { rateLimit } from "../rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should allow first request", () => {
    const result = rateLimit("test-ip-1");
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("should decrement remaining on subsequent requests", () => {
    const ip = "test-ip-2";
    rateLimit(ip);
    const result = rateLimit(ip);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(3);
  });

  it("should block after max requests exceeded", () => {
    const ip = "test-ip-3";
    for (let i = 0; i < 5; i++) {
      rateLimit(ip);
    }
    const result = rateLimit(ip);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("should respect custom maxRequests", () => {
    const ip = "test-ip-4";
    const options = { maxRequests: 2 };
    rateLimit(ip, options);
    rateLimit(ip, options);
    const result = rateLimit(ip, options);
    expect(result.success).toBe(false);
  });

  it("should reset after window expires", () => {
    const ip = "test-ip-5";
    const options = { windowMs: 1000, maxRequests: 1 };
    rateLimit(ip, options);
    const blocked = rateLimit(ip, options);
    expect(blocked.success).toBe(false);

    vi.advanceTimersByTime(1100);

    const result = rateLimit(ip, options);
    expect(result.success).toBe(true);
  });

  vi.useRealTimers();
});
