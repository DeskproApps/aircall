import formatDuration from "./formatDuration"

describe('formatDuration', () => {
  describe('basic duration formatting', () => {
    it('formats seconds only correctly', () => {
      expect(formatDuration(0, 5)).toBe('00:00:05')
      expect(formatDuration(0, 59)).toBe('00:00:59')
    })

    it('formats minutes and seconds correctly', () => {
      expect(formatDuration(0, 60)).toBe('00:01:00')
      expect(formatDuration(0, 119)).toBe('00:01:59')
      expect(formatDuration(0, 3599)).toBe('00:59:59')
    })

    it('formats hours, minutes and seconds correctly', () => {
      expect(formatDuration(0, 3600)).toBe('01:00:00')
      expect(formatDuration(0, 3661)).toBe('01:01:01')
      expect(formatDuration(0, 86399)).toBe('23:59:59')
    })

    it('formats multi-day durations correctly', () => {
      expect(formatDuration(0, 86400)).toBe('24:00:00')
      expect(formatDuration(0, 90000)).toBe('25:00:00')
    })
  })

  describe('edge cases', () => {
    it('returns 00:00:00 when start equals end', () => {
      expect(formatDuration(1000, 1000)).toBe('00:00:00')
    })

    it('returns 00:00:00 when duration would be negative', () => {
      expect(formatDuration(5000, 1000)).toBe('00:00:00')
    })

    it('handles very large durations correctly', () => {
      expect(formatDuration(0, 100000000)).toBe('27777:46:40')
    })
  })

  describe('with current time fallback', () => {
    it('uses current time when end is undefined', () => {
      const start = Math.floor(Date.now() / 1000) - 10 // 10 seconds ago
      const result = formatDuration(start, undefined)
      expect(result).toMatch(/^00:00:(09|10)$/) // Approximately 10 seconds
    })
  })

  describe('partial duration calculations', () => {
    it('correctly calculates difference between timestamps', () => {
      expect(formatDuration(3600, 7200)).toBe('01:00:00') // 1 hour difference
      expect(formatDuration(0, 3661)).toBe('01:01:01')    // 1h1m1s
      expect(formatDuration(1000, 5000)).toBe('01:06:40')  // 4000 seconds
    })
  })
})