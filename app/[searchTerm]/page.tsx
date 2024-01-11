import getWikiResults from "@/lib/getWikiResults"
import Item from "./components/Item"

type Props = {
  params: {
    searchTerm: string
  }
}

export async function generateMetadata({ params : { searchTerm } } : Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  const data = await wikiData
  const displayTerm = searchTerm.replaceAll('%20', ' ')
  
  if(!data?.query?.pages) {
    return {
      title: `${displayTerm} Not Found`
    }
  }else{
    return {
      title: displayTerm,
      description: `Search results for ${displayTerm}`
    }
  }
}

export default async function SearchResultsPage({ params : { searchTerm } } : Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  const data = await wikiData

  const results: Result[] | undefined = data?.query?.pages
  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {results ? 
        Object.values(results).map((result, index) => (
          <>
            <Item key={result.pageid} result={result}/>
            {index < Object.values(results).length - 1 && <hr className=" border-gray-400 mx-4"/>}
          </>
        )) : 
        <h2 className=" p-2 text-xl text-center font-bold">
          {`No results found for "${searchTerm}"`.replaceAll('%20', ' ')}
        </h2>
      }
    </main>
  )
  return content
}