import { useEffect, useRef } from 'react'
import { useConversationsStore } from '@/stores/conversations'

export function Promps () {
  const generateComponent = useConversationsStore((state) => state.generateComponent)
  const textAreaRef = useRef()
  async function handleSubmit (e) {
    const formData = new FormData(e.target)
    const prompt = formData.get('prompt')

    e.preventDefault()
    generateComponent({ prompt })
  }

  useEffect(() => {
    textAreaRef.current.focus()
  }, [])

  return (
    <form onSubmit={handleSubmit}>

      <textarea
        ref={textAreaRef}
        autoFocus
        rows={1}
        name='prompt'
        type='text'
        id='large-input'
        placeholder=''
        className='block w-full text-xl px-4 py-2 border border-gray-600 rounded-lg bg-zinc-900/50 backdrop-blur-3xl sm:text-md shadow-lg h-[48px] text-white outline-none'
      />
      <button className='text-white'>Enviar</button>
    </form>

  )
}
