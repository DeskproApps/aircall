import formatTimeSince from './formatTimeSince'

describe('formatTimeSince', () => {
  const mockNow = new Date('2023-01-01T12:00:00Z')
  
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => mockNow.getTime())
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('immediate responses', () => {
    it('returns "now" for very recent dates (under 5 seconds)', () => {
      const justNow = new Date(mockNow.getTime() - 4000) // 4 seconds ago
      expect(formatTimeSince(justNow)).toBe('now')
    })
  })

  describe('time unit formatting', () => {
    it('formats seconds correctly', () => {
      const fiveSecondsAgo = new Date(mockNow.getTime() - 5000) // 5 seconds ago
      expect(formatTimeSince(fiveSecondsAgo)).toBe('5 secs')
      
      const fiftyNineSecondsAgo = new Date(mockNow.getTime() - 59000) // 59 seconds ago
      expect(formatTimeSince(fiftyNineSecondsAgo)).toBe('59 secs')
    })

    it('formats minutes correctly', () => {
      const oneMinuteAgo = new Date(mockNow.getTime() - 60000) // 1 minute ago
      expect(formatTimeSince(oneMinuteAgo)).toBe('1 min')
      
      const fortyFiveMinutesAgo = new Date(mockNow.getTime() - 2700000) // 45 minutes ago
      expect(formatTimeSince(fortyFiveMinutesAgo)).toBe('45 mins')
    })

    it('formats hours correctly', () => {
      const oneHourAgo = new Date(mockNow.getTime() - 3600000) // 1 hour ago
      expect(formatTimeSince(oneHourAgo)).toBe('1 hr')
      
      const twentyThreeHoursAgo = new Date(mockNow.getTime() - 82800000) // 23 hours ago
      expect(formatTimeSince(twentyThreeHoursAgo)).toBe('23 hrs')
    })

    it('formats days correctly', () => {
      const oneDayAgo = new Date(mockNow.getTime() - 86400000) // 1 day ago
      expect(formatTimeSince(oneDayAgo)).toBe('1 day')
      
      const sixDaysAgo = new Date(mockNow.getTime() - 518400000) // 6 days ago
      expect(formatTimeSince(sixDaysAgo)).toBe('6 days')
    })

    it('formats weeks correctly', () => {
      const oneWeekAgo = new Date(mockNow.getTime() - 604800000) // 1 week ago
      expect(formatTimeSince(oneWeekAgo)).toBe('1 wk')
      
      const threeWeeksAgo = new Date(mockNow.getTime() - 1814400000) // 3 weeks ago
      expect(formatTimeSince(threeWeeksAgo)).toBe('3 wks')
    })

    it('formats months correctly', () => {
      const oneMonthAgo = new Date('2022-12-01T12:00:00Z') // ~1 month ago
      expect(formatTimeSince(oneMonthAgo)).toBe('1 mo')
      
      const elevenMonthsAgo = new Date('2022-02-01T12:00:00Z') // ~11 months ago
      expect(formatTimeSince(elevenMonthsAgo)).toBe('11 mos')
    })

    it('formats years correctly', () => {
      const oneYearAgo = new Date('2022-01-01T12:00:00Z') // 1 year ago
      expect(formatTimeSince(oneYearAgo)).toBe('1 yr')
      
      const fiveYearsAgo = new Date('2018-01-01T12:00:00Z') // 5 years ago
      expect(formatTimeSince(fiveYearsAgo)).toBe('5 yrs')
    })
  })

  describe('input format handling', () => {
    it('accepts string inputs', () => {
      const oneHourAgoString = new Date(mockNow.getTime() - 3600000).toISOString()
      expect(formatTimeSince(oneHourAgoString)).toBe('1 hr')
    })

    it('accepts number inputs (timestamp)', () => {
      const oneHourAgoTimestamp = mockNow.getTime() - 3600000
      expect(formatTimeSince(oneHourAgoTimestamp)).toBe('1 hr')
    })

    it('accepts Date object inputs', () => {
      const oneHourAgoDate = new Date(mockNow.getTime() - 3600000)
      expect(formatTimeSince(oneHourAgoDate)).toBe('1 hr')
    })
  })

  describe('edge cases', () => {
    it('handles future dates by returning "now"', () => {
      const futureDate = new Date(mockNow.getTime() + 10000) // 10 seconds in future
      expect(formatTimeSince(futureDate)).toBe('now')
    })

    it('handles invalid dates by returning "now"', () => {
      expect(formatTimeSince('invalid-date')).toBe('now')
      expect(formatTimeSince(NaN)).toBe('now')
    })
  })
})