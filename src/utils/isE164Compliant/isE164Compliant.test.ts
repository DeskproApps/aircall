import isE164Compliant from './isE164Compliant'

describe("isE164Compliant", () => {
  describe("Valid E.164 Numbers", () => {
    it("should return true for valid US numbers", () => {
      expect(isE164Compliant("+14155552671")).toBe(true)
    })
    it("should return true for valid UK numbers", () => {
      expect(isE164Compliant("+447777777777")).toBe(true)
    })
    it("should return true for valid numbers with whitespace", () => {
      // The Aircall API doesn't have an issue with this.
      expect(isE164Compliant("+ 4 4 7 7 7 7 7 7 7 7 7               7")).toBe(true)
      expect(isE164Compliant("+ 1                             4   1 5 5 5 5 2 6 7 1      ")).toBe(true)

    })
  })

  describe("Invalid E.164 Numbers (Missing +)", () => {
    it("should return false for US number without +", () => {
      expect(isE164Compliant("14155552671")).toBe(false)
    })
  })

  describe("Invalid E.164 Numbers (Wrong Format)", () => {
    it("should return false for too short number", () => {
      expect(isE164Compliant("+123")).toBe(false);
    })
    it("should return false for too long number", () => {
      expect(isE164Compliant("+23480900000000000")).toBe(false)
    })
  })

  describe("Edge Cases", () => {
    it("should return false for empty string", () => {
      expect(isE164Compliant("")).toBe(false)
    })
  })

  describe("Non-Phone-Number Inputs", () => {
    it("should return false for strings that don't contain phone numbers", () => {
      expect(isE164Compliant("hello world")).toBe(false)
    })
  })
})