import { render, screen, fireEvent } from '@testing-library/react'
import ExperimentCard from './ExperimentCard'

const experiment = {
  id: 1,
  date: '2026-05-17',
  model: 'GPT-4o',
  tokens: 124,
  transformation: 'Remove whitespace',
  originalPrompt: 'What is the capital of France?',
  transformedPrompt: 'WhatisthecapitalofFrance?',
  aiResponse: 'Paris is the capital of France.',
  observations: 'Model understood despite mangling.',
}

test('shows date, model, transformation, and token count when collapsed', () => {
  render(<ExperimentCard experiment={experiment} />)
  expect(screen.getByText('2026-05-17')).toBeInTheDocument()
  expect(screen.getByText('GPT-4o')).toBeInTheDocument()
  expect(screen.getByText('Remove whitespace')).toBeInTheDocument()
  expect(screen.getByText('124 tokens')).toBeInTheDocument()
})

test('does not show prompts or response when collapsed', () => {
  render(<ExperimentCard experiment={experiment} />)
  expect(screen.queryByText('What is the capital of France?')).not.toBeInTheDocument()
  expect(screen.queryByText('WhatisthecapitalofFrance?')).not.toBeInTheDocument()
  expect(screen.queryByText('Paris is the capital of France.')).not.toBeInTheDocument()
})

test('reveals prompts, response, and observations on click', () => {
  render(<ExperimentCard experiment={experiment} />)
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
  expect(screen.getByText('WhatisthecapitalofFrance?')).toBeInTheDocument()
  expect(screen.getByText('Paris is the capital of France.')).toBeInTheDocument()
  expect(screen.getByText('Model understood despite mangling.')).toBeInTheDocument()
})

test('collapses again on second click', () => {
  render(<ExperimentCard experiment={experiment} />)
  fireEvent.click(screen.getByRole('button'))
  fireEvent.click(screen.getByRole('button'))
  expect(screen.queryByText('What is the capital of France?')).not.toBeInTheDocument()
})
