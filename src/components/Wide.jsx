
export function Wide({children}) {
    return (
      <div style={
        {
          "padding-top": "24px",
          "padding-bottom": "24px",
          "background-color": "#FEF2F2",
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          "margin-left": "-50vw",
          "margin-right": "-50vw",
        }
      }>
        <div className="mx-auto max-w-5xl">
          {children}
        </div>
      </div>
    )
}
