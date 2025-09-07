import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, FieldArray } from 'formik'

type FormValues = {
  title: string
  location: string
  dates: string[]
}

export const NewEvent: React.FC = () => {
  const navigate = useNavigate()

  const initialValues: FormValues = {
    title: '',
    location: '',
    dates: [''],
  }

  const toTimestamp = (d: string) => {
    if (!d) return NaN
    return Date.parse(d)
  }

  const onSubmit = async (values: FormValues, helpers: any) => {
    helpers.setStatus(undefined)

    const timestamps = values.dates
      .map(toTimestamp)
      .filter(n => Number.isFinite(n))

    if (timestamps.length === 0) {
      helpers.setStatus('Přidej aspoň jedno platné datum.')
      return
    }
    if (timestamps.length > 10) {
      helpers.setStatus('Maximálně 10 datumů.')
      return
    }

    try {
      const res = await fetch('http://localhost:4000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: values.title,
          location: values.location || undefined,
          dates: timestamps,
        }),
      })

      if (!res.ok) {
        const msg = await safeMessage(res)
        helpers.setStatus(msg || 'Odeslání se nezdařilo.')
        return
      }

      navigate('/events')
    }
    catch {
      helpers.setStatus('Chyba při odesílání.')
    }
  }

  return (
    <div style={{ padding: 12 }}>
      <h1>New Event</h1>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, isSubmitting, status }) => (
          <Form>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', marginBottom: 4 }}>
                Title (required)
              </label>
              <Field name="title" placeholder="e.g. Team building" />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', marginBottom: 4 }}>
                Location (optional)
              </label>
              <Field name="location" placeholder="e.g. Praha" />
            </div>

            <div style={{ marginBottom: 8, fontWeight: 600 }}>Dates</div>
            <FieldArray
              name="dates"
              render={arrayHelpers => (
                <>
                  {values.dates.map((_unused, idx) => (
                    <div
                      key={idx}
                      style={{ display: 'flex', gap: 8, marginBottom: 6 }}
                    >
                      <Field type="date" name={`dates.${idx}`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(idx)}
                        disabled={values.dates.length <= 1}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push('')}
                    disabled={values.dates.length >= 10}
                  >
                    Add date
                  </button>
                </>
              )}
            />

            {status && (
              <div style={{ marginTop: 8 }}>{status}</div>
            )}

            <div style={{ marginTop: 12 }}>
              <button type="submit" disabled={isSubmitting}>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

async function safeMessage(res: Response) {
  try {
    const j = await res.json()
    if (j && typeof j.message === 'string') return j.message
  }
  catch {
    console.error('Error')
  }
  return ''
}
