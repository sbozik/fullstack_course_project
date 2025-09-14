import React from 'react'
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import { createEvent } from '../../apiClient'

type FormValues = {
  title: string
  location: string
  dates: string[]
}

const toTimestamp = (day: string): number => {
  const ms = Date.parse(day)
  return Number.isFinite(ms) ? ms : NaN
}

export const NewEvent: React.FC = () => {
  const navigate = useNavigate()

  const initialValues: FormValues = {
    title: '',
    location: '',
    dates: [''],
  }

  return (
    <div style={{ padding: 12 }}>
      <h1>Nová událost</h1>

      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<Record<keyof FormValues, string>> = {}

          if (!values.title.trim()) {
            errors.title = 'Název je povinný'
          }

          if (values.dates.length < 1) {
            errors.dates = 'Přidej alespoň jedno datum'
          }
          else if (values.dates.length > 10) {
            errors.dates = 'Maximálně 10 dat'
          }
          else if (values.dates.some(d => !d || !Number.isFinite(toTimestamp(d)))) {
            errors.dates = 'Každé datum musí být vyplněné a validní'
          }

          return errors
        }}
        onSubmit={async (values, helpers) => {
          helpers.setStatus(null)

          const datesMs = values.dates.map(toTimestamp)

          if (datesMs.some(n => !Number.isFinite(n))) {
            helpers.setStatus('Datum se nepodařilo převést. Zkontroluj pole s daty.')
            return
          }

          try {
            await createEvent({
              title: values.title.trim(),
              location: values.location.trim() || null,
              dates: datesMs,
            })

            navigate('/events')
          }
          catch {
            helpers.setStatus('Chyba při odesílání.')
          }
          finally {
            helpers.setSubmitting(false)
          }
        }}
      >
        {({ values, isSubmitting, status, setFieldValue }) => (
          <Form>
            <label>
              <div>Název *</div>
              <Field name="title" type="text" />
              <div style={{ fontSize: 12 }}>
                <ErrorMessage name="title" />
              </div>
            </label>

            <label>
              <div>Místo</div>
              <Field name="location" type="text" />
              <div style={{ fontSize: 12 }}>
                <ErrorMessage name="location" />
              </div>
            </label>

            <div>
              <div>Termíny (1–10)</div>

              <FieldArray name="dates">
                {({ remove, push }) => (
                  <div>
                    {values.dates.map((_, idx) => (
                      <div key={idx}>
                        <Field type="date" name={`dates.${idx}`} />
                        <button
                          type="button"
                          onClick={() => remove(idx)}
                          disabled={values.dates.length <= 1}
                        >
                          Odebrat
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => push('')}
                      disabled={values.dates.length >= 10}
                    >
                      Přidat datum
                    </button>

                    <div style={{ fontSize: 12 }}>
                      <ErrorMessage name="dates" />
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>

            {status && (
              <div>
                {status}
              </div>
            )}

            <div>
              <button type="submit" disabled={isSubmitting}>
                Odeslat
              </button>
              <button
                type="button"
                onClick={() => {
                  void setFieldValue('dates', [''])
                }}
              >
                Reset termínů
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default NewEvent
