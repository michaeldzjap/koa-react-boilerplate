import path from 'path'
import fs from 'fs'
import React, { PropTypes } from 'react'
import ReactDOMStream from 'react-dom-stream/server'

import config from '../../config'

/**
 * Create HTML response as a stream and embed initial Redux state
 * @param Object props
 * @return RenderStream stream
 */
const HTMLStream = (props: Object) => {
  const { initialState, markup, helmet, scripts, stylesheets } = props
  const mapping = JSON.parse(fs.readFileSync(path.join(__dirname, '../../webpack-assets.json'), 'utf8'))
  const isDev = config.app.env === 'development'

  // let scripts = []
  // if (config.app.env === 'development') {
  //
  // } else {
  //   const mapping = JSON.parse(fs.readFileSync(path.join(__dirname, '../../webpack-assets.json'), 'utf8'))
  //
  // }

  const stream = ReactDOMStream.renderToStaticMarkup(
    <html {...helmet.htmlAttributes.toComponent()}>
    <head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {helmet && helmet.title.toComponent()}
      {isDev && <script src="/assets/styles.js" />}
      {!isDev && <link rel="stylesheet" href={mapping.styles.css} />}
    </head>
    <body>
      <div id="root" className="wrapper">
        <div dangerouslySetInnerHTML={{__html: ReactDOMStream.renderToString(markup)}} />
      </div>
      <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`}} />
      {isDev && <script src="/assets/bundle.js" />}
      {!isDev && <script src={mapping.manifest.js} />}
      {!isDev && <script src={mapping.vendor.js} />}
      {!isDev && <script src={mapping.bundle.js} />}
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
