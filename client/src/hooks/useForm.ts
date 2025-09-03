import { useNavigate } from 'react-router-dom'

export const useForm = () => {
  const navigate = useNavigate()
  type FormValues = Record<string, unknown>

  const submitForm = async (values: FormValues) => {
    const response = await fetch(`/api/users/${values.id}`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      navigate('/events')
    }
  }

  return { submitForm }
}
