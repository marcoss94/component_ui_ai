// import { Blobs } from '@/components/Blobs'
import { Promps } from '@/components/Promps'
import Head from 'next/head'
import { useConversationsStore } from '@/stores/conversations'

// const inter = Inter({ subsets: ["latin"] });

export default function Home () {
  const response = useConversationsStore((state) => state.response)
  return (
    <>
      <Head>
        <title>openui.com</title>
        <meta
          name='description'
          content='Generador de componente de UI con inteligencia artificial'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='px-10 py-24 relative bg-black min-h-screen w-screen g'>
        {/* <Blobs /> */}
        <h1 className='bg-gradient-to-r from-indigo-300 to-purple-400 text-5xl font-bold text-transparent bg-clip-text'>Genera componentes con IA</h1>
        <div className='flex items-center h-full'>
          <div className='w-full'>
            <Promps />
          </div>
        </div>
        <div className='text-white'>
          {response && (response)}
        </div>
      </main>
    </>
  )
}
