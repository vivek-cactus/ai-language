import { render, screen } from '@testing-library/react'
import App from './App'

vi.mock('./data/experiments.json', () => ({
  default: [
    {
      id: 1,
      date: '2026-05-10',
      model: 'GPT-4o',
      tokens: 124,
      transformation: 'Remove whitespace',
      originalPrompt: 'Original A',
      transformedPrompt: 'TransformedA',
      aiResponse: 'Response A',
      observations: 'Obs A',
    },
    {
      id: 2,
      date: '2026-05-17',
      model: 'Claude 3',
      tokens: 98,
      transformation: '4-char words',
      originalPrompt: 'Original B',
      transformedPrompt: 'Orig inal B',
      aiResponse: 'Response B',
      observations: 'Obs B',
    },
  ],
}))

test('renders site title', () => {
  render(<App />)
  expect(screen.getByText('AI Language Experiments')).toBeInTheDocument()
})

test('shows experiment count', () => {
  render(<App />)
  expect(screen.getByText('2 experiments')).toBeInTheDocument()
})

test('sorts experiments newest first', () => {
  render(<App />)
  const models = screen.getAllByRole('button')
  expect(models[0]).toHaveTextContent('Claude 3')
  expect(models[1]).toHaveTextContent('GPT-4o')
})
