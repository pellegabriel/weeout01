import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import { Amplify, withSSRContext } from 'aws-amplify'
import Map from './map/index'
import EventsSearch from '../src/components/filterEventSearch/filterEventSearch'
import { ModelEventFilterInput } from '../src/API'
import { listEvents, listEventTypes } from '../src/graphql/queries'
import awsExports from '../src/aws-exports'
import { Event, EventTypes } from '../src/models'
import { useRouter } from 'next/router'
import ScrollEvent from '../src/components/scrollEvent'
import CategoriesList from '../src/components/categories/categories'
import EventsNowList from '../src/components/eventsNowList/EventsNowList'

Amplify.configure({ ...awsExports, ssr: true })

interface IHome {
  eventTypesOptions?:Array<EventTypes>
  signOut: () => void
  scrollEvents: Array<Event>
  user: Record<string, any>
  renderedAt: string
  events: Array<Event>
  filters: IFilters
  eventOptions : Array<EventTypes>
}

export interface IFilters {
  startDate: string
  types: string
}

export async function getServerSideProps({ req, query }: any) {
  const SSR = withSSRContext({ req })
  const startDate = new Date(query.startDate)
  const types = query.types
  const filterOptions = {
    ...(query.types && { types: { contains: types } }),
    ...(query.startDate && { startDate: { gt: startDate.toISOString() } }),
  }
  const today = new Date().toISOString()
  console.log(today)
  const filter: ModelEventFilterInput = {
    and: [{ ...filterOptions }],
  }
  const dateFilter: ModelEventFilterInput = {
    and: [
      { startDate: { gt: today } },
      //   trae eventos apartir de ahora
    ],
  }

  try {
    const response = await SSR.API.graphql({
      query: listEvents,
      variables: { filter: dateFilter },
    })
    const responseFilter = await SSR.API.graphql({
      query: listEvents,
      variables: { filter: filter },
    })
    const eventTypeOptions = await SSR.API.graphql({
      query: listEventTypes,
    })
    return {
      props: {
        scrollEvents: response.data.listEvents.items,
        eventOptions: eventTypeOptions.data.listEventTypes.items,
        events: responseFilter.data.listEvents.items,
        filters: filterOptions,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {},
    }
  }
}
function Home({ events = [], scrollEvents = [], filters, eventOptions }: IHome) {
  const router = useRouter()

  const refreshData = ({ startDate, types }: IFilters) => {
    router.push({
      pathname: '/',
      query: { startDate: startDate, types: types },
    })
  }

  const handleChange = (newFilters: Partial<IFilters>) => {
    const prevFilters = router.query
    refreshData({
      ...(prevFilters as unknown as IFilters),
      ...newFilters,
    })
  }
  
  return (
    <>
      {/* <div className=" bg-gradient-to-t from-violet-700 to-black  pt-40 flex items-center flex-col"> */}
      <Head>
          <title>Weeout</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        

        <nav  className=" p-2 mt-0 fixed w-full z-10 top-0" style={{background:'#B746D7',borderBottomWidth:'3px', borderColor:'black'}}>
          <div className="container mx-auto flex flex-wrap items-center">
            <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
                <div className="flex text-2xl pl-2">
                  <div className="em em-grinning"></div>
                  <div className='text-5xl font-extrabold' style={{color:'white'}}>WeeOut</div>
                </div>
            </div>
            <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
              <ul className="list-reset flex justify-between flex-1 md:flex-none items-center pb-2">
                <li className="mr-3">
                  <Link
                    href="/aboutUs"
                    style={{background:'#FF0062'}} className=" text-white  font-extrabold  py-2 px-4 border border-transparent border-black  hover:text-black rounded flex items-center justify-center"
                  >
                    Mas sobre nosotros
                  </Link>
                </li>
                <li className="mr-3">
                  <Link
                    href="/profile"
                    style={{background:'#FF0062'}} className=" text-white font-extrabold  py-2 px-4 border border-transparent border-black hover:text-black rounded flex items-center justify-center"                  >
                    Empieza ahora
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div id='arriba' className='pt-28' >
          <h2 className='px-8 text-white bg-gray-600 rounded dark:bg-gray-500 text-base bg-black font-extrabold p-2' style={{ fontSize: '25px' ,borderTopLeftRadius: '10px',borderTopRightRadius: '10px'}}>En este momento</h2>
          <EventsNowList events={[]} filters={filters} />
       
        </div>

        <div id='medio' className="flex" style={{ alignItems: 'flex-start' }}>
          <CategoriesList />
          <div style={{margin:'0 18px'}}>
            <h2 className='px-8 font-extrabold text-white bg-gray-600 dark:bg-gray-500 text-xl bg-black p-2' 
                style={{  fontSize: '25px', minWidth: '400px',
                maxWidth:'960px', borderTopLeftRadius: '10px',borderTopRightRadius: '10px'}}>
                Estos eventos comienzan pronto
            </h2>
            <ScrollEvent events={scrollEvents} />
          </div>
          <div style={{borderWidth:'3px', borderColor:'black', borderRadius:'30px'}}>
          <Map events={events} />
          </div>
        </div>

        <article id='abajo' className="grid gap-2 max-w-[1370px]" style={{marginTop: '100px'}}>
          <h1 className=" font-extrabold px-8 text-white bg-gray-600 rounded dark:bg-gray-500 text-3xl bg-black p-4" style={{  fontSize: '25px',borderTopLeftRadius: '10px',borderTopRightRadius: '10px'}}>
            Busca lo que necesites en la Lista de eventos disponibles:
          </h1>

          <section className="">
            <EventsSearch
              events={events}
              filters={filters}
              updateFilters={handleChange}
              eventTypesOptions={eventOptions}
            />
          </section>
        </article>
      </div>
      <footer style={{background:'#B746D7',borderWidth:'3px', borderColor:'black'}} className=" shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-black">
        <span className="text-sm text-white sm:text-center dark:text-gray-400">
          © 2022. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link
              href="/aboutUs"
              style={{background:'#FF0062'}} className=" text-white  font-extrabold  py-2 px-4 border border-transparent border-black  hover:text-black rounded flex items-center justify-center"
              >
              Sobre nosotros
            </Link>
          </li>
        </ul>
      </footer>
    </>
  )
}

export default Home
