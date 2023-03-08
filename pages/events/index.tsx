import { Amplify, API, withSSRContext } from 'aws-amplify'
import awsExports from '../../src/aws-exports'
import { listEvents } from '../../src/graphql/queries'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Event } from '../../src/models'
import EventCard2 from '../../src/components/eventCard2/eventCard2'
import Head from 'next/head'
import { ModelEventFilterInput } from '../../src/API'

Amplify.configure({ ...awsExports, ssr: false })

interface IFilters {
  startDate: string
  types: string
}

interface IProps {
  events: Array<Event>
}

export async function getServerSideProps({ req, query }: any) {
  const SSR = withSSRContext({ req })
  const renderedAt = new Date()
  const startDate = new Date(query.startDate)
  const formattedBuildDate = renderedAt.toLocaleDateString('en-US', {
    dateStyle: 'long',
  })
  const formattedBuildTime = renderedAt.toLocaleTimeString('en-US', {
    timeStyle: 'long',
  })
  const categoryTitle = query.categoryTitle
  const filterOptions = {
    ...(query.categoryTitle && { types: { contains: categoryTitle } }),
    ...(query.startDate && { startDate: { gt: startDate.toISOString() } }),
  }
  const filter: ModelEventFilterInput = {
    and: [{ ...filterOptions }],
  }
  try {
    const response = await SSR.API.graphql({
      query: listEvents,
      variables: { filter: filter },
    })
    console.log(response)
    return {
      props: {
        events: response.data.listEvents.items,
        filters: filterOptions,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: { renderedAt: `${formattedBuildDate} at ${formattedBuildTime}` },
    }
  }
}

export default function Events({ events = [] }: IProps) {
  const router = useRouter()
  const { categoryTitle } = router.query

  return (
    <>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      className=" bg-white  pt-40"
    >
      <Head>
        <title>Weeout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav  className=" p-2 mt-0 fixed w-full z-10 top-0" style={{background:'#B746D7',borderBottomWidth:'3px', borderColor:'white'}}>
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
            <div className="text-white no-underline hover:text-white hover:no-underline">
              <div className="flex text-2xl pl-2">
                <div className="em em-grinning"></div>
                <div className='text-5xl font-extrabold' style={{color:'white'}}>Weeout</div>
              </div>
            </div>
          </div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center pb-2">
              <li className="mr-3">
                <Link
                  href="/aboutUs"
                    style={{background:'#FF0062'}} className=" text-white  font-extrabold  py-2 px-4 border border-transparent borde-white  hover:text-black rounded flex items-center justify-center"
                  >
                  Mas sobre nosotros
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  href="/profile"
                    style={{background:'#FF0062'}} className=" text-white  font-extrabold  py-2 px-4 border border-transparent borde-white  hover:text-black rounded flex items-center justify-center"
                  >
                  Empieza ahora
                </Link>
                
              </li>
              <li className="mr-3">
                <Link
                  href="/"
                 style={{background:'#e60c60'}} className=" text-white font-semibold   py-2 px-4 border border-transparent hover:borde-white hover:text-black rounded flex items-center justify-center"
                  >
                  Pagina principal
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className=" border border-gray-300 w-6/6 rounded-lg p-8   ">
        <div className="mb-10 mt-10" style={{ maxWidth: '400px' }}></div>

        <div className="">
          <div className="">
            <div className="text-gray-900 text-xl font-medium mb-12 border-b border-gray-300 ">
              <h5 className="py-1 mb-1">
                Cantidad de eventos disponibles: {events.length}
              </h5>
            </div>

            <div className="">

              {events &&
                events.map((event) => {
                  return (
                    <Link href={`/events/${event.id}`} key={event.id}>
                      <EventCard2 event={event} key={event.id} />
                    </Link>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
      
    </div>
   </>
  )
}
