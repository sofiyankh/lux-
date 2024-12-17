import CollectionClient from './CollectionClient'

export default function CollectionPage({ params }: { params: { id: string } }) {
  // Simply pass the collection id to the client component
  return <CollectionClient id={params.id} />
}