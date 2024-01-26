export function Box({span, last, children}) {
  const border = last ? "" : "sm:border-b border-0 border-gray-300"

  return (
    <div className={`${span} ${border}`}>
      {children}
    </div>
  )
}
