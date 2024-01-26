export function Wide({ color, width, children }) {
  return (
    <>
    <div
      style={{width: "100vw", position: "relative", left: "calc(-50vw + 50%)"}}
      className={`hidden sm:block py-16 my-16 ${color}`}
    >
      <div style={{width: width+"vw", position: "relative", left: "calc(-"+width/2+"vw + 50%)"}}>
        {children}
      </div>
    </div>
    <div className={`block sm:hidden`}>
      {children}
    </div>
    </>
  )
}
