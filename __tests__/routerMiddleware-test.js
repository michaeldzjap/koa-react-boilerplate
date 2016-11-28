import { routes } from '../app/routes/routes'
import { extractInitialDataRequests } from '../app/server/middleware/router'

jest.autoMockOff()

describe('the routerMiddleware', () => {
  it('should extract an initialDataRequests function from the home route in response to hitting it', () => {
    const dataRequests = extractInitialDataRequests('/', routes)
    expect(dataRequests).toBeInstanceOf(Array)
    expect(dataRequests.length).toBeGreaterThan(0)
  })

  it('should not extract an initialDataRequests function from the contact route in response to hitting it', () => {
    const dataRequests = extractInitialDataRequests('/contact', routes)
    expect(dataRequests).toBeInstanceOf(Array)
    expect(dataRequests.length).toBe(0)
  })
})
