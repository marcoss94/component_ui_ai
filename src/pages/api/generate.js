const { OPENAI_API_KEY } = process.env
const API_URL = 'https://api.openai.com/v1/chat/completions'
export default async function handler (req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { prompt, language, framework } = req.query

  const messages = [
    { role: 'system', content: 'Asume que eres un developer y estas generando código para ser usado en producción. Solo genera el código sin explicaciones. Por defecto, usa HTML y CSS si no se te indica lo contrario' },
    { role: 'user', content: 'Crea un botón. Código:' },
    { role: 'assistant', content: '<button>Button</button>' },
    { role: 'user', content: 'Crea un botón que diga "Hola", que sea redondeado con fondo rojo. Código:' },
    { role: 'assistant', content: '<button class="rounded bg-red-500">Hola</button>' },
    { role: 'user', content: 'Crea un botón que diga "Hola", que sea redondeado con fondo rojo y que tenga un borde negro. Código:' },
    { role: 'assistant', content: '<button class="rounded bg-red-500 border-black">Hola</button>' }
  ]

  if (!prompt) return res.status(400).json({ error: 'Missing prompt' })
  if (!language) return res.status(400).json({ error: 'Missing language' })
  if (!framework) return res.status(400).json({ error: 'Missing framework' })

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [...messages, { role: 'user', content: prompt }],
      stream: false
    })
  })

  if (!response.ok) {
    return res.status(500).json({ error: 'Something went wrong' })
  }

  const { choices, usage } = await response.json()
  const { content } = choices?.[0]?.message

  return res.status(200).json({ content })
}
