import { render, screen } from '@testing-library/react'
import Timeline from './Timeline'

const makeExperiment = (overrides = {}) => ({
  id: 1,
  date: '2026-05-17',
  model: 'GPT-4o',
  tokens: 124,
  transformation: 'Remove whitespace',
  originalPrompt: 'What is the capital of France?',
  transformedPrompt: 'WhatisthecapitalofFrance?',
  aiResponse: 'Paris is the capital of France.',
  observations: 'Model understood despite mangling.',
  ...overrides,
})

test('shows empty state when experiments array is empty', () => {
  render(<Timeline experiments={[]} />)
  expect(screen.getByText('No experiments yet — check back soon.')).toBeInTheDocument()
})

test('renders one card per experiment', () => {
  const experiments = [
    makeExperiment({ id: 1, model: 'GPT-4o' }),
    makeExperiment({ id: 2, model: 'Claude 3' }),
  ]
  render(<Timeline experiments={experiments} />)
  expect(screen.getByText('GPT-4o')).toBeInTheDocument()
  expect(screen.getByText('Claude 3')).toBeInTheDocument()
})

test('does not show empty state when experiments exist', () => {
  render(<Timeline experiments={[makeExperiment()]} />)
  expect(screen.queryByText('No experiments yet — check back soon.')).not.toBeInTheDocument()
})
