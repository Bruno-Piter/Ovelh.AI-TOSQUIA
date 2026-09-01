import { describe, expect, it } from "vitest";
import { formatNumber } from "./utils";

describe("formatNumber", () => {
  it("usa locale en-US", () => {
    expect(formatNumber(1234, "en")).toBe("1,234");
  });

  it("usa locale pt-BR", () => {
    const out = formatNumber(1234, "pt");
    expect(out.replace(/\s/g, "")).toBe("1.234");
  });
});
