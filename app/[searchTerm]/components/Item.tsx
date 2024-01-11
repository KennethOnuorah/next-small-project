import Link from "next/link"

type Props = {
  result: Result
}

export default function Item({ result }: Props) {
  const itemTextColumn = (
    <div className=" flex flex-col justify-center">
      <h2>
        <Link 
          className=" text-xl font-semibold hover:underline"
          href={`http://en.wikipedia.org/?curid=${result.pageid}`}
          target="_blank"
        >
          {result.title}
        </Link>
      </h2>
      <p className=" text-gray-500">
        {result.extract}
      </p>
    </div>
  )
  const content = result?.thumbnail?.source ?
    (
      <article className=" transition-colors p-4 max-w-lg hover:bg-slate-100">
        <div className=" flex flex-row gap-4">
          <div className=" flex flex-col">
            <img
              src={result.thumbnail.source} 
              alt={result.title} 
              width={result.thumbnail.width * 2}
              height={result.thumbnail.height * 2}
              loading="lazy"
            />
          </div>
          {itemTextColumn}
        </div>
      </article>
    ) : 
    (
      <article className=" p-4 max-w-lg hover:bg-slate-100">
        {itemTextColumn}
      </article>
    )
  return content
}
