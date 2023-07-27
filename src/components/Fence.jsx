import { Fragment } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'

export function Fence({ children, language }) {
  return (
    <Highlight
      {...defaultProps}
      code={children.trimEnd()}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre className={className} style={style}>
          <code>
            {tokens.map(line => (
              line.map((token, index) => (
                <Fragment key={index}>
                  <span key={index} {...getTokenProps({ token })} />
                  {!token.empty && '\n'}
                </Fragment>
              ))
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
