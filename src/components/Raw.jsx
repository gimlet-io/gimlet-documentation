
export function Raw({link}) {
    return (
      <>
        <blockquote class="twitter-tweet">
          <a href={link} />
        </blockquote>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
      </>
    )
}
