import React, { PropTypes } from 'react'
import ReactDOMStream from 'react-dom-stream/server'

/**
 * Create HTML response as a stream and embed initial Redux state
 * @param Object props
 * @return RenderStream stream
 */
const HTMLStream = (props: Object) => {
  const { initialState, markup, helmet } = props
  const stream = ReactDOMStream.renderToStaticMarkup(
    <html>
    <head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {helmet && helmet.title.toComponent()}
      <script src="/assets/styles.js" />
      <title>Koa-React Scaffold | </title>
    </head>
    <body>
      <div id="root" className="wrapper">
        <div dangerouslySetInnerHTML={{__html: ReactDOMStream.renderToString(markup)}} />
      </div>
      <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`}} />
      <script src="/assets/bundle.js" />
    </body>
    </html>
  )

  return stream
}

HTMLStream.propTypes = {
  reactInitialData: PropTypes.object.isRequired,
  markup: PropTypes.object.isRequired,
  helmet: PropTypes.object
}

export default HTMLStream
