import * as React from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import type { FormikHelpers } from 'formik'
import { useNavigate } from 'react-router-dom'

type NewEventValues = {
  title: string
  location?: string
  dates: string[]
}

const todayISO = () => new Date().toISOString().slice(0, 10)

const validate = (values: NewEventValues) => {
  const errors: Record<string, string> = {}
  if (!values.title || values.title.trim() === '') {
    errors.title = 'Title is required'
  }
  if (!values.dates || values.dates.length === 0) {
    errors.dates = 'Add at least one date'
  }
  else if (values.dates.length > 10) {
    errors.dates = 'Max 10 dates'
  }
  else if (values.dates.some(d => !d)) {
    errors.dates = 'All dates must be filled'
  }
  return errors
}

export const NewEvent: React.FC = () => {
  const navigate = useNavigate()

  const initialValues: NewEventValues = {
    title: '',
    location: '',
    dates: [todayISO()],
  }

  const onSubmit = async (values: NewEventValues, helpers: FormikHelpers<NewEventValues>) => {
    helpers.setSubmitting(true)
    try {
      const timestamps = values.dates.map(d => new Date(d).getTime()).filter(n => Number.isFinite(n))

      const payload = {
        name: values.title,
        title: values.title,
        location: values.location || undefined,
        dates: timestamps,
      }

      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`Server responded ${res.status}`)
      }

      navigate('/events')
    }
    catch (err) {
      console.error(err)
      alert('Nepodařilo se odeslat formulář.')
    }
    finally {
      helpers.setSubmitting(false)
    }
  }

  return (
    <div>
      <h1>Nová událost</h1>

      <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
        {({ values, errors, isSubmitting }) => (
          <Form>
            <label>
              Název*
              <br />
              <Field name="title" placeholder="Super akce" />
            </label>
            {errors.title && <div>{errors.title}</div>}

            <label>
              <br />
              <br />
              Místo
              <br />
              <Field name="location" placeholder="Praha" />
            </label>

            <FieldArray name="dates">
              {({ push, remove }) => (
                <div>
                  <br />
                  <div>Datum(y)</div>
                  {values.dates.map((_d, idx) => (
                    <div key={idx}>
                      <Field type="date" name={`dates.${idx}`} />
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        disabled={values.dates.length <= 1}
                        aria-label={`remove date ${idx + 1}`}
                      >
                        Odstranit
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => push(todayISO())}
                    disabled={values.dates.length >= 10}
                  >
                    Přidat datum
                  </button>

                  {errors.dates && <div>{errors.dates}</div>}
                </div>
              )}
            </FieldArray>

            <div>
              <button type="submit" disabled={isSubmitting}>Vytvořit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
